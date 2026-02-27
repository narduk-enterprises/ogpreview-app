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
  <BasePreviewCard platform="linkedin">
    <!-- Post Header -->
    <div class="p-3">
      <div class="flex items-center gap-2.5 mb-2.5">
        <div class="w-11 h-11 bg-elevated rounded-full flex items-center justify-center text-white font-bold shadow-md">
          <UIcon name="i-lucide-linkedin" class="w-5 h-5" />
        </div>
        <div class="flex-1">
          <div class="font-semibold text-sm text-primary dark:text-primary">
            {{ data.siteName || 'LinkedIn User' }}
          </div>
          <div class="text-xs text-muted dark:text-dimmed flex items-center gap-1">
            1h •
            <UIcon name="i-lucide-globe" class="w-3 h-3" />
          </div>
        </div>
      </div>
      <p class="text-sm text-primary dark:text-primary">
        Excited to share this with you all!
      </p>
    </div>

    <!-- Link Preview -->
    <div
      class="border-t border-b border-default dark:border-default hover:bg-muted dark:hover:bg-elevated/30 transition-colors cursor-pointer">
      <BasePreviewImage :src="data.image" :alt="data.imageAlt || data.title" aspect-class="aspect-[2.4/1]" />

      <div class="p-3">
        <div class="font-semibold text-base text-primary dark:text-primary mb-1 line-clamp-2">
          {{ data.title || 'No Title' }}
        </div>
        <div class="text-xs text-muted dark:text-dimmed">
          {{ formatUrl(data.url) }}
        </div>
      </div>
    </div>

    <!-- Engagement Actions -->
    <div class="px-2 py-2 flex items-center justify-around">
      <UButton
color="neutral" variant="ghost" size="xs" icon="i-lucide-thumbs-up" class="pnpm text-xs px-1.5" />
      <UButton
color="neutral" variant="ghost" size="xs" icon="i-lucide-message-square" class="pnpm text-xs px-1.5" />
      <UButton
color="neutral" variant="ghost" size="xs" icon="i-lucide-repeat" class="pnpm text-xs px-1.5" />
      <UButton color="neutral" variant="ghost" size="xs" icon="i-lucide-send" class="pnpm text-xs px-1.5" />
    </div>

    <!-- AdSense Ad Unit -->
    <div class="border-t border-default dark:border-default p-3">
      <AdSenseAd />
    </div>
  </BasePreviewCard>
</template>


