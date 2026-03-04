<script setup lang="ts">
import type { UnfurlResponse } from '~~/types/og'

// SEO Meta Tags - Dynamic based on preview URL
const route = useRoute()
const router = useRouter()

// Extract URL from path: /url/https://eg.com -> https://eg.com
const getUrlFromPath = (): string => {
  const slug = route.params.slug
  if (Array.isArray(slug) && slug.length > 0) {
    // Join all slug segments and decode
    const encodedUrl = slug.join('/')
    try {
      return decodeURIComponent(encodedUrl)
    }
    catch {
      return encodedUrl
    }
  }
  return ''
}

const previewUrl = getUrlFromPath()

// Initialize URL from path (needed before useAsyncData)
const initialUrl = previewUrl

// Helper functions for URL validation (needed before useAsyncData)
const isValidUrlHelper = (urlString: string): boolean => {
  if (!urlString) return false
  try {
    const urlToTest = /^https?:\/\//i.test(urlString.trim())
      ? urlString.trim()
      : `https://${urlString.trim()}`
    const urlObj = new URL(urlToTest)
    return ['http:', 'https:'].includes(urlObj.protocol)
      && !!urlObj.hostname && urlObj.hostname.length > 0
      && (urlObj.hostname.includes('.') || urlObj.hostname === 'localhost')
  }
  catch {
    return false
  }
}

const normalizeUrlHelper = (url: string): string => {
  const trimmed = url.trim()
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

// SSR-friendly initial fetch when URL is in path
const urlToFetch = computed(() =>
  initialUrl && isValidUrlHelper(initialUrl) ? normalizeUrlHelper(initialUrl) : undefined,
)
const { data: initialData } = useUnfurlPreview(urlToFetch)

// Set initial SEO meta tags
useSeoMeta({
  title: previewUrl ? `Preview: ${previewUrl} - ogpreview.app` : 'Open Graph Preview Tool — Preview Facebook, Twitter, LinkedIn & More',
  description: previewUrl
    ? `Preview how ${previewUrl} appears when shared on social media platforms`
    : 'Free Open Graph preview tool — see how your link looks on Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, iMessage & Telegram before you post. Test OG tags instantly.',
  ogUrl: previewUrl ? `https://ogpreview.app/url/${encodeURIComponent(previewUrl)}` : 'https://ogpreview.app'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebPage',
    '@id': previewUrl ? `https://ogpreview.app/url/${encodeURIComponent(previewUrl)}` : 'https://ogpreview.app',
    'name': previewUrl ? `Preview: ${previewUrl}` : 'Open Graph Preview Tool',
    'description': previewUrl
      ? `Preview how ${previewUrl} appears when shared on social media`
      : 'Free Open Graph preview tool for testing social media link cards'
  }
])

// State
const urlInput = ref('')
const urlInputRef = ref<any>(null)
const userUrlFocusIntent = ref(false)
const selectedAllAtMs = ref<number | null>(null)
const showDebug = ref(false)
const showHistoryModal = ref(false)
const isManualPreview = ref(false) // Flag to prevent route watcher interference

function getNativeUrlInputEl(): HTMLInputElement | HTMLTextAreaElement | null {
  const root = urlInputRef.value?.$el
  if (!root) return null
  return root.querySelector?.('input, textarea') ?? null
}

function selectAllText(el: HTMLInputElement | HTMLTextAreaElement) {
  if (el.disabled || (el as HTMLInputElement).readOnly) return
  const len = el.value?.length ?? 0
  if (len <= 0) return

  try {
    if (typeof (el as HTMLInputElement).setSelectionRange === 'function') {
      ;(el as HTMLInputElement).setSelectionRange(0, len)
    }
    if (typeof (el as HTMLInputElement).select === 'function') {
      ;(el as HTMLInputElement).select()
    }
  }
  catch {
    // Ignore selection failures
  }
}

function triggerUrlInputSelectAndAnimate() {
  const el = getNativeUrlInputEl()
  if (!el) return

  selectAllText(el)
  selectedAllAtMs.value = Date.now()
  requestAnimationFrame(() => selectAllText(el))

  el.classList.remove('addressbar-focus-anim')

  void (el as any).offsetWidth
  el.classList.add('addressbar-focus-anim')
  el.addEventListener('animationend', () => el.classList.remove('addressbar-focus-anim'), { once: true })
}

function markUserUrlFocusIntent() {
  userUrlFocusIntent.value = true
}

