<script setup lang="ts">
import type { PlatformScores } from '~~/types/og'

interface Props {
  modelValue: string
  ogData: Record<string, unknown> | null
  isLoading?: boolean
  error?: string
  scores?: PlatformScores | null
  hasScores?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'update:ogData', value: Record<string, unknown> | null): void
  (e: 'fetch' | 'clear' | 'clear-error' | 'reset'): void
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: '',
  scores: null,
  hasScores: false
})

const emit = defineEmits<Emits>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const urlInputRef = ref<any>(null)
const userUrlFocusIntent = ref(false)
const selectedAllAtMs = ref<number | null>(null)

const localUrl = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

// Focus the input on mount
onMounted(() => {
  if (urlInputRef.value) {
    // UInput wraps a native input, so we need to access it properly
    nextTick(() => {
      const inputEl = urlInputRef.value.$el?.querySelector('input')
      if (inputEl) {
        inputEl.focus()
      }
    })
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
    // Some browsers behave better with setSelectionRange; others with select().
    if (typeof (el as HTMLInputElement).setSelectionRange === 'function') {
      ;(el as HTMLInputElement).setSelectionRange(0, len)
    }
    if (typeof (el as HTMLInputElement).select === 'function') {
      ;(el as HTMLInputElement).select()
    }
  }
  catch {
    // Ignore selection failures (e.g. some embedded webviews)
  }
}

function triggerUrlInputSelectAndAnimate() {
  const el = getNativeUrlInputEl()
  if (!el) return

  // Select-all needs to happen synchronously for some mobile browsers.
  selectAllText(el)
  selectedAllAtMs.value = Date.now()
  // And also on the next frame to win against the pointerup that can collapse selection.
  requestAnimationFrame(() => selectAllText(el))

  // Re-trigger a subtle focus animation (remove -> reflow -> add).
  el.classList.remove('addressbar-focus-anim')

  void (el as HTMLElement).offsetWidth
  el.classList.add('addressbar-focus-anim')
  el.addEventListener('animationend', () => el.classList.remove('addressbar-focus-anim'), { once: true })
}

function markUserUrlFocusIntent() {
  userUrlFocusIntent.value = true
}

function handleUrlInputFocus(e: FocusEvent) {
  const isTrusted = (e as FocusEvent).isTrusted !== false
  const shouldHandle = userUrlFocusIntent.value || isTrusted
  userUrlFocusIntent.value = false

  if (!shouldHandle) return
  triggerUrlInputSelectAndAnimate()
}

function handleUrlInputPointerUp() {
  const el = getNativeUrlInputEl()
  if (!el) return

  // If the click/tap immediately followed our select-all, re-assert selection.
  if (selectedAllAtMs.value && (Date.now() - selectedAllAtMs.value) < 350) {
    requestAnimationFrame(() => selectAllText(el))
  }
  selectedAllAtMs.value = null
}

const isValidUrl = computed(() => {
  if (!localUrl.value) return false

  const trimmed = localUrl.value.trim()

  // Try to normalize and validate
  try {
    // Add protocol if missing
    const urlToTest = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const urlObj = new URL(urlToTest)

    // Must have valid protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }

    // Must have hostname
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return false
    }

    // Must have dot in hostname or be localhost
    if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') {
      return false
    }

    return true
  }
  catch {
    return false
  }
})

const handleFetch = () => {
  if (isValidUrl.value && !props.isLoading) {
    emit('fetch')
  }
}

const handleClear = () => {
  emit('clear')
}

// Score color helpers
function getScoreColorClass(score: number): string {
  if (score >= 80) {
    return 'bg-green-500 text-white'
  }
  else if (score >= 60) {
    return 'bg-yellow-500 text-white'
  }
  else {
    return 'bg-red-500 text-white'
  }
}

function getScoreTextColor(score: number): string {
  if (score >= 80) {
    return 'text-green-600 dark:text-green-400'
  }
  else if (score >= 60) {
    return 'text-yellow-600 dark:text-yellow-400'
  }
  else {
    return 'text-red-600 dark:text-red-400'
  }
}

