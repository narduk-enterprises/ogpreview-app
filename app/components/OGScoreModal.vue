<script setup lang="ts">
import type { PlatformScores } from '~~/types/og'

interface Props {
  scores: PlatformScores
}

const props = defineProps<Props>()
type PlatformKey = Exclude<keyof PlatformScores, 'overall'>
const selectablePlatforms: PlatformKey[] = ['facebook', 'twitter', 'linkedin', 'slack', 'discord', 'whatsapp', 'telegram', 'imessage']
const selectedPlatform = ref<PlatformKey>('facebook')

const isOpen = ref(false)

function getScoreColorClass(score: number): string {
  if (score >= 80) {
    return 'bg-green-500 text-white'
  }
  else if (score >= 60) {
    return 'bg-yellow-500 text-white'
  }
  else {
    return 'bg-red-500 text-white'
  }
}

function getScoreTextColor(score: number): string {
  if (score >= 80) {
    return 'text-green-600 dark:text-green-400'
  }
  else if (score >= 60) {
    return 'text-yellow-600 dark:text-yellow-400'
  }
  else {
    return 'text-red-600 dark:text-red-400'
  }
}

function getScoreLabel(score: number): string {
  if (score >= 80) {
    return 'Excellent'
  }
  else if (score >= 60) {
    return 'Good'
  }
  else if (score >= 40) {
    return 'Fair'
  }
  else {
    return 'Needs Improvement'
  }
}

type ButtonColor = 'success' | 'warning' | 'error'
function getButtonColor(score: number): ButtonColor {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'error'
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="OG Tag Quality Score"
    description="See how well your Open Graph tags are optimized for each platform"
    :ui="{
      body: 'p-6',
      footer: 'justify-end',
      content: 'sm:max-w-2xl md:max-w-3xl lg:max-w-4xl'
    }"
  >
    <UButton
      label="Details"
      :color="getButtonColor(props.scores.overall)"
      variant="solid"
      icon="i-lucide-bar-chart-3"
      size="md"
      class="shadow-md hover:shadow-lg transition-all duration-200 font-semibold hover:scale-105"
    />

    <template #body>
      <div class="space-y-6">
        <!-- Overall Score -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center mb-4">
            <div
              :class="[
                'px-8 py-4 rounded-2xl font-bold text-5xl shadow-lg',
                getScoreColorClass(props.scores.overall)
              ]"
            >
              {{ props.scores.overall }}/100
            </div>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-lg font-medium text-primary dark:text-dimmed">Overall Score:</span>
            <span :class="['text-lg font-bold', getScoreTextColor(props.scores.overall)]">
              {{ getScoreLabel(props.scores.overall) }}
            </span>
          </div>
          <div class="w-full bg-muted dark:bg-elevated rounded-full h-4 overflow-hidden mt-4 max-w-md mx-auto">
            <div
              :class="['h-full transition-all duration-500', getScoreColorClass(props.scores.overall)]"
              :style="{ width: `${props.scores.overall}%` }"
            />
          </div>
        </div>

        <USeparator label="Platform Scores & Details" />

        <!-- Platform Tabs -->
        <div class="flex flex-wrap gap-2">
          <!-- eslint-disable-next-line atx/no-native-button -->
          <button
            v-for="platform in selectablePlatforms"
            :key="platform"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedPlatform === platform
                ? 'bg-primary-600 text-white'
                : 'bg-muted dark:bg-elevated text-primary dark:text-dimmed hover:bg-muted dark:hover:bg-elevated'
            ]"
            @click="selectedPlatform = platform"
          >
            {{ platform.charAt(0).toUpperCase() + platform.slice(1) }}
          </button>
        </div>

        <!-- Selected Platform Details -->
        <div class="p-5 bg-muted dark:bg-elevated rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-semibold text-primary dark:text-primary capitalize">
              {{ selectedPlatform }}
            </h4>
            <span :class="['text-2xl font-bold', getScoreTextColor(props.scores[selectedPlatform].score)]">
              {{ props.scores[selectedPlatform].score }}/100
            </span>
          </div>

          <div class="w-full bg-muted dark:bg-elevated rounded-full h-3 overflow-hidden mb-5">
            <div
              :class="['h-full transition-all duration-500', getScoreColorClass(props.scores[selectedPlatform].score)]"
              :style="{ width: `${props.scores[selectedPlatform].score}%` }"
            />
          </div>

          <!-- What's Good -->
          <div
            v-if="props.scores[selectedPlatform].reasons.length > 0"
            class="mb-4"
          >
            <h5 class="text-sm font-semibold text-muted dark:text-dimmed mb-2 flex items-center gap-2">
              <span class="i-lucide-check-circle w-4 h-4" />
              What's Good
            </h5>
            <ul class="space-y-1">
              <li
                v-for="(reason, idx) in props.scores[selectedPlatform].reasons"
                :key="idx"
                class="text-sm text-primary dark:text-dimmed pl-4"
              >
                • {{ reason }}
              </li>
            </ul>
          </div>

          <!-- Issues Found -->
          <div
            v-if="props.scores[selectedPlatform].issues.length > 0"
            class="mb-4"
          >
            <h5 class="text-sm font-semibold text-muted dark:text-dimmed mb-2 flex items-center gap-2">
              <span class="i-lucide-alert-circle w-4 h-4" />
              Issues Found
            </h5>
            <ul class="space-y-1">
              <li
                v-for="(issue, idx) in props.scores[selectedPlatform].issues"
                :key="idx"
                class="text-sm text-primary dark:text-dimmed pl-4"
              >
                • {{ issue }}
              </li>
            </ul>
          </div>

          <!-- Recommendations -->
          <div v-if="props.scores[selectedPlatform].recommendations.length > 0">
            <h5 class="text-sm font-semibold text-muted dark:text-dimmed mb-2 flex items-center gap-2">
              <span class="i-lucide-lightbulb w-4 h-4" />
              Recommendations
            </h5>
            <ul class="space-y-1">
              <li
                v-for="(rec, idx) in props.scores[selectedPlatform].recommendations"
                :key="idx"
                class="text-sm text-primary dark:text-dimmed pl-4"
              >
                • {{ rec }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Score Info -->
        <UAlert
          color="info"
          variant="soft"
          icon="i-lucide-info"
          title="Score Calculation"
        >
          <template #description>
            <p class="text-sm">
              Scores are calculated based on the presence and quality of essential Open Graph tags,
              image dimensions, character count optimization, and platform-specific requirements.
            </p>
          </template>
        </UAlert>
      </div>
    </template>

    <template #footer="{ close }">
      <UButton
        label="Close"
        color="neutral"
        variant="outline"
        @click="close"
      />
    </template>
  </UModal>
</template>
