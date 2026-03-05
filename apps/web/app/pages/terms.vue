<script setup lang="ts">
useSeo({
  title: 'Terms of Service - ogpreview.app',
  description: 'Terms of Service for ogpreview.app - Read our terms and conditions for using our service.',
})

useWebPageSchema({
  name: 'Terms of Service - ogpreview.app',
  description: 'Terms of Service for ogpreview.app - Read our terms and conditions for using our service.',
})

const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <LayoutsSimpleLayout
title="Terms of Service"
    :subtitle="`Last updated: ${lastUpdated}`">
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        1. Acceptance of Terms
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        By accessing and using ogpreview.app ("the Service"), you accept and agree to be bound by the terms and
        provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        2. Description of Service
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        ogpreview.app provides a service that allows users to preview and generate Open Graph meta tags for websites.
        The Service enables users to see how their URLs will appear when shared on social media platforms.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        3. Use of Service
      </h2>
      <h3 class="text-xl font-semibold text-primary dark:text-white mb-3">
        Permitted Use
      </h3>
      <p class="text-primary dark:text-dimmed mb-4">
        You may use the Service for lawful purposes only. You agree to use the Service in accordance with all applicable
        laws and regulations.
      </p>

      <h3 class="text-xl font-semibold text-primary dark:text-white mb-3">
        Prohibited Use
      </h3>
      <p class="text-primary dark:text-dimmed mb-4">
        You agree not to:
      </p>
      <ul class="list-disc list-inside text-primary dark:text-dimmed mb-4 space-y-2">
        <li>Use the Service for any illegal or unauthorized purpose</li>
        <li>Violate any laws in your jurisdiction</li>
        <li>Transmit any viruses, malware, or other harmful code</li>
        <li>Attempt to gain unauthorized access to the Service or its related systems</li>
        <li>Interfere with or disrupt the Service or servers connected to the Service</li>
        <li>Use the Service to harass, abuse, or harm other users</li>
        <li>Scrape, crawl, or use automated systems to access the Service without permission</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        4. User Accounts
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        Some features of the Service may require you to create an account. You are responsible for maintaining the
        confidentiality of your account credentials and for all activities that occur under your account.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        5. Intellectual Property
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        The Service and its original content, features, and functionality are owned by ogpreview.app and are protected
        by international copyright, trademark, patent, trade secret, and other intellectual property laws.
      </p>
      <p class="text-primary dark:text-dimmed">
        You retain ownership of any content you submit to the Service. By submitting content, you grant us a license to
        use, modify, and display that content as necessary to provide the Service.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        6. Disclaimer of Warranties
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
        INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
        NON-INFRINGEMENT.
      </p>
      <p class="text-primary dark:text-dimmed">
        We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be
        corrected.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        7. Limitation of Liability
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
        OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        8. Indemnification
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        You agree to defend, indemnify, and hold harmless ogpreview.app and its officers, directors, employees, and
        agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys'
        fees, arising out of or in any way connected with your use of the Service or violation of these Terms.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        9. Termination
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any
        reason whatsoever, including without limitation if you breach the Terms.
      </p>
      <p class="text-primary dark:text-dimmed">
        Upon termination, your right to use the Service will cease immediately.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        10. Changes to Terms
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
        material, we will provide at least 30 days notice prior to any new terms taking effect.
      </p>
      <p class="text-primary dark:text-dimmed">
        By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
        revised terms.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        11. Governing Law
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
        ogpreview.app operates, without regard to its conflict of law provisions.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        12. Severability
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
        these Terms will remain in effect.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-primary dark:text-white mb-4">
        13. Contact Information
      </h2>
      <p class="text-primary dark:text-dimmed mb-4">
        If you have any questions about these Terms of Service, please contact us at:
      </p>
      <p class="text-primary dark:text-dimmed">
        Email: <ULink
href="mailto:legal@ogpreview.app"
          class="text-muted dark:text-dimmed hover:underline">legal@ogpreview.app</ULink>
      </p>
    </section>
  </LayoutsSimpleLayout>
</template>
