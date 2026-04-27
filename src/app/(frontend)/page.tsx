import { ContactForm } from '@/components/forms/ContactForm'
import { CTABlock } from '@/components/marketing/CTABlock'
import { Hero } from '@/components/marketing/Hero'
import { PackageCard } from '@/components/marketing/PackageCard'
import { ServiceCard } from '@/components/marketing/ServiceCard'
import { StatsStrip } from '@/components/marketing/StatsStrip'
import { TestimonialCard } from '@/components/marketing/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'

export default function HomePage() {
  return (
    <>
      <Hero />

      <StatsStrip />

      <Section>
        <header className="max-w-2xl">
          <Eyebrow>Servicii</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            De la primul dans la afterparty.
          </h2>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            title="DJ Nuntă"
            subtitle="Cel mai cerut"
            description="De la cununie civilă până la afterparty — coordonare, intrarea mirilor, primul dans, sârba."
            href="/servicii/dj-nunta-bucuresti"
            featured
          />
          <ServiceCard
            title="DJ Corporate"
            description="Gala, lansări de produs, teambuilding. Sound profesional și vibe pe publicul tău."
            href="/servicii/dj-corporate-bucuresti"
          />
          <ServiceCard
            title="DJ Club"
            description="Rezidențe și guest sets în cluburi din București. House, tech-house, deep."
            href="/servicii/dj-club-rezidenta"
          />
        </div>
      </Section>

      <Section className="bg-ink-soft/40">
        <header className="max-w-2xl">
          <Eyebrow>Pachete</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            Trei opțiuni clare. Zero surprize.
          </h2>
        </header>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <PackageCard
            name="Essential"
            price={350}
            forWho="Petreceri private, botezuri mici, până în 80 invitați."
            features={[
              '6 ore de mix live',
              '2x boxe active (până la 800W RMS)',
              '1x microfon wireless',
              'Lumini de bază (4 par-uri LED)',
              'Deplasare București + Ilfov',
            ]}
            href="/pachete/essential"
          />
          <PackageCard
            name="Premium"
            price={650}
            forWho="Nunți medii, botezuri, corporate până în 200 invitați."
            features={[
              '8 ore de mix live (până la 02:00)',
              '2x top-uri + 2x sub-uri (2000W RMS)',
              '2x microfoane Shure wireless',
              '4x moving heads + 2x par LED + fum',
              'Coordonare cu fotograf & restaurant',
              'Backup echipament inclus',
            ]}
            href="/pachete/premium"
            featured
          />
          <PackageCard
            name="Platinum"
            price={1100}
            forWho="Nunți mari, corporate până în 500+ invitați."
            features={[
              'Mix live nelimitat (până dimineața)',
              'Sistem line array (4000W RMS)',
              '4x microfoane wireless + monitor',
              'Light show complet + lasere',
              'Tehnician sunet dedicat',
              'Backup echipament dublat',
            ]}
            href="/pachete/platinum"
          />
        </div>
      </Section>

      <Section>
        <header className="max-w-2xl">
          <Eyebrow>Ce spun clienții</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            300+ evenimente. Niciun client nedorit acasă.
          </h2>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <TestimonialCard
            quote="Lawre a citit ringul perfect. Părinții pe muzică românească, tinerii pe house — și toată lumea pe ring până la 4 dimineața."
            clientName="Ana & Mihai"
            eventType="Nuntă · Septembrie 2025"
          />
          <TestimonialCard
            quote="Am avut un teambuilding de 120 oameni. Profesionist, punctual, cu echipament impecabil. Recomand fără rezerve."
            clientName="Andreea P."
            eventType="Corporate · Mai 2025"
          />
          <TestimonialCard
            quote="Set deschidere la club a fost serios. Energie corectă, tranziții curate, fără rateuri."
            clientName="Radu (Club Manager)"
            eventType="Club · 2025"
          />
        </div>
      </Section>

      <CTABlock
        heading="Ai data fixă? Hai să vorbim."
        body="Spune-mi tipul evenimentului, data și locația. Îți răspund în 24h cu disponibilitate și un pachet potrivit."
        primaryLabel="Cere ofertă personalizată →"
        primaryHref="/cerere-oferta"
        secondaryLabel="Scrie pe WhatsApp"
        secondaryHref="https://wa.me/40700000000"
      />

      <Section>
        <Container className="max-w-2xl">
          <Eyebrow>Contact rapid</Eyebrow>
          <h2 className="mt-4 mb-8 font-display text-3xl md:text-4xl font-medium tracking-[-0.015em]">
            Câteva detalii și îți răspund în 24h.
          </h2>
          <ContactForm variant="compact" />
        </Container>
      </Section>
    </>
  )
}
