/**
 * In-memory rate limiter using token bucket algorithm
 *
 * Note: This is a simple in-memory implementation. On serverless platforms,
 * rate limiting will be per-instance, not global. For production at scale,
 * consider using Redis or a dedicated rate limiting service.
 */

import type { H3Event } from 'h3'
import { getRequestIP, getRequestHeader } from 'h3'

interface TokenBucket {
  tokens: number
  lastRefill: number
}

// Store buckets in memory (Map<key, TokenBucket>)
const buckets = new Map<string, TokenBucket>()

// Configuration
const RATE_LIMIT_CONFIG = {
  // 30 requests per 5 minutes (300 seconds)
  maxTokens: 30,
  refillInterval: 300_000, // 5 minutes in milliseconds
  refillRate: 30 / 300, // tokens per second

  // Burst limit: allow 10 immediate requests
  burstLimit: 10
}

/**
 * Clean up old buckets periodically (every 10 minutes)
 * This prevents memory leaks from abandoned keys
 */
const CLEANUP_INTERVAL = 10 * 60 * 1000 // 10 minutes
let lastCleanup = Date.now()

function cleanupOldBuckets() {
  const now = Date.now()
  // Only cleanup if enough time has passed
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return
  }

  lastCleanup = now
  const cutoff = now - CLEANUP_INTERVAL

  for (const [key, bucket] of buckets.entries()) {
    // Remove buckets that haven't been accessed in cleanup interval
    if (bucket.lastRefill < cutoff) {
      buckets.delete(key)
    }
  }
}

/**
 * Refill tokens for a bucket based on elapsed time
 */
function refillBucket(bucket: TokenBucket): void {
  const now = Date.now()
  const elapsed = now - bucket.lastRefill

  if (elapsed >= RATE_LIMIT_CONFIG.refillInterval) {
    // Full refill if enough time has passed
    bucket.tokens = RATE_LIMIT_CONFIG.maxTokens
  }
  else {
    // Partial refill based on elapsed time
    const tokensToAdd = elapsed * (RATE_LIMIT_CONFIG.refillRate / 1000)
    bucket.tokens = Math.min(
      RATE_LIMIT_CONFIG.maxTokens,
      bucket.tokens + tokensToAdd
    )
  }

  bucket.lastRefill = now
}

/**
 * Generate a rate limit key from request
 * Uses IP address + user agent hash for identification
 */
function getRateLimitKey(event: H3Event): string {
  const ip = getRequestIP(event) || 'unknown'
  const userAgent = getRequestHeader(event, 'user-agent') || 'unknown'

  // Simple hash of user agent (just use first 20 chars for simplicity)
  const uaHash = userAgent.substring(0, 20).replaceAll(/[^a-z0-9]/gi, '')

  return `${ip}:${uaHash}`
}

/**
 * Check if a request should be rate limited
 * @returns { allowed: boolean, retryAfter?: number }
 */
export function checkRateLimit(event: H3Event): { allowed: boolean, retryAfter?: number } {
  cleanupOldBuckets()

  const key = getRateLimitKey(event)
  const now = Date.now()

  // Get or create bucket
  let bucket = buckets.get(key)
  if (!bucket) {
    bucket = {
      tokens: RATE_LIMIT_CONFIG.burstLimit, // Start with burst limit
      lastRefill: now
    }
    buckets.set(key, bucket)
  }

  // Refill tokens
  refillBucket(bucket)

  // Check if we have tokens
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1
    return { allowed: true }
  }

  // Calculate retry after (when next token will be available)
  const tokensNeeded = 1 - bucket.tokens
  const secondsUntilNextToken = Math.ceil(
    tokensNeeded / RATE_LIMIT_CONFIG.refillRate
  )

  return {
    allowed: false,
    retryAfter: secondsUntilNextToken
  }
}
