<script setup lang="ts">
interface Breadcrumb {
  label: string
  to?: string
}

interface Props {
  breadcrumbs?: Breadcrumb[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: undefined
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <UContainer class="py-12">
      <!-- Breadcrumb Navigation -->
      <div v-if="breadcrumbs && breadcrumbs.length > 0" class="mb-8">
        <div class="flex items-center gap-2 text-sm">
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <NuxtLink
              v-if="crumb.to"
              :to="crumb.to"
              class="text-muted dark:text-dimmed hover:underline"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span v-else class="text-muted dark:text-dimmed">
              {{ crumb.label }}
            </span>
            <span
              v-if="index < breadcrumbs.length - 1"
              class="text-dimmed dark:text-muted"
            >
              /
            </span>
          </template>
        </div>
      </div>

      <!-- Header Slot -->
      <div v-if="$slots.header" class="mb-12">
        <slot name="header" />
      </div>

      <!-- Main Content -->
      <UCard>
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <slot />
        </div>
      </UCard>

      <!-- CTA Slot -->
      <div v-if="$slots.cta" class="mt-12">
        <slot name="cta" />
      </div>
    </UContainer>
  </div>
</template>
