<script setup lang="ts">
interface Props {
  title: string
  description?: string
  color?: 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning' | 'neutral'
  icon?: string
}

withDefaults(defineProps<Props>(), {
  description: '',
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
  >
    <template v-if="description" #description>
      <slot name="description">
        <!-- eslint-disable-next-line vue/no-v-html -- description prop is trusted rich-text content passed from parent; XSS risk is accepted at the call site -->
        <p v-html="description"/>
      </slot>
    </template>
    <template v-else-if="$slots.default" #description>
      <slot />
    </template>
  </UAlert>
</template>
