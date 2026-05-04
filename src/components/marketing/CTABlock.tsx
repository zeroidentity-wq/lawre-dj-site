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
              <Button
                href={secondaryHref}
                variant="ghost"
                size="lg"
                className={secondaryHref.includes('wa.me') ? 'text-neon-400 border-neon-500/40 hover:border-neon-400 hover:bg-neon-500/10' : undefined}
              >
                {secondaryHref.includes('wa.me') && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.858L0 24l6.335-1.502A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.022-1.381l-.36-.214-3.732.885.944-3.617-.235-.372A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                )}
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
