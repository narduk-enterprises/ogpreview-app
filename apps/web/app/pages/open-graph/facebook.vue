<script setup lang="ts">
useSeo({
  title: 'Facebook Open Graph Meta Tags & Image Specs',
  description: 'The exact open graph specifications for Facebook meta tags. Get the correct 1200x630 image size, copy-paste starter tags, and learn to clear cached previews.',
  keywords: ['facebook og tags', 'facebook open graph', 'facebook link preview', 'facebook sharing debugger', 'facebook og image size', 'facebook meta tags'],
  type: 'article',
  publishedAt: '2025-12-16T00:00:00Z',
  modifiedAt: '2025-12-16T00:00:00Z',
  author: 'ogpreview.app',
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Facebook Open Graph Meta Tags & Image Specs',
    'description': 'The exact Open Graph specifications for Facebook link previews',
    'url': 'https://ogpreview.app/open-graph/facebook',
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
        'name': 'Facebook Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/facebook'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Essential Open Graph Tags for Facebook -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />
<!-- Recommended specific sizing for faster load times -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`

const nuxtExampleCode = `useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'website',
  ogImageWidth: '1200',
  ogImageHeight: '630',
})`

const nextjsExampleCode = `export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your compelling description',
    images: [{
      url: 'https://example.com/image.jpg',
      width: 1200,
      height: 630,
      alt: 'Image alt text'
    }],
    url: 'https://example.com/page',
    type: 'website'
  }
}`

const relatedPlatforms = [
  { name: 'Twitter', to: '/open-graph/twitter', icon: '𝕏' },
  { name: 'LinkedIn', to: '/open-graph/linkedin', icon: '💼' },
  { name: 'Discord', to: '/open-graph/discord', icon: '🎮' },
  { name: 'Slack', to: '/open-graph/slack', icon: '💬' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="Facebook Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for Facebook. Copy-paste the required meta tags, image sizes, and best practices for perfect link previews."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your Facebook Link Previews"
        description="Preview how your links will appear on Facebook and all other platforms instantly."
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
      Facebook recommends a <strong>1200×630px</strong> image (1.91:1 ratio). Always use absolute HTTPS URLs and include the <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, and <code>og:url</code> tags.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Facebook Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-photo" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            1200 × 630px
          </p>
          <p class="text-sm text-muted mt-1">1.91:1 Aspect Ratio</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-document-arrow-down" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            Max 8MB
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
            <span class="text-primary dark:text-dimmed"><strong>Use absolute image URLs</strong> (e.g., <code>https://your-site.com/image.jpg</code>) instead of relative paths.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Ensure og:url matches the canonical URL</strong> of the page to consolidate likes and shares.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Keep text out of the bottom 20%</strong> of the image, as Facebook occasionally overlays the domain there.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-muted dark:bg-elevated/10 border-default dark:border-default">
          <h3 class="font-semibold text-primary dark:text-dimmed mb-2">Cache Won't Clear?</h3>
          <p class="text-sm text-primary dark:text-primary mb-4">
            Facebook caches metadata aggressively. If your updated tags aren't showing up, you must force Facebook's scraper to fetch the new version.
          </p>
          <UButton 
            to="https://developers.facebook.com/tools/debug/" 
            target="_blank" 
            color="primary" 
            variant="soft"
            icon="i-lucide-arrow-top-right-on-square"
          >
            Open Facebook Sharing Debugger
          </UButton>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>
