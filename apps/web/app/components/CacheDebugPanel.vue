<script setup lang="ts">
interface CacheDebugInfo {
  endpoint: 'cached' | 'refresh'
  timestamp: number
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

<template>
  <div
    v-if="debugInfo"
    class="mt-4 p-4 bg-muted dark:bg-elevated rounded-lg border border-default dark:border-default"
  >
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold text-primary dark:text-white flex items-center gap-2">
        <UIcon name="i-lucide-file-text" class="w-4 h-4" />
        Cache Debug Info
      </h3>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-x"
        size="xs"
        aria-label="Hide debug info"
        class="text-dimmed hover:text-muted dark:hover:text-dimmed"
        @click="$emit('close')"
      />
    </div>

    <div class="space-y-2 text-xs font-mono">
      <div
        class="flex items-start gap-2"
        data-test="debug-endpoint"
      >
        <span class="text-muted dark:text-dimmed min-w-[120px]">Endpoint:</span>
        <span class="text-primary dark:text-white font-semibold">
          {{ debugInfo.endpoint === 'cached' ? '/api/unfurl' : '/api/unfurl/refresh' }}
        </span>
        <span
          :class="[
            'px-2 py-0.5 rounded text-xs font-medium',
            debugInfo.endpoint === 'cached'
              ? 'bg-muted text-primary dark:bg-elevated dark:text-primary'
              : 'bg-muted text-primary dark:bg-elevated dark:text-primary'
          ]"
          data-test="debug-endpoint-label"
        >
          {{ debugInfo.endpoint === 'cached' ? 'Cacheable' : 'No Cache' }}
        </span>
      </div>



      <div
        v-if="debugInfo.age"
        class="flex items-start gap-2"
      >
        <span class="text-muted dark:text-dimmed min-w-[120px]">Age:</span>
        <span class="text-primary dark:text-white">
          {{ formatAge(debugInfo.age) }}
        </span>
      </div>

      <div
        v-if="debugInfo.cacheControl"
        class="flex items-start gap-2"
      >
        <span class="text-muted dark:text-dimmed min-w-[120px]">Cache-Control:</span>
        <span class="text-primary dark:text-white break-all">
          {{ debugInfo.cacheControl }}
        </span>
      </div>

      <div class="flex items-start gap-2">
        <span class="text-muted dark:text-dimmed min-w-[120px]">Timestamp:</span>
        <span class="text-primary dark:text-white">
          {{ formatTimestamp(debugInfo.timestamp) }}
        </span>
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-default dark:border-default">
      <p class="text-xs text-muted dark:text-dimmed">
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
