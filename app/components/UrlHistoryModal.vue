<script setup lang="ts">
import type { UrlHistoryEntry } from '~/composables/useUrlHistory'

interface Props {
  modelValue: boolean
  history: UrlHistoryEntry[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'select': [url: string]
  'remove': [url: string]
  'clear-all': []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

function handleSelect(url: string) {
  emit('select', url)
  isOpen.value = false
}

function handleRemove(url: string) {
  emit('remove', url)
}

function handleClearAll() {
  if (confirm('Are you sure you want to clear all history?')) {
    emit('clear-all')
    isOpen.value = false
  }
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return 'Just now'
  }
  else if (minutes < 60) {
    return `${minutes}m ago`
  }
  else if (hours < 24) {
    return `${hours}h ago`
  }
  else if (days < 7) {
    return `${days}d ago`
  }
  else {
    const date = new Date(timestamp)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'sm:max-w-2xl md:max-w-3xl',
      body: 'p-0'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-history" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            URL History
          </h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            ({{ history.length }})
          </span>
        </div>
        <UButton
          v-if="history.length > 0"
          size="sm"
          color="error"
          variant="ghost"
          icon="i-lucide-trash-2"
          label="Clear All"
          @click="handleClearAll"
        />
      </div>
    </template>

    <template #body>
      <div class="max-h-[60vh] overflow-y-auto">
        <!-- Empty State -->
        <div v-if="history.length === 0" class="text-center py-12 px-4">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <UIcon name="i-lucide-history" class="w-8 h-8 text-gray-400" />
          </div>
          <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-2">
            No history yet
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            URLs you preview will appear here
          </p>
        </div>

        <!-- History List -->
        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="entry in history"
            :key="entry.url"
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
            @click="handleSelect(entry.url)">
            <div class="flex gap-3">
              <!-- Thumbnail -->
              <div class="shrink-0">
                <div
                  v-if="entry.image"
                  class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
                  <img
                    :src="entry.image"
                    :alt="entry.title || 'Preview'"
                    class="w-full h-full object-cover"
                    @error="handleImageError">
                </div>
                <div
                  v-else
                  class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center">
                  <UIcon name="i-lucide-globe" class="w-6 h-6 text-gray-400" />
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 dark:text-white truncate mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ entry.title || 'Untitled' }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">
                  {{ entry.url }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500">
                  {{ formatTimestamp(entry.timestamp) }}
                </p>
              </div>

              <!-- Actions -->
              <div class="shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <UButton
                  icon="i-lucide-trash-2"
                  color="error"
                  variant="ghost"
                  size="xs"
                  title="Remove from history"
                  @click.stop="handleRemove(entry.url)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
