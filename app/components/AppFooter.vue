<script setup lang="ts">
// Footer component - no special logic needed
</script>

<template>
  <div class="bg-white dark:bg-elevated border-t border-default dark:border-default mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div>
          <h3 class="text-lg font-semibold text-primary dark:text-white mb-4">
            ogpreview.app
          </h3>
          <p class="text-sm text-muted dark:text-dimmed mb-4">
            Free Open Graph preview tool for testing social media link cards. Preview how your links
            look on Facebook, Twitter, LinkedIn, and more.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-primary dark:text-white mb-4">
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/guides"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                Guides
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="text-lg font-semibold text-primary dark:text-white mb-4">
            Legal
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/privacy"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/terms"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                Terms of Service
              </NuxtLink>
            </li>
            <li>
              <ULink
                href="/security.txt"
                target="_blank"
                class="text-sm text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              >
                Security
              </ULink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-8 border-t border-default dark:border-default">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-muted dark:text-dimmed">
            © {{ new Date().getFullYear() }} ogpreview.app. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <ULink
              href="https://twitter.com/ogpreview"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted dark:text-dimmed hover:text-muted dark:hover:text-dimmed transition-colors"
              aria-label="Follow us on Twitter"
            >
              <!-- eslint-disable-next-line atx/lucide-icons-only -->
              <UIcon name="i-simple-icons-x" class="w-5 h-5" />
            </ULink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
