# Homepage Reorder — Focus pe Life Events

> **Goal:** alinia homepage-ul cu poziționarea ajustată (life events prioritare).

## 1. Ordinea cardurilor de servicii (CRITICĂ)

### Ordinea NOUĂ pe homepage

1. **DJ Nuntă București** — tag "Cel mai cerut" (transferat de la Corporate)
2. **DJ Botez București** — tag "Specialitate" (NOU — semnal că Lawre e specializat aici)
3. **DJ Majorat București** — fără tag, dar pe locul 3 (vizibil "above the fold")
4. **DJ Cununie Civilă** — fără tag
5. **DJ Petrecere Privată** — fără tag
6. **DJ Corporate București** — fără tag (RESETAT, înainte avea "Specialitate")
7. **DJ Club / Rezidență** — fără tag
8. **Sonorizare Evenimente** — fără tag

### Implementare în collection Services

Adaugă în `src/collections/Services.ts`:

```typescript
{
  name: 'displayOrder',
  type: 'number',
  defaultValue: 999,
  admin: { 
    description: 'Ordinea pe homepage. Mai mic = primul card afișat.',
    position: 'sidebar',
  },
},
{
  name: 'cardTag',
  type: 'select',
  options: [
    { label: '— fără tag —', value: 'none' },
    { label: 'Cel mai cerut', value: 'most-popular' },
    { label: 'Specialitate', value: 'specialty' },
    { label: 'Nou', value: 'new' },
  ],
  defaultValue: 'none',
  admin: { position: 'sidebar' },
},
{
  name: 'featured',
  type: 'checkbox',
  defaultValue: false,
  admin: { 
    description: 'Card cu border accent magenta (atrage atenție)',
    position: 'sidebar',
  },
},
```

### Update homepage query

În `src/app/(frontend)/page.tsx`, query-ul devine:

```typescript
const services = await payload.find({
  collection: 'services',
  sort: 'displayOrder',
  limit: 8,
})
```

### Update ServiceCard

În `src/components/cards/ServiceCard.tsx`, adaugă rendering pentru tag și featured:

```tsx
const tagLabels: Record<string, string> = {
  'most-popular': 'Cel mai cerut',
  'specialty': 'Specialitate',
  'new': 'Nou',
  'none': '',
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className={cn(
      'border border-hairline2 rounded-lg p-7 transition-colors hover:border-neon-500/40',
      service.featured && 'border-neon-500/50 bg-neon-500/4'
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-display text-xl font-medium">{service.title}</h3>
        {service.cardTag && service.cardTag !== 'none' && (
          <span className="text-[10px] uppercase tracking-[0.06em] font-medium text-neon-300 bg-neon-500/15 px-2 py-1 rounded-full">
            {tagLabels[service.cardTag]}
          </span>
        )}
      </div>
      {/* restul cardului */}
    </div>
  )
}
```

### Update seed-services.ts

```typescript
const SERVICES_WITH_ORDER = [
  { slug: 'dj-nunta-bucuresti', displayOrder: 1, cardTag: 'most-popular', featured: true },
  { slug: 'dj-botez-bucuresti', displayOrder: 2, cardTag: 'specialty', featured: true },
  { slug: 'dj-majorat-bucuresti', displayOrder: 3, cardTag: 'none', featured: false },
  { slug: 'dj-cununie-civila', displayOrder: 4, cardTag: 'none', featured: false },
  { slug: 'dj-petrecere-privata', displayOrder: 5, cardTag: 'none', featured: false },
  { slug: 'dj-corporate-bucuresti', displayOrder: 6, cardTag: 'none', featured: false },
  { slug: 'dj-club-rezidenta', displayOrder: 7, cardTag: 'none', featured: false },
  { slug: 'sonorizare-evenimente', displayOrder: 8, cardTag: 'none', featured: false },
]
```

## 2. Subtitle-ul hero (sub textul rotativ)

În Faza 2, subtitle-ul era:

> "Nuntă, corporate, club sau petrecere privată — Lawre aduce echipamentul, energia și mixul care fac diferența între un eveniment ok și unul de care vorbiți luni întregi."

În Faza 3 (după hero rotativ), subtitle-ul devine mai scurt și personal:

> "Lawre aduce echipamentul, energia și mixul care fac diferența — indiferent de tipul evenimentului tău."

**Rațiune:** hero-ul rotativ deja menționează tipurile de evenimente ("nuntă, botez, majorat, petrecere"). Subtitle-ul nu mai trebuie să le repete.

## 3. Headline secțiunea Servicii

În Faza 2:

> "De la primul dans la afterparty."

În Faza 3:

> "Pentru momentele care se țin minte."

**Rațiune:** "Primul dans" e specific nuntă. "Pentru momentele care se țin minte" funcționează pentru toate trei verticalele (botez, nuntă, majorat) și matchează vibe-ul personal al hero-ului rotativ.

## 4. Subtitle secțiunea Servicii

În Faza 2:

> "Indiferent de tipul evenimentului, primești același nivel de profesionalism — echipament, prezență și mix."

În Faza 3:

> "Specializat pe evenimentele care contează pentru voi — nuntă, botez, majorat. Plus tot ce vine în jur."

