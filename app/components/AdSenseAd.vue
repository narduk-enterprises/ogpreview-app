<template>
  <ClientOnly>
    <div class="adsense-container min-h-[100px]">
      <ins
        ref="adSlotRef"
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1144766246490692"
        data-ad-slot="1911023986"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
    <template #fallback>
      <div class="adsense-container min-h-[100px]" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const adSlotRef = ref<HTMLElement | null>(null)
let retryTimeout: ReturnType<typeof setTimeout> | undefined
let statusTimeout: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (!adSlotRef.value) return
  initializeAd()
})

onBeforeUnmount(() => {
  if (retryTimeout) clearTimeout(retryTimeout)
  if (statusTimeout) clearTimeout(statusTimeout)
})

function initializeAd() {
  const adsbygoogle = (window as any).adsbygoogle
  if (adsbygoogle && typeof adsbygoogle.push === 'function') {
    const status = adSlotRef.value?.getAttribute('data-adsbygoogle-status')
    if (status === 'done' || status === 'filled') return
    adsbygoogle.push({})
  }
  else {
    // Retry once after 1 second if script hasn't loaded yet
    retryTimeout = setTimeout(() => {
      const ads = (window as any).adsbygoogle
      if (ads && typeof ads.push === 'function') {
        ads.push({})
      }
    }, 1000)
  }
}
</script>

