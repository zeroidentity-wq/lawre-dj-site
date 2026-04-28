# Lawre DJ Site — Progress Log

> Document de status. Citește **CLAUDE.md** pentru spec-ul complet al proiectului. Acest fișier urmărește ce s-a făcut, ce a fost amânat conștient, și unde te oprești când reiei lucrul (inclusiv în Claude web chat).

## Status la zi

**Faza curentă:** Faza 2.5 — DONE (2026-04-28).
**Faza următoare:** Faza 2.6 — restul paginilor de servicii (același template, conținut minim viabil).

## Faza 2.5 — ce s-a livrat (2026-04-28)

- Două blocuri noi în `src/blocks/`: `FeatureGrid.ts` (grid 2/3/4 col cu items title+body) și `ProcessSteps.ts` (pași numerotați auto). Înregistrate în `layoutBlocks` → disponibile pe Pages, Posts, Services.
- Componente marketing noi: `PillarHero` (hero cu breadcrumbs + price-from + CTA dual), `Breadcrumbs` (vizual, semantic `<nav>/<ol>`), `FAQAccordion` (`<details>/<summary>`, JS-free toggle), `FeatureGrid`, `ProcessSteps`.
- `src/components/blocks/RenderBlocks.tsx` — switch central pe `blockType`, mapează toate blocurile pe componentele lor (refoloseşte `CTABlock`, `PackageCard`, `TestimonialCard`, `ServiceCard`).
- Lexical → JSX render via `@payloadcms/richtext-lexical/react` `<RichText data={...} />` (tipo `prose prose-invert prose-neon`).
- Helper `src/lib/lexical.ts` — constructori minimali (`richDoc`, `p`, `pInline`, `h2`, `h3`, `ul`) ca să producem editor state JSON din scripturi seed fără să-l scriem manual.
- Helper `src/lib/schema.ts` — `buildServiceSchema`, `buildFaqSchema`, `buildBreadcrumbSchema`, `findFaqBlock`. Service schema include `provider` LocalBusiness, `areaServed` București+Ilfov, și `AggregateOffer` din `relatedPackages.price`.
- Route dinamic `src/app/(frontend)/servicii/[slug]/page.tsx` — `generateStaticParams` peste toate slug-urile, `generateMetadata` din `service.seo` cu fallback corect, ISR 1h, JSON-LD ×3 (Service, BreadcrumbList, FAQPage când există FAQ block).
- **Seed script** `scripts/seed-dj-nunta.ts` (rulat cu `pnpm seed:dj-nunta`) — idempotent (find by slug, update sau create), creează și pachetele `essential`/`premium`/`platinum` dacă lipsesc, populează Service-ul „DJ Nuntă București" cu toate cele 9 blocuri din `lawre-package/dj-nunta-bucuresti.md` (rich text intro, feature grid 2x2, process steps 4, rich text pachete, packages block, FAQ cu 10 Q&A, testimonials filter `nunta`, CTA final). Încarcă `.env.local` via `dotenv` înainte de `await import('payload')` ca payload.config să citească corect `PAYLOAD_SECRET` și `DATABASE_URI`.

**Verificare end-to-end făcută:**
- `pnpm exec tsc --noEmit` → zero erori
- `pnpm generate:types` → `payload-types.ts` are `featureGrid` și `processSteps` ca block types pe Service.layout
- `pnpm seed:dj-nunta` (prima rulare) → `created service id=1 slug=dj-nunta-bucuresti` + 3 pachete
- `pnpm seed:dj-nunta` (a doua rulare) → `updated service id=1` (idempotent ✓)
- `GET /servicii/dj-nunta-bucuresti` → HTTP 200, ~120KB HTML
- View source: 3 JSON-LD types prezente (Service, BreadcrumbList, FAQPage), 10×Question, 10×Answer, 3×ListItem, AggregateOffer, LocalBusiness provider — toate corecte
- 10×`<details>` în FAQ accordion, 3 pachete render-ate, breadcrumbs prezente

## Faza 2.1–2.4 — ce s-a livrat (2026-04-27 → 2026-04-28)

