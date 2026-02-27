<template>
  <div class="bg-gray-700 dark:bg-gray-800 rounded-lg p-3 max-w-md max-h-[500px] overflow-y-auto shadow-lg">
    <!-- Message Header -->
    <div class="flex items-start gap-2.5 mb-2.5">
      <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-md">
        {{ (data.siteName || 'D').charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-semibold text-white text-sm">
            {{ data.siteName || 'Discord User' }}
          </span>
          <span class="text-xs text-gray-400">
            <UIcon
              name="i-lucide-clock"
              class="inline w-3 h-3"
            /> Today at 2:30 PM
          </span>
        </div>
        <p class="text-sm text-gray-300">
          Check this out!
        </p>
      </div>
    </div>

    <!-- Embed Card -->
    <div class="ml-12 border-l-4 border-indigo-500 bg-gray-800 dark:bg-gray-900 rounded overflow-hidden">
      <div class="p-2.5">
        <div class="font-semibold text-blue-400 text-sm mb-2 hover:underline cursor-pointer">
          {{ formatUrl(data.url) }}
        </div>
        <div class="font-semibold text-white text-base mb-2">
          {{ data.title || 'No Title' }}
        </div>
        <div class="text-sm text-gray-300 mb-3 line-clamp-3">
          {{ data.description || 'No Description' }}
        </div>

        <div
          v-if="data.image"
          class="rounded overflow-hidden"
        >
          <img
            :src="data.image"
            :alt="data.imageAlt || data.title"
            class="w-full max-h-64 object-cover"
            loading="lazy"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            @error="handleImageError"
          >
        </div>
        <div
          v-else
          class="rounded overflow-hidden bg-gray-700 dark:bg-gray-800 h-48 flex items-center justify-center"
        >
          <div class="text-center">
            <UIcon
              name="i-lucide-image-off"
              class="w-12 h-12 text-gray-500 mx-auto mb-2"
            />
            <span class="text-sm text-gray-400">No Image</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Actions -->
    <div class="ml-12 mt-2 flex items-center gap-2 text-gray-400">
      <UButton
        icon="i-lucide-message-circle"
        color="neutral"
        variant="ghost"
        size="xs"
        :padded="false"
        class="text-gray-400 hover:text-gray-200 text-xs px-1.5"
      />
      <UButton
        icon="i-lucide-smile"
        color="neutral"
        variant="ghost"
        size="xs"
        :padded="false"
        class="text-gray-400 hover:text-gray-200 text-xs px-1.5"
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

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
