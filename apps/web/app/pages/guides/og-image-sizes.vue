<script setup lang="ts">
/* eslint-disable atx/lucide-icons-only */
useSeoMeta({
  title: 'OG Image Size & Dimensions Guide (2026 Reference)',
  description: 'The definitive cheat sheet for Open Graph image dimensions. Get exact pixel sizes, aspect ratios, and compression limits for Facebook, Twitter, Slack, and Discord.',
  keywords: 'og image dimensions, og image size, facebook og image size, twitter card image size, linkedin og image, og:image dimensions, social media image sizes, ideal og image size',
  robots: 'index, follow',
  ogTitle: 'OG Image Size Master Reference',
  ogDescription: 'Stop guessing what size your previews should be. Check the universal 1200x630 pixel breakdown.',
  ogType: 'article'
})

const platformSpecs = [
  { name: 'Facebook', icon: 'i-simple-icons-facebook', colorClass: 'text-blue-600', optimal: '1200x630px', ratio: '1.91:1', maxSize: '8MB' },
  { name: 'X / Twitter', icon: 'i-simple-icons-x', colorClass: 'text-zinc-900 dark:text-white', optimal: '1200x600px', ratio: '2:1', maxSize: '5MB' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', colorClass: 'text-blue-700', optimal: '1200x627px', ratio: '1.91:1', maxSize: '5MB' },
  { name: 'Slack', icon: 'i-simple-icons-slack', colorClass: 'text-purple-600', optimal: '1200x630px', ratio: '1.91:1', maxSize: '12MB' },
  { name: 'Discord', icon: 'i-simple-icons-discord', colorClass: 'text-indigo-500', optimal: '1200x630px', ratio: '1.91:1', maxSize: '10MB' },
  { name: 'WhatsApp', icon: 'i-simple-icons-whatsapp', colorClass: 'text-green-500', optimal: '1200x630px', ratio: '1.91:1', maxSize: '300KB (Critical)' }
]
</script>

<template>
  <LayoutsArticleLayout
    title="Open Graph Image Size Guide 2026"
    description="The complete reference for Open Graph image dimensions, aspect ratios, and file formats across all major social media platforms. Stop guessing sizes."
    :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Preview Your OG Images"
        description="See how your images look across Facebook, Twitter, LinkedIn, and 5 other platforms instantly."
        button-text="Try the Free Preview Tool" 
        button-to="/" 
        variant="purple" 
      />
    </template>

    <ContentCallout variant="info" title="The Universal Golden Rule" icon="i-lucide-star">
      If you can only build ONE image for your website, make it <strong>1200×630px</strong>. Keep the file size under <strong>1MB</strong> and save it as a <strong>JPG or WebP</strong>. This satisfies 95% of all social platforms.
    </ContentCallout>

    <!-- Platform Specs Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Platform Cheat Sheet</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard v-for="platform in platformSpecs" :key="platform.name">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <UIcon :name="platform.icon" :class="platform.colorClass" class="w-6 h-6" />
              <h3 class="font-bold text-primary dark:text-white">{{ platform.name }}</h3>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between border-b border-default dark:border-default pb-1">
              <span class="text-muted">Optimal</span>
              <span class="font-mono text-primary dark:text-white">{{ platform.optimal }}</span>
            </div>
            <div class="flex justify-between border-b border-default dark:border-default pb-1">
              <span class="text-muted">Ratio</span>
              <span class="font-mono text-primary dark:text-white">{{ platform.ratio }}</span>
            </div>
            <div class="flex justify-between pb-1">
              <span class="text-muted">Max Size</span>
              <span class="font-mono text-primary dark:text-white">{{ platform.maxSize }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Aspect Ratio Masterclass</h2>
    
    <div class="space-y-6">
      <div class="bg-muted dark:bg-elevated/50 rounded-xl p-6 border border-default dark:border-default">
        <h3 class="text-lg font-bold text-primary dark:text-white mb-2">1.91:1 (The Standard Wrapper)</h3>
        <p class="text-muted dark:text-dimmed mb-4">The golden mathematical ratio used by Facebook, LinkedIn, Discord, and Slack. It's wide enough to look cinematic but tall enough to fit text.</p>
        <ul class="flex gap-4 text-sm font-mono text-muted">
          <li class="px-3 py-1 bg-white dark:bg-elevated rounded border border-default dark:border-default">1200x630</li>
          <li class="px-3 py-1 bg-white dark:bg-elevated rounded border border-default dark:border-default">600x315</li>
        </ul>
      </div>

      <div class="bg-muted dark:bg-elevated/50 rounded-xl p-6 border border-default dark:border-default">
        <h3 class="text-lg font-bold text-primary dark:text-white mb-2">2:1 (The Twitter/X Card)</h3>
        <p class="text-muted dark:text-dimmed mb-4">Twitter uniquely uses an exact 2:1 rectangle. If you supply a 1.91:1 standard image, Twitter will razor-crop a tiny sliver off the top and bottom. <strong>Keep text away from the absolute edges.</strong></p>
        <ul class="flex gap-4 text-sm font-mono text-muted">
          <li class="px-3 py-1 bg-white dark:bg-elevated rounded border border-default dark:border-default">1200x600</li>
          <li class="px-3 py-1 bg-white dark:bg-elevated rounded border border-default dark:border-default">800x400</li>
        </ul>
      </div>

      <div class="bg-muted dark:bg-elevated/50 rounded-xl p-6 border border-default dark:border-default">
        <h3 class="text-lg font-bold text-primary dark:text-white mb-2">1:1 (The Messenger Square)</h3>
        <p class="text-muted dark:text-dimmed mb-4">Used specifically by WhatsApp (without high-res enabled), iMessage thumbnails, and older summary-card implementations. If an image is too small to render wide, platforms fallback to cropping the dead-center square.</p>
      </div>
    </div>

    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Optimization Checklist</h2>
      <UCard>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-muted shrink-0" />
            <div>
              <strong class="text-primary dark:text-white block">Absolute URLs Only</strong>
              <span class="text-sm text-muted dark:text-dimmed">Never use relative paths (<code>/images/og.jpg</code>). Slack and Facebook crawlers will instantly fail. Use <code>https://yourdomain.com/images/og.jpg</code>.</span>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-muted shrink-0" />
            <div>
              <strong class="text-primary dark:text-white block">Explicit Dimensions</strong>
              <span class="text-sm text-muted dark:text-dimmed">Hardcode <code>og:image:width</code> and <code>og:image:height</code> tags. This prevents Facebook from having to parse your image asynchronously, ensuring it previews on the very first share.</span>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-muted shrink-0" />
            <div>
              <strong class="text-primary dark:text-white block">WhatsApp's Killer Limit</strong>
              <span class="text-sm text-muted dark:text-dimmed">WhatsApp frequently drops image previews entirely if the image exceeds <strong>300KB</strong>. Compress aggressively if WhatsApp is your primary vector.</span>
            </div>
          </li>
        </ul>
      </UCard>
    </div>

  </LayoutsArticleLayout>
</template>
