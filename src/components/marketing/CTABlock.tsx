import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { WaveformDivider } from '@/components/ui/WaveformDivider'

const AMBIENT_BARS = [
  { h: 22, dur: 1.10, delay: 0.00 },
  { h: 45, dur: 0.82, delay: 0.04 },
  { h: 30, dur: 1.25, delay: 0.08 },
  { h: 68, dur: 0.90, delay: 0.12 },
  { h: 52, dur: 1.15, delay: 0.16 },
  { h: 85, dur: 0.76, delay: 0.20 },
  { h: 38, dur: 1.30, delay: 0.24 },
  { h: 72, dur: 0.95, delay: 0.28 },
  { h: 95, dur: 1.05, delay: 0.32 },
  { h: 44, dur: 0.85, delay: 0.36 },
  { h: 60, dur: 1.20, delay: 0.40 },
  { h: 28, dur: 0.72, delay: 0.44 },
  { h: 78, dur: 1.08, delay: 0.48 },
  { h: 55, dur: 0.88, delay: 0.52 },
  { h: 90, dur: 1.35, delay: 0.56 },
  { h: 36, dur: 0.80, delay: 0.60 },
  { h: 65, dur: 1.12, delay: 0.64 },
  { h: 48, dur: 0.93, delay: 0.68 },
  { h: 82, dur: 1.22, delay: 0.72 },
  { h: 33, dur: 0.78, delay: 0.76 },
  { h: 58, dur: 1.18, delay: 0.80 },
  { h: 76, dur: 0.86, delay: 0.84 },
  { h: 42, dur: 1.28, delay: 0.88 },
  { h: 88, dur: 0.74, delay: 0.92 },
  { h: 25, dur: 1.05, delay: 0.96 },
  { h: 70, dur: 0.91, delay: 1.00 },
  { h: 50, dur: 1.16, delay: 1.04 },
  { h: 92, dur: 0.82, delay: 1.08 },
  { h: 40, dur: 1.24, delay: 1.12 },
  { h: 63, dur: 0.88, delay: 1.16 },
  { h: 35, dur: 1.10, delay: 1.20 },
  { h: 80, dur: 0.79, delay: 1.24 },
  { h: 55, dur: 1.32, delay: 1.28 },
  { h: 45, dur: 0.95, delay: 1.32 },
  { h: 72, dur: 1.08, delay: 1.36 },
  { h: 28, dur: 0.75, delay: 1.40 },
  { h: 88, dur: 1.20, delay: 1.44 },
  { h: 62, dur: 0.87, delay: 1.48 },
  { h: 38, dur: 1.15, delay: 1.52 },
  { h: 74, dur: 0.93, delay: 1.56 },
  { h: 50, dur: 1.28, delay: 1.60 },
  { h: 32, dur: 0.81, delay: 1.64 },
  { h: 66, dur: 1.05, delay: 1.68 },
  { h: 85, dur: 0.76, delay: 1.72 },
  { h: 44, dur: 1.18, delay: 1.76 },
  { h: 58, dur: 0.90, delay: 1.80 },
  { h: 78, dur: 1.12, delay: 1.84 },
  { h: 30, dur: 0.84, delay: 1.88 },
]

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
    <section className="relative bg-ink-soft py-20 md:py-28">
      <WaveformDivider className="absolute top-0 left-0 right-0" delay={2.2} />
      <WaveformDivider className="absolute bottom-0 left-0 right-0" delay={3.4} />

      {/* Ambient spectrum bars — full-width background texture */}
      <div
        className="absolute inset-0 flex items-end overflow-hidden pointer-events-none opacity-[0.09]"
        aria-hidden
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        {AMBIENT_BARS.map((bar, i) => (
          <span
            key={i}
            className="waveform-bar flex-1 block"
            style={{
              height: `${bar.h}%`,
              background: '#d946ef',
              transformOrigin: 'bottom',
              animation: `waveBar ${bar.dur}s ease-in-out ${bar.delay}s infinite`,
            }}
          />
        ))}
      </div>

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
