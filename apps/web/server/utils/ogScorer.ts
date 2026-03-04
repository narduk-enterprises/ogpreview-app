import type { OGData, PlatformScores, ScoreExplanation } from '~~/types/og'

interface ScoreBreakdown {
  required: number
  recommended: number
  image: number
  optimization: number
}

// Note: Image dimension checking from URL requires client-side or additional API
// For now, we'll use provided dimensions if available
function getImageDimensions(data: OGData): { width: number, height: number } | null {
  if (data.imageWidth && data.imageHeight) {
    const width = Number.parseInt(data.imageWidth)
    const height = Number.parseInt(data.imageHeight)
    if (!Number.isNaN(width) && !Number.isNaN(height) && width > 0 && height > 0) {
      return { width, height }
    }
  }
  return null
}

function scoreFacebook(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax (name instead of property)
  // Open Graph spec requires property attribute, not name
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5 // 5 point penalty for spec violation
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 10
    reasons.push('Title tag present')
  }
  else {
    issues.push('Missing title tag')
    recommendations.push('Add og:title tag (critical for Facebook)')
  }

  if (data.description) {
    breakdown.required += 10
    reasons.push('Description tag present')
  }
  else {
    issues.push('Missing description tag')
    recommendations.push('Add og:description tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image tag present')
  }
  else {
    issues.push('Missing image tag')
    recommendations.push('Add og:image tag (critical for Facebook)')
  }

  if (data.url) {
    breakdown.required += 10
    reasons.push('URL tag present')
  }
  else {
    issues.push('Missing URL tag')
    recommendations.push('Add og:url tag')
  }

  // Recommended fields (20 points total)
  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type tag present')
  }
  else {
    recommendations.push('Add og:type tag for better categorization')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.locale) {
    breakdown.recommended += 5
    reasons.push('Locale specified')
  }
  else {
    recommendations.push('Add og:locale tag for language specification')
  }

  if (data.imageAlt) {
    breakdown.recommended += 5
    reasons.push('Image alt text present')
  }
  else {
    recommendations.push('Add og:image:alt for accessibility')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      const aspectRatio = width / height
      const targetRatio = 1.91 // Facebook optimal ratio

      // Check minimum size (1200x630)
      if (width >= 1200 && height >= 630) {
        breakdown.image += 10
        reasons.push(`Optimal image size (${width}x${height}px)`)
      }
      else if (width >= 600 && height >= 315) {
        breakdown.image += 5
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use 1200x630px for best results')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 1200x630px image')
      }

      // Check aspect ratio (within 0.1 of target)
      if (Math.abs(aspectRatio - targetRatio) < 0.1) {
        breakdown.image += 10
        reasons.push('Perfect aspect ratio (1.91:1)')
      }
      else if (Math.abs(aspectRatio - targetRatio) < 0.3) {
        breakdown.image += 5
        issues.push('Aspect ratio could be better')
        recommendations.push('Use 1.91:1 aspect ratio (e.g., 1200x630px)')
      }
      else {
        issues.push('Poor aspect ratio for Facebook')
        recommendations.push('Use 1.91:1 aspect ratio for best display')
      }
    }
    else {
      // If image exists but no dimensions, give partial credit
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height tags')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen >= 60 && titleLen <= 90) {
      breakdown.optimization += 10
      reasons.push(`Optimal title length (${titleLen} chars)`)
    }
    else if (titleLen >= 40 && titleLen <= 100) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) could be optimized`)
      recommendations.push('Keep title between 60-90 characters')
    }
    else if (titleLen < 40) {
      issues.push(`Title too short (${titleLen} chars)`)
      recommendations.push('Use 60-90 characters for titles')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 90 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen >= 155 && descLen <= 200) {
      breakdown.optimization += 10
      reasons.push(`Optimal description length (${descLen} chars)`)
    }
    else if (descLen >= 100 && descLen <= 250) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) could be optimized`)
      recommendations.push('Keep description between 155-200 characters')
    }
    else if (descLen < 100) {
      issues.push(`Description too short (${descLen} chars)`)
      recommendations.push('Use 155-200 characters for descriptions')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 200 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreTwitter(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  // Twitter can use OG tags as fallback
  const hasTitle = data.title || false
  const hasImage = data.image || false
  const hasCard = data.twitterCard || false

  if (hasTitle) {
    breakdown.required += 15
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add twitter:title or og:title tag')
  }

  if (hasImage) {
    breakdown.required += 15
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add twitter:image or og:image tag')
  }

  if (hasCard) {
    breakdown.required += 10
    reasons.push('Twitter card type specified')
  }
  else {
    issues.push('Missing Twitter card type')
    recommendations.push('Add twitter:card tag (use "summary_large_image")')
  }

  // Recommended fields (20 points total)
  if (data.description) {
    breakdown.recommended += 10
    reasons.push('Description present')
  }
  else {
    recommendations.push('Add twitter:description or og:description')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add twitter:site tag')
  }

  if (data.url) {
    breakdown.recommended += 5
    reasons.push('URL present')
  }
  else {
    recommendations.push('Add og:url tag')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // Twitter summary_large_image: minimum 800x418px
      if (width >= 800 && height >= 418) {
        breakdown.image += 15
        reasons.push(`Good image size (${width}x${height}px)`)
      }
      else if (width >= 600 && height >= 300) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use minimum 800x418px for best results')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use at least 800x418px image')
      }

      // Aspect ratio 2:1 is optimal
      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 2.0) < 0.2) {
        breakdown.image += 5
        reasons.push('Good aspect ratio (2:1)')
      }
      else {
        issues.push('Aspect ratio not optimal for Twitter')
        recommendations.push('Use 2:1 aspect ratio for best results')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add twitter:image:width and twitter:image:height')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 70) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else if (titleLen <= 100) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) may be truncated`)
      recommendations.push('Keep title under 70 characters')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 70 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 200) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 250) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 200 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 200 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreLinkedIn(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 10
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add og:title tag (required for LinkedIn)')
  }

  if (data.description) {
    breakdown.required += 10
    reasons.push('Description present')
  }
  else {
    issues.push('Missing description')
    recommendations.push('Add og:description tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add og:image tag (important for LinkedIn)')
  }

  if (data.url) {
    breakdown.required += 10
    reasons.push('URL present')
  }
  else {
    issues.push('Missing URL')
    recommendations.push('Add og:url tag')
  }

  // Recommended fields (20 points total)
  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type specified')
  }
  else {
    recommendations.push('Add og:type for better categorization')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.locale) {
    breakdown.recommended += 5
    reasons.push('Locale specified')
  }
  else {
    recommendations.push('Add og:locale tag')
  }

  if (data.imageAlt) {
    breakdown.recommended += 5
    reasons.push('Image alt text present')
  }
  else {
    recommendations.push('Add og:image:alt for accessibility')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // LinkedIn optimal: 1200x627px
      if (width >= 1200 && height >= 627) {
        breakdown.image += 15
        reasons.push(`Optimal image size (${width}x${height}px)`)
      }
      else if (width >= 600 && height >= 315) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use 1200x627px for best results on LinkedIn')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 1200x627px image')
      }

      // Aspect ratio around 1.91:1
      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 1.91) < 0.2) {
        breakdown.image += 5
        reasons.push('Good aspect ratio (1.91:1)')
      }
      else {
        issues.push('Aspect ratio not optimal')
        recommendations.push('Use 1.91:1 aspect ratio (e.g., 1200x627px)')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height tags')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 70) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else if (titleLen <= 100) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) may be truncated`)
      recommendations.push('Keep title under 70 characters for LinkedIn')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 70 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 150) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 200) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 150 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 150 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreSlack(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 15
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add og:title tag (critical for Slack unfurls)')
  }

  if (data.url) {
    breakdown.required += 15
    reasons.push('URL present')
  }
  else {
    issues.push('Missing URL')
    recommendations.push('Add og:url tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add og:image tag for visual previews')
  }

  // Recommended fields (20 points total)
  if (data.description) {
    breakdown.recommended += 10
    reasons.push('Description present')
  }
  else {
    recommendations.push('Add og:description for better context')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type specified')
  }
  else {
    recommendations.push('Add og:type tag')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // Slack works well with standard OG sizes
      if (width >= 1200 && height >= 630) {
        breakdown.image += 15
        reasons.push(`Good image size (${width}x${height}px)`)
      }
      else if (width >= 600 && height >= 315) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use 1200x630px for best Slack previews')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 1200x630px image')
      }

      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 1.91) < 0.2) {
        breakdown.image += 5
        reasons.push('Good aspect ratio (1.91:1)')
      }
      else {
        issues.push('Aspect ratio not optimal')
        recommendations.push('Use 1.91:1 aspect ratio for best display')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 80) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else if (titleLen <= 120) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) is acceptable but long`)
      recommendations.push('Keep title under 80 characters for best display')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 80 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 300) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 400) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 300 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 300 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreDiscord(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 15
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add og:title tag (required for Discord embeds)')
  }

  if (data.url) {
    breakdown.required += 15
    reasons.push('URL present')
  }
  else {
    issues.push('Missing URL')
    recommendations.push('Add og:url tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add og:image tag for rich embeds')
  }

  // Recommended fields (20 points total)
  if (data.description) {
    breakdown.recommended += 10
    reasons.push('Description present')
  }
  else {
    recommendations.push('Add og:description for richer embeds')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type specified')
  }
  else {
    recommendations.push('Add og:type tag')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // Discord embeds work well with standard OG sizes
      if (width >= 1200 && height >= 630) {
        breakdown.image += 15
        reasons.push(`Optimal image size (${width}x${height}px)`)
      }
      else if (width >= 800 && height >= 420) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is acceptable but not optimal`)
        recommendations.push('Use 1200x630px for best Discord embeds')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 1200x630px image')
      }

      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 1.91) < 0.2) {
        breakdown.image += 5
        reasons.push('Good aspect ratio (1.91:1)')
      }
      else {
        issues.push('Aspect ratio not optimal for Discord')
        recommendations.push('Use 1.91:1 aspect ratio (e.g., 1200x630px)')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height tags')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 256) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else {
      breakdown.optimization += 5
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 256 characters for Discord')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 350) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 500) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 350 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 350 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreWhatsApp(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 15
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add og:title tag (required for WhatsApp previews)')
  }

  if (data.url) {
    breakdown.required += 15
    reasons.push('URL present')
  }
  else {
    issues.push('Missing URL')
    recommendations.push('Add og:url tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add og:image tag for link previews')
  }

  // Recommended fields (20 points total)
  if (data.description) {
    breakdown.recommended += 10
    reasons.push('Description present')
  }
  else {
    recommendations.push('Add og:description for better context')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type specified')
  }
  else {
    recommendations.push('Add og:type tag')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // WhatsApp uses standard OG tags
      if (width >= 300 && height >= 157) {
        breakdown.image += 15
        reasons.push(`Good image size (${width}x${height}px)`)
      }
      else if (width >= 200 && height >= 105) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use at least 300x157px for WhatsApp')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 300x157px image')
      }

      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 1.91) < 0.3) {
        breakdown.image += 5
        reasons.push('Good aspect ratio')
      }
      else {
        issues.push('Aspect ratio not optimal')
        recommendations.push('Use 1.91:1 aspect ratio for best display')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height tags')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 65) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else if (titleLen <= 100) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) may be truncated`)
      recommendations.push('Keep title under 65 characters for WhatsApp')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 65 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 200) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 300) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 200 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 200 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreTelegram(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 15
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add og:title tag (required for Telegram previews)')
  }

  if (data.url) {
    breakdown.required += 15
    reasons.push('URL present')
  }
  else {
    issues.push('Missing URL')
    recommendations.push('Add og:url tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add og:image tag for visual previews')
  }

  // Recommended fields (20 points total)
  if (data.description) {
    breakdown.recommended += 10
    reasons.push('Description present')
  }
  else {
    recommendations.push('Add og:description for better context')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type specified')
  }
  else {
    recommendations.push('Add og:type tag')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // Telegram supports various sizes
      if (width >= 1200 && height >= 630) {
        breakdown.image += 15
        reasons.push(`Optimal image size (${width}x${height}px)`)
      }
      else if (width >= 600 && height >= 315) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use 1200x630px for best Telegram previews')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 1200x630px image')
      }

      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 1.91) < 0.3) {
        breakdown.image += 5
        reasons.push('Good aspect ratio')
      }
      else {
        issues.push('Aspect ratio not optimal')
        recommendations.push('Use 1.91:1 aspect ratio for best display')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height tags')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 70) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else if (titleLen <= 100) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) may be truncated`)
      recommendations.push('Keep title under 70 characters for Telegram')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 70 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 200) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 300) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 200 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 200 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

