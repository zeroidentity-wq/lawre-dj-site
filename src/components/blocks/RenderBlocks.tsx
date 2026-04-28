import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

import { CTABlock } from '@/components/marketing/CTABlock'
import { FAQAccordion } from '@/components/marketing/FAQAccordion'
import { FeatureGrid } from '@/components/marketing/FeatureGrid'
import { PackageCard } from '@/components/marketing/PackageCard'
import { ProcessSteps } from '@/components/marketing/ProcessSteps'
import { ServiceCard } from '@/components/marketing/ServiceCard'
import { TestimonialCard } from '@/components/marketing/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { getFeaturedTestimonials, getPackages, getServices } from '@/lib/site-data'
import type {
  Gallery,
  Media,
  Package,
  Service,
  Testimonial,
} from '@/payload-types'

type LayoutBlocks = NonNullable<Service['layout']>
type AnyBlock = LayoutBlocks[number]

function mediaUrl(value: number | Media | null | undefined): { url: string; alt: string } | null {
  if (!value || typeof value === 'number') return null
  if (!value.url) return null
  return { url: value.url, alt: value.alt ?? '' }
}

async function RenderPackages(block: Extract<AnyBlock, { blockType: 'packages' }>) {
  const refs = (block.packages ?? []).filter(
    (p): p is Package => typeof p === 'object' && p !== null,
  )
  const packages = refs.length > 0 ? refs : await getPackages(3)
  if (packages.length === 0) return null

  return (
    <Section className="border-t border-hairline">
      {(block.eyebrow || block.heading || block.subtitle) && (
        <header className="max-w-2xl">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && (
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
              {block.heading}
            </h2>
          )}
          {block.subtitle && (
            <p className="mt-5 text-bone-muted text-base md:text-lg leading-relaxed">
              {block.subtitle}
            </p>
          )}
        </header>
      )}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((p, i) => (
          <PackageCard
            key={p.id}
            name={p.name}
            price={p.price ?? 0}
            currency={p.currency ?? 'EUR'}
            forWho={p.tagline ?? ''}
            features={(p.features ?? []).map((f) => f.feature)}
            href={`/pachete/${p.slug}`}
            featured={i === 1}
          />
        ))}
      </div>
    </Section>
  )
}

async function RenderTestimonials(block: Extract<AnyBlock, { blockType: 'testimonials' }>) {
  const items = await getFeaturedTestimonials(block.max ?? 3)
  const filtered =
    block.eventType && block.eventType !== 'all'
      ? items.filter((t) =>
          (t.eventType ?? '').toLowerCase().includes(block.eventType ?? ''),
        )
      : items
  if (filtered.length === 0) return null

  return (
    <Section className="border-t border-hairline">
      {(block.eyebrow || block.heading) && (
        <header className="max-w-2xl mb-12">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && (
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
              {block.heading}
            </h2>
          )}
        </header>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((t: Testimonial) => {
          const photo = mediaUrl(t.photo ?? null)
          return (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              clientName={t.clientName}
              eventType={t.eventType ?? undefined}
              rating={t.rating ?? 5}
              photo={photo ?? undefined}
            />
          )
        })}
      </div>
    </Section>
  )
}

function RenderGalleryStrip(block: Extract<AnyBlock, { blockType: 'galleryStrip' }>) {
  const gallery = typeof block.gallery === 'object' ? (block.gallery as Gallery) : null
  if (!gallery) return null
  const images = (gallery.images ?? []).slice(0, 8)
  if (images.length === 0) return null

  return (
    <Section className="border-t border-hairline">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && (
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
              {block.heading}
            </h2>
          )}
        </div>
        <Link
          href={`/galerie/${gallery.slug}`}
          className="inline-flex items-center gap-1 text-neon-300 hover:text-neon-200 transition-colors"
        >
          Vezi toată galeria
          <span aria-hidden>→</span>
        </Link>
      </header>
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((entry, idx) => {
          const m = mediaUrl(entry.image ?? null)
          if (!m) return null
          return (
            <div
              key={idx}
              className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ink-soft border border-hairline"
            >
              <Image
                src={m.url}
                alt={m.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          )
        })}
      </div>
    </Section>
  )
}

