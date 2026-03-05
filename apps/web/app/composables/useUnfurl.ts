/**
 * Composable for fetching OG data using the unfurl endpoints.
 * Supports both cached and force-refresh modes.
 */

import type { CacheDebugInfo, OGData, PlatformScores, UnfurlResponse } from '~~/types/og'
import { isValidUrl, normalizeUrl } from '~/utils/url'

interface UseUnfurlOptions {
  initialScores?: PlatformScores | null
  initialData?: OGData | null
}

export const useUnfurl = (options: UseUnfurlOptions = {}) => {
  const _isLoading = ref(false)
  const _errorMessage = ref('')
  const _fetchedScores = ref<PlatformScores | null>(options.initialScores || null)
  const _ogData = ref<OGData | null>(options.initialData || null)
  const _cacheDebugInfo = ref<CacheDebugInfo | null>(null)
  const _cacheBustToken = ref<number>(Date.now())

  const isLoading = computed(() => _isLoading.value)
  const errorMessage = computed(() => _errorMessage.value)
  const fetchedScores = computed(() => _fetchedScores.value)
  const ogData = computed(() => _ogData.value)
  const cacheDebugInfo = computed(() => _cacheDebugInfo.value)
  const cacheBustToken = computed(() => _cacheBustToken.value)



  /**
   * Fetch OG data using cached endpoint
   */
  const fetchCached = async (url: string): Promise<OGData | null> => {
    if (!url || !isValidUrl(url)) {
      return null
    }

    const normalizedUrl = normalizeUrl(url)

    _isLoading.value = true
    _errorMessage.value = ''
    _fetchedScores.value = null
    _ogData.value = null
    _cacheDebugInfo.value = null

    try {
      const response = await $fetch<UnfurlResponse>('/api/unfurl', {
        method: 'GET',
        params: { url: normalizedUrl },
        onResponse({ response }) {
          const headers = response.headers
          _cacheDebugInfo.value = {
            endpoint: 'cached',
            timestamp: Date.now(),
            age: headers.get('age') || undefined,
            cacheControl: headers.get('cache-control') || undefined
          }
        }
      })

      if (response.ok && response.data) {
        _fetchedScores.value = response.scores || null
        _ogData.value = response.data
        return response.data
      }
      else {
        _errorMessage.value = response.error?.message || 'Failed to fetch OG tags'
        return null
      }
    }
    catch (error: unknown) {
      const fetchError = error as { data?: UnfurlResponse; message?: string }
      const errorData = fetchError.data
      _errorMessage.value = errorData?.error?.message || fetchError.message || 'Failed to fetch URL'
      return null
    }
    finally {
      _isLoading.value = false
    }
  }

  /**
   * Fetch OG data using force refresh endpoint (bypasses cache)
   * Updates the cache bust token to force image reloads in the UI
   */
  const fetchRefresh = async (url: string): Promise<OGData | null> => {
    if (!url || !isValidUrl(url)) {
      return null
    }

    const normalizedUrl = normalizeUrl(url)

    _isLoading.value = true
    _errorMessage.value = ''
    _cacheDebugInfo.value = null

    try {
      const response = await $fetch<UnfurlResponse>('/api/unfurl/refresh', {
        method: 'GET',
        params: { url: normalizedUrl },
        onResponse({ response }) {
          const headers = response.headers
          _cacheDebugInfo.value = {
            endpoint: 'refresh',
            timestamp: Date.now(),
            age: headers.get('age') || undefined,
            cacheControl: headers.get('cache-control') || undefined
          }
        }
      })

      if (response.ok && response.data) {
        _fetchedScores.value = response.scores || null
        _ogData.value = response.data
        // Update cache bust token to force image reload in UI
        _cacheBustToken.value = Date.now()
        return response.data
      }
      else {
        _errorMessage.value = response.error?.message || 'Failed to fetch OG tags'
        return null
      }
    }
    catch (error: unknown) {
      const fetchError = error as { data?: UnfurlResponse; message?: string }
      const errorData = fetchError.data
      _errorMessage.value = errorData?.error?.message || fetchError.message || 'Failed to fetch URL'
      return null
    }
    finally {
      _isLoading.value = false
    }
  }

  const clearError = () => {
    _errorMessage.value = ''
  }

  const clearData = () => {
    _fetchedScores.value = null
    _ogData.value = null
    _cacheDebugInfo.value = null
  }

  const setErrorMessage = (message: string) => {
    _errorMessage.value = message
  }

  return {
    isLoading,
    errorMessage,
    fetchedScores,
    ogData,
    cacheDebugInfo,
    cacheBustToken,
    isValidUrl,
    normalizeUrl,
    fetchCached,
    fetchRefresh,
    clearError,
    clearData,
    setErrorMessage
  }
}
