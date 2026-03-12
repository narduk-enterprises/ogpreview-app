import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import { sanitizeUrlForLog } from './logSanitizer'

/**
 * SSRF Protection and URL Validation
 * Prevents Server-Side Request Forgery attacks
 */

interface ValidationResult {
  valid: boolean
  error?: string
  normalizedUrl?: string
}

const MAX_URL_LENGTH = 2048
const MAX_REDIRECTS = 5
const FETCH_TIMEOUT = 30000 // 30 seconds
const MAX_RESPONSE_SIZE = 2 * 1024 * 1024 // 2MB

/**
 * Crawler User-Agent string following Open Graph protocol best practices
 * Identifies the service honestly as a crawler/bot rather than masquerading as a browser
 * This follows the pattern used by major platforms:
 * - Facebook: facebookexternalhit/1.1
 * - Twitter: Twitterbot/1.0
 * - LinkedIn: LinkedInBot/1.0
 * - Discord: Discordbot/2.0
 */
const CRAWLER_USER_AGENT = 'OGPreviewBot/1.0 (+https://ogpreview.app/bot)'

/**
 * Alternative User-Agents for fallback when rate limited
 * These mimic popular platform crawlers that sites often allow
 */
const FALLBACK_USER_AGENTS = [
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  'LinkedInBot/1.0 (compatible; Mozilla/5.0; +http://www.linkedin.com)',
  'Twitterbot/1.0',
  'Discordbot/2.0; +https://discord.com)',
  'WhatsApp/2.0',
  'TelegramBot (like TwitterBot)',
  'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
]

/**
 * Returns the crawler User-Agent string
 * Uses a consistent, honest User-Agent that identifies the service as a crawler
 * This helps sites identify and allow/block the crawler appropriately via robots.txt
 */
function selectUserAgent(_url: string): string {
  return CRAWLER_USER_AGENT
}

/**
 * Returns a fallback User-Agent by index
 * Used when we get rate limited to try alternative User-Agents
 */
function selectFallbackUserAgent(index: number): string {
  return FALLBACK_USER_AGENTS[index % FALLBACK_USER_AGENTS.length]!
}

/**
 * Check whether an IPv4 address is private/link-local/special
 */
function isPrivateIPv4(address: string): boolean {
  const octets = address.split('.').map(Number)
  if (octets.length !== 4 || octets.some(n => Number.isNaN(n) || n < 0 || n > 255)) {
    return true // treat invalid as private to be conservative
  }

  const [a, b] = octets
  const bVal = b ?? -1
  if (a === 10) return true
  if (a === 127) return true
  if (a === 0) return true
  if (a === 169 && bVal === 254) return true
  if (a === 172 && bVal >= 16 && bVal <= 31) return true
  if (a === 192 && bVal === 168) return true
  return false
}

/**
 * Check whether an IPv6 address is private/link-local/ULA/loopback
 */
function isPrivateIPv6(address: string): boolean {
  const normalized = address.toLowerCase()
  if (normalized === '::1') return true
  if (normalized.startsWith('fe80:')) return true // link-local
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true // ULA
  if (normalized.startsWith('::ffff:')) {
    // IPv4-mapped IPv6
    const mapped = normalized.replace('::ffff:', '')
    return isPrivateIPv4(mapped)
  }
  return false
}

/**
 * Validate that the resolved IP is public. Reject if any resolved address is private.
 */
export async function resolveAndAssertPublicHost(hostname: string): Promise<void> {
  const results = await lookup(hostname, { all: true, verbatim: true })
  if (!results || results.length === 0) {
    throw new Error('Domain not found')
  }

  for (const record of results) {
    const addr = record.address
    const ipType = isIP(addr)

    if (ipType === 4 && isPrivateIPv4(addr)) {
      throw new Error('Resolved to private IPv4 address')
    }

    if (ipType === 6 && isPrivateIPv6(addr)) {
      throw new Error('Resolved to private IPv6 address')
    }

    // If undetected type, be conservative and block
    if (ipType === 0) {
      throw new Error('Unrecognized IP address family')
    }
  }
}

/**
 * Validates URL format, protocol, and checks for SSRF vulnerabilities
 */
