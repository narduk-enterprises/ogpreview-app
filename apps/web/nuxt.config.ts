// deploy-trigger: 2026-03-04T20:40:25Z
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],
  modules: ['nitro-cloudflare-dev', 'nuxt-og-image'],
  css: ['~/assets/css/main.css'],


  future: {
    compatibilityVersion: 4
  },

  ui: {
    colorMode: true,
  },

  icon: {
    serverBundle: {
      collections: ['heroicons', 'simple-icons', 'lucide']
    }
  },

  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    // Server-only (admin API routes)
    googleServiceAccountKey: process.env.GSC_SERVICE_ACCOUNT_JSON || '',
    posthogApiKey: process.env.POSTHOG_PERSONAL_API_KEY || '',
    gaPropertyId: process.env.GA_PROPERTY_ID || '',
    posthogProjectId: process.env.POSTHOG_PROJECT_ID || '',
    public: {
      appUrl: process.env.SITE_URL || 'https://ogpreview.app',
      appName: process.env.APP_NAME || 'OG Preview',
      // Analytics
      posthogPublicKey: process.env.POSTHOG_PUBLIC_KEY || '',
      posthogHost: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
      gaMeasurementId: process.env.GA_MEASUREMENT_ID || '',
      posthogProjectId: process.env.POSTHOG_PROJECT_ID || '',
      // IndexNow
      indexNowKey: process.env.INDEXNOW_KEY || '',
    }
  },

  // ─── SEO Configuration (@nuxtjs/seo) ──────────────────────────
  // This single config block powers sitemap, robots, schema.org,
  // OG images, and site-wide SEO defaults. Individual pages override
  // these via the `useSeo()` composable.

  site: {
    url: process.env.SITE_URL || 'https://ogpreview.app',
    name: 'OG Preview',
    description: 'Free Open Graph preview tool. Test how your links appear on Facebook, Twitter, LinkedIn, Slack, Discord, and WhatsApp before publishing.',
    defaultLocale: 'en',
  },

  ogImage: {
    defaults: {
      component: 'OgImageDefault',
    },
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'OG Preview',
      url: process.env.SITE_URL || 'https://ogpreview.app',
      logo: '/favicon.svg',
    },
  },

  image: {
    provider: 'cloudflare',
    cloudflare: {
      baseURL: process.env.SITE_URL || 'https://ogpreview.app',
    },
    domains: ['images.unsplash.com'],
    presets: {
      ogImage: {
        modifiers: {
          quality: 85,
          width: 1200,
          height: 630
        }
      }
    }
  },

  sitemap: {},

  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  // ─── Nitro (Cloudflare Workers) ────────────────────────────────

  nitro: {
    cloudflareDev: {
      configPath: resolve(__dirname, 'wrangler.json'),
    },
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        '/preview/twitter',
        '/preview/facebook',
        '/preview/linkedin',
        '/open-graph/twitter',
        '/open-graph/facebook',
        '/open-graph/linkedin',
        '/open-graph/discord',
        '/open-graph/slack',
        '/open-graph/telegram',
        '/open-graph/whatsapp',
        '/open-graph/imessage',
        '/what-is-open-graph',
        '/og-image-size-guide',
        '/open-graph-debugging',
        '/why-og-images-not-updating',
        '/guides',
        '/guides/open-graph-preview',
        '/guides/og-cache-refresh',
        '/about',
        '/changelog',
        '/sitemap.xml',
        '/robots.txt'
      ]
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#f0f4ff' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1144766246490692',
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})
