<template>
  <LayoutsArticleLayout
title="Facebook Link Preview Optimization Guide"
    description="Learn how to create perfect Facebook link previews with the right Open Graph tags, image dimensions, and best practices."
    platform-icon="Facebook" :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '8 min read' }">
    <template #cta>
      <ContentContentCTA
title="Test Your Facebook Link Preview"
        description="See exactly how your Open Graph tags will appear on Facebook—plus Twitter, LinkedIn, Slack, and more."
        button-text="Try the Free Preview Tool" button-to="/" />
    </template>

    <h2 id="overview">How Facebook Link Previews Work</h2>
    <p>
      When you share a link on Facebook, Meta's crawler (formerly Facebook Bot) fetches your page's Open Graph tags to
      generate a rich preview card. This card includes your title, description, image, and domain—transforming a plain
      URL
      into an engaging visual element that can dramatically increase click-through rates.
    </p>

    <ContentContentCallout variant="info" title="Preview Your Facebook Link" icon="i-heroicons-light-bulb">
      Use our <NuxtLink
to="/"
        class="font-semibold underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Open Graph
        Preview
        Tool</NuxtLink> to see exactly how your link will appear on Facebook before publishing.
    </ContentContentCallout>

    <h2 id="required-tags">Required Open Graph Tags for Facebook</h2>
    <p>
      Facebook requires these four core Open Graph tags for optimal link previews:
    </p>

    <ContentContentCodeBlock :code="requiredTagsCode" language="html" />

    <h2 id="image-requirements">Facebook Image Requirements</h2>
    <p>
      Your Open Graph image is the most important element for Facebook engagement. Here are Meta's official
      specifications:
    </p>

    <h3>Recommended Dimensions</h3>
    <ul>
      <li><strong>Optimal size:</strong> 1200×630 pixels (1.91:1 aspect ratio)</li>
      <li><strong>Minimum size:</strong> 200×200 pixels (Facebook will reject smaller images)</li>
      <li><strong>Maximum file size:</strong> 8MB</li>
      <li><strong>Supported formats:</strong> JPG, PNG, WebP, GIF</li>
    </ul>

    <h3>Why 1200×630px?</h3>
    <p>
      This dimension ensures your image displays perfectly in Facebook's large link preview format. Smaller images will
      be
      upscaled (losing quality), while larger images will be cropped or compressed.
    </p>

    <ContentContentCallout variant="warning" title="Common Image Mistakes" icon="i-heroicons-exclamation-triangle">
      <ul class="space-y-2 text-sm">
        <li>❌ Using images under 200×200px (Facebook rejects these)</li>
        <li>❌ Relative URLs like <code>/images/og.jpg</code></li>
        <li>❌ HTTP URLs (must be HTTPS)</li>
        <li>❌ Images behind authentication or paywalls</li>
        <li>❌ Slow-loading images (timeout after 10 seconds)</li>
      </ul>
    </ContentContentCallout>

    <h2 id="title-description">Title & Description Best Practices</h2>

    <h3>Title Optimization</h3>
    <ul>
      <li><strong>Length:</strong> 60-90 characters (longer titles get truncated)</li>
      <li><strong>Front-load keywords:</strong> Put important words at the beginning</li>
      <li><strong>Be specific:</strong> Generic titles get ignored</li>
      <li><strong>Avoid clickbait:</strong> Facebook's algorithm penalizes misleading content</li>
    </ul>

    <h3>Description Optimization</h3>
    <ul>
      <li><strong>Length:</strong> 150-160 characters for desktop, 110 for mobile</li>
      <li><strong>Add value:</strong> Explain what users will get by clicking</li>
      <li><strong>Include a CTA:</strong> "Learn how to...", "Discover...", "Get started..."</li>
      <li><strong>Avoid duplication:</strong> Don't repeat your title verbatim</li>
    </ul>

    <h3>Example: Good vs. Bad</h3>
    <div class="grid md:grid-cols-2 gap-4 not-prose my-6">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="font-bold text-red-900 dark:text-red-100 mb-2">❌ Bad Example</p>
        <p class="text-sm text-red-800 dark:text-red-200">
          <strong>Title:</strong> "Blog Post"<br>
          <strong>Description:</strong> "Read our latest blog post about stuff"
        </p>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p class="font-bold text-green-900 dark:text-green-100 mb-2">✅ Good Example</p>
        <p class="text-sm text-green-800 dark:text-green-200">
          <strong>Title:</strong> "10 Proven Facebook Ad Strategies for 2025"<br>
          <strong>Description:</strong> "Learn data-driven tactics that increased our ROI by 340%. Step-by-step guide
          with
          real examples."
        </p>
      </div>
    </div>

    <h2 id="debugging">Debugging Facebook Link Previews</h2>
    <p>
      Facebook caches Open Graph data aggressively (sometimes for months). If your preview doesn't update, use these
      tools:
    </p>

    <h3>Facebook Sharing Debugger</h3>
    <p>
      The official <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook
        Sharing
        Debugger</a> lets you:
    </p>
    <ul>
      <li>See how Facebook's crawler reads your OG tags</li>
      <li>Force a cache refresh with the "Scrape Again" button</li>
      <li>Identify errors and warnings</li>
      <li>View how your preview will appear</li>
    </ul>

    <h3>Common Error Messages</h3>
    <table>
      <thead>
        <tr>
          <th>Error</th>
          <th>Solution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>"Could not retrieve data"</td>
          <td>Check that your URL is publicly accessible</td>
        </tr>
        <tr>
          <td>"Image too small"</td>
          <td>Use images at least 200×200px</td>
        </tr>
        <tr>
          <td>"Missing required property"</td>
          <td>Add og:title, og:description, og:image, og:url</td>
        </tr>
        <tr>
          <td>"Redirect warning"</td>
          <td>Use canonical URL without redirects</td>
        </tr>
      </tbody>
    </table>

    <h2 id="advanced-features">Advanced Facebook OG Features</h2>

    <h3>Video Previews</h3>
    <p>
      Facebook supports rich video previews with auto-play:
    </p>
    <ContentContentCodeBlock :code="videoTagsCode" language="html" />

    <h3>Article-Specific Tags</h3>
    <p>
      For blog posts and news articles, use <code>og:type="article"</code> with additional metadata:
    </p>
    <ContentContentCodeBlock :code="articleTagsCode" language="html" />

    <h2 id="testing-workflow">Facebook Preview Testing Workflow</h2>
    <ol>
      <li><strong>Implement tags</strong> using server-side rendering (not client-side JavaScript)</li>
      <li>