- **Faza 2.1**: Tailwind 3.4 instalat și configurat cu paleta `ink`/`bone`/`neon`/`hairline`. Fonts: Space Grotesk (display) + Inter (sans) via `next/font/google`. CSS scope-uit pe `(frontend)` ca să nu spargă admin Payload. Helpers `cn()` + constants (SITE_URL, NAV_ITEMS, FOOTER_COLUMNS, CONTACT).
- **Faza 2.2**: Componente core în `src/components/`: `ui/{Button,Container,Eyebrow,Section}`, `layout/{Header,HeaderMobileMenu,Footer}`, `marketing/{Hero,ServiceCard,PackageCard,TestimonialCard,StatsStrip,CTABlock,JsonLd,PostCard}`, `forms/ContactForm` (Client Component cu Zod + Server Action).
- **Faza 2.3**: SEO group field (`src/fields/seo.ts`) și 8 blocuri flexibile (`src/blocks/{Hero,RichText,ServicesGrid,Packages,GalleryStrip,Testimonials,FAQ,CTA}`) atașate pe Pages, Posts, Services. Posts au `status` (draft/published), `category`, `tags`. Services au `eyebrow`, `heroImage`, `relatedPackages`, `schema` custom JSON-LD textarea.
- **Faza 2.4**: Homepage refăcută în `src/app/(frontend)/page.tsx` — Server Component, fetch real prin Payload Local API (services, packages, testimonials, galleries, posts) cu fallback în-cod, ISR 1h, JSON-LD LocalBusiness, ContactForm compact integrat.

## Faza 1 — ce s-a livrat

- Bootstrap Next.js 16.2.4 + Payload CMS 3.84.1 (template `blank` clonat via degit, adaptat manual pentru versiuni publicate + Postgres în loc de Mongo).
- Postgres: **Neon (eu-central-1, Frankfurt)** — connection string în `.env.local` (gitignored). Schema sync confirmat la primul `pnpm dev`.
- TypeScript strict mode trece curat (`tsc --noEmit` → zero erori).
- `payload-types.ts` generat (12 collections + 3 globals tipate).
- Resend email adapter configurat condiționat (se activează doar dacă `RESEND_API_KEY` e setat — în Faza 1 nu e).
- `.env.example` actualizat cu toate variabilele.

**Collections (12):** Users, Media, Pages, Posts, Services, Packages, Equipment, Galleries, Mixes, Events, ClubDates, Testimonials, ContactSubmissions.
**Globals (3):** SiteSettings, Menu, Footer.

Toate au schema **minimă** (slug + title + richText / câmpuri esențiale). Vor fi extinse în Faza 2/3 când construim UI-ul care le consumă.

**Verificare end-to-end făcută:**
- `pnpm dev` → server up pe :3000 în <1s
- `GET /` → 200
- `GET /admin` → 200, schema sync Postgres ✓
- `pnpm exec tsc --noEmit` → zero erori
- `pnpm generate:types` → OK (21KB types file)

## Decizii tehnice luate (cu motivație)

| Decizie | Variantă aleasă | De ce |
|---------|-----------------|-------|
| Package manager | **pnpm 10** | Ecosistemul Payload e calibrat pe pnpm |
| Template Payload | **blank** | Evităm cod demo nedorit; collections rescrise oricum |
| Postgres dev | **Neon hosted** | Zero install local (n-aveam Docker); aceeași dialectă în dev și prod, fără drift |
| Next version | **16.2.4** | Match cu template-ul oficial Payload (testat împreună) |
| TS strict | **true** | Conform CLAUDE.md, no `any` |
| Storage media | **disk local** (acum) | R2 amânat în Faza 4 |
| Email adapter | **Resend, condiționat** | Activat când punem `RESEND_API_KEY`, nu spargem dev-ul fără el |

## Ce a fost AMÂNAT CONȘTIENT (TODO lists pe faze)

### Pentru Faza 2 (Frontend public)
- [ ] **Tailwind CSS + shadcn/ui** — instalare + config. Amânat fiindcă fără componente UI nu are sens să adaugi setup.
  Comenzi pregătite:
  ```bash
  pnpm add -D tailwindcss@latest postcss autoprefixer
  pnpm dlx tailwindcss init -p
  pnpm dlx shadcn@latest init  # TypeScript, default style, slate base, CSS variables
  ```
  Tailwind import merge în `src/app/(frontend)/layout.tsx` (NU în `(payload)/layout.tsx` — ar sparge admin UI-ul Payload).
- [ ] Înlocuit `src/app/(frontend)/page.tsx` (placeholder Payload) cu homepage real.
- [ ] Componente reutilizabile: Header, Footer, Hero, ServiceCard, PackageCard, GalleryGrid, TestimonialCard, ContactForm, MixEmbed, ClubDatesCalendar.
- [ ] Pagini conform CLAUDE.md "Site Architecture" — cele 30 de rute.
- [ ] Validare formulare cu **Zod**.
- [ ] Resend setat (cere API key de la Resend, adaugă în `.env.local` ca `RESEND_API_KEY`) — pentru formular contact + cerere ofertă.
- [ ] Extins schema collection-urilor pe măsură ce UI-ul cere câmpuri noi (SEO meta per-page, blocks flexibile pentru Pages, relații cross-collection).

