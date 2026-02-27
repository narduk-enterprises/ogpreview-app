<template>
  <ArticleLayout
title="Open Graph Image Size Guide"
    description="The complete reference for Open Graph image dimensions, aspect ratios, and file formats across all major social media platforms."
    :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '6 min read' }">
    <template #cta>
      <ContentCTA
title="Preview Your OG Images"
        description="See how your images look across Facebook, Twitter, LinkedIn, and 5 other platforms instantly."
        button-text="Try the Free Preview Tool" button-to="/" variant="purple" />
    </template>

    <h2 id="quick-answer">OG Image Dimensions: Quick Answer</h2>
    <p>
      <strong>OG image dimensions: The universal recommendation is 1200×630 pixels (1.91:1 aspect ratio).</strong> This size works optimally across Facebook, LinkedIn, Slack, Discord, Telegram, and most other platforms that support Open Graph.
    </p>

    <ContentCallout variant="info" title="Quick Reference: OG Image Size" icon="i-heroicons-light-bulb">
      <ul class="space-y-2 text-base leading-relaxed">
        <li>✅ <strong>Recommended size:</strong> 1200×630px (1.91:1 aspect ratio)</li>
        <li>✅ <strong>OG image width:</strong> 1200 pixels</li>
        <li>✅ <strong>OG image height:</strong> 630 pixels</li>
        <li>✅ <strong>File size:</strong> Keep under 5MB (ideally under 1MB)</li>
        <li>✅ <strong>Formats:</strong> JPG, PNG, or WebP</li>
      </ul>
    </ContentCallout>

    <h2 id="universal-recommendation">Universal Recommendation: 1200×630px</h2>
    <p>
      If you can only use one image size for all platforms, use <strong>1200×630 pixels (1.91:1 aspect ratio)</strong>.
      This
      dimension works optimally across Facebook, LinkedIn, Slack, Discord, Telegram, and most other platforms that support Open
      Graph.
    </p>

    <ContentCallout variant="info" title="Quick Tips" icon="i-heroicons-light-bulb">
      <ul class="space-y-2 text-base leading-relaxed">
        <li>✅ Use 1200×630px for maximum compatibility</li>
        <li>✅ Always use HTTPS URLs for images</li>
        <li>✅ Keep file size under 5MB (ideally under 1MB)</li>
        <li>✅ Use JPG or PNG format (WebP for modern platforms)</li>
      </ul>
    </ContentCallout>

    <h2 id="platform-specifications">Platform-Specific Image Sizes</h2>

    <PlatformSection
platform="Facebook" recommended-size="1200×630px (1.91:1)"
      minimum-size="200×200px (below this, images are rejected)" supports="JPG, PNG, WebP, GIF"
      notes="Images smaller than 600×315px display as a small thumbnail. Square images (1:1) also display smaller." />

    <PlatformSection
platform="Twitter" recommended-size="1200×628px (1.91:1) for summary_large_image"
      minimum-size="120×120px (1:1, up to 4096×4096px) for summary card" supports="JPG, PNG, WebP, GIF">
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Twitter uses its own
        <ContentInlineCode code="twitter:card" /> meta tags but falls back to OG tags.
      </p>
      <ContentCodeBlock :code="twitterCardCode" language="html" />
    </PlatformSection>

    <PlatformSection
platform="LinkedIn" recommended-size="1200×627px (1.91:1)" minimum-size="200×200px"
      supports="JPG, PNG"
      notes="LinkedIn's algorithm favors high-quality, professional imagery. Avoid overly promotional or low-contrast images." />

    <PlatformSection
platform="Slack" recommended-size="1200×630px (1.91:1)" minimum-size="200×200px"
      supports="JPG, PNG, GIF" notes="Max width 400px in unfurls" />

    <PlatformSection
platform="Discord" recommended-size="1200×630px (1.91:1)"
      minimum-size="400×300px for full embeds" supports="JPG, PNG, WebP, GIF" />

    <PlatformSection
platform="WhatsApp" recommended-size="1200×630px (1.91:1)" supports="JPG, PNG"
      notes="Maximum 300KB file size (strictly enforced). Compress images aggressively while maintaining quality." />

    <PlatformSection platform="Telegram" recommended-size="1200×630px (1.91:1)" supports="JPG, PNG, WebP" />

    <PlatformSection
