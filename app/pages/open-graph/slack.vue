<script setup lang="ts">
useSeoMeta({
  title: 'Slack Open Graph Meta Tags & Specs',
  description: 'The exact open graph specifications for Slack workspaces. Build properly scaled image links, copy-paste starter tags, and configure unfurling correctly.',
  keywords: 'slack og tags, slack open graph, slack link preview, slackbot link fetch, default slack unfurl',
  robots: 'index, follow',
  ogTitle: 'Slack Open Graph Meta Tags & Specs',
  ogDescription: 'The exact open graph specifications for Slack workspaces. Build properly scaled image links and configure unfurling.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Slack Open Graph Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for Slack link unfurling',
    'url': 'https://ogpreview.app/open-graph/slack',
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
        'name': 'Slack Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/slack'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Essential Slack Tags -->
<meta property="og:site_name" content="Your Brand Name" />
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />`

const nuxtExampleCode = `useSeoMeta({
  ogSiteName: 'Your Brand Name',
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
})`

const nextjsExampleCode = `export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your compelling description',
    images: [{
      url: 'https://example.com/image.jpg',
      width: 1200,
      height: 630,
    }],
    url: 'https://example.com/page',
    siteName: 'Your Brand Name',
    type: 'website'
  },
}`

const relatedPlatforms = [
  { name: 'Facebook', to: '/open-graph/facebook', icon: '📘' },
  { name: 'Twitter', to: '/open-graph/twitter', icon: '𝕏' },
  { name: 'LinkedIn', to: '/open-graph/linkedin', icon: '💼' },
  { name: 'Discord', to: '/open-graph/discord', icon: '🎮' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="Slack Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for Slack previews. Learn the exact image dimensions, required meta tags, and best practices for perfect workspace link unfurling."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your Slack Link Previews"
        description="Preview how your links will appear on Slack and all other platforms instantly."
        button-text="Try the Free Preview Tool" 
        button-to="/" 
        variant="blue" 
      />
    </template>

    <template #related>
      <div class="not-prose mt-12">
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">
          Other Platform Specs
        </h2>
        <PlatformGrid :platforms="relatedPlatforms" />
      </div>
    </template>

    <ContentCallout variant="info" title="Quick Answer" icon="i-lucide-light-bulb">
      Slack reads standard Open Graph properties and heavily prioritizes the <code>og:site_name</code> and <code>twitter:image</code> (if provided). Keep aspect ratios between 1.91:1 and 2:1. Slack will automatically compress files over 10MB but smaller is safer.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Slack Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-photo" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            1200 × 630px
          </p>
          <p class="text-sm text-muted mt-1">1:1 square images also display differently, rendering as side-thumbs.</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-document-arrow-down" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            Max 12MB
          </p>
          <p class="text-sm text-muted mt-1">Formats: JPG, PNG, GIF</p>
        </UCard>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Required Meta Tags</h2>
    <div class="space-y-6">
      <div>
        <h3 class="font-semibold text-primary dark:text-white mb-2">Basic HTML</h3>
        <ContentCodeBlock :code="requiredTagsCode" language="html" />
      </div>
      <div>
        <h3 class="font-semibold text-primary dark:text-white mb-2">Nuxt 3</h3>
        <ContentCodeBlock :code="nuxtExampleCode" language="typescript" />
      </div>
      <div>
        <h3 class="font-semibold text-primary dark:text-white mb-2">Next.js</h3>
        <ContentCodeBlock :code="nextjsExampleCode" language="typescript" />
      </div>
    </div>

    <div class="my-12 grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Top 3 Best Practices</h2>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Use a recognizable og:site_name.</strong> Slack bolds this at the top of the "unfurled" preview for context.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Images should be strictly absolute URLs.</strong> Slackbot fails completely on root relative paths (e.g. <code>/images/cool.png</code>).</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Ensure quick TTFB limits.</strong> Slackbot times out internally if crawling your linked page takes too long. Setup CDN caching.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-muted dark:bg-elevated/10 border-default dark:border-default">
          <h3 class="font-semibold text-primary dark:text-dimmed mb-2">Preview Not Generating?</h3>
          <p class="text-sm text-primary dark:text-primary mb-4">
            If your domain is new or Slackbot failed to fetch once, it may temporarily blacklist fetching your preview. The user usually has to enter `/url` or right click to force unfurl.
          </p>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>
