<template>
  <ClientOnly>
    <div class="adsense-container">
      <ins
        ref="adSlotRef"
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1144766246490692"
        data-ad-slot="1911023986"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ogpreview-init="0"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  adStatus: [status: 'filled' | 'unfilled' | 'error']
}>()

const adSlotRef = ref<HTMLElement | null>(null)
const adInitialized = ref(false)

// Check ad fill status
const checkAdStatus = () => {
  if (!adSlotRef.value) return

  const status = adSlotRef.value.getAttribute('data-adsbygoogle-status')

  if (status === 'filled') {
    emit('adStatus', 'filled')
    console.log('[AdSense] Ad filled successfully')
  }
  else if (status === 'unfilled' || status === 'done') {
    // Check if there's actual content (ad was filled) or just empty (unfilled)
    // AdSense sets 'done' for both filled and unfilled, so we check for content
    const hasContent = adSlotRef.value.querySelector('iframe') !== null

    if (!hasContent && (status === 'unfilled' || status === 'done')) {
      emit('adStatus', 'unfilled')
      console.log('[AdSense] Ad not filled - no ad available')
    }
    else if (hasContent) {
      emit('adStatus', 'filled')
    }
  }
}

onMounted(() => {
  if (!import.meta.client || typeof window === 'undefined' || !adSlotRef.value) {
    emit('adStatus', 'error')
    return
  }

  const initializeAd = () => {
    try {
      // Check if ad slot has already been initialized
      // Use our own attribute instead of mutating Google's data-adsbygoogle-status
      const ourInitStatus = adSlotRef.value?.getAttribute('data-ogpreview-init')
      const adStatus = adSlotRef.value?.getAttribute('data-adsbygoogle-status')
      if (ourInitStatus === '1' || adStatus === 'done' || adStatus === 'filled') {
        console.log('[AdSense] Ad slot already initialized, checking status')
        adInitialized.value = true
        // Check status immediately if already initialized
        setTimeout(checkAdStatus, 100)
        return
      }

      const adsbygoogle = (window as any).adsbygoogle
      if (adsbygoogle && typeof adsbygoogle.push === 'function') {
        // Mark as processing using our own attribute to prevent double initialization
        // Do NOT mutate data-adsbygoogle-status - it's owned by Google AdSense
        if (adSlotRef.value) {
          adSlotRef.value.setAttribute('data-ogpreview-init', '1')
        }
        adsbygoogle.push({})
        adInitialized.value = true
        console.log('[AdSense] Ad initialization triggered')

        // Check ad status after a delay to allow AdSense to process
        // Check multiple times to catch both filled and unfilled states
        setTimeout(checkAdStatus, 2000) // First check after 2 seconds
        setTimeout(checkAdStatus, 5000) // Second check after 5 seconds
        setTimeout(checkAdStatus, 8000) // Final check after 8 seconds
      }
      else {
        console.warn('[AdSense] adsbygoogle not available yet, retrying...')
        // Retry after a short delay if script hasn't loaded
        setTimeout(initializeAd, 500)
      }
    }
    catch (error) {
      console.error('[AdSense] Initialization error:', error)
      emit('adStatus', 'error')
      // Reset our status on error so it can be retried
      if (adSlotRef.value) {
        adSlotRef.value.removeAttribute('data-ogpreview-init')
      }
    }
  }

  // Wait for AdSense script to load, then initialize
  if ((window as any).adsbygoogle) {
    initializeAd()
  }
  else {
    // Wait for script to load
    const checkInterval = setInterval(() => {
      if ((window as any).adsbygoogle) {
        clearInterval(checkInterval)
        initializeAd()
      }
    }, 100)

    // Timeout after 5 seconds
    setTimeout(() => {
      clearInterval(checkInterval)
      if (!(window as any).adsbygoogle) {
        console.warn('[AdSense] Script did not load within timeout')
        emit('adStatus', 'error')
      }
    }, 5000)
  }
})
</script>

<style scoped>
.adsense-container {
  min-height: 100px;
}
</style>
