<template>
  <section
    class="mt-8 sm:mt-8 max-w-4xl mx-auto px-4 sm:px-4 mb-8"
    aria-labelledby="faq-heading"
  >
    <h2
      id="faq-heading"
      class="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-6"
    >
      Frequently Asked Questions
    </h2>

    <!-- AdSense Ad - Placement in FAQ section -->
    <div class="mb-6 sm:mb-6 flex justify-center">
      <div class="w-full max-w-[728px]">
        <AdSenseAd />
      </div>
    </div>

    <div class="space-y-3 sm:space-y-4">
      <details
        v-for="(faq, index) in faqs"
        :key="index"
        class="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md"
      >
        <summary class="flex justify-between items-center cursor-pointer px-5 sm:px-6 py-4 sm:py-4 font-medium text-gray-900 dark:text-white text-base sm:text-base list-none min-h-[60px] sm:min-h-0">
          <span class="pr-4 leading-snug">{{ faq.question }}</span>
          <svg
            class="w-6 h-6 sm:w-5 sm:h-5 text-gray-500 transition-transform group-open:rotate-180 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>
        <div class="px-5 sm:px-6 pb-4 sm:pb-4 pt-2 text-gray-600 dark:text-gray-400 text-base sm:text-base leading-relaxed">
          <p v-html="faq.answer" />
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
// FAQ data with SEO-optimized Q&A
const faqs = [
  {
    question: 'What is an Open Graph preview?',
    answer: 'An Open Graph preview is the visual card that appears when you share a link on social media platforms like Facebook, Twitter, LinkedIn, or Slack. It includes your page title, description, and featured image, making your content more engaging and clickable. Open Graph previews help increase click-through rates by showing users what to expect before they click.'
  },
  {
    question: 'How do I preview Open Graph tags?',
    answer: 'Use our free Open Graph preview tool above to instantly see how your links will appear on social media. Simply enter your website URL, and you\'ll see previews for Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, Telegram, and iMessage. You can also manually edit tags to test different titles, descriptions, and images without changing your actual website.'
  },
  {
    question: 'What is an Open Graph preview tool?',
    answer: 'An Open Graph preview tool lets you test and preview how your website links will appear when shared on social media platforms. Our tool shows you exactly how your Open Graph meta tags (title, description, image) will render across Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp, Telegram, and iMessage—all in one place.'
  },
  {
    question: 'How do I preview my Open Graph tags before publishing?',
    answer: 'Simply enter your website URL in the tool above, and you\'ll instantly see how your Open Graph meta tags will appear across different platforms. You can also manually edit the tags to test different titles, descriptions, and images without changing your actual website.'
  },
  {
    question: 'Which platforms does this Open Graph preview tool support?',
    answer: 'Our tool supports Facebook, Twitter (X), LinkedIn, Slack, Discord, WhatsApp, Telegram, and iMessage. Each platform renders Open Graph tags slightly differently, so you can preview exactly how your link will look on each one.'
  },
  {
    question: 'What are the recommended Open Graph image sizes?',
    answer: 'The recommended size is 1200×630 pixels for most platforms. Facebook and LinkedIn work best with 1200×630px, Twitter prefers 1200×675px for large cards, and Discord/Slack work well with 1200×630px. Always use high-quality images in JPG, PNG, or WebP format.'
  },
  {
    question: 'Do I need to create an account to use this tool?',
    answer: 'No! Our Open Graph preview tool is completely free and requires no registration or login. Just paste your URL or enter your content details and start previewing immediately.'
  },
  {
    question: 'Why isn\'t my Open Graph preview updating?',
    answer: 'Social media platforms cache Open Graph data aggressively. After updating your meta tags, use the platform\'s debugging tool to force a cache refresh: <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline">Facebook Debugger</a>, <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline">Twitter Card Validator</a>, or <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn Post Inspector</a>.'
  },
  {
    question: 'What\'s the difference between Open Graph and Twitter Cards?',
    answer: 'Twitter Cards are Twitter\'s extension of Open Graph. While Twitter falls back to standard OG tags, using specific <code>twitter:card</code>, <code>twitter:title</code>, and <code>twitter:image</code> tags gives you better control over how links appear on Twitter/X.'
  },
  {
    question: 'Can I test Open Graph tags without a live website?',
    answer: 'Yes! You can use the manual editing feature to input your desired title, description, and image URL without fetching from a live website. This is perfect for testing designs before deployment or for planning your social media strategy.'
  }
]

// Generate FAQ Schema.org structured data for SEO
useSchemaOrg([
  {
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer.replace(/<[^>]*>/g, '') // Strip HTML for schema
      }
    }))
  }
])
</script>

<style scoped>
details summary::-webkit-details-marker {
  display: none;
}

details[open] summary {
  border-bottom: 1px solid rgb(229 231 235 / 1);
}

.dark details[open] summary {
  border-bottom-color: rgb(55 65 81 / 1);
}
</style>
