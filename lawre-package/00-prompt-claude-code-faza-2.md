# Prompt pentru Claude Code — Faza 2: Frontend public

> **Cum folosești:** copiezi tot conținutul de mai jos (de la `---` în jos) și îl pui ca prim mesaj într-o sesiune nouă de Claude Code, în folderul proiectului. Claude Code va lucra pe el fază cu fază.

---

# Sarcină: implementarea Fazei 2 — Frontend public

## Context

Citește **CLAUDE.md** și **PROGRESS.md** pentru context complet despre proiect. Pe scurt: site Next.js + Payload CMS pentru "Lawre DJ", DJ profesionist din București. Faza 1 (setup tehnic + collections) e completă. Acum construim frontend-ul public.

**În folderul `/lawre-package` din rădăcina proiectului ai:**
- `design/01-design-system.md` — paleta de culori, typography, componente, reguli design
- `content/homepage.md` — tot textul homepage-ului, secțiune cu secțiune
- `content/dj-nunta-bucuresti.md` — pillar page completă cu FAQ și schema markup
- `blog/01-cat-costa-un-dj-la-nunta-in-bucuresti.md` — primul articol blog
- `blog/02-top-melodii-deschidere-nunta-2026.md` — al doilea articol blog
- `blog/03-10-intrebari-pentru-dj-nunta.md` — al treilea articol blog

**Workflow obligatoriu:** Explore → Plan → Implement → Commit. Folosește Plan mode (Shift+Tab) pentru fiecare fază înainte să scrii cod. Confirmă cu mine planul înainte de implementare.

**Reguli stricte:**
- TypeScript strict, zero `any`
- Toate `<img>` → `<Image>` din `next/image`
- Toate `<a>` interne → `<Link>` din `next/link`
- Tailwind utility-first, folosește tokens din design system
- Server Components by default, `"use client"` doar unde e necesar (forms, animații, state)
- Toate textele user-facing în română
- Mobile-first design, testează pe 320px-1280px

---

## Faza 2.1 — Setup Tailwind + design system + fonts

**Goal:** Tailwind instalat, configurat conform design system, fonts încărcate, layout-ul frontend pregătit.

**Pași:**

1. Instalează dependințe:
   ```bash
   pnpm add -D tailwindcss@latest postcss autoprefixer
   pnpm add tailwindcss-animate clsx tailwind-merge
   pnpm add zod
   pnpm dlx tailwindcss init -p
   ```

2. Creează `tailwind.config.ts` în root cu paleta din `lawre-package/design/01-design-system.md`. Importantă: tokens `ink`, `bone`, `neon`, `hairline`. Plus `fontFamily` cu CSS variables.

3. **CRITICAL:** Tailwind import-ul de CSS merge DOAR în `src/app/(frontend)/layout.tsx`, NU în `(payload)/layout.tsx` — ar sparge admin UI-ul Payload care are propriul CSS.

