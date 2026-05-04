import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>DJ • Club &amp; Private Events • București</Eyebrow>
          <h1 className="mt-6 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(40px,6vw,72px)]">
            Sunet care schimbă seara.
          </h1>
          <p className="mt-6 text-bone-muted text-lg md:text-xl leading-relaxed max-w-2xl">
            Nuntă, corporate, club sau petrecere privată — Lawre aduce echipamentul, energia și
            mixul care fac diferența între un eveniment ok și unul de care vorbiți luni întregi.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/cerere-oferta" size="lg">
              Cere ofertă →
            </Button>
            <Button href="/mixuri" variant="ghost" size="lg">
              Ascultă mixurile
            </Button>
          </div>
          <p className="mt-10 text-sm text-bone-dim">
            800+ evenimente · 8 ani în industrie · 5.0★ pe Google
          </p>
        </div>
      </Container>
    </section>
  )
}
