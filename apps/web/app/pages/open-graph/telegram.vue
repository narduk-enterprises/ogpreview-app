<script setup lang="ts">
useSeo({
  title: 'Telegram Open Graph Meta Tags & Specs',
  description: 'The exact open graph specifications for Telegram link previews. Add proper image sizing and tags for large rich previews.',
  keywords: ['telegram og tags', 'telegram open graph', 'telegram link preview', 'webpagebot cache'],
  type: 'article',
  publishedAt: '2025-12-16T00:00:00Z',
  modifiedAt: '2025-12-16T00:00:00Z',
  author: 'ogpreview.app',
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Telegram Open Graph Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for Telegram previews',
    'url': 'https://ogpreview.app/open-graph/telegram',
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
        'name': 'Telegram Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/telegram'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Standard Open Graph Tags -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />`

const nuxtExampleCode = `useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'website',
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
    type: 'website'
  }
}`

const relatedPlatforms = [
  { name: 'WhatsApp', to: '/open-graph/whatsapp', icon: '📞' },
  { name: 'Facebook', to: '/open-graph/facebook', icon: '📘' },
  { name: 'Twitter', to: '/open-graph/twitter', icon: '𝕏' },
  { name: 'Discord', to: '/open-graph/discord', icon: '🎮' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="Telegram Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for Telegram. Copy-paste the required meta tags, image sizes, and best practices for perfect message link previews."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your Telegram Link Previews"
        description="Preview how your links will appear on Telegram and all other platforms instantly."
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
      Telegram uses the standard Open Graph meta tags (<code>og:image</code>). It recommends an image size of at least <strong>1200x630px</strong> for large previews, otherwise falling back to a small square thumbnail.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Telegram Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-photo" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            1200 × 630px
          </p>
          <p class="text-sm text-muted mt-1">Aspect Ratio: 1.91:1.</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-document-arrow-down" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            Max 5MB
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
            <span class="text-primary dark:text-dimmed"><strong>Use a compelling image.</strong> Large previews dramatically increase click-through rates.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Keep text legible.</strong> Telegram users view links on mobile devices heavily.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Force Webpage Preview.</strong> Use the @WebpageBot on Telegram to clear caches and update previews.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-muted dark:bg-elevated/10 border-default dark:border-default">
          <h3 class="font-semibold text-primary dark:text-dimmed mb-2">Outdated Telegram Previews</h3>
          <p class="text-sm text-primary dark:text-primary mb-4">
            Telegram caches previews aggressively. To force an update, message <code>@WebpageBot</code> on Telegram and send it your link with the "Update" command.
          </p>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>