<strong>Test locally</strong> with our <NuxtLink to="/" class="font-semibold">preview tool</NuxtLink>
      </li>
      <li><strong>Deploy to production</strong> with HTTPS enabled</li>
      <li><strong>Validate with Facebook Debugger</strong> - click "Scrape Again" to force refresh</li>
      <li><strong>Test real share</strong> - Share on your personal profile (friends-only) to verify</li>
      <li><strong>Monitor engagement</strong> - Track CTR in Facebook Insights</li>
    </ol>

    <h2 id="mobile-considerations">Mobile Facebook Previews</h2>
    <p>
      Over 90% of Facebook users access it on mobile. Keep these mobile-specific considerations in mind:
    </p>
    <ul>
      <li><strong>Shorter descriptions:</strong> Only ~110 characters visible on mobile</li>
      <li><strong>Larger text in images:</strong> Minimum 40px font size for readability</li>
      <li><strong>High contrast:</strong> Mobile screens have varying brightness</li>
      <li><strong>Test on device:</strong> Always verify on an actual phone</li>
    </ul>

    <h2 id="performance">Performance Optimization</h2>
    <p>
      Facebook's crawler has a 10-second timeout. Optimize for fast OG tag delivery:
    </p>
    <ul>
      <li>Use server-side rendering (SSR) or static generation (SSG)</li>
      <li>Place OG tags in <code>&lt;head&gt;</code> before any JavaScript</li>
      <li>Host images on a fast CDN</li>
      <li>Use WebP format with JPG fallback</li>
      <li>Avoid redirects on OG image URLs</li>
    </ul>

    <h2 id="resources">Additional Resources</h2>
    <ul>
      <li>
<a href="https://developers.facebook.com/docs/sharing/webmasters" target="_blank" rel="noopener">Facebook
          Sharing
          for Webmasters</a>
</li>
      <li>
<a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing
          Debugger</a>
</li>
      <li>
        <NuxtLink to="/guides/open-graph-preview">Complete Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/og-image-sizes">OG Image Size Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/og-cache-refresh">Cache Refresh Guide</NuxtLink>
      </li>
    </ul>
  </LayoutsArticleLayout>
</template>

<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Facebook Link Preview Optimization Guide - Perfect OG Tags for FB Shares',
  description: 'Learn how to create perfect Facebook link previews with Open Graph tags. Includes image requirements (1200×630px), title/description best practices, and debugging tips.',
  keywords: 'facebook link preview, facebook og tags, facebook preview optimization, facebook sharing debugger, facebook image size, og:image facebook, facebook preview tool',
  robots: 'index, follow',
  ogTitle: 'Facebook Link Preview Optimization Guide',
  ogDescription: 'Master Facebook link previews with the right OG tags, image sizes, and best practices. Includes debugging and testing workflows.',
  ogType: 'article'
})

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'Facebook Link Preview Optimization Guide',
    'description': 'Complete guide to creating perfect Facebook link previews with Open Graph tags',
    'author': {
      '@type': 'Organization',
      'name': 'ogpreview.app'
    },
    'datePublished': '2025-12-16',
    'articleSection': 'Social Media Marketing'
  }
])

const requiredTagsCode = `<head>
  <!-- Required Facebook OG Tags -->
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="Compelling description that drives clicks" />
  <meta property="og:image" content="https://example.com/facebook-og.jpg" />
  <meta property="og:url" content="https://example.com/page" />

  <!-- Recommended -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Your Site Name" />
  <meta property="og:locale" content="en_US" />

  <!-- Image Dimensions -->
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Descriptive alt text" />
</head>`

const videoTagsCode = `<meta property="og:video" content="https://example.com/video.mp4" />
<meta property="og:video:type" content="video/mp4" />
<meta property="og:video:width" content="1280" />
<meta property="og:video:height" content="720" />`

const articleTagsCode = `<meta property="og:type" content="article" />
<meta property="article:published_time" content="2025-12-16T00:00:00Z" />
<meta property="article:author" content="Author Name" />
<meta property="article:section" content="Technology" />
<meta property="article:tag" content="Facebook, Open Graph, SEO" />`
</script>
