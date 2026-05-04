import Link from 'next/link'
import { cn } from '@/lib/utils'

const TAG_LABELS: Record<string, string> = {
  'most-popular': 'Cel mai cerut',
  specialty: 'Specialitate',
  new: 'Nou',
}

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
        'group flex flex-col h-full bg-ink-soft border rounded-lg p-6 md:p-8 transition-colors',
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
      <span className="mt-6 inline-flex items-center gap-1 text-sm text-neon-300 group-hover:text-neon-200 transition-colors">
        Vezi detalii
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  )
}
