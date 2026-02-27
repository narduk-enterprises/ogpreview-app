<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'What is Open Graph? Complete Beginner\'s Guide (2025)',
  description: 'Learn what Open Graph is, how it works, and why it\'s essential for social media link previews. Complete guide to OG tags, implementation examples, and best practices.',
  keywords: 'what is open graph, open graph protocol, og tags explained, open graph meta tags, social media preview tags, og:title og:description, open graph tutorial',
  robots: 'index, follow',
  ogTitle: 'What is Open Graph? Complete Beginner\'s Guide',
  ogDescription: 'Learn the fundamentals of Open Graph protocol, how it works, and why it\'s essential for social media link previews. Complete beginner\'s guide with examples.',
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
    'name': 'What is Open Graph?',
    'description': 'Complete beginner\'s guide to Open Graph protocol, how it works, and why it\'s essential for social media link previews',
    'url': 'https://ogpreview.app/what-is-open-graph',
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
        'name': 'What is Open Graph?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Open Graph is a protocol created by Facebook in 2010 that uses HTML meta tags to control how web pages appear when shared on social media. It allows you to specify the title, description, image, and other metadata that platforms display in link previews.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How does Open Graph work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'When someone shares your URL on social media, the platform fetches your page, reads the Open Graph meta tags from the HTML head section, and uses that data to create a rich preview card with your specified title, description, and image.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the required Open Graph tags?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The four essential Open Graph tags are: og:title (page title), og:description (page description), og:image (preview image URL), and og:url (canonical page URL).'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why is Open Graph important?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Open Graph is important because rich link previews with images and descriptions get significantly more clicks than plain URLs. It also gives you control over how your content appears on social media, ensuring a professional and brand-consistent appearance.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I test my Open Graph tags?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can test your Open Graph tags using our free preview tool, or use platform-specific validators like Facebook Sharing Debugger, Twitter Card Validator, or LinkedIn Post Inspector.'
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
        'name': 'What is Open Graph?',
        'item': 'https://ogpreview.app/what-is-open-graph'
      }
    ]
  }
])
</script>

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
          What is Open Graph?
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Learn the fundamentals of Open Graph protocol, how it works, and why it's essential for social media link previews. A complete beginner's guide to OG tags.
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
            Open Graph is a protocol created by Facebook in 2010 that uses HTML meta tags to control how web pages appear when shared on social media. It allows you to specify the title, description, image, and other metadata that platforms like Facebook, Twitter, LinkedIn, and Slack display in link previews.
          </p>
        </div>

        <h2 id="open-graph-definition">Open Graph Definition</h2>
        <p>
          <strong>Open Graph</strong> is a web protocol that standardizes how web pages are represented when shared on social media platforms. It uses HTML meta tags in the <code>&lt;head&gt;</code> section of your web pages to control the title, description, image, and other metadata that appears in link previews.
        </p>

        <p>
          When you share a URL on Facebook, Twitter, LinkedIn, or Slack, these platforms fetch the page and look for Open Graph tags to create a rich preview card. Without Open Graph tags, platforms may use default information from your page (like the page title or first image), which often results in poor-looking previews.
        </p>

        <h2 id="history">History of Open Graph</h2>
        <p>
          Open Graph was created by Facebook in 2010 to solve a problem: when users shared links on Facebook, the previews were often inaccurate, unattractive, or missing important information. Facebook developed the protocol to give website owners control over how their content appears when shared.
        </p>

        <h3>Adoption and Growth</h3>
        <ul>
          <li><strong>2010:</strong> Facebook launches Open Graph protocol</li>
          <li><strong>2011:</strong> Twitter introduces Twitter Cards (extension of OG)</li>
          <li><strong>2012+:</strong> LinkedIn, Slack, Discord, and other platforms adopt OG</li>
          <li><strong>Today:</strong> Open Graph is the de facto standard for social media link previews</li>
        </ul>

        <h2 id="how-it-works">How Open Graph Works</h2>
        <p>
          Here's the step-by-step process of how Open Graph works:
        </p>

        <h3>1. You Add Meta Tags to Your Page</h3>
        <p>
          You add Open Graph meta tags to the <code>&lt;head&gt;</code> section of your HTML:
        </p>

        <pre><code>&lt;head&gt;
  &lt;meta property="og:title" content="Your Page Title" /&gt;
  &lt;meta property="og:description" content="Your page description" /&gt;
  &lt;meta property="og:image" content="https://example.com/image.jpg" /&gt;
  &lt;meta property="og:url" content="https://example.com/page" /&gt;
  &lt;meta property="og:type" content="website" /&gt;
