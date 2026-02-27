<template>
  <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <article class="max-w-4xl mx-auto">
      <!-- Navigation -->
      <nav class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Tool
        </NuxtLink>
      </nav>

      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Twitter (X) Open Graph Preview Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Learn how to optimize your Open Graph tags and Twitter Cards for perfect link previews on Twitter/X. Master the platform-specific requirements and avoid common mistakes.
        </p>
        <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            Updated December 2025
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            8 min read
          </span>
        </div>
      </header>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <!-- Featured snippet answer -->
        <div class="not-prose my-8 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-6">
          <p class="text-lg text-blue-900 dark:text-blue-100 font-semibold mb-2">
            Quick Answer
          </p>
          <p class="text-blue-800 dark:text-blue-200">
            Twitter (X) uses both Open Graph tags and Twitter Card meta tags. For best results, use <code>twitter:card</code> set to "summary_large_image" with an image size of 1200×675px. Twitter falls back to OG tags but prefers Twitter-specific tags for better control.
          </p>
        </div>

        <h2 id="twitter-og-overview">How Twitter Handles Open Graph Tags</h2>
        <p>
          Twitter (formerly Twitter, now X) supports both the standard Open Graph protocol and its own Twitter Card system. While Twitter will fall back to OG tags if Twitter Card tags are missing, using Twitter-specific tags gives you better control over how your links appear.
        </p>

        <h3>Twitter Card Types</h3>
        <p>
          Twitter supports several card types, each optimized for different content:
        </p>
        <ul>
          <li><strong>summary</strong> - Small card with title, description, and thumbnail (120×120px)</li>
          <li><strong>summary_large_image</strong> - Large card with title, description, and large image (1200×675px recommended)</li>
          <li><strong>app</strong> - App download card</li>
          <li><strong>player</strong> - Video or audio player card</li>
        </ul>

        <p>
          For most websites, <code>summary_large_image</code> provides the best visual impact and engagement.
        </p>

        <h2 id="twitter-image-dimensions">Twitter Image Dimensions & Requirements</h2>
        <p>
          Twitter has specific image requirements that differ slightly from standard Open Graph recommendations:
        </p>

        <h3>Recommended Image Size</h3>
        <ul>
          <li><strong>Summary Large Image:</strong> 1200×675px (1.78:1 aspect ratio)</li>
          <li><strong>Minimum size:</strong> 300×157px</li>
          <li><strong>Maximum file size:</strong> 5MB (but aim for under 1MB for faster loading)</li>
          <li><strong>Format:</strong> JPG, PNG, GIF, or WebP</li>
        </ul>

        <h3>Image Best Practices for Twitter</h3>
        <ul>
          <li>Use high contrast colors - Twitter's UI is dark, so bright images stand out</li>
          <li>Keep text large and readable (minimum 40px font size)</li>
          <li>Avoid placing important content in the bottom 20% of the image (where Twitter overlays the domain)</li>
          <li>Test on both light and dark mode Twitter interfaces</li>
          <li>Include your brand logo or visual identity</li>
        </ul>

        <h2 id="required-twitter-tags">Required Twitter Card Tags</h2>
        <p>
          At minimum, include these Twitter Card meta tags in your page's <code>&lt;head&gt;</code>:
        </p>

        <pre><code>&lt;!-- Twitter Card Tags --&gt;
&lt;meta name="twitter:card" content="summary_large_image" /&gt;
&lt;meta name="twitter:title" content="Your Page Title" /&gt;
&lt;meta name="twitter:description" content="Your page description" /&gt;
&lt;meta name="twitter:image" content="https://example.com/image.jpg" /&gt;

