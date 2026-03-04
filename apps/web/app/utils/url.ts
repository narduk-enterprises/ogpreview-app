/**
 * Shared URL validation and normalization utilities.
 * Single source of truth — used by composables and components.
 */

/**
 * Validates whether a string is a well-formed HTTP(S) URL.
 */
export function isValidUrl(urlString: string): boolean {
  if (!urlString) return false

  try {
    const trimmed = urlString.trim()
    const urlToTest = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`

    const urlObj = new URL(urlToTest)

    if (!['http:', 'https:'].includes(urlObj.protocol)) return false
    if (!urlObj.hostname || urlObj.hostname.length === 0) return false
    if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') return false

    return true
  }
  catch {
    return false
  }
}

/**
 * Normalizes a URL by prepending `https://` if no protocol is present.
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}
