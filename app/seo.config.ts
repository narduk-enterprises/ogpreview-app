export default {
  // Enhanced SEO Configuration
  site: {
    name: 'ogpreview.app',
    description: 'Generate and preview Open Graph meta tags for Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, Telegram, and iMessage. Create beautiful social media previews instantly with our free tool.',
    url: 'https://ogpreview.app',
    defaultImage: '/og-image.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@ogpreview',
    language: 'en'
  },

  // Additional meta tags for better SEO
  additionalMetaTags: [
    {
      name: 'application-name',
      content: 'OG Preview'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'OG Preview'
    },
    {
      name: 'msapplication-TileColor',
      content: '#2563eb'
    },
    {
      name: 'msapplication-TileImage',
      content: '/icon-512.png'
    }
  ]
}
