export const useOGValidation = () => {
  /**
   * Validates Open Graph image dimensions according to best practices
   * Recommended: 1200x630 (1.91:1 aspect ratio)
   * Minimum: 600x315
   * Maximum file size: 5MB (8MB for some platforms)
   */
  const validateImageDimensions = (width: number, height: number) => {
    const aspectRatio = width / height
    const recommendedAspectRatio = 1.91
    const minWidth = 600
    const minHeight = 315
    const maxWidth = 8000
    const maxHeight = 8000

    const warnings: string[] = []
    const errors: string[] = []

    // Check minimum dimensions
    if (width < minWidth || height < minHeight) {
      errors.push(`Image dimensions are too small. Minimum: ${minWidth}x${minHeight}`)
    }

    // Check maximum dimensions
    if (width > maxWidth || height > maxHeight) {
      warnings.push(`Image dimensions are very large. Consider optimizing for web.`)
    }

    // Check aspect ratio
    const aspectRatioDiff = Math.abs(aspectRatio - recommendedAspectRatio)
    if (aspectRatioDiff > 0.2) {
      warnings.push(`Aspect ratio (${aspectRatio.toFixed(2)}:1) differs from recommended 1.91:1. Image may be cropped on some platforms.`)
    }

    // Optimal dimensions check
    if (width === 1200 && height === 630) {
      return {
        isValid: true,
        isOptimal: true,
        warnings: [],
        errors: [],
        message: '✓ Perfect! These dimensions are optimal for all platforms.'
      }
    }

    return {
      isValid: errors.length === 0,
      isOptimal: false,
      warnings,
      errors,
      message: errors.length > 0 ? errors[0] : warnings.length > 0 ? warnings[0] : 'Valid dimensions'
    }
  }

  /**
   * Validates Open Graph meta tag completeness
   */
  const validateOGTags = (data: {
    title?: string
    description?: string
    image?: string
    url?: string
    siteName?: string
    type?: string
  }) => {
    const required = ['title', 'description', 'image', 'url']
    const missing: string[] = []

    required.forEach((field) => {
      if (!data[field as keyof typeof data]) {
        missing.push(field)
      }
    })

    const warnings: string[] = []

    // Check title length (optimal: 60-90 characters)
    if (data.title && (data.title.length < 40 || data.title.length > 90)) {
      warnings.push(`Title length (${data.title.length}) should be between 40-90 characters for best display`)
    }

    // Check description length (optimal: 110-160 characters)
    if (data.description && (data.description.length < 110 || data.description.length > 160)) {
      warnings.push(`Description length (${data.description.length}) should be between 110-160 characters for best display`)
    }

    return {
      isComplete: missing.length === 0,
      missing,
      warnings,
      score: ((required.length - missing.length) / required.length) * 100
    }
  }

  /**
   * Platform-specific recommendations
   */
  const platformRecommendations = {
    facebook: {
      imageSize: '1200x630',
      aspectRatio: '1.91:1',
      minSize: '600x315',
      format: 'JPG, PNG',
      maxFileSize: '8MB'
    },
    twitter: {
      imageSize: '1200x600',
      aspectRatio: '2:1',
      minSize: '300x157',
      format: 'JPG, PNG, WebP, GIF',
      maxFileSize: '5MB'
    },
    linkedin: {
      imageSize: '1200x627',
      aspectRatio: '1.91:1',
      minSize: '1200x627',
      format: 'JPG, PNG',
      maxFileSize: '5MB'
    },
    slack: {
      imageSize: '1200x630',
      aspectRatio: '1.91:1',
      minSize: '200x200',
      format: 'JPG, PNG, GIF',
      maxFileSize: '5MB'
    },
    discord: {
      imageSize: '1200x630',
      aspectRatio: '1.91:1',
      minSize: '640x360',
      format: 'JPG, PNG, WebP',
      maxFileSize: '8MB'
    },
    whatsapp: {
      imageSize: '1200x630',
      aspectRatio: '1.91:1',
      minSize: '200x200',
      format: 'JPG, PNG',
      maxFileSize: '300KB'
    },
    telegram: {
      imageSize: '1200x630',
      aspectRatio: '1.91:1',
      minSize: '200x200',
      format: 'JPG, PNG, WebP',
      maxFileSize: '5MB'
    },
    imessage: {
      imageSize: '1200x630',
      aspectRatio: '16:9 or 1.91:1',
      minSize: '400x300',
      format: 'JPG, PNG',
      maxFileSize: '5MB'
    }
  }

  return {
    validateImageDimensions,
    validateOGTags,
    platformRecommendations
  }
}