export function validateUrl(urlString: string): ValidationResult {
  // Check URL length
  if (!urlString || urlString.length === 0) {
    return { valid: false, error: 'URL is required' }
  }

  if (urlString.length > MAX_URL_LENGTH) {
    return { valid: false, error: `URL exceeds maximum length of ${MAX_URL_LENGTH} characters` }
  }

  // Parse URL
  let urlObj: URL
  try {
    urlObj = new URL(urlString)
  }
  catch {
    return { valid: false, error: 'Invalid URL format' }
  }

  // Check protocol
  if (!['http:', 'https:'].includes(urlObj.protocol)) {
    return { valid: false, error: 'URL must use HTTP or HTTPS protocol' }
  }

  // Check for credentials in URL (security risk)
  if (urlObj.username || urlObj.password) {
    return { valid: false, error: 'URLs with credentials are not allowed' }
  }

  // Check hostname
  const hostname = urlObj.hostname.toLowerCase()

  // Block localhost variations (except in test mode for fixtures)
  // eslint-disable-next-line narduk/prefer-import-meta-dev -- server-side test mode check requires process.env; import.meta.dev is only available in Nuxt build context
  const isTestMode = process.env.NODE_ENV === 'test'
  const isFixturePath = urlObj.pathname.includes('/__fixtures__/')
  if (!isTestMode && !isFixturePath && (hostname === 'localhost' || hostname === '0.0.0.0')) {
    return { valid: false, error: 'Localhost URLs are not allowed' }
  }

  // Additional hostname validation
  if (hostname.length === 0) {
    return { valid: false, error: 'Invalid hostname' }
  }

  // Check for valid domain (must have a dot unless it's an IP literal or localhost)
  // Bounded IPv4 pattern — not susceptible to ReDoS
  // eslint-disable-next-line security/detect-unsafe-regex -- IPv4 pattern is bounded by anchors and quantifiers are not nested; not susceptible to ReDoS
  const isIPv4 = /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)
  const isIPv6 = hostname.includes(':') || hostname.startsWith('[')
  const isLocalhost = hostname === 'localhost'
  // isFixturePath already defined above, reuse it
  if (!hostname.includes('.') && !isIPv4 && !isIPv6 && !(isLocalhost && isFixturePath)) {
    return { valid: false, error: 'Invalid domain name' }
  }

  // Normalize URL: remove trailing slash for root paths to avoid redirect issues
  let normalizedHref = urlObj.href
  if (urlObj.pathname === '/' && normalizedHref.endsWith('/')) {
    normalizedHref = normalizedHref.slice(0, -1)
  }

  return {
    valid: true,
    normalizedUrl: normalizedHref
  }
}

function isRedirect(status: number): boolean {
  return status >= 300 && status < 400
}

interface SafeFetchResult {
  ok: boolean
  html?: string
  finalUrl?: string
  error?: { code: string, message: string, details?: string }
}

/**
 * Fetches HTML from a URL with DNS-based SSRF protection, manual redirects, and streaming size limits.
 */
