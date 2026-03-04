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

<template>
  <section
    class="mt-8 sm:mt-8 max-w-5xl mx-auto px-4 sm:px-4"
    aria-labelledby="how-it-works-heading"
  >
    <h2
      id="how-it-works-heading"
      class="text-2xl sm:text-2xl font-bold text-primary dark:text-white text-center mb-4 sm:mb-6"
    >
      How the Open Graph Preview Works
    </h2>

    <div class="grid md:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="bg-white dark:bg-elevated rounded-lg p-6 sm:p-6 shadow-sm border border-default dark:border-default relative"
      >
        <div class="absolute -top-3 -left-3 w-10 h-10 sm:w-10 sm:h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-base shadow-lg">
          {{ index + 1 }}
        </div>
        <div class="pt-3 sm:pt-2">
          <div class="text-4xl sm:text-4xl mb-4 sm:mb-4">
            {{ step.icon }}
          </div>
          <h3 class="font-semibold text-primary dark:text-white mb-2 text-lg sm:text-lg">
            {{ step.title }}
          </h3>
          <p class="text-muted dark:text-dimmed text-base sm:text-base leading-relaxed">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-linear-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 sm:p-6 border border-default dark:border-default">
      <h3 class="font-semibold text-primary dark:text-white mb-3 text-lg sm:text-lg">
        💡 What are Open Graph tags?
      </h3>
      <p class="text-primary dark:text-dimmed text-base sm:text-base leading-relaxed mb-3">
        Open Graph tags are HTML <code class="px-1.5 py-0.5 bg-white dark:bg-elevated rounded text-sm sm:text-sm font-mono">&lt;meta&gt;</code> elements that control how your URLs appear when shared on social media. They were created by Facebook and are now used by virtually every platform.
      </p>
      <p class="text-primary dark:text-dimmed text-base sm:text-base leading-relaxed mb-4">
        Without proper OG tags, platforms display generic previews with no image and auto-generated text. With optimized tags, you get beautiful, engaging link cards that dramatically improve click-through rates.
      </p>
      <NuxtLink
        to="/guides/open-graph-preview"
        class="inline-flex items-center gap-2 text-muted dark:text-dimmed hover:text-primary dark:hover:text-dimmed font-medium text-sm transition-colors"
      >
        Read the complete Open Graph guide
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>
