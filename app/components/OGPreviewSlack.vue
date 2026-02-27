<template>
  <BasePreviewCard
    platform="slack"
    class="max-w-md"
  >
    <!-- Message Header -->
    <div class="p-2.5">
      <div class="flex items-start gap-2.5 mb-2">
        <div class="w-9 h-9 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
          {{ (data.siteName || 'User').charAt(0).toUpperCase() }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-gray-900 dark:text-gray-100">
              {{ data.siteName || 'User' }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              <UIcon
                name="i-lucide-clock"
                class="inline w-3 h-3"
              /> 2:30 PM
            </span>
          </div>
          <p class="text-sm text-gray-800 dark:text-gray-200 mt-1">
            Check this out!
          </p>
        </div>
      </div>
    </div>

    <!-- Link Preview Card -->
    <div class="mx-2.5 mb-2.5 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-700 rounded overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      <div class="flex">
        <div class="flex-1 p-2.5 min-w-0">
          <div class="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-1 hover:underline cursor-pointer">
            {{ formatUrl(data.url) }}
          </div>
          <div class="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-2">
            {{ data.title || 'No Title' }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ data.description || 'No Description' }}
          </div>
        </div>
        <div
          v-if="data.image"
          class="w-20 h-20 shrink-0"
        >
          <img
            :src="data.image"
            :alt="data.imageAlt || data.title"
            class="w-full h-full object-cover"
            loading="lazy"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            @error="handleImageError"
          >
        </div>
        <div
          v-else
          class="w-20 h-20 shrink-0 bg-gray-200 dark:bg-gray-600 flex items-center justify-center"
        >
          <UIcon
            name="i-lucide-image-off"
            class="w-6 h-6 text-gray-400"
          />
        </div>
      </div>
    </div>

    <!-- Reactions -->
    <div class="px-2.5 pb-2.5">
      <div class="flex items-center gap-1.5">
        <div class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-1.5 py-0.5 text-xs flex items-center gap-1 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer">
          <span>👍</span>
          <span class="text-gray-700 dark:text-gray-300 font-medium">2</span>
        </div>
        <UButton
          icon="i-lucide-smile-plus"
          color="neutral"
          variant="ghost"
          size="xs"
          :padded="false"
          class="text-xs px-1"
          aria-label="Add reaction"
        />
      </div>
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
  }
}

defineProps<Props>()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
  }
}
</script>


