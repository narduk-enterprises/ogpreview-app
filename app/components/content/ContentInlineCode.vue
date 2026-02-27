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

<style scoped>
.inline-code-highlight {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  line-height: 1.5;
  white-space: nowrap;
}

.inline-code-highlight.highlighted {
  background-color: rgb(243 244 246);
  color: rgb(220 38 38);
  border: 1px solid rgb(229 231 235);
}

@media (prefers-color-scheme: dark) {
  .inline-code-highlight.highlighted {
    background-color: rgb(31 41 55);
    color: rgb(251 146 60);
    border-color: rgb(55 65 81);
  }
}
</style>
