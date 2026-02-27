<template>
  <section
    class="mt-8 sm:mt-8 max-w-5xl mx-auto px-4 sm:px-4"
    aria-labelledby="platforms-heading"
  >
    <h2
      id="platforms-heading"
      class="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-4 sm:mb-6"
    >
      Supported Platforms
    </h2>

    <p class="text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto text-base sm:text-base px-4 leading-relaxed">
      Preview your Open Graph tags across all major social media platforms and messaging apps. Each platform renders link previews differently—see exactly how yours will look.
    </p>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4">
      <template v-for="platform in platforms" :key="platform.name">
        <NuxtLink
          v-if="platform.guideUrl"
          :to="platform.guideUrl"
          class="bg-white dark:bg-gray-800 rounded-lg p-5 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:scale-105 duration-200 cursor-pointer"
        >
          <div class="flex flex-col items-center text-center gap-3 sm:gap-3">
            <div
              class="w-14 h-14 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              :style="{ backgroundColor: platform.color + '15' }"
            >
              <PlatformIcon :platform="platform.name" size="xl" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white text-base sm:text-base">
                {{ platform.name }}
              </h3>
              <p class="text-sm sm:text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0.5">
                {{ platform.type }}
              </p>
            </div>
          </div>
        </NuxtLink>
        <div
          v-else
          class="bg-white dark:bg-gray-800 rounded-lg p-5 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:scale-105 duration-200 cursor-default"
        >
          <div class="flex flex-col items-center text-center gap-3 sm:gap-3">
            <div
              class="w-14 h-14 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              :style="{ backgroundColor: platform.color + '15' }"
            >
              <PlatformIcon :platform="platform.name" size="xl" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white text-base sm:text-base">
                {{ platform.name }}
              </h3>
              <p class="text-sm sm:text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0.5">
                {{ platform.type }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="mt-6 sm:mt-8 text-center">
      <p class="text-sm sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
        All platforms support the Open Graph protocol for rich link previews
      </p>
      <NuxtLink
        to="/guides"
        class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
      >
        Learn more about Open Graph optimization
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const platforms = [
  {
    name: 'Facebook',
    type: 'Social Media',
    icon: '📘',
    color: '#1877F2',
    guideUrl: '/open-graph/facebook'
  },
  {
    name: 'Twitter',
    type: 'Social Media',
    icon: '𝕏',
    color: '#000000',
    guideUrl: '/open-graph/twitter'
  },
  {
    name: 'LinkedIn',
    type: 'Professional',
    icon: '💼',
    color: '#0A66C2',
    guideUrl: '/open-graph/linkedin'
  },
  {
    name: 'Slack',
    type: 'Team Chat',
    icon: '💬',
    color: '#4A154B',
    guideUrl: '/open-graph/slack'
  },
  {
    name: 'Discord',
    type: 'Community',
    icon: '🎮',
    color: '#5865F2',
    guideUrl: '/open-graph/discord'
  },
  {
    name: 'WhatsApp',
    type: 'Messaging',
    icon: '💚',
    color: '#25D366',
    guideUrl: null
  },
  {
    name: 'Telegram',
    type: 'Messaging',
    icon: '✈️',
    color: '#26A5E4',
    guideUrl: null
  },
  {
    name: 'iMessage',
    type: 'Messaging',
    icon: '💙',
    color: '#007AFF',
    guideUrl: null
  }
]
</script>
