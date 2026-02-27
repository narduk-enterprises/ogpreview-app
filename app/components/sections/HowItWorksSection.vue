<template>
  <section
    class="mt-8 sm:mt-8 max-w-5xl mx-auto px-4 sm:px-4"
    aria-labelledby="how-it-works-heading"
  >
    <h2
      id="how-it-works-heading"
      class="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-4 sm:mb-6"
    >
      How the Open Graph Preview Works
    </h2>

    <div class="grid md:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative"
      >
        <div class="absolute -top-3 -left-3 w-10 h-10 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-base shadow-lg">
          {{ index + 1 }}
        </div>
        <div class="pt-3 sm:pt-2">
          <div class="text-4xl sm:text-4xl mb-4 sm:mb-4">
            {{ step.icon }}
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-lg sm:text-lg">
            {{ step.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-base sm:text-base leading-relaxed">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 sm:p-6 border border-blue-200 dark:border-gray-600">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-lg sm:text-lg">
        💡 What are Open Graph tags?
      </h3>
      <p class="text-gray-700 dark:text-gray-300 text-base sm:text-base leading-relaxed mb-3">
        Open Graph tags are HTML <code class="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded text-sm sm:text-sm font-mono">&lt;meta&gt;</code> elements that control how your URLs appear when shared on social media. They were created by Facebook and are now used by virtually every platform.
      </p>
      <p class="text-gray-700 dark:text-gray-300 text-base sm:text-base leading-relaxed mb-4">
        Without proper OG tags, platforms display generic previews with no image and auto-generated text. With optimized tags, you get beautiful, engaging link cards that dramatically improve click-through rates.
      </p>
      <NuxtLink
        to="/guides/open-graph-preview"
        class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
      >
        Read the complete Open Graph guide
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: '🔗',
    title: 'Enter Your URL',
    description: 'Paste any website URL and we\'ll automatically fetch its Open Graph meta tags, or manually enter your content to test different variations.'
  },
  {
    icon: '👁️',
    title: 'Preview Instantly',
    description: 'See real-time previews showing exactly how your link will appear on Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, and more.'
  },
  {
    icon: '✨',
    title: 'Optimize & Share',
    description: 'Adjust your title, description, and image based on our recommendations. Test different variations to maximize engagement before publishing.'
  }
]
</script>
