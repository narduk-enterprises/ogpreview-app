<script setup lang="ts">
import type { PlatformScores } from '~~/types/og'

interface Props {
  scores: PlatformScores
}

defineProps<Props>()

const showDetails = ref(false)

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
</script>

<template>
  <div
    class="mt-6 p-4 sm:p-6 bg-linear-to-br bg-elevated rounded-xl border border-default dark:border-default"
  >
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
      <h3 class="text-lg sm:text-lg font-bold text-primary dark:text-primary">
        OG Tag Quality Score
      </h3>
      <div class="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
        <div
          :class="[
            'px-4 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-2xl sm:text-2xl',
            getScoreColorClass(scores.overall)
          ]"
        >
          {{ scores.overall }}/100
        </div>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm sm:text-sm font-medium text-primary dark:text-dimmed">Overall Score</span>
        <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.overall)]">
          {{ getScoreLabel(scores.overall) }}
        </span>
      </div>
      <div class="w-full bg-muted dark:bg-elevated rounded-full h-3 sm:h-3 overflow-hidden">
        <div
          :class="['h-full transition-all duration-500', getScoreColorClass(scores.overall)]"
          :style="{ width: `${scores.overall}%` }"
        />
      </div>
    </div>

    <UButton
      :label="`${showDetails ? 'Hide' : 'Show'} Platform Scores`"
      :trailing-icon="showDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
      color="neutral"
      variant="ghost"
      size="md"
      block
      class="justify-between! mb-2 min-h-[44px] sm:min-h-0 text-base sm:text-sm"
      @click="showDetails = !showDetails"
    />

    <div
      v-show="showDetails"
      class="space-y-3 mt-4 pt-4 border-t border-default dark:border-default"
    >
      <!-- Facebook Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">Facebook</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.facebook.score)]">
            {{ scores.facebook.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.facebook.score)]"
            :style="{ width: `${scores.facebook.score}%` }"
          />
        </div>
      </div>

      <!-- Twitter Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-muted rounded-full flex items-center justify-center text-white font-bold text-sm">
              🐦
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">Twitter</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.twitter.score)]">
            {{ scores.twitter.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.twitter.score)]"
            :style="{ width: `${scores.twitter.score}%` }"
          />
        </div>
      </div>

      <!-- LinkedIn Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              in
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">LinkedIn</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.linkedin.score)]">
            {{ scores.linkedin.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.linkedin.score)]"
            :style="{ width: `${scores.linkedin.score}%` }"
          />
        </div>
      </div>

      <!-- Slack Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              #
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">Slack</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.slack.score)]">
            {{ scores.slack.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.slack.score)]"
            :style="{ width: `${scores.slack.score}%` }"
          />
        </div>
      </div>

      <!-- Discord Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              <PlatformIcon platform="Discord" size="sm" />
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">Discord</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.discord.score)]">
            {{ scores.discord.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.discord.score)]"
            :style="{ width: `${scores.discord.score}%` }"
          />
        </div>
      </div>

      <!-- WhatsApp Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              <PlatformIcon platform="WhatsApp" size="sm" />
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">WhatsApp</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.whatsapp.score)]">
            {{ scores.whatsapp.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.whatsapp.score)]"
            :style="{ width: `${scores.whatsapp.score}%` }"
          />
        </div>
      </div>

      <!-- Telegram Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              <PlatformIcon platform="Telegram" size="sm" />
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">Telegram</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.telegram.score)]">
            {{ scores.telegram.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.telegram.score)]"
            :style="{ width: `${scores.telegram.score}%` }"
          />
        </div>
      </div>

      <!-- iMessage Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5 sm:gap-2">
            <div class="w-9 h-9 sm:w-8 sm:h-8 bg-elevated rounded-full flex items-center justify-center text-white font-bold text-sm">
              <PlatformIcon platform="iMessage" size="sm" />
            </div>
            <span class="text-base sm:text-sm font-medium text-primary dark:text-dimmed">iMessage</span>
          </div>
          <span :class="['text-sm sm:text-sm font-semibold', getScoreTextColor(scores.imessage.score)]">
            {{ scores.imessage.score }}/100
          </span>
        </div>
        <div class="w-full bg-muted dark:bg-elevated rounded-full h-2.5 sm:h-2 overflow-hidden">
          <div
            :class="['h-full transition-all duration-500', getScoreColorClass(scores.imessage.score)]"
            :style="{ width: `${scores.imessage.score}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
