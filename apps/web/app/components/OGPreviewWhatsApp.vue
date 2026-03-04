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

<template>
  <div class="max-w-sm mx-auto bg-muted dark:bg-elevated p-3 rounded-lg max-h-[500px] overflow-y-auto">
    <!-- Chat Header -->
    <div class="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-default dark:border-default">
      <div class="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-white font-bold shadow-md">
        {{ (data.siteName || 'C').charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1">
        <div class="font-semibold text-primary dark:text-primary text-sm">
          {{ data.siteName || 'Contact' }}
        </div>
        <div class="text-xs text-muted dark:text-dimmed flex items-center gap-1">
          <UIcon
            name="i-lucide-circle"
            class="w-2 h-2 text-muted"
            
          />
          online
        </div>
      </div>
    </div>

    <!-- Message Bubble with Link Preview -->
    <div class="flex justify-start">
      <div class="max-w-[85%]">
        <!-- Message Text -->
        <div class="bg-white dark:bg-elevated rounded-lg rounded-tl-none p-2.5 mb-1 shadow-sm">
          <p class="text-sm text-primary dark:text-primary mb-2">
            Check this out!
          </p>
          <p class="text-sm text-muted dark:text-dimmed break-all hover:underline cursor-pointer">
            {{ data.url || 'https://example.com' }}
          </p>
        </div>

        <!-- Link Preview Card -->
        <div class="bg-white dark:bg-elevated rounded-lg overflow-hidden border border-default dark:border-default shadow-sm">
          <BasePreviewImage
            :src="data.image"
            :alt="data.imageAlt || data.title"
            aspect-class="aspect-video"
          />

          <div class="p-2.5 bg-muted dark:bg-elevated">
            <div class="font-semibold text-primary dark:text-primary text-sm mb-1 line-clamp-2">
              {{ data.title || 'No Title' }}
            </div>
            <div class="text-xs text-muted dark:text-dimmed line-clamp-2 mb-2">
              {{ data.description || 'No Description' }}
            </div>
            <div class="text-xs text-muted dark:text-muted flex items-center gap-1">
              <UIcon
                name="i-lucide-link"
                class="w-3 h-3"
              />
              <span>{{ formatUrl(data.url) }}</span>
            </div>
          </div>
        </div>

        <!-- Timestamp -->
        <div class="text-xs text-muted dark:text-dimmed mt-1 text-right flex items-center justify-end gap-1">
          2:30 PM
          <UIcon
            name="i-lucide-check-check"
            class="w-3 h-3 text-muted"
          />
        </div>
      </div>
    </div>
  </div>
</template>


