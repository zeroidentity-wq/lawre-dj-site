import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

import { TestimonialCard } from '@/components/marketing/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Despre — ${SITE_NAME}`,
  description:
    'Povestea lui Lawre DJ — DJ profesionist din București cu peste 5 ani experiență pe scenele de club și la evenimente private. Află cine ești angajezi.',
  alternates: { canonical: `${SITE_URL}/despre` },
  openGraph: {
    title: `Despre Lawre DJ`,
    description: 'DJ profesionist din București pentru nunți, botezuri, corporate și club.',
    url: `${SITE_URL}/despre`,
    type: 'profile',
  },
}

const STATS = [
  { value: '8 ani', label: 'experiență' },
  { value: '800+', label: 'evenimente' },
  { value: '8', label: 'servicii acoperite' },
  { value: '24h', label: 'timp răspuns' },
]

const SERVICES = [
  'DJ Nuntă București',
  'DJ Botez',
  'DJ Cununie Civilă',
  'DJ Majorat',
  'DJ Corporate',
  'DJ Club / Rezidențe',
  'DJ Petrecere Privată',
  'Sonorizare Evenimente',
]

export default async function DesprePage() {
  const payload = await getPayload({ config })
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: 3,
    sort: '-date',
  })

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lawre DJ',
    url: `${SITE_URL}/despre`,
    jobTitle: 'DJ profesionist',
    worksFor: {
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      url: SITE_URL,
    },
    sameAs: [CONTACT.instagram],
    knowsAbout: ['DJ', 'Muzică electronică', 'Evenimente private', 'Nunți', 'Club'],
    areaServed: [
      { '@type': 'City', name: 'București' },
      { '@type': 'AdministrativeArea', name: 'Ilfov' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero */}
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
                Despre
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
                Bine ai venit. Sunt Lawre.
              </h1>
              <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
                DJ profesionist din București, activ pe scena de club și la evenimente private de peste 5 ani. Nu sunt un "wedding DJ" generic — vin din club, știu ce înseamnă o noapte care funcționează cu adevărat.
              </p>
            </div>
            <div className="relative w-full max-w-[380px] mx-auto lg:mx-0 aspect-[3/4] rounded-xl overflow-hidden">
              <Image
                src="/images/lawre-dj-portrait.png"
                alt="Lawre DJ — portret"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="py-12 border-b border-hairline">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-[0.08em] text-bone-dim mb-1">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold text-bone">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Bio */}
      <Section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
            {/* Text */}
            <div className="space-y-6 text-bone-muted leading-relaxed">
              <h2 className="font-display text-2xl font-medium text-bone">Povestea</h2>
              <p>
                Am început să mixez din pasiune, nu din business. Cluburile m-au format — cititul sălii, construitul energiei de la zero, tranziția fără fisuri între genuri. Asta se simte diferit față de un DJ care a lucrat doar la nunți.
              </p>
              <p>
                Azi aplic aceeași atenție la detalii la fiecare eveniment privat. La o nuntă sau un botez, știu că muzica nu e fundal — e parte din experiența pe care o vor ține minte invitații. De aceea mă prepar separat pentru fiecare eveniment, nu rulăm același playlist tuturor.
              </p>
              <p>
                Lucrez cu <strong className="text-bone">echipament propriu profesional</strong> — nu vin cu ce aduce firma de la care mă închiriezi. Asta înseamnă sunet consistent, fără surprize tehnice în seara evenimentului.
              </p>
              <p>
                Aria mea principală este <strong className="text-bone">București și Ilfov</strong>. Pentru locații mai îndepărtate, costul deplasării se discută separat — dar nu am refuzat niciun eveniment dintr-un motiv logistic.
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/cerere-oferta"
                  className="inline-flex items-center gap-2 bg-neon-500 hover:bg-neon-400 text-ink font-medium px-5 py-2.5 rounded-md text-sm transition-colors"
                >
                  Cere ofertă →
                </Link>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neon-500/40 hover:border-neon-400 hover:bg-neon-500/10 text-neon-400 px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                  {CONTACT.instagramHandle}
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Services */}
              <div className="border border-hairline rounded-lg p-6">
                <h3 className="font-display text-base font-medium text-bone mb-4">Servicii oferite</h3>
                <ul className="space-y-2">
                  {SERVICES.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-sm text-bone-muted">
                      <span className="text-neon-400 text-xs">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact rapid */}
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
                <p className="text-xs text-bone-dim pt-1">
                  Răspund în max 24h · {CONTACT.area}
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section className="py-16 border-t border-hairline">
          <Container>
            <h2 className="font-display text-2xl font-medium text-bone mb-8">Ce spun clienții</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => {
                const photo =
                  t.photo && typeof t.photo === 'object' && t.photo.url
                    ? { url: t.photo.url, alt: t.photo.alt }
                    : undefined
                return (
                  <TestimonialCard
                    key={t.id}
                    quote={t.quote}
                    clientName={t.clientName}
                    eventType={t.eventType ?? undefined}
                    rating={t.rating ?? 5}
                    photo={photo}
                  />
                )
              })}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
