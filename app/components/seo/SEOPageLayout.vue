<template>
    <main
        class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <article class="max-w-4xl mx-auto">
            <!-- Navigation -->
            <nav class="mb-8">
                <NuxtLink
:to="backLink"
                    class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                    ← {{ backLinkText }}
                </NuxtLink>
            </nav>

            <!-- Header -->
            <header class="mb-12">
                <slot name="icon">
                    <div v-if="icon" class="text-5xl mb-4">
                        {{ icon }}
                    </div>
                </slot>
                <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ title }}
                </h1>
                <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    {{ description }}
                </p>
                <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span class="flex items-center gap-1.5">
                        <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                        {{ updatedDate }}
                    </span>
                    <span v-if="readTime" class="flex items-center gap-1.5">
                        <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                        {{ readTime }}
                    </span>
                </div>
            </header>

            <!-- Content -->
            <UCard :ui="{ body: 'p-8' }" class="mb-12 rounded-xl">
                <div class="prose prose-lg dark:prose-invert max-w-none">
                    <slot />
                </div>
            </UCard>

            <UCard
v-if="showCTA" :ui="{
                body: 'p-8'
            }" class="mb-12 text-center text-white rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 ring-0 shadow-lg">
                <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-white">
                    {{ ctaTitle }}
                </h2>
                <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
                    {{ ctaDescription }}
                </p>
                <UButton :to="ctaLink" size="lg" color="neutral" variant="solid" class="font-semibold text-gray-900 bg-white hover:bg-gray-100">
                    {{ ctaButtonText }}
                </UButton>
            </UCard>

            <!-- Related Platform Pages / Custom Footer Content -->
            <slot name="footer">
                <nav v-if="showPlatformLinks" class="mb-12">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {{ platformLinksTitle }}
                    </h2>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <NuxtLink v-for="platform in platformLinks" :key="platform.path" :to="platform.path">
                            <UCard
:ui="{
                                body: 'p-4'
                            }" class="hover:shadow-lg transition-all hover:scale-105 cursor-pointer rounded-lg">
                                <div class="text-2xl mb-2">{{ platform.icon }}</div>
                                <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
                                    {{ platform.name }}
                                </h3>
                            </UCard>
                        </NuxtLink>
                    </div>
                </nav>
            </slot>
        </article>
    </main>
</template>

<script setup lang="ts">
interface PlatformLink {
  name: string
  path: string
  icon: string
}

interface Props {
  title: string
  description: string
  updatedDate?: string
  readTime?: string
  icon?: string
  backLink?: string
  backLinkText?: string
  showCTA?: boolean
  ctaTitle?: string
  ctaDescription?: string
  ctaLink?: string
  ctaButtonText?: string
  showPlatformLinks?: boolean
  platformLinksTitle?: string
  platformLinks?: PlatformLink[]
}

withDefaults(defineProps<Props>(), {
  updatedDate: 'Updated December 2025',
  backLink: '/',
  backLinkText: 'Back to Tool',
  showCTA: true,
  ctaTitle: 'Test Your Open Graph Tags',
  ctaDescription: 'Use our free tool to preview how your Open Graph tags will appear across all social media platforms.',
  ctaLink: '/',
  ctaButtonText: 'Try the Free Preview Tool',
  showPlatformLinks: true,
  platformLinksTitle: 'Other Platform Guides',
  platformLinks: () => [
    { name: 'Facebook', path: '/open-graph/facebook', icon: 'i-simple-icons-facebook' },
    { name: 'Twitter', path: '/open-graph/twitter', icon: 'i-simple-icons-x' },
    { name: 'LinkedIn', path: '/open-graph/linkedin', icon: 'i-simple-icons-linkedin' },
    { name: 'Discord', path: '/open-graph/discord', icon: 'i-simple-icons-discord' }
  ]
})
</script>

<style scoped>
/* Prose styling improvements - using standard CSS for better compatibility */
:deep(.prose) code {
    background-color: rgb(243 244 246);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: rgb(220 38 38);
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) code {
        background-color: rgb(30 41 59);
        color: rgb(248 113 113);
    }
}

:deep(.prose) pre {
    background-color: rgb(17 24 39);
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    border: 1px solid rgb(55 65 81);
    margin: 1.5rem 0;
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) pre {
        background-color: rgb(3 7 18);
        border-color: rgb(30 41 59);
    }
}

:deep(.prose) pre code {
    background-color: transparent;
    padding: 0;
    color: rgb(229 231 235);
    font-size: 0.875rem;
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) pre code {
        color: rgb(209 213 219);
    }
}

:deep(.prose) a {
    color: rgb(37 99 235);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

:deep(.prose) a:hover {
    text-decoration: underline;
    color: rgb(29 78 216);
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) a {
        color: rgb(96 165 250);
    }

    :deep(.prose) a:hover {
        color: rgb(147 197 253);
    }
}

:deep(.prose) table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

:deep(.prose) thead {
    background-color: rgb(249 250 251);
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) thead {
        background-color: rgb(31 41 55);
    }
}

:deep(.prose) th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    color: rgb(17 24 39);
    border-bottom: 2px solid rgb(229 231 235);
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) th {
        color: rgb(243 244 246);
        border-bottom-color: rgb(55 65 81);
    }
}

:deep(.prose) td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgb(229 231 235);
    color: rgb(55 65 81);
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) td {
        border-bottom-color: rgb(55 65 81);
        color: rgb(209 213 219);
    }
}

:deep(.prose) tbody tr:hover {
    background-color: rgb(249 250 251);
}

@media (prefers-color-scheme: dark) {
    :deep(.prose) tbody tr:hover {
        background-color: rgb(31 41 55);
    }
}

:deep(.prose) tbody tr:last-child td {
    border-bottom: none;
}
</style>
