<template>
  <code
    :class="[
      'inline-code-highlight',
      highlight ? 'highlighted' : ''
    ]"
  >
    {{ code }}
  </code>
</template>

<script setup lang="ts">
interface Props {
  code: string
  highlight?: boolean
}

withDefaults(defineProps<Props>(), {
  highlight: true
})
</script>