function handleUrlInputFocus(e: FocusEvent) {
  const isTrusted = (e as any).isTrusted !== false
  const shouldHandle = userUrlFocusIntent.value || isTrusted
  userUrlFocusIntent.value = false

  if (!shouldHandle) return
  triggerUrlInputSelectAndAnimate()
}

function handleUrlInputPointerUp() {
  const el = getNativeUrlInputEl()
  if (!el) return

  if (selectedAllAtMs.value && (Date.now() - selectedAllAtMs.value) < 350) {
    requestAnimationFrame(() => selectAllText(el))
  }
  selectedAllAtMs.value = null
}

// Use the unfurl composable with initial data from SSR
const {
  isLoading,
  errorMessage,
  fetchedScores,
  ogData,
  cacheDebugInfo,
  cacheBustToken,
  isValidUrl,
  normalizeUrl,
  fetchCached,
  fetchRefresh,
  clearError,
  clearData
} = useUnfurl({
  initialData: initialData.value?.ok && initialData.value?.data ? initialData.value.data : null,
  initialScores: initialData.value?.scores || null
})

// Track the last fetched URL to detect when we need to refresh
const lastFetchedUrl = ref<string | null>(null)

// Watch for route changes and refetch if URL changes
watch(() => route.params.slug, async () => {
  // Skip if we're manually handling a preview to prevent double-fetching
  if (isManualPreview.value) {
    return
  }

  const newUrl = getUrlFromPath()
  const normalizedNewUrl = newUrl && isValidUrl(newUrl) ? normalizeUrl(newUrl) : null

  // Update input to match route
  if (normalizedNewUrl) {
    urlInput.value = normalizedNewUrl
  }

  // Fetch if URL changed or if we don't have data yet
  if (normalizedNewUrl && normalizedNewUrl !== lastFetchedUrl.value && !isLoading.value) {
    lastFetchedUrl.value = normalizedNewUrl
    await fetchCached(normalizedNewUrl)

    // Add to history after successful fetch
    if (ogData.value) {
      addToHistory(normalizedNewUrl, ogData.value)
    }
  }
}, { immediate: false })

// If SSR data fetch failed or wasn't available, fetch on client side
onMounted(() => {
  const normalizedInitialUrl = initialUrl && isValidUrl(initialUrl) ? normalizeUrl(initialUrl) : null

  if (normalizedInitialUrl && !ogData.value && !isLoading.value) {
    // Fetch the data on client side if it wasn't loaded via SSR
    lastFetchedUrl.value = normalizedInitialUrl
    fetchCached(normalizedInitialUrl)
  }
  else if (normalizedInitialUrl) {
    // Track the URL even if we already have data
    lastFetchedUrl.value = normalizedInitialUrl
  }
})

// URL History
const {
  history,
  addToHistory,
  removeFromHistory,
  clearHistory,
  recentHistory
} = useUrlHistory()

// Validation composable
const { validateOGTags } = useOGValidation()

// Always set the URL input if we have an initial URL
if (initialUrl && isValidUrl(initialUrl)) {
  urlInput.value = normalizeUrl(initialUrl)
}

// Ensure ogData is set from initialData if available (for client-side hydration)
if (import.meta.client && initialData.value && !ogData.value) {
  // The composable should already have the data, but ensure it's set
  // This handles cases where hydration might miss the initial data
  watchEffect(() => {
    if (initialData.value && !ogData.value) {
      // Data will be set by the composable initialization, but watch for any issues
    }
  })
}

// Track conversion event for URL preview (client-side only)
if (import.meta.client && initialUrl && isValidUrl(initialUrl) && ogData.value) {
  const gtag = (window as any).gtag
  if (gtag) {
    gtag('event', 'preview_generated', {
      event_category: 'engagement',
      event_label: initialUrl,
      value: 1
    })
  }
}

// Computed
const displayData = computed(() => {
  if (!ogData.value) return null

  const imageUrl = ogData.value.image
  const displayImageUrl = imageUrl && cacheBustToken.value
    ? `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}ogpreview_bust=${cacheBustToken.value}`
    : imageUrl

  return {
    ...ogData.value,
    url: ogData.value.url || urlInput.value,
    image: displayImageUrl
  }
})

type ValidationResult = ReturnType<typeof validateOGTags>
const emptyValidation: ValidationResult = {
  isComplete: false,
  missing: [],
  warnings: [],
  score: 0
}

