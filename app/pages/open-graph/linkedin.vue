<template>
  <LayoutsArticleLayout
    title="LinkedIn Open Graph Meta Tags & Specs"
    description="The exact Open Graph specifications for LinkedIn. Copy-paste the required meta tags, image sizes, and best practices for perfect professional link previews."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your LinkedIn Link Previews"
        description="Preview how your links will appear on LinkedIn and all other platforms instantly."
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
      LinkedIn recommends a <strong>1200×627px</strong> image (1.91:1 ratio). It perfectly accepts standard 1200x630px OG images. It heavily relies on the <code>og:title</code>, <code>og:image</code>, and <code>author</code> tags.
    </ContentCallout>

    <!-- Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">LinkedIn Image Specs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-photo" class="w-6 h-6 text-blue-600" />
            <h3 class="font-semibold text-gray-900 dark:text-white">Recommended Size</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            1200 × 627px
          </p>
          <p class="text-sm text-gray-500 mt-1">1.91:1 Aspect Ratio</p>
        </UCard>
        
        <UCard>
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-document-arrow-down" class="w-6 h-6 text-blue-600" />
            <h3 class="font-semibold text-gray-900 dark:text-white">File Limitations</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            Max 5MB
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
            <span class="text-gray-700 dark:text-gray-300"><strong>Add the author tag</strong> specifically (<code>article:author</code>) as LinkedIn surfaces this heavily in feeds.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Use professional imagery</strong>. Memes or clickbait perform exceptionally poorly on LinkedIn algorithms.</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-300"><strong>Avoid changing imagery often</strong>, as LinkedIn caches content heavily for 7 days.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Troubleshooting</h2>
        <UCard class="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
          <h3 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Force Cache Refresh</h3>
          <p class="text-sm text-blue-800 dark:text-blue-200 mb-4">
            LinkedIn will cache your meta tags for up to a week. You can use their official Post Inspector tool to clear it immediately.
          </p>
          <UButton 
            to="https://www.linkedin.com/post-inspector/" 
            target="_blank" 
            color="primary" 
            variant="soft"
            icon="i-heroicons-arrow-top-right-on-square"
          >
            Open LinkedIn Post Inspector
          </UButton>
        </UCard>
      </div>
    </div>
  </LayoutsArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'LinkedIn Open Graph Meta Tags & Specs',
  description: 'The exact open graph specifications for LinkedIn metadata. Get the correct 1200x627 image size and copy-paste starter tags.',
  keywords: 'linkedin og tags, linkedin open graph, linkedin link preview, linkedin post inspector, linkedin og image size',
  robots: 'index, follow',
  ogTitle: 'LinkedIn Open Graph Meta Tags & Specs',
  ogDescription: 'The exact Open Graph specifications for LinkedIn. Copy-paste the required meta tags and image sizes.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'LinkedIn Open Graph Meta Tags & Specs',
    'description': 'The exact Open Graph specifications for LinkedIn link previews',
    'url': 'https://ogpreview.app/open-graph/linkedin',
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
        'name': 'LinkedIn Open Graph Specs',
        'item': 'https://ogpreview.app/open-graph/linkedin'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Essential Open Graph Tags for LinkedIn -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your compelling description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="article" />
<!-- Recommended specific author tag for LinkedIn -->
<meta name="author" content="Author Name" />`

const nuxtExampleCode = `useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'article',
  author: 'Author Name',
})`

const nextjsExampleCode = `export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your compelling description',
    images: [{
      url: 'https://example.com/image.jpg',
      width: 1200,
      height: 627,
      alt: 'Image alt text'
    }],
    url: 'https://example.com/page',
    type: 'article',
    authors: ['Author Name']
  }
}`

const relatedPlatforms = [
  { name: 'Facebook', to: '/open-graph/facebook', icon: '📘' },
  { name: 'Twitter', to: '/open-graph/twitter', icon: '𝕏' },
  { name: 'Discord', to: '/open-graph/discord', icon: '🎮' },
  { name: 'Slack', to: '/open-graph/slack', icon: '💬' }
]
</script>
