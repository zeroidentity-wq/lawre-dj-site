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
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-hairline text-bone hover:border-hairline2 transition-colors"
      >
        <span className="sr-only">Meniu</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          {open ? (
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path d="M3 6h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M3 10h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/95 backdrop-blur transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-10">
          <nav className="flex flex-col gap-2">
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
          <div className="mt-auto pt-8">
            <Button href="/cerere-oferta" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Cere ofertă →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
