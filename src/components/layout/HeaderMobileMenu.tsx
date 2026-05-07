'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HEADER_LOGO, NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return

    // Move initial focus to close button
    const initial = closeBtnRef.current
    initial?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      // Return focus to the trigger that opened the menu
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Deschide meniul"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
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

      {/* Overlay — z-50 sits above sticky header (z-30)
          height:100dvh adapts to mobile browser chrome dynamically */}
      <div
        ref={dialogRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu de navigare"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-ink transition-[opacity,transform] duration-300 ease-out',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
        style={{ height: '100dvh' }}
      >
        {/* Top bar: logo + close — matches main header height */}
        <div className="flex-none flex items-center justify-between h-20 px-5 border-b border-hairline">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2.5"
          >
            {HEADER_LOGO === 'image' ? (
              <Image
                src="/images/logo_3.png"
                alt="Lawre DJ"
                height={120}
                width={180}
                className="h-[60px] w-auto"
                style={{
                  maskImage: 'linear-gradient(to right, black 88%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to right, black 88%, transparent 98%)',
                }}
              />
            ) : (
              <>
                <span className="size-2 rounded-sm bg-neon-500" aria-hidden />
                <span className="font-display font-medium tracking-tight text-bone text-base">
                  LAWRE DJ
                </span>
              </>
            )}
          </Link>
          <button
            ref={closeBtnRef}
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

        {/* Scrollable body
            min-h-0 is required — without it a flex child can't shrink below
            its content height, so overflow:auto never activates */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <nav className="px-5 py-2" aria-label="Navigare principală">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 text-[1.75rem] font-display font-medium tracking-tight text-bone border-b border-hairline hover:text-neon-300 active:text-neon-400 transition-colors"
              >
                {item.label}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-bone-muted shrink-0"
                  aria-hidden
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          {/* CTAs — always visible, not stuck behind nav */}
          <div className="px-5 pt-6 pb-10 flex flex-col gap-3">
            <Button
              href="/cerere-oferta"
              size="lg"
              className="w-full justify-center text-base py-4"
              onClick={() => setOpen(false)}
            >
              Cere ofertă →
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.instagram.com/lawre_dj/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @lawre_dj (se deschide în tab nou)"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-md border border-neon-500/40 text-neon-400 hover:bg-neon-500/10 active:bg-neon-500/20 transition-colors text-sm font-medium"
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
                Instagram
              </a>

              <a
                href="https://wa.me/40764443356"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrie pe WhatsApp"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-md border border-neon-500/40 text-neon-400 hover:bg-neon-500/10 active:bg-neon-500/20 transition-colors text-sm font-medium"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.858L0 24l6.335-1.502A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.022-1.381l-.36-.214-3.732.885.944-3.617-.235-.372A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
