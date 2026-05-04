'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    // iOS Safari needs position:fixed to truly lock scroll
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="md:hidden">
      {/* Hamburger — only opens the menu; close button lives inside the overlay */}
      <button
        type="button"
        aria-label="Deschide meniul"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-hairline text-bone hover:border-hairline2 transition-colors"
      >
        <span className="sr-only">Meniu</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M3 6h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M3 10h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {/*
        z-50 so this sits above the sticky header (z-30).
        The close button lives HERE — not in the header — so it's always reachable.
      */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu de navigare"
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        {/* Mirrors the main header: logo left, close button right */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-hairline shrink-0">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2.5 group"
          >
            <span className="size-2 rounded-sm bg-neon-500 group-hover:bg-neon-400 transition-colors" aria-hidden />
            <span className="font-display font-medium tracking-tight text-bone text-base">
              LAWRE DJ
            </span>
          </Link>
          <button
            type="button"
            aria-label="Închide meniul"
            onClick={() => setOpen(false)}
            className="inline-flex size-11 items-center justify-center rounded-md border border-hairline text-bone hover:border-hairline2 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable nav + CTAs */}
        <div className="flex flex-col flex-1 overflow-y-auto px-6 pb-10">
          <nav className="flex flex-col gap-2 pt-4" aria-label="Navigare principală">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 text-2xl font-display tracking-tight text-bone hover:text-neon-300 transition-colors border-b border-hairline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <Button
              href="/cerere-oferta"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Cere ofertă →
            </Button>

            <a
              href="https://www.instagram.com/lawre_dj/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @lawre_dj (se deschide în tab nou)"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full px-5 min-h-[48px] rounded-md border border-neon-500/40 text-neon-400 hover:border-neon-400 hover:bg-neon-500/10 active:bg-neon-500/20 transition-colors text-sm font-medium"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              Instagram @lawre_dj
            </a>

            <Button
              href="https://wa.me/40764443356"
              variant="ghost"
              size="lg"
              aria-label="Scrie pe WhatsApp"
              className="w-full text-neon-400 border border-neon-500/40 hover:border-neon-400 hover:bg-neon-500/10 active:bg-neon-500/20 min-h-[48px]"
              onClick={() => setOpen(false)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.858L0 24l6.335-1.502A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.022-1.381l-.36-.214-3.732.885.944-3.617-.235-.372A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Scrie pe WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
