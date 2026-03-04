/**
 * Core unfurl logic shared between /api/unfurl and /api/unfurl/refresh
 * Extracted to prevent code duplication and drift
 */

import { validateUrl, fetchWithValidatedRedirects } from './urlValidator'
import { parseOGTags, hasMinimalData } from './ogParser'
import { calculatePlatformScores } from './ogScorer'
import { sanitizeUrlForLog, sanitizeErrorForLog } from './logSanitizer'
import type { UnfurlResponse } from '~~/types/og'

export interface UnfurlOptions {
  includeRaw?: boolean
  cacheMode?: 'cacheable' | 'no-store'
}

/**
 * Core unfurl function that handles URL validation, fetching, parsing, and scoring
 */
export async function unfurlUrl(
  url: string,
  options: UnfurlOptions = {}
): Promise<{ response: UnfurlResponse, status: number }> {
  const { includeRaw = false } = options
  const DEBUG = process.env.UNFURL_DEBUG === '1'

  // Validate URL parameter
  if (!url) {
    if (DEBUG) console.error('[unfurlCore] Missing URL parameter')
    return {
      response: {
        ok: false,
        error: {
          code: 'MISSING_URL',
          message: 'URL parameter is required'
        }
      },
      status: 400
    }
  }

  // Validate URL format and SSRF protection
  const validation = validateUrl(url)
  if (!validation.valid) {
    const sanitizedUrl = sanitizeUrlForLog(url)
    console.error(`[unfurlCore] Invalid URL: ${sanitizedUrl}`, validation.error)
    return {
      response: {
        ok: false,
        error: {
          code: 'INVALID_URL',
          message: validation.error || 'Invalid URL'
        }
      },
      status: 400
    }
  }

  const sanitizedUrl = sanitizeUrlForLog(validation.normalizedUrl!)
  if (DEBUG) console.log(`[unfurlCore] Validated URL: ${sanitizedUrl}`)

  // Fetch HTML safely with DNS + redirect validation
  let fetchResult
  try {
    if (DEBUG) console.log(`[unfurlCore] Fetching HTML for: ${sanitizedUrl}`)
    fetchResult = await fetchWithValidatedRedirects(validation.normalizedUrl!)
    if (DEBUG) console.log(`[unfurlCore] Fetch completed, ok: ${fetchResult.ok}`)
  }
  catch (error: any) {
    const sanitizedError = sanitizeErrorForLog(error)
    console.error(`[unfurlCore] Fetch error for ${sanitizedUrl}:`, sanitizedError)
    return {
      response: {
        ok: false,
        error: {
          code: 'FETCH_ERROR',
          message: error?.message || 'Failed to fetch URL'
        }
      },
      status: 502
    }
  }

  if (!fetchResult.ok) {
    console.error(`[unfurlCore] Fetch failed for ${sanitizedUrl}:`, fetchResult.error)
    return {
      response: {
        ok: false,
        error: fetchResult.error || {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch URL'
        }
      },
      status: 502 // Bad Gateway for upstream errors
    }
  }

  // Parse OG tags
  const ogData = parseOGTags(
    fetchResult.html!,
    fetchResult.finalUrl || validation.normalizedUrl!,
    { includeRaw }
  )

  // Check if we got minimal data
  if (!hasMinimalData(ogData)) {
    return {
      response: {
        ok: false,
        error: {
          code: 'NO_META_TAGS',
          message: 'No Open Graph or meta tags found',
          details: 'The page does not contain any recognizable metadata'
        }
      },
      status: 404
    }
  }

  // Calculate scores
  const scores = calculatePlatformScores(ogData)

  return {
    response: {
      ok: true,
      data: ogData,
      scores
    },
    status: 200
  }
}
