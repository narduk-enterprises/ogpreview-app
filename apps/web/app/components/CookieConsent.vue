<script setup lang="ts">
const consent = useCookie<{ necessary: boolean; analytics: boolean; advertising: boolean } | null>(
  'ogpreview_cookie_consent',
  { maxAge: 365 * 24 * 60 * 60, default: () => null }
);

const showBanner = ref(false);

onMounted(() => {
  if (!consent.value) {
    // Show banner after a short delay for a smoother UX
    setTimeout(() => {
      showBanner.value = true;
    }, 1000);
  } else if (consent.value.analytics && consent.value.advertising) {
    updateGtagConsent('granted');
  }
});

function acceptAll() {
  consent.value = { necessary: true, analytics: true, advertising: true };
  updateGtagConsent('granted');
  showBanner.value = false;
}

function acceptNecessary() {
  consent.value = { necessary: true, analytics: false, advertising: false };
  updateGtagConsent('denied');
  showBanner.value = false;
}

function updateGtagConsent(state: 'granted' | 'denied') {
  if (import.meta.server) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: state,
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition transform duration-300 ease-out"
    enter-from-class="translate-y-full"
    leave-active-class="transition transform duration-300 ease-out"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-elevated border-t border-default dark:border-default shadow-lg"
      role="dialog"
      aria-label="Cookie consent banner"
      aria-describedby="cookie-banner-description"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <p id="cookie-banner-description" class="text-sm text-primary dark:text-dimmed">
              We use cookies and similar technologies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. We also share information about
              your use of our site with our advertising and analytics partners, including Google
              AdSense.
              <NuxtLink
                to="/privacy"
                class="text-muted dark:text-dimmed hover:underline font-medium ml-1"
              >
                Learn more in our Privacy Policy
              </NuxtLink>
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <UButton color="primary" size="sm" aria-label="Accept all cookies" @click="acceptAll">
              Accept All
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              aria-label="Accept only necessary cookies"
              @click="acceptNecessary"
            >
              Necessary Only
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
