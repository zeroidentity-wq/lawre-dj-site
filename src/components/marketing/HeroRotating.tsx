'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface HeroVariant {
  short: string
  eyebrow: string
  cta: string
  hashUrl: string
}

interface HeroRotatingProps {
  variants: HeroVariant[]
  staticTitle?: string
  intervalMs?: number
}

const WAVEFORM_HEIGHTS = [35, 65, 45, 85, 38, 75, 55, 95, 42, 70, 28, 80, 58, 40, 90]

export function HeroRotating({
  variants,
  staticTitle = 'Sunet care schimbă',
  intervalMs = 2800,
}: HeroRotatingProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion.current || !variants?.length) return
    const isMobile = window.innerWidth < 768
    const effectiveInterval = isMobile ? Math.max(intervalMs, 4000) : intervalMs
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % variants.length)
    }, effectiveInterval)
    return () => clearInterval(timer)
  }, [intervalMs, isPaused, variants?.length])

  if (!variants || variants.length === 0) return null
  const current = variants[index]!

  return (
    <section
      className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-[1400px]">
        <div
          key={`eyebrow-${index}`}
          className="hero-eyebrow-anim inline-block bg-neon-500/10 text-neon-300 text-[11px] uppercase tracking-[0.12em] font-medium px-3 py-1.5 rounded-full mb-6"
        >
          {current.eyebrow}
        </div>

        <h1 className="font-display text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.02em] max-w-[820px]">
          <span className="block text-bone">{staticTitle}</span>
          <span className="block relative h-[1.1em] overflow-hidden">
            <span
              key={`variant-${index}`}
              className="hero-variant-anim block text-neon-500"
              aria-live="polite"
              aria-atomic="true"
            >
              {current.short}.
            </span>
          </span>
        </h1>

        <p className="text-bone-muted text-lg md:text-xl max-w-[520px] leading-relaxed mt-6 mb-9">
          Lawre aduce echipamentul, energia și mixul care fac diferența — indiferent de tipul
          evenimentului tău.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={current.hashUrl}
            className="inline-flex items-center gap-2 bg-neon-500 hover:bg-neon-400 text-ink px-6 py-3.5 rounded-md font-medium text-sm transition-colors"
          >
            {current.cta} →
          </Link>
          <Link
            href="/mixuri"
            className="inline-flex items-center gap-2 border-[0.5px] border-hairline text-bone hover:border-bone/40 px-6 py-3.5 rounded-md text-sm transition-colors"
          >
            ▶ Ascultă mixurile
          </Link>
        </div>

        <p className="mt-10 text-sm text-bone-dim">
          300+ evenimente · 8 ani în industrie · 5.0★ pe Google
        </p>
      </div>

      <div className="absolute right-12 top-24 hidden lg:flex gap-1 items-end h-[280px] pointer-events-none">
        {WAVEFORM_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="block w-[5px] bg-neon-500 rounded-sm"
            style={{
              height: `${h}%`,
              opacity: 0.6 + (i % 3) * 0.15,
              animation: `waveformPulse 2s ease-in-out ${i * 0.07}s infinite`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
