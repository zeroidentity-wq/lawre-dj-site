import Link from 'next/link'
import { cn } from '@/lib/utils'

const TAG_LABELS: Record<string, string> = {
  'most-popular': 'Cel mai cerut',
  specialty: 'Specialitate',
  new: 'Nou',
}

// Always animating (via waveBar keyframe) — invisible until card hover
const EQUALIZER_BARS = [
  { h: 35, dur: 0.82, delay: 0.00 },
  { h: 78, dur: 0.71, delay: 0.11 },
  { h: 52, dur: 1.05, delay: 0.22 },
  { h: 92, dur: 0.88, delay: 0.33 },
  { h: 46, dur: 0.95, delay: 0.44 },
]

type Props = {
  title: string
  subtitle?: string
  description?: string
  href: string
  featured?: boolean
  cardTag?: string | null
}

export function ServiceCard({ title, subtitle, description, href, featured, cardTag }: Props) {
  const tagLabel = cardTag && cardTag !== 'none' ? TAG_LABELS[cardTag] : null

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col h-full bg-ink-soft border rounded-lg p-6 md:p-8 transition-colors',
        featured
          ? 'border-neon-500/60 hover:border-neon-500 bg-neon-500/[0.04]'
          : 'border-hairline hover:border-neon-500/40',
      )}
    >
      <div className="flex justify-between items-start mb-3 gap-3">
        {subtitle && (
          <span className="text-[11px] uppercase tracking-[0.08em] text-neon-300">{subtitle}</span>
        )}
        {tagLabel && (
          <span className="shrink-0 text-[10px] uppercase tracking-[0.06em] font-medium text-neon-300 bg-neon-500/15 px-2 py-1 rounded-full">
            {tagLabel}
          </span>
        )}
      </div>
      <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-bone">
        {title}
      </h3>
      {description && (
        <p className="mt-3 text-sm text-bone-muted leading-relaxed">{description}</p>
      )}

      {/* Bottom row: link + mini equalizer */}
      <div className="mt-6 flex items-end justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-sm text-neon-300 group-hover:text-neon-200 transition-colors">
          Vezi detalii
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>

        {/* Mini spectrum equalizer — fades in on hover */}
        <div
          aria-hidden
          className="flex gap-[2px] items-end shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ height: '20px' }}
        >
          {EQUALIZER_BARS.map((bar, i) => (
            <span
              key={i}
              className="waveform-bar block rounded-[1.5px]"
              style={{
                width: '3px',
                height: `${bar.h}%`,
                background: 'linear-gradient(to top, #c026d3, #e879f9)',
                transformOrigin: 'bottom',
                boxShadow: '0 0 4px 1px rgba(217,70,239,0.35)',
                animation: `waveBar ${bar.dur}s ease-in-out ${bar.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
