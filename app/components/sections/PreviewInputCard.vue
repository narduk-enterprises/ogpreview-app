<script setup lang="ts">
import type { PlatformScores } from '~~/types/og'
import type { UrlHistoryEntry } from '~/composables/useUrlHistory'

interface Props {
  urlInput: string
  isLoading: boolean
  ogData: any
  errorMessage: string
  fetchedScores: PlatformScores | null
  recentHistory: UrlHistoryEntry[]
  isValidUrl: (url: string) => boolean
  showRefreshButton?: boolean
  showDebug?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showRefreshButton: true,
  showDebug: false
})

const emit = defineEmits<{
  'update:urlInput': [value: string]
  'preview': []
  'refresh': []
  'clear': []
  'clear-error': []
  'history-select': [url: string]
  'show-history-modal': []
  'toggle-debug': []
}>()

const urlInputRef = ref<any>(null)
const userUrlFocusIntent = ref(false)
const selectedAllAtMs = ref<number | null>(null)
const showValidationError = ref(false)
const hasAttemptedPreview = ref(false)

const localUrlInput = computed({
  get: () => props.urlInput,
  set: (value: string) => {
    emit('update:urlInput', value)
    // Clear validation error when user starts typing
    if (showValidationError.value) {
      showValidationError.value = false
    }
  }
})

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
  // Force reflow
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

function handleUrlInputBlur() {
  // Show validation error on blur if user has attempted preview and URL is invalid
  if (hasAttemptedPreview.value && localUrlInput.value && !props.isValidUrl(localUrlInput.value)) {
    showValidationError.value = true
  }
}

const handlePreview = () => {
  hasAttemptedPreview.value = true

  // Validate URL before emitting preview
  if (!localUrlInput.value) {
    showValidationError.value = false
    return
  }

  if (!props.isValidUrl(localUrlInput.value)) {
    showValidationError.value = true
    return
  }

  showValidationError.value = false
  emit('preview')
}

const handleRefresh = () => {
  emit('refresh')
}

const handleClear = () => {
  showValidationError.value = false
  hasAttemptedPreview.value = false
  emit('clear')
}

const handleHistorySelect = (url: string) => {
  emit('history-select', url)
}

const getScoreColorClass = (score: number) => {
  if (score >= 90) return 'bg-green-500 text-white'
  if (score >= 70) return 'bg-blue-500 text-white'
  if (score >= 50) return 'bg-yellow-500 text-white'
  return 'bg-red-500 text-white'
}

const getScoreTextColor = (score: number) => {
  if (score >= 90) return 'text-green-600 dark:text-green-400'
  if (score >= 70) return 'text-blue-600 dark:text-blue-400'
  if (score >= 50) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

const getScoreLabel = (score: number) => {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Fair'
  return 'Needs Improvement'
}

// Expose focus method for parent components
defineExpose({
  focus: () => {
    nextTick(() => {
      if (urlInputRef.value) {
        const inputElement = urlInputRef.value.$el?.querySelector?.('input')
          || urlInputRef.value.$el?.querySelector?.('textarea')
          || urlInputRef.value.$el
        if (inputElement && typeof inputElement.focus === 'function') {
          setTimeout(() => {
            inputElement.focus()
          }, 100)
        }
      }
    })
  }
})
</script>

<template>
  <div class="mb-4 sm:mb-4">
    <UCard
      class="shadow-lg hover:shadow-xl transition-shadow duration-300 ring-1 ring-gray-200/50 dark:ring-gray-700/50"
      :ui="{
        root: 'overflow-visible',
        body: 'p-3 sm:p-3'
      }">
      <div class="space-y-3 sm:space-y-2">
        <!-- URL Input Row -->
        <div class="flex flex-col sm:flex-row gap-2.5 sm:gap-2 items-stretch sm:items-center" role="search" aria-label="URL input section">
          <div class="flex-1 min-w-0 w-full">
            <UInput
