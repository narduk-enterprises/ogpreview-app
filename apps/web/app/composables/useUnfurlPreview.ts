import type { UnfurlResponse } from '~~/types/og'
import { isValidUrl, normalizeUrl } from '~/utils/url'

/**
 * SSR-friendly unfurl preview fetch. Use in pages/components that need initial OG data from a URL.
 * Uses useFetch so it satisfies no-raw-fetch. When url is empty, requests /api/unfurl (no query) which returns { ok: false }.
 */
export function useUnfurlPreview(url: MaybeRef<string | undefined>): { data: Ref<UnfurlResponse | null> } {
  const normalized = computed(() => {
    const u = toValue(url)
    if (!u?.trim()) return null
    const n = normalizeUrl(u)
    return isValidUrl(n) ? n : null
  })
  const { data } = useFetch<UnfurlResponse>('/api/unfurl', {
    query: { url: normalized },
    key: () => (normalized.value ? `unfurl-preview-${normalized.value}` : 'unfurl-preview-empty'),
    immediate: true,
    watch: [normalized],
  })
  const dataOrNull = computed(() => (normalized.value ? (data.value as UnfurlResponse | null) : null))
  return { data: dataOrNull as Ref<UnfurlResponse | null> }
}
