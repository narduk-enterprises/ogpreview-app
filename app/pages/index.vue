<template>
  <PreviewPage :initial-url="initialUrl" :show-seo-sections="true" />
</template>

<script setup lang="ts">
// SEO Meta Tags - Optimized per SEO Audit (Dec 2025)
useSeoMeta({
  title: 'Open Graph Preview Tool — Preview Facebook, Twitter, LinkedIn & More',
  description: 'Open Graph preview tool — free tool to preview how your links appear on Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, iMessage & Telegram. Test and preview Open Graph tags instantly before posting.',
  keywords: 'open graph preview, og preview tool, open graph image preview, og tag preview, social media preview generator, preview facebook link, twitter card preview tool, linkedin link preview, slack link preview, discord og preview, whatsapp link preview, telegram preview, imessage preview, free og tool',
  author: 'ogpreview.app',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',

  // Open Graph
  ogTitle: 'Open Graph Preview Tool — Preview Facebook, Twitter, LinkedIn & More',
  ogDescription: 'Free Open Graph preview tool — see how your link looks on Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, iMessage & Telegram before you post. Test OG tags instantly.',
  ogImage: '/og-image.png',
  ogImageAlt: 'OG Preview - Open Graph Preview Generator',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: 'https://ogpreview.app',
  ogType: 'website',
  ogSiteName: 'ogpreview.app',
  ogLocale: 'en_US',

  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: 'Open Graph Preview Tool — Preview Facebook, Twitter, LinkedIn & More',
  twitterDescription: 'Free Open Graph preview tool — see how your link looks on Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, iMessage & Telegram before you post. Test OG tags instantly.',
  twitterImage: '/og-image.png',
  twitterImageAlt: 'OG Preview - Open Graph Preview Generator',
  twitterSite: '@ogpreview',
  twitterCreator: '@ogpreview'
})

// Structured Data (Schema.org) - Optimized per SEO Audit (Dec 2025)
useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    'name': 'OG Preview',
    'alternateName': 'Open Graph Preview Tool',
    'description': 'Free Open Graph preview tool that shows how a link displays on social media platforms. Preview Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, iMessage, and Telegram link cards before posting.',
    'url': 'https://ogpreview.app',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Web',
    'browserRequirements': 'Requires JavaScript. Compatible with all modern browsers.',
    'softwareVersion': '1.0',
    'datePublished': '2024-01-01',
    'dateModified': new Date().toISOString().split('T')[0],
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'author': {
      '@type': 'Organization',
      'name': 'ogpreview.app',
      'url': 'https://ogpreview.app'
    },
    'screenshot': 'https://ogpreview.app/og-image.png',
    'featureList': [
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
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '127',
      'bestRating': '5',
      'worstRating': '1'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://ogpreview.app/url/{url}'
      },
      'query-input': 'required name=url'
    }
  }
])

const route = useRoute()
// Get initial URL from query parameter (for backward compatibility)
const initialUrl = (route.query.url as string) || ''
</script>
