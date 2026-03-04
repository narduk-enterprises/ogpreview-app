<script setup lang="ts">
import { markRaw } from 'vue'

// Lazy load preview components for better performance
const OGPreviewFacebook = defineAsyncComponent(() => import('../OGPreviewFacebook.vue'))
const OGPreviewTwitter = defineAsyncComponent(() => import('../OGPreviewTwitter.vue'))
const OGPreviewLinkedIn = defineAsyncComponent(() => import('../OGPreviewLinkedIn.vue'))
const OGPreviewSlack = defineAsyncComponent(() => import('../OGPreviewSlack.vue'))
const OGPreviewDiscord = defineAsyncComponent(() => import('../OGPreviewDiscord.vue'))
const OGPreviewWhatsApp = defineAsyncComponent(() => import('../OGPreviewWhatsApp.vue'))
const OGPreviewTelegram = defineAsyncComponent(() => import('../OGPreviewTelegram.vue'))
const OGPreviewIMessage = defineAsyncComponent(() => import('../OGPreviewIMessage.vue'))
const OGPreviewSponsored = defineAsyncComponent(() => import('../OGPreviewSponsored.vue'))

interface Props {
  data: any
  validationResult: {
    isComplete: boolean
    missing: string[]
    warnings: string[]
  }
}

const props = defineProps<Props>()

// Check if we have any data loaded
const hasData = computed(() => {
  return !!(props.data?.title || props.data?.description || props.data?.image)
})

// Modal state
const isModalOpen = ref(false)
const selectedPlatform = ref<any>(null)

// Shuffle function to randomize array order (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

// Create preview items with components (using markRaw to prevent reactivity overhead)
// Include sponsored ad in the list
const basePreviewItems = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'i-lucide-facebook',
    component: markRaw(OGPreviewFacebook)
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'i-lucide-twitter',
    component: markRaw(OGPreviewTwitter)
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'i-lucide-message-circle',
    component: markRaw(OGPreviewDiscord)
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'i-lucide-linkedin',
    component: markRaw(OGPreviewLinkedIn)
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'i-lucide-send',
    component: markRaw(OGPreviewTelegram)
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'i-lucide-message-circle',
    component: markRaw(OGPreviewWhatsApp)
  },
  {
    id: 'imessage',
    name: 'iMessage',
    icon: 'i-lucide-message-square',
    component: markRaw(OGPreviewIMessage)
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'i-lucide-slack',
    component: markRaw(OGPreviewSlack)
  },
  {
    id: 'sponsored',
    name: 'Sponsored',
    icon: 'i-lucide-sparkles',
    component: markRaw(OGPreviewSponsored),
    isSponsored: true
  }
]

// Randomize the order of preview items on mount
const previewItems = ref(shuffleArray(basePreviewItems))

// Track if sponsored ad is filled - start as null (unknown), then set to true/false
const sponsoredAdFilled = ref<boolean | null>(null)

// Check localStorage for override to always show sponsored
const shouldAlwaysShowSponsored = computed(() => {
  if (import.meta.client && typeof window !== 'undefined') {
    return localStorage.getItem('ogpreview_always_show_sponsored') === 'true'
  }
  return false
})

// Filter out sponsored card if ad is not filled (unless override is enabled)
const filteredPreviewItems = computed(() => {
  // If override is enabled, always show sponsored card
  if (shouldAlwaysShowSponsored.value) {
    return previewItems.value
  }

  // If we haven't checked yet or ad is filled, show all items
  if (sponsoredAdFilled.value === null || sponsoredAdFilled.value === true) {
    return previewItems.value
  }

  // If ad is not filled and no override, filter out sponsored card
  return previewItems.value.filter(item => item.id !== 'sponsored')
})

// Handle ad fill status from sponsored component
const handleSponsoredAdStatus = (filled: boolean) => {
  sponsoredAdFilled.value = filled
  // If ad not filled and no override, remove from previewItems immediately
  if (!filled && !shouldAlwaysShowSponsored.value) {
    previewItems.value = previewItems.value.filter(item => item.id !== 'sponsored')
  }
}

function openModal(platform: any) {
  // Don't open modal for sponsored ads
  if (platform.id === 'sponsored') {
    return
  }
  selectedPlatform.value = platform
  isModalOpen.value = true
}
</script>

<template>
  <UCard :ui="{ body: 'p-3 sm:p-2.5 md:p-3' }">
    <!-- Platform Previews Grid -->
    <div
class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-4"
      data-test="platform-previews">
      <div
v-for="item in filteredPreviewItems" :key="item.id" class="flex flex-col min-w-0"
        :data-test="`platform-card-${item.id}`">
        <div class="flex items-center justify-center mb-2.5 sm:mb-2">
          <!-- eslint-disable-next-line atx/no-native-button -->
          <button
            v-if="item.id !== 'sponsored'"
            :aria-label="`View ${item.name} preview in detail`"
            type="button"
            class="inline-flex items-center gap-2 sm:gap-1.5 px-4 py-2 sm:px-2 sm:py-0.5 bg-linear-to-r from-primary-500/10 via-primary-500/10 to-primary-500/10 dark:from-primary-500/20 dark:via-primary-500/20 dark:to-primary-500/20 rounded-full border border-default/50 dark:border-default/50 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:border-default focus:ring-offset-2 active:scale-95 min-h-[44px] sm:min-h-0"
            :disabled="!hasData"
            @click="hasData ? openModal(item) : null">
            <UIcon
