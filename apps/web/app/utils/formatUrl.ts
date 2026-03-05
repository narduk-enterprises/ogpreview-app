import { normalizeUrl } from './url'

/**
 * Format a URL to display only the hostname
 */
export function formatUrl(url: string): string {
  if (!url) return 'example.com'
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '').toLowerCase()
  }
  catch {
    return 'example.com'
  }
}

/**
 * Extract domain name from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    const parts = urlObj.hostname.split('.')
    return parts.length > 1 ? (parts.at(-2) ?? urlObj.hostname) : urlObj.hostname
  }
  catch {
    return 'domain'
  }
}

/**
 * Validate if a string can be a valid URL (with or without protocol)
 * @param url - The URL to validate
 * @returns true if valid or can be normalized to valid URL
 */
export function isValidUrlFormat(url: string): boolean {
  if (!url) return false

  try {
    const normalized = normalizeUrl(url)
    const urlObj = new URL(normalized)

    // Must have a valid protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }

    // Must have a hostname
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return false
    }

    // Must have at least one dot in hostname (e.g., example.com)
    // Exception: localhost
    if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') {
      return false
    }

    return true
  }
  catch {
    return false
  }
}