platform="iMessage" recommended-size="1200×630px (1.91:1)" minimum-size="400×300px"
      supports="JPG, PNG" />

    <h2 id="comparison-table">Quick Reference Table</h2>
    <div class="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Optimal Size</th>
            <th>Min Size</th>
            <th>Max File Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Facebook</td>
            <td>1200×630px</td>
            <td>200×200px</td>
            <td>8MB</td>
          </tr>
          <tr>
            <td>Twitter/X</td>
            <td>1200×628px</td>
            <td>120×120px</td>
            <td>5MB</td>
          </tr>
          <tr>
            <td>LinkedIn</td>
            <td>1200×627px</td>
            <td>200×200px</td>
            <td>5MB</td>
          </tr>
          <tr>
            <td>Slack</td>
            <td>1200×630px</td>
            <td>200×200px</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Discord</td>
            <td>1200×630px</td>
            <td>400×300px</td>
            <td>10MB</td>
          </tr>
          <tr>
            <td>WhatsApp</td>
            <td>1200×630px</td>
            <td>—</td>
            <td>300KB</td>
          </tr>
          <tr>
            <td>Telegram</td>
            <td>1200×630px</td>
            <td>200×200px</td>
            <td>5MB</td>
          </tr>
          <tr>
            <td>iMessage</td>
            <td>1200×630px</td>
            <td>400×300px</td>
            <td>5MB</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="aspect-ratios">Understanding Aspect Ratios</h2>
    <p>
      Different aspect ratios serve different purposes:
    </p>

    <h3>1.91:1 (1200×630) - Wide Format</h3>
    <ul>
      <li>✅ Best for landscape/hero images</li>
      <li>✅ Maximum visual impact on most platforms</li>
      <li>✅ Works for article headers and banners</li>
      <li>❌ May crop content on Twitter's summary card</li>
    </ul>

    <h3>1:1 (1200×1200) - Square Format</h3>
    <ul>
      <li>✅ Works well on Instagram and Pinterest</li>
      <li>✅ Good for profile pictures and logos</li>
      <li>❌ Shows as smaller thumbnail on Facebook</li>
      <li>❌ Less engaging on LinkedIn</li>
    </ul>

    <h3>2:1 (1200×600) - Extra Wide</h3>
    <ul>
      <li>✅ Cinematic look</li>
      <li>❌ May get cropped on some platforms</li>
    </ul>

    <h2 id="image-optimization">Image Optimization Best Practices</h2>

    <h3>File Format Selection</h3>
    <ul>
      <li><strong>JPG:</strong> Best for photos and complex images (use 80-85% quality)</li>
      <li><strong>PNG:</strong> Best for graphics with text, logos, or transparency needs</li>
      <li><strong>WebP:</strong> Modern format with better compression (30% smaller than JPG)</li>
      <li><strong>GIF:</strong> Only for animations (use sparingly, large file sizes)</li>
    </ul>

    <h3>Compression Tips</h3>
    <ol>
      <li>Use tools like TinyPNG, ImageOptim, or Squoosh.app</li>
      <li>Target 80-85% quality for JPGs (visually lossless)</li>
      <li>Remove metadata/EXIF data to save bytes</li>
      <li>Use progressive JPGs for faster perceived loading</li>
      <li>Test with different formats to find the smallest file size</li>
    </ol>

    <h3>Design Considerations</h3>
    <ul>
      <li><strong>Safe zone:</strong> Keep important elements in the center 80% (platforms crop differently)</li>
      <li><strong>Text size:</strong> Minimum 40px font size for mobile readability</li>
      <li><strong>Contrast:</strong> Use high contrast for readability on all devices</li>
      <li><strong>Avoid edges:</strong> Don't place critical content within 50px of edges</li>
      <li><strong>Brand consistency:</strong> Use consistent colors and style across all OG images</li>
    </ul>

    <ContentCallout variant="warning" title="Common Mistakes to Avoid" icon="i-heroicons-exclamation-triangle">
      <ul class="space-y-2 text-sm">
        <li>❌ Using images smaller than 200×200px</li>
        <li>❌ Exceeding platform file size limits (especially WhatsApp's 300KB)</li>
        <li>❌ Using HTTP instead of HTTPS</li>
        <li>
❌ Relative image URLs like
          <ContentInlineCode code="/images/og.jpg" />
        </li>
        <li>❌ Putting critical text near image edges</li>
        <li>❌ Using low-contrast colors that don't work in dark mode</li>
      </ul>
    </ContentCallout>

    <h2 id="dynamic-images">Dynamic OG Images</h2>
    <p>
      For dynamic content (blog posts, product pages), consider generating OG images programmatically:
    </p>

    <h3>Tools for Dynamic Images</h3>
    <ul>
      <li><strong>Cloudinary:</strong> On-the-fly image transformations with text overlays</li>
      <li><strong>ImageKit:</strong> URL-based image manipulation</li>
      <li><strong>Vercel OG Image:</strong> Serverless function for generating images with React/JSX</li>
      <li><strong>Puppeteer/Playwright:</strong> Headless browser screenshots of HTML templates</li>
      <li><strong>Canvas/Sharp (Node.js):</strong> Server-side image generation libraries</li>
    </ul>

    <h3>Dynamic Image Benefits</h3>
    <ul>
      <li>✅ Automatic updates when content changes</li>
      <li>✅ Consistent branding across all pages</li>
      <li>✅ Personalization (author names, dates, categories)</li>
      <li>✅ No manual design work for each post</li>
    </ul>

    <h2 id="testing">Testing Your Images</h2>
    <p>
      Always test your OG images across multiple platforms:
    </p>

    <ol>
      <li>
<strong>Use our tool:</strong>
        <NuxtLink to="/" class="font-semibold">OG Preview Tool</NuxtLink> to see all platforms at once
      </li>
      <li>
<strong>Facebook Debugger:</strong> <a
href="https://developers.facebook.com/tools/debug/" target="_blank"
          rel="noopener">developers.facebook.com/tools/debug</a>
</li>
      <li>
<strong>Twitter Card Validator:</strong> <a
href="https://cards-dev.twitter.com/validator" target="_blank"
          rel="noopener">cards-dev.twitter.com/validator</a>
</li>
      <li>
<strong>LinkedIn Inspector:</strong> <a
href="https://www.linkedin.com/post-inspector/" target="_blank"
          rel="noopener">linkedin.com/post-inspector</a>
</li>
      <li><strong>Real shares:</strong> Test with actual shares on each platform</li>
    </ol>

    <h2 id="performance">Performance Considerations</h2>
    <ul>
      <li><strong>CDN hosting:</strong> Use a CDN to ensure fast global delivery</li>
      <li><strong>Cache headers:</strong> Set long cache times (1 year+) for static images</li>
      <li>
<strong>Lazy loading:</strong> OG images don't need lazy loading (they're in
        <ContentInlineCode code="&lt;head&gt;" />)
      </li>
      <li><strong>Responsive images:</strong> Not needed for OG tags (platforms fetch one size)</li>
      <li><strong>Preconnect:</strong> Add DNS preconnect to your image CDN</li>
    </ul>

    <h2 id="faq">Frequently Asked Questions</h2>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What are the OG image dimensions?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The recommended OG image dimensions are <strong>1200×630 pixels (1.91:1 aspect ratio)</strong>. This size works optimally across Facebook, Twitter, LinkedIn, Slack, Discord, Telegram, and most other platforms that support Open Graph.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What is the recommended OG image size?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The recommended OG image size is <strong>1200×630 pixels</strong>. This creates a 1.91:1 aspect ratio that displays perfectly on most social media platforms. For file size, keep images under 5MB (ideally under 1MB for faster loading).
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What is the OG image width?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The recommended OG image width is <strong>1200 pixels</strong>. When combined with a height of 630 pixels, this creates the optimal 1.91:1 aspect ratio for social media link previews. The width should always be greater than the height for best results.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What are the OG image dimensions for Facebook?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        Facebook's recommended OG image dimensions are <strong>1200×630 pixels (1.91:1 aspect ratio)</strong>. The minimum size is 200×200 pixels, but images smaller than 600×315px will display as small thumbnails. Maximum file size is 8MB.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What is the OG image size limit?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        OG image size limits vary by platform: Facebook (8MB), Twitter (5MB), LinkedIn (5MB), Telegram (5MB), Discord (10MB), and WhatsApp (300KB - the strictest). For best compatibility, keep file sizes under 5MB, ideally under 1MB for faster loading.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What is the ideal OG image size?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The ideal OG image size is <strong>1200×630 pixels</strong> with a file size under 1MB. This provides high-quality display across all platforms while ensuring fast loading times. Use JPG format at 80-85% quality or WebP for better compression.
      </p>
    </details>

    <h2 id="resources">Additional Resources</h2>
    <ul>
      <li>
        <NuxtLink to="/guides/telegram-og-image" class="font-semibold">Telegram OG Image Size Guide</NuxtLink> - Complete Telegram requirements
      </li>
      <li>
        <NuxtLink to="/guides/facebook-link-preview">Facebook Link Preview Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/twitter-card-preview">Twitter Card Preview Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/linkedin-link-preview">LinkedIn Link Preview Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/og-cache-refresh">How to Refresh OG Cache</NuxtLink>
      </li>
      <li><a href="https://ogp.me/" target="_blank" rel="noopener">Official Open Graph Protocol</a></li>
    </ul>
  </ArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'OG Image Size & Dimensions Guide - Complete Reference for All Platforms',
  description: 'OG image dimensions: 1200×630px recommended. Complete guide to OG image sizes for Facebook, Twitter, LinkedIn, Telegram, and all platforms. Includes aspect ratios, file formats, and optimization tips.',
  keywords: 'og image dimensions, og image size, og image width, og:image size, open graph image dimensions, facebook og image size, twitter card image size, linkedin og image, og:image dimensions, social media image sizes, ideal og image size',
  robots: 'index, follow',
  ogTitle: 'OG Image Size & Dimensions Guide - Complete Reference for All Platforms',
  ogDescription: 'OG image dimensions: 1200×630px recommended. Complete guide to OG image sizes for Facebook, Twitter, LinkedIn, Telegram, and all platforms. Includes optimization tips and best practices.',
  ogType: 'article'
})

