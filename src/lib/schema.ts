import type { Package, Service } from '@/payload-types'
import { CONTACT, SITE_NAME, SITE_URL } from './constants'

type FaqBlock = {
  blockType: 'faq'
  items?: Array<{ question: string; answer: string }> | null
}

type AnyBlock = NonNullable<Service['layout']>[number]

export type BreadcrumbItem = { label: string; href?: string }

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: idx + 1,
        name: it.label,
      }
      if (it.href) entry.item = it.href.startsWith('http') ? it.href : `${SITE_URL}${it.href}`
      return entry
    }),
  }
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }
}

export function findFaqBlock(layout: Service['layout']): FaqBlock | null {
  if (!layout) return null
  const block = layout.find((b): b is FaqBlock & AnyBlock => b.blockType === 'faq')
  return block ?? null
}

export function buildServiceSchema(service: Service): object {
  if (service.schema) {
    try {
      return JSON.parse(service.schema)
    } catch {
      // fall through to generated schema
    }
  }

  const url = `${SITE_URL}/servicii/${service.slug}`
  const description =
    service.seo?.metaDescription ??
    service.shortDescription ??
    `${service.title} — ${SITE_NAME}.`

  const packages = (service.relatedPackages ?? []).filter(
    (p): p is Package => typeof p === 'object' && p !== null,
  )

  const prices = packages
    .map((p) => p.price)
    .filter((n): n is number => typeof n === 'number' && n > 0)

  const offers =
    prices.length > 0
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: packages[0]?.currency ?? 'EUR',
          lowPrice: String(Math.min(...prices)),
          highPrice: String(Math.max(...prices)),
          offerCount: prices.length,
        }
      : service.startingPrice
        ? {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: String(service.startingPrice),
          }
        : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    url,
    description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT.email,
    },
    areaServed: [
      { '@type': 'City', name: 'București' },
      { '@type': 'AdministrativeArea', name: 'Ilfov' },
    ],
    ...(offers ? { offers } : {}),
  }
}
