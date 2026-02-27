<template>
  <ArticleLayout
title="Open Graph Preview: Complete Guide for Developers & Marketers"
    description="Everything you need to know about Open Graph protocol, social media previews, and optimizing link cards for maximum engagement."
    :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '15 min read' }">
    <template #cta>
      <ContentCTA
title="Ready to preview your Open Graph tags?"
        description="Test how your links will appear on Facebook, Twitter, LinkedIn, Slack, Discord, and WhatsApp—all in one place."
        button-text="Try the Free Preview Tool" button-to="/" variant="blue" />
    </template>

    <template #related>
      <div class="not-prose mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Related Guides
        </h2>
        <PlatformGrid :platforms="relatedGuides" />
      </div>
    </template>

    <h2 id="what-is-open-graph">What is Open Graph?</h2>
    <p>
      The <strong>Open Graph protocol</strong> was created by Facebook in 2010 to standardize how web pages are
      represented
      when shared on social media. Today, it's used by virtually every major platform including Facebook, Twitter (X),
      LinkedIn, Slack, Discord, WhatsApp, Telegram, and iMessage.
    </p>
    <p>
      Open Graph tags are HTML
      <ContentInlineCode code="&lt;meta&gt;" /> elements placed in the
      <ContentInlineCode code="&lt;head&gt;" /> section of your web pages. They control the title, description, image,
      and
      other metadata that appears when someone shares your URL.
    </p>

    <h3>Basic Example</h3>
    <ContentCodeBlock :code="basicExampleCode" language="html" />

    <ContentCallout variant="info" title="Test Your Open Graph Tags" icon="i-heroicons-light-bulb">
      Use our <NuxtLink to="/" class="font-semibold underline">Open Graph Preview Tool</NuxtLink> to instantly see how
      your
      tags will appear across all major platforms.
    </ContentCallout>

    <h2 id="why-previews-break">Why Open Graph Previews Break</h2>
    <p>
      The most common frustrations developers face with Open Graph:
    </p>
    <ul>
      <li><strong>Aggressive caching</strong> - Platforms cache OG tags for days or weeks</li>
      <li>
<strong>Missing tags</strong> - Forgetting required properties like
        <ContentInlineCode code="og:image" />
      </li>
      <li><strong>Wrong image sizes</strong> - Images that are too small, too large, or the wrong aspect ratio</li>
      <li><strong>Broken image URLs</strong> - Relative paths, localhost URLs, or blocked resources</li>
      <li><strong>Client-side rendering issues</strong> - SPAs that inject meta tags after the page loads</li>
    </ul>

    <h2 id="platform-differences">Platform-Specific Differences</h2>
    <p>
      While Open Graph is a standard, each platform implements it slightly differently:
    </p>

    <PlatformSection
platform="Facebook" recommended-size="1200×630px" minimum-size="200×200px"
      supports="Video tags (og:video)" debugger="Facebook Sharing Debugger"
      debugger-url="https://developers.facebook.com/tools/debug/" />

    <PlatformSection
platform="Twitter" recommended-size="1200×675px (summary_large_image)"
      supports="Twitter-specific twitter:card tags" debugger="Twitter Card Validator"
      debugger-url="https://cards-dev.twitter.com/validator">
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Falls back to OG tags but prefers Twitter-specific
        <ContentInlineCode code="twitter:card" /> tags. Learn more in our <NuxtLink
to="/guides/twitter-card-preview"
          class="font-semibold">Twitter Card Guide</NuxtLink>.
      </p>
    </PlatformSection>

    <PlatformSection
platform="LinkedIn" recommended-size="1200×627px"
      supports="Professional context - focus on business value" debugger="LinkedIn Post Inspector"
      debugger-url="https://www.linkedin.com/post-inspector/">
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Read our <NuxtLink to="/guides/linkedin-link-preview" class="font-semibold">LinkedIn optimization guide
        </NuxtLink>.
      </p>
    </PlatformSection>

    <PlatformSection