function getScoreLabel(score: number): string {
  if (score >= 80) {
    return 'Excellent'
  }
  else if (score >= 60) {
    return 'Good'
  }
  else if (score >= 40) {
    return 'Fair'
  }
  else {
    return 'Needs Improvement'
  }
}

const buttonIcon = computed(() => props.isLoading ? undefined : props.hasScores ? 'i-lucide-refresh-cw' : 'i-lucide-search')
const buttonLabel = computed(() => props.isLoading ? 'Loading...' : props.hasScores ? 'Refresh' : 'Load Preview')
</script>

<template>
  <div class="mb-4">
    <UCard
      class="shadow-lg hover:shadow-xl transition-shadow duration-300 ring-1 border-default/50 dark:border-default/50"
      :ui="{
        root: 'overflow-visible',
        body: 'p-3'
      }">
      <div class="space-y-2">
        <!-- URL Input Row -->
        <div class="flex gap-2 items-center" role="search" aria-label="URL input section">
          <UInput
ref="urlInputRef" v-model="localUrl" type="url" :disabled="isLoading"
            placeholder="example.com or https://example.com" size="md" variant="outline"
            :icon="isLoading ? 'i-lucide-loader-circle' : 'i-lucide-globe'" :loading="isLoading" class="flex-1"
            aria-label="Enter website URL to preview Open Graph tags" autofocus :ui="{
              base: 'text-sm',
              trailing: 'pe-1'
            }"
            @mousedown="markUserUrlFocusIntent"
            @mouseup="handleUrlInputPointerUp"
            @focus="handleUrlInputFocus"
            @keydown.enter.prevent="handleFetch">
            <template v-if="localUrl && !isLoading" #trailing>
              <UButton
icon="i-lucide-x-circle" color="neutral" variant="ghost" size="xs" aria-label="Clear URL"
                @click="handleClear" />
            </template>
          </UInput>

          <!-- Load Preview Button -->
          <UButton
:disabled="!localUrl || isLoading || !isValidUrl" :loading="isLoading"
            :icon="buttonIcon"
            :label="buttonLabel" color="primary" variant="solid"
            size="sm" class="shadow-sm hover:shadow-md transition-shadow duration-200 shrink-0" @click="handleFetch" />
        </div>

        <!-- Score Display and Action Buttons -->
        <div
v-if="hasScores && scores"
          class="flex items-center justify-between gap-3 pt-2 border-t border-default/50 dark:border-default/50 score-appear">
          <!-- Score Display -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <div
:class="[
                'px-3 py-1.5 rounded-lg font-bold text-lg shadow-md transition-shadow duration-200 cursor-default',
                getScoreColorClass(scores.overall)
              ]">
                {{ scores.overall }}
              </div>
              <div>
                <div class="text-xs font-medium text-muted dark:text-dimmed uppercase tracking-wide">
                  Quality Score
                </div>
                <div :class="['text-sm font-bold leading-tight', getScoreTextColor(scores.overall)]">
                  {{ getScoreLabel(scores.overall) }}
                </div>
              </div>
            </div>

            <!-- Mini Progress Bar -->
            <div class="hidden md:flex items-center gap-2">
              <div class="w-24 bg-muted dark:bg-elevated rounded-full h-2 overflow-hidden">
                <div
:class="['h-full transition-all duration-500', getScoreColorClass(scores.overall)]"
                  :style="{ width: `${scores.overall}%` }" />
              </div>
              <span :class="['text-xs font-semibold', getScoreTextColor(scores.overall)]">
                {{ scores.overall }}/100
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2">
            <ShareButton :url="localUrl" :is-loading="isLoading" />
            <slot name="score-button" />
            <slot name="edit-button" />
          </div>
        </div>

        <!-- Error Alert -->
        <UAlert
v-if="error" color="error" variant="subtle" icon="i-lucide-circle-x" :title="error"
          description="You can still manually enter the OG tag information below.">
          <template #close>
            <UButton icon="i-lucide-x" color="error" variant="ghost" size="xs" @click="$emit('clear-error')" />
          </template>
        </UAlert>
      </div>
    </UCard>
  </div>
</template>
