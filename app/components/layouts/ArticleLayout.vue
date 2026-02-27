<template>
  <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <article class="max-w-4xl mx-auto">
      <!-- Navigation -->
      <nav v-if="backLink" class="mb-8">
        <NuxtLink
          :to="backLink.to"
          class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
          {{ backLink.label }}
        </NuxtLink>
      </nav>

      <!-- Header -->
      <header class="mb-12">
        <div v-if="platformIcon" class="mb-6 flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-lg">
            <PlatformIcon :platform="platformIcon" size="xl" />
          </div>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ title }}
        </h1>
        <p v-if="description" class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {{ description }}
        </p>
        <div v-if="metadata" class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span v-if="metadata.date" class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            {{ metadata.date }}
          </span>
          <span v-if="metadata.readTime" class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            {{ metadata.readTime }}
          </span>
        </div>
      </header>

      <!-- AdSense Ad - Top of Article -->
      <div class="mb-8 flex justify-center">
        <div class="w-full max-w-[728px]">
          <AdSenseAd />
        </div>
      </div>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-2xl px-8 py-10 sm:px-12 sm:py-12 shadow-lg">
        <slot />
      </div>

      <!-- AdSense Ad - Bottom of Article -->
      <div class="mt-8 flex justify-center">
        <div class="w-full max-w-[728px]">
          <AdSenseAd />
        </div>
      </div>

      <!-- CTA Slot -->
      <div v-if="$slots.cta" class="mt-12">
        <slot name="cta" />
      </div>

      <!-- Related Articles / Platform Navigation -->
      <div v-if="$slots.related" class="mt-12">
        <slot name="related" />
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
interface BackLink {
  to: string
  label: string
}

interface ArticleMetadata {
  date?: string
  readTime?: string
}

interface Props {
  title: string
  description?: string
  icon?: string
  platformIcon?: string
  backLink?: BackLink
  metadata?: ArticleMetadata
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: undefined,
  platformIcon: undefined,
  backLink: undefined,
  metadata: undefined
})
</script>
