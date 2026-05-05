import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactForm } from '@/components/forms/ContactForm'
import { CTABlock } from '@/components/marketing/CTABlock'
import { HeroRotating } from '@/components/marketing/HeroRotating'
import { JsonLd } from '@/components/marketing/JsonLd'
import { PackageCard } from '@/components/marketing/PackageCard'
import { PostCard } from '@/components/marketing/PostCard'
import { ServiceCard } from '@/components/marketing/ServiceCard'
import { StatsStrip } from '@/components/marketing/StatsStrip'
import { TestimonialCard } from '@/components/marketing/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { VinylDisc } from '@/components/ui/VinylDisc'
import { CONTACT, DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'
import {
  getFeaturedTestimonials,
  getPackages,
  getRecentGalleries,
  getRecentPosts,
  getServices,
  getSiteSettings,
} from '@/lib/site-data'
import type { Gallery, Media, Package, Post, Service, Testimonial } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Lawre DJ — DJ Nuntă, Botez, Majorat București | Pachete de la 350€',
  description:
    'DJ profesionist din București pentru nuntă, botez, majorat și petreceri private. Echipament propriu, mix personalizat, pachete transparente. Cere ofertă.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Lawre DJ — DJ Nuntă, Botez, Majorat București',
    description:
      'DJ profesionist din București pentru nuntă, botez, majorat și petreceri private. Echipament propriu, mix personalizat, pachete transparente.',
    url: SITE_URL,
  },
}

const FALLBACK_SERVICES: Array<{
  title: string
  subtitle?: string
  description: string
  href: string
  featured?: boolean
  cardTag?: string
}> = [
  {
    title: 'DJ Nuntă',
    description:
      'De la cununie civilă până la afterparty — coordonare cu fotograful, intrarea mirilor, primul dans, sârba, distracție până dimineața.',
    href: '/servicii/dj-nunta-bucuresti',
    featured: true,
    cardTag: 'most-popular',
  },
  {
    title: 'DJ Botez',
    description:
      'Atmosferă potrivită pentru toate vârstele — nași, părinți, "lapte și miere", petrecere.',
    href: '/servicii/dj-botez-bucuresti',
    featured: true,
    cardTag: 'specialty',
  },
  {
    title: 'DJ Majorat',
    description:
      'Petreceri de 18 ani memorabile — hituri internaționale și românești, atmosferă tinerească.',
    href: '/servicii/dj-majorat-bucuresti',
    featured: true,
    cardTag: 'top-rated',
  },
  {
    title: 'DJ Cununie Civilă',
    description:
      'Muzică perfectă pentru ceremonii — intrarea miresei, semnarea actelor, ieșirea cuplului.',
    href: '/servicii/dj-cununie-civila',
  },
  {
    title: 'DJ Petrecere Privată',
    description:
      'Aniversări, party-uri în vilă, evenimente intime — echipament scalabil de la 50 la 500+ invitați.',
    href: '/servicii/dj-petrecere-privata',
  },
  {
    title: 'DJ Corporate',
    description:
      'Gala, lansări de produs, teambuilding, petreceri de Crăciun — sound profesional, vibe pe publicul tău.',
    href: '/servicii/dj-corporate-bucuresti',
  },
  {
    title: 'DJ Club',
    description: 'Rezidențe și guest sets în cluburi din București. House, tech-house, deep.',
    href: '/servicii/dj-club-rezidenta',
  },
  {
    title: 'Sonorizare Evenimente',
    description: 'Sisteme audio profesionale pentru conferințe, spectacole și outdoor-uri.',
    href: '/servicii/sonorizare-evenimente',
  },
]

