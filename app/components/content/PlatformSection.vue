<template>
  <div class="not-prose platform-section my-8">
    <h3 v-if="platform" class="text-xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
      <div class="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
        <PlatformIcon :platform="platform" size="md" />
      </div>
      {{ platform }}
    </h3>
    <div class="space-y-4">
      <div v-if="recommendedSize" class="flex items-start gap-3">
        <strong class="text-gray-900 dark:text-white min-w-[160px] text-sm font-semibold">Recommended size:</strong>
        <span class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{{ recommendedSize }}</span>
      </div>
      <div v-if="minimumSize" class="flex items-start gap-3">
        <strong class="text-gray-900 dark:text-white min-w-[160px] text-sm font-semibold">Minimum size:</strong>
        <span class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{{ minimumSize }}</span>
      </div>
      <div v-if="supports" class="flex items-start gap-3">
        <strong class="text-gray-900 dark:text-white min-w-[160px] text-sm font-semibold">Supports:</strong>
        <span class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{{ supports }}</span>
      </div>
      <div v-if="debugTool" class="flex items-start gap-3">
        <strong class="text-gray-900 dark:text-white min-w-[160px] text-sm font-semibold">Debug tool:</strong>
        <a
          v-if="debuggerUrl"
          :href="debuggerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          {{ debugTool }}
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3.5 h-3.5" />
        </a>
        <span v-else class="text-gray-700 dark:text-gray-300 text-sm">{{ debugTool }}</span>
      </div>
      <div v-if="notes" class="mt-6 pt-5 border-t border-gray-200 dark:border-gray-600">
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ notes }}</p>
      </div>
      <div v-if="$slots.default" class="mt-5 pt-5 border-t border-gray-200 dark:border-gray-600">
        <slot />
      </div>
    </div>
  </div>
</template>

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

<style scoped>
.platform-section {
  background: linear-gradient(to bottom right, rgb(249 250 251), rgb(243 244 246));
  border: 1px solid rgb(229 231 235);
  border-left: 4px solid rgb(59 130 246);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;
}

.platform-section:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-left-color: rgb(37 99 235);
}

@media (prefers-color-scheme: dark) {
  .platform-section {
    background: linear-gradient(to bottom right, rgb(31 41 55), rgb(17 24 39));
    border-color: rgb(55 65 81);
    border-left-color: rgb(96 165 250);
  }

  .platform-section:hover {
    border-left-color: rgb(147 197 253);
  }
}
</style>