const validationResult = computed<ValidationResult>(() => {
  if (!displayData.value) return emptyValidation
  return validateOGTags(displayData.value)
})

// Update title and description when OG data is available
watchEffect(() => {
  if (ogData.value) {
    const title = ogData.value.title
    const description = ogData.value.description

    if (title) {
      useSeoMeta({
        title: `OGPreview - ${title}`
      })
    }

    if (description) {
      useSeoMeta({
        description
      })
    }
  }
})

// Helper to encode URL for path
const encodeUrlForPath = (url: string): string => {
  // Encode the URL, handling special characters
  return encodeURIComponent(url)
}

// Helper to build path-based URL
const buildPathUrl = (url: string): string => {
  if (!url) return '/'
  const encoded = encodeUrlForPath(url)
  return `/url/${encoded}`
}

// Methods
const handlePreview = async (event?: Event) => {
  // Prevent default form submission behavior
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  // Normalize URL first before validation
  const inputValue = urlInput.value?.trim() || ''
  if (!inputValue) {
    return
  }

  const normalized = normalizeUrl(inputValue)

  // Validate the normalized URL
  if (!isValidUrl(normalized) || isLoading.value) {
    return
  }

  // Set flag to prevent route watcher from interfering
  isManualPreview.value = true

  // Update input value with normalized URL
  urlInput.value = normalized

  // Check if this is the same URL - if so, force refresh
  const isSameUrl = normalized === lastFetchedUrl.value

  // Set lastFetchedUrl BEFORE router.push to prevent route watcher from double-fetching
  // Only set it if it's a different URL (for same URL, we'll refresh anyway)
  if (!isSameUrl) {
    lastFetchedUrl.value = normalized
  }

  // Navigate to path-based URL (only if different)
  const pathUrl = buildPathUrl(normalized)
  if (route.path !== pathUrl) {
    await router.push(pathUrl)
  }

  // If same URL, use refresh endpoint to bypass cache
  // Otherwise use cached endpoint
  if (isSameUrl) {
    await fetchRefresh(normalized)
    lastFetchedUrl.value = normalized
  }
  else {
    await fetchCached(normalized)
  }

  // Clear the flag after a short delay to allow route watcher to work for future route changes
  await nextTick()
  setTimeout(() => {
    isManualPreview.value = false
  }, 100)

  // Track conversion event
  if (import.meta.client && typeof window !== 'undefined') {
    const gtag = (window as any).gtag
    if (gtag) {
      gtag('event', isSameUrl ? 'preview_refreshed' : 'preview_generated', {
        event_category: 'engagement',
        event_label: normalized,
        value: 1
      })
    }
  }

  // Add to history after successful fetch
  if (ogData.value) {
    addToHistory(normalized, ogData.value)
  }
}

const handleRefresh = async () => {
  if (!urlInput.value || !isValidUrl(urlInput.value)) {
    return
  }

  const normalized = normalizeUrl(urlInput.value)

  // Always use refresh endpoint to bypass cache
  await fetchRefresh(normalized)

  lastFetchedUrl.value = normalized

  // Track refresh event
  if (import.meta.client && typeof window !== 'undefined') {
    const gtag = (window as any).gtag
    if (gtag) {
      gtag('event', 'preview_refreshed', {
        event_category: 'engagement',
        event_label: normalized,
        value: 1
      })
    }
  }

  // Add to history after successful refresh
  if (ogData.value) {
    addToHistory(normalized, ogData.value)
  }
}

const handleHistorySelect = async (url: string) => {
  urlInput.value = url
  const normalized = normalizeUrl(url)

  // Navigate to path-based URL
  await router.push(buildPathUrl(normalized))

  // Fetch the URL
  await fetchCached(normalized)

  lastFetchedUrl.value = normalized

  // Track history selection event
  if (import.meta.client && typeof window !== 'undefined') {
    const gtag = (window as any).gtag
    if (gtag) {
      gtag('event', 'preview_from_history', {
        event_category: 'engagement',
        event_label: normalized,
        value: 1
      })
    }
  }
}

const handleClear = () => {
  urlInput.value = ''
  clearData()
  lastFetchedUrl.value = null
  router.push('/')
}

// Score helpers
const getScoreColorClass = (score: number) => {
  if (score >= 90) return 'bg-green-500 text-white'
  if (score >= 70) return 'bg-yellow-500 text-white'
  if (score >= 50) return 'bg-orange-500 text-white'
  return 'bg-red-500 text-white'
}

