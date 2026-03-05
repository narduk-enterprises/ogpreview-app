<script setup lang="ts">
// SEO Meta Tags - Platform-specific for Twitter preview
useSeo({
  title: 'Twitter (X) Open Graph Preview Tool - Test Your Twitter Cards',
  description: 'Preview how your links will appear on Twitter/X. Test your Twitter Cards and Open Graph tags with our free Twitter preview tool.',
  canonicalUrl: 'https://ogpreview.app/preview/twitter',
  keywords: ['twitter preview tool', 'twitter card preview', 'x.com preview', 'twitter og preview'],
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebApplication',
    'name': 'Twitter Open Graph Preview Tool',
    'description': 'Free tool to preview how your links will appear on Twitter/X with Twitter Cards and Open Graph tags',
    'url': 'https://ogpreview.app/preview/twitter',
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
        'name': 'Twitter Preview Tool',
        'item': 'https://ogpreview.app/preview/twitter'
      }
    ]
  }
])

</script>

<template>
  <div>
    <PagesPreviewPage :show-seo-sections="false" />
  </div>
</template>
