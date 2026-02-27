<script setup lang="ts">
useSeoMeta({
  title: 'iMessage Open Graph Meta Tags & Specs',
  description: 'The exact open graph specifications for iMessage previews. Ensure iOS devices display rich links to your site correctly.',
  keywords: 'imessage og tags, imessage open graph, ios link preview, apple message preview',
  robots: 'index, follow',
  ogTitle: 'iMessage Open Graph Meta Tags & Specs',
  ogDescription: 'The exact open graph specifications for iMessage previews. Ensure iOS devices display rich links successfully.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'iMessage Open Graph Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for iMessage previews',
    'url': 'https://ogpreview.app/open-graph/imessage',
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
        'name': 'iMessage Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/imessage'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Standard Open Graph Requirements -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />

<!-- Helpful Additional Tag -->
<link rel="apple-touch-icon" href="https://example.com/icon.png" />`

const nuxtExampleCode = `useSeoMeta({
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
    type: 'website'
  },
  icons: {
    apple: 'https://example.com/icon.png',
  }
}`

const relatedPlatforms = [
  { name: 'WhatsApp', to: '/open-graph/whatsapp', icon: '📞' },
  { name: 'Telegram', to: '/open-graph/telegram', icon: '✈️' },
  { name: 'Twitter', to: '/open-graph/twitter', icon: '𝕏' },
  { name: 'Slack', to: '/open-graph/slack', icon: '💬' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="iMessage Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for Apple's iMessage. Ensure your links generate beautiful rich link previews in iOS and macOS Messages."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your iMessage Link Previews"
        description="Preview how your links will appear in iMessage and all other platforms instantly."
        button-text="Try the Free Preview Tool" 
        button-to="/" 
        variant="blue" 
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
      iMessage reliably loads standard Open Graph tags. However, it requires a secure URL (`https`) everywhere and is strict about file size and caching. The recommended image is <strong>1200x630px</strong>.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">iMessage Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-photo" class="w-6 h-6 text-gray-500" />
            <h3 class="font-semibold text-gray-900 dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            1200 × 630px
          </p>
          <p class="text-sm text-gray-500 mt-1">Aspect Ratio: 1.91:1.</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-document-arrow-down" class="w-6 h-6 text-gray-500" />
            <h3 class="font-semibold text-gray-900 dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            Max 10MB
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
            <span class="text-gray-700 dark:text-gray-300"><strong>Use HTTPS for all image paths.</strong> iMessage strictly refuses to load preview images served via HTTP.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Include the Apple Touch Icon.</strong> Use <code>&lt;link rel="apple-touch-icon" href="..."&gt;</code> to provide a site icon representing the source link domain.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Expect caching.</strong> iMessage caches link previews on Apple's servers very intensely. Append a cache-buster query parameter to the link if testing.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-gray-50 dark:bg-gray-900/10 border-gray-100 dark:border-gray-900">
          <h3 class="font-semibold text-gray-900 dark:text-gray-300 mb-2">My Image Won't Appear in iMessage</h3>
          <p class="text-sm text-gray-800 dark:text-gray-200 mb-4">
            If your image doesn't appear in iMessage, check if the URL provided in <code>og:image</code> is fully qualified and uses <code>https://</code>. Also, make sure Apple's bot isn't blocked by your web server or firewall.
          </p>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>
