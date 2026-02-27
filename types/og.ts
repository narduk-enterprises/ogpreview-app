export interface ScoreExplanation {
  score: number
  reasons: string[]
  issues: string[]
  recommendations: string[]
}

export interface PlatformScores {
  facebook: ScoreExplanation
  twitter: ScoreExplanation
  linkedin: ScoreExplanation
  slack: ScoreExplanation
  discord: ScoreExplanation
  whatsapp: ScoreExplanation
  telegram: ScoreExplanation
  imessage: ScoreExplanation
  overall: number
}

export interface OGData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  type: string
  imageAlt?: string
  imageWidth?: string
  imageHeight?: string
  locale?: string
  author?: string
  twitterCard?: string
  canonicalUrl?: string
  raw?: Record<string, string | string[]>
}

export interface UnfurlError {
  code: string
  message: string
  details?: string
}

export interface UnfurlResponse {
  ok: boolean
  data?: OGData
  scores?: PlatformScores
  error?: UnfurlError
}

// Client-side debug info for cache inspection
export interface CacheDebugInfo {
  endpoint: 'cached' | 'refresh'
  timestamp: number
  vercelCache?: string
  age?: string
  cacheControl?: string
}
