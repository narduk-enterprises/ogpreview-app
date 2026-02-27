<template>
  <ArticleLayout
title="Telegram OG Image Size Limit & Requirements"
    description="Complete guide to Telegram Open Graph image size limits, maximum file size (5MB), recommended dimensions (1200×630px), and optimization tips for perfect Telegram link previews."
    :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '5 min read' }"
    platform-icon="Telegram">
    <template #cta>
      <ContentCTA
title="Preview Your Telegram OG Images"
        description="See how your images look on Telegram and 7 other platforms instantly with our free preview tool."
        button-text="Try the Free Preview Tool" button-to="/" variant="purple" />
    </template>

    <template #related>
      <div class="not-prose mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Related Guides
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <NuxtLink
            to="/guides/og-image-sizes"
            class="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              OG Image Size Guide
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Complete reference for image dimensions across all platforms
            </p>
          </NuxtLink>
          <NuxtLink
            to="/guides/og-cache-refresh"
            class="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              How to Refresh OG Cache
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Force Telegram and other platforms to update cached OG tags
            </p>
          </NuxtLink>
        </div>
      </div>
    </template>

    <h2 id="quick-answer">Telegram OG Image Size Limit: Quick Answer</h2>
    <p>
      <strong>Telegram's maximum OG image file size is 5MB.</strong> The recommended dimensions are <strong>1200×630 pixels (1.91:1 aspect ratio)</strong>. Telegram supports JPG, PNG, and WebP formats.
    </p>

    <ContentCallout variant="info" title="Key Telegram OG Image Requirements" icon="i-heroicons-light-bulb">
      <ul class="space-y-2 text-base leading-relaxed">
        <li>✅ Maximum file size: <strong>5MB</strong></li>
        <li>✅ Recommended dimensions: <strong>1200×630px</strong></li>
        <li>✅ Supported formats: <strong>JPG, PNG, WebP</strong></li>
        <li>✅ Always use <strong>HTTPS URLs</strong> for images</li>
        <li>✅ Use <strong>absolute URLs</strong> (not relative paths)</li>
      </ul>
    </ContentCallout>

    <h2 id="file-size-limit">Telegram OG Image Maximum File Size</h2>
    <p>
      Telegram enforces a <strong>5MB maximum file size limit</strong> for Open Graph images. This is more generous than WhatsApp's 300KB limit but stricter than Facebook's 8MB or Discord's 10MB limits.
    </p>

    <h3>Why File Size Matters</h3>
    <ul>
      <li><strong>Loading speed:</strong> Smaller files load faster, improving user experience</li>
      <li><strong>Mobile data:</strong> Users on mobile networks appreciate smaller file sizes</li>
      <li><strong>Platform limits:</strong> Exceeding 5MB will cause Telegram to reject or compress your image</li>
      <li><strong>Quality vs. size:</strong> Well-optimized images can maintain quality while staying under the limit</li>
    </ul>

    <h3>Optimizing File Size for Telegram</h3>
    <ol>
      <li><strong>Use appropriate format:</strong> JPG for photos (80-85% quality), PNG for graphics with text, WebP for modern compression</li>
      <li><strong>Compress images:</strong> Use tools like TinyPNG, ImageOptim, or Squoosh.app</li>
      <li><strong>Remove metadata:</strong> Strip EXIF data to save bytes</li>
      <li><strong>Target dimensions:</strong> Use 1200×630px - larger images don't improve quality but increase file size</li>
      <li><strong>Test compression:</strong> Find the balance between quality and file size</li>
    </ol>

    <ContentCallout variant="warning" title="Common File Size Mistakes" icon="i-heroicons-exclamation-triangle">
      <ul class="space-y-2 text-sm">
        <li>❌ Using uncompressed images (can easily exceed 5MB)</li>
        <li>❌ Including unnecessary metadata in images</li>
        <li>❌ Using dimensions larger than 1200×630px (wastes bandwidth)</li>
        <li>❌ Not testing file size before publishing</li>
      </ul>
    </ContentCallout>

    <h2 id="recommended-dimensions">Recommended Telegram OG Image Dimensions</h2>
    <p>
      The <strong>recommended dimensions for Telegram OG images are 1200×630 pixels</strong>, which creates a 1.91:1 aspect ratio. This is the same universal recommendation used by Facebook, LinkedIn, Slack, and most other platforms.
    </p>

    <h3>Why 1200×630px?</h3>
    <ul>
      <li>✅ <strong>Universal compatibility:</strong> Works perfectly across all major platforms</li>
      <li>✅ <strong>High quality:</strong> Provides crisp display on both desktop and mobile</li>
      <li>✅ <strong>Optimal aspect ratio:</strong> 1.91:1 is ideal for link previews</li>
      <li>✅ <strong>Efficient file size:</strong> Large enough for quality, small enough for fast loading</li>
    </ul>

    <h3>Minimum Dimensions</h3>
    <p>
      While Telegram doesn't specify a strict minimum, images smaller than <strong>200×200 pixels</strong> may appear pixelated or be rejected. For best results, use at least <strong>600×315 pixels</strong>.
    </p>

    <h2 id="supported-formats">Supported Image Formats</h2>
    <p>
      Telegram supports three image formats for Open Graph images:
    </p>

    <h3>JPG (JPEG)</h3>
    <ul>
      <li>✅ Best for: Photos and complex images with many colors</li>
      <li>✅ Compression: Good balance of quality and file size</li>
      <li>✅ Recommendation: Use 80-85% quality for optimal results</li>
    </ul>

    <h3>PNG</h3>
    <ul>
      <li>✅ Best for: Graphics with text, logos, or images requiring transparency</li>
      <li>✅ Compression: Lossless but larger file sizes</li>
      <li>✅ Recommendation: Use for graphics, compress with tools like TinyPNG</li>
    </ul>

    <h3>WebP</h3>
    <ul>
      <li>✅ Best for: Modern browsers and platforms (Telegram supports it)</li>
      <li>✅ Compression: 30% smaller than JPG with same quality</li>
      <li>✅ Recommendation: Use for maximum compression while maintaining quality</li>
    </ul>

    <h2 id="optimization-tips">Telegram OG Image Optimization Tips</h2>

    <h3>Technical Requirements</h3>
    <ul>
      <li><strong>Absolute URLs:</strong> Always use full HTTPS URLs like <code>https://example.com/image.jpg</code></li>
      <li><strong>HTTPS required:</strong> Telegram requires secure image URLs</li>
      <li><strong>Accessible images:</strong> Images must be publicly accessible (no authentication required)</li>
      <li><strong>Fast loading:</strong> Use CDN hosting for global delivery</li>
    </ul>

    <h3>Design Best Practices</h3>
    <ul>
      <li><strong>Safe zone:</strong> Keep important content in the center 80% (Telegram may crop edges)</li>
      <li><strong>Text size:</strong> Use minimum 40px font size for readability on mobile</li>
      <li><strong>High contrast:</strong> Ensure text and graphics are visible in both light and dark Telegram themes</li>
      <li><strong>Brand consistency:</strong> Use consistent colors and style across all OG images</li>
      <li><strong>Mobile-first:</strong> Many Telegram users view on mobile - design accordingly</li>
    </ul>

    <h2 id="common-errors">Common Telegram OG Image Errors</h2>

    <h3>1. File Size Exceeds 5MB</h3>
    <p>
      <strong>Problem:</strong> Image file is larger than Telegram's 5MB limit.
    </p>
    <p>
      <strong>Solution:</strong> Compress the image using tools like TinyPNG or ImageOptim. Reduce quality slightly or convert to WebP format.
    </p>

    <h3>2. Relative Image URLs</h3>
    <p>
      <strong>Problem:</strong> Using relative paths like <code>/images/og.jpg</code> instead of absolute URLs.
    </p>
    <p>
      <strong>Solution:</strong> Always use absolute HTTPS URLs: <code>https://example.com/images/og.jpg</code>
    </p>

    <h3>3. HTTP Instead of HTTPS</h3>
    <p>
      <strong>Problem:</strong> Image URL uses HTTP protocol instead of HTTPS.
    </p>
    <p>
      <strong>Solution:</strong> Ensure all image URLs use HTTPS. Telegram requires secure connections.
    </p>

    <h3>4. Images Behind Authentication</h3>
    <p>
      <strong>Problem:</strong> Image requires login or is blocked by robots.txt.
    </p>
    <p>
      <strong>Solution:</strong> Make OG images publicly accessible. Don't require authentication to view them.
    </p>

    <h3>5. Slow-Loading Images</h3>
    <p>
      <strong>Problem:</strong> Images take too long to load (timeout after 10 seconds).
    </p>
    <p>
      <strong>Solution:</strong> Use CDN hosting, optimize file size, and ensure fast server response times.
    </p>

    <h2 id="testing">Testing Your Telegram OG Images</h2>
    <p>
      Always test your Telegram OG images before publishing:
    </p>

    <ol>
      <li>
        <strong>Use our tool:</strong> <NuxtLink to="/" class="font-semibold">OG Preview Tool</NuxtLink> to see how your image appears on Telegram
      </li>
      <li>
        <strong>Telegram Instant View Bot:</strong> Send your URL to <strong>@WebpageBot</strong> in Telegram to preview and refresh cache
      </li>
      <li>
        <strong>Real shares:</strong> Test with actual shares in Telegram chats or channels
      </li>
      <li>
        <strong>File size check:</strong> Verify image is under 5MB using file properties or online tools
      </li>
      <li>
        <strong>Format validation:</strong> Ensure image is JPG, PNG, or WebP format
      </li>
    </ol>

    <h2 id="comparison">Telegram vs. Other Platforms</h2>
    <div class="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Max File Size</th>
            <th>Recommended Size</th>
            <th>Formats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Telegram</strong></td>
            <td>5MB</td>
            <td>1200×630px</td>
            <td>JPG, PNG, WebP</td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td>8MB</td>
            <td>1200×630px</td>
            <td>JPG, PNG, WebP, GIF</td>
          </tr>
          <tr>
            <td>Twitter/X</td>
            <td>5MB</td>
            <td>1200×628px</td>
            <td>JPG, PNG, WebP, GIF</td>
          </tr>
          <tr>
            <td>LinkedIn</td>
            <td>5MB</td>
            <td>1200×627px</td>
            <td>JPG, PNG</td>
          </tr>
          <tr>
            <td>WhatsApp</td>
            <td>300KB</td>
            <td>1200×630px</td>
            <td>JPG, PNG</td>
          </tr>
          <tr>
            <td>Discord</td>
            <td>10MB</td>
            <td>1200×630px</td>
            <td>JPG, PNG, WebP, GIF</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="faq">Frequently Asked Questions</h2>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What is the Telegram OG image size limit?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The Telegram OG image size limit is <strong>5MB maximum file size</strong>. The recommended dimensions are <strong>1200×630 pixels (1.91:1 aspect ratio)</strong>. This size works optimally across Telegram and most other social media platforms.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What is the maximum file size for Telegram OG images?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The maximum file size for Telegram OG images is <strong>5MB</strong>. This applies to the actual file size, not the image dimensions. To stay under this limit, compress your images using tools like TinyPNG or ImageOptim, and consider using WebP format for better compression.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What are the recommended Telegram OG image dimensions?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        The recommended Telegram OG image dimensions are <strong>1200×630 pixels</strong>, which creates a 1.91:1 aspect ratio. This size provides high-quality display on both desktop and mobile Telegram clients while maintaining efficient file sizes.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        What formats does Telegram support for OG images?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        Telegram supports three image formats for OG images: <strong>JPG (JPEG)</strong>, <strong>PNG</strong>, and <strong>WebP</strong>. JPG is best for photos, PNG for graphics with text or transparency, and WebP offers the best compression (30% smaller than JPG with same quality).
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        How do I optimize my image for Telegram's 5MB limit?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        To optimize for Telegram's 5MB limit: (1) Use 1200×630px dimensions (larger doesn't improve quality), (2) Compress with tools like TinyPNG or ImageOptim, (3) Use WebP format for better compression, (4) Remove EXIF metadata, (5) Target 80-85% quality for JPGs. Most well-optimized images will be under 1MB.
      </p>
    </details>

    <details class="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <summary class="font-semibold text-gray-900 dark:text-white cursor-pointer">
        Why isn't my Telegram OG image showing?
      </summary>
      <p class="mt-3 text-gray-700 dark:text-gray-300">
        Common reasons: (1) File size exceeds 5MB, (2) Using HTTP instead of HTTPS, (3) Relative URL instead of absolute URL, (4) Image requires authentication, (5) Slow loading (timeout), (6) Cache issues. Use Telegram's @WebpageBot to refresh the cache and preview your OG tags.
      </p>
    </details>

    <h2 id="resources">Additional Resources</h2>
    <ul>
      <li>
        <NuxtLink to="/guides/og-image-sizes" class="font-semibold">Complete OG Image Size Guide</NuxtLink> - Dimensions for all platforms
      </li>
      <li>
        <NuxtLink to="/guides/og-cache-refresh" class="font-semibold">How to Refresh OG Cache</NuxtLink> - Force Telegram to update cached images
      </li>
      <li>
        <NuxtLink to="/" class="font-semibold">OG Preview Tool</NuxtLink> - Test your Telegram OG images instantly
      </li>
      <li><a href="https://core.telegram.org/bots/api#getwebhookinfo" target="_blank" rel="noopener">Telegram Bot API Documentation</a></li>
    </ul>
  </ArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Telegram OG Image Size Limit: Maximum File Size & Dimensions Guide',
  description: 'Telegram OG image size limit is 5MB. Recommended dimensions: 1200×630px. Complete guide to Telegram Open Graph image requirements, formats, and optimization tips.',
  keywords: 'telegram og:image size limit, telegram og:image maximum file size, telegram og image dimensions, telegram open graph image size, telegram og image requirements, telegram link preview image size',
  robots: 'index, follow',
  ogTitle: 'Telegram OG Image Size Limit: Maximum File Size & Dimensions Guide',
  ogDescription: 'Telegram OG image size limit is 5MB. Recommended dimensions: 1200×630px. Complete guide to Telegram Open Graph image requirements, formats, and optimization tips.',
  ogType: 'article'
})

