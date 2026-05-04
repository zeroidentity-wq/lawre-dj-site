# Prompt Master Claude Code — Faza 3 Lawre DJ

> Trimite TOT acest fișier ca prim mesaj într-o sesiune nouă de Claude Code, în root-ul proiectului `lawre-dj`.

---

## Context

Proiectul `lawre-dj` e un site Next.js 16 + Payload CMS 3 + PostgreSQL pentru un DJ profesionist din București. Faza 1 (bootstrap) și Faza 2 (UI + conținut minim viabil) sunt complete. Vezi `PROGRESS.md` pentru detalii.

În Faza 3 facem:
1. **Hero rotativ personalizat** pe homepage (cea mai importantă schimbare UX)
2. **Repoziționare** site spre evenimente de viață (Nuntă, Botez, Majorat) ca focus principal
3. **Conținut SEO real** care înlocuiește versiunile minime din Faza 2
4. **Schemă pentru editarea pachetelor** din admin (verificare)

Folderul `lawre-package-faza-3/` din root conține tot conținutul și specificațiile. Lucrează direct din ele.

---

## Reguli generale

1. **Citește mai întâi** `lawre-package-faza-3/README.md` ca să înțelegi schimbările vs Faza 2.
2. **Idempotență:** toate seed-urile + scripturile trebuie să poată fi rulate de mai multe ori fără efecte secundare. Folosește `where: { slug: { equals: ... } }` ca să găsești și update.
3. **Lexical helpers:** folosește `src/lib/lexical.ts` (richDoc, p, h2, h3, h4, ul, ol, pBold) pentru tot conținutul de tip richText. Nu construi manual JSON Lexical.
4. **Schema markup:** folosește helperele din `src/lib/schema.ts` (buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema, buildArticleSchema).
5. **Internal linking:** fiecare pagină trebuie să linkeze către 3-5 pagini interne relevante (pillar → blog, blog → pillar, hyperlocal → pillar etc.).
6. **TypeScript strict:** zero erori TS, zero `any` decât absolut necesar.
7. **Commit-uri atomice:** fiecare sub-fază = 1 commit cu mesaj clar.
8. **NU face git push** până nu confirmă userul că totul rulează local.

---

## Sub-fază 3.0 — Hero Rotativ + Reordonare Homepage

**Citește:** `lawre-package-faza-3/homepage-update/01-hero-rotativ.md` și `02-homepage-reorder.md`

**Pași:**

1. Creează componenta `src/components/marketing/HeroRotating.tsx` conform specificației.
2. Adaugă CSS-ul necesar în `src/app/(frontend)/styles.css` (în layer components, sau global dacă layer-ul nu e setat).
3. În SiteSettings global (`src/globals/SiteSettings.ts`) adaugă grupul `heroRotating` cu `staticTitle`, `intervalMs`, și array de `variants` (short, eyebrow, cta, hashUrl). Vezi spec pentru schema exactă.
4. În `scripts/seed-site-settings.ts` (creează dacă nu există) populează default cu cele 4 variante: botez (primul!), nuntă, majorat, petrecere.
5. Înlocuiește `<Hero />` static din homepage cu `<HeroRotating variants={settings.heroRotating?.variants} />`.
6. **Reordonare carduri servicii pe homepage:**
   - Adaugă câmp `displayOrder` (number, default 999) în `src/collections/Services.ts`
   - Adaugă câmp `cardTag` (select: none / most-popular / specialty / new) în Services
   - Adaugă câmp `featured` (checkbox, default false) în Services
   - Update query pe homepage să sorteze după `displayOrder`
   - Update `ServiceCard.tsx` să afișeze `cardTag` ca chip colorat dacă != 'none'
   - Update `ServiceCard.tsx` să aibă border accent dacă `featured === true`
7. **Update seed-services.ts** cu valorile noi:
   - dj-nunta-bucuresti: displayOrder=1, cardTag='most-popular', featured=true
   - dj-botez-bucuresti: displayOrder=2, cardTag='specialty', featured=true
   - dj-majorat-bucuresti: displayOrder=3
   - dj-cununie-civila: displayOrder=4
   - dj-petrecere-privata: displayOrder=5
   - dj-corporate-bucuresti: displayOrder=6, cardTag='none' (RESETAT, nu mai e specialitate)
   - dj-club-rezidenta: displayOrder=7
   - sonorizare-evenimente: displayOrder=8