4. Înlocuiește `src/app/(frontend)/styles.css` cu Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     html { color-scheme: dark; }
     body { @apply bg-ink text-bone font-sans antialiased; }
   }
   ```

5. Refă `src/app/(frontend)/layout.tsx`:
   - Importă `Space_Grotesk` și `Inter` din `next/font/google`
   - Configurează ca CSS variables
   - Setează `lang="ro"` pe `<html>`
   - Metadata default (title template, description, OpenGraph, Twitter cards)

6. Creează `src/lib/utils.ts` cu helper `cn()` (clsx + tailwind-merge).

7. Creează `src/lib/constants.ts` cu:
   - `SITE_URL` din env
   - Site name, default OG image path
   - Lista navigation items
   - Lista footer columns
   (folosește datele din `lawre-package/content/homepage.md` secțiunea Footer)

**Verificare la final:**
- `pnpm dev` rulează fără erori
- `/` arată placeholder simplu cu fontul Space Grotesk pe titlu
- `/admin` continuă să funcționeze normal
- `pnpm exec tsc --noEmit` zero erori

**Commit:** `feat(setup): tailwind + design system + fonts configured`

---

## Faza 2.2 — Componente core reutilizabile

**Goal:** Toate componentele UI de bază pe care le vor folosi paginile.

Creează în `src/components/` următoarele:

### `ui/Button.tsx`
- Variants: `primary` (bg-neon-500), `ghost` (border), `link` (underline)
- Sizes: `sm`, `md`, `lg`
- Cu `forwardRef` pentru a putea fi folosit ca link
- Polymorphic: poate fi `<button>` sau `<Link>` via prop `as` sau detect automat din `href`

### `ui/Container.tsx`
Wrapper cu `max-w-7xl mx-auto px-6 md:px-8`. Acceptă `className` extension.

### `ui/Eyebrow.tsx`
Componenta pentru "kicker label" mic uppercase cu accent neon. Conform design system.

### `ui/Section.tsx`
Wrapper cu `py-20 md:py-32`, opțional `Container` integrat.

### `layout/Header.tsx` (Server Component cu Client island pentru menu mobile)
- Logo (text "LAWRE DJ" cu o pătrățică magenta înainte ca în mockup)
- Navigation desktop (Servicii, Pachete, Galerie, Mixuri, Blog, Contact)
- CTA "Cere ofertă" desktop
- Hamburger menu pe mobile (Client component separat: `HeaderMobileMenu.tsx`)
- Sticky cu `backdrop-blur` la scroll
- Border bottom hairline

### `layout/Footer.tsx`
- 4 coloane (Lawre DJ / Servicii / Resurse / Contact)
- Social icons (Instagram principal, alte platforme dacă există în SiteSettings)
- Bottom strip cu copyright + linkuri Termeni / Confidențialitate
- Conținut din `lawre-package/content/homepage.md` secțiunea Footer

### `marketing/Hero.tsx`
Hero homepage conform mockup-ului. Conținut din `homepage.md` Hero section. Fără waveform animat la început (simplu + curat); putem adăuga animații în Faza 3.

### `marketing/ServiceCard.tsx`
Card reutilizabil pentru cele 6 servicii. Acceptă: `title`, `subtitle`, `href`, opțional `featured: boolean` (border neon).

### `marketing/PackageCard.tsx`
Card pentru pachete. Acceptă: `name`, `price`, `currency`, `tagline`, `forWho`, `features: string[]`, `featured: boolean`, `href`.

### `marketing/TestimonialCard.tsx`
Card pentru testimoniale. Acceptă: `quote`, `clientName`, `eventType`, `rating`, optional `photo`.

### `marketing/StatsStrip.tsx`
Strip cu cele 3 stats (300+ evenimente, 8 ani, 5.0★). Animate count-up opțional (folosește `react-countup` doar dacă nu adaugă peste 5KB).

### `marketing/CTABlock.tsx`
Block reutilizabil pentru CTA-uri în corpul paginii. Acceptă: `heading`, `body`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`.

### `forms/ContactForm.tsx` (Client Component)
- Câmpuri: name, email, phone, eventType (select), eventDate, location, guestCount, budget, message
- Validare cu Zod (schema în `src/lib/schemas/contact.ts`)
- Server Action în `src/app/(frontend)/actions.ts` care creează ContactSubmission via Payload Local API
- Loading states, success state, error handling
- După submit reușit, înlocuiește forma cu mesaj "Mulțumim, îți răspund în max 24h"

**Verificare la final:**
- Toate componentele tipate strict
- Storybook NU e necesar, dar fiecare componentă să poată fi instanțiată cu props minime
- Test rapid: pune toate componentele pe `/` să vezi că arată corect

**Commit:** `feat(ui): core reusable components`

---

## Faza 2.3 — Extensie schema Payload pentru SEO

**Goal:** Pages, Posts și Services au câmpuri SEO complete și suportă blocuri flexibile.

**În `src/collections/Pages.ts` adaugă:**

