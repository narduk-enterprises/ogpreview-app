<template>
  <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
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
          Open Graph Debugging Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Troubleshoot and fix Open Graph tag issues. Learn how to debug missing images, incorrect previews, caching problems, and common OG tag errors.
        </p>
        <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            Updated December 2025
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            10 min read
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
            To debug Open Graph tags, use platform-specific validators (Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector), check that tags are in the HTML source (not injected by JavaScript), verify absolute HTTPS image URLs, and clear platform caches. Use our preview tool to test across all platforms at once.
          </p>
        </div>

        <h2 id="debugging-tools">Open Graph Debugging Tools</h2>
        <p>
          The first step in debugging Open Graph tags is using the right tools:
        </p>

        <h3>Universal Preview Tool</h3>
        <p>
          Our <NuxtLink to="/" class="font-semibold">Open Graph Preview Tool</NuxtLink> lets you test your tags across all platforms at once, making it the fastest way to identify issues.
        </p>

        <h3>Platform-Specific Validators</h3>
        <ul>
          <li><strong>Facebook:</strong> <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing Debugger</a> - Preview, debug, and clear cache</li>
          <li><strong>Twitter:</strong> <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a> - Test Twitter Cards</li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">LinkedIn Post Inspector</a> - Preview and clear cache</li>
          <li><strong>Slack/Discord:</strong> No official validators, but you can test by sharing in your workspace</li>
        </ul>

        <h2 id="common-issues">Common Open Graph Issues</h2>

        <h3>1. Missing or Broken Images</h3>
        <p>
          <strong>Symptoms:</strong> No image appears in preview, or a broken image icon shows.
        </p>
        <p>
          <strong>Common Causes:</strong>
        </p>
        <ul>
          <li>Relative image URLs instead of absolute URLs</li>
          <li>Images blocked by CORS or authentication</li>
          <li>Images too large or in unsupported format</li>
          <li>HTTPS mixed content issues</li>
        </ul>
        <p>
          <strong>Solutions:</strong>
        </p>
        <ul>
          <li>Use absolute HTTPS URLs: <code>https://example.com/image.jpg</code></li>
          <li>Ensure images are publicly accessible (no login required)</li>
          <li>Verify image loads in a browser</li>
          <li>Check image file size (keep under 1MB)</li>
          <li>Use supported formats: JPG, PNG, GIF, or WebP</li>
        </ul>

        <h3>2. Incorrect Title or Description</h3>
        <p>
          <strong>Symptoms:</strong> Preview shows wrong title or description, or uses default page content.
        </p>
        <p>
          <strong>Common Causes:</strong>
        </p>
        <ul>
          <li>Meta tags not in HTML source (injected by JavaScript)</li>
          <li>Multiple og:title or og:description tags</li>
          <li>Tags in wrong location (not in &lt;head&gt;)</li>
          <li>Character encoding issues</li>
        </ul>
        <p>
          <strong>Solutions:</strong>
        </p>
        <ul>
          <li>View page source (not rendered HTML) to verify tags exist</li>
          <li>Ensure tags are in the &lt;head&gt; section</li>
          <li>Use Server-Side Rendering (SSR) or Static Site Generation (SSG)</li>
          <li>Remove duplicate tags</li>
          <li>Check for HTML entities or encoding issues</li>
        </ul>

        <h3>3. Cached Old Preview</h3>
        <p>
          <strong>Symptoms:</strong> Preview shows old content even after updating tags.
        </p>
        <p>
          <strong>Common Causes:</strong>
        </p>
        <ul>
          <li>Platform caching (Facebook, LinkedIn cache for days)</li>
          <li>CDN caching</li>
          <li>Browser caching</li>
        </ul>
        <p>
          <strong>Solutions:</strong>
        </p>
        <ul>
          <li>Use platform debuggers to clear cache (Facebook Debugger, LinkedIn Inspector)</li>
          <li>Add cache-busting query parameters: <code>?v=2</code></li>
          <li>Wait 24-48 hours for natural cache expiration</li>
          <li>Check CDN cache settings</li>
        </ul>
        <p>
          Learn more: <NuxtLink to="/why-og-images-not-updating" class="font-semibold">Why OG Images Not Updating</NuxtLink>
        </p>

        <h3>4. Preview Not Appearing at All</h3>
        <p>
          <strong>Symptoms:</strong> Only URL shows, no preview card.
        </p>
        <p>
          <strong>Common Causes:</strong>
        </p>
        <ul>
          <li>Missing required tags (og:title, og:description, og:image, og:url)</li>
          <li>Server not responding or timing out</li>
          <li>robots.txt blocking crawlers</li>
          <li>HTTPS certificate issues</li>
        </ul>
        <p>
          <strong>Solutions:</strong>
        </p>
        <ul>
          <li>Verify all required tags are present</li>
          <li>Test server response time (should be under 3 seconds)</li>
          <li>Check robots.txt doesn't block crawlers</li>
          <li>Verify HTTPS certificate is valid</li>
          <li>Test URL accessibility from external networks</li>
        </ul>

        <h2 id="step-by-step-debugging">Step-by-Step Debugging Process</h2>
        <p>
          Follow this systematic approach to debug Open Graph issues:
        </p>

        <h3>Step 1: Verify Tags in HTML Source</h3>
        <ol>
          <li>View page source (right-click → View Page Source)</li>
          <li>Search for "og:title", "og:description", "og:image"</li>
          <li>Verify tags are in the &lt;head&gt; section</li>
          <li>Check for typos or missing quotes</li>
        </ol>

        <h3>Step 2: Test with Preview Tool</h3>
        <ol>
          <li>Use our <NuxtLink to="/" class="font-semibold">Open Graph Preview Tool</NuxtLink></li>
          <li>Enter your URL</li>
          <li>Check which tags are detected</li>
          <li>Verify image loads correctly</li>
        </ol>

        <h3>Step 3: Test with Platform Validators</h3>
        <ol>
          <li>Use Facebook Sharing Debugger</li>
          <li>Use Twitter Card Validator</li>
          <li>Use LinkedIn Post Inspector</li>
          <li>Check for errors or warnings</li>
        </ol>

        <h3>Step 4: Clear Platform Caches</h3>
        <ol>
          <li>Use debugger tools to clear cache</li>
          <li>Wait a few minutes</li>
          <li>Test again</li>
        </ol>

        <h3>Step 5: Verify Image Accessibility</h3>
        <ol>
          <li>Open image URL directly in browser</li>
          <li>Check image loads without authentication</li>
          <li>Verify HTTPS is working</li>
          <li>Check image file size and format</li>
        </ol>

        <h2 id="javascript-issues">JavaScript and Client-Side Rendering Issues</h2>
        <p>
          One of the most common Open Graph problems is tags injected by JavaScript:
        </p>

        <h3>The Problem</h3>
        <p>
          Social media crawlers (Facebook, Twitter, LinkedIn) don't execute JavaScript. If your Open Graph tags are added by JavaScript after the page loads, crawlers won't see them.
        </p>

        <h3>How to Identify</h3>
        <ul>
          <li>View page source - tags are missing</li>
          <li>Inspect element - tags are present</li>
          <li>Preview tool shows no tags</li>
        </ul>

        <h3>Solutions</h3>
        <ul>
          <li><strong>Use SSR/SSG:</strong> Server-Side Rendering or Static Site Generation</li>
          <li><strong>Pre-render:</strong> Generate HTML with tags at build time</li>
          <li><strong>Avoid client-side injection:</strong> Don't add meta tags with JavaScript</li>
        </ul>

        <h3>Framework-Specific Solutions</h3>
        <ul>
          <li><strong>Nuxt 3:</strong> Use <code>useSeoMeta()</code> - it handles SSR automatically</li>
          <li><strong>Next.js:</strong> Use Metadata API or <code>next-seo</code></li>
          <li><strong>React:</strong> Use <code>react-helmet</code> with SSR</li>
          <li><strong>Vue:</strong> Use <code>vue-meta</code> with SSR</li>
        </ul>

        <h2 id="url-issues">URL and Image URL Issues</h2>
        <p>
          Common problems with URLs in Open Graph tags:
        </p>

        <h3>Relative vs Absolute URLs</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ <code>&lt;meta property="og:image" content="/images/og.jpg" /&gt;</code>
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ <code>&lt;meta property="og:image" content="https://example.com/images/og.jpg" /&gt;</code>
        </p>
        <p>
          All Open Graph URLs must be absolute with the full protocol (https://).
        </p>

        <h3>HTTPS Requirements</h3>
        <p>
          Most platforms require HTTPS URLs:
        </p>
        <ul>
          <li>Use HTTPS for all OG image URLs</li>
          <li>Avoid HTTP URLs (may be blocked)</li>
          <li>Ensure SSL certificate is valid</li>
        </ul>

        <h3>Image Accessibility</h3>
        <p>
          Images must be publicly accessible:
        </p>
        <ul>
          <li>No authentication required</li>
          <li>No CORS restrictions</li>
          <li>Accessible from external networks</li>
          <li>Not behind a firewall</li>
        </ul>

        <h2 id="cache-debugging">Cache Debugging</h2>
        <p>
          Platform caching is a major source of Open Graph issues:
        </p>

        <h3>Platform Cache Durations</h3>
        <ul>
          <li><strong>Facebook:</strong> 7-30 days (use Sharing Debugger to clear)</li>
          <li><strong>LinkedIn:</strong> 7-14 days (use Post Inspector to clear)</li>
          <li><strong>Twitter:</strong> 7 days (use Card Validator to clear)</li>
          <li><strong>Slack/Discord:</strong> 24-48 hours (no official clearing tool)</li>
        </ul>

        <h3>How to Clear Caches</h3>
        <ul>
          <li><strong>Facebook:</strong> Use Sharing Debugger → Click "Scrape Again"</li>
          <li><strong>LinkedIn:</strong> Use Post Inspector → Click "Clear cache"</li>
          <li><strong>Twitter:</strong> Use Card Validator → Re-validate URL</li>
          <li><strong>Slack/Discord:</strong> Wait 24-48 hours or use query parameters</li>
        </ul>

        <h2 id="validation-checklist">Open Graph Validation Checklist</h2>
        <p>
          Use this checklist to verify your Open Graph tags:
        </p>

        <ul>
          <li>✅ All required tags present (og:title, og:description, og:image, og:url)</li>
          <li>✅ Tags are in HTML source (not injected by JavaScript)</li>
          <li>✅ Tags are in &lt;head&gt; section</li>
          <li>✅ Image URL is absolute HTTPS URL</li>
          <li>✅ Image is publicly accessible</li>
          <li>✅ Image loads in browser</li>
          <li>✅ Image size is appropriate (1200×630px recommended)</li>
          <li>✅ Image file size is reasonable (&lt;1MB)</li>
          <li>✅ Title and description are appropriate length</li>
          <li>✅ No duplicate tags</li>
          <li>✅ Server responds quickly (&lt;3 seconds)</li>
          <li>✅ HTTPS certificate is valid</li>
          <li>✅ robots.txt doesn't block crawlers</li>
        </ul>

        <h2 id="related-resources">Related Resources</h2>
        <ul>
          <li><NuxtLink to="/why-og-images-not-updating" class="font-semibold">Why OG Images Not Updating</NuxtLink></li>
          <li><NuxtLink to="/guides/og-image-sizes" class="font-semibold">OG Image Size Guide</NuxtLink></li>
          <li><NuxtLink to="/what-is-open-graph" class="font-semibold">What is Open Graph?</NuxtLink></li>
          <li><NuxtLink to="/guides/og-cache-refresh" class="font-semibold">How to Refresh Open Graph Cache</NuxtLink></li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Debug Your Open Graph Tags
        </h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Use our free tool to test and debug your Open Graph tags across all platforms.
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
          Platform-Specific Guides
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            to="/open-graph/facebook"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="text-2xl mb-2">📘</div>
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
            <div class="text-2xl mb-2">💼</div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              LinkedIn
            </h3>
          </NuxtLink>
          <NuxtLink
            to="/open-graph/discord"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="text-2xl mb-2">🎮</div>
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
  title: 'Open Graph Debugging Guide - Fix OG Tag Issues (2025)',
  description: 'Complete guide to debugging Open Graph tags. Learn how to fix missing images, incorrect previews, caching problems, JavaScript issues, and common OG tag errors with step-by-step solutions.',
  keywords: 'open graph debugging, og tag debugging, fix og tags, og image not showing, open graph not working, og preview not updating, debug open graph, og tag validator',
  robots: 'index, follow',
  ogTitle: 'Open Graph Debugging Guide - Fix OG Tag Issues',
  ogDescription: 'Troubleshoot and fix Open Graph tag issues. Learn how to debug missing images, incorrect previews, caching problems, and common OG tag errors.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Web Development'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Open Graph Debugging Guide',
    'description': 'Complete guide to troubleshooting and fixing Open Graph tag issues',
    'url': 'https://ogpreview.app/open-graph-debugging',
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
        'name': 'How do I debug Open Graph tags?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use platform-specific validators (Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector), verify tags are in HTML source (not injected by JavaScript), check that image URLs are absolute HTTPS, and clear platform caches. Use our preview tool to test across all platforms at once.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why is my Open Graph image not showing?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Common causes include relative image URLs (must be absolute HTTPS), images blocked by authentication or CORS, images too large or wrong format, or platform caching. Verify the image URL loads in a browser and use platform debuggers to clear cache.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I fix Open Graph tags not updating?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Platforms cache Open Graph data aggressively. Use platform debuggers to clear cache (Facebook Sharing Debugger, LinkedIn Post Inspector), wait 24-48 hours for natural expiration, or add cache-busting query parameters to your URLs.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why don\'t my Open Graph tags work with JavaScript?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Social media crawlers don\'t execute JavaScript. If your Open Graph tags are added by JavaScript after page load, crawlers won\'t see them. Use Server-Side Rendering (SSR) or Static Site Generation (SSG) to include tags in the initial HTML.'
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
        'name': 'Open Graph Debugging Guide',
        'item': 'https://ogpreview.app/open-graph-debugging'
      }
    ]
  }
])
</script>


