# Lawre DJ — Site & Brand Project

## Project Overview

**Client:** Lawre DJ — DJ profesionist din București, activ pe scena privată și de club.
**Instagram:** [@lawre_dj](https://www.instagram.com/lawre_dj/) (~1.7k followers, în creștere)
**Echipament:** are propriu (specs detaliate de adăugat în pagina /echipament)
**Foto/video asset:** are deja material vizual proprietar

**Goal:** Site de prezentare profesional + admin panel complet self-service, optimizat pentru SEO local București-Ilfov, care să-l aducă în top 10 Google pentru cuvintele cheie principale în 6-12 luni.

**Audiență dublă:**
- B2C: cupluri (nuntă), părinți (botez), tineri (majorat), persoane private (petreceri)
- B2B: companii (corporate events), cluburi (rezidențe DJ)

## Brand & Identity

**Strategia de poziționare:** brand personal puternic ("Lawre DJ" ca artist) + entitate de business ("Lawre Events" pentru contracte și pachete complete). Site-ul reflectă ambele fețe.

**Diferențiator unic față de competiție:** majoritatea competitorilor din București sunt "wedding DJs" generici. Lawre e DJ activ pe scena de club + private events — folosim asta să ne diferențiem ca DJ "modern, cu pulsul scenei", nu un wedding DJ tradițional.

**Domeniu principal:** `lawredj.ro` (de verificat și cumpărat pe rotld.ro, plus `lawre-events.ro` și opțional `lawre.ro`)

**Email profesional:** `contact@lawredj.ro` (Zoho Mail gratuit sau Google Workspace)

## Tech Stack

| Layer | Technology | De ce |
|-------|------------|-------|
| Frontend | Next.js 15+ (App Router) | Performance, SEO, server-side rendering |
| CMS | Payload CMS 3 | Admin UI excelent, self-hosted, integrat cu Next.js |
| Database | PostgreSQL | Default Payload, robust |
| Styling | Tailwind CSS + shadcn/ui | Componente accesibile, dezvoltare rapidă |
| Storage | Cloudflare R2 sau S3 | Imagini, video, backup |
| Hosting frontend | Vercel (free tier) | Deploy automat din git |
| Hosting backend | Railway sau Hetzner | ~5-10€/lună pentru Payload + Postgres |
| Forms | Built-in Payload + email via Resend | Formulare contact, cerere ofertă |
| Analytics | Google Analytics 4 + Vercel Analytics | Trafic, conversii |
| SEO | Next-SEO + Schema.org markup | Rich snippets, structured data |

**Total cost lunar:** sub 15€/lună inclusiv toate serviciile.

## Site Architecture

```
/                                # Homepage — hero + servicii + galerie + CTA
/despre                          # Povestea Lawre — bio personal + firma
/servicii/
  /dj-nunta-bucuresti           # Pagină pilon (3000+ cuvinte, FAQ, schema)
  /dj-botez-bucuresti
  /dj-cununie-civila
  /dj-majorat-bucuresti
  /dj-corporate-bucuresti       # Diferențiator vs competiție
  /dj-club-rezidenta            # UNIC vs competiție
  /dj-petrecere-privata
  /sonorizare-evenimente
/pachete/
  /essential                     # 350-500 EUR
  /premium                       # 600-900 EUR
  /platinum                      # 1000+ EUR
/echipament                      # CRITICAL — listă specs reale, brand-uri
/galerie                         # Foto + video, organizate pe categorii
/mixuri                          # SoundCloud/Mixcloud embeds
/club-dates                      # Calendar live unde mixează — UNIC
/blog/
  /[slug]                        # Articole SEO (vezi Content Plan)
/zone-deservite/
  /dj-sector-1, sector-2, ..., sector-6
  /dj-otopeni, /dj-voluntari, /dj-popesti-leordeni, /dj-pantelimon, /dj-bragadiru
/testimoniale
/contact
/cerere-oferta                   # Formular detaliat (data, tip eveniment, locație, invitați, buget)
```

## Payload CMS Collections

```typescript
// High-level data model
collections: [
  Pages,           // Pagini cu blocuri flexibile
  Posts,           // Blog articles (title, cover, content, categories, tags, SEO meta)
  Events,          // Evenimente (data, locație, tip, descriere, status)
  ClubDates,       // Date viitoare la cluburi (live calendar)
  Galleries,       // Albume foto/video pe eveniment
  Services,        // Pagini de serviciu (cu prețuri, FAQ, schema)
  Packages,        // Pachetele (Essential/Premium/Platinum)
  Equipment,       // Lista echipamentului cu specs
  Testimonials,    // Recenzii clienți
  Media,           // Toate imaginile/videourile
  ContactSubmissions, // Formularele primite
  Mixes,           // SoundCloud/Mixcloud links
],
globals: [
  SiteSettings,    // Logo, social links, contact info, SEO defaults
  Menu,            // Navigation
  Footer,
]
```

## SEO Strategy

### Target Keywords (București + Ilfov)

**Tier 1 — Primary (high competition, high value):**
- dj nunta bucuresti
- dj botez bucuresti
- dj evenimente bucuresti
- sonorizare nunta bucuresti
- pret dj nunta bucuresti

**Tier 2 — Realistic wins (medium competition):**
- dj cununie civila bucuresti
- dj majorat bucuresti
- dj corporate bucuresti
- dj club bucuresti
- dj petrecere privata bucuresti
- dj evenimente ilfov

**Tier 3 — Long-tail (low competition, informational, blog content):**
- cat costa un dj la nunta in bucuresti
- top melodii deschidere nunta 2026
- ce intrebari sa pui dj-ului inainte de nunta
- dj sau formatie la nunta
- melodii primul dans miri
- playlist nunta romania
- cum alegi un dj pentru evenimente corporate
- pachete dj nunta bucuresti pret

**Tier 4 — Hyperlocal (very low competition):**
- dj nunta sector [1-6]
- dj nunta [otopeni|voluntari|popesti-leordeni|chitila|bragadiru|pantelimon]
- dj nunta sala [name] (pentru locațiile populare)

### Technical SEO Requirements

- Core Web Vitals targets: LCP < 2.0s, CLS < 0.1, INP < 200ms
- Schema.org markup obligatoriu: `LocalBusiness`, `Service`, `Event`, `Review`, `FAQPage`, `BreadcrumbList`, `Person` (pentru Lawre)
- Sitemap.xml dinamic, robots.txt corect
- Imagini: AVIF/WebP, lazy loading, dimensiuni explicite
- Open Graph tags + Twitter Cards
- Mobile-first design, viewport corect
- HTTPS obligatoriu
- Internal linking strategy (pillar pages → cluster posts)

### Local SEO (CRITICAL)

**Google Business Profile** — de configurat IMEDIAT, înainte de site:
- Categorie principală: "DJ service"
- Secundare: "Wedding service", "Event planner", "Karaoke equipment rental"
- Service area: tot București + Ilfov (toate localitățile)
- 20+ poze profesionale, 3-5 video-uri scurte
- Postări săptămânale (Google Posts)
- Strategie review: după FIECARE eveniment, link direct la client (țintă: 50+ recenzii în primul an)

**Listings importante:**
- nunta.ro, perfecte.ro, mireseinrochii.ro
- anuntul.ro, publi24.ro
- wedday.ro, weddingavenue.ro

## Content Plan (Blog — primele 20 articole)

Structurate ca pillar + cluster:

**Pillar 1 — DJ Nunta:**
1. Ghid complet DJ nunta București (3000+ cuvinte, ce conține pachetul, cât costă, întrebări de pus)
2. Top 50 melodii deschidere nunta 2026
3. Top 30 melodii primul dans miri
4. DJ sau formație la nunta? Comparație onestă
5. Checklist: 10 întrebări obligatorii pentru DJ-ul de la nuntă
6. Cât costă un DJ la nuntă în București (breakdown real pe pachete)
7. Cum alegi DJ-ul potrivit — 7 semne de profesionist

**Pillar 2 — DJ Corporate:**
8. Ghid complet DJ corporate event București
9. De ce un DJ schimbă dinamica unui teambuilding
10. Playlist corporate event: ce funcționează, ce nu
11. Buget DJ pentru petrecere de Crăciun la firmă

**Pillar 3 — DJ Club / Lifestyle:**
12. Ce face diferența între un DJ amator și unul profesionist
13. Echipament DJ: ce contează cu adevărat
14. Behind the scenes: o seară cu Lawre la club
15. Genurile muzicale care merg la nunți românești 2026

**Pillar 4 — Botez & Majorat:**
16. Ghid DJ botez București — ce trebuie să știe părinții
17. Top melodii botez 2026 (mix tradițional + modern)
18. Majorat de 18 ani: cum faci o petrecere memorabilă
19. Cabina foto la botez: merită investiția?

**Evergreen general:**
20. Calendar 2026: cele mai bune date pentru nuntă în București

## Admin Panel UX Requirements

Prietenul Lawre trebuie să poată face FĂRĂ ajutor tehnic:
- Login securizat (cu 2FA opțional)
- Editare orice text de pe orice pagină (inline rich text editor)
- Upload imagini cu drag & drop, crop direct în browser
- Adăugare postare blog completă (titlu, cover, content, SEO meta, publicare/draft)
- Adăugare/editare evenimente cu data și locație
- Adăugare date la cluburi (calendarul live)
- Vedere și export mesaje primite din formular
- Editare pachete și prețuri
- Adăugare testimoniale cu poză client (cu acord)
- Update SEO settings per pagină (title, description, OG image)

## Implementation Roadmap

### Faza 0 — Pre-development (înainte de cod)
- [ ] Verificare și cumpărare domenii (lawredj.ro, lawre-events.ro)
- [ ] Email profesional configurat
- [ ] Logo + identitate vizuală minimală (Canva/Fiverr)
- [ ] Google Business Profile creat și verificat
- [ ] Google Search Console + GA4 setup
- [ ] Lawre furnizează: lista echipamentului (cu modele exacte), 20+ foto categorii, 10+ testimoniale text, lista pachetelor cu prețuri

### Faza 1 — Setup tehnic
- [ ] Init Next.js 15 + TypeScript + Tailwind
- [ ] Init Payload CMS 3 integrat
- [ ] Setup Postgres local + production
- [ ] Setup S3/R2 pentru media
- [ ] Configurare collections și globals
- [ ] Auth pentru admin

### Faza 2 — Frontend public
- [ ] Layout principal + componente reutilizabile (Header, Footer, Hero, ServiceCard, etc.)
- [ ] Homepage
- [ ] Pagini servicii (pillar pages)
- [ ] Pagini pachete
- [ ] Galerie cu lightbox
- [ ] Blog listing + single post
- [ ] Pagini zone-deservite (sectoare + Ilfov)
- [ ] Despre, Echipament, Testimoniale, Contact, Cerere ofertă

### Faza 3 — Conținut
- [ ] Texte SEO-optimized pentru toate pillar pages
- [ ] Primele 5 articole de blog
- [ ] Galerie populată
- [ ] Testimoniale reale adăugate
- [ ] Toate metadata SEO complete

### Faza 4 — SEO tehnic & deploy
- [ ] Schema.org markup pe toate paginile relevante
- [ ] Sitemap dinamic
- [ ] Open Graph + Twitter Cards
- [ ] Optimizare Core Web Vitals
- [ ] Deploy production (Vercel + Railway)
- [ ] Submit sitemap în Search Console
- [ ] Test pe mobile, tablet, desktop

### Faza 5 — Post-launch growth
- [ ] Listare în 30+ directoare
- [ ] Outreach backlinks (fotografi, locații, organizatori)
- [ ] 2 articole blog/săptămână
- [ ] Recenzii Google (proces stabilit pentru clienți)
- [ ] Monitorizare ranking săptămânal
- [ ] Optimizări bazate pe Search Console data
- [ ] Eventual Google Ads pe Tier 1

## Coding Conventions

- TypeScript strict mode, nu `any`
- Componente React functional, no class components
- Tailwind utility-first, evită CSS custom decât cu Tailwind config
- Naming: kebab-case pentru fișiere, PascalCase pentru componente
- Git commits: conventional commits (feat:, fix:, chore:, etc.)
- Toate textele user-facing în Romanian, cod și comentarii în English
- Imagini: `next/image` obligatoriu, niciodată `<img>` direct
- Linkuri: `next/link` obligatoriu pentru linkuri interne
- Forms: validare cu Zod
- API: Server Actions când e posibil, API routes ca fallback

## Open Questions / TODO Before Starting

- [ ] Domenii cumpărate? (lawredj.ro)
- [ ] Lawre are PFA/SRL pentru a putea factura? Dacă nu, recomandare: SRL (mai bine pentru contracte corporate)
- [ ] Lawre furnizează lista exactă echipament cu modele/branduri
- [ ] Lawre furnizează lista pachetelor cu prețuri exacte
- [ ] Logo final făcut sau folosim un placeholder inițial?
- [ ] Decidem culorile brandului (sugestie: black + accent neon — se potrivește vibe-ului club/modern)

## Resources & References

- Competiție analizată: thepartymakers.ro, bgevents.ro, partydj.ro, vreaudj.ro, superdj.ro, mega-dj.ro, best-dj.ro, nuntadj.ro, djtigaie.ro, djconu.ro, weddingdj.ro, djsol.ro
- Payload CMS docs: https://payloadcms.com/docs
- Next.js 15 docs: https://nextjs.org/docs
- Schema.org for LocalBusiness: https://schema.org/LocalBusiness
