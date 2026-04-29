import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ZONES, ZONE_MAP, buildZoneUrl } from '@/lib/zone-deservite'
import { JsonLd } from '@/components/marketing/JsonLd'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export function generateStaticParams() {
  return ZONES.map((z) => ({ slug: z.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const zone = ZONE_MAP[params.slug]
  if (!zone) return {}

  const title = `${zone.h1} | ${SITE_NAME}`
  const description = `${zone.intro} Ofertă personalizată în max 24h, fără obligații.`

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: buildZoneUrl(zone.slug) },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: buildZoneUrl(zone.slug),
      type: 'website',
    },
  }
}

const SERVICES = [
  { label: 'DJ Nuntă', href: '/servicii/dj-nunta-bucuresti' },
  { label: 'DJ Botez', href: '/servicii/dj-botez-bucuresti' },
  { label: 'DJ Cununie Civilă', href: '/servicii/dj-cununie-civila' },
  { label: 'DJ Majorat', href: '/servicii/dj-majorat-bucuresti' },
  { label: 'DJ Corporate', href: '/servicii/dj-corporate-bucuresti' },
  { label: 'DJ Petrecere Privată', href: '/servicii/dj-petrecere-privata' },
  { label: 'Sonorizare', href: '/servicii/sonorizare-evenimente' },
]

export default function ZoneSlugPage({ params }: { params: { slug: string } }) {
  const zone = ZONE_MAP[params.slug]
  if (!zone) notFound()

  const nearbyZones = zone.nearbyZones
    .map((s) => ZONE_MAP[s])
    .filter(Boolean)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT.email,
    areaServed: {
      '@type': zone.type === 'sector' ? 'AdministrativeArea' : 'City',
      name: zone.name,
      containedInPlace: {
        '@type': 'City',
        name: zone.type === 'sector' ? 'București' : 'Ilfov',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Servicii DJ ${zone.name}`,
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${s.label} ${zone.name}`,
          url: `${SITE_URL}${s.href}`,
        },
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Zone deservite',
        item: `${SITE_URL}/zone-deservite`,
      },
      { '@type': 'ListItem', position: 3, name: zone.name },
    ],
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-bone-dim">
              <li>
                <Link href="/" className="hover:text-neon-300 transition-colors">
                  Acasă
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/zone-deservite" className="hover:text-neon-300 transition-colors">
                  Zone deservite
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-bone-muted">{zone.name}</li>
            </ol>
          </nav>

          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            {zone.type === 'sector' ? 'București' : 'Ilfov'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            {zone.h1}
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">{zone.intro}</p>
        </Container>
      </Section>

      {/* Content + sidebar */}
      <Section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
            {/* Body text */}
            <div className="space-y-8">
              <div className="space-y-5 text-bone-muted leading-relaxed">
                {zone.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Services list */}
              <div>
                <h2 className="font-display text-xl font-medium text-bone mb-5">
                  Servicii disponibile în {zone.name}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="flex items-center gap-2.5 text-sm text-bone-muted hover:text-neon-300 transition-colors"
                      >
                        <span className="text-neon-400 text-xs">✓</span>
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby zones */}
              {nearbyZones.length > 0 && (
                <div>
                  <h3 className="font-display text-base font-medium text-bone mb-4">
                    Zone apropiate
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {nearbyZones.map((z) => (
                      <Link
                        key={z.slug}
                        href={`/zone-deservite/${z.slug}`}
                        className="text-xs border border-hairline hover:border-neon-500/40 text-bone-muted hover:text-bone px-3 py-1.5 rounded-full transition-colors"
                      >
                        {z.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA sidebar */}
            <aside className="space-y-6">
              <div className="border border-neon-500/30 rounded-lg p-6 bg-neon-500/5">
                <h3 className="font-display text-base font-medium text-bone mb-2">
                  Cere ofertă pentru {zone.name}
                </h3>
                <p className="text-sm text-bone-muted mb-5">
                  Răspund în max 24h cu o ofertă clară. Fără avans pentru ofertă, fără obligații.
                </p>
                <Link
                  href="/cerere-oferta"
                  className="flex items-center justify-center gap-2 w-full bg-neon-500 hover:bg-neon-400 text-ink font-medium px-5 py-3 rounded-md text-sm transition-colors"
                >
                  Trimite cererea →
                </Link>
              </div>

              <div className="border border-hairline rounded-lg p-6 space-y-3">
                <h3 className="font-display text-base font-medium text-bone">Contact direct</h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-sm text-bone-muted hover:text-neon-300 transition-colors"
                >
                  <span className="text-neon-400">✉</span>
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-bone-muted hover:text-neon-300 transition-colors"
                >
                  <span className="text-neon-400">✆</span>
                  {CONTACT.phone}
                </a>
              </div>

              <Link
                href="/zone-deservite"
                className="text-sm text-bone-dim hover:text-neon-300 transition-colors"
              >
                ← Toate zonele deservite
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