function scoreIMessage(data: OGData): ScoreExplanation {
  let score = 0
  const reasons: string[] = []
  const issues: string[] = []
  const recommendations: string[] = []
  const breakdown: ScoreBreakdown = {
    required: 0,
    recommended: 0,
    image: 0,
    optimization: 0
  }

  // Penalty for using incorrect OG tag syntax
  const usesIncorrectSyntax = data.raw?._usesIncorrectOGSyntax === 'true'
  let specViolationPenalty = 0
  if (usesIncorrectSyntax) {
    specViolationPenalty = 5
    issues.push('OG tags use incorrect syntax (name instead of property)')
    recommendations.push('Use property="og:*" instead of name="og:*" per Open Graph spec')
  }

  // Required fields (40 points total)
  if (data.title) {
    breakdown.required += 15
    reasons.push('Title present')
  }
  else {
    issues.push('Missing title')
    recommendations.push('Add og:title tag (required for iMessage previews)')
  }

  if (data.url) {
    breakdown.required += 15
    reasons.push('URL present')
  }
  else {
    issues.push('Missing URL')
    recommendations.push('Add og:url tag')
  }

  if (data.image) {
    breakdown.required += 10
    reasons.push('Image present')
  }
  else {
    issues.push('Missing image')
    recommendations.push('Add og:image tag for visual previews')
  }

  // Recommended fields (20 points total)
  if (data.description) {
    breakdown.recommended += 10
    reasons.push('Description present')
  }
  else {
    recommendations.push('Add og:description for better context')
  }

  if (data.siteName) {
    breakdown.recommended += 5
    reasons.push('Site name present')
  }
  else {
    recommendations.push('Add og:site_name tag')
  }

  if (data.type) {
    breakdown.recommended += 5
    reasons.push('Type specified')
  }
  else {
    recommendations.push('Add og:type tag')
  }

  // Image dimensions/quality (20 points)
  if (data.image) {
    const dimensions = getImageDimensions(data)
    if (dimensions) {
      const { width, height } = dimensions
      // iMessage uses standard OG tags
      if (width >= 1200 && height >= 630) {
        breakdown.image += 15
        reasons.push(`Optimal image size (${width}x${height}px)`)
      }
      else if (width >= 600 && height >= 315) {
        breakdown.image += 8
        issues.push(`Image size ${width}x${height}px is below optimal`)
        recommendations.push('Use 1200x630px for best iMessage previews')
      }
      else {
        issues.push(`Image size ${width}x${height}px is too small`)
        recommendations.push('Use minimum 1200x630px image')
      }

      const aspectRatio = width / height
      if (Math.abs(aspectRatio - 1.91) < 0.3) {
        breakdown.image += 5
        reasons.push('Good aspect ratio')
      }
      else {
        issues.push('Aspect ratio not optimal')
        recommendations.push('Use 1.91:1 aspect ratio for best display')
      }
    }
    else {
      breakdown.image += 5
      issues.push('Image dimensions not specified')
      recommendations.push('Add og:image:width and og:image:height tags')
    }
  }

  // Character count optimization (20 points)
  if (data.title) {
    const titleLen = data.title.length
    if (titleLen <= 65) {
      breakdown.optimization += 10
      reasons.push(`Good title length (${titleLen} chars)`)
    }
    else if (titleLen <= 100) {
      breakdown.optimization += 5
      issues.push(`Title length (${titleLen} chars) may be truncated`)
      recommendations.push('Keep title under 65 characters for iMessage')
    }
    else {
      issues.push(`Title too long (${titleLen} chars)`)
      recommendations.push('Keep title under 65 characters')
    }
  }

  if (data.description) {
    const descLen = data.description.length
    if (descLen <= 200) {
      breakdown.optimization += 10
      reasons.push(`Good description length (${descLen} chars)`)
    }
    else if (descLen <= 300) {
      breakdown.optimization += 5
      issues.push(`Description length (${descLen} chars) may be truncated`)
      recommendations.push('Keep description under 200 characters')
    }
    else {
      issues.push(`Description too long (${descLen} chars)`)
      recommendations.push('Keep description under 200 characters')
    }
  }

  score = breakdown.required + breakdown.recommended + breakdown.image + breakdown.optimization - specViolationPenalty
  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    issues,
    recommendations
  }
}

export function calculatePlatformScores(data: OGData): PlatformScores {
  const facebook = scoreFacebook(data)
  const twitter = scoreTwitter(data)
  const linkedin = scoreLinkedIn(data)
  const slack = scoreSlack(data)
  const discord = scoreDiscord(data)
  const whatsapp = scoreWhatsApp(data)
  const telegram = scoreTelegram(data)
  const imessage = scoreIMessage(data)

  const overall = Math.round((facebook.score + twitter.score + linkedin.score + slack.score + discord.score + whatsapp.score + telegram.score + imessage.score) / 8)

  return {
    facebook,
    twitter,
    linkedin,
    slack,
    discord,
    whatsapp,
    telegram,
    imessage,
    overall
  }
}
