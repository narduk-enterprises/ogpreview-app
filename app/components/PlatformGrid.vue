<script setup lang="ts">
interface Platform {
  name: string
  to: string
  icon?: string
  iconName?: string
  description?: string
}

interface Props {
  platforms: Platform[]
}

defineProps<Props>()
</script>

<template>
  <div class="not-prose my-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="platform in platforms"
        :key="platform.to"
        :to="platform.to"
        class="block group"
      >
        <UCard
          class="hover:shadow-lg transition-shadow cursor-pointer h-full"
        >
          <div class="flex flex-col items-center text-center p-4">
          <div
            v-if="platform.icon"
            class="text-4xl mb-3"
          >
            {{ platform.icon }}
          </div>
          <UIcon
            v-else-if="platform.iconName"
            :name="platform.iconName"
            class="w-12 h-12 mb-3 text-gray-600 dark:text-gray-400"
          />
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
            {{ platform.name }}
          </h3>
          <p v-if="platform.description" class="text-sm text-gray-600 dark:text-gray-400">
            {{ platform.description }}
          </p>
        </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
