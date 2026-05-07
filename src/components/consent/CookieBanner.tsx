'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  applyGtagConsent,
  readConsentCookie,
  writeConsentCookie,
  type ConsentState,
} from './consent'
import { PRIVACY_POLICY_VERSION } from '@/lib/legal'

type Props = { gaId?: string }

export function CookieBanner({ gaId }: Props) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const existing = readConsentCookie()
    if (!existing || existing.version !== PRIVACY_POLICY_VERSION) {
      setOpen(true)
    } else {
      window.__lawreConsent = existing
      if (gaId) applyGtagConsent(existing)
    }
    window.__lawreOpenConsent = () => setOpen(true)
    return () => {
      window.__lawreOpenConsent = undefined
    }
  }, [gaId])

  if (!mounted || !open) return null

  const decide = (analytics: 'granted' | 'denied') => {
    const state: ConsentState = {
      analytics,
      version: PRIVACY_POLICY_VERSION,
      at: new Date().toISOString(),
    }
    writeConsentCookie(state)
    window.__lawreConsent = state
    if (gaId) applyGtagConsent(state)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl bg-ink-soft border border-hairline rounded-lg shadow-2xl p-5 md:p-6">
        <h2
          id="cookie-banner-title"
          className="font-display text-base md:text-lg font-medium text-bone mb-2"
        >
          Acest site folosește cookie-uri
        </h2>
        <p id="cookie-banner-desc" className="text-sm text-bone-muted leading-relaxed">
          Folosim cookie-uri strict necesare pentru funcționarea site-ului. Cu acordul tău, folosim și
          cookie-uri analitice (Google Analytics) pentru a înțelege cum e folosit site-ul, anonim. Poți
          schimba alegerea oricând din subsol.{' '}
          <Link href="/cookies" className="text-neon-400 hover:text-neon-300 underline underline-offset-2">
            Detalii
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="text-sm px-5 py-2.5 rounded-md border border-hairline text-bone-muted hover:text-bone hover:border-bone-muted transition-colors"
          >
            Refuză opționale
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="text-sm px-5 py-2.5 rounded-md bg-neon-500 hover:bg-neon-400 text-ink font-medium transition-colors"
          >
            Acceptă toate
          </button>
        </div>
      </div>
    </div>
  )
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.__lawreOpenConsent?.()}
      className={
        className ??
        'text-xs text-bone-dim hover:text-bone transition-colors underline-offset-2 hover:underline'
      }
    >
      Setări cookies
    </button>
  )
}
