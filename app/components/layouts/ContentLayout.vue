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
  <div class="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <UContainer class="py-12">
      <!-- Breadcrumb Navigation -->
      <nav v-if="breadcrumbs && breadcrumbs.length > 0" class="mb-8">
        <div class="flex items-center gap-2 text-sm">
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <NuxtLink
              v-if="crumb.to"
              :to="crumb.to"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span v-else class="text-gray-600 dark:text-gray-400">
              {{ crumb.label }}
            </span>
            <span
              v-if="index < breadcrumbs.length - 1"
              class="text-gray-400 dark:text-gray-500"
            >
              /
            </span>
          </template>
        </div>
      </nav>

      <!-- Header Slot -->
      <header v-if="$slots.header" class="mb-12">
        <slot name="header" />
      </header>

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
