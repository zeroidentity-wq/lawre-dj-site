import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

type Props = {
  heading: string
  body?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CTABlock({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <section className="border-y border-hairline bg-ink-soft py-20 md:py-28">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            {heading}
          </h2>
          {body && <p className="mt-5 text-bone-muted text-base md:text-lg leading-relaxed">{body}</p>}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button href={secondaryHref} variant="ghost" size="lg">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
