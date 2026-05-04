# Hero Rotativ Personalizat — Specificație Implementare

> **NEW în Faza 3** — feedback explicit de la Lawre. Înlocuiește hero-ul static din Faza 2.
> **Goal:** vizitatorul citește un text care pare scris special pentru EVENIMENTUL LUI, nu un tagline generic.

## Conceptul

În Faza 2, hero-ul are:

```
Sunet care
schimbă seara.
```

În Faza 3, partea a doua a frazei se schimbă rotativ:

```
Sunet care schimbă
[varianta 1: botezul copilului vostru]
[varianta 2: nunta voastră]
[varianta 3: majoratul ei]
[varianta 4: petrecerea voastră]
```

Tranziția e fluidă (fade + slide ușor în sus). Pauză de citire: 2.8 secunde per variantă.

**Ordine:** **Botezul PRIMUL** (Lawre se așteaptă să fie principalul driver de conversii inițial). Apoi nunta, majoratul, petrecerea privată.

## Variantele exacte

```typescript
const defaultVariants = [
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
```

**Note text:**
- Forma "majoratul ei" e mai naturală decât "majoratul fiicei voastre". Lawre poate edita din admin la "majoratul lui" pentru fiu.
- "botezul copilului vostru" — direct, cald, conform feedback-ului explicit
- "nunta voastră" — rezonant cu "nunta de vis" pe care a apreciat-o, dar mai personal

## Implementare tehnică

### Component nou: `src/components/marketing/HeroRotating.tsx`

**Tip:** Client Component (`"use client"`)

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroVariant {
  short: string
  eyebrow: string
  cta: string
  hashUrl: string
}

interface HeroRotatingProps {
  variants: HeroVariant[]
  staticTitle?: string
  intervalMs?: number
}

