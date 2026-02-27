<script setup lang="ts">
useSeoMeta({
  title: 'Twitter Card Meta Tags & Specs',
  description: 'The exact open graph and twitter card specifications for X/Twitter. Get the correct 1200x600 image size and copy-paste starter tags.',
  keywords: 'twitter card tags, summary_large_image, twitter link preview, twitter card metadata, twitter card image size',
  robots: 'index, follow',
  ogTitle: 'Twitter Card Meta Tags & Specs',
  ogDescription: 'The exact open graph and twitter card specifications for X/Twitter. Copy-paste the required meta tags and image sizes.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Twitter Card Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for Twitter link previews',
    'url': 'https://ogpreview.app/open-graph/twitter',
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
        'name': 'Twitter Card Specs',
        'item': 'https://ogpreview.app/open-graph/twitter'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Essential Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@your_twitter_handle" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="Your compelling description" />
<meta name="twitter:image" content="https://example.com/image.jpg" />

<!-- Fallback OG Tags (Twitter uses these if missing) -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />`

const nuxtExampleCode = `useSeoMeta({
  twitterCard: 'summary_large_image',
  twitterTitle: 'Your Page Title',
  twitterDescription: 'Your compelling description',
  twitterImage: 'https://example.com/image.jpg',
  twitterSite: '@your_twitter_handle',
})`

const nextjsExampleCode = `export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Your Page Title',
    description: 'Your compelling description',
    siteId: '1467726470533754880',
    creator: '@your_twitter_handle',
    images: ['https://example.com/image.jpg'],
  },
}`

const relatedPlatforms = [
  { name: 'Facebook', to: '/open-graph/facebook', icon: '📘' },
  { name: 'LinkedIn', to: '/open-graph/linkedin', icon: '💼' },
  { name: 'Discord', to: '/open-graph/discord', icon: '🎮' },
  { name: 'Slack', to: '/open-graph/slack', icon: '💬' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="Twitter Card Meta Tags & Specs"
    description="The exact Open Graph and Twitter Card specifications for X/Twitter. Copy-paste the required meta tags, image sizes, and best practices for perfect link previews."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your Twitter Link Previews"
        description="Preview how your links will appear on Twitter and all other platforms instantly."
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
      Twitter prefers a <strong>1200×600px</strong> (2:1 ratio) image, although the standard 1200x630px OG tag image usually scales fine. You MUST include <code>twitter:card</code> set to <code>summary_large_image</code> to get the big image preview.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Twitter Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-photo" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            1200 × 600px
          </p>
          <p class="text-sm text-muted mt-1">2:1 Aspect Ratio (or 1.91:1)</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-document-arrow-down" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            Max 5MB
          </p>
          <p class="text-sm text-muted mt-1">Formats: JPG, PNG, WebP, GIF</p>
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
            <span class="text-primary dark:text-dimmed"><strong>Include twitter:card</strong> tag. Without it, Twitter assumes <code>summary</code> and crops your image into a tiny square. Use <code>summary_large_image</code>.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Use absolute image URLs</strong> (e.g., <code>https://your-site.com/image.jpg</code>) instead of relative paths.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Keep text out of corners</strong> as Twitter rounds the corners of the preview card natively.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-muted dark:bg-elevated/10 border-default dark:border-default">
          <h3 class="font-semibold text-primary dark:text-dimmed mb-2">Twitter Card Validator Removed</h3>
          <p class="text-sm text-primary dark:text-primary mb-4">
            Twitter (X) officially removed their Card Validator tool. The only reliable way to check your caching and preview is to use the Post composer directly on the platform.
          </p>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>
