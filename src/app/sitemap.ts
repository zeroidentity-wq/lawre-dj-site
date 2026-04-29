import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { SITE_URL } from '@/lib/constants'
import { ZONES } from '@/lib/zone-deservite'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const [servicesRes, postsRes, packagesRes] = await Promise.all([
    payload.find({ collection: 'services', depth: 0, limit: 50 }),
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      depth: 0,
      limit: 200,
    }),
    payload.find({ collection: 'packages', depth: 0, limit: 20 }),
  ])

  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/servicii/dj-nunta-bucuresti`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/pachete`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/galerie`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/mixuri`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/despre`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/echipament`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/cerere-oferta`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/testimoniale`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/club-dates`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ]

  const zonePages: MetadataRoute.Sitemap = ZONES.map((z) => ({
    url: `${SITE_URL}/zone-deservite/${z.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const servicePages: MetadataRoute.Sitemap = servicesRes.docs
    .filter((s) => s.slug !== 'dj-nunta-bucuresti')
    .map((s) => ({
      url: `${SITE_URL}/servicii/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const postPages: MetadataRoute.Sitemap = postsRes.docs.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const packagePages: MetadataRoute.Sitemap = packagesRes.docs.map((p) => ({
    url: `${SITE_URL}/pachete/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...postPages, ...packagePages, ...zonePages]
}
