<template>
  <div>
    <PreviewPage :show-seo-sections="false" />
  </div>
</template>

<script setup lang="ts">
// SEO Meta Tags - Platform-specific for Facebook preview
useSeoMeta({
  title: 'Facebook Open Graph Preview Tool - Test Your Facebook Link Previews',
  description: 'Preview how your links will appear on Facebook. Test your Open Graph tags with our free Facebook preview tool. See exactly how your content looks in Facebook posts and messages.',
  keywords: 'facebook preview tool, facebook og preview, facebook link preview, test facebook cards, facebook sharing debugger alternative, facebook meta tags preview',
  robots: 'index, follow',
  ogTitle: 'Facebook Open Graph Preview Tool - Test Your Facebook Link Previews',
  ogDescription: 'Preview how your links will appear on Facebook. Test your Open Graph tags instantly with our free preview tool.',
  ogType: 'website',
  ogUrl: 'https://ogpreview.app/preview/facebook'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebApplication',
    'name': 'Facebook Open Graph Preview Tool',
    'description': 'Free tool to preview how your links will appear on Facebook with Open Graph tags',
    'url': 'https://ogpreview.app/preview/facebook',
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
        'name': 'Facebook Preview Tool',
        'item': 'https://ogpreview.app/preview/facebook'
      }
    ]
  }
])

// Canonical URL
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://ogpreview.app/preview/facebook'
    }
  ]
})
</script>
