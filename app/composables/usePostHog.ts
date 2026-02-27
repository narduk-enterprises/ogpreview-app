import posthog from 'posthog-js'

let isInitialized = false

export function usePostHog() {
  // Only initialize on client-side and once
  if (import.meta.client && !isInitialized) {
    posthog.init('phc_5mZcEh78Vzpga8eBCcII9v45fXJzpfWVTWnBFfO3BoB', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2025-11-30',
      person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
    })
    isInitialized = true
  }

  return { posthog }
}
