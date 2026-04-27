import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  subtitle?: string
  description?: string
  href: string
  featured?: boolean
}

export function ServiceCard({ title, subtitle, description, href, featured }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col h-full bg-ink-soft border rounded-lg p-6 md:p-8 transition-colors',
        featured ? 'border-neon-500/60 hover:border-neon-500' : 'border-hairline hover:border-neon-500/40',
      )}
    >
      {subtitle && (
        <span className="text-[11px] uppercase tracking-[0.08em] text-neon-300 mb-3">
          {subtitle}
        </span>
      )}
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