:name="item.icon" class="w-4 h-4 sm:w-3 sm:h-3 text-muted dark:text-dimmed"
              aria-hidden="true" />
            <span class="text-base sm:text-xs font-bold text-primary dark:text-primary">{{ item.name }}</span>
          </button>
          <div
            v-else
            class="inline-flex items-center gap-2 sm:gap-1.5 px-4 py-2 sm:px-2 sm:py-0.5 bg-linear-to-r from-primary-500/10 via-primary-500/10 to-primary-500/10 dark:from-primary-500/20 dark:via-primary-500/20 dark:to-primary-500/20 rounded-full border border-default/50 dark:border-default/50 shadow-sm min-h-[44px] sm:min-h-0">
            <UIcon
name="i-lucide-sparkles" class="w-4 h-4 sm:w-3 sm:h-3 text-muted dark:text-dimmed"
              aria-hidden="true" />
            <span class="text-base sm:text-xs font-bold text-primary dark:text-primary">Sponsored</span>
          </div>
        </div>

        <div
:aria-label="`${item.name} preview card`" role="region"
          class="flex items-start justify-center flex-1 p-2.5 sm:p-1.5 bg-muted dark:bg-elevated rounded-lg border border-default/50 dark:border-default/50 shadow-inner overflow-hidden">
          <!-- Show skeleton when no data loaded (skip for sponsored) -->
          <div v-if="!hasData && item.id !== 'sponsored'" class="w-full h-full flex items-center justify-center min-h-[200px] sm:min-h-[200px]">
            <div class="w-full space-y-3 p-4 sm:p-4 animate-pulse">
              <div class="h-4 sm:h-4 bg-elevated dark:bg-elevated rounded w-3/4" />
              <div class="h-32 sm:h-32 bg-elevated dark:bg-elevated rounded" />
              <div class="h-3 sm:h-3 bg-elevated dark:bg-elevated rounded w-full" />
              <div class="h-3 sm:h-3 bg-elevated dark:bg-elevated rounded w-5/6" />
            </div>
          </div>

          <!-- Show sponsored ad (only if ad is filled) -->
          <div v-else-if="item.id === 'sponsored'" class="w-full h-full overflow-hidden">
            <component :is="item.component" @ad-filled="handleSponsoredAdStatus" />
          </div>

          <!-- Show actual preview when data is loaded -->
          <div v-else class="w-full h-full overflow-hidden">
            <Suspense>
              <template #default>
                <component :is="item.component" :data="data" />
              </template>
              <template #fallback>
                <div class="animate-pulse bg-muted dark:bg-elevated w-full h-40 sm:h-48 rounded-lg" :aria-label="`Loading ${item.name} preview`" />
              </template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>

    <!-- Validation Info - Only show when data is loaded -->
    <div v-if="hasData" class="mt-4 sm:mt-4 space-y-2.5 sm:space-y-2">
      <UAlert
v-if="validationResult.isComplete" color="success" variant="subtle" icon="i-lucide-circle-check"
        title="All Required Fields Complete" description="Your Open Graph tags are ready for all platforms!"
        data-test="validation-complete" />

      <UAlert
v-else color="warning" variant="subtle" icon="i-lucide-alert-triangle" title="Missing Required Fields"
        data-test="validation-missing">
        <template #description>
          <p class="mb-2 sm:mb-2 text-sm sm:text-sm">
            Complete these fields for optimal social media previews:
          </p>
          <ul class="list-disc list-inside text-sm sm:text-sm space-y-1">
            <li v-for="field in validationResult.missing" :key="field" class="capitalize">
              {{ field }}
            </li>
          </ul>
        </template>
      </UAlert>

      <UAlert
v-if="validationResult.warnings.length > 0" color="info" variant="subtle" icon="i-lucide-lightbulb"
        title="Optimization Tips" data-test="validation-warnings">
        <template #description>
          <ul class="space-y-1 sm:space-y-1">
            <li
v-for="(warning, idx) in validationResult.warnings" :key="idx"
              class="text-sm sm:text-sm leading-relaxed" data-test="warning-item">
              {{ warning }}
            </li>
          </ul>
        </template>
      </UAlert>
    </div>

    <!-- Platform Detail Modal -->
    <UModal
v-model:open="isModalOpen"
      :aria-labelledby="selectedPlatform ? `${selectedPlatform.id}-modal-title` : undefined" :ui="{
        footer: 'justify-end',
        content: 'sm:max-w-xl md:max-w-2xl lg:max-w-3xl'
      }">
      <template v-if="selectedPlatform" #header>
        <div class="flex items-center gap-2 sm:gap-2.5">
          <UIcon :name="selectedPlatform.icon" class="w-5 h-5 text-muted dark:text-dimmed" aria-hidden="true" />
          <h2 :id="`${selectedPlatform.id}-modal-title`" class="text-lg font-bold text-primary dark:text-primary">
            {{ selectedPlatform.name }} Preview
          </h2>
        </div>
      </template>

      <template #body>
        <div
v-if="selectedPlatform" role="region" :aria-label="`Detailed ${selectedPlatform.name} preview`"
          class="flex items-center justify-center p-6 bg-muted dark:bg-elevated rounded-xl border border-default/50 dark:border-default/50 min-h-[300px]">
          <Suspense>
            <template #default>
              <div class="w-full max-w-lg mx-auto">
                <component :is="selectedPlatform.component" :data="data" />
              </div>
            </template>
            <template #fallback>
              <div
class="animate-pulse bg-muted dark:bg-elevated w-full h-64 rounded-lg max-w-lg mx-auto"
                :aria-label="`Loading ${selectedPlatform.name} preview`" />
            </template>
          </Suspense>
        </div>
      </template>

      <template #footer="{ close }">
        <UButton
label="Close" color="neutral" size="lg" class="min-h-[44px] w-full sm:w-auto font-semibold"
          aria-label="Close preview modal" @click="close" />
      </template>
    </UModal>
  </UCard>
</template>
