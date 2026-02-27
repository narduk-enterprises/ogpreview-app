<template>
  <LayoutsArticleLayout
    title="Discord Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for Discord. Copy-paste the required meta tags, image sizes, and best practices for perfect server link previews."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your Discord Link Previews"
        description="Preview how your links will appear on Discord and all other platforms instantly."
        button-text="Try the Free Preview Tool" 
        button-to="/" 
        variant="purple" 
      />
    </template>

    <template #related>
      <div class="not-prose mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Other Platform Specs
        </h2>
        <PlatformGrid :platforms="relatedPlatforms" />
      </div>
    </template>

    <ContentCallout variant="info" title="Quick Answer" icon="i-heroicons-light-bulb">
      Discord does not explicitly recommend one size but typically defaults to rendering the standard Facebook <strong>1200×630px</strong> or Twitter <strong>1200x600px</strong> images. Discord favors the <code>twitter:card</code> tag if provided (use <code>summary_large_image</code>).
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Discord Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-photo" class="w-6 h-6 text-indigo-500" />
            <h3 class="font-semibold text-gray-900 dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            1200 × 630px
          </p>
          <p class="text-sm text-gray-500 mt-1">1.91:1 or 2:1 Aspect Ratio scales fine.</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-document-arrow-down" class="w-6 h-6 text-indigo-500" />
            <h3 class="font-semibold text-gray-900 dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            Max 8MB
          </p>
          <p class="text-sm text-gray-500 mt-1">Formats: JPG, PNG, GIF</p>
        </UCard>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Required Meta Tags</h2>
    <div class="space-y-6">
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Basic HTML</h3>
        <ContentCodeBlock :code="requiredTagsCode" language="html" />
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Nuxt 3</h3>
        <ContentCodeBlock :code="nuxtExampleCode" language="typescript" />
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Next.js</h3>
        <ContentCodeBlock :code="nextjsExampleCode" language="typescript" />
      </div>
    </div>

    <div class="my-12 grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Top 3 Best Practices</h2>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Provide a theme color tag.</strong> (<code>&lt;meta name="theme-color" content="#FF0000"&gt;</code>) Discord uses this to color the embed border on the left side.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Use specific summary_large_image structure.</strong> Discord fully supports the Twitter syntax, overriding standard open graph.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Optimize images for dark mode.</strong> Discord users are predominantly set to dark mode. Ensure PNG logos scale correctly on dark grey.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900">
          <h3 class="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Discord Previews Won't Load</h3>
          <p class="text-sm text-indigo-800 dark:text-indigo-200 mb-4">
            If Discord isn't rendering your metadata, ensure your TLS/SSL certificates are fully valid, and robots.txt doesn't block the Discordbot user-agent.
          </p>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Discord Open Graph Meta Tags & Specs',
  description: 'The exact open graph specifications for Discord previews. Add theme colors and proper image sizing for your web links.',
  keywords: 'discord og tags, discord open graph, discord link preview, discord theme color embed',
  robots: 'index, follow',
  ogTitle: 'Discord Open Graph Meta Tags & Specs',
  ogDescription: 'The exact open graph specifications for Discord previews. Add theme colors and proper image sizing.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Discord Open Graph Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for Discord previews',
    'url': 'https://ogpreview.app/open-graph/discord',
    'author': {
      '@type': 'Organization',
      'name': 'ogpreview.app',
      'url': 'https://ogpreview.app'
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
        'name': 'Discord Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/discord'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Discord Specific Overrides -->
<meta name="theme-color" content="#5865F2" />
<meta name="twitter:card" content="summary_large_image" />

<!-- Standard Open Graph Requirements -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />`

const nuxtExampleCode = `useSeoMeta({
  themeColor: '#5865F2',
  twitterCard: 'summary_large_image',
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
})`

const nextjsExampleCode = `export const metadata = {
  themeColor: '#5865F2',
  openGraph: {
    title: 'Your Page Title',
    description: 'Your compelling description',
    images: [{
      url: 'https://example.com/image.jpg',
      width: 1200,
      height: 630,
    }],
    url: 'https://example.com/page',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image'
  }
}`

const relatedPlatforms = [
  { name: 'Facebook', to: '/open-graph/facebook', icon: '📘' },
  { name: 'Twitter', to: '/open-graph/twitter', icon: '𝕏' },
  { name: 'LinkedIn', to: '/open-graph/linkedin', icon: '💼' },
  { name: 'Slack', to: '/open-graph/slack', icon: '💬' }
]
</script>
