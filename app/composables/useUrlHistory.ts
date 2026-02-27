import type { OGData } from '~~/types/og'

export interface UrlHistoryEntry {
  url: string
  title?: string
  image?: string
  timestamp: number
}

const HISTORY_KEY = 'ogpreview_url_history'
const MAX_HISTORY = 50 // Store up to 50 entries

export function useUrlHistory() {
  const history = ref<UrlHistoryEntry[]>([])

  // Load history from localStorage
  const loadHistory = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(HISTORY_KEY)
        if (stored) {
          history.value = JSON.parse(stored)
        }
      }
      catch (error) {
        console.error('Failed to load URL history:', error)
        history.value = []
      }
    }
  }

  // Don't load history during composable initialization to prevent hydration mismatch
  // History will be loaded in onMounted, which only runs on client side

  // Save history to localStorage
  const saveHistory = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
      }
      catch (error) {
        console.error('Failed to save URL history:', error)
      }
    }
  }

  // Add URL to history
  const addToHistory = (url: string, ogData?: OGData | null) => {
    if (!url) return

    // Remove existing entry for this URL
    history.value = history.value.filter(entry => entry.url !== url)

    // Add new entry at the beginning
    history.value.unshift({
      url,
      title: ogData?.title,
      image: ogData?.image,
      timestamp: Date.now()
    })

    // Keep only MAX_HISTORY entries
    if (history.value.length > MAX_HISTORY) {
      history.value = history.value.slice(0, MAX_HISTORY)
    }

    saveHistory()
  }

  // Remove URL from history
  const removeFromHistory = (url: string) => {
    history.value = history.value.filter(entry => entry.url !== url)
    saveHistory()
  }

  // Clear all history
  const clearHistory = () => {
    history.value = []
    saveHistory()
  }

  // Get recent history (last N entries)
  // Returns empty array on server to prevent hydration mismatch
  const getRecentHistory = (count: number = 5) => {
    return computed(() => {
      // Always return empty array on server side
      if (!import.meta.client) {
        return []
      }
      return history.value.slice(0, count)
    })
  }

  // Initialize on mount (reload in case localStorage was updated)
  onMounted(() => {
    loadHistory()
  })

  return {
    history: computed(() => history.value),
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentHistory
  }
}
