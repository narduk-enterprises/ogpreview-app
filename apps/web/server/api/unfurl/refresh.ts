/**
 * GET /api/unfurl/refresh
 *
 * Force refresh endpoint that bypasses all caching
 * Used when user explicitly clicks "Refresh" button
 *
 * Query Parameters:
 *   - url (required): The URL to unfurl
 *
 * Cache Headers:
 *   Cache-Control: no-store
 *   - Never cached anywhere (browser or CDN)
 */

import { getQuery, setResponseHeaders, setResponseStatus } from 'h3'
import { z } from 'zod'
import { unfurlUrl } from '#server/utils/unfurlCore'
import type { UnfurlResponse } from '~~/types/og'

const QuerySchema = z.object({ url: z.string().optional() })

export default defineEventHandler(async (event): Promise<UnfurlResponse> => {
  const query = getQuery(event)
  const parsed = QuerySchema.safeParse(query)
  const url = parsed.success ? parsed.data.url : undefined
  
  if (!url) {
    setResponseStatus(event, 400)
    return { ok: false, error: { code: 'MISSING_URL', message: 'URL parameter is required' } }
  }

  // Use shared core unfurl logic with no-store cache mode
  const runtimeConfig = useRuntimeConfig(event)
  const workerEnv = {
    nodeEnv: String(runtimeConfig.nodeEnv || 'production'),
    unfurlDebug: String(runtimeConfig.unfurlDebug) === '1',
  }
  const { response, status } = await unfurlUrl(url, { cacheMode: 'no-store', workerEnv })

  // If error, return early with status
  if (!response.ok) {
    setResponseStatus(event, status)
    return response
  }

  // Set no-store headers to prevent all caching
  setResponseHeaders(event, {
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'CDN-Cache-Control': 'no-store',
    'Vercel-CDN-Cache-Control': 'no-store',
    'Pragma': 'no-cache',
    'Expires': '0'
  })

  // Return successful response
  setResponseStatus(event, status)
  return response
})
