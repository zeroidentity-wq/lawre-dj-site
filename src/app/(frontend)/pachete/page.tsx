import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { PackageCard } from '@/components/marketing/PackageCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Pachete DJ — ${SITE_NAME}`,
  description:
    'Pachete DJ pentru nunți, botezuri, corporate și petreceri private în București. Essential de la 350€, Premium de la 650€, Platinum de la 1100€.',
  alternates: { canonical: `${SITE_URL}/pachete` },
  openGraph: {
    title: `Pachete DJ — ${SITE_NAME}`,
    description: 'Alege pachetul potrivit pentru evenimentul tău. Prețuri transparente, fără costuri ascunse.',
    url: `${SITE_URL}/pachete`,
    type: 'website',
  },
}

export default async function PachetePage() {
  const payload = await getPayload({ config })
  const { docs: packages } = await payload.find({
    collection: 'packages',
    sort: 'price',
    depth: 0,
    limit: 10,
  })

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Pachete
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Prețuri clare, fără surprize
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Trei pachete adaptate pentru orice tip de eveniment și buget. Toate includ echipament profesional și experiența unui DJ activ pe scena de club.
          </p>
        </Container>
      </Section>

      {/* Packages grid */}
      <Section divider dividerDelay={0.5} className="py-16">
        <Container>
          {packages.length === 0 ? (
            <p className="text-bone-muted text-center py-12">
              Pachetele sunt în curs de actualizare. Contactează-mă direct pentru o ofertă personalizată.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  name={pkg.name}
                  price={pkg.price ?? 0}
                  currency={pkg.currency ?? 'EUR'}
                  tagline="De la"
                  forWho={pkg.tagline ?? ''}
                  features={(pkg.features ?? []).map((f) => f.feature)}
                  featured={pkg.slug === 'premium'}
                  href={`/pachete/${pkg.slug}`}
                />
              ))}
            </div>
          )}

          {/* Note */}
          <div className="mt-12 border border-hairline rounded-lg p-6 max-w-2xl mx-auto text-center">
            <p className="text-sm text-bone-muted leading-relaxed">
              Prețurile sunt orientative și pot varia în funcție de data, locația și cerințele specifice ale evenimentului.{' '}
              <a href="/cerere-oferta" className="text-neon-300 hover:text-neon-200 transition-colors">
                Cere o ofertă personalizată →
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
