<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Open Graph Guides & Tutorials - Learn Social Media Preview Optimization',
  description: 'Complete guides on Open Graph tags, Twitter Cards, and social media link previews. Learn how to optimize your content for Facebook, Twitter, LinkedIn, Slack, and Discord.',
  keywords: 'open graph guide, og tags tutorial, social media preview optimization, facebook link preview guide, twitter card tutorial, linkedin preview best practices',
  robots: 'index, follow'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'CollectionPage',
    'name': 'Open Graph Guides',
    'description': 'Comprehensive guides on Open Graph protocol, social media previews, and link optimization',
    'author': {
      '@type': 'Organization',
      'name': 'ogpreview.app',
      'url': 'https://ogpreview.app'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'ogpreview.app',
      'url': 'https://ogpreview.app',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ogpreview.app/logo.svg'
      }
    }
  },
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://ogpreview.app'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Guides',
        'item': 'https://ogpreview.app/guides'
      }
    ]
  }
])

const guides = [
  {
    slug: 'open-graph-preview',
    title: 'Complete Open Graph Preview Guide',
    description: 'The ultimate guide to Open Graph tags, how they work, and how to optimize them for all major platforms.',
    icon: 'i-lucide-book-open'
  },
  {
    slug: 'og-image-sizes',
    title: 'Open Graph Image Size Guide',
    description: 'Recommended image dimensions, aspect ratios, and file formats for every social media platform.',
    icon: 'i-lucide-photo'
  },
  {
    slug: 'og-cache-refresh',
    title: 'How to Refresh Open Graph Cache',
    description: 'Force social media platforms to update your cached OG tags and see your changes immediately.',
    icon: 'i-lucide-arrow-path'
  }
]
</script>

<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary-500 via-primary-500 to-primary-500 dark:from-primary-500 dark:via-primary-500 dark:to-primary-500">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-muted dark:text-dimmed hover:underline mb-4"
        >
          ← Back to Tool
        </NuxtLink>
        <h1 class="text-4xl sm:text-5xl font-bold text-primary dark:text-white mb-4">
          Open Graph Guides
        </h1>
        <p class="text-lg text-muted dark:text-dimmed max-w-3xl mx-auto">
          Everything you need to know about Open Graph tags, social media previews, and optimizing your link cards for maximum engagement.
        </p>
      </div>

      <!-- Guide Cards -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <NuxtLink
          v-for="guide in guides"
          :key="guide.slug"
          :to="`/guides/${guide.slug}`"
          class="group bg-white dark:bg-elevated rounded-xl p-6 shadow-lg border border-default dark:border-default hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <div class="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary-500 to-primary-500 dark:from-primary-500 dark:to-primary-500 group-hover:scale-110 transition-transform">
            <UIcon :name="guide.icon" class="w-6 h-6 text-muted dark:text-dimmed" />
          </div>
          <h2 class="text-xl font-bold text-primary dark:text-white mb-2 group-hover:text-muted dark:group-hover:text-dimmed transition-colors">
            {{ guide.title }}
          </h2>
          <p class="text-muted dark:text-dimmed mb-4">
            {{ guide.description }}
          </p>
          <div class="text-muted dark:text-dimmed text-sm font-medium flex items-center gap-1">
            Read guide
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </NuxtLink>
      </div>

      <!-- Platform-Specific Guides Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">
          Platform-Specific Open Graph Guides
        </h2>
        <p class="text-muted dark:text-dimmed mb-6">
          Learn how to optimize your Open Graph tags for specific social media platforms:
        </p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            to="/open-graph/twitter"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 group-hover:scale-110 transition-transform">
              <PlatformIcon platform="Twitter" size="md" />
            </div>
            <h3 class="font-semibold text-primary dark:text-white text-sm mb-1">
              Twitter Open Graph Guide
            </h3>
            <p class="text-xs text-muted dark:text-dimmed">
              Master Twitter Cards and optimize for X
            </p>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/facebook"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-muted dark:bg-elevated/20 group-hover:scale-110 transition-transform">
              <PlatformIcon platform="Facebook" size="md" />
            </div>
            <h3 class="font-semibold text-primary dark:text-white text-sm mb-1">
              Facebook Open Graph Guide
            </h3>
            <p class="text-xs text-muted dark:text-dimmed">
              Optimize for Facebook link previews
            </p>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/linkedin"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-muted dark:bg-elevated/20 group-hover:scale-110 transition-transform">
              <PlatformIcon platform="LinkedIn" size="md" />
            </div>
            <h3 class="font-semibold text-primary dark:text-white text-sm mb-1">
              LinkedIn Open Graph Guide
            </h3>
            <p class="text-xs text-muted dark:text-dimmed">
              Professional B2B optimization
            </p>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/discord"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-muted dark:bg-elevated/20 group-hover:scale-110 transition-transform">
              <PlatformIcon platform="Discord" size="md" />
            </div>
            <h3 class="font-semibold text-primary dark:text-white text-sm mb-1">
              Discord Open Graph Guide
            </h3>
            <p class="text-xs text-muted dark:text-dimmed">
              Community platform optimization
            </p>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/slack"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-muted dark:bg-elevated/20 group-hover:scale-110 transition-transform">
              <PlatformIcon platform="Slack" size="md" />
            </div>
            <h3 class="font-semibold text-primary dark:text-white text-sm mb-1">
              Slack Open Graph Guide
            </h3>
            <p class="text-xs text-muted dark:text-dimmed">
              Workplace communication optimization
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Reference Guides -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">
          Quick Reference Guides
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <NuxtLink
            to="/what-is-open-graph"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-primary dark:text-white mb-2">
              What is Open Graph?
            </h3>
            <p class="text-sm text-muted dark:text-dimmed">
              Complete beginner's guide to Open Graph protocol
            </p>
          </NuxtLink>
          <NuxtLink
            to="/guides/og-image-sizes"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-primary dark:text-white mb-2">
              OG Image Size Guide
            </h3>
            <p class="text-sm text-muted dark:text-dimmed">
              Complete reference for image dimensions across all platforms
            </p>
          </NuxtLink>
          <NuxtLink
            to="/open-graph-debugging"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-primary dark:text-white mb-2">
              Open Graph Debugging
            </h3>
            <p class="text-sm text-muted dark:text-dimmed">
              Troubleshoot and fix Open Graph tag issues
            </p>
          </NuxtLink>
          <NuxtLink
            to="/why-og-images-not-updating"
            class="group bg-white dark:bg-elevated rounded-lg p-4 shadow border border-default dark:border-default hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-primary dark:text-white mb-2">
              Why OG Images Not Updating?
            </h3>
            <p class="text-sm text-muted dark:text-dimmed">
              Fix cache issues and force platform updates
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-linear-to-br from-primary-500 to-primary-500 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Ready to test your Open Graph tags?
        </h2>
        <p class="text-primary mb-6 max-w-2xl mx-auto">
          Use our free tool to preview how your links will appear on Facebook, Twitter, LinkedIn, and more.
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-white text-muted px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
        >
          Try the Preview Tool
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
