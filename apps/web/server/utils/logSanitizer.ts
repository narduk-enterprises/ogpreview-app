/**
 * Logging sanitization utilities
 * Prevents sensitive data from appearing in logs
 */

const MAX_URL_LENGTH = 100

/**
 * Sanitize a URL for logging
 * - Removes query string and fragment
 * - Caps length
 * - Preserves hostname and path
 */
export function sanitizeUrlForLog(url: string): string {
  if (!url) {
    return '[empty]'
  }

  try {
    const urlObj = new URL(url)
    // Reconstruct without query/fragment
    const sanitized = `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`

    // Cap length
    if (sanitized.length > MAX_URL_LENGTH) {
      return sanitized.substring(0, MAX_URL_LENGTH - 3) + '...'
    }

    return sanitized
  }
  catch {
    // If URL parsing fails, just truncate the original
    if (url.length > MAX_URL_LENGTH) {
      return url.substring(0, MAX_URL_LENGTH - 3) + '...'
    }
    return url
  }
}

/**
 * Sanitize an error object for logging
 * Only includes safe fields, excludes stack traces in production
 */
export function sanitizeErrorForLog(error: any): Record<string, any> {
  const sanitized: Record<string, any> = {
    message: error?.message || String(error),
    code: error?.code,
    name: error?.name
  }

  // Only include stack in development
  if (process.env.NODE_ENV === 'development' && error?.stack) {
    sanitized.stack = error.stack.substring(0, 500) // Limit stack trace length
  }

  return sanitized
}
