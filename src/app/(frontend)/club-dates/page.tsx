import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 1800

export const metadata: Metadata = {
  title: `Club Dates — ${SITE_NAME}`,
  description:
    'Calendar evenimente live — cluburi și rezidențe unde mixează Lawre DJ în București. Bilete și detalii.',
  alternates: { canonical: `${SITE_URL}/club-dates` },
  openGraph: {
    title: `Club Dates — ${SITE_NAME}`,
    description: 'Unde și când îl prinzi live pe Lawre DJ.',
    url: `${SITE_URL}/club-dates`,
    type: 'website',
  },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.toLocaleDateString('ro-RO', { day: '2-digit' }),
    month: d.toLocaleDateString('ro-RO', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString('ro-RO', { weekday: 'long' }),
    full: d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }),
    iso: d.toISOString(),
    isPast: d < new Date(),
  }
}

export default async function ClubDatesPage() {
  const payload = await getPayload({ config })
  const { docs: dates } = await payload.find({
    collection: 'club-dates',
    depth: 0,
    limit: 50,
    sort: 'date',
  })

  const now = new Date()
  const upcoming = dates.filter((d) => new Date(d.date) >= now)
  const past = dates.filter((d) => new Date(d.date) < now).reverse()

  const eventSchemas = upcoming.map((d) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Lawre DJ @ ${d.venue}`,
    startDate: new Date(d.date).toISOString(),
    location: {
      '@type': 'Place',
      name: d.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: d.city ?? 'București',
        addressCountry: 'RO',
      },
    },
    performer: { '@type': 'Person', name: 'Lawre DJ', url: `${SITE_URL}/despre` },
    organizer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    ...(d.ticketUrl ? { url: d.ticketUrl } : {}),
  }))

  return (
    <>
      {eventSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchemas) }}
        />
      )}

      {/* Hero */}
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Club Dates
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Prinde-mă live
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Calendar complet cu evenimentele și rezidențele de club. Actualizat în timp real.
          </p>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          {dates.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bone-muted mb-2">Nu există date programate momentan.</p>
              <p className="text-sm text-bone-dim">
                Urmărește{' '}
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-300 hover:text-neon-200 transition-colors"
                >
                  Instagram
                </a>{' '}
                pentru anunțuri.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Upcoming */}
              {upcoming.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-medium text-bone mb-6">
                    Următoarele evenimente
                  </h2>
                  <div className="space-y-3">
                    {upcoming.map((d) => {
                      const fmt = formatDate(d.date)
                      return (
                        <div
                          key={d.id}
                          className="flex items-center gap-5 bg-ink-soft border border-hairline rounded-lg px-5 py-4 hover:border-neon-500/30 transition-colors"
                        >
                          {/* Date badge */}
                          <div className="flex-none w-14 text-center">
                            <div className="font-display text-2xl font-semibold text-bone leading-none">
                              {fmt.day}
                            </div>
                            <div className="text-xs text-neon-400 font-medium mt-0.5">
                              {fmt.month}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-bone truncate">{d.venue}</p>
                            <p className="text-sm text-bone-muted mt-0.5">
                              {fmt.weekday}
                              {d.city && d.city !== 'București' && ` · ${d.city}`}
                            </p>
                            {d.notes && (
                              <p className="text-xs text-bone-dim mt-1">{d.notes}</p>
                            )}
                          </div>

                          {/* Ticket */}
                          {d.ticketUrl && (
                            <a
                              href={d.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-none text-sm font-medium text-neon-300 hover:text-neon-200 transition-colors whitespace-nowrap"
                            >
                              Bilete →
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Past */}
              {past.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-medium text-bone-dim mb-5">
                    Evenimente trecute
                  </h2>
                  <div className="space-y-2">
                    {past.slice(0, 10).map((d) => {
                      const fmt = formatDate(d.date)
                      return (
                        <div
                          key={d.id}
                          className="flex items-center gap-5 border border-hairline/50 rounded-lg px-5 py-3 opacity-50"
                        >
                          <div className="flex-none w-14 text-center">
                            <div className="font-display text-lg font-medium text-bone-dim">
                              {fmt.day}
                            </div>
                            <div className="text-xs text-bone-dim">{fmt.month}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-bone-muted truncate">{d.venue}</p>
                            {d.city && d.city !== 'București' && (
                              <p className="text-xs text-bone-dim">{d.city}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