```ts
{
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text', maxLength: 60 },
    { name: 'metaDescription', type: 'textarea', maxLength: 160 },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'noindex', type: 'checkbox', defaultValue: false },
    { name: 'canonicalUrl', type: 'text' },
  ],
},
```

Plus, înlocuiește `content: richText` cu `layout: blocks` care permite blocuri flexibile:
- `HeroBlock` (eyebrow, heading, subtitle, ctaPrimary, ctaSecondary)
- `RichTextBlock` (content)
- `ServicesGridBlock` (servicii din collection Services, opțional override per pagină)
- `PackagesBlock` (pachetele)
- `GalleryStripBlock` (relație cu Gallery)
- `TestimonialsBlock` (filter pe eventType opțional)
- `FAQBlock` (array de question/answer)
- `CTABlock` (heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref)

**Pentru `Posts.ts` adaugă:**
- Același `seo` group ca mai sus
- `status` field: `select` cu opțiuni `draft` / `published`, default `draft`
- `category` field: `select` cu valorile categoriilor blog
- `tags` field: `array` de text

**Pentru `Services.ts` adaugă:**
- Același `seo` group
- `eyebrow` text field (kicker label)
- `heroImage` upload field
- `relatedPackages`: relationship array către Packages
- `schema`: textarea pentru JSON-LD custom (opțional)

După modificări:
```bash
pnpm generate:types
```

**Verificare:**
- `pnpm dev` rulează, schema sync în Postgres
- `/admin` afișează noile câmpuri
- `payload-types.ts` regenerat fără erori

**Commit:** `feat(cms): seo fields + flexible blocks for pages/posts/services`

---

## Faza 2.4 — Homepage

**Goal:** Pagina `/` completă, conform `lawre-package/content/homepage.md`.

**Pași:**

1. Refă `src/app/(frontend)/page.tsx`:
   - Server Component
   - Fetch via Payload Local API: SiteSettings global, top 6 Services, top 3 Packages, latest 3 published Posts, featured Testimonials, latest 4 Galleries
   - Compune secțiunile folosind componentele din Faza 2.2
   - Conținutul TEXT vine din `homepage.md` (hardcodat ok pentru homepage, blocurile flexibile sunt pentru paginile cms-driven)

2. Adaugă `src/app/(frontend)/page.tsx` metadata export:
   ```ts
   export const metadata: Metadata = {
     title: 'Lawre DJ — DJ pentru evenimente București | Nuntă, Corporate, Club',
     description: '...',
     openGraph: { ... },
   }
   ```

3. Adaugă JSON-LD pentru LocalBusiness (vezi `homepage.md` secțiunea Schema.org). Folosește un component `<script type="application/ld+json">` injectat în pagină.

4. Setează `revalidate = 3600` (cache 1h) pentru ISR.

**Verificare:**
- `/` arată complet, secțiune cu secțiune
- Mobile responsive impecabil
- Lighthouse: Performance >90, Accessibility >95, SEO 100
- View source: vezi metadata corect, JSON-LD prezent

**Commit:** `feat(home): complete homepage with all sections`

---

## Faza 2.5 — Pagina pilon `/servicii/dj-nunta-bucuresti`

**Goal:** Prima pagină pilon SEO completă, ca template pentru celelalte servicii.

**Pași:**

1. Creează `src/app/(frontend)/servicii/[slug]/page.tsx` (route dinamic):
   - `generateStaticParams` pe toate Services din CMS
   - `generateMetadata` din câmpul `seo` al Service-ului
   - Server Component care fetch-ează Service + relatedPackages + relevantTestimonials (filter pe eventType)
   - Render în structura din `lawre-package/content/dj-nunta-bucuresti.md`

2. Creează componente specifice:
   - `marketing/PillarHero.tsx` — hero cu eyebrow, H1 mare, subtitle, CTA, breadcrumbs
   - `marketing/ProcessSteps.tsx` — secțiunea "Cum se desfășoară" cu numbered steps
   - `marketing/FAQ.tsx` — accordion cu Q&A, generează automat FAQPage schema
   - `marketing/BreadcrumbsSchema.tsx` — JSON-LD BreadcrumbList