&lt;!-- Open Graph Tags (Twitter falls back to these) --&gt;
&lt;meta property="og:title" content="Your Page Title" /&gt;
&lt;meta property="og:description" content="Your page description" /&gt;
&lt;meta property="og:image" content="https://example.com/image.jpg" /&gt;
&lt;meta property="og:url" content="https://example.com/page" /&gt;</code></pre>

        <h3>Optional Twitter Tags</h3>
        <ul>
          <li><code>twitter:site</code> - Your Twitter handle (e.g., @username)</li>
          <li><code>twitter:creator</code> - Author's Twitter handle</li>
          <li><code>twitter:image:alt</code> - Alt text for the image (important for accessibility)</li>
        </ul>

        <h2 id="common-mistakes">Common Twitter Card Mistakes</h2>

        <h3>1. Missing twitter:card Tag</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ <code>&lt;meta property="og:image" content="..." /&gt;</code> (only OG tags)
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ <code>&lt;meta name="twitter:card" content="summary_large_image" /&gt;</code> + OG tags
        </p>
        <p>
          Without the <code>twitter:card</code> tag, Twitter may not display your image properly, even if OG tags are present.
        </p>

        <h3>2. Wrong Image Aspect Ratio</h3>
        <p>
          Using Facebook's recommended 1200×630px (1.91:1) works, but Twitter's native 1200×675px (1.78:1) provides better visual results:
        </p>
        <ul>
          <li>Twitter crops images to fit its card format</li>
          <li>Images that are too tall or too wide may be cropped awkwardly</li>
          <li>Test your images using the <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a></li>
        </ul>

        <h3>3. Relative Image URLs</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ <code>&lt;meta name="twitter:image" content="/images/twitter-card.jpg" /&gt;</code>
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ <code>&lt;meta name="twitter:image" content="https://example.com/images/twitter-card.jpg" /&gt;</code>
        </p>
        <p>
          Twitter requires absolute URLs with the full protocol (https://). Relative paths will not work.
        </p>

        <h3>4. Not Testing Before Publishing</h3>
        <p>
          Always validate your Twitter Cards before sharing:
        </p>
        <ul>
          <li>Use the <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a> to preview and debug</li>
          <li>Test with our <NuxtLink to="/" class="font-semibold">Open Graph Preview Tool</NuxtLink> to see how it appears</li>
          <li>Share a test tweet to verify the final appearance</li>
        </ul>

        <h2 id="twitter-vs-og">Twitter Cards vs Open Graph Tags</h2>
        <p>
          While Twitter supports Open Graph tags, there are key differences:
        </p>

        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Open Graph</th>
              <th>Twitter Cards</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image aspect ratio</td>
              <td>1.91:1 (1200×630px)</td>
              <td>1.78:1 (1200×675px)</td>
            </tr>
            <tr>
              <td>Card type control</td>
              <td>Limited</td>
              <td>Full control via twitter:card</td>
            </tr>
            <tr>
              <td>Site/creator attribution</td>
              <td>Not supported</td>
              <td>twitter:site, twitter:creator</td>
            </tr>
            <tr>
              <td>Fallback behavior</td>
              <td>N/A</td>
              <td>Falls back to OG tags if missing</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Best Practice:</strong> Include both Twitter Card tags and Open Graph tags. This ensures compatibility across all platforms while giving Twitter the specific tags it prefers.
        </p>

        <h2 id="implementation-examples">Implementation Examples</h2>

        <h3>Nuxt 3</h3>
        <pre><code>useSeoMeta({
  // Open Graph
  ogTitle: 'Your Page Title',
  ogDescription: 'Your description',
  ogImage: 'https://example.com/og-image.jpg',
  ogUrl: 'https://example.com/page',

  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: 'Your Page Title',
  twitterDescription: 'Your description',
  twitterImage: 'https://example.com/twitter-image.jpg',
  twitterSite: '@yourhandle',
  twitterCreator: '@authorhandle'
})</code></pre>

        <h3>Next.js 14+</h3>
        <pre><code>export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your description',
    images: ['https://example.com/og-image.jpg'],
    url: 'https://example.com/page'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Page Title',
    description: 'Your description',
    images: ['https://example.com/twitter-image.jpg'],
    site: '@yourhandle',
    creator: '@authorhandle'
  }
}</code></pre>

        <h2 id="testing-workflow">Testing Your Twitter Cards</h2>
        <ol>
          <li><strong>Validate with Twitter Card Validator</strong> - Use the <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">official validator</a> to preview and debug</li>
          <li><strong>Preview with our tool</strong> - Test with our <NuxtLink to="/" class="font-semibold">Open Graph Preview Tool</NuxtLink> to see how it appears across platforms</li>
          <li><strong>Test on mobile</strong> - Most Twitter users view on mobile, so ensure your cards look good on small screens</li>
          <li><strong>Check dark mode</strong> - Twitter's dark mode is popular; verify your images have good contrast</li>
          <li><strong>Monitor engagement</strong> - Track CTR and engagement metrics to optimize your cards over time</li>
        </ol>

        <h2 id="related-resources">Related Resources</h2>
        <ul>
          <li><NuxtLink to="/open-graph/facebook" class="font-semibold">Facebook Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph/linkedin" class="font-semibold">LinkedIn Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/guides/twitter-card-preview" class="font-semibold">Complete Twitter Card Preview Guide</NuxtLink></li>
          <li><NuxtLink to="/og-image-size-guide" class="font-semibold">OG Image Size Guide</NuxtLink></li>
          <li><a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards" target="_blank" rel="noopener">Twitter Cards Documentation</a></li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Test Your Twitter Cards Now
        </h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Preview how your links will appear on Twitter/X and all other platforms in one place.
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Try the Free Preview Tool
        </NuxtLink>
      </div>

      <!-- Related Platform Pages -->
      <nav class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Other Platform Guides
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            to="/open-graph/facebook"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="Facebook" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Facebook
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/linkedin"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="LinkedIn" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              LinkedIn
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/discord"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="Discord" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Discord
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/slack"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="Slack" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Slack
            </h3>
          </NuxtLink>
        </div>
      </nav>
    </article>
  </main>
