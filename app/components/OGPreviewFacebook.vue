<template>
  <BasePreviewCard platform="facebook">
    <!-- Post Header -->
    <div class="p-3 sm:p-3">
      <div class="flex items-center gap-2.5 sm:gap-2.5 mb-2.5 sm:mb-2.5">
        <div class="w-10 h-10 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md shrink-0">
          <UIcon
            name="i-lucide-facebook"
            class="w-5 h-5 sm:w-5 sm:h-5"
          />
        </div>
        <div class="min-w-0">
          <div class="font-semibold text-sm sm:text-sm text-gray-900 dark:text-gray-100 truncate">
            {{ data.siteName || 'Facebook Page' }}
          </div>
          <div class="text-xs sm:text-xs text-gray-500 dark:text-gray-400">
            Sponsored · <UIcon
              name="i-lucide-globe"
              class="inline w-3 h-3 sm:w-3 sm:h-3"
            />
          </div>
        </div>
      </div>
      <p class="text-sm sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
        Check out this amazing content!
      </p>
    </div>

    <!-- Link Preview -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <BasePreviewImage
        :src="data.image"
        :alt="data.imageAlt || data.title"
        aspect-class="aspect-[1.91/1]"
      />

      <div class="p-3 sm:p-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
        <div class="text-xs sm:text-xs text-gray-500 dark:text-gray-400 uppercase mb-1 sm:mb-1 font-medium truncate">
          {{ formatUrl(data.url) }}
        </div>
        <div class="font-semibold text-base sm:text-base text-gray-900 dark:text-gray-100 mb-1 sm:mb-1 line-clamp-2 leading-snug">
          {{ data.title || 'No Title' }}
        </div>
        <div class="text-sm sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {{ data.description || 'No Description' }}
        </div>
      </div>
    </div>

    <!-- Engagement Actions -->
    <div class="px-2 sm:px-2 py-2 sm:py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around text-sm sm:text-sm">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-thumbs-up"
        :padded="false"
        class="text-sm px-2 sm:px-1.5"
      />
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-message-circle"
        :padded="false"
        class="text-sm px-2 sm:px-1.5"
      />
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-share-2"
        :padded="false"
        class="text-sm px-2 sm:px-1.5"
      />
    </div>
  </BasePreviewCard>
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
    imageWidth?: string
    imageHeight?: string
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
