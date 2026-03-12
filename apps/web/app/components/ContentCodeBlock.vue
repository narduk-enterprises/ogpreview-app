<script setup lang="ts">

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
    <div class="relative rounded-xl overflow-hidden bg-elevated dark:bg-muted border border-default dark:border-default shadow-xl">
      <!-- Header with language label and copy button -->
      <div
        v-if="language || showCopy"
        class="flex items-center justify-between px-4 py-2.5 bg-elevated dark:bg-elevated border-b border-default dark:border-default"
      >
        <span
          v-if="language"
          class="text-xs font-mono text-dimmed dark:text-dimmed uppercase tracking-wider font-semibold"
        >
          {{ language }}
        </span>
        <div v-else />
        <UButton
          v-if="showCopy"
          variant="ghost"
          size="xs"
          color="neutral"
          :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'"
          :class="copied ? 'text-muted dark:text-dimmed' : ''"
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
      ><code :class="language ? `language-${language}` : ''" class="text-primary dark:text-primary">{{ code }}</code></pre>
    </div>
  </div>
</template>
