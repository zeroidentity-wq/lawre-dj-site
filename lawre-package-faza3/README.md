# Pachet Faza 3 — Lawre DJ

Acest pachet conține tot conținutul SEO + specificații tehnice pentru Faza 3 a site-ului Lawre DJ.

## Ce s-a schimbat față de planul inițial (după feedback-ul lui Lawre)

**Repoziționare:** Site-ul se concentrează acum pe **evenimente de viață** (Nuntă, Botez, Majorat) ca verticale principale. Botezul în special — Lawre se așteaptă să fie principalul driver de conversii inițial. Corporate rămâne pe site cu pagină dedicată, dar nu mai e "specialitatea" evidențiată.

**Hero rotativ personalizat:** Hero-ul homepage-ului are acum text dinamic care se schimbă între tipurile de evenimente, cu pronume posesiv ("nunta voastră", "botezul copilului vostru", "majoratul fiicei voastre", "petrecerea voastră"). Ideea: cititorul simte că site-ul vorbește direct cu el.

**Reordonare carduri pe homepage:**
- Ordine nouă: Nuntă → Botez → Majorat → Cununie → Petrecere → Corporate → Club → Sonorizare
- Tag "Cel mai cerut" mutat de pe Corporate pe **Nuntă**
- Tag "Specialitate" mutat de pe Corporate pe **Botez**

**Volum conținut redistribuit:**
- DJ Botez București: extins de la pagină minimă (Faza 2) la pillar adevărat (~2400 cuvinte, paritate cu DJ Nuntă)
- DJ Majorat București: extins la ~2000 cuvinte
- DJ Corporate: păstrat la ~1800 cuvinte (decrescut față de planul inițial unde avea 2200)
- 9 articole blog noi: 3 pentru nuntă, 3 pentru **botez** (priority), 2 pentru majorat, 1 pentru corporate

## Structura pachetului

```
lawre-package-faza-3/
├── README.md                                       (acest fișier)
├── prompts/
│   └── 00-prompt-claude-code-faza-3.md             (master prompt pentru Claude Code)
├── homepage-update/
│   ├── 01-hero-rotativ.md                          (spec implementare hero rotativ)
│   └── 02-homepage-reorder.md                      (reordonare carduri + texte)
├── services/                                       (extinderi pillar pages)
│   ├── 01-dj-botez-bucuresti.md                    (~2400 cuvinte, PRIORITATE)
│   ├── 02-dj-majorat-bucuresti.md                  (~2000 cuvinte)
│   ├── 03-dj-corporate-bucuresti.md                (~1800 cuvinte)
│   ├── 04-dj-club-rezidenta.md                     (~1500 cuvinte)
│   ├── 05-dj-cununie-civila.md                     (~1200 cuvinte)
│   ├── 06-dj-petrecere-privata.md                  (~1700 cuvinte)
│   └── 07-sonorizare-evenimente.md                 (~1400 cuvinte)
├── blog/                                           (articole 4-12)
│   ├── 04-top-melodii-primul-dans.md               (nuntă)
│   ├── 05-dj-vs-formatie-la-nunta.md               (nuntă)
│   ├── 06-checklist-dj-nunta-30-zile.md            (nuntă)
│   ├── 07-ghid-complet-dj-botez-bucuresti.md       (botez - PRIORITY)
│   ├── 08-top-melodii-botez-2026.md                (botez)
│   ├── 09-cabina-foto-la-botez.md                  (botez)
│   ├── 10-majorat-18-ani-petrecere-memorabila.md   (majorat)
│   ├── 11-genurile-muzicale-tineri-2026.md         (majorat)
│   └── 12-ghid-complet-dj-corporate-bucuresti.md   (corporate)
├── zones/
│   └── zones-content-template.md                   (template pentru rafinarea celor 12 pagini hyperlocal)
├── supporting/                                     (pagini secundare)
│   ├── despre.md
│   ├── echipament-intro.md
│   ├── pachete-page.md
│   └── contact-page.md
└── briefs/                                         (briefuri pentru Lawre, NU pentru Claude Code)
    ├── brief-foto-shoot.md
    ├── brief-testimoniale-clienti.md
    ├── brief-recenzii-google.md
    ├── brief-lista-echipament.md
    └── brief-google-business-profile.md
```

## Cum continui în Claude Code

1. Pune folderul `lawre-package-faza-3/` în root-ul proiectului (lângă `lawre-package/` din Faza 2)
2. Deschide o sesiune nouă de Claude Code în root-ul proiectului
3. Trimite ca prim mesaj conținutul din `prompts/00-prompt-claude-code-faza-3.md`
4. Claude Code va lucra pe sub-faze 3.0 → 3.7 secvențial

## Estimări de timp (Claude Code)

| Sub-fază | Conținut | Timp aproximativ |
|----------|----------|------------------|
| 3.0 Hero rotativ + reorder homepage | Spec implementată | 1-2 ore |
| 3.1 Servicii detaliate | 7 pagini × 1500-2400 cuv | 2-3 ore |
| 3.2 Articole blog 4-12 | 9 articole × 1500 cuv | 3-4 ore |
| 3.3 Date reale Lawre (când le ai) | echipament, pachete | 2 ore |
| 3.4 Zone hyperlocal | rafinare 12 pagini | 2 ore |
| 3.5 Pagini suport | 4 pagini extinse | 1 oră |
| 3.6 SEO audit final | meta, schema, internal links | 1-2 ore |

**Total: 12-16 ore** distribuite pe 1-2 săptămâni.

## Briefs separate pentru Lawre

Folder `briefs/` conține lucruri pe care le poate face DOAR Lawre (Claude Code nu are cum):
- Foto shoot pentru pozele reale de pe site
- Testimoniale de la clienți reali (cu acord GDPR)
- Recenzii Google (Google Business Profile)
- Lista exactă a echipamentului propriu (modele, mărci)
- Setup Google Business Profile

Aceste lucruri trebuie făcute paralel cu implementarea Fazei 3 — nu blochează Claude Code.

## Status post-Faza 3

După Faza 3 site-ul va avea:
- Hero rotativ personalizat ✅
- 8 pagini de servicii cu conținut real ✅
- 12 articole de blog (3 din Faza 2 + 9 noi) ✅
- 12 pagini hyperlocal rafinate ✅
- 4 pagini suport extinse ✅
- Pozele reale de la Lawre integrate (dacă a făcut foto shoot)
- Testimoniale reale (dacă a colectat)

Faza 4 = deploy production pe Vercel + Neon + Cloudflare R2.
