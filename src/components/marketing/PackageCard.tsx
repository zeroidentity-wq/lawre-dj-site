import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  price: number
  currency?: string
  tagline?: string
  forWho: string
  features: string[]
  featured?: boolean
  href: string
}

const CURRENCY_SYMBOL: Record<string, string> = { EUR: '€', RON: 'lei', USD: '$' }

export function PackageCard({
  name,
  price,
  currency = 'EUR',
  tagline = 'De la',
  forWho,
  features,
  featured,
  href,
}: Props) {
  const symbol = CURRENCY_SYMBOL[currency] ?? currency
  return (
    <div
      className={cn(
        'relative flex flex-col h-full bg-ink-soft border rounded-lg p-6 md:p-8',
        featured ? 'border-neon-500' : 'border-hairline',
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-6 inline-block text-[11px] font-medium uppercase tracking-[0.08em] text-ink bg-neon-500 px-3 py-1 rounded-full">
          Cel mai cerut
        </span>
      )}
      <h3 className="font-display text-2xl font-medium tracking-tight text-bone">{name}</h3>
      <p className="mt-2 text-sm text-bone-muted">{forWho}</p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-xs uppercase tracking-[0.08em] text-bone-dim">{tagline}</span>
        <span className="font-display text-4xl md:text-5xl font-medium tracking-tight text-bone">
          {price}
          <span className="text-2xl ml-1">{symbol}</span>
        </span>
      </div>
      <ul className="mt-6 space-y-2.5 text-sm text-bone-muted flex-1">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span aria-hidden className="text-neon-300 shrink-0 mt-0.5">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href={href} variant={featured ? 'primary' : 'ghost'} size="md" className="w-full">
          Vezi detalii →
        </Button>
      </div>
    </div>
  )
}
