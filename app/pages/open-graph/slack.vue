<template>
  <main
    class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <article class="max-w-4xl mx-auto">
      <!-- Navigation -->
      <nav class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Tool
        </NuxtLink>
      </nav>

      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Slack Open Graph Preview Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Optimize your Open Graph tags for Slack's workplace communication platform. Learn Slack-specific requirements,
          image dimensions, and best practices for professional link previews in Slack workspaces.
        </p>
        <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            Updated December 2025
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            7 min read
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
            Slack uses standard Open Graph protocol with recommended image size of 1200×630px. Slack caches aggressively
            (24+ hours) and requires absolute HTTPS URLs. Focus on professional, workplace-appropriate content for best
            results.
          </p>
        </div>

        <h2 id="slack-og-overview">How Slack Uses Open Graph Tags</h2>
        <p>
          Slack is a workplace communication platform that uses Open Graph tags to create rich link previews (unfurling)
          when users share URLs in channels, direct messages, and threads. Slack's implementation follows the standard
          Open Graph protocol.
        </p>

        <h3>Where Slack Shows Open Graph Previews</h3>
        <ul>
          <li><strong>Channels</strong> - Link previews in public and private channels</li>
          <li><strong>Direct Messages</strong> - Rich embeds in 1-on-1 conversations</li>
          <li><strong>Group DMs</strong> - Preview cards in group conversations</li>
          <li><strong>Threads</strong> - Link previews in message threads</li>
          <li><strong>Shared Channels</strong> - Embeds in shared channels between workspaces</li>
        </ul>

        <h2 id="slack-image-dimensions">Slack Image Dimensions & Requirements</h2>
        <p>
          Slack follows standard Open Graph image recommendations:
        </p>

        <h3>Recommended Image Size</h3>
        <ul>
          <li><strong>Optimal size:</strong> 1200×630px (1.91:1 aspect ratio)</li>
          <li><strong>Minimum size:</strong> 200×200px</li>
          <li><strong>Maximum file size:</strong> 5MB (but aim for under 1MB)</li>
          <li><strong>Format:</strong> JPG, PNG, GIF, or WebP</li>
          <li><strong>Image ratio:</strong> 1.91:1 works best, but Slack handles various ratios</li>
        </ul>

        <h3>Image Best Practices for Slack</h3>
        <ul>
          <li>Use professional, workplace-appropriate images</li>
          <li>Keep text clear and readable</li>
          <li>Use high contrast for visibility in Slack's interface</li>
          <li>Test how images appear in both light and dark Slack themes</li>
          <li>Consider Slack's compact, professional design aesthetic</li>
        </ul>

        <h2 id="required-slack-tags">Required Slack Open Graph Tags</h2>
        <p>
          Slack requires these essential Open Graph tags:
        </p>

        <pre><code>&lt;!-- Essential Open Graph Tags for Slack --&gt;
&lt;meta property="og:title" content="Your Page Title" /&gt;
&lt;meta property="og:description" content="Your page description" /&gt;
&lt;meta property="og:image" content="https://example.com/image.jpg" /&gt;
&lt;meta property="og:url" content="https://example.com/page" /&gt;
&lt;meta property="og:type" content="website" /&gt;</code></pre>

        <h3>Recommended Additional Tags</h3>
        <ul>
          <li><code>og:site_name</code> - Your site or company name</li>
          <li><code>og:image:width</code> and <code>og:image:height</code> - Image dimensions</li>
          <li><code>og:image:alt</code> - Alt text for accessibility</li>
          <li><code>og:locale</code> - Language locale</li>
        </ul>

        <h2 id="slack-caching">Slack Caching Behavior</h2>
        <p>
          Slack aggressively caches Open Graph data, similar to Discord:
        </p>

        <h3>Cache Duration</h3>
        <ul>
          <li>Slack typically caches for 24-48 hours</li>
          <li>Cache is per-URL, so changing the URL bypasses cache</li>
          <li>There's no official Slack cache-clearing tool</li>
        </ul>

        <h3>Cache Workarounds</h3>
        <ul>
          <li>Wait 24-48 hours for natural cache expiration</li>
          <li>Use query parameters to create a "new" URL (e.g., ?v=2)</li>
          <li>Test with a different URL to verify your tags are correct</li>
          <li>
