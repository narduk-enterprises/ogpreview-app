<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  code: string
  language?: string
  showCopy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: undefined,
  showCopy: true
})

const copied = ref(false)

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="not-prose my-8">
    <div class="relative rounded-xl overflow-hidden bg-gray-900 dark:bg-gray-950 border border-gray-800 dark:border-gray-700 shadow-xl">
      <!-- Header with language label and copy button -->
      <div
        v-if="language || showCopy"
        class="flex items-center justify-between px-4 py-2.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800"
      >
        <span
          v-if="language"
          class="text-xs font-mono text-gray-400 dark:text-gray-400 uppercase tracking-wider font-semibold"
        >
          {{ language }}
        </span>
        <div v-else />
        <UButton
          v-if="showCopy"
          variant="ghost"
          size="xs"
          color="neutral"
          :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
          :class="copied ? 'text-green-500 dark:text-green-400' : ''"
          @click="copyToClipboard"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </UButton>
      </div>

      <!-- Code content -->
      <pre
        :class="[
          'overflow-x-auto p-6 text-sm leading-loose',
          language ? 'font-mono' : 'font-mono'
        ]"
      ><code :class="language ? `language-${language}` : ''" class="text-gray-100 dark:text-gray-200">{{ code }}</code></pre>
    </div>
  </div>
</template>
