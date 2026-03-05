/**
 * Open Graph Tag Parser
 * Extracts and normalizes OG, Twitter, and standard meta tags
 */

import * as cheerio from 'cheerio'
import type { OGData } from '~~/types/og'

/**
 * Helper to extract meta tag content
 */
function extractMetaTag(
  $: cheerio.CheerioAPI,
  selector: string,
  attribute: string = 'content'
): string {
  const element = $(selector).first()
  return element.attr(attribute)?.trim() || ''
}

/**
 * Resolve relative URLs against base URL
 * Handles protocol-relative URLs (//cdn.example.com/image.jpg)
 */
function resolveUrl(url: string, baseUrl: string): string {
  if (!url) return ''

  try {
    // Already absolute
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    // Protocol-relative URL (//cdn.example.com/path)
    if (url.startsWith('//')) {
      const baseProtocol = new URL(baseUrl).protocol
      return `${baseProtocol}${url}`
    }

    // Resolve relative URL (including /path and path)
    return new URL(url, baseUrl).href
  }
  catch {
    return url
  }
}

/**
 * Extract all meta tags for debugging
 */
function extractRawMetaTags($: cheerio.CheerioAPI): Record<string, string | string[]> {
  const raw: Record<string, string | string[]> = {}

  const pushValue = (key: string, value: string) => {
    if (!raw[key]) {
      raw[key] = value
    }
    else if (Array.isArray(raw[key])) {
      raw[key].push(value)
    }
    else {
      raw[key] = [raw[key] as string, value]
    }
  }

  // OG tags (check both property and name attributes)
  // Some sites incorrectly use name instead of property
  $('meta[property^="og:"], meta[name^="og:"]').each((_, elem) => {
    const property = $(elem).attr('property') || $(elem).attr('name')
    const content = $(elem).attr('content')
    if (property && content) {
      pushValue(property, content)
    }
  })

  // Twitter tags
  $('meta[name^="twitter:"]').each((_, elem) => {
    const name = $(elem).attr('name')
    const content = $(elem).attr('content')
    if (name && content) {
      pushValue(name, content)
    }
  })

  // Standard meta tags
  const standardMeta = ['description', 'author', 'keywords']
  for (const name of standardMeta) {
    const content = extractMetaTag($, `meta[name="${name}"]`)
    if (content) {
      raw[`meta:${name}`] = content
    }
  }

  return raw
}

/**
 * Parse HTML and extract Open Graph data
 * Follows precedence rules for each field
 */
export function parseOGTags(
  html: string,
  sourceUrl: string,
  options: { includeRaw?: boolean } = {}
): OGData {
  const $ = cheerio.load(html)
  const urlObj = new URL(sourceUrl)

  // Extract canonical URL
  const canonicalUrl = resolveUrl(
    extractMetaTag($, 'link[rel="canonical"]', 'href'),
    sourceUrl
  ) || sourceUrl

  // Extract title with precedence
  // Some sites (like Dropbox) incorrectly use name instead of property for OG tags
  const title
    = extractMetaTag($, 'meta[property="og:title"]')
      || extractMetaTag($, 'meta[name="og:title"]')
      || extractMetaTag($, 'meta[name="twitter:title"]')
      || extractMetaTag($, 'title')
      || $('title').text()?.trim()
      || urlObj.hostname

  // Extract description with precedence
  const description
    = extractMetaTag($, 'meta[property="og:description"]')
      || extractMetaTag($, 'meta[name="og:description"]')
      || extractMetaTag($, 'meta[name="twitter:description"]')
      || extractMetaTag($, 'meta[name="description"]')
      || ''

  // Extract image with precedence
  // Include fallbacks for Google and other sites that use itemprop or link[rel="image_src"]
  // Also handle sites like Dropbox that use name instead of property
  const imageRaw
    = extractMetaTag($, 'meta[property="og:image"]')
      || extractMetaTag($, 'meta[name="og:image"]')
      || extractMetaTag($, 'meta[property="og:image:url"]')
      || extractMetaTag($, 'meta[name="og:image:url"]')
      || extractMetaTag($, 'meta[property="og:image:secure_url"]')
      || extractMetaTag($, 'meta[name="og:image:secure_url"]')
      || extractMetaTag($, 'meta[name="twitter:image"]')
      || extractMetaTag($, 'meta[name="twitter:image:src"]')
      || extractMetaTag($, 'meta[itemprop="image"]')
      || extractMetaTag($, 'link[rel="image_src"]', 'href')
      || ''

  // Resolve image URL to absolute URL
  const image = resolveUrl(imageRaw, sourceUrl)

  // Extract site name
  const siteName
    = extractMetaTag($, 'meta[property="og:site_name"]')
      || extractMetaTag($, 'meta[name="og:site_name"]')
      || urlObj.hostname.replace(/^www\./, '')

  // Extract type
  const type = extractMetaTag($, 'meta[property="og:type"]')
    || extractMetaTag($, 'meta[name="og:type"]')
    || 'website'

  // Extract image alt
  const imageAlt = extractMetaTag($, 'meta[property="og:image:alt"]')
    || extractMetaTag($, 'meta[name="og:image:alt"]')
    || title

  // Extract image dimensions
  const imageWidth
    = extractMetaTag($, 'meta[property="og:image:width"]')
      || extractMetaTag($, 'meta[name="og:image:width"]')
      || extractMetaTag($, 'meta[name="twitter:image:width"]')
      || ''

  const imageHeight
    = extractMetaTag($, 'meta[property="og:image:height"]')
      || extractMetaTag($, 'meta[name="og:image:height"]')
      || extractMetaTag($, 'meta[name="twitter:image:height"]')
      || ''

  // Extract locale
  const locale = extractMetaTag($, 'meta[property="og:locale"]')
    || extractMetaTag($, 'meta[name="og:locale"]')
    || 'en_US'

  // Extract author
  const author
    = extractMetaTag($, 'meta[property="article:author"]')
      || extractMetaTag($, 'meta[name="author"]')
      || ''

  // Extract Twitter card type
  const twitterCard = extractMetaTag($, 'meta[name="twitter:card"]') || 'summary_large_image'

  // Extract raw meta tags for debugging when requested
  const raw = options.includeRaw ? extractRawMetaTags($) : undefined

  // Extract OG URL (also check name attribute for sites like Dropbox)
  const ogUrl = extractMetaTag($, 'meta[property="og:url"]')
    || extractMetaTag($, 'meta[name="og:url"]')

  // Detect if OG tags incorrectly use name instead of property
  // This is a spec violation - OG tags should use property, not name
  // Store in raw for scorer to detect
  const usesIncorrectOGSyntax = $('meta[name^="og:"]').length > 0
  const rawWithViolation = raw || {}
  if (usesIncorrectOGSyntax) {
    rawWithViolation._usesIncorrectOGSyntax = 'true'
  }

  return {
    title,
    description,
    image,
    url: resolveUrl(ogUrl, sourceUrl) || canonicalUrl,
    siteName,
    type,
    imageAlt,
    imageWidth,
    imageHeight,
    locale,
    author,
    twitterCard,
    canonicalUrl,
    raw: options.includeRaw ? rawWithViolation : (usesIncorrectOGSyntax ? rawWithViolation : undefined)
  }
}

/**
 * Validate that we got meaningful data
 */
export function hasMinimalData(data: OGData): boolean {
  return !!(data.title || data.description || data.image)
}
