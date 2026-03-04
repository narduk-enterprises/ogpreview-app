<script setup lang="ts">
import type { UnfurlResponse } from '~~/types/og'

interface Props {
  initialUrl?: string
  showSeoSections?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialUrl: '',
  showSeoSections: true
})

defineOptions({ inheritAttrs: false })

const router = useRouter()

// State
const urlInput = ref('')
const previewInputCardRef = ref<any>(null)
const showDebug = ref(false)
const showHistoryModal = ref(false)

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

// SSR-friendly initial fetch when URL is provided
const urlToFetch = computed(() =>
  props.initialUrl && isValidUrlHelper(props.initialUrl)
    ? normalizeUrlHelper(props.initialUrl)
    : undefined,
)
const { data: initialData } = useUnfurlPreview(urlToFetch)

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

// If SSR data fetch failed or wasn't available, fetch on client side
onMounted(() => {
  if (props.initialUrl && isValidUrl(props.initialUrl) && !ogData.value && !isLoading.value) {
    fetchCached(normalizeUrl(props.initialUrl))
  }

  // Auto-focus the URL input on page load
  if (previewInputCardRef.value?.focus) {
    previewInputCardRef.value.focus()
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
if (props.initialUrl && isValidUrl(props.initialUrl)) {
  urlInput.value = normalizeUrl(props.initialUrl)
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

// Helper to encode URL for path
const encodeUrlForPath = (url: string): string => {
  return encodeURIComponent(url)
}

// Helper to build path-based URL
const buildPathUrl = (url: string): string => {
  if (!url) return '/'
  const encoded = encodeUrlForPath(url)
  return `/url/${encoded}`
}

// Methods
const handlePreview = async () => {
  if (!urlInput.value || !isValidUrl(urlInput.value)) {
    return
  }

  const normalized = normalizeUrl(urlInput.value)
  urlInput.value = normalized

  // Navigate to path-based URL
  await router.push(buildPathUrl(normalized))

  // Fetch using cached endpoint
  await fetchCached(normalized)

  // Track conversion event
  if (import.meta.client && typeof window !== 'undefined') {
    const gtag = (window as any).gtag
    if (gtag) {
      gtag('event', 'preview_generated', {
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

  // Fetch using refresh endpoint (bypasses cache)
  await fetchRefresh(normalized)

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

  // Navigate to path-based URL
  await router.push(buildPathUrl(url))

  // Fetch the URL
  await fetchCached(url)

  // Track history selection event
  if (import.meta.client && typeof window !== 'undefined') {
    const gtag = (window as any).gtag
    if (gtag) {
      gtag('event', 'preview_from_history', {
        event_category: 'engagement',
        event_label: url,
        value: 1
      })
    }
  }
}

const handleClear = () => {
  urlInput.value = ''
  clearData()
  router.push('/')
}
</script>

<template>
  <div
    class="min-h-screen py-4 sm:py-4 px-3 sm:px-3 md:px-4 lg:px-6 bg-linear-to-br from-primary-500 via-primary-500 to-primary-500 dark:from-primary-500 dark:via-primary-500 dark:to-primary-500"
    data-test="preview-page">
    <div class="max-w-[95rem] mx-auto" role="main">
      <!-- Hero Section -->
      <SectionsHeroSection />

      <!-- URL Input Section with Refresh -->
      <SectionsPreviewInputCard
        ref="previewInputCardRef"
        v-model:url-input="urlInput"
        :is-loading="isLoading"
        :og-data="ogData"
        :error-message="errorMessage"
        :fetched-scores="fetchedScores"
        :recent-history="recentHistory"
        :is-valid-url="isValidUrl"
        :show-debug="showDebug"
        @preview="handlePreview"
        @refresh="handleRefresh"
        @clear="handleClear"
        @clear-error="clearError"
        @history-select="handleHistorySelect"
        @show-history-modal="showHistoryModal = true"
        @toggle-debug="showDebug = !showDebug"
      />

      <!-- Cache Debug Panel -->
      <CacheDebugPanel
v-if="showDebug" :debug-info="cacheDebugInfo" data-test="cache-debug-panel"
        @close="showDebug = false" />

      <!-- URL History Modal -->
      <UrlHistoryModal
        v-model="showHistoryModal"
        :history="history"
        @select="handleHistorySelect"
        @remove="removeFromHistory"
        @clear-all="clearHistory" />

      <!-- Preview Section -->
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

      <!-- SEO Content Sections (only show on homepage) -->
      <SectionsPlatformsSection v-if="showSeoSections" />
      <SectionsHowItWorksSection v-if="showSeoSections" />
      <SectionsFAQSection v-if="showSeoSections" />
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