platform="Slack" supports="Standard OG protocol"
      notes="Discord shows color themes from theme-color meta tag. Both platforms cache aggressively (24+ hours)." />

    <h2 id="required-tags">Required Open Graph Tags</h2>
    <p>
      At minimum, you need these four tags for proper previews:
    </p>

    <table>
      <thead>
        <tr>
          <th>Tag</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <ContentInlineCode code="og:title" />
          </td>
          <td>The title of your content</td>
          <td>60-70 characters max</td>
        </tr>
        <tr>
          <td>
            <ContentInlineCode code="og:description" />
          </td>
          <td>A brief description</td>
          <td>150-160 characters max</td>
        </tr>
        <tr>
          <td>
            <ContentInlineCode code="og:image" />
          </td>
          <td>URL to preview image</td>
          <td>Must be absolute HTTPS URL</td>
        </tr>
        <tr>
          <td>
            <ContentInlineCode code="og:url" />
          </td>
          <td>Canonical URL of the page</td>
          <td>Full URL with protocol</td>
        </tr>
      </tbody>
    </table>

    <h2 id="image-best-practices">Open Graph Image Best Practices</h2>
    <p>
      Your OG image is the most important visual element. Here's how to optimize it:
    </p>

    <h3>Dimensions & Size</h3>
    <ul>
      <li><strong>Recommended:</strong> 1200×630px (1.91:1 aspect ratio)</li>
      <li><strong>Minimum:</strong> 600×315px</li>
      <li><strong>File size:</strong> Under 1MB (ideally under 300KB)</li>
      <li><strong>Format:</strong> JPG, PNG, or WebP</li>
    </ul>

    <h3>Design Tips</h3>
    <ul>
      <li>Keep text large and readable (min 40px font size)</li>
      <li>Use high contrast colors</li>
      <li>Avoid placing important content near edges (safe zone: 100px margin)</li>
      <li>Include your brand/logo</li>
      <li>Test on mobile - many previews are viewed on phones</li>
    </ul>

    <p>
      See our complete <NuxtLink to="/guides/og-image-sizes" class="font-semibold">OG Image Size Guide</NuxtLink> for
      platform-specific recommendations.
    </p>

    <h2 id="cache-busting">Cache Busting & Debugging</h2>
    <p>
      After updating your OG tags, social platforms often show old cached versions. Here's how to force a refresh:
    </p>

    <h3>Debug Tools</h3>
    <ul>
      <li>
<a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing
          Debugger</a> - Also clears cache
</li>
      <li>
<a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a>
      </li>
      <li>
<a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">LinkedIn Post Inspector</a>
      </li>
      <li><a href="/" class="font-semibold">Our Open Graph Preview Tool</a> - Test all platforms at once</li>
    </ul>

    <p>
      Learn detailed cache refresh techniques in our <NuxtLink to="/guides/og-cache-refresh" class="font-semibold">Cache
        Refresh Guide</NuxtLink>.
    </p>

    <h2 id="common-mistakes">Common Open Graph Mistakes</h2>

    <h3>1. Using Relative Image URLs</h3>
    <p class="text-red-600 dark:text-red-400">
      ❌
      <ContentInlineCode code="&lt;meta property=&quot;og:image&quot; content=&quot;/images/og.jpg&quot; /&gt;" />
    </p>
    <p class="text-green-600 dark:text-green-400">
      ✅
      <ContentInlineCode code="&lt;meta property=&quot;og:image&quot; content=&quot;https://example.com/images/og.jpg&quot; /&gt;" />
    </p>

    <h3>2. Forgetting Image Dimensions</h3>
    <p>
      Always include width and height for better performance:
    </p>
    <ContentCodeBlock :code="imageDimensionsCode" language="html" />

    <h3>3. Client-Side Meta Tags (React/Vue/Nuxt)</h3>
    <p>
      Social media crawlers don't execute JavaScript! Use SSR (Server-Side Rendering) or static generation:
    </p>
    <ul>
      <li>
<strong>Next.js:</strong> Use the Metadata API or
        <ContentInlineCode code="next-seo" />
      </li>
      <li>
<strong>Nuxt:</strong> Use
        <ContentInlineCode code="useSeoMeta()" /> composable
      </li>
      <li>
<strong>Gatsby:</strong> Use
        <ContentInlineCode code="react-helmet" />
      </li>
    </ul>

    <h3>4. Not Testing Before Launch</h3>
    <p>
      Always preview your tags before publishing. Use our <NuxtLink to="/" class="font-semibold">free preview tool
      </NuxtLink> to catch issues early.
    </p>

    <h2 id="implementation-examples">Framework-Specific Implementation</h2>

    <h3>Nuxt 3</h3>
    <ContentCodeBlock :code="nuxtExampleCode" language="javascript" />

    <h3>Next.js 14+</h3>
    <ContentCodeBlock :code="nextjsExampleCode" language="javascript" />

    <h3>React + Helmet</h3>
    <ContentCodeBlock :code="reactHelmetCode" language="javascript" />

    <h2 id="testing-workflow">Complete Testing Workflow</h2>
    <ol>
      <li><strong>Implement tags</strong> in your framework using SSR/SSG</li>
      <li>