const getScoreTextColor = (score: number) => {
  if (score >= 90) return 'text-green-600 dark:text-green-400'
  if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
  if (score >= 50) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

const getScoreLabel = (score: number) => {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Fair'
  return 'Needs Improvement'
}

// Focus URL input on mount
onMounted(() => {
  // Focus the input field after a short delay to ensure it's rendered
  nextTick(() => {
    if (urlInputRef.value) {
      // Try to find the actual input element within the UInput component
      const inputElement = urlInputRef.value.$el?.querySelector?.('input')
        || urlInputRef.value.$el?.querySelector?.('textarea')
        || urlInputRef.value.$el
      if (inputElement && typeof inputElement.focus === 'function') {
        // Small delay to ensure the component is fully rendered
        setTimeout(() => {
          inputElement.focus()
        }, 100)
      }
    }
  })
})
</script>

<template>
  <div
    class="min-h-screen py-4 sm:py-4 px-3 sm:px-3 md:px-4 lg:px-6 bg-linear-to-br from-primary-500 via-primary-500 to-primary-500 dark:from-primary-500 dark:via-primary-500 dark:to-primary-500"
    data-test="preview-page">
    <div class="max-w-[95rem] mx-auto" role="main">
      <!-- Hero Section -->
      <HeroSection />

      <!-- URL Input Section with Refresh -->
      <div class="mb-4 sm:mb-4">
        <UCard
          class="shadow-lg hover:shadow-xl transition-shadow duration-300 ring-1 border-default/50 dark:border-default/50"
          :ui="{
            root: 'overflow-visible',
            body: 'p-3 sm:p-3'
          }">
          <div class="space-y-3 sm:space-y-2">
            <!-- URL Input Row -->
            <div
class="flex flex-col sm:flex-row gap-2.5 sm:gap-2 items-stretch sm:items-center" role="search"
              aria-label="URL input section">
              <UInput
ref="urlInputRef" v-model="urlInput" type="url" :disabled="isLoading" placeholder="example.com"
                size="lg" variant="outline" :icon="isLoading ? 'i-lucide-loader-circle' : 'i-lucide-globe'"
                :loading="isLoading" class="flex-1 min-w-0 w-full text-base"
                aria-label="Enter website URL to preview Open Graph tags" data-test="url-input" :ui="{
                  base: 'text-base sm:text-base py-3',
                  trailing: 'pe-1'
                }"
                @mousedown="markUserUrlFocusIntent"
                @mouseup="handleUrlInputPointerUp"
                @focus="handleUrlInputFocus"
                @keydown.enter.prevent.stop="handlePreview">
                <template v-if="urlInput && !isLoading" #trailing>
                  <UButton
icon="i-lucide-x-circle" color="neutral" variant="ghost" size="sm" aria-label="Clear URL"
                    class="touch-target" @click="handleClear" />
                </template>
              </UInput>

              <!-- Action Buttons Row -->
              <div class="flex gap-2.5 sm:gap-2 items-center w-full sm:w-auto">
                <!-- Preview Button -->
                <UButton
:disabled="!urlInput || isLoading || !isValidUrl(urlInput)" :loading="isLoading"
                  :icon="isLoading ? undefined : 'i-lucide-search'" label="Preview" color="primary" variant="solid"
                  size="lg"
                  class="shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 sm:flex-initial sm:shrink-0 min-h-[48px] sm:min-h-0 font-semibold text-base"
                  data-test="preview-button" @click="handlePreview" />

                <!-- Refresh Button (only show when we have data) - ClientOnly to prevent hydration mismatch -->
                <ClientOnly>
                  <UButton
v-if="ogData" :disabled="!urlInput || isLoading" icon="i-lucide-refresh-cw" color="primary"
                    variant="soft" size="lg"
                    class="shadow-sm hover:shadow-md transition-shadow duration-200 shrink-0 min-h-[48px] sm:min-h-0 w-[48px]"
                    title="Force refresh (bypass cache)" aria-label="Force refresh preview" data-test="refresh-button"
                    @click="handleRefresh" />
                </ClientOnly>
              </div>
            </div>

            <!-- URL History - ClientOnly to prevent hydration mismatch -->
            <ClientOnly>
              <UrlHistoryQuick