ref="urlInputRef" v-model="localUrlInput" type="url" :disabled="isLoading"
              placeholder="example.com" size="lg" variant="outline"
              :leading-icon="isLoading ? 'i-lucide-loader-circle' : 'i-lucide-globe'" :loading="isLoading"
              :color="showValidationError ? 'error' : undefined"
              class="w-full text-base" aria-label="Enter website URL to preview Open Graph tags" data-test="url-input" :ui="{
                base: 'text-base sm:text-base py-3',
                trailing: 'pe-1'
              }"
              @pointerdown="markUserUrlFocusIntent"
              @pointerup="handleUrlInputPointerUp"
              @focus="handleUrlInputFocus"
              @blur="handleUrlInputBlur"
              @keydown.enter.prevent="handlePreview">
              <template v-if="localUrlInput && !isLoading" #trailing>
                <UButton
icon="i-lucide-x-circle" color="neutral" variant="ghost" size="sm" aria-label="Clear URL"
                  class="touch-target"
                  @click="handleClear" />
              </template>
            </UInput>
            <!-- Validation Error Message -->
            <div v-if="showValidationError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
              <UIcon name="i-lucide-alert-circle" class="w-4 h-4 flex-shrink-0" />
              <span>Please enter a valid URL (e.g., example.com or https://example.com)</span>
            </div>
          </div>

          <!-- Action Buttons Row -->
          <div class="flex gap-2.5 sm:gap-2 items-center w-full sm:w-auto">
            <!-- Preview Button -->
            <UButton
              :disabled="!localUrlInput || isLoading || !isValidUrl(localUrlInput)"
              :loading="isLoading"
              :icon="isLoading ? undefined : 'i-lucide-search'"
              label="Preview"
              color="primary"
              variant="solid"
              size="lg"
              class="shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 sm:flex-initial sm:shrink-0 min-h-[48px] sm:min-h-0 font-semibold text-base"
              data-test="preview-button"
              @click="handlePreview"
            />

            <!-- Refresh Button (only show when we have data) -->
            <ClientOnly v-if="showRefreshButton">
              <UButton
                v-if="ogData"
                :disabled="!localUrlInput || isLoading"
                icon="i-lucide-refresh-cw"
                color="primary"
                variant="soft"
                size="lg"
                class="shadow-sm hover:shadow-md transition-shadow duration-200 shrink-0 min-h-[48px] sm:min-h-0 w-[48px]"
                title="Force refresh (bypass cache)"
                aria-label="Force refresh preview"
                data-test="refresh-button"
                @click="handleRefresh"
              />
            </ClientOnly>
          </div>
        </div>

        <!-- URL History - ClientOnly to prevent hydration mismatch -->
        <ClientOnly>
          <UrlHistoryQuick
            v-if="recentHistory.length > 0"
            :recent-history="recentHistory"
            class="pt-2 border-t border-gray-200/50 dark:border-gray-700/50"
            @select="handleHistorySelect"
            @show-full="$emit('show-history-modal')" />
        </ClientOnly>

        <!-- Score Display (if available) - ClientOnly to prevent hydration mismatch -->
        <ClientOnly>
          <div
v-if="fetchedScores"
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
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
                  <div class="text-xs sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Quality Score
                  </div>
                  <div :class="['text-sm sm:text-sm font-bold leading-tight', getScoreTextColor(fetchedScores.overall)]">
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
                class="min-h-[44px] sm:min-h-0 px-3"
                :title="showDebug ? 'Hide debug info' : 'Show debug info'" @click="$emit('toggle-debug')" />
            </div>
          </div>
        </ClientOnly>

        <!-- Error Alert - ClientOnly to prevent hydration mismatch -->
        <ClientOnly>
          <UAlert
v-if="errorMessage" color="error" variant="subtle" icon="i-lucide-circle-x" :title="errorMessage"
            data-test="error-alert">
            <template #close>
              <UButton icon="i-lucide-x" color="error" variant="ghost" size="xs" @click="$emit('clear-error')" />
            </template>
          </UAlert>
        </ClientOnly>
      </div>
    </UCard>
  </div>
</template>