8. **Update homepage texts:**
   - H2 secțiune Servicii: schimbă din "De la primul dans la afterparty." în "Pentru momentele care se țin minte."
   - Subtitle hero static: "Lawre aduce echipamentul, energia și mixul care fac diferența — indiferent de tipul evenimentului tău."
   - Subtitle secțiune Servicii: "Specializat pe evenimentele care contează pentru voi — nuntă, botez, majorat. Plus tot ce vine în jur."
9. **Update meta tags homepage:**
   - title: "Lawre DJ — DJ Nuntă, Botez, Majorat București | Pachete de la 350€"
   - description: "DJ profesionist din București pentru nuntă, botez, majorat și petreceri private. Echipament propriu, mix personalizat, pachete transparente. Cere ofertă."
10. Rulează seed-urile cu `npm run seed` sau echivalent. Verifică în /admin că toate sunt corecte.
11. Pornește dev server (`npm run dev`) și verifică:
    - Hero rotește la 2.8s
    - Pause pe hover funcționează
    - Cardurile sunt în ordinea corectă
    - Tag-urile apar corect
    - Toate link-urile funcționează
12. Commit: `feat(faza-3.0): rotating hero + homepage reorder for life events focus`

---

## Sub-fază 3.1 — Servicii detaliate

**Citește:** Toate fișierele din `lawre-package-faza-3/services/`

**Pași:**

1. Pentru fiecare serviciu (botez primul, apoi în ordinea numerotării), creează un script `scripts/seed-services-detailed-NNN.ts` (ex: `seed-services-detailed-01-botez.ts`) care:
   - Găsește serviciul după slug
   - Update conținutul richText folosind helperele din `lib/lexical.ts`
   - Update meta tags
   - Construiește FAQ-ul ca array în `faq` field (sau crează collection FAQ legată dacă nu există)
   - Setează `priceFrom` și `relatedPackages` pentru schema markup
2. Verifică că pe pagina serviciului:
   - Schema Service apare (verifică cu Rich Results Test)
   - Schema FAQPage apare
   - Schema Breadcrumb apare
   - Toate internal links funcționează
3. Verifică că meta title și description sunt sub 60/160 caractere (cu margine de siguranță).
4. Update sitemap.xml dynamic — toate paginile de servicii trebuie să apară cu lastmod actualizat.
5. Pentru DJ Botez București SPECIFIC: asigură-te că pagina e la paritate cu DJ Nuntă București (volum, FAQ, structură).
6. Commit per serviciu sau commit-uri grupate logic. Mesaj exemplu: `feat(faza-3.1): expand DJ Botez București pillar (~2400 words)`

---

## Sub-fază 3.2 — Articole blog 4-12

**Citește:** Toate fișierele din `lawre-package-faza-3/blog/`

**Pași:**

1. Creează `scripts/seed-blog-faza-3.ts` care publică toate cele 9 articole noi (4-12).
2. Pentru fiecare articol:
   - Construiește richText cu helperele Lexical
   - Setează meta tags (title, description)
   - Setează `publishedAt` la o dată staggered (nu toate în aceeași zi — distribuie pe 2-3 săptămâni: articole botez la început, apoi nuntă, apoi majorat, apoi corporate)
   - Setează `readingTime` calculat (cuvinte / 220)
   - Setează cover image placeholder (URL spre Unsplash sau seed minimal — Lawre va înlocui cu poze reale)
   - Setează `category` și `tags` corect
   - Adaugă schema Article markup pe pagină
3. Articolele BOTEZ (07, 08, 09) au prioritate — publică primele cu data cea mai recentă.
4. Pe pagina de blog index, asigură-te că filtrele după category/tag funcționează (nuntă, botez, majorat, corporate).
5. Pe fiecare pagină de articol:
   - Internal links către pillar pages relevante (3-5 link-uri)
   - "Articole conexe" la final (3 articole din aceeași categorie)
   - CTA la final spre serviciul relevant
6. Commit grupat: `feat(faza-3.2): publish 9 new blog articles (3 nunta + 3 botez + 2 majorat + 1 corporate)`

---

## Sub-fază 3.3 — Date reale Lawre (când le ai)

**Status:** doar dacă userul ți-a trimis briefs-urile completate. Dacă nu, sari peste această sub-fază.

**Pași când ai datele:**