const FALLBACK_PACKAGES: Array<{
  name: string
  price: number
  forWho: string
  features: string[]
  featured?: boolean
  href: string
}> = [
  {
    name: 'Essential',
    price: 350,
    forWho: 'Petreceri private, botezuri mici, până în 80 invitați.',
    features: [
      '6 ore de mix live',
      '2x boxe active (până la 800W RMS)',
      '1x microfon wireless',
      'Lumini de bază (4 par-uri LED)',
      'Deplasare București + Ilfov',
    ],
    href: '/pachete/essential',
  },
  {
    name: 'Premium',
    price: 650,
    forWho: 'Nunți medii, botezuri, corporate până în 200 invitați.',
    features: [
      '8 ore de mix live (până la 02:00)',
      '2x top-uri + 2x sub-uri (2000W RMS)',
      '2x microfoane Shure wireless',
      '4x moving heads + 2x par LED + fum',
      'Coordonare cu fotograf & restaurant',
      'Backup echipament inclus',
    ],
    href: '/pachete/premium',
    featured: true,
  },
  {
    name: 'Platinum',
    price: 1100,
    forWho: 'Nunți mari, corporate până în 500+ invitați.',
    features: [
      'Mix live nelimitat (până dimineața)',
      'Sistem line array (4000W RMS)',
      '4x microfoane wireless + monitor',
      'Light show complet + lasere',
      'Tehnician sunet dedicat',
      'Backup echipament dublat',
    ],
    href: '/pachete/platinum',
  },
]

const FALLBACK_TESTIMONIALS = [
  {
    quote:
      'Lawre a citit ringul perfect. Părinții pe muzică românească, tinerii pe house — și toată lumea pe ring până la 4 dimineața.',
    clientName: 'Ana & Mihai',
    eventType: 'Nuntă · Septembrie 2025',
  },
  {
    quote:
      'Am avut un teambuilding de 120 oameni. Profesionist, punctual, cu echipament impecabil. Recomand fără rezerve.',
    clientName: 'Andreea P.',
    eventType: 'Corporate · Mai 2025',
  },
  {
    quote: 'Set deschidere la club a fost serios. Energie corectă, tranziții curate, fără rateuri.',
    clientName: 'Radu (Club Manager)',
    eventType: 'Club · 2025',
  },
]

const WHY_LAWRE = [
  {
    title: 'Echipament propriu, profesional',
    body: 'Pioneer, Shure, RCF, Chauvet — branduri care nu te lasă în pană. Și backup pentru orice scenariu.',
  },
  {
    title: 'Răspund la mesaje în max 24h',
    body: 'Nu cu „te sun mâine" și apoi tăcere. Concret, cu detalii și opțiuni.',
  },
  {
    title: 'Lucrez cu fotograful tău',
    body: 'Coordonare reală pentru momentele cheie — nu dau drumul la piesă peste anunțul lui.',
  },
  {
    title: 'Plan B pentru orice',
    body: 'Cade boxa? Am alta. Cade laptopul? Am alt laptop. Reduceri la planuri detaliate înainte.',
  },
]

function mediaUrl(value: number | Media | null | undefined): { url: string; alt: string } | null {
  if (!value || typeof value === 'number') return null
  if (!value.url) return null
  return { url: value.url, alt: value.alt ?? '' }
}

function galleryCover(g: Gallery): { url: string; alt: string } | null {
  const first = g.images?.[0]?.image
  return mediaUrl(first ?? null)
}

const DEFAULT_HERO_VARIANTS = [
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
]

