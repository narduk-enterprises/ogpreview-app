<script setup lang="ts">
interface Props {
  title: string
  description?: string
  color?: 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning' | 'neutral'
  icon?: string
}

withDefaults(defineProps<Props>(), {
  color: 'info',
  icon: 'i-lucide-lightbulb'
})
</script>

<template>
  <UAlert
    :color="color"
    variant="subtle"
    :icon="icon"
    :title="title"
    class="not-prose my-6"
    :ui="{
      wrapper: 'rounded-lg',
      title: 'font-semibold text-base',
      description: 'text-sm leading-relaxed mt-2'
    }"
  >
    <template v-if="description" #description>
      <slot name="description">
        <p v-html="description"></p>
      </slot>
    </template>
    <template v-else-if="$slots.default" #description>
      <slot />
    </template>
  </UAlert>
</template>
