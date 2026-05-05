import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { JsonLd } from '@/components/marketing/JsonLd'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { buildBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'packages', depth: 0, limit: 20 })
  return docs.map((pkg) => ({ slug: pkg.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'packages',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const pkg = docs[0]
  if (!pkg) return {}

  const title = `${pkg.name} — ${SITE_NAME}`
  const description = pkg.tagline
    ? `${pkg.tagline} · ${pkg.name} de la ${pkg.price ?? '—'}${pkg.currency === 'EUR' ? '€' : ' lei'} — Lawre DJ București.`
    : `Detalii pachet ${pkg.name} — Lawre DJ București.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/pachete/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/pachete/${slug}`, type: 'website' },
  }
}

const CURRENCY_SYMBOL: Record<string, string> = { EUR: '€', RON: 'lei', USD: '$' }

export default async function PacheteSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'packages',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const pkg = docs[0]
  if (!pkg) notFound()

  const symbol = CURRENCY_SYMBOL[pkg.currency ?? 'EUR'] ?? '€'
  const features = (pkg.features ?? []).map((f) => f.feature)

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: 'Acasă', href: '/' },
    { label: 'Pachete', href: '/pachete' },
    { label: pkg.name },
  ])

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: pkg.name,
    description: pkg.tagline ?? undefined,
    priceCurrency: pkg.currency ?? 'EUR',
    price: pkg.price ? String(pkg.price) : undefined,
    url: `${SITE_URL}/pachete/${pkg.slug}`,
    seller: {
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offerSchema} />

      {/* Hero */}
      <Section className="pt-24 pb-12">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-bone-dim">
              <li><Link href="/" className="hover:text-neon-300 transition-colors">Acasă</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/pachete" className="hover:text-neon-300 transition-colors">Pachete</Link></li>
              <li aria-hidden>/</li>
              <li className="text-bone-muted">{pkg.name}</li>
            </ol>
          </nav>

          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            Pachet
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone">
            {pkg.name}
          </h1>
          {pkg.tagline && (
            <p className="mt-3 text-base text-bone-muted max-w-xl">{pkg.tagline}</p>
          )}
          {pkg.price != null && (
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-sm uppercase tracking-[0.08em] text-bone-dim">De la</span>
              <span className="font-display text-5xl font-medium text-bone">
                {pkg.price}
                <span className="text-2xl ml-1">{symbol}</span>
              </span>
            </div>
          )}
        </Container>
      </Section>

      {/* Content */}
      <Section divider dividerDelay={0.5} className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
            {/* Left — features + description */}
            <div>
              {features.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-display text-xl font-medium text-bone mb-6">
                    Ce include pachetul
                  </h2>
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex gap-3 text-bone-muted">
                        <span className="text-neon-300 shrink-0 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.description && (
                <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-neon-400 prose-a:no-underline hover:prose-a:text-neon-300">
                  <RichText data={pkg.description} />
                </div>
              )}
            </div>

            {/* Right — CTA sidebar */}
            <aside className="space-y-6">
              {pkg.price != null && (
                <div className="border border-neon-500/30 rounded-lg p-6 bg-neon-500/5">
                  <p className="text-xs uppercase tracking-[0.08em] text-bone-dim mb-1">Preț de la</p>
                  <p className="font-display text-4xl font-medium text-bone">
                    {pkg.price}
                    <span className="text-xl ml-1">{symbol}</span>
                  </p>
                  {pkg.tagline && (
                    <p className="mt-2 text-sm text-bone-muted">{pkg.tagline}</p>
                  )}
                </div>
              )}

              <Link
                href={`/cerere-oferta?service=${slug}`}
                className="flex items-center justify-center gap-2 w-full bg-neon-500 hover:bg-neon-400 text-ink font-medium px-6 py-3.5 rounded-md text-sm transition-colors"
              >
                Cere ofertă pentru {pkg.name} →
              </Link>

              <Link
                href="/cerere-oferta"
                className="flex items-center justify-center gap-2 w-full border border-hairline hover:border-neon-500/40 text-bone-muted hover:text-bone px-6 py-3 rounded-md text-sm transition-colors"
              >
                Cere ofertă personalizată
              </Link>

              <p className="text-xs text-bone-dim text-center">
                Prețul final variază în funcție de dată, locație și cerințe. Răspund în max 24h.
              </p>

              <div className="pt-4 border-t border-hairline">
                <Link
                  href="/pachete"
                  className="text-sm text-bone-dim hover:text-neon-300 transition-colors"
                >
                  ← Toate pachetele
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