export function HeroRotating({
  variants,
  staticTitle = 'Sunet care schimbă',
  intervalMs = 2800,
}: HeroRotatingProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % variants.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs, isPaused, variants.length])

  if (!variants || variants.length === 0) return null
  const current = variants[index]

  return (
    <section
      className="hero-rotating relative py-24 md:py-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div
          key={`eyebrow-${index}`}
          className="hero-eyebrow-anim inline-block bg-neon-500/10 text-neon-300 text-[11px] uppercase tracking-[0.12em] font-medium px-3 py-1.5 rounded-full mb-6"
        >
          {current.eyebrow}
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight max-w-[820px]">
          <span className="block text-bone">{staticTitle}</span>
          <span className="block relative h-[1.1em] overflow-hidden">
            <span
              key={`variant-${index}`}
              className="hero-variant-anim block text-neon-500"
              aria-live="polite"
            >
              {current.short}.
            </span>
          </span>
        </h1>

        <p className="text-bone-muted text-lg max-w-[520px] leading-relaxed mt-6 mb-9">
          Lawre aduce echipamentul, energia și mixul care fac diferența — indiferent de tipul evenimentului tău.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={current.hashUrl}
            className="inline-flex items-center gap-2 bg-neon-500 hover:bg-neon-400 text-ink px-6 py-3.5 rounded-md font-medium text-sm transition-colors"
          >
            {current.cta} →
          </Link>
          <Link
            href="/mixuri"
            className="inline-flex items-center gap-2 border-[0.5px] border-hairline2 text-bone hover:border-bone/40 px-6 py-3.5 rounded-md text-sm transition-colors"
          >
            ▶ Ascultă mixurile
          </Link>
        </div>
      </div>

      {/* Waveform decorativ static (rămâne ca în Faza 2) */}
      <div className="absolute right-12 top-24 hidden lg:flex gap-1 items-end h-[280px] pointer-events-none">
        {[35, 65, 45, 85, 38, 75, 55, 95, 42, 70, 28, 80, 58, 40, 90].map((h, i) => (
          <span
            key={i}
            className="block w-[5px] bg-neon-500 rounded-sm"
            style={{
              height: `${h}%`,
              opacity: 0.6 + (i % 3) * 0.15,
              animation: `pulse 2s ease-in-out ${i * 0.07}s infinite`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
```

### CSS pentru animații

În `src/app/(frontend)/styles.css` (sau în globals.css):

```css
@layer components {
  .hero-eyebrow-anim {
    animation: heroFadeIn 0.6s ease-out;
  }
  
  .hero-variant-anim {
    animation: heroSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  @keyframes heroFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes heroSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .hero-eyebrow-anim,
    .hero-variant-anim {
      animation: none;
    }
  }
}
```

### Folosire în homepage

În `src/app/(frontend)/page.tsx`:

```tsx
import { HeroRotating } from '@/components/marketing/HeroRotating'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Homepage() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  
  const variants = settings?.heroRotating?.variants ?? []
  
  return (
    <>
      <HeroRotating 
        variants={variants}
        staticTitle={settings?.heroRotating?.staticTitle ?? 'Sunet care schimbă'}
        intervalMs={settings?.heroRotating?.intervalMs ?? 2800}
      />
      {/* restul homepage-ului */}
    </>
  )
}
```

### Schema Payload pentru editare din admin

În `src/globals/SiteSettings.ts`, adaugă:

```typescript
{
  name: 'heroRotating',
  type: 'group',
  label: 'Hero Rotativ',
  fields: [
    { 
      name: 'staticTitle', 
      type: 'text', 
      defaultValue: 'Sunet care schimbă',
      admin: { description: 'Partea fixă a textului hero (ex: "Sunet care schimbă")' },
    },
    { 
      name: 'intervalMs', 
      type: 'number', 
      defaultValue: 2800, 
      min: 1500, 
      max: 6000,
      admin: { description: 'Cât stă fiecare variantă pe ecran (în milisecunde). Recomandat: 2800.' },
    },
    {
      name: 'variants',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      label: 'Variante text',
      fields: [
        { 
          name: 'short', 
          type: 'text', 
          required: true, 
          label: 'Text dinamic',
          admin: { description: 'Ex: "nunta voastră", "botezul copilului vostru"' },
        },
        { 
          name: 'eyebrow', 
          type: 'text', 
          required: true, 
          label: 'Eyebrow chip text',
          admin: { description: 'Ex: "DJ • Nunți • București"' },
        },
        { 
          name: 'cta', 
          type: 'text', 
          required: true, 
          label: 'Buton principal text',
          admin: { description: 'Ex: "Cere ofertă pentru nuntă"' },
        },
        { 
          name: 'hashUrl', 
          type: 'text', 
          required: true, 
          label: 'URL destinație',
          admin: { description: 'Ex: "/cerere-oferta?service=nunta"' },
        },
      ],
    },
  ],
},
```

### Seed default

În `scripts/seed-site-settings.ts` (creează dacă nu există):

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

async function seedSiteSettings() {
  const payload = await getPayload({ config })
  
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
  
  console.log('✓ Site settings seeded with rotating hero variants')
  process.exit(0)
}

seedSiteSettings().catch(console.error)
```

## Considerații importante

### 1. Accessibility

- `aria-live="polite"` — screen readerele anunță schimbarea fără întrerupere
- Pause pe `onMouseEnter` și `onFocus` — utilizatorul care vrea să citească nu pierde textul
- `prefers-reduced-motion` — freeze pe prima variantă pentru utilizatori sensibili la animații
- Toate CTA-urile rămân tab-able și utilizabile cu tastatura

### 2. Mobile

Pe mobile (< 768px), poate fi prea mult mișcare. **Opțiuni:**

**Opțiunea A** (recomandată): rotește la fel, dar interval mai lung (4000ms) — citire mai relaxată  
**Opțiunea B:** dezactivează rotația pe mobile, afișează doar prima variantă  
**Opțiunea C:** păstrează identic 2800ms

Recomandare: **Opțiunea A**. Ajustează în component:

```typescript
const effectiveInterval = typeof window !== 'undefined' && window.innerWidth < 768 
  ? Math.max(intervalMs, 4000) 
  : intervalMs
```

### 3. SEO considerations

**Important:** crawler-ele văd doar **prima variantă** (la SSR). Pentru SEO, ordinea contează. Botezul primul e bună pentru Lawre fiindcă se așteaptă să fie principalul driver, DAR asigură-te că restul homepage-ului are H2-uri și conținut clar pentru toate keywords (botez, nuntă, majorat).

### 4. Performance

- Bundle impact: ~1KB (foarte mic)
- Zero imagini animate — totul CSS
- Performance impact: ~0
- CLS: 0 (înălțimea hero-ului fix prin `h-[1.1em] overflow-hidden`)

## Verificare la final

- [ ] Hero rotește la 2.8 secunde fluid (4s pe mobile dacă alegi Opțiunea A)
- [ ] Pause pe hover/focus funcționează
- [ ] CTA primary se schimbă cu varianta și are URL corect
- [ ] Eyebrow se schimbă cu varianta
- [ ] Lawre poate edita variantele din /admin → SiteSettings → Hero Rotativ
- [ ] `prefers-reduced-motion` respectat
- [ ] Lighthouse Performance nu scade sub 90
- [ ] CLS = 0 (no layout shift)
- [ ] Funcționează pe iOS Safari, Android Chrome, Desktop Chrome/Firefox/Safari
- [ ] Screen reader-ele anunță tranziția corect

## Commit

```
feat(hero): rotating personalized hero with reader-direct messaging

- Hero rotates between 4 event types: botez, nunta, majorat, petrecere
- Uses possessive pronouns ("voastră", "vostru") for direct address
- Editable from /admin → Site Settings → Hero Rotativ
- Respects prefers-reduced-motion + has pause on hover/focus
- Mobile: 4s interval (vs 2.8s desktop) for relaxed reading
```