1. Update collection `Equipment` cu lista reală (boxe, mixere, lumini, microfoane — modele exacte cu mărci).
2. Update collection `Packages` cu prețurile reale (poate fi diferit de seed-urile inițiale).
3. Update collection `Testimonials` cu testimonialele reale colectate (cu consent GDPR).
4. Update collection `Galleries` cu pozele reale (după foto shoot).
5. Update SiteSettings cu numărul de telefon real, email real, sociale reale.
6. Commit: `feat(faza-3.3): integrate real Lawre data (equipment, packages, testimonials)`

---

## Sub-fază 3.4 — Zone hyperlocal rafinate

**Citește:** `lawre-package-faza-3/zones/zones-content-template.md`

**Pași:**

1. Cele 12 pagini hyperlocal din Faza 2 (DJ nuntă Sector 1, DJ nuntă Otopeni etc.) au conținut minimal viabil. Le rafinăm acum.
2. Pentru fiecare zonă, conținutul devine:
   - Intro specific zonei (nu generic)
   - Listă restaurante / săli de evenimente populare în zona respectivă
   - Distanță de la Lawre, timp deplasare, tarif suplimentar dacă se aplică
   - Testimonial dacă există dintr-o zonă apropiată
3. Adaugă variante hyperlocale și pentru BOTEZ și MAJORAT (nu doar nuntă):
   - `dj-botez-sector-1`, `dj-botez-sector-2`, ..., `dj-botez-otopeni`, etc.
   - `dj-majorat-sector-1` etc.
   - Total NOI: 12 zone × 2 verticale (botez + majorat) = 24 pagini noi
4. Update `ZONES` și `ZONE_MAP` din `src/lib/zone-deservite.ts` să includă noile combinații.
5. Update sitemap să le includă.
6. Commit: `feat(faza-3.4): refine hyperlocal pages + add botez/majorat variants (24 new pages)`

---

## Sub-fază 3.5 — Pagini suport

**Citește:** Toate fișierele din `lawre-package-faza-3/supporting/`

**Pași:**

1. Update pagina `/despre`:
   - Eroare/povestea Lawre extinsă (de la primii ani de DJ la prezent)
   - Foto reală (dacă există)
   - Mențiuni media / evenimente notabile
2. Update pagina `/echipament`:
   - Listă completă cu echipament profesional
   - Categorii: Audio, Lumini, Microfoane, Mixere, Cabină
   - Pentru fiecare item: marcă, model, descriere scurtă
3. Update pagina `/pachete`:
   - Comparație detaliată Essential vs Premium vs Platinum
   - Tabel features per pachet
   - FAQ pachete
4. Update pagina `/contact`:
   - Form contact funcțional (deja din Faza 2, doar UI polish)
   - Map locație București
   - Listă cu metode contact (WhatsApp, telefon, email, formular)
5. Commit: `feat(faza-3.5): expand supporting pages (despre, echipament, pachete, contact)`

---

## Sub-fază 3.6 — SEO audit final

**Pași:**

1. Verifică toate paginile cu Lighthouse (target: Performance > 90, SEO = 100, Accessibility > 95).
2. Verifică toate paginile cu Schema Validator (https://validator.schema.org/).
3. Verifică toate paginile cu Google Rich Results Test pentru tipuri specifice (Service, FAQPage, Article).
4. Generează un raport de internal links: fiecare pagină pillar trebuie să fie linked din min 5 alte pagini.
5. Verifică sitemap.xml — toate paginile prezente, lastmod corect.
6. Verifică robots.txt — permite tot ce trebuie, blochează /admin.
7. Submit sitemap la Google Search Console (când domeniul e live, deci în Faza 4).
8. Update `PROGRESS.md` cu statusul final al Fazei 3.
9. Commit: `chore(faza-3.6): SEO audit + sitemap final`

---

## La final

După Faza 3, raportează userului:
- Câte pagini au conținut detaliat
- Câte articole publicate
- Câte schema markups validate
- Lighthouse scores medii
- Probleme rămase (dacă există)

Următorul pas e **Faza 4** = deploy production. Asta se face într-o sesiune separată cu un alt prompt.

---

## Important

- **NU face git push** decât după ce userul a verificat local.
- **NU schimba** nimic în structura din Faza 1 sau Faza 2 (collections existente, helperi etc.) decât dacă specificația o cere explicit.
- Dacă întâlnești erori sau ambiguități în spec, **întreabă userul** înainte să iei decizii arhitecturale.
- **Push tot conținutul richText prin helperii Lexical** — nu construi JSON manual.

Mult succes! 🎧
