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
          LinkedIn Open Graph Preview Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Optimize your Open Graph tags for LinkedIn's professional network. Learn LinkedIn-specific requirements, image dimensions, and best practices for B2B link previews that drive engagement.
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
            LinkedIn uses Open Graph protocol with recommended image size of 1200×627px (1.91:1 aspect ratio). Focus on professional, business-oriented descriptions. Use the LinkedIn Post Inspector to test and clear cache.
          </p>
        </div>

        <h2 id="linkedin-og-overview">How LinkedIn Uses Open Graph Tags</h2>
        <p>
          LinkedIn is a professional networking platform, and its Open Graph implementation reflects this context. LinkedIn uses OG tags to create rich link previews in posts, articles, and messages, with a focus on professional and business content.
        </p>

        <h3>Where LinkedIn Shows Open Graph Previews</h3>
        <ul>
          <li><strong>Feed Posts</strong> - When users share links in their feed</li>
          <li><strong>Articles</strong> - Link previews in LinkedIn articles</li>
          <li><strong>Messages</strong> - Preview cards in LinkedIn messaging</li>
          <li><strong>Company Pages</strong> - When companies share content</li>
          <li><strong>Groups</strong> - Link previews in professional groups</li>
        </ul>

        <h2 id="linkedin-image-dimensions">LinkedIn Image Dimensions & Requirements</h2>
        <p>
          LinkedIn has specific image requirements optimized for professional content:
        </p>

        <h3>Recommended Image Size</h3>
        <ul>
          <li><strong>Optimal size:</strong> 1200×627px (1.91:1 aspect ratio)</li>
          <li><strong>Minimum size:</strong> 1200×627px (LinkedIn prefers this exact size)</li>
          <li><strong>Maximum file size:</strong> 5MB (but aim for under 1MB)</li>
          <li><strong>Format:</strong> JPG, PNG, or GIF</li>
          <li><strong>Image ratio:</strong> 1.91:1 (same as Facebook)</li>
        </ul>

        <h3>Image Best Practices for LinkedIn</h3>
        <ul>
          <li>Use professional, high-quality images</li>
          <li>Include business or industry-relevant visuals</li>
          <li>Keep text clear and professional</li>
          <li>Use brand colors that convey trust and professionalism</li>
          <li>Avoid overly casual or flashy designs</li>
          <li>Test on both desktop and mobile LinkedIn interfaces</li>
        </ul>

        <h2 id="required-linkedin-tags">Required LinkedIn Open Graph Tags</h2>
        <p>
          LinkedIn requires these essential Open Graph tags:
        </p>

        <pre><code>&lt;!-- Essential Open Graph Tags for LinkedIn --&gt;
