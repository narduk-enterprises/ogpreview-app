<script setup lang="ts">
// SEO
useSeo({
  title: 'Open Graph Preview Tool — Preview Facebook, Twitter, LinkedIn & More',
  description: 'Open Graph preview tool — free tool to preview how your links appear on Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, iMessage & Telegram. Test and preview Open Graph tags instantly before posting.',
  keywords: ['open graph preview', 'og preview tool', 'open graph image preview', 'og tag preview', 'social media preview generator', 'preview facebook link', 'twitter card preview tool', 'linkedin link preview', 'slack link preview', 'discord og preview', 'whatsapp link preview', 'telegram preview', 'imessage preview', 'free og tool'],
  author: 'ogpreview.app',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  image: '/og-image.png',
  ogImage: {
    title: 'Open Graph Preview Tool',
    description: 'Preview Facebook, Twitter, LinkedIn & More',
    icon: '✨'
  }
})

// Structured Data
useSchemaOrg([
  defineSoftwareApp({
    name: 'OG Preview',
    alternateName: 'Open Graph Preview Tool',
    description: 'Free Open Graph preview tool that shows how a link displays on social media platforms. Preview Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, iMessage, and Telegram link cards before posting.',
    url: 'https://ogpreview.app',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Compatible with all modern browsers.',
    softwareVersion: '1.0',
    datePublished: '2024-01-01',
    dateModified: '2026-03-31',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    author: {
      name: 'ogpreview.app',
      url: 'https://ogpreview.app'
    },
    screenshot: 'https://ogpreview.app/og-image.png',
    featureList: [
      'Real-time Open Graph preview generation',
      'Multi-platform support: Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, iMessage, Telegram',
      'No login or registration required',
      'Open Graph protocol compliant',
      'Twitter Card validation and preview',
      'Image dimension validation',
      'Instant social media card preview',
      'Free developer tool',
      'OG tag quality scoring',
      'Cache refresh support',
      'URL history tracking'
    ],
    aggregateRating: {
      ratingValue: '4.9',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ogpreview.app/url/{url}'
      },
      'query-input': 'required name=url'
    }
  })
])

const route = useRoute()
// Get initial URL from query parameter (for backward compatibility)
const initialUrl = (route.query.url as string) || ''
</script>

<template>
  <PagesPreviewPage :initial-url="initialUrl" :show-seo-sections="true" />
</template>