const faqs = [
  {
    question: 'What is the Telegram OG image size limit?',
    answer: 'The Telegram OG image size limit is 5MB maximum file size. The recommended dimensions are 1200×630 pixels (1.91:1 aspect ratio). This size works optimally across Telegram and most other social media platforms.'
  },
  {
    question: 'What is the maximum file size for Telegram OG images?',
    answer: 'The maximum file size for Telegram OG images is 5MB. This applies to the actual file size, not the image dimensions. To stay under this limit, compress your images using tools like TinyPNG or ImageOptim, and consider using WebP format for better compression.'
  },
  {
    question: 'What are the recommended Telegram OG image dimensions?',
    answer: 'The recommended Telegram OG image dimensions are 1200×630 pixels, which creates a 1.91:1 aspect ratio. This size provides high-quality display on both desktop and mobile Telegram clients while maintaining efficient file sizes.'
  },
  {
    question: 'What formats does Telegram support for OG images?',
    answer: 'Telegram supports three image formats for OG images: JPG (JPEG), PNG, and WebP. JPG is best for photos, PNG for graphics with text or transparency, and WebP offers the best compression (30% smaller than JPG with same quality).'
  },
  {
    question: 'How do I optimize my image for Telegram\'s 5MB limit?',
    answer: 'To optimize for Telegram\'s 5MB limit: (1) Use 1200×630px dimensions (larger doesn\'t improve quality), (2) Compress with tools like TinyPNG or ImageOptim, (3) Use WebP format for better compression, (4) Remove EXIF metadata, (5) Target 80-85% quality for JPGs. Most well-optimized images will be under 1MB.'
  },
  {
    question: 'Why isn\'t my Telegram OG image showing?',
    answer: 'Common reasons: (1) File size exceeds 5MB, (2) Using HTTP instead of HTTPS, (3) Relative URL instead of absolute URL, (4) Image requires authentication, (5) Slow loading (timeout), (6) Cache issues. Use Telegram\'s @WebpageBot to refresh the cache and preview your OG tags.'
  }
]

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'Telegram OG Image Size Limit & Requirements',
    'description': 'Complete guide to Telegram Open Graph image size limits, maximum file size (5MB), recommended dimensions (1200×630px), and optimization tips',
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
        'name': 'Telegram OG Image Guide',
        'item': 'https://ogpreview.app/guides/telegram-og-image'
      }
    ]
  }
])
</script>

