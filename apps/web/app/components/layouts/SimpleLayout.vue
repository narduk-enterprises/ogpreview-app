<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  subtitle: undefined
})
</script>

<template>
  <div class="min-h-screen bg-muted dark:bg-elevated">
    <UContainer class="py-12">
      <UCard>
        <template #header>
          <div v-if="title" class="flex items-center justify-between">
            <h1 class="text-3xl font-bold text-primary dark:text-white">
              {{ title }}
            </h1>
            <div v-if="$slots.headerActions" class="flex items-center gap-2">
              <slot name="headerActions" />
            </div>
          </div>
          <div v-if="subtitle" class="mt-2">
            <p class="text-sm text-muted dark:text-dimmed">
              {{ subtitle }}
            </p>
          </div>
        </template>

        <div class="prose prose-gray dark:prose-invert max-w-none">
          <slot />
        </div>

        <!-- AdSense Ad - Bottom of Page -->
        <div class="mt-8 flex justify-center not-prose">
          <div class="w-full max-w-[728px]">
            <AdSenseAd />
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
