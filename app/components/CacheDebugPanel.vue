<template>
  <div
    v-if="debugInfo"
    class="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Cache Debug Info
      </h3>
      <button
        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        title="Hide debug info"
        @click="$emit('close')"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div class="space-y-2 text-xs font-mono">
      <div
        class="flex items-start gap-2"
        data-test="debug-endpoint"
      >
        <span class="text-gray-500 dark:text-gray-400 min-w-[120px]">Endpoint:</span>
        <span class="text-gray-900 dark:text-white font-semibold">
          {{ debugInfo.endpoint === 'cached' ? '/api/unfurl' : '/api/unfurl/refresh' }}
        </span>
        <span
          :class="[
            'px-2 py-0.5 rounded text-xs font-medium',
            debugInfo.endpoint === 'cached'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
          ]"
          data-test="debug-endpoint-label"
        >
          {{ debugInfo.endpoint === 'cached' ? 'Cacheable' : 'No Cache' }}
        </span>
      </div>

      <div
        v-if="debugInfo.vercelCache"
        class="flex items-start gap-2"
        data-test="debug-vercel-cache"
      >
        <span class="text-gray-500 dark:text-gray-400 min-w-[120px]">x-vercel-cache:</span>
        <span
          :class="[
            'px-2 py-0.5 rounded text-xs font-semibold',
            getCacheStatusClass(debugInfo.vercelCache)
          ]"
          data-test="debug-cache-status"
        >
          {{ debugInfo.vercelCache }}
        </span>
        <span class="text-gray-600 dark:text-gray-400 text-xs">
          {{ getCacheStatusDescription(debugInfo.vercelCache) }}
        </span>
      </div>

      <div
        v-if="debugInfo.age"
        class="flex items-start gap-2"
      >
        <span class="text-gray-500 dark:text-gray-400 min-w-[120px]">Age:</span>
        <span class="text-gray-900 dark:text-white">
          {{ formatAge(debugInfo.age) }}
        </span>
      </div>

      <div
        v-if="debugInfo.cacheControl"
        class="flex items-start gap-2"
      >
        <span class="text-gray-500 dark:text-gray-400 min-w-[120px]">Cache-Control:</span>
        <span class="text-gray-900 dark:text-white break-all">
          {{ debugInfo.cacheControl }}
        </span>
      </div>

      <div class="flex items-start gap-2">
        <span class="text-gray-500 dark:text-gray-400 min-w-[120px]">Timestamp:</span>
        <span class="text-gray-900 dark:text-white">
          {{ formatTimestamp(debugInfo.timestamp) }}
        </span>
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <p class="text-xs text-gray-600 dark:text-gray-400">
        <strong>Tip:</strong>
        <template v-if="debugInfo.endpoint === 'cached'">
          First request is usually a MISS. Subsequent requests within 1 hour should be HIT.
          After 1 hour but within 24 hours, you may see STALE (served while revalidating in background).
        </template>
        <template v-else>
          Refresh endpoint always fetches fresh data and never caches.
        </template>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CacheDebugInfo {
  endpoint: 'cached' | 'refresh'
  timestamp: number
  vercelCache?: string
  age?: string
  cacheControl?: string
}

interface Props {
  debugInfo: CacheDebugInfo | null
}

defineProps<Props>()
defineEmits<{
  close: []
}>()

function getCacheStatusClass(status: string): string {
  const statusUpper = status.toUpperCase()
  switch (statusUpper) {
    case 'HIT':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'MISS':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'STALE':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'BYPASS':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }
}

function getCacheStatusDescription(status: string): string {
  const statusUpper = status.toUpperCase()
  switch (statusUpper) {
    case 'HIT':
      return 'Response served from CDN cache'
    case 'MISS':
      return 'Cache miss, fetched from origin'
    case 'STALE':
      return 'Stale cache served while revalidating'
    case 'BYPASS':
      return 'Cache bypassed'
    case 'REVALIDATED':
      return 'Background revalidation completed'
    default:
      return ''
  }
}

function formatAge(ageSeconds: string): string {
  const seconds = Number.parseInt(ageSeconds)
  if (Number.isNaN(seconds)) return ageSeconds

  if (seconds < 60) {
    return `${seconds}s (fresh)`
  }
  else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }
  else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
}

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}
</script>
