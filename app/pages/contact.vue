<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us - ogpreview.app',
  description: 'Get in touch with the ogpreview.app team. Contact us for support, partnerships, or general inquiries about our Open Graph preview tool.',
  ogTitle: 'Contact Us - ogpreview.app',
  ogDescription: 'Get in touch with the ogpreview.app team. Contact us for support, partnerships, or general inquiries.',
  ogType: 'website'
})

// Schema.org LocalBusiness/Organization
useSchemaOrg([
  {
    '@type': 'Organization',
    'name': 'ogpreview.app',
    'url': 'https://ogpreview.app',
    'logo': 'https://ogpreview.app/logo.svg',
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'email': 'hello@ogpreview.app',
        'contactType': 'customer service',
        'availableLanguage': 'English'
      },
      {
        '@type': 'ContactPoint',
        'email': 'support@ogpreview.app',
        'contactType': 'technical support',
        'availableLanguage': 'English'
      }
    ],
    'sameAs': [
      'https://twitter.com/ogpreview'
    ]
  }
])
</script>

<template>
  <LayoutsSimpleLayout title="Contact Us" subtitle="Have questions, feedback, or need support? We'd love to hear from you.">
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        General Inquiries
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        For general questions about our service, features, or how to use the Open Graph preview tool:
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Email: <a
href="mailto:hello@ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">hello@ogpreview.app</a>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Technical Support
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Experiencing issues with the tool or need technical assistance:
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Email: <a
href="mailto:support@ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">support@ogpreview.app</a>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Business & Partnerships
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Interested in partnerships, collaborations, or business opportunities:
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Email: <a
href="mailto:business@ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">business@ogpreview.app</a>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Privacy & Legal
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Questions about privacy, data protection, or legal matters:
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Email: <a
href="mailto:privacy@ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">privacy@ogpreview.app</a>
      </p>
      <p class="text-gray-700 dark:text-gray-300 mt-2">
        Legal: <a
href="mailto:legal@ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">legal@ogpreview.app</a>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Security Issues
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Found a security vulnerability? Please report it responsibly:
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Email: <a
href="mailto:security@ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">security@ogpreview.app</a>
      </p>
      <p class="text-gray-700 dark:text-gray-300 mt-2 text-sm">
        Please do not disclose security issues publicly until we've had a chance to address them.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Social Media
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Connect with us on social media for updates and tips:
      </p>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li>
Twitter/X: <a
href="https://twitter.com/ogpreview" target="_blank" rel="noopener noreferrer"
            class="text-blue-600 dark:text-blue-400 hover:underline">@ogpreview</a>
</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Response Time
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        We aim to respond to all inquiries within 24-48 hours during business days.
        For urgent technical issues, please mark your email subject with [URGENT].
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Mailing Address
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        ogpreview.app<br>
        Online Service<br>
        Website: <a
href="https://ogpreview.app"
          class="text-blue-600 dark:text-blue-400 hover:underline">https://ogpreview.app</a>
      </p>
    </section>

    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton to="/" color="primary" size="lg">
          Back to Home
        </UButton>
        <UButton to="/privacy" variant="outline" size="lg">
          Privacy Policy
        </UButton>
      </div>
    </div>
  </LayoutsSimpleLayout>
</template>
