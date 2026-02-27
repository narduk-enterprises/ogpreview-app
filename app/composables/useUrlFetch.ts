import type { PlatformScores, UnfurlResponse } from '~~/types/og'

interface UseUrlFetchOptions {
  initialScores?: PlatformScores | null
}

export const useUrlFetch = (options: UseUrlFetchOptions = {}) => {
  const _isLoading = ref(false)
  const _errorMessage = ref('')
  const _fetchedScores = ref<PlatformScores | null>(options.initialScores || null)

  const isLoading = computed(() => _isLoading.value)
  const errorMessage = computed(() => _errorMessage.value)
  const fetchedScores = computed(() => _fetchedScores.value)

  const isValidUrl = (urlString: string): boolean => {
    if (!urlString) return false

    try {
      // Add protocol if missing
      const urlToTest = /^https?:\/\//i.test(urlString.trim())
        ? urlString.trim()
        : `https://${urlString.trim()}`

      const urlObj = new URL(urlToTest)

      // Must have valid protocol
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false
      }

      // Must have hostname
      if (!urlObj.hostname || urlObj.hostname.length === 0) {
        return false
      }

      // Must have dot in hostname or be localhost
      if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') {
        return false
      }

      return true
    }
    catch {
      return false
    }
  }

  const fetchOGTags = async (url: string) => {
    if (!url || !isValidUrl(url)) {
      return null
    }

    // Normalize the URL (add https:// if missing)
    const normalizedUrl = /^https?:\/\//i.test(url.trim())
      ? url.trim()
      : `https://${url.trim()}`

    _isLoading.value = true
    _errorMessage.value = ''
    _fetchedScores.value = null

    try {
      const response = await $fetch<UnfurlResponse>('/api/unfurl', {
        method: 'GET',
        params: { url: normalizedUrl }
      })

      if (response.ok && response.data) {
        if (response.scores) {
          _fetchedScores.value = response.scores
        }
        return { ...response.data, url: response.data.url || normalizedUrl }
      }

      _errorMessage.value = response.error?.message || 'Failed to fetch OG tags from the website'
      return null
    }
    catch (error: any) {
      const errorData = error.data as UnfurlResponse | undefined
      _errorMessage.value = errorData?.error?.message || error.message || 'Failed to fetch website. Please check the URL and try again.'
      return null
    }
    finally {
      _isLoading.value = false
    }
  }

  const clearError = () => {
    _errorMessage.value = ''
  }

  const clearScores = () => {
    _fetchedScores.value = null
  }

  const setErrorMessage = (message: string) => {
    _errorMessage.value = message
  }

  return {
    isLoading,
    errorMessage,
    fetchedScores,
    isValidUrl,
    fetchOGTags,
    clearError,
    clearScores,
    setErrorMessage
  }
}
