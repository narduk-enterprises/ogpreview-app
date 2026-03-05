<script setup lang="ts">
import type { UrlHistoryEntry } from '~/composables/useUrlHistory';

interface Props {
  recentHistory: UrlHistoryEntry[];
}

defineProps<Props>();

const emit = defineEmits<{
  select: [url: string];
  'show-full': [];
}>();

function handleSelect(url: string) {
  emit('select', url);
}

function handleShowFull() {
  emit('show-full');
}

function getDisplayText(entry: UrlHistoryEntry): string {
  if (entry.title) {
    return entry.title;
  }

  try {
    const url = new URL(entry.url);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return entry.url;
  }
}
</script>

<template>
  <div v-if="recentHistory.length > 0" class="flex flex-wrap items-center gap-2 sm:gap-2">
    <span
      class="text-xs sm:text-xs font-medium text-muted dark:text-dimmed uppercase tracking-wide"
    >
      Recent:
    </span>
    <div class="flex flex-wrap gap-2 sm:gap-1.5">
      <UButton
        v-for="entry in recentHistory"
        :key="entry.url"
        size="sm"
        color="neutral"
        variant="outline"
        :title="entry.title || entry.url"
        class="max-w-[200px] truncate min-h-[36px] sm:min-h-0"
        @click="handleSelect(entry.url)"
      >
        <template #leading>
          <div class="i-lucide-clock-4 w-3.5 h-3.5 sm:w-3 sm:h-3 shrink-0" />
        </template>
        <span class="truncate text-sm sm:text-xs">
          {{ getDisplayText(entry) }}
        </span>
      </UButton>
    </div>
    <UButton
      size="sm"
      color="neutral"
      variant="ghost"
      icon="i-lucide-history"
      title="View full history"
      class="min-h-[36px] sm:min-h-0"
      @click="handleShowFull"
    />
  </div>
</template>
