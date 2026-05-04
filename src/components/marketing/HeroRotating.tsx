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

const BARS = [
  { h: 28, dur: 0.82, delay: 0.00, w: 4 },
  { h: 52, dur: 1.10, delay: 0.06, w: 4 },
  { h: 38, dur: 0.74, delay: 0.12, w: 5 },
  { h: 75, dur: 1.25, delay: 0.18, w: 4 },
  { h: 44, dur: 0.91, delay: 0.24, w: 4 },
  { h: 88, dur: 1.38, delay: 0.30, w: 5 },
  { h: 35, dur: 0.78, delay: 0.36, w: 4 },
  { h: 62, dur: 1.05, delay: 0.42, w: 4 },
  { h: 95, dur: 0.88, delay: 0.48, w: 5 },
  { h: 42, dur: 1.20, delay: 0.54, w: 4 },
  { h: 70, dur: 0.72, delay: 0.60, w: 4 },
  { h: 30, dur: 1.15, delay: 0.66, w: 3 },
  { h: 58, dur: 0.95, delay: 0.72, w: 4 },
  { h: 82, dur: 1.30, delay: 0.78, w: 5 },
  { h: 46, dur: 0.85, delay: 0.84, w: 4 },
  { h: 68, dur: 1.08, delay: 0.90, w: 4 },
  { h: 92, dur: 0.76, delay: 0.96, w: 5 },
  { h: 38, dur: 1.22, delay: 1.02, w: 4 },
  { h: 55, dur: 0.93, delay: 1.08, w: 4 },
  { h: 78, dur: 1.35, delay: 1.14, w: 4 },
  { h: 33, dur: 0.80, delay: 1.20, w: 4 },
  { h: 64, dur: 1.12, delay: 1.26, w: 5 },
  { h: 85, dur: 0.86, delay: 1.32, w: 4 },
  { h: 48, dur: 1.18, delay: 1.38, w: 4 },
]

// Sine waveform path: 10 periods × 34px = 340px (seamlessly loops at 170px = half)
// viewBox height 32 — used on desktop
const SINE_PATH =
  'M0,16 Q8.5,4 17,16 Q25.5,28 34,16 Q42.5,4 51,16 Q59.5,28 68,16 ' +
  'Q76.5,4 85,16 Q93.5,28 102,16 Q110.5,4 119,16 Q127.5,28 136,16 ' +
  'Q144.5,4 153,16 Q161.5,28 170,16 Q178.5,4 187,16 Q195.5,28 204,16 ' +
  'Q212.5,4 221,16 Q229.5,28 238,16 Q246.5,4 255,16 Q263.5,28 272,16 ' +
  'Q280.5,4 289,16 Q297.5,28 306,16 Q314.5,4 323,16 Q331.5,28 340,16'

// Same wave scaled for viewBox height 24 — used on mobile
const SINE_PATH_MOBILE =
  'M0,12 Q8.5,3 17,12 Q25.5,21 34,12 Q42.5,3 51,12 Q59.5,21 68,12 ' +
  'Q76.5,3 85,12 Q93.5,21 102,12 Q110.5,3 119,12 Q127.5,21 136,12 ' +
  'Q144.5,3 153,12 Q161.5,21 170,12 Q178.5,3 187,12 Q195.5,21 204,12 ' +
  'Q212.5,3 221,12 Q229.5,21 238,12 Q246.5,3 255,12 Q263.5,21 272,12 ' +
  'Q280.5,3 289,12 Q297.5,21 306,12 Q314.5,3 323,12 Q331.5,21 340,12'

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

    // First change happens quickly so users immediately see the rotation
    const initialDelay = 1200
    let interval: ReturnType<typeof setInterval>

    const firstTick = setTimeout(() => {
      setIndex((prev) => (prev + 1) % variants.length)
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % variants.length)
      }, effectiveInterval)
    }, initialDelay)

    return () => {
      clearTimeout(firstTick)
      clearInterval(interval)
    }
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
          800+ evenimente · 8 ani în industrie · 5.0★ pe Google
        </p>

        {/* Mobile / tablet visualizer — shown below content on small screens */}
        <div className="lg:hidden mt-8">
          <div
            className="overflow-hidden flex justify-center"
            style={{
              height: '72px',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            <div className="flex gap-[2px] items-end shrink-0" style={{ height: '72px' }}>
              {[...BARS, ...BARS].map((bar, i) => (
                <span
                  key={i}
                  className="waveform-bar block rounded-[2px] shrink-0"
                  style={{
                    width: '4px',
                    height: `${bar.h}%`,
                    background:
                      bar.h >= 80
                        ? 'linear-gradient(to top, #a21caf, #f0abfc)'
                        : 'linear-gradient(to top, #c026d3, #e879f9)',
                    transformOrigin: 'bottom',
                    boxShadow:
                      bar.h >= 80
                        ? '0 0 8px 2px rgba(217,70,239,0.5)'
                        : '0 0 3px 1px rgba(217,70,239,0.2)',
                    animation: `waveBar ${bar.dur}s ease-in-out ${((i * 0.029) % 1.4).toFixed(3)}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className="waveform-sine mt-1 overflow-hidden opacity-40"
            style={{
              height: '24px',
              maskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <svg
              width="200%"
              height="24"
              viewBox="0 0 340 24"
              preserveAspectRatio="none"
              style={{ display: 'block', animation: 'waveSineScroll 3.8s linear infinite' }}
            >
              <path
                d={SINE_PATH_MOBILE}
                stroke="#d946ef"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={SINE_PATH_MOBILE}
                stroke="#e879f9"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.25"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute right-12 top-24 hidden lg:flex flex-col items-stretch gap-2 pointer-events-none select-none">
        {/* Spectrum analyzer bars */}
        <div className="flex gap-[3px] items-end h-[240px]">
          {BARS.map((bar, i) => (
            <span
              key={i}
              className="waveform-bar block rounded-[2px]"
              style={{
                width: `${bar.w}px`,
                height: `${bar.h}%`,
                background:
                  bar.h >= 80
                    ? 'linear-gradient(to top, #a21caf, #f0abfc)'
                    : 'linear-gradient(to top, #c026d3, #e879f9)',
                transformOrigin: 'bottom',
                boxShadow:
                  bar.h >= 80
                    ? '0 0 10px 2px rgba(217,70,239,0.55)'
                    : '0 0 4px 1px rgba(217,70,239,0.25)',
                animation: `waveBar ${bar.dur}s ease-in-out ${bar.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Scrolling sine waveform — seamlessly tiles every 170px */}
        <div
          className="waveform-sine overflow-hidden opacity-45"
          style={{
            height: '32px',
            maskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <svg
            width="200%"
            height="32"
            viewBox="0 0 340 32"
            preserveAspectRatio="none"
            style={{ display: 'block', animation: 'waveSineScroll 3.8s linear infinite' }}
          >
            <path
              d={SINE_PATH}
              stroke="#d946ef"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Glow duplicate path */}
            <path
              d={SINE_PATH}
              stroke="#e879f9"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