### Pentru Faza 3 (Conținut SEO)
- [ ] Texte SEO-optimized pentru pillar pages (vezi keywords Tier 1-4 în CLAUDE.md).
- [ ] Primele 5 articole de blog din content plan-ul de 20.
- [ ] Galerie populată cu materialul foto/video proprietar al lui Lawre.
- [ ] Testimoniale reale (cu acord client).
- [ ] Metadata SEO complet pe fiecare pagină.

### Pentru Faza 4 (SEO tehnic & deploy)
- [ ] **Schema.org markup** — JSON-LD pe toate paginile relevante:
  - `LocalBusiness` (homepage, contact)
  - `Service` (fiecare pagină de serviciu)
  - `Event` (fiecare club date)
  - `Review` (testimoniale)
  - `FAQPage` (paginile pillar cu FAQ)
  - `BreadcrumbList` (toate paginile)
  - `Person` (pagina /despre, pentru Lawre)
- [ ] **Sitemap dinamic** + `robots.txt`.
- [ ] **Open Graph + Twitter Cards** pe toate paginile.
- [ ] **Core Web Vitals** — LCP <2.0s, CLS <0.1, INP <200ms. Optimizare imagini (AVIF/WebP, lazy loading, dimensiuni explicite, `next/image` obligatoriu).
- [ ] **Cloudflare R2 storage** — adăugare `@payloadcms/storage-s3`, config `s3Storage` plugin în `payload.config.ts`. Variabile env: `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ENDPOINT` (din Cloudflare dashboard).
- [ ] **Deploy** — Vercel (frontend) + Railway sau Hetzner (Payload backend, dacă separăm). Sau totul pe Vercel + Neon dacă Payload merge serverless OK.
- [ ] **2FA pentru admin Payload** — plugin separat (Payload nu are 2FA built-in). De evaluat: `payload-plugin-2fa` sau echivalent.
- [ ] Submit sitemap în Google Search Console.

### Pentru Faza 5 (Post-launch growth)
- Listings în 30+ directoare (vezi CLAUDE.md "Local SEO").
- Outreach backlinks.
- 2 articole/săptămână din content plan.
- Proces stabilit pentru recenzii Google după fiecare eveniment (țintă: 50+ recenzii în primul an).
- Monitorizare ranking săptămânal + optimizări din Search Console data.

### Faza 0 — neacoperit (necesită acțiuni non-tehnice ale user-ului/Lawre)
- [ ] Verificare/cumpărare domenii: `lawredj.ro`, `lawre-events.ro`, opțional `lawre.ro` (pe rotld.ro).
- [ ] Email profesional `contact@lawredj.ro` (Zoho Mail gratuit sau Google Workspace).
- [ ] Logo + identitate vizuală minimală (Canva/Fiverr).
- [ ] Google Business Profile creat și verificat.
- [ ] Google Search Console + GA4 setup.
- [ ] **Furnizare conținut de la Lawre:**
  - Listă echipament (modele exacte, brand-uri)
  - 20+ poze pe categorii (nuntă, botez, club, corporate, etc.)
  - 10+ testimoniale text de la clienți reali
  - Listă pachete cu prețuri exacte (Essential 350-500€, Premium 600-900€, Platinum 1000+€)
- [ ] Lawre — PFA sau SRL pentru facturare? (recomandat SRL pentru contracte corporate)
- [ ] Decizie culori brand (sugestie: black + accent neon)

## Comenzi utile pentru reluat lucrul

```bash
pnpm dev                         # dev server pe :3000
pnpm build                       # production build
pnpm exec tsc --noEmit           # type-check fără emit
pnpm generate:types              # regenerează src/payload-types.ts după schimbare collections
pnpm generate:importmap          # după ce adăugăm componente custom în admin
pnpm payload migrate:create      # migrații Postgres (dacă pasăm de modul auto-push)
```

## Cum să folosești asta în Claude web chat

1. Deschizi conversația nouă pe claude.ai.
2. Paste-uiești conținutul `CLAUDE.md` (spec proiect) + acest `PROGRESS.md` (status & TODO).
3. Spui ce vrei să faci în continuare (ex: "Începe Faza 2 — instalează Tailwind și fă homepage-ul").

Sau, mai simplu: faci upload la întreg folderul de proiect ca attachments în web chat.