&lt;meta property="og:title" content="Your Professional Title" /&gt;
&lt;meta property="og:description" content="Your business-focused description" /&gt;
&lt;meta property="og:image" content="https://example.com/image.jpg" /&gt;
&lt;meta property="og:url" content="https://example.com/page" /&gt;
&lt;meta property="og:type" content="website" /&gt;</code></pre>

        <h3>Recommended Additional Tags</h3>
        <ul>
          <li><code>og:site_name</code> - Your company or site name</li>
          <li><code>og:locale</code> - Language locale (e.g., en_US)</li>
          <li><code>og:image:width</code> and <code>og:image:height</code> - Image dimensions</li>
          <li><code>article:author</code> - For article-type content</li>
          <li><code>article:published_time</code> - Publication date for articles</li>
        </ul>

        <h2 id="linkedin-content-strategy">LinkedIn Content Strategy</h2>
        <p>
          LinkedIn's professional context requires a different approach to Open Graph optimization:
        </p>

        <h3>Title Best Practices for LinkedIn</h3>
        <ul>
          <li>Keep titles professional and clear (40-60 characters)</li>
          <li>Focus on business value and outcomes</li>
          <li>Use industry-relevant keywords</li>
          <li>Avoid clickbait or overly casual language</li>
          <li>Include company or brand name when relevant</li>
        </ul>

        <h3>Description Best Practices for LinkedIn</h3>
        <ul>
          <li>Optimal length: 150-160 characters</li>
          <li>Emphasize professional benefits and insights</li>
          <li>Use business-focused language</li>
          <li>Include relevant statistics or data when possible</li>
          <li>End with a clear value proposition</li>
        </ul>

        <h2 id="common-mistakes">Common LinkedIn Open Graph Mistakes</h2>

        <h3>1. Using Casual or Unprofessional Language</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ "Check out this awesome new feature!"
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ "Introducing enterprise-grade features that improve team productivity by 40%"
        </p>
        <p>
          LinkedIn's audience expects professional, business-focused content.
        </p>

        <h3>2. Wrong Image Dimensions</h3>
        <p>
          While LinkedIn accepts various sizes, using the exact recommended 1200×627px ensures optimal display:
        </p>
        <ul>
          <li>LinkedIn may crop or resize non-standard images</li>
          <li>1200×627px matches LinkedIn's card format perfectly</li>
          <li>Always test with the LinkedIn Post Inspector</li>
        </ul>

        <h3>3. Not Using LinkedIn Post Inspector</h3>
        <p>
          LinkedIn provides a dedicated tool for testing link previews:
        </p>
        <ol>
          <li>Visit the <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">LinkedIn Post Inspector</a></li>
          <li>Enter your URL</li>
          <li>Click "Inspect" to see how it will appear</li>
          <li>Click "Clear cache" to refresh cached data</li>
        </ol>

        <h3>4. Missing Business Context</h3>
        <p>
          LinkedIn users expect professional context. Ensure your previews:
        </p>
        <ul>
          <li>Clearly communicate business value</li>
          <li>Use professional imagery and design</li>
          <li>Include relevant industry or company information</li>
          <li>Avoid overly casual or entertainment-focused content</li>
        </ul>

        <h2 id="linkedin-debugging">Debugging LinkedIn Link Previews</h2>
        <p>
          LinkedIn provides the Post Inspector tool for testing and debugging:
        </p>

        <h3>LinkedIn Post Inspector</h3>
        <p>
          The <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">LinkedIn Post Inspector</a> allows you to:
        </p>
        <ul>
          <li>Preview how your link will appear on LinkedIn</li>
          <li>View all detected Open Graph tags</li>
          <li>Clear LinkedIn's cache for your URL</li>
          <li>Identify missing or incorrect tags</li>
        </ul>

        <h3>Common Inspector Issues</h3>
        <ul>
          <li><strong>"Image too small"</strong> - Use at least 1200×627px</li>
          <li><strong>"Missing og:image"</strong> - Add the required image tag</li>
          <li><strong>"Cached version"</strong> - Click "Clear cache" to refresh</li>
          <li><strong>"Invalid URL"</strong> - Ensure image URL is absolute and accessible</li>
        </ul>

        <h2 id="linkedin-engagement">Optimizing for LinkedIn Engagement</h2>
        <p>
          Professional link previews on LinkedIn can drive significant B2B engagement:
        </p>

        <h3>Best Practices for B2B Content</h3>
        <ul>
          <li>Focus on business outcomes and ROI</li>
          <li>Use data and statistics when relevant</li>
          <li>Include professional imagery (office, team, product demos)</li>
          <li>Emphasize expertise and authority</li>
          <li>Use industry-specific terminology appropriately</li>
        </ul>

        <h3>Timing and Context</h3>
        <ul>
          <li>LinkedIn users are most active during business hours</li>
          <li>Tuesday-Thursday typically see highest engagement</li>
          <li>Professional content performs better than casual content</li>
          <li>Long-form articles get more engagement than short posts</li>
        </ul>

        <h2 id="implementation-examples">Implementation Examples</h2>

        <h3>Nuxt 3</h3>
        <pre><code>useSeoMeta({
  ogTitle: 'Your Professional Title',
  ogDescription: 'Your business-focused description highlighting value',
  ogImage: 'https://example.com/linkedin-og-image.jpg',
  ogUrl: 'https://example.com/page',
  ogType: 'article',
  ogSiteName: 'Your Company Name',
  ogLocale: 'en_US',
  articlePublishedTime: '2025-12-16T00:00:00Z',
  articleAuthor: 'Author Name'
})</code></pre>

        <h3>Next.js 14+</h3>
        <pre><code>export const metadata = {
  openGraph: {
    title: 'Your Professional Title',
    description: 'Your business-focused description',
    images: [{
      url: 'https://example.com/linkedin-og-image.jpg',
      width: 1200,
      height: 627,
      alt: 'Professional image description'
    }],
    url: 'https://example.com/page',
    siteName: 'Your Company Name',
    locale: 'en_US',
    type: 'article',
    publishedTime: '2025-12-16T00:00:00Z',
    authors: ['Author Name']
  }
}</code></pre>

        <h2 id="related-resources">Related Resources</h2>
        <ul>
          <li><NuxtLink to="/open-graph/facebook" class="font-semibold">Facebook Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph/twitter" class="font-semibold">Twitter Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/guides/linkedin-link-preview" class="font-semibold">Complete LinkedIn Link Preview Guide</NuxtLink></li>
          <li><NuxtLink to="/og-image-size-guide" class="font-semibold">OG Image Size Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph-debugging" class="font-semibold">Open Graph Debugging Guide</NuxtLink></li>
          <li><a href="https://www.linkedin.com/help/linkedin/answer/a521663" target="_blank" rel="noopener">LinkedIn Sharing Best Practices</a></li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Test Your LinkedIn Link Previews
        </h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Preview how your professional content will appear on LinkedIn and all other platforms.
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
            to="/open-graph/twitter"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="text-2xl mb-2">𝕏</div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              Twitter
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
  title: 'LinkedIn Open Graph Preview Guide - Optimize Your LinkedIn Link Previews',
  description: 'Complete guide to LinkedIn Open Graph optimization. Learn LinkedIn-specific image dimensions (1200×627px), professional content strategies, and best practices for B2B link previews.',
  keywords: 'linkedin og tags, linkedin open graph, linkedin link preview, linkedin post inspector, linkedin og image size, linkedin meta tags, linkedin card preview, b2b link preview',
  robots: 'index, follow',
  ogTitle: 'LinkedIn Open Graph Preview Guide - Optimize Your LinkedIn Link Previews',
  ogDescription: 'Master LinkedIn Open Graph tags for professional link previews. Learn image dimensions, B2B content strategies, and best practices for LinkedIn engagement.',
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
    'name': 'LinkedIn Open Graph Preview Guide',
    'description': 'Complete guide to optimizing Open Graph tags for perfect link previews on LinkedIn',
    'url': 'https://ogpreview.app/open-graph/linkedin',
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
        'name': 'What image size should I use for LinkedIn Open Graph?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'LinkedIn recommends 1200×627px (1.91:1 aspect ratio) for optimal display. This exact size ensures your images display perfectly in LinkedIn\'s card format.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I test my LinkedIn link preview?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the LinkedIn Post Inspector (linkedin.com/post-inspector/) to preview how your link will appear and clear LinkedIn\'s cache if needed.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What makes a good LinkedIn Open Graph preview?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Good LinkedIn previews use professional language, business-focused descriptions, high-quality images (1200×627px), and emphasize business value and outcomes rather than casual content.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I clear LinkedIn\'s cache for my Open Graph tags?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the LinkedIn Post Inspector to clear cache. Enter your URL, click "Inspect", then click "Clear cache" to force LinkedIn to refresh the cached Open Graph data.'
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
        'name': 'LinkedIn Open Graph Guide',
        'item': 'https://ogpreview.app/open-graph/linkedin'
      }
    ]
  }
])
</script>