const faqs = [
  {
    question: 'What are the OG image dimensions?',
    answer: 'The recommended OG image dimensions are 1200×630 pixels (1.91:1 aspect ratio). This size works optimally across Facebook, Twitter, LinkedIn, Slack, Discord, Telegram, and most other platforms that support Open Graph.'
  },
  {
    question: 'What is the recommended OG image size?',
    answer: 'The recommended OG image size is 1200×630 pixels. This creates a 1.91:1 aspect ratio that displays perfectly on most social media platforms. For file size, keep images under 5MB (ideally under 1MB for faster loading).'
  },
  {
    question: 'What is the OG image width?',
    answer: 'The recommended OG image width is 1200 pixels. When combined with a height of 630 pixels, this creates the optimal 1.91:1 aspect ratio for social media link previews. The width should always be greater than the height for best results.'
  },
  {
    question: 'What are the OG image dimensions for Facebook?',
    answer: 'Facebook\'s recommended OG image dimensions are 1200×630 pixels (1.91:1 aspect ratio). The minimum size is 200×200 pixels, but images smaller than 600×315px will display as small thumbnails. Maximum file size is 8MB.'
  },
  {
    question: 'What is the OG image size limit?',
    answer: 'OG image size limits vary by platform: Facebook (8MB), Twitter (5MB), LinkedIn (5MB), Telegram (5MB), Discord (10MB), and WhatsApp (300KB - the strictest). For best compatibility, keep file sizes under 5MB, ideally under 1MB for faster loading.'
  },
  {
    question: 'What is the ideal OG image size?',
    answer: 'The ideal OG image size is 1200×630 pixels with a file size under 1MB. This provides high-quality display across all platforms while ensuring fast loading times. Use JPG format at 80-85% quality or WebP for better compression.'
  }
]

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'Open Graph Image Size Guide',
    'description': 'Complete guide to Open Graph image dimensions and requirements for all major platforms',
    'author': {
      '@type': 'Organization',
      'name': 'ogpreview.app'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'ogpreview.app',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ogpreview.app/logo.svg'
      }
    },
    'datePublished': '2025-12-16',
    'dateModified': new Date().toISOString().split('T')[0],
    'articleSection': 'Technical Guide'
  },
  {
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
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
        'name': 'Guides',
        'item': 'https://ogpreview.app/guides'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'OG Image Size Guide',
        'item': 'https://ogpreview.app/guides/og-image-sizes'
      }
    ]
  }
])

const twitterCardCode = `<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://example.com/twitter.jpg" />`
</script>
