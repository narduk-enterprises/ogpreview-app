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
          Discord Open Graph Preview Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Optimize your Open Graph tags for Discord's community platform. Learn Discord-specific requirements, image dimensions, and best practices for link previews in Discord servers and messages.
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
            Discord uses standard Open Graph protocol with recommended image size of 1200×630px. Discord also reads the theme-color meta tag to customize embed colors. Discord caches aggressively (24+ hours), so use absolute HTTPS URLs.
          </p>
        </div>

        <h2 id="discord-og-overview">How Discord Uses Open Graph Tags</h2>
        <p>
          Discord is a community-focused chat platform that uses Open Graph tags to create rich link previews (embeds) when users share URLs in servers, direct messages, and channels. Discord's implementation follows the standard Open Graph protocol with some platform-specific enhancements.
        </p>

        <h3>Where Discord Shows Open Graph Previews</h3>
        <ul>
          <li><strong>Server Channels</strong> - Link previews in text channels</li>
          <li><strong>Direct Messages</strong> - Rich embeds in private conversations</li>
          <li><strong>Group DMs</strong> - Preview cards in group chats</li>
          <li><strong>Threads</strong> - Link previews in message threads</li>
          <li><strong>Forum Channels</strong> - Embeds in forum posts</li>
        </ul>

        <h2 id="discord-image-dimensions">Discord Image Dimensions & Requirements</h2>
        <p>
          Discord follows standard Open Graph image recommendations:
        </p>

        <h3>Recommended Image Size</h3>
        <ul>
          <li><strong>Optimal size:</strong> 1200×630px (1.91:1 aspect ratio)</li>
          <li><strong>Minimum size:</strong> 300×300px</li>
          <li><strong>Maximum file size:</strong> 10MB (but aim for under 1MB)</li>
          <li><strong>Format:</strong> JPG, PNG, GIF, or WebP</li>
          <li><strong>Image ratio:</strong> 1.91:1 works best, but Discord handles various ratios</li>
        </ul>

        <h3>Image Best Practices for Discord</h3>
        <ul>
          <li>Use high-contrast images that work in Discord's dark theme</li>
          <li>Keep text large and readable</li>
          <li>Include vibrant colors that stand out in chat</li>
          <li>Test how images appear in both light and dark Discord themes</li>
          <li>Consider Discord's compact embed layout when designing</li>
        </ul>

        <h2 id="discord-theme-color">Discord Theme Color Feature</h2>
        <p>
          Discord has a unique feature that allows you to customize the embed color using the <code>theme-color</code> meta tag:
        </p>

        <pre><code>&lt;!-- Discord Theme Color --&gt;
