import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Mixuri DJ — ${SITE_NAME}`,
  description:
    'Ascultă mixurile lui Lawre DJ — set-uri live de club, playlist-uri nuntă și session-uri pe SoundCloud, Mixcloud și YouTube.',
  alternates: { canonical: `${SITE_URL}/mixuri` },
  openGraph: {
    title: `Mixuri DJ — ${SITE_NAME}`,
    description: 'Set-uri live, playlist-uri și session-uri DJ de ascultat.',
    url: `${SITE_URL}/mixuri`,
    type: 'music.playlist',
  },
}

const PLATFORM_LABEL: Record<string, string> = {
  soundcloud: 'SoundCloud',
  mixcloud: 'Mixcloud',
  youtube: 'YouTube',
}

function MixEmbed({ embedUrl, title, platform }: { embedUrl: string; title: string; platform: string }) {
  const isYoutube = platform === 'youtube'
  return (
    <div className="overflow-hidden rounded-lg bg-ink-soft border border-hairline">
      <div className={isYoutube ? 'aspect-video' : 'h-[166px]'}>
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          allow="autoplay"
          loading="lazy"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  )
}

export default async function MixuriPage() {
  const payload = await getPayload({ config })
  const { docs: mixes } = await payload.find({
    collection: 'mixes',
    depth: 0,
    limit: 50,
    sort: '-updatedAt',
  })

  const byPlatform = mixes.reduce<Record<string, typeof mixes>>((acc, mix) => {
    const key = mix.platform
    if (!acc[key]) acc[key] = []
    acc[key].push(mix)
    return acc
  }, {})

  const platformOrder = ['soundcloud', 'mixcloud', 'youtube']

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12 border-b border-hairline">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Mixuri
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Ascultă înainte să decizi
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Set-uri live, session-uri și playlist-uri de referință. Cel mai bun mod să simți stilul înainte de a lua legătura.
          </p>
        </Container>
      </Section>

      {/* Mixes */}
      <Section className="py-16">
        <Container>
          {mixes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bone-muted mb-2">Mixurile se adaugă în curând.</p>
              <p className="text-sm text-bone-dim">
                Găsești set-uri pe{' '}
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-300 hover:text-neon-200 transition-colors"
                >
                  Instagram
                </a>{' '}
                între timp.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {platformOrder
                .filter((p) => byPlatform[p]?.length)
                .map((platform) => (
                  <div key={platform}>
                    <h2 className="font-display text-xl font-medium text-bone mb-6 flex items-center gap-3">
                      {PLATFORM_LABEL[platform] ?? platform}
                      <span className="text-xs text-bone-dim font-normal">
                        {byPlatform[platform].length} set{byPlatform[platform].length !== 1 ? '-uri' : ''}
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {byPlatform[platform].map((mix) => (
                        <div key={mix.id}>
                          <MixEmbed
                            embedUrl={mix.embedUrl}
                            title={mix.title}
                            platform={mix.platform}
                          />
                          <div className="mt-3">
                            <p className="text-sm font-medium text-bone">{mix.title}</p>
                            {mix.description && (
                              <p className="mt-1 text-xs text-bone-muted">{mix.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