Use our <NuxtLink to="/" class="font-semibold">preview tool</NuxtLink> to verify tags without waiting for
            cache
</li>
        </ul>

        <h2 id="slack-unfurling">Slack Link Unfurling</h2>
        <p>
          Slack automatically "unfurls" (expands) links into rich previews when shared. Understanding this process helps
          optimize your Open Graph tags:
        </p>

        <h3>Unfurling Process</h3>
        <ol>
          <li>User shares a URL in Slack</li>
          <li>Slack's servers fetch the URL</li>
          <li>Slack parses Open Graph tags from the HTML</li>
          <li>Slack displays a rich preview card</li>
          <li>Preview is cached for future shares</li>
        </ol>

        <h3>Unfurling Best Practices</h3>
        <ul>
          <li>Ensure your server responds quickly (Slack has timeout limits)</li>
          <li>Use absolute HTTPS URLs for all OG tags</li>
          <li>Include all required tags for complete previews</li>
          <li>Test unfurling in your own Slack workspace</li>
        </ul>

        <h2 id="common-mistakes">Common Slack Open Graph Mistakes</h2>

        <h3>1. Relative Image URLs</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ <code>&lt;meta property="og:image" content="/images/og.jpg" /&gt;</code>
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ <code>&lt;meta property="og:image" content="https://example.com/images/og.jpg" /&gt;</code>
        </p>
        <p>
          Slack requires absolute URLs with HTTPS. Relative paths will not work.
        </p>

        <h3>2. Slow Server Response</h3>
        <p>
          Slack has timeout limits when fetching URLs:
        </p>
        <ul>
          <li>Ensure your server responds within 3-5 seconds</li>
          <li>Use CDN for images to improve load times</li>
          <li>Optimize your server response time</li>
          <li>Test with Slack's unfurling to verify performance</li>
        </ul>

        <h3>3. Not Accounting for Cache</h3>
        <p>
          Slack's aggressive caching means updates won't appear immediately:
        </p>
        <ul>
          <li>Plan ahead when updating OG tags</li>
          <li>Test with our preview tool before sharing in Slack</li>
          <li>Consider using versioned URLs for important updates</li>
          <li>Communicate cache delays to your team</li>
        </ul>

        <h3>4. Workplace-Inappropriate Content</h3>
        <p>
          Slack is a professional platform. Ensure your previews:
        </p>
        <ul>
          <li>Use professional language and imagery</li>
          <li>Avoid overly casual or entertainment-focused content</li>
          <li>Focus on business value and outcomes</li>
          <li>Match the professional tone of workplace communication</li>
        </ul>

        <h2 id="slack-embed-structure">Slack Embed Structure</h2>
        <p>
          Understanding how Slack structures link previews helps optimize your Open Graph tags:
        </p>

        <h3>Preview Components</h3>
        <ul>
          <li><strong>Title</strong> - From og:title (clickable, links to og:url)</li>
          <li><strong>Description</strong> - From og:description (truncated if too long)</li>
          <li><strong>Image</strong> - From og:image (displayed prominently)</li>
          <li><strong>Footer</strong> - Shows domain name from og:url</li>
          <li><strong>Site Name</strong> - From og:site_name (appears below title)</li>
        </ul>

        <h3>Description Length</h3>
        <p>
          Slack truncates long descriptions. Best practices:
        </p>
        <ul>
          <li>Keep descriptions under 200 characters for full display</li>
          <li>Put most important information in the first 150 characters</li>
          <li>Use clear, concise language</li>
        </ul>

        <h2 id="slack-workplace-tips">Slack Workplace Tips</h2>
        <p>
          For workplace and B2B content shared in Slack, consider these optimizations:
        </p>

        <h3>Professional Content Strategy</h3>
        <ul>
          <li>Use professional, business-focused language</li>
          <li>Emphasize business value and outcomes</li>
          <li>Include relevant data or statistics</li>
          <li>Use professional imagery (office, team, product demos)</li>
        </ul>

        <h3>Internal Tool Sharing</h3>
        <ul>
          <li>Many Slack links are internal tools and documentation</li>
          <li>Make titles clear and descriptive</li>
          <li>Use descriptions that explain value to team members</li>
          <li>Include helpful context in the preview</li>
        </ul>

        <h2 id="implementation-examples">Implementation Examples</h2>

        <h3>Nuxt 3</h3>
        <pre><code>useSeoMeta({
  ogTitle: 'Your Professional Title',
  ogDescription: 'Your workplace-appropriate description',
  ogImage: 'https://example.com/slack-og-image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'website',
  ogSiteName: 'Your Company Name',
  ogLocale: 'en_US',
  ogImageWidth: '1200',
  ogImageHeight: '630'
})</code></pre>

        <h3>Next.js 14+</h3>
        <pre><code>export const metadata = {
  openGraph: {
    title: 'Your Professional Title',
    description: 'Your workplace-appropriate description',
    images: [{
      url: 'https://example.com/slack-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional image description'
    }],
    url: 'https://example.com/page',
    siteName: 'Your Company Name',
    locale: 'en_US',
    type: 'website'
  }
}</code></pre>

        <h2 id="related-resources">Related Resources</h2>
        <ul>
          <li>
            <NuxtLink to="/open-graph/discord" class="font-semibold">Discord Open Graph Guide</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/open-graph/linkedin" class="font-semibold">LinkedIn Open Graph Guide</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/open-graph/facebook" class="font-semibold">Facebook Open Graph Guide</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/og-image-size-guide" class="font-semibold">OG Image Size Guide</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/why-og-images-not-updating" class="font-semibold">Why OG Images Not Updating</NuxtLink>
          </li>
          <li>