&lt;meta name="theme-color" content="#5865F2" /&gt;</code></pre>

        <p>
          This sets the accent color on the left border of Discord embeds, helping your links stand out and match your brand.
        </p>

        <h3>Theme Color Best Practices</h3>
        <ul>
          <li>Use your brand's primary color</li>
          <li>Choose colors that contrast well with Discord's dark theme</li>
          <li>Use hex color codes (e.g., #5865F2 for Discord's brand color)</li>
          <li>Test how the color appears in both light and dark Discord themes</li>
        </ul>

        <h2 id="required-discord-tags">Required Discord Open Graph Tags</h2>
        <p>
          Discord requires these essential Open Graph tags:
        </p>

        <pre><code>&lt;!-- Essential Open Graph Tags for Discord --&gt;
&lt;meta property="og:title" content="Your Page Title" /&gt;
&lt;meta property="og:description" content="Your page description" /&gt;
&lt;meta property="og:image" content="https://example.com/image.jpg" /&gt;
&lt;meta property="og:url" content="https://example.com/page" /&gt;
&lt;meta property="og:type" content="website" /&gt;

&lt;!-- Optional: Discord Theme Color --&gt;
&lt;meta name="theme-color" content="#5865F2" /&gt;</code></pre>

        <h3>Recommended Additional Tags</h3>
        <ul>
          <li><code>og:site_name</code> - Your site name</li>
          <li><code>og:image:width</code> and <code>og:image:height</code> - Image dimensions</li>
          <li><code>og:image:alt</code> - Alt text for accessibility</li>
          <li><code>theme-color</code> - Custom embed border color</li>
        </ul>

        <h2 id="discord-caching">Discord Caching Behavior</h2>
        <p>
          Discord aggressively caches Open Graph data, which can be frustrating when updating your tags:
        </p>

        <h3>Cache Duration</h3>
        <ul>
          <li>Discord typically caches for 24-48 hours</li>
          <li>Cache is per-URL, so changing the URL bypasses cache</li>
          <li>There's no official Discord cache-clearing tool</li>
        </ul>

        <h3>Cache Workarounds</h3>
        <ul>
          <li>Wait 24-48 hours for natural cache expiration</li>
          <li>Use query parameters to create a "new" URL (e.g., ?v=2)</li>
          <li>Test with a different URL to verify your tags are correct</li>
          <li>Use our <NuxtLink to="/" class="font-semibold">preview tool</NuxtLink> to verify tags without waiting for cache</li>
        </ul>

        <h2 id="common-mistakes">Common Discord Open Graph Mistakes</h2>

        <h3>1. Relative Image URLs</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ <code>&lt;meta property="og:image" content="/images/og.jpg" /&gt;</code>
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ <code>&lt;meta property="og:image" content="https://example.com/images/og.jpg" /&gt;</code>
        </p>
        <p>
          Discord requires absolute URLs with HTTPS. Relative paths will not work.
        </p>

        <h3>2. Not Using Theme Color</h3>
        <p>
          The <code>theme-color</code> meta tag is a simple way to make your Discord embeds stand out:
        </p>
        <pre><code>&lt;meta name="theme-color" content="#YOUR_BRAND_COLOR" /&gt;</code></pre>
        <p>
          This small addition can significantly improve brand recognition in Discord.
        </p>

        <h3>3. Images That Don't Work in Dark Theme</h3>
        <p>
          Discord is primarily used in dark theme. Ensure your images:
        </p>
        <ul>
          <li>Have good contrast against dark backgrounds</li>
          <li>Use bright, vibrant colors</li>
          <li>Test how they appear in Discord's dark interface</li>
        </ul>

        <h3>4. Not Accounting for Cache</h3>
        <p>
          Discord's aggressive caching means updates won't appear immediately:
        </p>
        <ul>
          <li>Plan ahead when updating OG tags</li>
          <li>Test with our preview tool before sharing</li>
          <li>Consider using versioned URLs for important updates</li>
        </ul>

        <h2 id="discord-embed-structure">Discord Embed Structure</h2>
        <p>
          Understanding how Discord structures embeds helps optimize your Open Graph tags:
        </p>

        <h3>Embed Components</h3>
        <ul>
          <li><strong>Title</strong> - From og:title (clickable, links to og:url)</li>
          <li><strong>Description</strong> - From og:description (truncated if too long)</li>
          <li><strong>Image</strong> - From og:image (displayed at bottom of embed)</li>
          <li><strong>Footer</strong> - Shows domain name from og:url</li>
          <li><strong>Color Bar</strong> - Left border color from theme-color</li>
        </ul>

        <h3>Description Length</h3>
        <p>
          Discord truncates long descriptions. Best practices:
        </p>
        <ul>
          <li>Keep descriptions under 200 characters for full display</li>
          <li>Put most important information in the first 150 characters</li>
          <li>Use line breaks strategically (Discord respects some formatting)</li>
        </ul>

        <h2 id="implementation-examples">Implementation Examples</h2>

        <h3>Nuxt 3</h3>
        <pre><code>useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your description optimized for Discord',
  ogImage: 'https://example.com/discord-og-image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'website',
  ogSiteName: 'Your Site Name',
  themeColor: '#5865F2' // Discord brand color or your brand color
})</code></pre>

        <h3>Next.js 14+</h3>
        <pre><code>export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your description',
    images: ['https://example.com/discord-og-image.jpg'],
    url: 'https://example.com/page',
    siteName: 'Your Site Name',
    type: 'website'
  },
  other: {
    'theme-color': '#5865F2'
  }
}</code></pre>

        <h2 id="discord-community-tips">Discord Community Tips</h2>
        <p>
          For Discord communities and servers, consider these additional optimizations:
        </p>

        <h3>Community-Focused Content</h3>
        <ul>
          <li>Use engaging, community-oriented language</li>
          <li>Include calls-to-action that encourage Discord engagement</li>
          <li>Use vibrant, eye-catching images that stand out in chat</li>
          <li>Leverage theme-color to match your server's branding</li>
        </ul>

        <h3>Gaming and Tech Communities</h3>
        <ul>
          <li>Discord is popular with gaming and tech communities</li>
          <li>Use relevant imagery and terminology</li>
          <li>Consider Discord's younger, tech-savvy audience</li>
          <li>Test how previews appear in gaming-focused servers</li>
        </ul>

        <h2 id="related-resources">Related Resources</h2>
        <ul>
          <li><NuxtLink to="/open-graph/slack" class="font-semibold">Slack Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph/facebook" class="font-semibold">Facebook Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph/twitter" class="font-semibold">Twitter Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/og-image-size-guide" class="font-semibold">OG Image Size Guide</NuxtLink></li>
          <li><NuxtLink to="/why-og-images-not-updating" class="font-semibold">Why OG Images Not Updating</NuxtLink></li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Test Your Discord Link Previews
        </h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Preview how your links will appear in Discord servers and messages.
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
              <PlatformIcon platform="Facebook" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Facebook
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/twitter"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="text-2xl mb-2">𝕏</div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Twitter
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/linkedin"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-2 flex justify-center">
              <PlatformIcon platform="LinkedIn" size="md" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              LinkedIn
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/slack"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="mb-2 flex justify-center">
              <PlatformIcon platform="Slack" size="md" />
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
  title: 'Discord Open Graph Preview Guide - Optimize Your Discord Link Previews',
  description: 'Complete guide to Discord Open Graph optimization. Learn Discord-specific requirements, theme-color customization, image dimensions (1200×630px), and best practices for Discord embeds.',
  keywords: 'discord og tags, discord open graph, discord link preview, discord embed, discord og image, discord theme color, discord meta tags, discord card preview',
  robots: 'index, follow',
  ogTitle: 'Discord Open Graph Preview Guide - Optimize Your Discord Link Previews',
  ogDescription: 'Master Discord Open Graph tags for perfect link embeds. Learn image dimensions, theme-color customization, caching behavior, and best practices for Discord communities.',
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
    'name': 'Discord Open Graph Preview Guide',
    'description': 'Complete guide to optimizing Open Graph tags for perfect link previews on Discord',
    'url': 'https://ogpreview.app/open-graph/discord',
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
        'name': 'What image size should I use for Discord Open Graph?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Discord recommends 1200×630px (1.91:1 aspect ratio) for optimal display. Minimum size is 300×300px, but larger images provide better quality in Discord embeds.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I customize the color of Discord embeds?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the theme-color meta tag: &lt;meta name="theme-color" content="#YOUR_COLOR" /&gt;. This sets the left border color of Discord embeds to match your brand.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long does Discord cache Open Graph data?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Discord typically caches Open Graph data for 24-48 hours. There\'s no official cache-clearing tool, so you may need to wait or use query parameters to create a "new" URL.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the required Open Graph tags for Discord?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Discord requires the standard Open Graph tags: og:title, og:description, og:image, og:url, and og:type. Optionally include theme-color for custom embed colors.'
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
        'name': 'Discord Open Graph Guide',
        'item': 'https://ogpreview.app/open-graph/discord'
      }
    ]
  }
])
</script>
