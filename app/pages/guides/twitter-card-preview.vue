<template>
  <LayoutsArticleLayout
title="Twitter Card Preview Guide: Complete Twitter/X OG Optimization"
    description="Master Twitter Cards and learn the differences between Open Graph tags and Twitter-specific meta tags for perfect previews."
    platform-icon="Twitter" :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '10 min read' }">
    <template #cta>
      <ContentContentCTA
title="Test Your Twitter Card Preview"
        description="See exactly how your Twitter Card will look before tweeting. Preview across all platforms instantly."
        button-text="Try the Free Preview Tool" button-to="/" variant="blue" />
    </template>

    <h2 id="twitter-cards-overview">What are Twitter Cards?</h2>
    <p>
      Twitter Cards (now on X/Twitter) are rich media previews that appear when you share a link. While Twitter falls
      back
      to standard Open Graph tags, using Twitter-specific
      <ContentContentInlineCode code="twitter:*" /> meta tags gives you precise control over how your links appear on the
      platform.
    </p>

    <ContentContentCallout variant="info" title="Preview Your Twitter Card" icon="i-heroicons-light-bulb">
      Use our <NuxtLink
to="/"
        class="font-semibold underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter Card
        Preview
        Tool</NuxtLink> to see exactly how your links will look when shared on X/Twitter.
    </ContentContentCallout>

    <h2 id="twitter-vs-og">Twitter Cards vs. Open Graph</h2>
    <p>
      Twitter reads both Open Graph and Twitter-specific tags. Here's the fallback priority:
    </p>
    <ol>
      <li>
Twitter tags (
        <ContentContentInlineCode code="twitter:title" />) - highest priority
      </li>
      <li>
Open Graph tags (
        <ContentContentInlineCode code="og:title" />) - fallback
      </li>
      <li>
Standard HTML tags (
        <ContentContentInlineCode code="&lt;title&gt;" />) - last resort
      </li>
    </ol>

    <h3>When to Use What</h3>
    <table>
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Recommendation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Same preview everywhere</td>
          <td>Use only OG tags (Twitter will read them)</td>
        </tr>
        <tr>
          <td>Twitter-specific optimization</td>
          <td>Use both OG + Twitter tags</td>
        </tr>
        <tr>
          <td>Different images per platform</td>
          <td>