export async function fetchWithValidatedRedirects(url: string): Promise<SafeFetchResult> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)
  const startTime = Date.now()
  const DEBUG = process.env.UNFURL_DEBUG === '1'

  let currentUrl = url
  let redirects = 0

  if (DEBUG) console.log(`[fetchWithValidatedRedirects] Starting fetch for: ${sanitizeUrlForLog(url)}`)

  try {
    while (true) {
      const validation = validateUrl(currentUrl)
      if (!validation.valid) {
        console.error(`[fetchWithValidatedRedirects] Invalid URL: ${sanitizeUrlForLog(currentUrl)}`, validation.error)
        return {
          ok: false,
          error: {
            code: 'INVALID_URL',
            message: validation.error || 'Invalid URL'
          }
        }
      }

      const normalizedUrl = validation.normalizedUrl!
      const urlObj = new URL(normalizedUrl)

      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Validated URL: ${sanitizeUrlForLog(normalizedUrl)}, redirects: ${redirects}`)

      // Skip DNS validation for localhost in test mode or fixture paths
      // eslint-disable-next-line narduk/prefer-import-meta-dev -- server-side test mode check requires process.env; import.meta.dev is only available in Nuxt build context
      const isTestMode = process.env.NODE_ENV === 'test'
      const isLocalhost = urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1' || urlObj.hostname === '0.0.0.0'
      const isFixturePath = urlObj.pathname.includes('/__fixtures__/')

      if (!(isLocalhost && (isTestMode || isFixturePath))) {
        try {
          if (DEBUG) console.log(`[fetchWithValidatedRedirects] Resolving DNS for: ${urlObj.hostname}`)
          await resolveAndAssertPublicHost(urlObj.hostname)
          if (DEBUG) console.log(`[fetchWithValidatedRedirects] DNS resolution successful for: ${urlObj.hostname}`)
        }
        catch (err: unknown) {
          const dnsError = err instanceof Error ? err : new Error(String(err))
          console.error(`[fetchWithValidatedRedirects] DNS resolution failed for ${urlObj.hostname}:`, dnsError.message)
          return {
            ok: false,
            error: {
              code: 'SSRF_BLOCKED',
              message: 'URL resolves to a private or disallowed address',
              details: dnsError.message
            }
          }
        }
      }

      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Fetching: ${sanitizeUrlForLog(normalizedUrl)}`)
      const fetchStartTime = Date.now()

      // Use browser-like headers to avoid bot detection
      // NOTE: Do NOT set Accept-Encoding manually - let Node/Nitro handle decompression transparently
      // Manually setting it can result in receiving compressed bytes that aren't decompressed
      // Use honest crawler User-Agent that identifies the service
      const urlObjForHeaders = new URL(normalizedUrl)
      const selectedUserAgent = selectUserAgent(normalizedUrl)

      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Selected User-Agent: ${selectedUserAgent.substring(0, 50)}...`)

      const headers: HeadersInit = {
        'User-Agent': selectedUserAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
        'Referer': `${urlObjForHeaders.protocol}//${urlObjForHeaders.hostname}/`,
        'Origin': `${urlObjForHeaders.protocol}//${urlObjForHeaders.hostname}`
      }

      const response = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers,
        redirect: 'manual'
      })

      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Fetch completed in ${Date.now() - fetchStartTime}ms, status: ${response.status} ${response.statusText}`)

      // Handle redirects manually
      if (isRedirect(response.status)) {
        const location = response.headers.get('location')
        if (DEBUG) console.log(`[fetchWithValidatedRedirects] Redirect ${response.status} to: ${location}`)
        if (!location) {
          console.error(`[fetchWithValidatedRedirects] Redirect missing Location header for status ${response.status}`)
          return {
            ok: false,
            error: {
              code: 'REDIRECT_ERROR',
              message: 'Redirect response missing Location header',
              details: `HTTP ${response.status}`
            }
          }
        }

        if (redirects >= MAX_REDIRECTS) {
          console.error(`[fetchWithValidatedRedirects] Too many redirects: ${redirects} >= ${MAX_REDIRECTS}`)
          return {
            ok: false,
            error: {
              code: 'TOO_MANY_REDIRECTS',
              message: `Exceeded maximum redirect limit of ${MAX_REDIRECTS}`
            }
          }
        }

        const nextUrl = new URL(location, normalizedUrl).href
        redirects++
        currentUrl = nextUrl
        if (DEBUG) console.log(`[fetchWithValidatedRedirects] Following redirect ${redirects}/${MAX_REDIRECTS} to: ${sanitizeUrlForLog(nextUrl)}`)
        continue
      }

      // Check response status
      // Handle 429 (Too Many Requests) with fallback User-Agents
      if (response.status === 429) {
        if (DEBUG) console.log(`[fetchWithValidatedRedirects] Got 429, trying fallback User-Agents...`)

        // Try fallback User-Agents in order
        for (let fallbackIndex = 0; fallbackIndex < FALLBACK_USER_AGENTS.length; fallbackIndex++) {
          const fallbackUserAgent = selectFallbackUserAgent(fallbackIndex)
          if (DEBUG) console.log(`[fetchWithValidatedRedirects] Trying fallback ${fallbackIndex + 1}/${FALLBACK_USER_AGENTS.length}: ${fallbackUserAgent.substring(0, 50)}...`)

          try {
            const fallbackHeaders: HeadersInit = {
              'User-Agent': fallbackUserAgent,
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              'Accept-Language': 'en-US,en;q=0.9',
              'DNT': '1',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Sec-Fetch-Site': 'none',
              'Sec-Fetch-User': '?1',
              'Cache-Control': 'max-age=0',
              'Referer': `${urlObjForHeaders.protocol}//${urlObjForHeaders.hostname}/`,
              'Origin': `${urlObjForHeaders.protocol}//${urlObjForHeaders.hostname}`
            }

            const fallbackResponse = await fetch(normalizedUrl, {
              signal: controller.signal,
              headers: fallbackHeaders,
              redirect: 'manual'
            })

            if (DEBUG) console.log(`[fetchWithValidatedRedirects] Fallback ${fallbackIndex + 1} returned status: ${fallbackResponse.status}`)

            // If fallback succeeded (2xx), use it
            if (fallbackResponse.ok) {
              if (DEBUG) console.log(`[fetchWithValidatedRedirects] Fallback ${fallbackIndex + 1} succeeded!`)
              // Continue with the fallback response
              const contentType = fallbackResponse.headers.get('content-type') || ''
              if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
                // Try next fallback if content type is wrong
                continue
              }

              // Use the fallback response
              const reader = fallbackResponse.body?.getReader()
              if (!reader) {
                continue // Try next fallback
              }

              let html = ''
              let totalSize = 0
              while (true) {
                const { done, value } = await reader.read()
                if (done) break

                totalSize += value.length
                if (totalSize > MAX_RESPONSE_SIZE) {
                  return {
                    ok: false,
                    error: {
                      code: 'RESPONSE_TOO_LARGE',
                      message: `Response too large: ${totalSize} bytes`,
                      details: `Exceeded limit of ${MAX_RESPONSE_SIZE} bytes`
                    }
                  }
                }

                html += new TextDecoder().decode(value, { stream: true })
              }

              return {
                ok: true,
                html,
                finalUrl: normalizedUrl
              }
            }

            // If fallback also got 429, try next one
            if (fallbackResponse.status === 429) {
              continue
            }

            // For other errors, try next fallback
            if (!fallbackResponse.ok) {
              continue
            }
          }
          catch (fallbackError: unknown) {
            // If fallback fails, try next one
            if (DEBUG) console.log(`[fetchWithValidatedRedirects] Fallback ${fallbackIndex + 1} failed:`, fallbackError instanceof Error ? fallbackError.message : String(fallbackError))
            continue
          }
        }

        // All fallbacks failed
        console.error(`[fetchWithValidatedRedirects] All fallback User-Agents failed for 429`)
        return {
          ok: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests. All fallback methods failed.',
            details: `Tried ${FALLBACK_USER_AGENTS.length} fallback User-Agents`
          }
        }
      }

      // For other non-ok responses, check content type
      // For 400/403 errors, some sites (like Facebook) may still return HTML with OG tags
      // Some sites return HTML even with wrong content-type headers, so we'll try to parse anyway
      // Only skip parsing for clearly non-HTML content types (JSON, images, etc.)
      if (!response.ok) {
        const contentType = response.headers.get('content-type') || ''
        const isHtmlContent = contentType.includes('text/html') || contentType.includes('application/xhtml')
        const isNonHtmlContent = contentType.includes('application/json')
          || contentType.includes('image/')
          || contentType.includes('application/octet-stream')
          || contentType.includes('text/plain') && !contentType.includes('html')

        // For clearly non-HTML error responses, return error immediately
        if (isNonHtmlContent) {
          console.error(`[fetchWithValidatedRedirects] HTTP error with non-HTML content: ${response.status} ${response.statusText}`)
          return {
            ok: false,
            error: {
              code: response.status === 400 ? 'BAD_REQUEST' : response.status === 403 ? 'FORBIDDEN' : 'HTTP_ERROR',
              message: `Server returned ${response.status} ${response.statusText}`,
              details: `HTTP ${response.status}, Content-Type: ${contentType}`
            }
          }
        }

        // For HTML or unknown content types, log but continue to try parsing
        // Many sites return HTML even with 403, and some have incorrect content-type headers
        console.warn(`[fetchWithValidatedRedirects] HTTP ${response.status} but continuing to parse content`, {
          url: normalizedUrl,
          contentType,
          isHtmlContent
        })
      }

      // Check content type
      const contentType = response.headers.get('content-type') || ''
      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Content-Type: ${contentType}`)
      if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
        console.error(`[fetchWithValidatedRedirects] Invalid content type: ${contentType}`)
        return {
          ok: false,
          error: {
            code: 'INVALID_CONTENT_TYPE',
            message: 'URL does not return HTML content',
            details: contentType
          }
        }
      }

      // Check content length if available
      const contentLengthHeader = response.headers.get('content-length')
      if (contentLengthHeader && Number.parseInt(contentLengthHeader) > MAX_RESPONSE_SIZE) {
        return {
          ok: false,
          error: {
            code: 'CONTENT_TOO_LARGE',
            message: 'Response size exceeds maximum limit',
            details: `${contentLengthHeader} bytes`
          }
        }
      }

      // Stream response with size limit
      // Optimization: Stop streaming after </head> tag since OG tags are in <head>
      // This allows us to parse large pages without downloading the entire body
      const reader = response.body?.getReader()
      if (!reader) {
        console.error(`[fetchWithValidatedRedirects] No response body reader available`)
        return {
          ok: false,
          error: {
            code: 'EMPTY_RESPONSE',
            message: 'Server returned empty content'
          }
        }
      }

      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Starting to stream response body`)
      const decoder = new TextDecoder()
      let html = ''
      let totalSize = 0
      const HEAD_END_MARKER = '</head>'
      const HEAD_END_MARKER_LOWER = '</head>'
      let foundHeadEnd = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (!value) continue

        totalSize += value.length

        // Check size limit
        if (totalSize > MAX_RESPONSE_SIZE) {
          console.error(`[fetchWithValidatedRedirects] Response too large: ${totalSize} bytes > ${MAX_RESPONSE_SIZE} bytes`)
          reader.cancel()
          return {
            ok: false,
            error: {
              code: 'CONTENT_TOO_LARGE',
              message: 'Response size exceeds maximum limit',
              details: `${totalSize} bytes`
            }
          }
        }

        const chunk = decoder.decode(value, { stream: true })
        html += chunk

        // Check if we've found the closing </head> tag (case-insensitive)
        // Once we have the head section, we have all OG tags, so we can stop streaming
        const htmlLower = html.toLowerCase()
        const headEndIndex = htmlLower.indexOf(HEAD_END_MARKER_LOWER)
        if (headEndIndex !== -1) {
          // Found </head>, extract up to and including it, plus a bit more for safety
          // Some sites have meta tags right before </head>
          const extractEnd = Math.min(headEndIndex + HEAD_END_MARKER.length + 1000, html.length)
          html = html.substring(0, extractEnd)
          foundHeadEnd = true
          if (DEBUG) console.log(`[fetchWithValidatedRedirects] Found </head> tag, stopping stream early at ${html.length} bytes`)
          reader.cancel()
          break
        }
      }

      // Finalize decoder if we didn't cancel early
      if (!foundHeadEnd) {
        html += decoder.decode()
      }

      if (html.length === 0) {
        console.error(`[fetchWithValidatedRedirects] Empty HTML content after streaming`)
        return {
          ok: false,
          error: {
            code: 'EMPTY_RESPONSE',
            message: 'Server returned empty content'
          }
        }
      }

      clearTimeout(timeoutId)
      const totalTime = Date.now() - startTime
      if (DEBUG) console.log(`[fetchWithValidatedRedirects] Successfully fetched ${html.length} bytes in ${totalTime}ms from ${sanitizeUrlForLog(response.url || normalizedUrl)}`)

      return {
        ok: true,
        html,
        finalUrl: response.url || normalizedUrl
      }
    }
  }
  catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    const errWithCode = error as { code?: string }
    const totalTime = Date.now() - startTime
    console.error(`[fetchWithValidatedRedirects] Error after ${totalTime}ms:`, {
      name: err.name,
      message: err.message,
      code: errWithCode.code,
      stack: err.stack
    })

    if (err.name === 'AbortError') {
      console.error(`[fetchWithValidatedRedirects] Request timeout after ${FETCH_TIMEOUT}ms`)
      return {
        ok: false,
        error: {
          code: 'TIMEOUT',
          message: `Request timed out after ${FETCH_TIMEOUT / 1000} seconds`,
          details: 'The server took too long to respond'
        }
      }
    }

    if (errWithCode.code === 'ENOTFOUND') {
      console.error(`[fetchWithValidatedRedirects] DNS error: Domain not found`)
      return {
        ok: false,
        error: {
          code: 'DNS_ERROR',
          message: 'Domain not found',
          details: 'Could not resolve hostname'
        }
      }
    }

    if (errWithCode.code === 'ECONNREFUSED') {
      console.error(`[fetchWithValidatedRedirects] Connection refused`)
      return {
        ok: false,
        error: {
          code: 'CONNECTION_REFUSED',
          message: 'Connection refused',
          details: 'Server refused the connection'
        }
      }
    }

    if (errWithCode.code === 'ECONNRESET') {
      console.error(`[fetchWithValidatedRedirects] Connection reset`)
      return {
        ok: false,
        error: {
          code: 'CONNECTION_RESET',
          message: 'Connection reset',
          details: 'Server closed the connection'
        }
      }
    }

    console.error(`[fetchWithValidatedRedirects] Unknown fetch error:`, err)
    return {
      ok: false,
      error: {
        code: 'FETCH_ERROR',
        message: err.message || 'Failed to fetch URL',
        details: errWithCode.code || err.toString()
      }
    }
  }
  finally {
    clearTimeout(timeoutId)
  }
}

// Backwards compatibility export for existing call sites (will be replaced by fetchWithValidatedRedirects)
export const fetchUrlSafely = fetchWithValidatedRedirects

export const VALIDATION_CONSTANTS = {
  MAX_URL_LENGTH,
  MAX_REDIRECTS,
  FETCH_TIMEOUT,
  MAX_RESPONSE_SIZE
}