<a href="https://api.slack.com/reference/messaging/link-unfurling" target="_blank" rel="noopener">Slack
              Link Unfurling Documentation</a>
</li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Test Your Slack Link Previews
        </h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Preview how your links will appear in Slack workspaces and channels.
        </p>
        <NuxtLink
to="/"
          class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
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
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all">
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="Facebook" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Facebook
            </h3>
          </NuxtLink>
          <NuxtLink
to="/open-graph/twitter"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all">
            <div class="text-2xl mb-2">𝕏</div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Twitter
            </h3>
          </NuxtLink>
          <NuxtLink
to="/open-graph/linkedin"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all">
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="LinkedIn" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              LinkedIn
            </h3>
          </NuxtLink>
          <NuxtLink
to="/open-graph/discord"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all">
            <div class="mb-2 flex justify-center">
              <ContentPlatformIcon platform="Discord" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Discord
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
  title: 'Slack Open Graph Preview Guide - Optimize Your Slack Link Previews',
  description: 'Complete guide to Slack Open Graph optimization. Learn Slack-specific requirements, image dimensions (1200×630px), caching behavior, and best practices for workplace link previews.',
  keywords: 'slack og tags, slack open graph, slack link preview, slack unfurling, slack og image, slack meta tags, slack card preview, workplace link preview',
  robots: 'index, follow',
  ogTitle: 'Slack Open Graph Preview Guide - Optimize Your Slack Link Previews',
  ogDescription: 'Master Slack Open Graph tags for perfect link previews. Learn image dimensions, caching behavior, unfurling process, and best practices for workplace communication.',
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
    'name': 'Slack Open Graph Preview Guide',
    'description': 'Complete guide to optimizing Open Graph tags for perfect link previews on Slack',
    'url': 'https://ogpreview.app/open-graph/slack',
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
        'name': 'What image size should I use for Slack Open Graph?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Slack recommends 1200×630px (1.91:1 aspect ratio) for optimal display. Minimum size is 200×200px, but larger images provide better quality in Slack link previews.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long does Slack cache Open Graph data?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Slack typically caches Open Graph data for 24-48 hours. There\'s no official cache-clearing tool, so you may need to wait or use query parameters to create a "new" URL.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is Slack link unfurling?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Slack link unfurling is the automatic process where Slack expands shared URLs into rich preview cards using Open Graph tags. Slack fetches the URL, parses OG tags, and displays a preview card.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the required Open Graph tags for Slack?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Slack requires the standard Open Graph tags: og:title, og:description, og:image, og:url, and og:type. Also include og:site_name for better branding in Slack previews.'
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
        'name': 'Slack Open Graph Guide',
        'item': 'https://ogpreview.app/open-graph/slack'
      }
    ]
  }
])
</script>