<strong>Preview locally</strong> using our <NuxtLink to="/" class="font-semibold">Open Graph Preview Tool
        </NuxtLink>
      </li>
      <li><strong>Deploy to staging</strong> with HTTPS enabled</li>
      <li><strong>Test with official debuggers</strong> (Facebook, Twitter, LinkedIn)</li>
      <li><strong>Monitor real shares</strong> - check actual social posts</li>
      <li><strong>Iterate</strong> based on engagement metrics (CTR, shares, etc.)</li>
    </ol>

    <h2 id="resources">Additional Resources</h2>
    <ul>
      <li><a href="https://ogp.me/" target="_blank" rel="noopener">Official Open Graph Protocol Specification</a></li>
      <li>
        <NuxtLink to="/what-is-open-graph" class="font-semibold">What is Open Graph? - Complete Beginner's Guide
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph/facebook" class="font-semibold">Facebook Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph/twitter" class="font-semibold">Twitter Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph/linkedin" class="font-semibold">LinkedIn Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph/discord" class="font-semibold">Discord Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph/slack" class="font-semibold">Slack Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/facebook-link-preview">Facebook Link Preview Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/twitter-card-preview">Twitter Card Preview Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/linkedin-link-preview">LinkedIn Preview Optimization</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/og-image-size-guide" class="font-semibold">Complete OG Image Size Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph-debugging" class="font-semibold">Open Graph Debugging Guide</NuxtLink>
      </li>
    </ul>
  </ArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Open Graph Preview: Complete Guide for Developers & Marketers (2025)',
  description: 'Learn everything about Open Graph protocol, social media previews, and link optimization. Includes Facebook, Twitter, LinkedIn best practices, image sizes, and debugging tips.',
  keywords: 'open graph preview, og tags guide, social media preview tutorial, facebook preview optimization, twitter card guide, linkedin og tags, open graph protocol, og image best practices',
  robots: 'index, follow',
  ogTitle: 'Open Graph Preview: Complete Guide for Developers & Marketers',
  ogDescription: 'Master Open Graph tags and social media previews. Learn platform differences, image requirements, cache busting, and common mistakes to avoid.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Web Development'
})

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'Open Graph Preview: Complete Guide for Developers & Marketers',
    'description': 'Everything you need to know about Open Graph protocol, social media previews, and optimizing link cards for maximum engagement',
    'author': {
      '@type': 'Organization',
      'name': 'ogpreview.app'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'ogpreview.app'
    },
    'datePublished': '2025-12-16',
    'dateModified': '2025-12-16',
    'articleSection': 'Web Development',
    'keywords': 'open graph, og tags, social media preview, facebook, twitter, linkedin'
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
        'name': 'Guides',
        'item': 'https://ogpreview.app/guides'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Open Graph Preview Guide',
        'item': 'https://ogpreview.app/guides/open-graph-preview'
      }
    ]
  }
])

const basicExampleCode = `<head>
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="A compelling description" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="website" />
</head>`

const imageDimensionsCode = `<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`

const nuxtExampleCode = `// pages/index.vue
useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your description',
  ogImage: 'https://example.com/og-image.jpg',
  ogUrl: 'https://example.com',
  twitterCard: 'summary_large_image'
})`

const nextjsExampleCode = `// app/page.tsx
export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your description',
    images: ['https://example.com/og-image.jpg'],
    url: 'https://example.com'
  }
}`

const reactHelmetCode = `import { Helmet } from 'react-helmet-async'

<Helmet>
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="https://example.com/og-image.jpg" />
</Helmet>`

const relatedGuides = [
  {
    name: 'Facebook Link Preview',
    to: '/guides/facebook-link-preview',
    icon: '📘'
  },
  {
    name: 'Twitter Card Preview',
    to: '/guides/twitter-card-preview',
    icon: '𝕏'
  },
  {
    name: 'OG Image Sizes',
    to: '/guides/og-image-sizes',
    icon: '🖼️'
  }
]
</script>
