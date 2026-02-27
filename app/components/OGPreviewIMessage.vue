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
  <div class="max-w-sm mx-auto max-h-[500px] overflow-y-auto">
    <div class="bg-muted dark:bg-elevated p-1 rounded-3xl shadow-lg">
      <div class="bg-white dark:bg-elevated rounded-3xl overflow-hidden">
        <!-- Chat Header -->
        <div class="p-2.5 border-b border-default dark:border-default">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-elevated dark:bg-elevated rounded-full" />
            <div>
              <div class="text-xs font-semibold text-primary dark:text-primary">
                Contact Name
              </div>
              <div class="text-xs text-muted dark:text-dimmed">
                iMessage
              </div>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="px-2.5 pb-2.5 pt-2">
          <!-- Text Message -->
          <div class="mb-2">
            <div class="bg-muted rounded-2xl rounded-tl-sm p-2.5 inline-block max-w-[85%] shadow-sm">
              <p class="text-white text-sm">
                Check this out!
              </p>
            </div>
          </div>

          <!-- Link Preview Card -->
          <div class="bg-muted dark:bg-elevated rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow max-w-[90%]">
            <BasePreviewImage
              :src="data.image"
              :alt="data.imageAlt || data.title"
              aspect-class="aspect-[16/9]"
            />

            <div class="p-2.5">
              <div class="font-semibold text-sm text-primary dark:text-primary mb-1 line-clamp-2">
                {{ data.title || 'No Title' }}
              </div>
              <div class="text-xs text-muted dark:text-dimmed line-clamp-2 mb-2">
                {{ data.description || 'No Description' }}
              </div>
              <div class="text-xs text-muted flex items-center gap-1">
                <UIcon
                  name="i-lucide-link"
                  class="w-3 h-3"
                />
                <span>{{ formatUrl(data.url) }}</span>
              </div>
            </div>
          </div>

          <!-- Delivery Status -->
          <div class="text-xs text-dimmed dark:text-muted mt-1 text-right">
            Delivered
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


