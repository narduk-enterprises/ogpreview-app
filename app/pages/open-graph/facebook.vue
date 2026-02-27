<template>
  <LayoutsArticleLayout
title="Facebook Open Graph Preview Guide"
    description="Master Facebook's Open Graph implementation. Learn the exact image dimensions, required meta tags, and best practices for perfect Facebook link previews that drive engagement."
    :back-link="{ to: '/', label: 'Back to Tool' }"
    :metadata="{ date: 'Updated December 2025', readTime: '8 min read' }">
    <template #cta>
      <ContentContentCTA
title="Test Your Facebook Link Previews"
        description="Preview how your links will appear on Facebook and all other platforms instantly."
        button-text="Try the Free Preview Tool" button-to="/" variant="blue" />
    </template>

    <template #related>
      <div class="not-prose mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Other Platform Guides
        </h2>
        <ContentPlatformGrid :platforms="relatedPlatforms" />
      </div>
    </template>

    <ContentContentCallout variant="info" title="Quick Answer" icon="i-heroicons-light-bulb">
      Facebook uses Open Graph protocol with recommended image size of 1200×630px (1.91:1 aspect ratio). Minimum size is
      200×200px. Always use absolute HTTPS URLs and include
      <ContentContentInlineCode code="og:title" />,
      <ContentContentInlineCode code="og:description" />,
      <ContentContentInlineCode code="og:image" />, and
      <ContentContentInlineCode code="og:url" /> tags.
    </ContentContentCallout>

    <h2 id="facebook-og-overview">How Facebook Uses Open Graph Tags</h2>
    <p>
      Facebook was the original creator of the Open Graph protocol in 2010, and it remains the platform with the most
      comprehensive OG tag support. Facebook uses OG tags to generate rich link previews in posts, comments, and
      messages.
    </p>

    <h3>Where Facebook Shows Open Graph Previews</h3>
    <ul>
      <li><strong>News Feed</strong> - When users share links in posts</li>
      <li><strong>Comments</strong> - Link previews in comment threads</li>
      <li><strong>Messages</strong> - Preview cards in Facebook Messenger</li>
      <li><strong>Groups</strong> - Link previews in group posts</li>
      <li><strong>Pages</strong> - When pages share content</li>
    </ul>

    <ContentPlatformSection
platform="Facebook"
      recommended-size="1200×630px (1.91:1 aspect ratio)" minimum-size="200×200px" supports="JPG, PNG, WebP, GIF"
      notes="Maximum file size: 8MB (but aim for under 1MB for faster loading). Image ratio: Between 1.91:1 and 1:1 (square)." />

    <h3>Image Best Practices for Facebook</h3>
    <ul>
      <li>Use high-quality images with good contrast</li>
      <li>Keep text large and readable (minimum 40px font size)</li>
      <li>Leave a 100px safe zone around edges (Facebook may crop slightly)</li>
      <li>Include your brand logo or visual identity</li>
      <li>Test on both desktop and mobile views</li>
      <li>Avoid placing important content in the bottom 20% (where Facebook shows the domain)</li>
    </ul>

    <h2 id="required-facebook-tags">Required Facebook Open Graph Tags</h2>
    <p>
      Facebook requires these four essential Open Graph tags for proper link previews:
    </p>

    <ContentContentCodeBlock :code="requiredTagsCode" language="html" />

    <h3>Recommended Additional Tags</h3>
    <ul>
      <li>
        <ContentContentInlineCode code="og:site_name" /> - Your site name (appears below the title)
      </li>
      <li>
        <ContentContentInlineCode code="og:locale" /> - Language locale (e.g., en_US, es_ES)
      </li>
      <li>
        <ContentContentInlineCode code="og:image:width" /> and
        <ContentContentInlineCode code="og:image:height" /> - Image dimensions for faster rendering
      </li>
      <li>
        <ContentContentInlineCode code="og:image:alt" /> - Alt text for accessibility
      </li>
    </ul>

    <h3>Article-Specific Tags</h3>
    <p>
      For blog posts and articles, include these additional tags:
    </p>
    <ul>
      <li>
        <ContentContentInlineCode code="og:type" /> - Set to "article"
      </li>
      <li>
        <ContentContentInlineCode code="article:published_time" /> - Publication date
      </li>
      <li>
        <ContentContentInlineCode code="article:author" /> - Author information
      </li>
      <li>
        <ContentContentInlineCode code="article:section" /> - Article category
      </li>
    </ul>

    <h2 id="common-mistakes">Common Facebook Open Graph Mistakes</h2>

    <h3>1. Relative Image URLs</h3>
    <p class="text-red-600 dark:text-red-400">
      ❌
      <ContentContentInlineCode code="&lt;meta property=&quot;og:image&quot; content=&quot;/images/og.jpg&quot; /&gt;" />
    </p>
    <p class="text-green-600 dark:text-green-400">
      ✅
      <ContentContentInlineCode code="&lt;meta property=&quot;og:image&quot; content=&quot;https://example.com/images/og.jpg&quot; /&gt;" />
    </p>
    <p>
      Facebook requires absolute URLs with the full protocol. Relative paths will not work.
    </p>

    <h3>2. Images That Are Too Small</h3>
    <p>
      While Facebook accepts images as small as 200×200px, they will appear pixelated and unprofessional:
    </p>
    <ul>
      <li>Minimum recommended: 600×315px</li>
      <li>Optimal: 1200×630px</li>
      <li>Always use high-resolution images for crisp display</li>
    </ul>

    <h3>3. Missing Image Dimensions</h3>
    <p>
      Including image dimensions helps Facebook render previews faster:
    </p>
    <ContentContentCodeBlock :code="imageDimensionsCode" language="html" />

    <h3>4. Not Clearing Facebook's Cache</h3>
    <p>
      Facebook aggressively caches Open Graph data. After updating your tags:
    </p>
    <ol>
      <li>