**Rațiune:** explicitează cele 3 verticale principale (bun pentru SEO + claritate pentru cititor). "Plus tot ce vine în jur" sugerează că Lawre face și alte tipuri (corporate, club, sonorizare).

## 5. Trust strip — păstrată identic

**300+ evenimente / 8 ani / 5.0★ / București + Ilfov** — datele rămân.

> Notă: dacă Lawre confirmă că numărul e altul (ex: 250+ evenimente), Lawre poate edita din SiteSettings.

## 6. Galerie strip — ordine schimbată

În Faza 2, galeriile sunt afișate în ordine aleatoare. În Faza 3, ordinea pe homepage:

1. Botez (primul, conform priority)
2. Nuntă
3. Majorat
4. Mix (Club / Private)

### Implementare

În homepage:

```typescript
const galleryByCategory = await Promise.all([
  payload.find({ collection: 'galleries', where: { category: { equals: 'botez' } }, limit: 1, sort: '-eventDate' }),
  payload.find({ collection: 'galleries', where: { category: { equals: 'nunta' } }, limit: 1, sort: '-eventDate' }),
  payload.find({ collection: 'galleries', where: { category: { equals: 'majorat' } }, limit: 1, sort: '-eventDate' }),
  payload.find({ collection: 'galleries', where: { category: { in: ['club', 'private'] } }, limit: 1, sort: '-eventDate' }),
])

const homepageGalleries = galleryByCategory.flatMap(r => r.docs).filter(Boolean)
```

Cu fallback: dacă nu există galerie pentru un tip, ia ultima galerie de orice tip.

## 7. Testimoniale — filter ajustat

În Faza 3, asigură-te că pe homepage apar testimoniale care acoperă cele 3 verticale principale:

- 1 testimonial **botez** (primul)
- 1 testimonial **nuntă**
- 1 testimonial **majorat** (sau corporate, dacă nu există majorat)

### Implementare

```typescript
const testimonialQueries = await Promise.all([
  payload.find({ 
    collection: 'testimonials', 
    where: { 
      eventType: { equals: 'botez' }, 
      consentGiven: { equals: true } 
    }, 
    limit: 1, 
    sort: '-rating' 
  }),
  payload.find({ 
    collection: 'testimonials', 
    where: { 
      eventType: { equals: 'nunta' }, 
      consentGiven: { equals: true } 
    }, 
    limit: 1 
  }),
  payload.find({ 
    collection: 'testimonials', 
    where: { 
      eventType: { in: ['majorat', 'corporate'] }, 
      consentGiven: { equals: true } 
    }, 
    limit: 1 
  }),
])

const homepageTestimonials = testimonialQueries.flatMap(r => r.docs).filter(Boolean)
```

## 8. CTA final ajustat

În Faza 2, CTA-ul final spune:

> "Ai data fixă? Hai să vorbim."

În Faza 3, păstrăm asta dar adăugăm o linie de "social proof" subtilă:

> "Ai data fixă? Hai să vorbim."
> 
> *Răspund în max 24h, nu cu 'te sun mâine'.*

**Rațiune:** semnal de profesionalism imediat la final + tonul casual care le place vizitatorilor români.

## 9. Meta tags ajustate

### În Faza 2

```
title: Lawre DJ — DJ pentru evenimente București | Nuntă, Corporate, Club
description: DJ profesionist din București pentru nunți, botezuri, corporate, club și petreceri private...
```

### În Faza 3

```
title: Lawre DJ — DJ Nuntă, Botez, Majorat București | Pachete de la 350€
description: DJ profesionist din București pentru nuntă, botez, majorat și petreceri private. Echipament propriu, mix personalizat, pachete transparente. Cere ofertă.
```

**Schimbări:**
- Keywords prioritare (botez, majorat) sunt acum în title
- "Pachete de la 350€" e un trust signal puternic chiar din SERP
- Descriere mai concisă și mai targetată

## Verificare la final

- [ ] Cardurile servicii apar în ordine: Nuntă, Botez, Majorat, Cununie, Petrecere, Corporate, Club, Sonorizare
- [ ] DJ Nuntă are tag "Cel mai cerut"
- [ ] DJ Botez are tag "Specialitate"
- [ ] DJ Corporate NU mai are tag "Specialitate" (cardTag='none')
- [ ] Subtitle hero ajustat
- [ ] H2 secțiunea Servicii ajustat la "Pentru momentele care se țin minte"
- [ ] Subtitle Servicii actualizat
- [ ] Galerie ordonată: Botez, Nuntă, Majorat, ...
- [ ] Testimoniale acoperă cele 3 verticale principale
- [ ] Meta tags noi cu keywords prioritare (botez, majorat în title)
- [ ] CTA final include linia "Răspund în max 24h"

## Commit

```
feat(homepage): reorder for life events focus + tag adjustments

- Service cards reordered: Nuntă, Botez, Majorat first
- "Cel mai cerut" tag moved from Corporate to Nuntă
- "Specialitate" tag added to Botez (was on Corporate)
- Subtitle adjusted to remove explicit category list (covered by rotating hero)
- Section H2 changed to "Pentru momentele care se țin minte"
- Meta tags include botez/majorat in title
- Gallery and testimonials prioritized for botez/nuntă/majorat
- CTA final includes "Răspund în max 24h" trust signal
```
