import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/utils'

type Item = { title: string; body: string }

type Props = {
  eyebrow?: string
  heading?: string
  subtitle?: string
  columns?: '2' | '3' | '4'
  items: Item[]
}

const COLS: Record<NonNullable<Props['columns']>, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGrid({ eyebrow, heading, subtitle, columns = '2', items }: Props) {
  if (!items || items.length === 0) return null
  return (
    <section className="border-t border-hairline py-20 md:py-28">
      <Container>
        {(eyebrow || heading || subtitle) && (
          <header className="max-w-2xl mb-12">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
                {heading}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-bone-muted text-base md:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}
        <div className={cn('grid gap-6', COLS[columns])}>
          {items.map((it, idx) => (
            <div
              key={idx}
              className="bg-ink-soft border border-hairline rounded-lg p-6 md:p-8 transition-colors hover:border-hairline2"
            >
              <h3 className="font-display text-xl font-medium tracking-tight text-bone">
                {it.title}
              </h3>
              <p className="mt-3 text-bone-muted leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
