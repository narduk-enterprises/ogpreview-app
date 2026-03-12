<script setup lang="ts">
useSeo({
  title: 'How to Clear the Open Graph Cache',
  description: 'Learn how to force Facebook, Twitter, LinkedIn, and other platforms to refresh their Open Graph cache and display your updated meta tags and images.',
  keywords: ['open graph cache', 'clear facebook cache', 'clear twitter cache', 'refresh linkedin og image', 'facebook sharing debugger', 'twitter card validator', 'linkedin post inspector'],
  type: 'article',
  canonicalUrl: 'https://ogpreview.app/guides/og-cache-refresh'
})

useWebPageSchema()

const scriptExampleCode = `// Batch clear Facebook Open Graph cache via Node.js
const urlsToClear = ['https://mysite.com/1', 'https://mysite.com/2'];

for (const url of urlsToClear) {
  await fetch(\`https://graph.facebook.com/?id=\${encodeURIComponent(url)}&scrape=true\`, {
    method: 'POST'
  });
  
  // Throttle to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 1000));
}
console.log('Cache purging complete');`
</script>

<template>
  <!-- eslint-disable narduk/lucide-icons-only -- Platform brand icons (Facebook, Twitter, LinkedIn, Slack) are used for platform identification; lucide has no social brand icons -->
  <LayoutsArticleLayout
    title="How to Refresh Open Graph Cache"
    description="Force social media platforms to update your cached Open Graph tags and see your changes immediately. Skip the wait with these direct debugging tools."
    :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '3 min read' }"
  >
    <template #cta>
      <ContentCTA
        title="Test Your Changes Live"
        description="Verify your cache is actually cleared by previewing your URL across all platforms simultaneously."
        button-text="Preview URL Now" 
        button-to="/" 
        variant="green" 
      />
    </template>

    <ContentCallout variant="warning" title="Why is my old image still showing?" icon="i-lucide-triangle-alert">
      Social platforms scrape your URL once and cache the result (sometimes for up to 30 days) to save bandwidth. If you change your <code>og:image</code> or <code>og:title</code>, <strong>you must manually force the platforms to re-scrape your site.</strong>
    </ContentCallout>

    <!-- Debugger Dashboard -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">Official Cache Clearing Tools</h2>
      <div class="grid md:grid-cols-2 gap-6">
        
        <!-- Facebook -->
        <UCard class="border-default dark:border-default ring-1 border-default/20">
          <div class="flex items-center gap-3 mb-4">
            <UIcon name="i-simple-icons-facebook" class="w-8 h-8 text-muted" />
            <div>
              <h3 class="font-bold text-lg text-primary dark:text-white">Facebook Sharing Debugger</h3>
              <p class="text-xs text-muted text-muted dark:text-dimmed font-medium">Most aggressive caching (30+ days)</p>
            </div>
          </div>
          <p class="text-sm text-muted dark:text-dimmed mb-4">
            Enter your URL and specifically click the <strong>"Scrape Again"</strong> button to force a master refresh.
          </p>
          <UButton 
            to="https://developers.facebook.com/tools/debug/" 
            target="_blank" 
            color="neutral" 
            variant="solid"
            icon="i-lucide-arrow-top-right-on-square"
            block
          >
            Open FB Debugger
          </UButton>
        </UCard>

        <!-- LinkedIn -->
        <UCard class="border-default dark:border-default ring-1 border-default/20">
          <div class="flex items-center gap-3 mb-4">
            <UIcon name="i-simple-icons-linkedin" class="w-8 h-8 text-primary" />
            <div>
              <h3 class="font-bold text-lg text-primary dark:text-white">LinkedIn Post Inspector</h3>
              <p class="text-xs text-muted text-muted dark:text-dimmed font-medium">Auto-clears upon inspection</p>
            </div>
          </div>
          <p class="text-sm text-muted dark:text-dimmed mb-4">
            Simply entering your URL into the inspector instantly purges LinkedIn's 7-day cache globally.
          </p>
          <UButton 
            to="https://www.linkedin.com/post-inspector/" 
            target="_blank" 
            color="neutral" 
            variant="solid"
            icon="i-lucide-arrow-top-right-on-square"
            block
          >
            Open LinkedIn Inspector
          </UButton>
        </UCard>

      </div>
    </div>

    <!-- The Cache-Busting Trick -->
    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">The "Query Parameter" Trick</h2>
      <p class="text-muted dark:text-dimmed mb-6">
        Platforms like <strong>Discord, Slack, Twitter/X, and WhatsApp</strong> no longer have official debugging tools. To force them to fetch your new tags immediately, you must trick them into thinking it's a brand new URL by appending a dummy query parameter.
      </p>

      <div class="bg-elevated rounded-xl p-6 shadow-lg text-primary/20 relative overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-br from-primary-500/10 to-transparent"/>
        <div class="relative">
          <h3 class="text-sm font-semibold text-dimmed mb-2 uppercase tracking-wider">Instead of sharing:</h3>
          <p class="font-mono text-dimmed mb-4 line-through">https://yourwebsite.com/article</p>
          
          <h3 class="text-sm font-semibold text-dimmed mb-2 uppercase tracking-wider">Share this instead:</h3>
          <p class="font-mono text-dimmed text-lg">https://yourwebsite.com/article<strong class="text-white bg-muted/20 px-1 rounded">?v=2</strong></p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 mt-6">
        <UCard class="bg-muted dark:bg-elevated/50">
          <h4 class="font-bold text-primary dark:text-white flex items-center gap-2"><UIcon name="i-simple-icons-x" /> Twitter / X</h4>
          <p class="text-sm text-muted dark:text-dimmed mt-2">The official Card Validator was shut down in 2023. Use the query parameter trick (<code>?v=new</code>) in the Tweet Composer.</p>
        </UCard>
        <UCard class="bg-muted dark:bg-elevated/50">
          <h4 class="font-bold text-primary dark:text-white flex items-center gap-2"><UIcon name="i-simple-icons-slack" class="text-muted" /> Slack / Discord</h4>
          <p class="text-sm text-muted dark:text-dimmed mt-2">They cache per exact-string match. Appending <code>?slack=clear</code> instantly generates a fresh unfurl preview.</p>
        </UCard>
      </div>
    </div>

    <div class="my-12">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">API Batch Automation</h2>
      <p class="text-muted dark:text-dimmed mb-4">
        If you are deploying a site-wide rebrand and need to clear hundreds of URLs at once, you can hit the Facebook Graph API directly.
      </p>
      <ContentCodeBlock :code="scriptExampleCode" language="javascript" />
    </div>

  </LayoutsArticleLayout>
</template>
