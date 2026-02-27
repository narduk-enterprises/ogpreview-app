/**
 * GET /api/image
 *
 * Proxy endpoint for fetching external images to avoid CORS issues
 * Fetches images server-side and streams them to the client
 *
 * Query Parameters:
 *   - url (required): The image URL to fetch
 *
 * Cache Headers:
 *   Cache-Control: max-age=86400, s-maxage=86400
 *   - Browser caches for 24 hours
 *   - CDN caches for 24 hours
 */

import { getQuery, setResponseHeader, setResponseHeaders, setResponseStatus } from 'h3'
import { validateUrl } from '../utils/urlValidator'
import { sanitizeUrlForLog } from '../utils/logSanitizer'

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB limit

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const imageUrl = query.url as string

  // Validate URL parameter
  if (!imageUrl) {
    setResponseStatus(event, 400)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return {
      ok: false,
      error: {
        code: 'MISSING_URL',
        message: 'URL parameter is required'
      }
    }
  }

  // Validate the URL
  const validation = validateUrl(imageUrl)
  if (!validation.valid) {
    setResponseStatus(event, 400)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return {
      ok: false,
      error: {
        code: 'INVALID_URL',
        message: validation.error || 'Invalid URL'
      }
    }
  }

  const urlToFetch = validation.normalizedUrl || imageUrl

  try {
    // Fetch the image
    const response = await fetch(urlToFetch, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGPreviewBot/1.0; +https://ogpreview.app)',
        'Accept': 'image/*,*/*;q=0.8',
        'Referer': urlToFetch
      },
      redirect: 'follow',
      // Timeout after 10 seconds
      signal: AbortSignal.timeout(10000)
    })

    // Check if response is OK
    if (!response.ok) {
      setResponseStatus(event, response.status)
      setResponseHeader(event, 'Content-Type', 'application/json')
      return {
        ok: false,
        error: {
          code: 'FETCH_ERROR',
          message: `Failed to fetch image: ${response.status} ${response.statusText}`
        }
      }
    }

    // Check if it's actually an image
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.startsWith('image/')) {
      setResponseStatus(event, 400)
      setResponseHeader(event, 'Content-Type', 'application/json')
      return {
        ok: false,
        error: {
          code: 'NOT_AN_IMAGE',
          message: 'URL does not point to an image'
        }
      }
    }

    // Check content-length header if available
    const contentLength = response.headers.get('content-length')
    if (contentLength && Number.parseInt(contentLength) > MAX_IMAGE_SIZE) {
      setResponseStatus(event, 413)
      setResponseHeader(event, 'Content-Type', 'application/json')
      return {
        ok: false,
        error: {
          code: 'IMAGE_TOO_LARGE',
          message: 'Image is too large'
        }
      }
    }

    // Get the image buffer
    const arrayBuffer = await response.arrayBuffer()

    // Check actual size
    if (arrayBuffer.byteLength > MAX_IMAGE_SIZE) {
      setResponseStatus(event, 413)
      setResponseHeader(event, 'Content-Type', 'application/json')
      return {
        ok: false,
        error: {
          code: 'IMAGE_TOO_LARGE',
          message: 'Image is too large'
        }
      }
    }

    const buffer = Buffer.from(arrayBuffer)

    // Set appropriate headers
    setResponseHeaders(event, {
      'Content-Type': contentType,
      'Content-Length': String(buffer.length),
      'Cache-Control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Max-Age': '86400'
    })

    setResponseStatus(event, 200)
    // Return buffer - H3 will handle binary response correctly
    return buffer
  }
  catch (error: any) {
    const sanitizedError = sanitizeUrlForLog(error.message || String(error))
    const sanitizedUrl = sanitizeUrlForLog(urlToFetch)
    console.error(`[image] Error fetching image ${sanitizedUrl}:`, sanitizedError)

    setResponseHeader(event, 'Content-Type', 'application/json')

    // Handle timeout
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      setResponseStatus(event, 504)
      return {
        ok: false,
        error: {
          code: 'TIMEOUT',
          message: 'Image fetch timed out'
        }
      }
    }

    setResponseStatus(event, 500)
    return {
      ok: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch image'
      }
    }
  }
})
