<script setup lang="ts">
useSeoMeta({
  title: 'About Us - ogpreview.app',
  description: 'Learn about ogpreview.app, the free Open Graph preview tool trusted by developers and marketers. Discover our mission, technology, and commitment to privacy.',
  ogTitle: 'About ogpreview.app - Free Open Graph Preview Tool',
  ogDescription: 'Learn about our mission to provide the best free Open Graph preview tool for developers and content creators.',
  ogType: 'website'
})

// Schema.org AboutPage
useSchemaOrg([
  {
    '@type': 'AboutPage',
    'name': 'About ogpreview.app',
    'description': 'Learn about ogpreview.app, the free Open Graph preview tool for developers and marketers',
    'url': 'https://ogpreview.app/about',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'ogpreview.app',
      'url': 'https://ogpreview.app',
      'logo': 'https://ogpreview.app/logo.svg',
      'description': 'Free Open Graph preview tool for testing social media link cards',
      'foundingDate': '2024',
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'hello@ogpreview.app',
        'contactType': 'customer service',
        'availableLanguage': 'English'
      },
      'sameAs': [
        'https://twitter.com/ogpreview'
      ]
    }
  }
])
</script>

<template>
  <LayoutsSimpleLayout
title="About ogpreview.app"
    subtitle="Your free, powerful Open Graph preview tool for social media optimization">
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        What We Do
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        ogpreview.app is a free web tool that helps developers, marketers, and content creators
        preview how their links will appear when shared on social media platforms. We support
        real-time previews for Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp,
        Telegram, and iMessage.
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Our tool validates Open Graph meta tags, Twitter Cards, and provides recommendations
        for optimal social media sharing experiences.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Why We Built This
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        As developers and content creators ourselves, we know the frustration of sharing a link
        on social media only to find that the preview looks broken, displays the wrong image,
        or shows an incomplete description. Debugging Open Graph tags can be time-consuming,
        and existing tools often lack real-time previews for multiple platforms.
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        We created ogpreview.app to solve this problem with a simple, fast, and comprehensive
        tool that anyone can use for free.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Our Mission
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        To empower everyone to create beautiful, engaging social media previews that drive
        clicks and engagement. We believe that great tools should be:
      </p>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li><strong>Free:</strong> No hidden costs, no premium tiers, just free access for everyone</li>
        <li><strong>Simple:</strong> Intuitive interface that anyone can use without technical knowledge</li>
        <li><strong>Comprehensive:</strong> Support for all major social platforms in one place</li>
        <li><strong>Fast:</strong> Real-time previews without delays or loading times</li>
        <li><strong>Accurate:</strong> Preview rendering that matches actual platform behavior</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Key Features
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">🎨 Multi-Platform Previews</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            See how your link looks on 8 different platforms simultaneously
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">⚡ Real-Time Validation</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            Instant feedback on Open Graph and Twitter Card implementation
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">🔍 URL Fetching</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            Automatically extract meta tags from any URL
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">📏 Image Validation</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            Check if your images meet platform-specific size requirements
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <UIcon name="i-heroicons-book-open" class="w-5 h-5" />
            Educational Guides
          </h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            Comprehensive guides for Open Graph optimization
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">🌙 Dark Mode</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            Beautiful interface that adapts to your system preferences
          </p>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Technology Stack
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Built with modern web technologies for optimal performance:
      </p>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li><strong>Nuxt 4:</strong> Progressive Vue.js framework for server-side rendering</li>
        <li><strong>Vue 3:</strong> Modern reactive JavaScript framework</li>
        <li><strong>TypeScript:</strong> Type-safe development for reliability</li>
        <li><strong>Tailwind CSS:</strong> Utility-first CSS for beautiful, responsive design</li>
        <li><strong>Vercel:</strong> Global CDN for fast, reliable hosting</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Privacy & Data Protection
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        We take your privacy seriously:
      </p>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li>We don't store the URLs you preview</li>
        <li>No personal data collection without consent</li>
        <li>HTTPS encryption for all connections</li>
        <li>Transparent privacy policy</li>
        <li>GDPR and CCPA compliant</li>
      </ul>
      <p class="text-gray-700 dark:text-gray-300">
        Read our full <NuxtLink to="/privacy" class="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy
        </NuxtLink>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Open Source & Community
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        We believe in giving back to the developer community. While ogpreview.app itself is a
        commercial service, we share our knowledge through:
      </p>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li>Comprehensive guides on Open Graph implementation</li>
        <li>Best practices for social media optimization</li>
        <li>Platform-specific optimization tips</li>
        <li>Regular blog posts and tutorials</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Support & Feedback
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        We're constantly improving ogpreview.app based on user feedback. If you have suggestions,
        bug reports, or feature requests, we'd love to hear from you:
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        <NuxtLink to="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</NuxtLink>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Advertising & Monetization
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        To keep ogpreview.app free for everyone, we display non-intrusive advertisements
        through Google AdSense. These ads help us cover hosting costs and continue developing
        new features. We carefully select ad placements to ensure they don't interfere with
        your user experience.
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        We do not sell your personal data or browsing history to advertisers.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Get Started
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Ready to create beautiful social media previews? Try ogpreview.app today—no
        registration required!
      </p>
      <UButton to="/" color="primary" size="lg">
        Try OG Preview Tool
      </UButton>
    </section>
  </LayoutsSimpleLayout>
</template>