v-if="recentHistory.length > 0" :recent-history="recentHistory"
                class="pt-2 border-t border-default/50 dark:border-default/50" @select="handleHistorySelect"
                @show-full="showHistoryModal = true" />
            </ClientOnly>

            <!-- Score Display (if available) - ClientOnly to prevent hydration mismatch -->
            <ClientOnly>
              <div
v-if="fetchedScores"
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-default/50 dark:border-default/50">
                <!-- Score Display -->
                <div class="flex items-center gap-3 sm:gap-3 w-full sm:w-auto">
                  <div class="flex items-center gap-2.5 sm:gap-2">
                    <div
:class="[
                      'px-3.5 sm:px-3 py-2 sm:py-1.5 rounded-lg font-bold text-lg sm:text-lg shadow-md transition-shadow duration-200 cursor-default',
                      getScoreColorClass(fetchedScores.overall)
                    ]">
                      {{ fetchedScores.overall }}
                    </div>
                    <div>
                      <div
                        class="text-xs sm:text-xs font-medium text-muted dark:text-dimmed uppercase tracking-wide">
                        Quality Score
                      </div>
                      <div
                        :class="['text-sm sm:text-sm font-bold leading-tight', getScoreTextColor(fetchedScores.overall)]">
                        {{ getScoreLabel(fetchedScores.overall) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-2.5 sm:gap-2 w-full sm:w-auto justify-end">
                  <OGScoreModal v-if="fetchedScores" :scores="fetchedScores" />
                  <UButton
icon="i-lucide-bug" color="neutral" variant="ghost" size="sm"
                    class="min-h-[44px] sm:min-h-0 px-3" :title="showDebug ? 'Hide debug info' : 'Show debug info'"
                    @click="showDebug = !showDebug" />
                </div>
              </div>
            </ClientOnly>

            <!-- Error Alert - ClientOnly to prevent hydration mismatch -->
            <ClientOnly>
              <UAlert
v-if="errorMessage" color="error" variant="subtle" icon="i-lucide-circle-x" :title="errorMessage"
                data-test="error-alert">
                <template #close>
                  <UButton icon="i-lucide-x" color="error" variant="ghost" size="xs" @click="clearError" />
                </template>
              </UAlert>
            </ClientOnly>
          </div>
        </UCard>
      </div>

      <!-- Cache Debug Panel -->
      <CacheDebugPanel
v-if="showDebug" :debug-info="cacheDebugInfo" data-test="cache-debug-panel"
        @close="showDebug = false" />

      <!-- URL History Modal -->
      <UrlHistoryModal
v-model="showHistoryModal" :history="history" @select="handleHistorySelect"
        @remove="removeFromHistory" @clear-all="clearHistory" />

      <!-- Preview Section - Use ClientOnly to prevent hydration mismatch -->
      <ClientOnly>
        <template #default>
          <div v-if="ogData" class="mb-6 sm:mb-4 mt-4" data-test="preview-area">
            <SectionsPreviewSection :data="displayData" :validation-result="validationResult" />
          </div>
          <div v-else class="text-center py-12 sm:py-16 px-4">
            <div
              class="inline-flex items-center justify-center w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-muted dark:bg-elevated mb-4 sm:mb-4">
              <UIcon name="i-lucide-search" class="w-10 h-10 sm:w-10 sm:h-10 text-dimmed" />
            </div>
            <h3 class="text-xl sm:text-lg font-semibold text-primary dark:text-white mb-3 sm:mb-2">
              Enter a URL to preview
            </h3>
            <p class="text-base sm:text-base text-muted dark:text-dimmed max-w-md mx-auto leading-relaxed">
              Enter any website URL above to see how it appears when shared on social media platforms.
            </p>
          </div>
        </template>
        <template #fallback>
          <!-- Server-side fallback - show loading state -->
          <div class="mb-6 sm:mb-4 mt-4 text-center py-12 sm:py-16 px-4" data-test="preview-area">
            <div
              class="inline-flex items-center justify-center w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-muted dark:bg-elevated mb-4 sm:mb-4">
              <UIcon name="i-lucide-search" class="w-10 h-10 sm:w-10 sm:h-10 text-dimmed animate-pulse" />
            </div>
            <h3 class="text-xl sm:text-lg font-semibold text-primary dark:text-white mb-3 sm:mb-2">
              Loading preview...
            </h3>
          </div>
        </template>
      </ClientOnly>

      <!-- SEO Content Sections -->
      <PlatformsSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  </div>
</template>
