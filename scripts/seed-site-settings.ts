/**
 * Seed: SiteSettings global — heroRotating default variants.
 * Idempotent: updateGlobal e safe să fie rulat de mai multe ori.
 *
 * Run with: pnpm seed:site-settings
 */
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

async function main() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: await configPromise })
  console.log('[seed:site-settings] connected')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      heroRotating: {
        staticTitle: 'Sunet care schimbă',
        intervalMs: 2800,
        variants: [
          {
            short: 'botezul copilului vostru',
            eyebrow: 'DJ • Botezuri • București',
            cta: 'Cere ofertă pentru botez',
            hashUrl: '/cerere-oferta?service=botez',
          },
          {
            short: 'nunta voastră',
            eyebrow: 'DJ • Nunți • București',
            cta: 'Cere ofertă pentru nuntă',
            hashUrl: '/cerere-oferta?service=nunta',
          },
          {
            short: 'majoratul ei',
            eyebrow: 'DJ • Majorate • București',
            cta: 'Cere ofertă pentru majorat',
            hashUrl: '/cerere-oferta?service=majorat',
          },
          {
            short: 'petrecerea voastră',
            eyebrow: 'DJ • Petreceri private • București',
            cta: 'Cere ofertă pentru petrecere',
            hashUrl: '/cerere-oferta?service=petrecere',
          },
        ],
      },
    },
  })

  console.log('[seed:site-settings] ✓ heroRotating variants seeded (4 variants)')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed:site-settings] failed', err)
  process.exit(1)
})
