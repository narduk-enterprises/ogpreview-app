<template>
  <div class="max-w-md mx-auto bg-linear-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-3 rounded-lg max-h-[500px] overflow-y-auto">
    <!-- Chat Header -->
    <div class="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-blue-200 dark:border-gray-700">
      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
        {{ (data.siteName || 'T').charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1">
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          {{ data.siteName || 'Telegram Channel' }}
        </div>
        <div class="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <UIcon
            name="i-lucide-circle"
            class="w-2 h-2 text-blue-500"
            fill="currentColor"
          />
          online
        </div>
      </div>
    </div>

    <!-- Message Bubble -->
    <div class="flex justify-start mb-2">
      <div class="max-w-[90%]">
        <!-- Link Preview Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <!-- Image -->
          <BasePreviewImage
            :src="data.image"
            :alt="data.imageAlt || data.title"
            aspect-class="max-h-64"
          />

          <!-- Content -->
          <div class="p-2.5">
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 line-clamp-2">
              {{ data.title || 'No Title' }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-2">
              {{ data.description || 'No Description' }}
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0 w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-sm flex items-center justify-center">
                <UIcon
                  name="i-lucide-link"
                  class="w-3 h-3 text-gray-600 dark:text-gray-400"
                />
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">
                {{ formatUrl(data.url) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Message Metadata -->
        <div class="flex items-center justify-between mt-1 px-2">
          <div class="text-xs text-gray-500 dark:text-gray-400">
            2:30 PM
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <UIcon
              name="i-lucide-eye"
              class="w-3 h-3"
            />
            <span>125</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Reaction Bar -->
    <div class="flex items-center gap-1.5 pl-2">
      <UButton
        color="neutral"
        variant="soft"
        size="xs"
        :padded="false"
        class="rounded-full text-xs px-2 py-0.5"
      >
        👍 12
      </UButton>
      <UButton
        color="neutral"
        variant="soft"
        size="xs"
        :padded="false"
        class="rounded-full text-xs px-2 py-0.5"
      >
        ❤️ 8
      </UButton>
      <UButton
        icon="i-lucide-smile-plus"
        color="neutral"
        variant="ghost"
        size="xs"
        :padded="false"
        class="rounded-full text-xs px-1"
        aria-label="Add reaction"
      />
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
