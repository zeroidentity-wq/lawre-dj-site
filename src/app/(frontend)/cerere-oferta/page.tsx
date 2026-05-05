import type { Metadata } from 'next'
import Link from 'next/link'

import { ContactForm } from '@/components/forms/ContactForm'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Cere ofertă — ${SITE_NAME}`,
  description:
    'Trimite detaliile evenimentului tău și primești o ofertă personalizată în max 24h. Fără avans pentru ofertă, fără obligații.',
  alternates: { canonical: `${SITE_URL}/cerere-oferta` },
  robots: { index: false },
}

const SERVICE_TO_EVENT: Record<string, string> = {
  nunta: 'nunta',
  botez: 'botez',
  cununie: 'nunta',
  majorat: 'majorat',
  corporate: 'corporate',
  club: 'club',
  petrecere: 'privata',
  sonorizare: 'altul',
}

const STEPS = [
  { n: '1', label: 'Trimiți cererea', body: 'Completezi formularul cu datele evenimentului — durează sub 3 minute.' },
  { n: '2', label: 'Te contactez în 24h', body: 'Verific disponibilitatea și îți trimit oferta personalizată pe email sau WhatsApp.' },
  { n: '3', label: 'Stabilim detaliile', body: 'Un call scurt sau discuție pe chat — confirmăm pachetul, data și locația. Niciun avans înainte de confirmare.' },
]

export default async function CerereOfertaPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>
}) {
  const { service } = await searchParams
  const defaultEventType = service ? (SERVICE_TO_EVENT[service] ?? undefined) : undefined

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Cere ofertă
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Spune-mi despre evenimentul tău
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Completează formularul și primești o ofertă clară în max 24h. Fără avans pentru ofertă, fără obligații.
          </p>
        </Container>
      </Section>

      {/* Form + sidebar */}
      <Section divider dividerDelay={1.0} className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
            {/* Form */}
            <div>
              <ContactForm variant="full" defaultEventType={defaultEventType} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              {/* Steps */}
              <div>
                <h2 className="font-display text-lg font-medium text-bone mb-6">
                  Cum funcționează
                </h2>
                <ol className="space-y-6">
                  {STEPS.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="flex-none w-8 h-8 rounded-full bg-neon-500/10 border border-neon-500/30 flex items-center justify-center text-sm font-medium text-neon-300">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-bone">{s.label}</p>
                        <p className="mt-1 text-sm text-bone-muted leading-relaxed">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Quick contact */}
              <div className="border border-hairline rounded-lg p-6 space-y-4">
                <h2 className="font-display text-base font-medium text-bone">
                  Sau contactează direct
                </h2>
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
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-neon-400 hover:text-neon-300 transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                  {CONTACT.instagramHandle}
                </a>
                <p className="text-xs text-bone-dim pt-2 border-t border-hairline">
                  Aria acoperită:{' '}
                  <span className="text-bone-muted">{CONTACT.area}</span>
                </p>
              </div>

              {/* Back link */}
              <Link
                href="/servicii/dj-nunta-bucuresti"
                className="inline-flex items-center gap-1.5 text-sm text-bone-dim hover:text-neon-300 transition-colors"
              >
                ← Înapoi la servicii
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
