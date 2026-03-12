<script setup lang="ts">
const adSlotRef = ref<HTMLElement | null>(null);
let retryTimeout: ReturnType<typeof setTimeout> | undefined;
let statusTimeout: ReturnType<typeof setTimeout> | undefined;

onMounted(() => {
  if (!adSlotRef.value) return;
  initializeAd();
});

onBeforeUnmount(() => {
  if (retryTimeout) clearTimeout(retryTimeout);
  if (statusTimeout) clearTimeout(statusTimeout);
});

function initializeAd() {
  const w = typeof window !== 'undefined' ? window : undefined;
  const adsbygoogle = w && (w as unknown as { adsbygoogle?: { push: (x: object) => void } }).adsbygoogle;
  if (adsbygoogle && typeof adsbygoogle.push === 'function') {
    const status = adSlotRef.value?.getAttribute('data-adsbygoogle-status');
    if (status === 'done' || status === 'filled') return;
    adsbygoogle.push({});
  } else {
    retryTimeout = setTimeout(() => {
      const ads = w && (w as unknown as { ads?: { push: (x: object) => void } }).ads;
      if (ads && typeof ads.push === 'function') {
        ads.push({});
      }
    }, 1000);
  }
}
</script>

<template>
  <ClientOnly>
    <div class="adsense-container">
      <ins
        ref="adSlotRef"
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-1144766246490692"
        data-ad-slot="1911023986"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
    <template #fallback>
      <div class="adsense-container" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>