async function RenderServicesGrid(block: Extract<AnyBlock, { blockType: 'servicesGrid' }>) {
  const refs = (block.services ?? []).filter(
    (s): s is Service => typeof s === 'object' && s !== null,
  )
  const services = refs.length > 0 ? refs : await getServices(6)
  if (services.length === 0) return null

  return (
    <Section className="border-t border-hairline">
      {(block.eyebrow || block.heading || block.subtitle) && (
        <header className="max-w-2xl">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && (
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
              {block.heading}
            </h2>
          )}
          {block.subtitle && (
            <p className="mt-5 text-bone-muted text-base md:text-lg leading-relaxed">
              {block.subtitle}
            </p>
          )}
        </header>
      )}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard
            key={s.id}
            title={s.title}
            subtitle={s.eyebrow ?? undefined}
            description={s.shortDescription ?? undefined}
            href={`/servicii/${s.slug}`}
            featured={i === 0}
          />
        ))}
      </div>
    </Section>
  )
}

function RenderRichText(block: Extract<AnyBlock, { blockType: 'richText' }>) {
  return (
    <Section className="border-t border-hairline">
      <Container className="max-w-3xl">
        <div className="prose prose-invert prose-neon max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-3xl prose-h2:md:text-4xl prose-h3:text-xl prose-p:text-bone-muted prose-p:leading-relaxed prose-li:text-bone-muted prose-strong:text-bone prose-a:text-neon-300 hover:prose-a:text-neon-200">
          <RichText data={block.content} />
        </div>
      </Container>
    </Section>
  )
}

function RenderHero(block: Extract<AnyBlock, { blockType: 'hero' }>) {
  return (
    <Section className="border-t border-hairline">
      <div className="max-w-3xl">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h2 className="mt-6 font-display font-medium tracking-[-0.02em] leading-[1.1] text-4xl md:text-5xl">
          {block.heading}
        </h2>
        {block.subtitle && (
          <p className="mt-6 text-bone-muted text-base md:text-lg leading-relaxed">
            {block.subtitle}
          </p>
        )}
      </div>
    </Section>
  )
}

export async function RenderBlocks({ blocks }: { blocks: LayoutBlocks | null | undefined }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {await Promise.all(
        blocks.map(async (block, idx) => {
          const key = block.id ?? `${block.blockType}-${idx}`
          switch (block.blockType) {
            case 'hero':
              return <RenderHero key={key} {...block} />
            case 'richText':
              return <RenderRichText key={key} {...block} />
            case 'featureGrid':
              return (
                <FeatureGrid
                  key={key}
                  eyebrow={block.eyebrow ?? undefined}
                  heading={block.heading ?? undefined}
                  subtitle={block.subtitle ?? undefined}
                  columns={(block.columns as '2' | '3' | '4') ?? '2'}
                  items={(block.items ?? []).map((it) => ({ title: it.title, body: it.body }))}
                />
              )
            case 'processSteps':
              return (
                <ProcessSteps
                  key={key}
                  eyebrow={block.eyebrow ?? undefined}
                  heading={block.heading ?? undefined}
                  steps={(block.steps ?? []).map((s) => ({ label: s.label, body: s.body }))}
                />
              )
            case 'faq':
              return (
                <FAQAccordion
                  key={key}
                  eyebrow={block.eyebrow ?? undefined}
                  heading={block.heading ?? undefined}
                  items={(block.items ?? []).map((it) => ({
                    question: it.question,
                    answer: it.answer,
                  }))}
                />
              )
            case 'cta':
              return (
                <CTABlock
                  key={key}
                  heading={block.heading}
                  body={block.body ?? undefined}
                  primaryLabel={block.primaryLabel ?? 'Cere ofertă'}
                  primaryHref={block.primaryHref ?? '/cerere-oferta'}
                  secondaryLabel={block.secondaryLabel ?? undefined}
                  secondaryHref={block.secondaryHref ?? undefined}
                />
              )
            case 'packages':
              return <RenderPackages key={key} {...block} />
            case 'testimonials':
              return <RenderTestimonials key={key} {...block} />
            case 'galleryStrip':
              return <RenderGalleryStrip key={key} {...block} />
            case 'servicesGrid':
              return <RenderServicesGrid key={key} {...block} />
            default:
              return null
          }
        }),
      )}
    </>
  )
}
