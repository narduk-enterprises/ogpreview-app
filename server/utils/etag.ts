import { createHash } from 'node:crypto'
import type { OGData, PlatformScores } from '~~/types/og'

/**
 * Generate a stable, short ETag for OG responses.
 * Uses a truncated SHA-256 hash of the normalized payload with sorted keys
 * to ensure deterministic serialization regardless of property insertion order.
 */
export function generateETag(ogData: OGData, scores?: PlatformScores | null): string {
  // Normalize payload with sorted keys for stable ETag generation
  const normalizeObject = (obj: any): any => {
    if (obj === null || obj === undefined) {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map(normalizeObject)
    }
    if (typeof obj === 'object') {
      const sorted: Record<string, any> = {}
      const keys = Object.keys(obj).sort()
      for (const key of keys) {
        sorted[key] = normalizeObject(obj[key])
      }
      return sorted
    }
    return obj
  }

  const payload = {
    ogData: normalizeObject(ogData),
    scores: scores ? normalizeObject(scores) : undefined
  }

  const serialized = JSON.stringify(payload)
  const hash = createHash('sha256').update(serialized).digest('hex')
  return `"${hash.substring(0, 16)}"`
}
