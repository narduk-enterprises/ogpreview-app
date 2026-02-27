<template>
  <UButton
    :icon="copied ? 'i-lucide-check' : 'i-lucide-share-2'"
    :label="buttonLabel"
    :color="copied ? 'success' : 'neutral'"
    variant="outline"
    size="sm"
    :disabled="!url || isLoading"
    class="transition-all duration-200"
    :class="{ 'scale-105': copied }"
    aria-label="Share preview URL"
    @click="handleShare"
  />
</template>

<script setup lang="ts">
interface Props {
  url: string
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})

const { copyShareableUrl } = useUrlSync()
const copied = ref(false)
const buttonLabel = computed(() => copied.value ? 'Copied!' : 'Share')

let resetTimeout: NodeJS.Timeout | null = null

const handleShare = async () => {
  if (!props.url) return

  // Try to use Web Share API if available (mobile devices)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      const { getShareableUrl } = useUrlSync()
      const shareableUrl = getShareableUrl(props.url)

      await navigator.share({
        title: 'OG Preview',
        text: 'Check out this Open Graph preview',
        url: shareableUrl
      })
      return
    }
    catch (error) {
      // If user cancels or share fails, fall back to copy
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error)
      }
    }
  }

  // Fallback to copying URL
  const success = await copyShareableUrl(props.url)

  if (success) {
    copied.value = true

    // Clear any existing timeout
    if (resetTimeout) {
      clearTimeout(resetTimeout)
    }

    // Reset after 2 seconds
    resetTimeout = setTimeout(() => {
      copied.value = false
      resetTimeout = null
    }, 2000)
  }
}

// Cleanup timeout on unmount
onUnmounted(() => {
  if (resetTimeout) {
    clearTimeout(resetTimeout)
  }
})
</script>
