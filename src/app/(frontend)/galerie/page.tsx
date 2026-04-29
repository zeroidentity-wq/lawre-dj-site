import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Media } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Galerie — ${SITE_NAME}`,
  description:
    'Galerie foto de la evenimentele lui Lawre DJ — nunți, botezuri, corporate și cluburi din București și Ilfov.',
  alternates: { canonical: `${SITE_URL}/galerie` },
  openGraph: {
    title: `Galerie foto — ${SITE_NAME}`,
    description: 'Poze de la nunți, botezuri, corporate și cluburi din București.',
    url: `${SITE_URL}/galerie`,
    type: 'website',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  nunta: 'Nuntă',
  botez: 'Botez',
  corporate: 'Corporate',
  club: 'Club',
  majorat: 'Majorat',
  privat: 'Petrecere privată',
}

export default async function GaleriePage() {
  const payload = await getPayload({ config })
  const { docs: galleries } = await payload.find({
    collection: 'galleries',
    depth: 2,
    limit: 20,
    sort: '-updatedAt',
  })

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Galerie
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Imagini din spatele sunetului
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Momente capturate de la nunți, botezuri, corporate și cluburi. Fiecare eveniment e diferit — la fel și energia din el.
          </p>
        </Container>
      </Section>

      {/* Galleries */}
      <Section className="py-16">
        <Container>
          {galleries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bone-muted mb-2">Galeria se actualizează în curând.</p>
              <p className="text-sm text-bone-dim">
                Urmărește{' '}
                <a
                  href="https://www.instagram.com/lawre_dj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-300 hover:text-neon-200 transition-colors"
                >
                  @lawre_dj pe Instagram
                </a>{' '}
                pentru poze și reels de la evenimente.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {galleries.map((gallery) => {
                const images = (gallery.images ?? []).filter(
                  (img) => typeof img.image === 'object' && img.image !== null,
                )
                if (images.length === 0) return null

                return (
                  <div key={gallery.id}>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="font-display text-xl font-medium text-bone">
                        {gallery.title}
                      </h2>
                      {gallery.category && (
                        <span className="text-xs uppercase tracking-[0.08em] text-neon-400 border border-neon-500/30 px-2 py-0.5 rounded-full">
                          {CATEGORY_LABELS[gallery.category] ?? gallery.category}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {images.slice(0, 8).map((img) => {
                        const media = img.image as Media
                        if (!media.url) return null
                        return (
                          <div
                            key={img.id ?? media.id}
                            className="aspect-square overflow-hidden rounded-lg bg-ink-soft"
                          >
                            <Image
                              src={media.url}
                              alt={img.caption ?? media.alt}
                              width={media.width ?? 400}
                              height={media.height ?? 400}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )
                      })}
                    </div>

                    {images.length > 8 && (
                      <p className="mt-3 text-sm text-bone-dim">
                        +{images.length - 8} imagini în această galerie
                      </p>
                    )}
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