export default async function HomePage() {
  const [settings, services, packages, testimonials, galleries, posts] = await Promise.all([
    getSiteSettings(),
    getServices(8),
    getPackages(3),
    getFeaturedTestimonials(3),
    getRecentGalleries(4),
    getRecentPosts(3),
  ])

  const heroVariants =
    settings?.heroRotating?.variants && settings.heroRotating.variants.length > 0
      ? (settings.heroRotating.variants as typeof DEFAULT_HERO_VARIANTS)
      : DEFAULT_HERO_VARIANTS
  const heroStaticTitle = settings?.heroRotating?.staticTitle ?? 'Sunetul care schimbă'
  const heroIntervalMs = settings?.heroRotating?.intervalMs ?? 2800

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    email: CONTACT.email,
    priceRange: '350€ - 1500€+',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'București',
      addressRegion: 'București',
      addressCountry: 'RO',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 44.4268, longitude: 26.1025 },
    areaServed: [
      { '@type': 'City', name: 'București' },
      { '@type': 'AdministrativeArea', name: 'Ilfov' },
    ],
    sameAs: [CONTACT.instagram],
  }

  return (
    <>
      <HeroRotating
        variants={heroVariants}
        staticTitle={heroStaticTitle}
        intervalMs={heroIntervalMs}
      />

      <StatsStrip />

      {/* About teaser */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow>Cine e Lawre</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
              Un DJ care simte ringul.
            </h2>
            <div className="mt-6 space-y-4 text-bone-muted text-base md:text-lg leading-relaxed">
              <p>
                Lawre nu e doar „tipul cu boxele". E DJ-ul care citește energia camerei și știe
                exact ce piesă urmează — fie că e primul dans la o nuntă, un teambuilding corporate sau
                o noapte la club.
              </p>
              <p>
                Activ pe scena privată și de club din București de peste 8 ani, Lawre vine cu
                echipament profesional propriu, prezență scenică matură și un repertoriu care merge
                de la house și deep cuts la hituri românești și internaționale, în funcție de ce
                cere publicul.
              </p>
            </div>
            <Link
              href="/despre"
              className="mt-8 inline-flex items-center gap-1 text-neon-300 hover:text-neon-200 transition-colors"
            >
              Citește povestea completă
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 order-first lg:order-last">
            <VinylDisc className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.22] pointer-events-none" />
            <div className="relative z-10 aspect-[3/4] rounded-xl overflow-hidden">
              <Image
                src="/images/lawre-dj-portrait.png"
                alt="Lawre DJ"
                fill
                sizes="(max-width: 1024px) 90vw, 340px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section divider dividerDelay={0.4}>
        <header className="max-w-2xl">
          <Eyebrow>Servicii</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            Pentru momentele care se țin minte.
          </h2>
          <p className="mt-5 text-bone-muted text-base md:text-lg leading-relaxed">
            Specializat pe evenimentele care contează pentru voi — nuntă, botez, majorat. Plus tot
            ce vine în jur.
          </p>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0
            ? services.map((s) => (
                <ServiceCard
                  key={s.id}
                  title={s.title}
                  subtitle={s.eyebrow ?? undefined}
                  description={s.shortDescription ?? undefined}
                  href={`/servicii/${s.slug}`}
                  featured={s.featured ?? false}
                  cardTag={s.cardTag ?? undefined}
                />
              ))
            : FALLBACK_SERVICES.map((s) => (
                <ServiceCard
                  key={s.href}
                  title={s.title}
                  subtitle={s.subtitle}
                  description={s.description}
                  href={s.href}
                  featured={s.featured}
                  cardTag={s.cardTag}
                />
              ))}
        </div>
      </Section>

      {/* Packages */}
      <Section divider dividerDelay={1.7}>
        <header className="max-w-2xl">
          <Eyebrow>Pachete</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            Trei opțiuni clare. Zero surprize.
          </h2>
          <p className="mt-5 text-bone-muted text-base md:text-lg leading-relaxed">
            Prețuri afișate, ce conține fiecare pachet listat în detaliu. Toate includ deplasarea
            în București + Ilfov.
          </p>
        </header>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.length > 0
            ? packages.map((p, i) => renderPackage(p, i === 1))
            : FALLBACK_PACKAGES.map((p) => (
                <PackageCard
                  key={p.href}
                  name={p.name}
                  price={p.price}
                  forWho={p.forWho}
                  features={p.features}
                  href={p.href}
                  featured={p.featured}
                />
              ))}
        </div>
      </Section>

      {/* Galerie strip — only when CMS has data */}
      {galleries.length > 0 && (
        <Section divider dividerDelay={2.9}>
          <header className="max-w-2xl flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Galerie</Eyebrow>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
                Câteva nopți recente.
              </h2>
            </div>
            <Link
              href="/galerie"
              className="inline-flex items-center gap-1 text-neon-300 hover:text-neon-200 transition-colors"
            >
              Vezi toată galeria
              <span aria-hidden>→</span>
            </Link>
          </header>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleries.map((g) => {
              const cover = galleryCover(g)
              if (!cover) return null
              return (
                <Link
                  key={g.id}
                  href={`/galerie/${g.slug}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ink-soft border border-hairline group"
                >
                  <Image
                    src={cover.url}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
              )
            })}
          </div>
        </Section>
      )}

      {/* Why Lawre */}
      <Section divider dividerDelay={3.6}>
        <header className="max-w-2xl">
          <Eyebrow>De ce Lawre</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            Patru lucruri pe care le primești și nu le promit toți.
          </h2>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {WHY_LAWRE.map((item) => (
            <div
              key={item.title}
              className="bg-ink-soft border border-hairline rounded-lg p-6 md:p-8"
            >
              <h3 className="font-display text-xl font-medium tracking-tight text-bone">
                {item.title}
              </h3>
              <p className="mt-3 text-bone-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section divider dividerDelay={0.9}>
        <header className="max-w-2xl">
          <Eyebrow>Ce spun clienții</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            800+ evenimente. Niciun client nedorit acasă.
          </h2>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.length > 0
            ? testimonials.map((t) => renderTestimonial(t))
            : FALLBACK_TESTIMONIALS.map((t) => (
                <TestimonialCard
                  key={t.clientName}
                  quote={t.quote}
                  clientName={t.clientName}
                  eventType={t.eventType}
                />
              ))}
        </div>
      </Section>

      {/* Equipment teaser */}
      <Section divider dividerDelay={2.3}>
        <div className="max-w-3xl">
          <Eyebrow>Echipament</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
            Specificații pentru cei care le citesc.
          </h2>
          <p className="mt-6 text-bone-muted text-base md:text-lg leading-relaxed">
            Pentru organizatorii corporate care vor să știe exact ce primesc: lista completă a
            echipamentului profesional pe care Lawre îl folosește — branduri, modele, putere RMS,
            totul transparent.
          </p>
          <Link
            href="/echipament"
            className="mt-8 inline-flex items-center gap-1 text-neon-300 hover:text-neon-200 transition-colors"
          >
            Vezi echipamentul complet
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>

      {/* Blog teaser — only when there are published posts */}
      {posts.length > 0 && (
        <Section divider dividerDelay={4.1}>
          <header className="max-w-2xl flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Blog</Eyebrow>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
                Sfaturi de la cineva care a văzut tot.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-neon-300 hover:text-neon-200 transition-colors"
            >
              Vezi tot blogul
              <span aria-hidden>→</span>
            </Link>
          </header>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard
                key={p.id}
                title={p.title}
                excerpt={p.excerpt ?? undefined}
                href={`/blog/${p.slug}`}
                cover={mediaUrl(p.cover) ?? undefined}
                publishedAt={p.publishedAt ?? undefined}
              />
            ))}
          </div>
        </Section>
      )}

      <CTABlock
        heading="Ai data fixă? Hai să vorbim."
        body="Spune-mi tipul evenimentului, data și locația. Îți răspund în 24h cu disponibilitate și un pachet potrivit. Răspund în max 24h, nu cu 'te sun mâine'."
        primaryLabel="Cere ofertă personalizată →"
        primaryHref="/cerere-oferta"
        secondaryLabel="Scrie pe WhatsApp"
        secondaryHref="https://wa.me/40764443356"
      />

      <Section>
        <Container className="max-w-2xl">
          <Eyebrow>Contact rapid</Eyebrow>
          <h2 className="mt-4 mb-8 font-display text-3xl md:text-4xl font-medium tracking-[-0.015em]">
            Câteva detalii și îți răspund în 24h.
          </h2>
          <ContactForm variant="compact" />
        </Container>
      </Section>

      <JsonLd data={localBusiness} />
    </>
  )
}

function renderPackage(p: Package, featured: boolean) {
  return (
    <PackageCard
      key={p.id}
      name={p.name}
      price={p.price ?? 0}
      currency={p.currency ?? 'EUR'}
      forWho={p.tagline ?? ''}
      features={(p.features ?? []).map((f) => f.feature)}
      href={`/pachete/${p.slug}`}
      featured={featured}
    />
  )
}

function renderTestimonial(t: Testimonial) {
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
}
