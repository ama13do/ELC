import posthog from 'posthog-js'

export function usePostHog() {
  posthog.init(import.meta.env.VITE_POSTHOG_TOKEN, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    defaults: '2026-01-30',
  })

  return { posthog }
}
