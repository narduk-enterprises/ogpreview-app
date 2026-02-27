<script setup lang="ts">
interface Props {
  platform: string
  icon?: string
  recommendedSize?: string
  minimumSize?: string
  supports?: string
  debugTool?: string
  debuggerUrl?: string
  notes?: string
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  recommendedSize: undefined,
  minimumSize: undefined,
  supports: undefined,
  debugTool: undefined,
  debuggerUrl: undefined,
  notes: undefined
})
</script>

<template>
  <div class="not-prose platform-section my-8">
    <h3 v-if="platform" class="text-xl font-bold mb-6 flex items-center gap-3 text-primary dark:text-white">
      <div class="w-10 h-10 rounded-lg bg-white dark:bg-elevated flex items-center justify-center shadow-sm">
        <PlatformIcon :platform="platform" size="md" />
      </div>
      {{ platform }}
    </h3>
    <div class="space-y-4">
      <div v-if="recommendedSize" class="flex items-start gap-3">
        <strong class="text-primary dark:text-white min-w-[160px] text-sm font-semibold">Recommended size:</strong>
        <span class="text-primary dark:text-dimmed text-sm leading-relaxed">{{ recommendedSize }}</span>
      </div>
      <div v-if="minimumSize" class="flex items-start gap-3">
        <strong class="text-primary dark:text-white min-w-[160px] text-sm font-semibold">Minimum size:</strong>
        <span class="text-primary dark:text-dimmed text-sm leading-relaxed">{{ minimumSize }}</span>
      </div>
      <div v-if="supports" class="flex items-start gap-3">
        <strong class="text-primary dark:text-white min-w-[160px] text-sm font-semibold">Supports:</strong>
        <span class="text-primary dark:text-dimmed text-sm leading-relaxed">{{ supports }}</span>
      </div>
      <div v-if="debugTool" class="flex items-start gap-3">
        <strong class="text-primary dark:text-white min-w-[160px] text-sm font-semibold">Debug tool:</strong>
        <ULink
          v-if="debuggerUrl"
          :href="debuggerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted dark:text-dimmed hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          {{ debugTool }}
          <UIcon name="i-lucide-arrow-top-right-on-square" class="w-3.5 h-3.5" />
        </ULink>
        <span v-else class="text-primary dark:text-dimmed text-sm">{{ debugTool }}</span>
      </div>
      <div v-if="notes" class="mt-6 pt-5 border-t border-default dark:border-default">
        <p class="text-sm text-muted dark:text-dimmed leading-relaxed">{{ notes }}</p>
      </div>
      <div v-if="$slots.default" class="mt-5 pt-5 border-t border-default dark:border-default">
        <slot />
      </div>
    </div>
  </div>
</template>


