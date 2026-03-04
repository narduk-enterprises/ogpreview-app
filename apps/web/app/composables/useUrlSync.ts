/**
 * Composable to sync URL with query parameters
 * Handles reading and writing the 'url' query parameter
 */
export const useUrlSync = () => {
  const route = useRoute()
  const router = useRouter()

  /**
   * Get the URL from query parameters
   */
  const getUrlFromQuery = (): string => {
    const urlParam = route.query.url
    if (typeof urlParam === 'string') {
      return urlParam
    }
    return ''
  }

  /**
   * Update the URL query parameter
   * @param url - The URL to set in the query parameter
   * @param replace - Whether to replace the current history entry (default: true)
   */
  const updateUrlQuery = async (url: string, replace = true) => {
    const currentUrl = route.query.url

    // Only update if the URL has changed
    if (currentUrl !== url) {
      const query = url ? { url } : {}

      if (replace) {
        await router.replace({ query })
      }
      else {
        await router.push({ query })
      }
    }
  }

  /**
   * Clear the URL query parameter
   */
  const clearUrlQuery = async () => {
    if (route.query.url) {
      await router.replace({ query: {} })
    }
  }

  /**
   * Get the shareable URL with the current preview URL
   */
  const getShareableUrl = (previewUrl: string): string => {
    if (import.meta.client) {
      const url = new URL(window.location.href)
      if (previewUrl) {
        url.searchParams.set('url', previewUrl)
      }
      else {
        url.searchParams.delete('url')
      }
      return url.toString()
    }
    return ''
  }

  /**
   * Copy the shareable URL to clipboard
   */
  const copyShareableUrl = async (previewUrl: string): Promise<boolean> => {
    try {
      const shareableUrl = getShareableUrl(previewUrl)
      await navigator.clipboard.writeText(shareableUrl)
      return true
    }
    catch (error) {
      console.error('Failed to copy URL:', error)
      return false
    }
  }

  return {
    getUrlFromQuery,
    updateUrlQuery,
    clearUrlQuery,
    getShareableUrl,
    copyShareableUrl
  }
}
