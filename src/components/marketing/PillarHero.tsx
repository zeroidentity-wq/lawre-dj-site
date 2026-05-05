import { Breadcrumbs, type BreadcrumbItem } from '@/components/marketing/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { WaveformDivider } from '@/components/ui/WaveformDivider'

type CTA = { label: string; href: string }

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  priceFrom?: { amount: number; currency?: string }
  breadcrumbs?: BreadcrumbItem[]
  ctaPrimary?: CTA
  ctaSecondary?: CTA
}

const CURRENCY_SYMBOL: Record<string, string> = { EUR: '€', RON: 'lei', USD: '$' }

export function PillarHero({
  eyebrow,
  title,
  subtitle,
  priceFrom,
  breadcrumbs,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 relative">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
        )}
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-6 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(36px,5.5vw,64px)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-bone-muted text-lg md:text-xl leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {priceFrom && (
            <p className="mt-8 inline-flex items-baseline gap-2 text-bone">
              <span className="text-xs uppercase tracking-[0.08em] text-bone-dim">De la</span>
              <span className="font-display text-3xl font-medium tracking-tight">
                {priceFrom.amount}
                <span className="text-xl ml-1">
                  {CURRENCY_SYMBOL[priceFrom.currency ?? 'EUR'] ?? priceFrom.currency ?? '€'}
                </span>
              </span>
            </p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {ctaPrimary && (
                <Button href={ctaPrimary.href} size="lg">
                  {ctaPrimary.label}
                </Button>
              )}
              {ctaSecondary && (
                <Button href={ctaSecondary.href} variant="ghost" size="lg">
                  {ctaSecondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
      <WaveformDivider className="absolute bottom-0 left-0 right-0" delay={0.3} />
    </section>
  )
}
