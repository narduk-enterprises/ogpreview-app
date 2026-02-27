<script setup lang="ts">
const features = [
  {
    emoji: '🎨',
    title: 'Beautiful Previews',
    description: 'See exactly how your content will appear on different platforms with pixel-perfect accuracy'
  },
  {
    emoji: '⚡',
    title: 'Real-time Updates',
    description: 'Preview updates instantly as you type with zero delay or page refresh needed'
  },
  {
    emoji: '🚀',
    title: 'SEO Optimized',
    description: 'Ensure your content is perfectly optimized for search engines and social media'
  }
]
</script>

<template>
  <div class="mt-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="group relative p-8 text-center bg-white dark:bg-elevated rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="absolute inset-0 rounded-2xl bg-linear-to-br from-primary-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div class="relative">
          <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {{ feature.emoji }}
          </div>
          <h3 class="text-xl font-bold mb-3 text-primary dark:text-primary">
            {{ feature.title }}
          </h3>
          <p class="text-muted dark:text-dimmed leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
