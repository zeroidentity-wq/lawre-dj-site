import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Contact — ${SITE_NAME}`,
  description:
    'Contactează-l pe Lawre DJ pentru nunți, botezuri, corporate, club și petreceri private în București și Ilfov. Răspuns în max 24h.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact — ${SITE_NAME}`,
    description: 'Scrie-ne pentru o ofertă personalizată. Răspuns în max 24h.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
}

type ContactItem = {
  label: string
  value: string
  href: string
  description: string
  external?: boolean
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    description: 'Răspund în max 24h, de obicei mai repede.',
  },
  {
    label: 'Telefon / WhatsApp',
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
    description: 'Disponibil L-V 10:00-20:00 și în weekend prin mesaj.',
  },
  {
    label: 'Instagram',
    value: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    description: 'Poți vedea mixuri, poze de la evenimente și răspund la DM.',
    external: true,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Hai să vorbim despre evenimentul tău
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Disponibil pentru nunți, botezuri, corporate, majorat, club și petreceri private în București și Ilfov. Răspund în max 24h.
          </p>
        </Container>
      </Section>

      {/* Contact info + form */}
      <Section divider dividerDelay={0.6} className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — info */}
            <div className="space-y-10">
              {/* Contact items */}
              <div className="space-y-6">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="flex gap-5">
                    <div className="flex-none w-10 h-10 rounded-lg bg-ink-soft border border-hairline flex items-center justify-center text-neon-400 text-sm">
                      {item.label === 'Email' ? '✉' : item.label === 'Telefon / WhatsApp' ? '✆' : '@'}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-bone-dim mb-1">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-base font-medium text-bone hover:text-neon-300 transition-colors"
                      >
                        {item.value}
                      </a>
                      <p className="mt-1 text-sm text-bone-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Area covered */}
              <div className="border border-hairline rounded-lg p-6">
                <h2 className="font-display text-base font-medium text-bone mb-3">
                  Aria acoperită
                </h2>
                <p className="text-sm text-bone-muted leading-relaxed">
                  Toate sectoarele București (1-6), plus tot județul Ilfov — Otopeni, Voluntari, Popești-Leordeni, Chitila, Bragadiru, Pantelimon și altele. Pentru localități mai îndepărtate, costul deplasării se discută separat.
                </p>
              </div>

              {/* Response time note */}
              <div className="flex gap-3 items-start">
                <span className="text-neon-400 text-lg">⚡</span>
                <p className="text-sm text-bone-muted">
                  <span className="text-bone font-medium">Răspuns garantat în max 24h.</span>{' '}
                  De obicei răspund în aceeași zi. Dacă vrei un răspuns rapid, WhatsApp sau Instagram DM e cea mai rapidă cale.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <h2 className="font-display text-xl font-medium text-bone mb-6">
                Sau trimite un mesaj direct
              </h2>
              <ContactForm variant="compact" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
