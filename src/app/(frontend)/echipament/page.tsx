import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Equipment } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Echipament DJ — ${SITE_NAME}`,
  description:
    'Echipament DJ profesional propriu — controllere, mixere, boxe, iluminare. Fără surprize tehnice la evenimentul tău.',
  alternates: { canonical: `${SITE_URL}/echipament` },
  openGraph: {
    title: `Echipament DJ profesional — ${SITE_NAME}`,
    description: 'Echipament propriu de top — sunet consistent la orice eveniment.',
    url: `${SITE_URL}/echipament`,
    type: 'website',
  },
}

const CATEGORY_LABELS: Record<NonNullable<Equipment['category']>, string> = {
  mixer: 'Mixer',
  controller: 'Controller DJ',
  speakers: 'Boxe & Subwoofer',
  lighting: 'Iluminare',
  microphone: 'Microfoane',
  cdj: 'CDJ / Media Player',
  other: 'Altele',
}

const CATEGORY_ORDER: NonNullable<Equipment['category']>[] = [
  'controller',
  'cdj',
  'mixer',
  'speakers',
  'lighting',
  'microphone',
  'other',
]

export default async function EchipamentPage() {
  const payload = await getPayload({ config })
  const { docs: equipment } = await payload.find({
    collection: 'equipment',
    depth: 0,
    limit: 100,
    sort: 'name',
  })

  const grouped = CATEGORY_ORDER.reduce<Record<string, Equipment[]>>((acc, cat) => {
    const items = equipment.filter((e) => e.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  const uncategorized = equipment.filter((e) => !e.category)
  if (uncategorized.length > 0) grouped['other'] = [...(grouped['other'] ?? []), ...uncategorized]

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Echipament
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Echipament propriu, sunet profesional
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Nu vin cu echipament de închiriat sau împrumutat. Tot ce auzi la un eveniment cu Lawre DJ e verificat, calibrat și al meu — asta înseamnă zero surprize tehnice în seara evenimentului.
          </p>
        </Container>
      </Section>

      {/* Equipment list */}
      <Section className="py-16">
        <Container>
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bone-muted mb-2">Lista de echipament se actualizează în curând.</p>
              <p className="text-sm text-bone-dim">
                Contactează-mă direct pentru detalii despre setup-ul tehnic.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => (
                <div key={cat}>
                  <h2 className="font-display text-lg font-medium text-bone mb-5 pb-3 border-b border-hairline">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {grouped[cat].map((item) => (
                      <div
                        key={item.id}
                        className="bg-ink-soft border border-hairline rounded-lg p-5"
                      >
                        <p className="text-sm font-medium text-bone">{item.name}</p>
                        {(item.brand || item.model) && (
                          <p className="mt-1 text-xs text-bone-dim">
                            {[item.brand, item.model].filter(Boolean).join(' · ')}
                          </p>
                        )}
                        {item.description && (
                          <p className="mt-2 text-xs text-bone-muted leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Note */}
          <div className="mt-16 border border-hairline rounded-lg p-6 max-w-2xl">
            <h3 className="font-display text-base font-medium text-bone mb-2">
              Setup adaptat la eveniment
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed">
              Configurația exactă variază în funcție de tipul și dimensiunea evenimentului. Pentru un club sau o sală mare, aduc setup complet cu subwoofer și iluminare. Pentru o petrecere privată mai mică, sistemul e proporțional cu spațiul. Discutăm detaliile când iei legătura.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
