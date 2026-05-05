import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Breadcrumbs } from '@/components/marketing/Breadcrumbs'
import { JsonLd } from '@/components/marketing/JsonLd'
import { PostCard } from '@/components/marketing/PostCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/constants'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'
import { formatDate } from '@/lib/utils'
import config from '@/payload.config'
import type { Media, Post } from '@/payload-types'

export const revalidate = 3600

type Params = { slug: string }

const CATEGORY_LABELS: Record<string, string> = {
  'dj-nunta': 'DJ Nuntă',
  'dj-corporate': 'DJ Corporate',
  'dj-club': 'DJ Club / Lifestyle',
  'dj-botez-majorat': 'Botez & Majorat',
  'evergreen': 'Evergreen',
}

function estimateReadTime(content: unknown): number {
  const words = JSON.stringify(content ?? '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      depth: 2,
      limit: 1,
    })
    return docs[0] ?? null
  } catch (err) {
    console.error('[blog/[slug]] fetchPost failed', err)
    return null
  }
}

async function fetchRelated(category: string | null | undefined, excludeSlug: string) {
  if (!category) return []
  try {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
        category: { equals: category },
        slug: { not_equals: excludeSlug },
      },
      sort: '-publishedAt',
      depth: 1,
      limit: 3,
    })
    return docs
  } catch {
    return []
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 200,
      depth: 0,
    })
    return docs.map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) return { title: 'Articol negăsit' }

  const title = post.seo?.metaTitle ?? `${post.title} — ${SITE_NAME}`
  const description = post.seo?.metaDescription ?? post.excerpt ?? `${post.title} — articol pe blog Lawre DJ.`
  const canonical = post.seo?.canonicalUrl ?? `${SITE_URL}/blog/${post.slug}`
  const coverMedia = typeof post.cover === 'object' && post.cover ? (post.cover as Media) : null
  const ogImage = coverMedia?.url ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical },
    robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) notFound()

  const related = await fetchRelated(post.category, slug)
  const readTime = estimateReadTime(post.content)
  const categoryLabel = post.category ? (CATEGORY_LABELS[post.category] ?? post.category) : null

  const breadcrumbs = [
    { label: 'Acasă', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ]

  const articleSchema = buildArticleSchema({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: 'Acasă', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ])

  return (
    <>
      {/* Article header */}
      <Section className="pt-20 pb-10">
        <Container size="narrow">
          <Breadcrumbs items={breadcrumbs} />

          {categoryLabel && (
            <p className="mt-6 text-xs uppercase tracking-[0.12em] text-neon-400 font-medium">
              {categoryLabel}
            </p>
          )}

          <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-bone leading-[1.1]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-lg text-bone-muted leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4 text-sm text-bone-dim">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}
            <span aria-hidden>·</span>
            <span>{readTime} min citire</span>
            <span aria-hidden>·</span>
            <span>Lawre DJ</span>
          </div>
        </Container>
      </Section>

      {/* Article content */}
      <Section divider dividerDelay={0.4} className="py-14">
        <Container size="narrow">
          {post.content ? (
            <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-bone prose-p:text-bone-muted prose-p:leading-relaxed prose-li:text-bone-muted prose-strong:text-bone prose-a:text-neon-400 hover:prose-a:text-neon-300 prose-a:no-underline hover:prose-a:underline prose-hr:border-hairline">
              <RichText data={post.content} />
            </div>
          ) : (
            <p className="text-bone-muted">Conținut în curând.</p>
          )}
        </Container>
      </Section>

      {/* Related articles */}
      {related.length > 0 && (
        <Section divider dividerDelay={1.5} className="py-14">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-bone mb-8">
              Articole similare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relCover =
                  typeof rel.cover === 'object' && rel.cover !== null
                    ? (rel.cover as Media)
                    : null
                return (
                  <PostCard
                    key={rel.id}
                    title={rel.title}
                    excerpt={rel.excerpt ?? undefined}
                    href={`/blog/${rel.slug}`}
                    publishedAt={rel.publishedAt ?? undefined}
                    cover={
                      relCover?.url
                        ? { url: relCover.url, alt: relCover.alt ?? rel.title }
                        : undefined
                    }
                  />
                )
              })}
            </div>
          </Container>
        </Section>
      )}

      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}