&lt;/head&gt;</code></pre>

        <h3>2. Someone Shares Your URL</h3>
        <p>
          When a user shares your URL on a social media platform (Facebook, Twitter, etc.), the platform's servers fetch your page.
        </p>

        <h3>3. Platform Parses Open Graph Tags</h3>
        <p>
          The platform's crawler reads the HTML and extracts the Open Graph meta tags from the <code>&lt;head&gt;</code> section.
        </p>

        <h3>4. Platform Creates Rich Preview</h3>
        <p>
          Using the Open Graph data, the platform creates a rich preview card with your specified title, description, and image.
        </p>

        <h3>5. Preview Appears in Feed</h3>
        <p>
          The rich preview card appears in the user's feed, making your link more engaging and clickable than a plain URL.
        </p>

        <h2 id="required-tags">Required Open Graph Tags</h2>
        <p>
          While Open Graph has many optional tags, these four are considered essential:
        </p>

        <table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>og:title</code></td>
              <td>The title of your content</td>
              <td>"Complete Guide to Open Graph"</td>
            </tr>
            <tr>
              <td><code>og:description</code></td>
              <td>A brief description</td>
              <td>"Learn how to optimize your social media link previews"</td>
            </tr>
            <tr>
              <td><code>og:image</code></td>
              <td>URL to preview image</td>
              <td>"https://example.com/og-image.jpg"</td>
            </tr>
            <tr>
              <td><code>og:url</code></td>
              <td>Canonical URL of the page</td>
              <td>"https://example.com/page"</td>
            </tr>
          </tbody>
        </table>

        <h2 id="common-tags">Common Open Graph Tags</h2>
        <p>
          Beyond the required tags, here are commonly used Open Graph tags:
        </p>

        <ul>
          <li><code>og:type</code> - Content type (website, article, product, etc.)</li>
          <li><code>og:site_name</code> - Your website name</li>
          <li><code>og:locale</code> - Language and region (e.g., en_US)</li>
          <li><code>og:image:width</code> and <code>og:image:height</code> - Image dimensions</li>
          <li><code>og:image:alt</code> - Alt text for the image</li>
          <li><code>article:published_time</code> - For article-type content</li>
          <li><code>article:author</code> - Author information</li>
        </ul>

        <h2 id="why-important">Why Open Graph is Important</h2>
        <p>
          Open Graph tags are essential for several reasons:
        </p>

        <h3>1. Better Engagement</h3>
        <p>
          Rich link previews with images and descriptions get significantly more clicks than plain URLs. Studies show that links with Open Graph images can increase click-through rates by 150% or more.
        </p>

        <h3>2. Brand Control</h3>
        <p>
          Without Open Graph tags, platforms may use default information that doesn't represent your brand well. OG tags give you complete control over how your content appears.
        </p>

        <h3>3. Professional Appearance</h3>
        <p>
          Well-optimized Open Graph previews look professional and trustworthy, which can improve conversion rates and brand perception.
        </p>

        <h3>4. Platform Compatibility</h3>
        <p>
          Open Graph is supported by virtually every major social media platform, making it a universal solution for link previews.
        </p>

        <h2 id="platform-differences">Platform Differences</h2>
        <p>
          While Open Graph is a standard, each platform implements it slightly differently:
        </p>

        <ul>
          <li><strong>Facebook:</strong> Created OG, most comprehensive support</li>
          <li><strong>Twitter:</strong> Uses OG but prefers Twitter Card tags</li>
          <li><strong>LinkedIn:</strong> Follows OG standard, focuses on professional content</li>
          <li><strong>Slack/Discord:</strong> Standard OG implementation</li>
        </ul>

        <p>
          Learn more about platform-specific requirements:
        </p>
        <ul>
          <li><NuxtLink to="/open-graph/facebook" class="font-semibold">Facebook Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph/twitter" class="font-semibold">Twitter Open Graph Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph/linkedin" class="font-semibold">LinkedIn Open Graph Guide</NuxtLink></li>
        </ul>

        <h2 id="implementation">How to Implement Open Graph</h2>
        <p>
          Implementing Open Graph tags depends on your website platform:
        </p>

        <h3>Static HTML</h3>
        <p>
          Add meta tags directly to your HTML <code>&lt;head&gt;</code>:
        </p>
        <pre><code>&lt;meta property="og:title" content="Your Title" /&gt;
