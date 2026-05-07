export type ConsentChoice = 'granted' | 'denied'

export type ConsentState = {
  analytics: ConsentChoice
  // version of the policy at the moment of consent
  version: string
  // ISO timestamp
  at: string
}

export const CONSENT_COOKIE = 'lawre_consent'
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180 // 6 months

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __lawreConsent?: ConsentState | null
    __lawreOpenConsent?: () => void
  }
}

export function readConsentCookie(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
  if (!match) return null
  try {
    const raw = decodeURIComponent(match.split('=').slice(1).join('='))
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    if (parsed.analytics !== 'granted' && parsed.analytics !== 'denied') return null
    return {
      analytics: parsed.analytics,
      version: parsed.version ?? '0',
      at: parsed.at ?? new Date(0).toISOString(),
    }
  } catch {
    return null
  }
}

export function writeConsentCookie(state: ConsentState) {
  if (typeof document === 'undefined') return
  const value = encodeURIComponent(JSON.stringify(state))
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
}

export function applyGtagConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }
  window.gtag('consent', 'update', {
    analytics_storage: state.analytics,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}
