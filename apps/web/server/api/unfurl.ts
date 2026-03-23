/**
 * GET /api/unfurl
 *
 * Cacheable unfurl endpoint for normal usage
 * Uses CDN caching with s-maxage and stale-while-revalidate
 *
 * Query Parameters:
 *   - url (required): The URL to unfurl
 *   - lang (optional): Language preference (not implemented yet)
 *
 * Cache Headers:
 *   Cache-Control: max-age=0, s-maxage=3600, stale-while-revalidate=86400
 *   - Browser doesn't cache (max-age=0)
 *   - Vercel CDN caches for 1 hour (s-maxage=3600)
 *   - Stale responses can be served for up to 24h while revalidating (stale-while-revalidate=86400)
 */

import { getQuery, getRequestHeader, setResponseHeader, setResponseHeaders, setResponseStatus } from 'h3'
import { z } from 'zod'
import { generateETag } from '#server/utils/etag'
import { unfurlUrl } from '#server/utils/unfurlCore'
import { checkRateLimit } from '#server/utils/rateLimiter'
import { sanitizeUrlForLog, sanitizeErrorForLog } from '#server/utils/logSanitizer'
import type { UnfurlResponse } from '~~/types/og'

const QuerySchema = z.object({
  url: z.string().optional(),
  debug: z.string().optional()
})

export default defineEventHandler(async (event): Promise<UnfurlResponse> => {
  // Rate limiting check
  const rateLimitResult = checkRateLimit(event)
  if (!rateLimitResult.allowed) {
    setResponseStatus(event, 429)
    setResponseHeader(event, 'Retry-After', rateLimitResult.retryAfter || 60)
    return {
      ok: false,
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again later.'
      }
    }
  }

  const query = getQuery(event)
  const parsed = QuerySchema.safeParse(query)
  const parsedQuery = parsed.success ? parsed.data : { url: undefined, debug: undefined }
  
  // Ignore cache busting parameter
  const url = parsedQuery.url
  const includeRaw = parsedQuery.debug === '1'

  // Validate URL parameter early
  if (!url) {
    setResponseStatus(event, 400)
    return {
      ok: false,
      error: {
        code: 'MISSING_URL',
        message: 'URL parameter is required'
      }
    }
  }

  // Use shared core unfurl logic
  const runtimeConfig = useRuntimeConfig(event)
  const workerEnv = {
    nodeEnv: String(runtimeConfig.nodeEnv || 'production'),
    unfurlDebug: String(runtimeConfig.unfurlDebug) === '1',
  }

  let result
  try {
    result = await unfurlUrl(url, { includeRaw, workerEnv })
  }
  catch (error: unknown) {
    // Log sanitized error
    const sanitizedError = sanitizeErrorForLog(error)
    const sanitizedUrl = sanitizeUrlForLog(url)
    console.error(`[unfurl] Unexpected error for ${sanitizedUrl}:`, sanitizedError)

    setResponseStatus(event, 500)
    return {
      ok: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An internal error occurred'
      }
    }
  }

  const { response, status } = result

  // If error, return early with status
  if (!response.ok) {
    setResponseStatus(event, status)
    // Ensure error response is consistent
    return {
      ok: false,
      error: response.error || {
        code: 'UNKNOWN_ERROR',
        message: 'An error occurred while processing the request'
      }
    }
  }

  const { data: ogData, scores } = response

  // Conditional ETag handling (only for cacheable responses)
  if (!includeRaw) {
    const etag = generateETag(ogData!, scores)
    const clientETag = getRequestHeader(event, 'if-none-match')

    if (clientETag && clientETag === etag) {
      // Set cache headers BEFORE returning 304 - critical for CDN/browser behavior
      setResponseHeaders(event, {
        'ETag': etag,
        'Cache-Control': 'max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        'Vercel-CDN-Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      })
      setResponseStatus(event, 304)
      return { ok: true }
    }

    setResponseHeader(event, 'ETag', etag)
  }

  // Set caching headers
  if (includeRaw) {
    setResponseHeaders(event, {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
  }
  else {
    setResponseHeaders(event, {
      'Cache-Control': 'max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      'Vercel-CDN-Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
    })
  }

  // Return successful response
  setResponseStatus(event, 200)
  return {
    ok: true,
    data: ogData,
    scores
  }
})