Use the <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing
          Debugger</a>
</li>
      <li>Enter your URL and click "Scrape Again"</li>
      <li>This forces Facebook to refresh the cached data</li>
    </ol>

    <h3>5. Client-Side Meta Tags</h3>
    <p>
      Facebook's crawler doesn't execute JavaScript. Meta tags must be in the initial HTML response:
    </p>
    <ul>
      <li>Use Server-Side Rendering (SSR) or Static Site Generation (SSG)</li>
      <li>Avoid injecting meta tags with JavaScript after page load</li>
      <li>Test by viewing page source (not rendered HTML)</li>
    </ul>

    <h2 id="facebook-debugging">Debugging Facebook Link Previews</h2>
    <p>
      Facebook provides powerful debugging tools to test and fix your Open Graph tags:
    </p>

    <h3>Facebook Sharing Debugger</h3>
    <p>
      The <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing
        Debugger</a> is the official tool for:
    </p>
    <ul>
      <li>Previewing how your link will appear on Facebook</li>
      <li>Viewing all detected Open Graph tags</li>
      <li>Clearing Facebook's cache for your URL</li>
      <li>Identifying errors and warnings</li>
    </ul>

    <h3>Common Debugger Warnings</h3>
    <ul>
      <li><strong>"Image too small"</strong> - Use at least 600×315px</li>
      <li><strong>"Missing og:image"</strong> - Add the required image tag</li>
      <li><strong>"Cached version"</strong> - Click "Scrape Again" to refresh</li>
      <li><strong>"Invalid URL"</strong> - Ensure image URL is absolute and accessible</li>
    </ul>

    <h2 id="facebook-engagement">Optimizing for Facebook Engagement</h2>
    <p>
      Well-optimized Open Graph tags can significantly improve engagement:
    </p>

    <h3>Title Best Practices</h3>
    <ul>
      <li>Keep titles between 40-60 characters</li>
      <li>Make them compelling and action-oriented</li>
      <li>Include relevant keywords naturally</li>
      <li>Avoid clickbait - Facebook may penalize misleading titles</li>
    </ul>

    <h3>Description Best Practices</h3>
    <ul>
      <li>Optimal length: 150-160 characters</li>
      <li>Write clear, benefit-focused descriptions</li>
      <li>Include a call-to-action when appropriate</li>
      <li>Use active voice and engaging language</li>
    </ul>

    <h3>Image Best Practices</h3>
    <ul>
      <li>Use images that tell a story</li>
      <li>Include faces or recognizable elements</li>
      <li>Use bright, contrasting colors</li>
      <li>Test how images appear in both light and dark mode</li>
    </ul>

    <h2 id="implementation-examples">Implementation Examples</h2>

    <h3>Nuxt 3</h3>
    <ContentContentCodeBlock :code="nuxtExampleCode" language="javascript" />

    <h3>Next.js 14+</h3>
    <ContentContentCodeBlock :code="nextjsExampleCode" language="javascript" />

    <h2 id="related-resources">Related Resources</h2>
    <ul>
      <li>
        <NuxtLink to="/open-graph/twitter" class="font-semibold">Twitter Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph/linkedin" class="font-semibold">LinkedIn Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/facebook-link-preview" class="font-semibold">Complete Facebook Link Preview Guide
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/og-image-size-guide" class="font-semibold">OG Image Size Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/open-graph-debugging" class="font-semibold">Open Graph Debugging Guide</NuxtLink>
      </li>
      <li>
