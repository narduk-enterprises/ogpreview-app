<script setup lang="ts">
// SEO
useSeo({
  title: 'Changelog - ogpreview.app Updates & Improvements',
  description: 'Track updates, improvements, and new features to ogpreview.app. See what\'s changed, what\'s new, and what\'s coming next.',
  keywords: ['ogpreview changelog', 'open graph tool updates', 'og preview tool changelog', "what's new ogpreview"],
  ogImage: {
    title: 'Changelog',
    description: 'Track updates and improvements',
    icon: 'i-lucide-history'
  }
})

// Structured Data
useWebPageSchema({
  name: 'Changelog - ogpreview.app',
  description: 'Track updates, improvements, and new features to ogpreview.app'
})

useBreadcrumbSchema([
  { name: 'Home', url: 'https://ogpreview.app' },
  { name: 'Changelog', url: 'https://ogpreview.app/changelog' }
])
</script>

<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-default">
    <article class="max-w-4xl mx-auto">
      <!-- Navigation -->
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-muted dark:text-dimmed hover:underline"
        >
          ← Back to Tool
        </NuxtLink>
      </div>

      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold text-primary dark:text-white mb-4">
          Changelog
        </h1>
        <p class="text-xl text-muted dark:text-dimmed mb-6">
          Track updates, improvements, and new features to ogpreview.app. See what's changed and what's coming next.
        </p>
        <div class="flex flex-wrap gap-4 text-sm text-muted dark:text-dimmed">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
            Last updated: December 2025
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-elevated rounded-xl p-8 shadow-lg">
        <h2 id="december-2025">December 2025</h2>

        <h3>🎯 SEO & Content Expansion</h3>
        <ul>
          <li><strong>Platform-specific guides:</strong> Added comprehensive guides for Twitter, Facebook, LinkedIn, Discord, and Slack Open Graph optimization</li>
          <li><strong>Search intent pages:</strong> Created pages for "What is Open Graph?", OG image sizes, debugging, and cache issues</li>
          <li><strong>Indexable preview routes:</strong> Added platform-specific preview routes (/preview/twitter, /preview/facebook, /preview/linkedin)</li>
          <li><strong>EEAT signals:</strong> Added About and Changelog pages for trust and credibility</li>
          <li><strong>Enhanced schema:</strong> Implemented comprehensive structured data (WebPage, FAQPage, BreadcrumbList, Organization) across all pages</li>
          <li><strong>Internal linking:</strong> Improved internal linking strategy with descriptive anchor text</li>
        </ul>

        <h3>📊 Sitemap & Crawl Optimization</h3>
        <ul>
          <li>Updated sitemap to include all new SEO pages</li>
          <li>Configured proper priority and changefreq for all routes</li>
          <li>Added prerendering for all new content pages</li>
        </ul>

        <h2 id="previous-updates">Previous Updates</h2>

        <h3>Security & Performance</h3>
        <ul>
          <li><strong>Rate limiting:</strong> Added in-memory token bucket rate limiter to API endpoint (30 requests per 5 minutes per IP)</li>
          <li><strong>Logging hygiene:</strong> Implemented URL sanitization for logs (removes query strings, fragments, and caps length)</li>
          <li><strong>Error handling:</strong> Improved error response consistency (no stack traces leaked to clients)</li>
          <li><strong>SSRF protection:</strong> Maintained and improved existing SSRF protections in URL validation</li>
        </ul>

        <h3>Removed Features</h3>
        <ul>
          <li>Removed admin functionality and authentication system</li>
          <li>Removed Google Ads API integration</li>
          <li>Simplified codebase to focus on core Open Graph preview functionality</li>
        </ul>

        <h2 id="upcoming">Upcoming Features</h2>
        <p>
          We're constantly working to improve ogpreview.app. Here's what's coming:
        </p>
        <ul>
          <li>More platform-specific optimization guides</li>
          <li>Enhanced validation and error messages</li>
          <li>Performance improvements</li>
          <li>Additional platform support</li>
        </ul>

        <h2 id="contributing">Contributing</h2>
        <p>
          Want to contribute? We welcome contributions! Check out our <ULink href="https://github.com" target="_blank" rel="noopener" class="font-semibold">GitHub repository</ULink> to:
        </p>
        <ul>
          <li>Report bugs</li>
          <li>Suggest new features</li>
          <li>Submit pull requests</li>
          <li>Improve documentation</li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="mt-12 bg-primary rounded-xl p-8 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Try the Latest Features
        </h2>
        <p class="text-primary mb-6 max-w-2xl mx-auto">
          Experience all the improvements we've made to the Open Graph preview tool.
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-white text-muted px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
        >
          Try the Free Preview Tool
        </NuxtLink>
      </div>
    </article>
  </div>
</template>