3. Pune conținutul din `lawre-package/content/dj-nunta-bucuresti.md` în Payload admin pentru Service-ul "DJ Nuntă București":
   - Folosește blocurile flexibile create în Faza 2.3
   - SEO meta complet
   - FAQ items adăugate

4. Adaugă JSON-LD: Service + FAQPage + BreadcrumbList (vezi schema din `dj-nunta-bucuresti.md`).

5. Internal linking: în `RichTextBlock` linkurile către `/blog/cat-costa-un-dj-la-nunta-in-bucuresti` etc. trebuie să funcționeze (chiar dacă articolul nu e încă creat, link-urile trebuie să existe).

**Verificare:**
- `/servicii/dj-nunta-bucuresti` arată complet, ~2400 cuvinte
- FAQ accordion funcționează (Client Component pentru toggle)
- View source: BreadcrumbList + Service + FAQPage scheme prezente
- Google Rich Results Test: pagina trece fără erori (https://search.google.com/test/rich-results)

**Commit:** `feat(services): pillar page dj-nunta-bucuresti complete`

---

## Faza 2.6 — Restul paginilor servicii (replicare)

**Goal:** Toate cele 8 pagini de servicii live, folosind același template.

Creează în Payload admin (sau prin script de seed) Services pentru:
- DJ Botez București
- DJ Cununie Civilă
- DJ Majorat București
- DJ Corporate București
- DJ Club / Rezidență
- DJ Petrecere Privată
- Sonorizare Evenimente

Pentru fiecare, conținutul minim viabil (pe care îl extindem ulterior):
- Hero cu eyebrow + H1 + subtitle + CTA
- Secțiunea "Ce primești"
- Secțiunea "Pachete relevante"
- 2-3 testimoniale specifice
- FAQ minim 5 întrebări
- CTA final

**Notă:** conținutul detaliat 2000+ cuvinte îl scrim ulterior; pentru Faza 2 e ok versiunea condensată ca paginile să existe pentru navigation + sitemap.

**Commit:** `feat(services): all service pages live`

---

## Faza 2.7 — Blog

**Goal:** Blog listing + single post + 3 articole publicate.

**Pași:**

1. Creează `src/app/(frontend)/blog/page.tsx`:
   - Listing toate Posts cu `status: published`
   - Filter pe categorie (query param)
   - Pagination dacă > 12 posts
   - Card cu cover, title, excerpt, date, read time

2. Creează `src/app/(frontend)/blog/[slug]/page.tsx`:
   - `generateStaticParams` pe toate slugs published
   - `generateMetadata` din SEO group
   - Render cu typography frumos pentru long-form content (`prose prose-invert prose-neon`)
   - Sidebar opțional cu Table of Contents (Client Component, din heading parsing)
   - "Articole similare" la final (3 din aceeași categorie)
   - JSON-LD Article + BreadcrumbList

3. Pune cele 3 articole în Payload admin folosind conținutul din:
   - `lawre-package/blog/01-cat-costa-un-dj-la-nunta-in-bucuresti.md`
   - `lawre-package/blog/02-top-melodii-deschidere-nunta-2026.md`
   - `lawre-package/blog/03-10-intrebari-pentru-dj-nunta.md`

   Pentru fiecare: SEO meta complet, status published, categorie corectă, cover image (placeholder OK pentru acum).

4. Configurează Tailwind Typography plugin pentru styling prose pe dark theme:
   ```bash
   pnpm add -D @tailwindcss/typography
   ```
   Și config `prose-invert` cu accent neon pentru linkuri.

**Verificare:**
- `/blog` afișează cele 3 articole
- `/blog/cat-costa-un-dj-la-nunta-in-bucuresti` arată complet, formatat frumos
- Articolele au internal linking funcțional între ele

**Commit:** `feat(blog): listing + single posts + 3 articles published`

---

## Faza 2.8 — Pagini suport

**Goal:** Restul paginilor (Despre, Echipament, Galerie, Mixuri, Pachete, Contact, Cerere ofertă).

Pentru fiecare pagină, conținut minim viabil + structura corectă. Detaliile le adăugăm în Faza 3.

- `/despre` — bio Lawre din SiteSettings, link Instagram, foto principală
- `/echipament` — listă din collection Equipment, grupată pe categorii
- `/galerie` — toate Galleries, filter pe category
- `/galerie/[slug]` — single gallery cu lightbox (folosește `react-photo-album` sau `yet-another-react-lightbox`)
- `/mixuri` — toate Mixes cu embed-uri SoundCloud/Mixcloud
- `/pachete` — toate Packages
- `/pachete/[slug]` — single package detail
- `/contact` — informații + form scurt
- `/cerere-oferta` — form detaliat (același form ca în homepage CTA, dar pe pagină dedicată cu mai multe câmpuri)

**Pentru `/zone-deservite/`:** generăm dinamic 12 pagini (Sectoarele 1-6 + 6 localități Ilfov populare). Conținut similar dar cu cuvântul-cheie hyperlocal (ex: "DJ nuntă Sector 1 București"). Acceptăm conținut algoritmic 80% identic; restul (300-500 cuvinte) hardcodat unic per locație.

**Commit:** `feat(pages): all supporting pages live`

---

## Faza 2.9 — SEO tehnic + sitemap + robots

**Goal:** Tot ce e nevoie pentru ca Google să indexeze corect.

1. Creează `src/app/sitemap.ts`:
   - Toate paginile statice (homepage, despre, contact, etc.)
   - Toate Pages cu status published
   - Toate Services
   - Toate Posts published
   - Toate zone-deservite
   - lastModified din Payload `updatedAt`

2. Creează `src/app/robots.ts`:
   ```ts
   export default function robots(): MetadataRoute.Robots {
     return {
       rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
       sitemap: `${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap.xml`,
     }
   }
   ```

3. Adaugă Open Graph default image la `/public/og-default.jpg` (1200x630, design simplu cu logo + brand colors).

4. Verifică toate paginile pentru:
   - `<title>` unic și descriptiv
   - `<meta name="description">` între 120-160 caractere
   - Open Graph tags
   - Canonical URL
   - JSON-LD valid (test cu Schema Validator)

5. Adaugă Google Analytics 4 + Vercel Analytics:
   ```bash
   pnpm add @vercel/analytics
   ```

**Verificare:**
- `/sitemap.xml` returnează XML valid
- `/robots.txt` returnează corect
- Google Rich Results Test pe homepage și pe pillar page

**Commit:** `feat(seo): sitemap, robots, structured data, analytics`

---

## Output dorit la finalul Fazei 2

- ✅ Site complet funcțional pe localhost
- ✅ Lighthouse score: Performance >90, Accessibility >95, SEO 100, Best Practices >95
- ✅ Mobile responsive impecabil de la 320px la 1920px
- ✅ Toate paginile principale create
- ✅ 3 articole de blog live
- ✅ SEO tehnic complet (sitemap, robots, schema, OG)
- ✅ Admin panel complet folosibil de Lawre fără ajutor tehnic

## Reguli de comunicare cu mine pe parcurs

- După fiecare fază, arată-mi ce ai făcut + screenshot (ASCII tree de fișiere noi/modificate)
- Înainte de orice fază, prezintă planul în plan mode
- Dacă ai dubii la decizii de design sau UX, întreabă-mă, nu inventa
- Commit-uri small și frecvente, conventional commits
- Dacă ceva în PROGRESS.md sau CLAUDE.md devine stale, actualizează-l

## Ce NU face în Faza 2

- Deploy production (asta e Faza 4)
- Cloudflare R2 storage (asta e Faza 4)
- Backlinks outreach (Faza 5)
- Articole blog peste cele 3 deja scrise (Faza 3)
- Optimizări avansate de performanță (Faza 4)

Începem? Confirmă că ai citit conținutul din `/lawre-package` și prezintă planul pentru Faza 2.1.
