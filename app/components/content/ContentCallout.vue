<template>
  <div
    :class="[
      'not-prose my-8 rounded-xl p-6 border-l-4 shadow-sm',
      variantClasses
    ]"
  >
    <div class="flex items-start gap-4">
      <div v-if="icon" :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', iconBgClass]">
        <UIcon
          :name="icon"
          class="w-5 h-5"
          :class="iconColorClass"
        />
      </div>
      <span v-else-if="emoji" class="text-2xl shrink-0">
        {{ emoji }}
      </span>
      <div class="flex-1">
        <p v-if="title" :class="['mb-3 font-bold text-lg', titleColorClass]">
          {{ title }}
        </p>
        <div :class="['leading-relaxed', textColorClass]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CalloutVariant = 'info' | 'warning' | 'success' | 'error'

interface Props {
  variant?: CalloutVariant
  title?: string
  icon?: string
  emoji?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  title: undefined,
  icon: undefined,
  emoji: undefined
})

const variantClasses = computed(() => {
  const variants = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-400',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-400'
  }
  return variants[props.variant]
})

const titleColorClass = computed(() => {
  const colors = {
    info: 'text-blue-900 dark:text-blue-100',
    warning: 'text-yellow-900 dark:text-yellow-100',
    success: 'text-green-900 dark:text-green-100',
    error: 'text-red-900 dark:text-red-100'
  }
  return colors[props.variant]
})

const textColorClass = computed(() => {
  const colors = {
    info: 'text-blue-800 dark:text-blue-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200'
  }
  return colors[props.variant]
})

const iconColorClass = computed(() => {
  const colors = {
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400'
  }
  return colors[props.variant]
})

const iconBgClass = computed(() => {
  const backgrounds = {
    info: 'bg-blue-100 dark:bg-blue-900/30',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30',
    success: 'bg-green-100 dark:bg-green-900/30',
    error: 'bg-red-100 dark:bg-red-900/30'
  }
  return backgrounds[props.variant]
})
</script>