</template>

<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Twitter (X) Open Graph Preview Guide - Optimize Your Twitter Cards',
  description: 'Complete guide to Twitter Card optimization. Learn Twitter-specific image dimensions (1200×675px), required meta tags, common mistakes, and best practices for perfect link previews on Twitter/X.',
  keywords: 'twitter card preview, twitter og tags, twitter open graph, twitter card validator, twitter card image size, twitter meta tags, x.com preview, twitter link preview',
  robots: 'index, follow',
  ogTitle: 'Twitter (X) Open Graph Preview Guide - Optimize Your Twitter Cards',
  ogDescription: 'Master Twitter Cards and Open Graph tags for Twitter/X. Learn image dimensions, required meta tags, and avoid common mistakes for perfect link previews.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Twitter (X) Open Graph Preview Guide',
    'description': 'Complete guide to optimizing Open Graph tags and Twitter Cards for perfect link previews on Twitter/X',
    'url': 'https://ogpreview.app/open-graph/twitter',
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
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What image size should I use for Twitter Cards?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'For summary_large_image cards, use 1200×675px (1.78:1 aspect ratio). This is Twitter\'s recommended size and provides the best visual results.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do I need both Twitter Card tags and Open Graph tags?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, include both. Twitter will fall back to Open Graph tags if Twitter Card tags are missing, but using Twitter-specific tags gives you better control and ensures optimal display.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the difference between Twitter Cards and Open Graph?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Twitter Cards are Twitter\'s extension of Open Graph. While Twitter supports OG tags, Twitter Card tags (like twitter:card, twitter:title) provide platform-specific control and better results on Twitter/X.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I test my Twitter Cards?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the Twitter Card Validator (cards-dev.twitter.com/validator) to preview and debug your cards. You can also use our Open Graph Preview Tool to see how your links appear across all platforms.'
        }
      }
    ]
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
        'name': 'Twitter Open Graph Guide',
        'item': 'https://ogpreview.app/open-graph/twitter'
      }
    ]
  }
])
</script>
