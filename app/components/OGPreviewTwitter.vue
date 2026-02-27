<template>
  <PreviewCard
    platform="twitter"
    border-class="border-gray-200 dark:border-gray-700"
    shadow-class="shadow-md"
  >
    <!-- Tweet Header -->
    <div class="p-2.5 sm:p-3">
      <div class="flex items-start gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
        <div class="w-9 h-9 sm:w-11 sm:h-11 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold shadow-md shrink-0">
          <UIcon
            name="i-lucide-twitter"
            class="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1 sm:gap-1.5">
            <span class="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate">
              {{ data.siteName || 'Twitter User' }}
            </span>
            <UIcon
              name="i-lucide-badge-check"
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500 shrink-0"
            />
          </div>
          <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            @{{ (data.siteName || 'user').toLowerCase().replace(/\s+/g, '') }}
          </div>
        </div>
      </div>
      <p class="text-xs sm:text-sm text-gray-800 dark:text-gray-200 mb-2 sm:mb-2.5">
        Check out this amazing content!
      </p>
    </div>

    <!-- Link Card -->
    <div class="border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl mx-2 sm:mx-3 mb-2 sm:mb-3 overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
      <PreviewImage
        :src="data.image"
        :alt="data.imageAlt || data.title"
        aspect-class="aspect-[2/1]"
      />

      <div class="p-2 sm:p-2.5 border-t border-gray-200 dark:border-gray-700">
        <div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1 truncate">
          {{ formatUrl(data.url) }}
        </div>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-1">
          {{ data.title || 'No Title' }}
        </div>
        <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {{ data.description || 'No Description' }}
        </div>
      </div>
    </div>

    <!-- Engagement Actions -->
    <div class="px-2 py-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-message-circle"
        :padded="false"
        class="text-xs px-1"
      />
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-repeat-2"
        :padded="false"
        class="text-xs px-1"
      />
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-heart"
        :padded="false"
        class="text-xs px-1"
      />
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-share"
        :padded="false"
        class="text-xs px-1"
      />
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
    twitterCard?: string
  }
}

defineProps<Props>()
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
