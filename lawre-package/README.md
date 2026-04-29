# Pachet Lawre DJ — Conținut + Design + Prompt Claude Code

Acest folder conține tot ce ai nevoie pentru a continua proiectul în Claude Code, fără să fie nevoie să-mi mai pui întrebări intermediare.

## Structura

```
lawre-package/
├── README.md                                  ← acest fișier
├── design/
│   └── 01-design-system.md                    ← paleta culori, typography, componente
├── content/
│   ├── homepage.md                            ← tot textul homepage-ului
│   └── dj-nunta-bucuresti.md                  ← pillar page completă
├── blog/
│   ├── 01-cat-costa-un-dj-la-nunta-in-bucuresti.md
│   ├── 02-top-melodii-deschidere-nunta-2026.md
│   └── 03-10-intrebari-pentru-dj-nunta.md
└── prompts/
    └── 00-prompt-claude-code-faza-2.md        ← prompt-ul pe care îl dai în Claude Code
```

## Cum folosești pachetul ăsta

### Pasul 1: Pune folderul în proiect

```bash
cd lawre-dj-site
# copiază lawre-package/ în root, lângă CLAUDE.md
```

Astfel Claude Code îl vede automat în context.

### Pasul 2: Deschide o sesiune nouă în Claude Code

În folderul proiectului:
```bash
claude
```

### Pasul 3: Dă-i prompt-ul de Faza 2

Copiezi tot conținutul din `prompts/00-prompt-claude-code-faza-2.md` (de la rândul `# Sarcină: implementarea Fazei 2 — Frontend public` până la final) și îl trimiți ca prim mesaj.

Claude Code va citi automat conținutul din `lawre-package/` (referențiat în prompt) împreună cu `CLAUDE.md` și `PROGRESS.md`.

### Pasul 4: Lucrezi fază cu fază

Prompt-ul e structurat în 9 sub-faze (2.1 - 2.9). Înainte de fiecare, Claude Code va prezenta planul în plan mode (Shift+Tab). Tu confirmi sau ajustezi.

**Recomandare:** după fiecare sub-fază, fă `git commit` și ia o pauză. Verifică că totul arată cum vrei. Apoi continuă.

## Direcția de design aleasă

**Dark + Magenta Neon.**

- Background principal: `#0a0a0a` (negru "soft", nu pur)
- Text principal: `#fafafa` (alb "soft")
- Accent unic: `#d946ef` (magenta neon)
- Typography: **Space Grotesk** pentru hero/headings, **Inter** pentru body
- Stil: editorial, modern, minimal — fără gradient-uri, fără shadows, fără kitsch

Detalii complete în `design/01-design-system.md`.

## Conținut SEO scris

### Homepage (~1200 cuvinte)
9 secțiuni complete cu eyebrows, headings, body, CTA-uri și schema markup. Țintă pe "dj evenimente bucuresti", "dj nunta bucuresti", "lawre dj".

### Pillar page `/servicii/dj-nunta-bucuresti` (~2400 cuvinte)
Cea mai importantă pagină pentru SEO local. Structurată ca pillar conform best practices 2026:
- Hero + subtitle
- 4 secțiuni argumentative
- Process steps (cum se desfășoară)
- Pachete contextualizate
- 10 întrebări FAQ cu schema FAQPage
- CTA final
- Schema.org Service + FAQPage + BreadcrumbList

### 3 articole de blog (~3000 cuvinte fiecare)

1. **`cat-costa-un-dj-la-nunta-in-bucuresti`** — keyword cu cel mai mare intent comercial pre-rezervare. Convertor masiv.

2. **`top-melodii-deschidere-nunta-2026`** — keyword volum mare, conținut shareable, autoritate în nișă.

3. **`10-intrebari-pentru-dj-nunta`** — keyword long-tail, public super-calificat (oameni gata să rezerve).

Toate cu SEO meta, slug-uri, internal linking strategy, schema markup.

## Ce NU e încă scris (rămâne pentru iterații viitoare)

- Conținutul detaliat pentru celelalte 7 pagini de servicii (în Faza 2.6 punem versiunea minimă, le extindem ulterior)
- Articolele blog 4-20 din content plan
- Conținutul paginilor zone-deservite (12 pagini hyperlocal)
- Texte pentru pagina /despre, /echipament, /pachete (versiune minimă în Faza 2.8)

Pentru toate astea, când ești gata, întoarce-te la mine și îți pregătesc batch-ul următor.

## Mockup vizual

Direcția de design ai văzut-o în chat când ai cerut Faza 2 (homepage cu hero "Sunet care schimbă seara", waveform magenta pe lateral, layout dark cu accent neon, grid de 3 servicii sub).

Reproducerea fidelă a mockup-ului în cod o face Claude Code în Faza 2.4 (homepage), folosind componentele din Faza 2.2 + design system din `design/01-design-system.md`.

## Checklist înainte să dai drumul în Claude Code

- [ ] Folderul `lawre-package/` e copiat în root-ul proiectului
- [ ] `CLAUDE.md` și `PROGRESS.md` sunt actualizate (sunt deja, conform mesajului tău)
- [ ] `pnpm dev` rulează curat din Faza 1
- [ ] Git e curat (commit toate modificările pendente înainte)
- [ ] Ai timp să faci review pentru fiecare sub-fază (nu da prompt-ul când ești ocupat)

## Estimări de timp

- Faza 2.1 (Tailwind setup): ~30 min
- Faza 2.2 (Componente core): ~2-3 ore
- Faza 2.3 (Schema extension): ~1 oră
- Faza 2.4 (Homepage): ~2 ore
- Faza 2.5 (Pillar page): ~2-3 ore
- Faza 2.6 (Restul services): ~2 ore
- Faza 2.7 (Blog): ~2 ore
- Faza 2.8 (Pagini suport): ~3-4 ore
- Faza 2.9 (SEO tehnic): ~1 oră

**Total: 16-19 ore de lucru distribuit pe 1-2 săptămâni de lucru part-time.**

## Întrebări pentru când mă întorc la tine

Lucruri pe care e bine să le ai pregătite când ești gata pentru iterația următoare:

1. **Foto reale de la Lawre** — minim 20 poze (club, nuntă, corporate, echipament, portret)
2. **Lista exactă echipament** — cu modele, branduri, putere
3. **Numărul WhatsApp / telefon** pentru CTA-uri
4. **5-10 testimoniale text** de la clienți reali, cu acord
5. **Decizia: PFA sau SRL** pentru Lawre (mai bine SRL pentru contracte corporate)
6. **Logo final** — sau, dacă nu, hai să-l facem în Canva/Figma împreună

Mult succes! 🎧