Use
            <ContentContentInlineCode code="twitter:image" /> +
            <ContentContentInlineCode code="og:image" />
          </td>
        </tr>
      </tbody>
    </table>

    <h2 id="card-types">Twitter Card Types</h2>
    <p>
      Twitter supports several card types. Most websites use <strong>summary_large_image</strong>:
    </p>

    <h3>1. Summary Large Image (Recommended)</h3>
    <ContentContentCodeBlock :code="summaryLargeImageCode" language="html" />
    <ul>
      <li><strong>Use case:</strong> Blog posts, articles, products, landing pages</li>
      <li><strong>Image size:</strong> 1200×675px (16:9 aspect ratio)</li>
      <li><strong>Displays:</strong> Large image above title/description</li>
    </ul>

    <h3>2. Summary (Small Image)</h3>
    <ContentContentCodeBlock :code="summaryCardCode" language="html" />
    <ul>
      <li><strong>Use case:</strong> Text-focused content</li>
      <li><strong>Image size:</strong> 200×200px (1:1 square)</li>
      <li><strong>Displays:</strong> Small thumbnail on the right</li>
    </ul>

    <h2 id="implementation">Complete Implementation</h2>
    <p>
      Here's a complete Twitter Card implementation with both OG and Twitter tags:
    </p>

    <ContentContentCodeBlock :code="completeImplementationCode" language="html" />

    <h2 id="image-requirements">Twitter Card Image Requirements</h2>

    <h3>Summary Large Image</h3>
    <ul>
      <li><strong>Recommended:</strong> 1200×675px (16:9 ratio)</li>
      <li><strong>Alternative:</strong> 1200×628px also works well</li>
      <li><strong>Maximum size:</strong> 5MB</li>
      <li><strong>Minimum:</strong> 300×157px (not recommended)</li>
      <li><strong>Formats:</strong> JPG, PNG, WebP, GIF</li>
    </ul>

    <h3>Summary Card</h3>
    <ul>
      <li><strong>Recommended:</strong> 200×200px (1:1 square)</li>
      <li><strong>Maximum size:</strong> 5MB</li>
    </ul>

    <ContentContentCallout variant="warning" title="Twitter Image Gotchas" icon="i-heroicons-exclamation-triangle">
      <ul class="space-y-2 text-sm">
        <li>❌ 16:9 (1200×675px) is different from Facebook's 1.91:1 (1200×630px)</li>
        <li>❌ Must be under 5MB (stricter than Facebook's 8MB)</li>
        <li>❌ Animated GIFs only work for certain card types</li>
        <li>❌ Must use absolute HTTPS URLs</li>
      </ul>
    </ContentContentCallout>

    <h2 id="title-description">Title & Description Optimization</h2>

    <h3>Title Best Practices</h3>
    <ul>
      <li><strong>Length:</strong> 70 characters max (including spaces)</li>
      <li><strong>Be concise:</strong> Twitter's audience expects brevity</li>
      <li><strong>Front-load value:</strong> Put the hook at the start</li>
      <li><strong>Avoid emojis in tags:</strong> Add them in the tweet text instead</li>
    </ul>

    <h3>Description Best Practices</h3>
    <ul>
      <li><strong>Length:</strong> 200 characters max</li>
      <li><strong>Actually used:</strong> ~125 characters visible before truncation</li>
      <li><strong>Add urgency:</strong> Twitter moves fast—create FOMO</li>
      <li><strong>One clear CTA:</strong> What should they do after clicking?</li>
    </ul>

    <h2 id="debugging">Debugging Twitter Cards</h2>

    <h3>Twitter Card Validator</h3>
    <p>
      Use the <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card
        Validator</a>
      to:
    </p>
    <ul>
      <li>Preview how your card will look</li>
      <li>See which tags Twitter is reading</li>
      <li>Identify errors and warnings</li>
      <li>Force a cache refresh</li>
    </ul>

    <h3>Common Issues</h3>
    <table>
      <thead>
        <tr>
          <th>Problem</th>
          <th>Solution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Card not showing</td>
          <td>
Ensure
            <ContentContentInlineCode code="twitter:card" /> is set
          </td>
        </tr>
        <tr>
          <td>Wrong image displayed</td>
          <td>Clear cache, check image URL is absolute HTTPS</td>
        </tr>
        <tr>
          <td>"Unable to render"</td>
          <td>Image exceeds 5MB or wrong format</td>
        </tr>
        <tr>
          <td>Old preview showing</td>
          <td>Use validator to clear Twitter's cache</td>
        </tr>
      </tbody>
    </table>

    <h2 id="advanced">Advanced Twitter Card Features</h2>

    <h3>App Cards</h3>
    <p>
      For mobile apps, use app cards to drive installs:
    </p>
    <ContentContentCodeBlock :code="appCardCode" language="html" />

    <h3>Player Cards</h3>
    <p>
      For video/audio content, use player cards with embedded media:
    </p>
    <ContentContentCodeBlock :code="playerCardCode" language="html" />

    <h2 id="attribution">Author Attribution</h2>
    <p>
      Link your Twitter account to get attribution:
    </p>
    <ul>
      <li>
        <ContentContentInlineCode code="twitter:site" /> - Your brand's Twitter handle (@yourbrand)
      </li>
      <li>
        <ContentContentInlineCode code="twitter:creator" /> - Article author's handle (@authorname)
      </li>
    </ul>
    <p>
      This makes your handle clickable in the card and can drive follower growth.
    </p>

    <h2 id="framework-examples">Framework Implementation Examples</h2>

    <h3>Nuxt 3</h3>
    <ContentContentCodeBlock :code="nuxtExampleCode" language="javascript" />

    <h3>Next.js</h3>
    <ContentContentCodeBlock :code="nextjsExampleCode" language="javascript" />

    <h2 id="best-practices">Twitter-Specific Best Practices</h2>
    <ul>
      <li><strong>Match brand voice:</strong> Twitter's tone is more casual than LinkedIn</li>
      <li><strong>Test on mobile:</strong> 80%+ of Twitter users are on mobile</li>
      <li><strong>Use high contrast:</strong> Cards compete with fast-scrolling feeds</li>
      <li><strong>A/B test images:</strong> Small changes can 2-3x your CTR</li>
      <li><strong>Monitor analytics:</strong> Twitter provides link click data</li>
    </ul>

    <h2 id="resources">Additional Resources</h2>
    <ul>
      <li>
<a
href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards"
          target="_blank" rel="noopener">Twitter Cards Documentation</a>
</li>
      <li>
<a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a>
      </li>
      <li>
        <NuxtLink to="/guides/open-graph-preview">Complete Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/og-image-sizes">Image Size Guide</NuxtLink>
      </li>
    </ul>
  </LayoutsArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Twitter Card Preview Guide - X/Twitter OG Tag Optimization (2025)',
  description: 'Complete Twitter Card guide: Learn summary_large_image vs summary cards, image requirements (1200×675px), title/description best practices, and debugging with Card Validator.',
  keywords: 'twitter card preview, twitter card validator, twitter og tags, summary large image, twitter:card, twitter image size, x card preview, twitter meta tags',
  robots: 'index, follow',
  ogType: 'article'
})

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'Twitter Card Preview Guide',
    'description': 'Master Twitter Cards and optimize your link previews for X/Twitter',
    'datePublished': '2025-12-16',
    'articleSection': 'Social Media Marketing'
  }
])

