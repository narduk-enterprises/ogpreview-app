<script setup lang="ts">
useSeoMeta({
  title: 'Open Graph Preview: Complete Developer Guide',
  description: 'The definitive technical guide for Open Graph. Learn exact implementations for Nuxt, Next.js, and raw HTML to ensure perfect link unfurling.',
  keywords: 'open graph preview, og tags guide, social media preview tutorial, facebook preview optimization, twitter card guide, linkedin og tags, open graph protocol, og image best practices',
  robots: 'index, follow',
  ogTitle: 'Open Graph Preview: Developer Implementation Guide',
  ogDescription: 'Master Open Graph tags and social media previews. Learn exact Next.js and Nuxt code snippets to fix unfurling bugs.',
  ogType: 'article'
})

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'Open Graph Preview: Complete Developer Guide',
    'description': 'The definitive technical guide for Open Graph implementations.',
    'author': { '@type': 'Organization', 'name': 'ogpreview.app' },
    'publisher': { '@type': 'Organization', 'name': 'ogpreview.app' },
    'url': 'https://ogpreview.app/guides/open-graph-preview'
  }
])

const basicExampleCode = `<head>
  <title>Your Page Title</title>
  
  <!-- Essential Open Graph -->
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="A compelling description" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="website" />
  
  <!-- Essential Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
</head>`

const nuxtExampleCode = `useSeoMeta({
  title: 'Your Page Title',
  ogTitle: 'Your Page Title',
  description: 'Your description',
  ogDescription: 'Your description',
  ogImage: 'https://example.com/og.jpg',
  ogUrl: 'https://example.com/page',
  twitterCard: 'summary_large_image'
})`

const nextjsExampleCode = `export const metadata = {
  title: 'Your Page Title',
  description: 'Your description',
  openGraph: {
    title: 'Your Page Title',
    description: 'Your description',
    images: ['https://example.com/og.jpg'],
    url: 'https://example.com/page',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image'
  }
}`

const platformGuides = [
  { name: 'Facebook Specs', to: '/open-graph/facebook', icon: 'i-simple-icons-facebook' },
  { name: 'Twitter / X Specs', to: '/open-graph/twitter', icon: 'i-simple-icons-x' },
  { name: 'LinkedIn Specs', to: '/open-graph/linkedin', icon: 'i-simple-icons-linkedin' },
  { name: 'Discord Specs', to: '/open-graph/discord', icon: 'i-simple-icons-discord' },
  { name: 'Slack Specs', to: '/open-graph/slack', icon: 'i-simple-icons-slack' },
  { name: 'Image Size Reference', to: '/guides/og-image-sizes', icon: 'i-heroicons-photo' },
  { name: 'Clear Cached Previews', to: '/guides/og-cache-refresh', icon: 'i-heroicons-arrow-path' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="Open Graph Preview: Complete Developer Guide"
    description="The definitive technical guide for Open Graph. Learn exact implementations for Nuxt, Next.js, and raw HTML to ensure perfect link unfurling."
    :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '5 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Stop Guessing. Start Testing."
        description="Verify your Open Graph tags locally before you deploy to production."
        button-text="Try the Free Preview Tool" 
        button-to="/" 
        variant="blue" 
      />
    </template>

    <ContentCallout variant="info" title="The Golden Rule of Open Graph" icon="i-heroicons-star">
      For 99% of use cases, you only need four tags: <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, and <code>og:url</code>. 
      Use a <strong>1200x630px JPG</strong> and ensure your tags are rendered <strong>Server-Side (SSR)</strong>.
    </ContentCallout>

    <h2 id="required-tags" class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">Required Implementation</h2>
    
    <div class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Nuxt 3 (useSeoMeta)</h3>
          <ContentCodeBlock :code="nuxtExampleCode" language="typescript" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Next.js 14+ (App Router)</h3>
          <ContentCodeBlock :code="nextjsExampleCode" language="typescript" />
        </div>
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Raw HTML (&lt;head&gt;)</h3>
        <ContentCodeBlock :code="basicExampleCode" language="html" />
      </div>
    </div>

    <!-- Common Failures section -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Your Previews Are Breaking</h2>
      
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard class="border-red-200 dark:border-red-900/50">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-500" />
            <h3 class="font-bold text-gray-900 dark:text-white">Client-Side Rendering (SPA)</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Social bots (Facebook, Twitter, Slack) do not execute JavaScript. If you are using standard React/Vue without SSR/SSG, the bots will scrape an empty <code>&lt;head&gt;</code> tag and default to nothing.
          </p>
        </UCard>
        
        <UCard class="border-red-200 dark:border-red-900/50">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-500" />
            <h3 class="font-bold text-gray-900 dark:text-white">Relative Image URLs</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Using <code>content="/img/og.png"</code> will fail. Social crawlers resolve absolute paths. You MUST use <code>content="https://yoursite.com/img/og.png"</code>.
          </p>
        </UCard>

        <UCard class="border-red-200 dark:border-red-900/50">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-500" />
            <h3 class="font-bold text-gray-900 dark:text-white">Missing Twitter Card Type</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Even with perfect OG tags, Twitter will crop your 1200x630px image into a tiny thumbnail square unless you explicitly provide <code>&lt;meta name="twitter:card" content="summary_large_image"&gt;</code>.
          </p>
        </UCard>
        
        <UCard class="border-red-200 dark:border-red-900/50">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-500" />
            <h3 class="font-bold text-gray-900 dark:text-white">Aggressive Caching</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            If you just pushed a fix to your production OG tags, they <strong>will not update automatically</strong>. You must read our <NuxtLink to="/guides/og-cache-refresh" class="text-blue-500 hover:underline">Cache Refresh Guide</NuxtLink> to force bots to re-scrape.
          </p>
        </UCard>
      </div>
    </div>

    <!-- Platform Specs Grid -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Quick Specs</h2>
      <PlatformGrid :platforms="platformGuides" />
    </div>

  </LayoutsArticleLayout>
</template>
