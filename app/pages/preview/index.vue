<template>
  <div>
    <PreviewPage :show-seo-sections="false" />
  </div>
</template>

<script setup lang="ts">
// Redirect to home or show the preview tool
// This page prevents 404 errors when accessing /preview directly

useSeoMeta({
  title: 'Open Graph Preview Tool - Test Your Social Media Link Previews',
  description: 'Free Open Graph preview tool. Test how your links appear on Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, iMessage & Telegram. Preview OG tags instantly.',
  keywords: 'open graph preview, og preview tool, social media preview, link preview tool, og tag preview, preview facebook link, twitter card preview, linkedin link preview',
  robots: 'index, follow',
  ogTitle: 'Open Graph Preview Tool - Test Your Social Media Link Previews',
  ogDescription: 'Free tool to preview how your links appear across all major social media platforms. Test Open Graph tags instantly.',
  ogType: 'website',
  ogUrl: 'https://ogpreview.app/preview'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebApplication',
    'name': 'Open Graph Preview Tool',
    'description': 'Free tool to preview how your links will appear on social media platforms with Open Graph tags',
    'url': 'https://ogpreview.app/preview',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
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
        'name': 'Preview Tool',
        'item': 'https://ogpreview.app/preview'
      }
    ]
  }
])

// Canonical URL
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://ogpreview.app/preview'
    }
  ]
})
</script>