const summaryLargeImageCode = `<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://example.com/twitter-image.jpg" />`

const summaryCardCode = `<meta name="twitter:card" content="summary" />`

const completeImplementationCode = `<head>
  <!-- Open Graph (fallback for all platforms) -->
  <meta property="og:title" content="10 Twitter Growth Strategies for 2025" />
  <meta property="og:description" content="Data-driven tactics to grow your Twitter following" />
  <meta property="og:image" content="https://example.com/og-image.jpg" />
  <meta property="og:url" content="https://example.com/twitter-guide" />

  <!-- Twitter Card Specific -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourusername" />
  <meta name="twitter:creator" content="@authorusername" />
  <meta name="twitter:title" content="10 Twitter Growth Strategies" />
  <meta name="twitter:description" content="Grow your following with proven tactics" />
  <meta name="twitter:image" content="https://example.com/twitter-1200x675.jpg" />
  <meta name="twitter:image:alt" content="Infographic showing Twitter growth stats" />
</head>`

const appCardCode = `<meta name="twitter:card" content="app" />
<meta name="twitter:app:id:iphone" content="Your_App_ID" />
<meta name="twitter:app:name:iphone" content="Your App Name" />`

const playerCardCode = `<meta name="twitter:card" content="player" />
<meta name="twitter:player" content="https://example.com/player.html" />
<meta name="twitter:player:width" content="1280" />
<meta name="twitter:player:height" content="720" />`

const nuxtExampleCode = `useSeoMeta({
  twitterCard: 'summary_large_image',
  twitterSite: '@yourusername',
  twitterCreator: '@authorname',
  twitterTitle: 'Your Title',
  twitterDescription: 'Your description',
  twitterImage: 'https://example.com/image.jpg',
  twitterImageAlt: 'Alt text'
})`

const nextjsExampleCode = `export const metadata = {
  twitter: {
    card: 'summary_large_image',
    site: '@yourusername',
    creator: '@authorname',
    title: 'Your Title',
    description: 'Your description',
    images: ['https://example.com/image.jpg']
  }
}`
</script>