&lt;meta property="og:description" content="Your Description" /&gt;
&lt;meta property="og:image" content="https://example.com/image.jpg" /&gt;
&lt;meta property="og:url" content="https://example.com/page" /&gt;</code></pre>

        <h3>Nuxt 3</h3>
        <pre><code>useSeoMeta({
  ogTitle: 'Your Title',
  ogDescription: 'Your Description',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page'
})</code></pre>

        <h3>Next.js</h3>
        <pre><code>export const metadata = {
  openGraph: {
    title: 'Your Title',
    description: 'Your Description',
    images: ['https://example.com/image.jpg'],
    url: 'https://example.com/page'
  }
}</code></pre>

        <h2 id="testing">Testing Your Open Graph Tags</h2>
        <p>
          Always test your Open Graph tags before sharing:
        </p>

        <ol>
          <li>Use our <NuxtLink to="/" class="font-semibold">Open Graph Preview Tool</NuxtLink> to see how your tags appear across all platforms</li>
          <li>
Test with platform-specific validators:
            <ul>
              <li><a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing Debugger</a></li>
              <li><a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a></li>
              <li><a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">LinkedIn Post Inspector</a></li>
            </ul>
          </li>
          <li>Share a test post to verify the final appearance</li>
        </ol>

        <h2 id="common-mistakes">Common Open Graph Mistakes</h2>

        <h3>1. Using Relative Image URLs</h3>
        <p class="text-red-600 dark:text-red-400">
          ❌ <code>&lt;meta property="og:image" content="/images/og.jpg" /&gt;</code>
        </p>
        <p class="text-green-600 dark:text-green-400">
          ✅ <code>&lt;meta property="og:image" content="https://example.com/images/og.jpg" /&gt;</code>
        </p>

        <h3>2. Missing Required Tags</h3>
        <p>
          Always include at least og:title, og:description, og:image, and og:url for proper previews.
        </p>

        <h3>3. Client-Side Only Tags</h3>
        <p>
          Social media crawlers don't execute JavaScript. Tags must be in the initial HTML response (use SSR or SSG).
        </p>

        <h2 id="resources">Additional Resources</h2>
        <ul>
          <li><NuxtLink to="/guides/og-image-sizes" class="font-semibold">OG Image Size Guide</NuxtLink></li>
          <li><NuxtLink to="/open-graph-debugging" class="font-semibold">Open Graph Debugging Guide</NuxtLink></li>
          <li><NuxtLink to="/why-og-images-not-updating" class="font-semibold">Why OG Images Not Updating</NuxtLink></li>
          <li><NuxtLink to="/guides/open-graph-preview" class="font-semibold">Complete Open Graph Preview Guide</NuxtLink></li>
          <li><a href="https://ogp.me/" target="_blank" rel="noopener">Official Open Graph Protocol Specification</a></li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Test Your Open Graph Tags
        </h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Use our free tool to preview how your Open Graph tags will appear across all social media platforms.
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

