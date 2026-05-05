import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Media } from '@/payload-types'
import { TestimonialCard } from '@/components/marketing/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Testimoniale — ${SITE_NAME}`,
  description:
    'Ce spun clienții despre Lawre DJ — recenzii reale de la nunți, botezuri, corporate și petreceri private din București.',
  alternates: { canonical: `${SITE_URL}/testimoniale` },
  openGraph: {
    title: `Testimoniale — ${SITE_NAME}`,
    description: 'Recenzii reale de la clienți mulțumiți.',
    url: `${SITE_URL}/testimoniale`,
    type: 'website',
  },
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  nunta: 'Nuntă',
  botez: 'Botez',
  cununie: 'Cununie civilă',
  majorat: 'Majorat',
  corporate: 'Corporate',
  club: 'Club',
  privat: 'Petrecere privată',
}

export default async function TestimonialeePage() {
  const payload = await getPayload({ config })
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: 50,
    sort: '-date',
  })

  const reviewSchema =
    testimonials.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: SITE_NAME,
          url: SITE_URL,
          review: testimonials.slice(0, 10).map((t) => ({
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(t.rating ?? 5),
              bestRating: '5',
            },
            author: { '@type': 'Person', name: t.clientName },
            reviewBody: t.quote,
          })),
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: (
              testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / testimonials.length
            ).toFixed(1),
            reviewCount: String(testimonials.length),
            bestRating: '5',
          },
        }
      : null

  return (
    <>
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      {/* Hero */}
      <Section className="pt-24 pb-12">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Testimoniale
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Ce spun clienții
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Recenzii reale, cu acordul clienților. Fiecare eveniment e diferit — la fel și feedback-ul.
          </p>
          {testimonials.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-neon-300 text-lg">★</span>
                ))}
              </div>
              <span className="text-bone-muted text-sm">
                {(
                  testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / testimonials.length
                ).toFixed(1)}{' '}
                din 5 · {testimonials.length} recenzii
              </span>
            </div>
          )}
        </Container>
      </Section>

      {/* Grid */}
      <Section divider dividerDelay={0.3} className="py-16">
        <Container>
          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bone-muted">Testimonialele se adaugă în curând.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((t) => {
                const photo =
                  t.photo && typeof t.photo === 'object'
                    ? { url: (t.photo as Media).url ?? '', alt: (t.photo as Media).alt }
                    : undefined
                const label = t.eventType
                  ? (EVENT_TYPE_LABELS[t.eventType] ?? t.eventType)
                  : undefined
                return (
                  <div key={t.id} className="break-inside-avoid">
                    <TestimonialCard
                      quote={t.quote}
                      clientName={t.clientName}
                      eventType={label}
                      rating={t.rating ?? 5}
                      photo={photo?.url ? photo : undefined}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
