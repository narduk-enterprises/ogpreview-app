<script setup lang="ts">
/**
 * Site-wide SEO defaults are now handled by @nuxtjs/seo via nuxt.config.ts `site` block.
 * The titleTemplate is automatically set to `%s %separator %siteName`.
 * Individual pages use the `useSeo()` composable to set their own title/description/OG.
 */
</script>

<template>
  <UApp>
    <div class="app-shell min-h-screen flex flex-col">

      <!-- Main -->
      <div class="flex-1">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NuxtPage />
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-default py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-center text-sm text-muted">
            OG Preview &middot; Open Graph Preview Tool &middot; {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </div>
  </UApp>
</template>
