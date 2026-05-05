import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { PostCard } from '@/components/marketing/PostCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Blog — ${SITE_NAME}`,
  description:
    'Ghiduri pentru miri, playlist-uri, sfaturi DJ și totul ce trebuie să știi înainte de a rezerva un DJ pentru nuntă, botez sau eveniment corporate în București.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description: 'Ghiduri, playlist-uri și sfaturi de la un DJ profesionist din București.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  'dj-nunta': 'DJ Nuntă',
  'dj-corporate': 'DJ Corporate',
  'dj-club': 'DJ Club / Lifestyle',
  'dj-botez-majorat': 'Botez & Majorat',
  'evergreen': 'Evergreen',
}

export default async function BlogPage() {
  let posts: Array<{
    id: number
    title: string
    slug: string
    excerpt?: string | null
    publishedAt?: string | null
    category?: string | null
    cover?: Media | number | null
  }> = []

  try {
    const payload = await getPayload({ config: await config })
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      depth: 1,
      limit: 50,
    })
    posts = result.docs
  } catch (err) {
    console.error('[blog] fetch failed', err)
  }

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-12">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Blog
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-2xl">
            Ghiduri, playlist-uri și sfaturi de la un DJ activ
          </h1>
          <p className="mt-4 text-base text-bone-muted max-w-xl leading-relaxed">
            Tot ce trebuie să știi înainte de a rezerva un DJ pentru nunta, botezul sau evenimentul tău din București.
          </p>
        </Container>
      </Section>

      {/* Posts grid */}
      <Section divider dividerDelay={0.4} className="py-16">
        <Container>
          {posts.length === 0 ? (
            <p className="text-bone-muted text-center py-16">
              Articolele vor apărea în curând. Revino în câteva zile.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const coverMedia =
                  typeof post.cover === 'object' && post.cover !== null
                    ? post.cover
                    : null

                return (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt ?? undefined}
                    href={`/blog/${post.slug}`}
                    publishedAt={post.publishedAt ?? undefined}
                    cover={
                      coverMedia?.url
                        ? { url: coverMedia.url, alt: coverMedia.alt ?? post.title }
                        : undefined
                    }
                  />
                )
              })}
            </div>
          )}

          {/* Category legend */}
          {posts.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {Object.entries(CATEGORY_LABELS).map(([, label]) => (
                <span
                  key={label}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs text-bone-muted border border-hairline"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
