<script setup lang="ts">
useSeoMeta({
  title: 'WhatsApp Open Graph Meta Tags & Specs',
  description: 'The exact open graph specifications for WhatsApp link previews. Keep images under 300KB for them to appear reliably in chats.',
  keywords: 'whatsapp og tags, whatsapp open graph, whatsapp link preview, whatsapp image limit',
  robots: 'index, follow',
  ogTitle: 'WhatsApp Open Graph Meta Tags & Specs',
  ogDescription: 'The exact open graph specifications for WhatsApp previews. Keep images under 300KB.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'WhatsApp Open Graph Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for WhatsApp previews',
    'url': 'https://ogpreview.app/open-graph/whatsapp',
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
        'name': 'WhatsApp Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/whatsapp'
      }
    ]
  }
])

const requiredTagsCode = `<!-- WhatsApp Requirements (Standard OG) -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<!-- CRITICAL: Image must be under 300KB! -->
<meta property="og:image" content="https://example.com/image-optimized.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />`

const nuxtExampleCode = `useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/image-optimized.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'website',
})`

const nextjsExampleCode = `export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your compelling description',
    images: [{
      url: 'https://example.com/image-optimized.jpg',
      width: 1200,
      height: 630,
    }],
    url: 'https://example.com/page',
    type: 'website'
  }
}`

const relatedPlatforms = [
  { name: 'Telegram', to: '/open-graph/telegram', icon: '✈️' },
  { name: 'Facebook', to: '/open-graph/facebook', icon: '📘' },
  { name: 'LinkedIn', to: '/open-graph/linkedin', icon: '💼' },
  { name: 'iMessage', to: '/open-graph/imessage', icon: '💬' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="WhatsApp Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for WhatsApp. Learn how to display images and descriptions correctly in WhatsApp link previews."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your WhatsApp Link Previews"
        description="Preview how your links will appear on WhatsApp and all other platforms instantly."
        button-text="Try the Free Preview Tool" 
        button-to="/" 
        variant="green" 
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
      WhatsApp requires smaller images to ensure previews load. Recommended size is <strong>300x200px</strong> (or a small square), and the image file must be <strong>under 300KB</strong> to appear reliably in chats.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">WhatsApp Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-photo" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            1200 × 630px
          </p>
          <p class="text-sm text-muted mt-1">Automatically downscaled. Direct small images (300x200) work best if below 300KB.</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-lucide-document-arrow-down" class="w-6 h-6 text-muted" />
            <h3 class="font-semibold text-primary dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-primary dark:text-white">
            Max 300KB
          </p>
          <p class="text-sm text-muted mt-1">If larger, WhatsApp may omit the image preview entirely.</p>
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
            <span class="text-primary dark:text-dimmed"><strong>Compress images heavily.</strong> The absolute most common reason WhatsApp previews fail is the image being over 300KB.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Include standard Open Graph tags.</strong> WhatsApp reads <code>og:title</code>, <code>og:description</code>, and <code>og:image</code>.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-muted shrink-0 mt-0.5" />
            <span class="text-primary dark:text-dimmed"><strong>Provide a square fallback.</strong> Although landscapes work, a 1:1 image prevents cropping issues in smaller mobile contexts.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-muted dark:bg-elevated/10 border-default dark:border-default">
          <h3 class="font-semibold text-primary dark:text-dimmed mb-2">My Image Won't Appear in WhatsApp</h3>
          <p class="text-sm text-primary dark:text-primary mb-4">
            If your image doesn't appear when tested in a chat, it is almost certainly because the image file size is over 300KB. Optimize your image file size immediately. Use formats like JPEG for photos to save space.
          </p>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>