<a href="https://developers.facebook.com/docs/sharing/webmasters" target="_blank" rel="noopener">Facebook Open
          Graph Documentation</a>
</li>
    </ul>
  </LayoutsArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Facebook Open Graph Preview Guide - Optimize Your Facebook Link Previews',
  description: 'Complete guide to Facebook Open Graph optimization. Learn Facebook-specific image dimensions (1200×630px), required meta tags, debugging tools, and best practices for perfect link previews.',
  keywords: 'facebook og tags, facebook open graph, facebook link preview, facebook sharing debugger, facebook og image size, facebook meta tags, facebook card preview',
  robots: 'index, follow',
  ogTitle: 'Facebook Open Graph Preview Guide - Optimize Your Facebook Link Previews',
  ogDescription: 'Master Facebook Open Graph tags for perfect link previews. Learn image dimensions, required meta tags, debugging techniques, and avoid common mistakes.',
  ogType: 'article',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleModifiedTime: '2025-12-16T00:00:00Z',
  articleAuthor: ['ogpreview.app'],
  articleSection: 'Social Media Optimization'
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Facebook Open Graph Preview Guide',
    'description': 'Complete guide to optimizing Open Graph tags for perfect link previews on Facebook',
    'url': 'https://ogpreview.app/open-graph/facebook',
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
        'name': 'What image size should I use for Facebook Open Graph?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Facebook recommends 1200×630px (1.91:1 aspect ratio) for optimal display. Minimum size is 200×200px, but 600×315px or larger is recommended for best quality.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I clear Facebook\'s cache for my Open Graph tags?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the Facebook Sharing Debugger (developers.facebook.com/tools/debug/) to scrape your URL again. This forces Facebook to refresh the cached Open Graph data.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the required Open Graph tags for Facebook?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Facebook requires four essential tags: og:title, og:description, og:image, and og:url. Also include og:type (usually "website" or "article") for best results.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why isn\'t my Facebook link preview updating?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Facebook caches Open Graph data aggressively. After updating your tags, use the Facebook Sharing Debugger to force a cache refresh. Also ensure your image URLs are absolute (https://) and accessible.'
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
        'name': 'Facebook Open Graph Guide',
        'item': 'https://ogpreview.app/open-graph/facebook'
      }
    ]
  }
])

const requiredTagsCode = `<!-- Essential Open Graph Tags for Facebook -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />`

const imageDimensionsCode = `<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`

const nuxtExampleCode = `useSeoMeta({
  ogTitle: 'Your Page Title',
  ogDescription: 'Your compelling description',
  ogImage: 'https://example.com/og-image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'website',
  ogSiteName: 'Your Site Name',
  ogLocale: 'en_US',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Descriptive alt text'
})`

const nextjsExampleCode = `export const metadata = {
  openGraph: {
    title: 'Your Page Title',
    description: 'Your compelling description',
    images: [{
      url: 'https://example.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Descriptive alt text'
    }],
    url: 'https://example.com/page',
    siteName: 'Your Site Name',
    locale: 'en_US',
    type: 'website'
  }
}`

const relatedPlatforms = [
  {
    name: 'Twitter',
    to: '/open-graph/twitter',
    icon: '𝕏'
  },
  {
    name: 'LinkedIn',
    to: '/open-graph/linkedin',
    icon: '💼'
  },
  {
    name: 'Discord',
    to: '/open-graph/discord',
    icon: '🎮'
  },
  {
    name: 'Slack',
    to: '/open-graph/slack',
    icon: '💬'
  }
]
</script>
