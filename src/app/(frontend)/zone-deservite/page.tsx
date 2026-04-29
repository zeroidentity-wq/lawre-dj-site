import type { Metadata } from 'next'
import Link from 'next/link'

import { ZONES } from '@/lib/zone-deservite'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Zone deservite — ${SITE_NAME}`,
  description:
    'Lawre DJ acoperă toate sectoarele București (1-6) și județul Ilfov: Otopeni, Voluntari, Popești-Leordeni, Pantelimon, Chitila, Bragadiru.',
  alternates: { canonical: `${SITE_URL}/zone-deservite` },
}

const sectors = ZONES.filter((z) => z.type === 'sector')
const orase = ZONES.filter((z) => z.type === 'oras')

export default function ZoneDesservitePage() {
  return (
    <>
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Zone deservite
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            București și Ilfov — complet acoperit
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Activez în toate cele 6 sectoare ale Bucureștiului și în tot județul Ilfov. Deplasarea e inclusă în preț pentru localitățile listate mai jos.
          </p>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-xl font-medium text-bone mb-6">
                Sectoare București
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sectors.map((z) => (
                  <Link
                    key={z.slug}
                    href={`/zone-deservite/${z.slug}`}
                    className="flex items-center justify-between bg-ink-soft border border-hairline hover:border-neon-500/40 rounded-lg px-5 py-4 transition-colors group"
                  >
                    <span className="text-sm font-medium text-bone group-hover:text-neon-300 transition-colors">
                      {z.name}
                    </span>
                    <span className="text-bone-dim text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-medium text-bone mb-6">
                Localități Ilfov
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {orase.map((z) => (
                  <Link
                    key={z.slug}
                    href={`/zone-deservite/${z.slug}`}
                    className="flex items-center justify-between bg-ink-soft border border-hairline hover:border-neon-500/40 rounded-lg px-5 py-4 transition-colors group"
                  >
                    <span className="text-sm font-medium text-bone group-hover:text-neon-300 transition-colors">
                      {z.name}
                    </span>
                    <span className="text-bone-dim text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-hairline rounded-lg p-6 max-w-2xl">
              <p className="text-sm text-bone-muted leading-relaxed">
                Pentru localități în afara listei de mai sus, costul deplasării se discută separat — dar nu am refuzat niciun eveniment din motive logistice.{' '}
                <Link href="/contact" className="text-neon-300 hover:text-neon-200 transition-colors">
                  Întreabă-mă direct →
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
