<template>
  <div v-if="src && !imageError" :class="['overflow-hidden bg-gray-200 dark:bg-gray-700 relative', aspectClass]">
    <Transition name="image-fade" mode="out-in">
      <!-- Use NuxtImg only for internal assets or explicitly allowed domains -->
      <NuxtImg
v-if="isOptimizableImage" :key="`nuxt-${imageSrc}`" :src="imageSrc" :alt="alt"
        class="w-full h-full object-cover" loading="eager" :class="{ 'opacity-0': !imageLoaded }" format="webp"
        quality="80" width="1200" height="630" densities="x1 x2" @load="onImageLoad" @error="onImageError" />
      <!-- Use plain <img> for external OG images (proxied through /api/image to avoid CORS) -->
      <img
v-else :key="`img-${imageSrc}`" :src="imageSrc" :alt="alt" class="w-full h-full object-cover" loading="eager"
        width="1200" height="630" referrerpolicy="no-referrer" crossorigin="anonymous"
        :class="{ 'opacity-0': !imageLoaded }" @load="onImageLoad" @error="onImageError">
    </Transition>
    <!-- Only show spinner on client side after a small delay to avoid hydration issues -->
    <ClientOnly>
      <div
v-if="!imageLoaded && !imageError"
        class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700" role="status"
        aria-live="polite" aria-label="Loading image">
        <UIcon
name="i-lucide-loader-circle" class="w-8 h-8 text-gray-400 dark:text-gray-500 animate-spin"
          aria-hidden="true" />
      </div>
    </ClientOnly>
  </div>
  <!-- Show "No Image" when src is empty OR when image fails to load -->
  <div
v-else :class="['flex items-center justify-center bg-gray-200 dark:bg-gray-700', aspectClass]" role="img"
    aria-label="No image available">
    <div class="text-center">
      <UIcon name="i-lucide-image-off" class="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" aria-hidden="true" />
      <span class="text-sm text-gray-400 dark:text-gray-500">No Image</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  aspectClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  aspectClass: 'aspect-[1.91/1]'
})

const imageLoaded = ref(false)
const imageError = ref(false)
const retryCount = ref(0)
const maxRetries = 2
const usingProxyFallback = ref(false)

// Proxy URL constant
const proxyUrl = 'https://proxy.ogpreview.app/proxy'

// List of domains we want to optimize through Nuxt Image
const OPTIMIZABLE_DOMAINS = ['images.unsplash.com']

// Check if image is remote HTTP/HTTPS
const isRemoteHttpImage = computed(() => {
  if (!props.src) return false
  try {
    const url = new URL(props.src)
    return url.protocol === 'http:' || url.protocol === 'https:'
  }
  catch {
    return false
  }
})

// Check if image should use NuxtImg optimization
// Only optimize internal assets or explicitly allowed domains
const isOptimizableImage = computed(() => {
  if (!props.src) return false

  // Internal assets (start with /)
  if (props.src.startsWith('/')) return true

  // Check if remote image is in optimizable domains list
  if (isRemoteHttpImage.value) {
    try {
      const url = new URL(props.src)
      return OPTIMIZABLE_DOMAINS.some(domain => url.hostname === domain || url.hostname.endsWith(`.${domain}`))
    }
    catch {
      return false
    }
  }

  return false
})

// Check if image needs to be proxied through our server (external images)
const needsProxy = computed(() => {
  if (!props.src) return false

  // Internal assets don't need proxy
  if (props.src.startsWith('/')) return false

  // Already proxied images don't need proxy again
  if (props.src.startsWith('/api/image')) return false

  // External HTTP/HTTPS images need proxy to avoid CORS
  return isRemoteHttpImage.value && !isOptimizableImage.value
})

// Get the actual image URL (proxied if needed, or using proxy fallback)
const imageSrc = computed(() => {
  if (!props.src) return ''

  // If we're using proxy fallback, use the external proxy
  if (usingProxyFallback.value && isRemoteHttpImage.value) {
    return `${proxyUrl}?url=${encodeURIComponent(props.src)}`
  }

  if (needsProxy.value) {
    // Proxy external images through our server endpoint
    const encodedUrl = encodeURIComponent(props.src)
    return `/api/image?url=${encodedUrl}`
  }

  return props.src
})

const onImageLoad = () => {
  imageLoaded.value = true
  imageError.value = false
}

const onImageError = () => {
  // If we haven't tried the proxy fallback yet and this is a remote image, try it
  if (!usingProxyFallback.value && props.src && isRemoteHttpImage.value && !props.src.startsWith('/')) {
    usingProxyFallback.value = true
    retryCount.value = 0 // Reset retry count when switching to proxy
    imageError.value = false // Reset error state to allow retry

    // Force reload with proxy URL after a short delay
    setTimeout(() => {
      const imgElement = document.querySelector(`img[alt="${props.alt}"], img[src*="${props.src}"]`) as HTMLImageElement
      if (imgElement) {
        imgElement.src = imageSrc.value
      }
    }, 300)
    return
  }

  // Retry once with cache busting
  if (retryCount.value < maxRetries && props.src) {
    retryCount.value++
    const separator = imageSrc.value.includes('?') ? '&' : '?'
    const retrySrc = `${imageSrc.value}${separator}_retry=${Date.now()}`

    // Retry after a short delay
    setTimeout(() => {
      // Force reload by temporarily clearing and resetting src
      const imgElement = document.querySelector(`img[alt="${props.alt}"], img[src*="${imageSrc.value}"]`) as HTMLImageElement
      if (imgElement) {
        imgElement.src = retrySrc
      }
    }, 300)
  }
  else {
    imageError.value = true
    imageLoaded.value = false
    console.warn('[PreviewImage] Failed to load image:', props.src, 'Proxy fallback:', usingProxyFallback.value)
  }
}

// Reset loading state when src changes
watch(() => props.src, () => {
  imageLoaded.value = false
  imageError.value = false
  retryCount.value = 0
  usingProxyFallback.value = false
})

// Also reset when imageSrc changes (e.g., when proxy URL is generated)
watch(() => imageSrc.value, () => {
  // Only reset if we're not in the middle of a proxy fallback retry
  if (!usingProxyFallback.value || imageLoaded.value) {
    imageLoaded.value = false
    imageError.value = false
    retryCount.value = 0
  }
})

// Fallback: Check if image is already loaded (SSR hydration case)
// Also add timeout for CORS-blocked images that don't fire error events
onMounted(() => {
  if (imageSrc.value && !imageLoaded.value) {
    // Use a small timeout to allow the load event to fire naturally first
    setTimeout(() => {
      if (!imageLoaded.value && !imageError.value) {
        // Check if image element exists and is loaded
        const imgElement = document.querySelector(`img[src="${imageSrc.value}"]`) as HTMLImageElement
        if (imgElement && imgElement.complete) {
          imageLoaded.value = true
        }
        else {
          // If image hasn't loaded after 5 seconds, treat as error
          // This handles CORS-blocked images that don't fire error events
          setTimeout(() => {
            if (!imageLoaded.value && !imageError.value) {
              imageError.value = true
              console.warn('[PreviewImage] Image load timeout:', imageSrc.value)
            }
          }, 5000)
        }
      }
    }, 100)
  }
})
</script>


