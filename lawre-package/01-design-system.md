
# Lawre DJ — Design System

## Direcția aleasă: **Dark + Magenta Neon**

Reflectă vibe-ul club + private events premium. Modernizat, nu kitschy. Diferențiator clar față de wedding DJ-i tradiționali (care folosesc auriu/ivory/pastel).

## Paleta de culori

### Tokens principale (Tailwind config)

```ts
// tailwind.config.ts — extend.colors
colors: {
  // Bază
  ink: {
    DEFAULT: '#0a0a0a',     // bg principal
    soft:    '#111111',     // surfaces
    raised:  '#1a1a1a',     // cards / elevated
  },
  bone: {
    DEFAULT: '#fafafa',     // text principal pe dark
    muted:   '#a1a1aa',     // text secundar
    dim:     '#71717a',     // text tertiary / metadata
  },
  // Accent unic — magenta neon
  neon: {
    50:  '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',         // ACCENT PRINCIPAL
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  // Border subtil pe dark
  hairline: 'rgba(255, 255, 255, 0.08)',
  hairline2: 'rgba(255, 255, 255, 0.16)',
}
```

### Reguli de folosire

- **Background sit:** `ink` (#0a0a0a) — niciodată negru pur (#000), e prea agresiv
- **Text body:** `bone` (#fafafa) — niciodată alb pur, prea high-contrast obositor
- **Accent:** `neon-500` (#d946ef) folosit cu zgârcenie — CTA-uri principale, hover states, accent dots, focus rings
- **Cards:** `ink-soft` cu border `hairline` — fără shadows, fără glow
- **Hover pe accent:** `neon-400` (mai luminos, nu mai întunecat)

### Ce NU folosim

- Gradient-uri (mai ales nu pe text — arată cheap)
- Glow / box-shadow neon — devine kitsch instant
- Mai mult de o singură culoare accent — magenta + nimic altceva
- Auriu, ivory, pastel — sunt ale wedding DJ-ilor tradiționali, ne diferențiem

## Typography

```css
/* În layout.tsx — folosim next/font */
import { Space_Grotesk, Inter } from 'next/font/google'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
```

### Scale + reguli

| Element | Font | Size | Weight | Tracking | Note |
|---------|------|------|--------|----------|------|
| Hero H1 | display | clamp(40px, 6vw, 72px) | 500 | -0.02em | line-height 1.05 |
| H2 secțiune | display | clamp(28px, 4vw, 48px) | 500 | -0.015em | |
| H3 card title | sans | 18-20px | 500 | -0.01em | |
| Body | sans | 16px | 400 | normal | line-height 1.7 |
| Eyebrow / kicker | sans | 11-12px | 500 | 0.08em uppercase | culoare neon-300 |
| Meta / caption | sans | 13px | 400 | normal | bone-dim |

**Reguli stricte:**
- NICIODATĂ all caps pe text lung (doar eyebrows + butoane scurte)
- Folosim `font-weight: 500` ca "bold" — niciodată 700+ pe dark theme (arată gros, urât)
- Hero are `letter-spacing: -0.02em` ca să arate modern, editorial

## Spacing & layout

- Container max: `max-w-7xl` (1280px) cu `px-6 md:px-8`
- Vertical rhythm pe secțiuni: `py-20 md:py-32`
- Gap-uri grid: `gap-6 md:gap-8`
- Border radius: `rounded-md` (6px) pe inputs/butoane, `rounded-lg` (8px) pe cards, `rounded-2xl` (16px) doar pe imagini hero

## Componente — stiluri de bază

### Butoane

```tsx
// Primary — accent
<button className="
  inline-flex items-center gap-2
  bg-neon-500 hover:bg-neon-400 text-ink
  px-5 py-3 rounded-md font-medium text-sm
  transition-colors
">

// Ghost — pe dark
<button className="
  inline-flex items-center gap-2
  border border-hairline hover:border-hairline2
  text-bone px-5 py-3 rounded-md text-sm
  transition-colors
">
```

### Cards

```tsx
<div className="
  bg-ink-soft border border-hairline 
  rounded-lg p-6 md:p-8
  hover:border-neon-500/40 transition-colors
">
```

### Eyebrow / kicker label

```tsx
<span className="
  inline-block text-[11px] uppercase tracking-[0.08em]
  text-neon-300 bg-neon-500/10 
  px-3 py-1 rounded-full
">
  DJ • Club & Private Events
</span>
```

## Animații

- Hover transitions: `transition-colors duration-200` — niciodată mai mult
- Fade-in pe scroll cu `framer-motion` SAU `tailwindcss-animate` — DOAR pe hero și pe imagini galerie
- ZERO parallax, ZERO scroll-jacking, ZERO animații "fancy" — sunt cool 2 secunde, apoi enervante și strică SEO/CWV

## Imagistică

- Toate fotografiile cu Lawre = **grading dark + warm push în zonele luminate** (preset Lightroom de tip "moody nightlife")
- NU folosim filtre cu vignette agresivă, NU saturație fake
- Pe galerie: aspect ratio consistent (4:5 sau 3:4), nu mix
- Lazy load OBLIGATORIU cu `next/image` + `placeholder="blur"`

## Mobile-first

- Toate text sizes folosesc `clamp()` sau `text-base md:text-lg`
- Hero pe mobile: H1 max 40px, fără visual decorativ pe lateral
- Grid 3-coloane → stack pe mobile, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Touch targets minim 44px înălțime
- Meniu hamburger doar sub `md` (768px)

## Checklist înainte de commit pe orice componentă

- [ ] Funcționează pe 320px (iPhone SE) fără overflow
- [ ] Contrast text minim 4.5:1 pe orice background (verifică cu DevTools)
- [ ] Toate `<img>` înlocuite cu `<Image>` din next/image
- [ ] Toate `<a>` interne înlocuite cu `<Link>` din next/link
- [ ] `aria-label` pe toate butoanele cu doar icon
- [ ] Focus state vizibil (ring-2 ring-neon-500 ring-offset-ink)
- [ ] Niciun text sub 13px pe mobile

## Fonts pe care le încărcăm

În `src/app/(frontend)/layout.tsx`:

```tsx
import { Space_Grotesk, Inter } from 'next/font/google'

const display = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-display',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const sans = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
})

// pe <html className={`${display.variable} ${sans.variable}`}>
```

În `tailwind.config.ts`:

```ts
fontFamily: {
  display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
}
```
