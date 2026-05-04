/**
 * Seed: actualizează displayOrder, cardTag și featured pe serviciile existente.
 * Idempotent: poate fi rulat de mai multe ori.
 *
 * Run with: pnpm seed:services-order
 */
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const SERVICE_ORDER = [
  { slug: 'dj-nunta-bucuresti', displayOrder: 1, cardTag: 'most-popular', featured: true },
  { slug: 'dj-botez-bucuresti', displayOrder: 2, cardTag: 'specialty', featured: true },
  { slug: 'dj-majorat-bucuresti', displayOrder: 3, cardTag: 'none', featured: false },
  { slug: 'dj-cununie-civila', displayOrder: 4, cardTag: 'none', featured: false },
  { slug: 'dj-petrecere-privata', displayOrder: 5, cardTag: 'none', featured: false },
  { slug: 'dj-corporate-bucuresti', displayOrder: 6, cardTag: 'none', featured: false },
  { slug: 'dj-club-rezidenta', displayOrder: 7, cardTag: 'none', featured: false },
  { slug: 'sonorizare-evenimente', displayOrder: 8, cardTag: 'none', featured: false },
] as const

async function main() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: await configPromise })
  console.log('[seed:services-order] connected')

  for (const svc of SERVICE_ORDER) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: svc.slug } },
      limit: 1,
      depth: 0,
    })
    if (!docs[0]) {
      console.log(`[seed:services-order] skip (not found): ${svc.slug}`)
      continue
    }
    await payload.update({
      collection: 'services',
      id: docs[0].id,
      data: {
        displayOrder: svc.displayOrder,
        cardTag: svc.cardTag,
        featured: svc.featured,
      },
    })
    console.log(
      `[seed:services-order] updated ${svc.slug} → order=${svc.displayOrder} tag=${svc.cardTag} featured=${svc.featured}`,
    )
  }

  console.log('[seed:services-order] ✓ done')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed:services-order] failed', err)
  process.exit(1)
})
