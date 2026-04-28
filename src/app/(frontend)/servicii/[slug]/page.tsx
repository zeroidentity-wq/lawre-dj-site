import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/marketing/JsonLd'
import { PillarHero } from '@/components/marketing/PillarHero'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/constants'
import config from '@/payload.config'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  findFaqBlock,
} from '@/lib/schema'
import type { Media, Service } from '@/payload-types'

export const revalidate = 3600

type Params = { slug: string }

async function fetchService(slug: string): Promise<Service | null> {
  try {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    return docs[0] ?? null
  } catch (err) {
    console.error('[servicii/[slug]] fetchService failed', err)
    return null
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'services',
      limit: 100,
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
  const service = await fetchService(slug)
  if (!service) return { title: 'Pagină negăsită' }

  const title = service.seo?.metaTitle ?? `${service.title} — ${SITE_NAME}`
  const description =
    service.seo?.metaDescription ??
    service.shortDescription ??
    `${service.title} cu Lawre DJ. Echipament propriu, pachete transparente.`
  const canonical =
    service.seo?.canonicalUrl ?? `${SITE_URL}/servicii/${service.slug}`
  const ogImage =
    typeof service.seo?.ogImage === 'object' && service.seo?.ogImage
      ? (service.seo.ogImage as Media).url ?? DEFAULT_OG_IMAGE
      : DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical },
    robots: service.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
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

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const service = await fetchService(slug)
  if (!service) notFound()

  const breadcrumbs = [
    { label: 'Acasă', href: '/' },
    { label: 'Servicii', href: '/servicii/dj-nunta-bucuresti' },
    { label: service.title },
  ]

  const ctaPrimary = { label: 'Cere ofertă personalizată →', href: '/cerere-oferta' }
  const ctaSecondary = { label: 'Vezi pachetele', href: '/pachete' }

  const faqBlock = findFaqBlock(service.layout)
  const serviceSchema = buildServiceSchema(service)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: 'Acasă', href: '/' },
    { label: 'Servicii', href: '/servicii/dj-nunta-bucuresti' },
    { label: service.title, href: `/servicii/${service.slug}` },
  ])
  const faqSchema =
    faqBlock?.items && faqBlock.items.length > 0 ? buildFaqSchema(faqBlock.items) : null

  return (
    <>
      <PillarHero
        eyebrow={service.eyebrow ?? undefined}
        title={service.title}
        subtitle={service.shortDescription ?? undefined}
        priceFrom={
          service.startingPrice
            ? { amount: service.startingPrice, currency: 'EUR' }
            : undefined
        }
        breadcrumbs={breadcrumbs}
        ctaPrimary={ctaPrimary}
        ctaSecondary={ctaSecondary}
      />

      <RenderBlocks blocks={service.layout} />

      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
    </>
  )
}
