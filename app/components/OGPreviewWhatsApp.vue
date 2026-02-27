<template>
  <div class="max-w-sm mx-auto bg-gray-100 dark:bg-gray-900 p-3 rounded-lg max-h-[500px] overflow-y-auto">
    <!-- Chat Header -->
    <div class="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-gray-300 dark:border-gray-700">
      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
        {{ (data.siteName || 'C').charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1">
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          {{ data.siteName || 'Contact' }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <UIcon
            name="i-lucide-circle"
            class="w-2 h-2 text-green-500"
            fill="currentColor"
          />
          online
        </div>
      </div>
    </div>

    <!-- Message Bubble with Link Preview -->
    <div class="flex justify-start">
      <div class="max-w-[85%]">
        <!-- Message Text -->
        <div class="bg-white dark:bg-gray-800 rounded-lg rounded-tl-none p-2.5 mb-1 shadow-sm">
          <p class="text-sm text-gray-900 dark:text-gray-100 mb-2">
            Check this out!
          </p>
          <p class="text-sm text-blue-600 dark:text-blue-400 break-all hover:underline cursor-pointer">
            {{ data.url || 'https://example.com' }}
          </p>
        </div>

        <!-- Link Preview Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <BasePreviewImage
            :src="data.image"
            :alt="data.imageAlt || data.title"
            aspect-class="aspect-video"
          />

          <div class="p-2.5 bg-gray-50 dark:bg-gray-700">
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-2">
              {{ data.title || 'No Title' }}
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {{ data.description || 'No Description' }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
              <UIcon
                name="i-lucide-link"
                class="w-3 h-3"
              />
              <span>{{ formatUrl(data.url) }}</span>
            </div>
          </div>
        </div>

        <!-- Timestamp -->
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right flex items-center justify-end gap-1">
          2:30 PM
          <UIcon
            name="i-lucide-check-check"
            class="w-3 h-3 text-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
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
