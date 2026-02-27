/**
 * Composable for managing URL preview history.
 * Stores recently previewed URLs in localStorage with SSR-safe patterns.
 */
import type { OGData } from '~~/types/og'

export interface UrlHistoryEntry {
  url: string
  title?: string
  image?: string
  timestamp: number
}

const HISTORY_KEY = 'ogpreview_url_history'
const MAX_HISTORY = 50

export function useUrlHistory() {
  const history = ref<UrlHistoryEntry[]>([])

  // Computed for recent entries — always empty on server to prevent hydration mismatch
  const recentHistory = computed(() => {
    if (import.meta.server) return []
    return history.value.slice(0, 5)
  })

  function loadHistory() {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(HISTORY_KEY)
        if (stored) history.value = JSON.parse(stored)
      }
      catch {
        history.value = []
      }
    }
  }

  function saveHistory() {
    if (import.meta.client) {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
      }
      catch { /* storage full or unavailable */ }
    }
  }

  function addToHistory(url: string, ogData?: OGData | null) {
    if (!url) return
    history.value = history.value.filter(e => e.url !== url)
    history.value.unshift({
      url,
      title: ogData?.title,
      image: ogData?.image,
      timestamp: Date.now()
    })
    if (history.value.length > MAX_HISTORY) {
      history.value = history.value.slice(0, MAX_HISTORY)
    }
    saveHistory()
  }

  function removeFromHistory(url: string) {
    history.value = history.value.filter(e => e.url !== url)
    saveHistory()
  }

  function clearHistory() {
    history.value = []
    saveHistory()
  }

  // Load from localStorage only on client mount
  onMounted(loadHistory)

  return {
    history: computed(() => history.value),
    recentHistory,
    addToHistory,
    removeFromHistory,
    clearHistory
  }
}
