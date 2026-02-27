<template>
  <div>
    <PreviewPage :show-seo-sections="false" />
  </div>
</template>

<script setup lang="ts">
// SEO Meta Tags - Platform-specific for LinkedIn preview
useSeoMeta({
  title: 'LinkedIn Open Graph Preview Tool - Test Your LinkedIn Link Previews',
  description: 'Preview how your links will appear on LinkedIn. Test your Open Graph tags with our free LinkedIn preview tool. See exactly how your professional content looks in LinkedIn posts.',
  keywords: 'linkedin preview tool, linkedin og preview, linkedin link preview, test linkedin cards, linkedin post inspector alternative, linkedin meta tags preview',
  robots: 'index, follow',
  ogTitle: 'LinkedIn Open Graph Preview Tool - Test Your LinkedIn Link Previews',
  ogDescription: 'Preview how your links will appear on LinkedIn. Test your Open Graph tags instantly with our free preview tool.',
  ogType: 'website',
  ogUrl: 'https://ogpreview.app/preview/linkedin'
})

// Structured Data
useSchemaOrg([
  {
    '@type': 'WebApplication',
    'name': 'LinkedIn Open Graph Preview Tool',
    'description': 'Free tool to preview how your links will appear on LinkedIn with Open Graph tags',
    'url': 'https://ogpreview.app/preview/linkedin',
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
        'name': 'LinkedIn Preview Tool',
        'item': 'https://ogpreview.app/preview/linkedin'
      }
    ]
  }
])

// Canonical URL
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://ogpreview.app/preview/linkedin'
    }
  ]
})
</script>
