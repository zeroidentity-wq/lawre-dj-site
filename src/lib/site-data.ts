import 'server-only'

import { getPayload } from 'payload'

import config from '@/payload.config'
import type {
  Gallery,
  Package,
  Post,
  Service,
  SiteSetting,
  Testimonial,
} from '@/payload-types'

async function payload() {
  return getPayload({ config: await config })
}

export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const p = await payload()
    return await p.findGlobal({ slug: 'site-settings' })
  } catch (err) {
    console.error('[site-data] getSiteSettings failed', err)
    return null
  }
}

export async function getServices(limit = 8): Promise<Service[]> {
  try {
    const p = await payload()
    const { docs } = await p.find({ collection: 'services', limit, sort: 'displayOrder', depth: 1 })
    return docs
  } catch (err) {
    console.error('[site-data] getServices failed', err)
    return []
  }
}

export async function getPackages(limit = 3): Promise<Package[]> {
  try {
    const p = await payload()
    const { docs } = await p.find({ collection: 'packages', limit, sort: 'price', depth: 0 })
    return docs
  } catch (err) {
    console.error('[site-data] getPackages failed', err)
    return []
  }
}

export async function getRecentPosts(limit = 3): Promise<Post[]> {
  try {
    const p = await payload()
    const { docs } = await p.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit,
      depth: 1,
    })
    return docs
  } catch (err) {
    console.error('[site-data] getRecentPosts failed', err)
    return []
  }
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  try {
    const p = await payload()
    const { docs } = await p.find({
      collection: 'testimonials',
      where: { consentGiven: { equals: true } },
      sort: '-date',
      limit,
      depth: 1,
    })
    return docs
  } catch (err) {
    console.error('[site-data] getFeaturedTestimonials failed', err)
    return []
  }
}

export async function getRecentGalleries(limit = 4): Promise<Gallery[]> {
  try {
    const p = await payload()
    const { docs } = await p.find({
      collection: 'galleries',
      limit,
      sort: '-updatedAt',
      depth: 1,
    })
    return docs
  } catch (err) {
    console.error('[site-data] getRecentGalleries failed', err)
    return []
  }
}
