<template>
  <div
    class="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 preview-card content-stable max-h-[500px] sm:max-h-[500px] overflow-y-auto"
    :class="[
      borderClass,
      shadowClass
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  platform?: string
  shadowClass?: string
  borderClass?: string
}

withDefaults(defineProps<Props>(), {
  platform: 'default',
  shadowClass: 'shadow-md hover:shadow-lg',
  borderClass: 'border-gray-200 dark:border-gray-700'
})
</script>
