<template>
  <PreviewCard platform="linkedin">
    <!-- Post Header -->
    <div class="p-3">
      <div class="flex items-center gap-2.5 mb-2.5">
        <div class="w-11 h-11 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
          <UIcon name="i-lucide-linkedin" class="w-5 h-5" />
        </div>
        <div class="flex-1">
          <div class="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {{ data.siteName || 'LinkedIn User' }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            1h •
            <UIcon name="i-lucide-globe" class="w-3 h-3" />
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-800 dark:text-gray-200">
        Excited to share this with you all!
      </p>
    </div>

    <!-- Link Preview -->
    <div
      class="border-t border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
      <PreviewImage :src="data.image" :alt="data.imageAlt || data.title" aspect-class="aspect-[2.4/1]" />

      <div class="p-3">
        <div class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
          {{ data.title || 'No Title' }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ formatUrl(data.url) }}
        </div>
      </div>
    </div>

    <!-- Engagement Actions -->
    <div class="px-2 py-2 flex items-center justify-around">
      <UButton
color="neutral" variant="ghost" size="xs" icon="i-lucide-thumbs-up" :padded="false"
        class="text-xs px-1.5" />
      <UButton
color="neutral" variant="ghost" size="xs" icon="i-lucide-message-square" :padded="false"
        class="text-xs px-1.5" />
      <UButton
color="neutral" variant="ghost" size="xs" icon="i-lucide-repeat" :padded="false"
        class="text-xs px-1.5" />
      <UButton color="neutral" variant="ghost" size="xs" icon="i-lucide-send" :padded="false" class="text-xs px-1.5" />
    </div>

    <!-- AdSense Ad Unit -->
    <div class="border-t border-gray-200 dark:border-gray-700 p-3">
      <AdSenseAd />
    </div>
  </PreviewCard>
</template>

<script setup lang="ts">
import { formatUrl } from '~/utils/formatUrl'

interface Props {
  data: {
    title: string
    description: string
    image: string
    url: string
    siteName: string
    type: string
    imageAlt?: string
  }
}

defineProps<Props>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
