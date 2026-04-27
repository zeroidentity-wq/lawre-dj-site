export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

export const SITE_NAME = 'Lawre DJ'

export const DEFAULT_OG_IMAGE = '/og-default.jpg'

export const SITE_DESCRIPTION =
  'DJ profesionist din București pentru nunți, botezuri, corporate, club și petreceri private. Echipament propriu, mixuri live, pachete personalizate. Cere ofertă.'

export const NAV_ITEMS = [
  { label: 'Servicii', href: '/servicii/dj-nunta-bucuresti' },
  { label: 'Pachete', href: '/pachete' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Mixuri', href: '/mixuri' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const

export const CONTACT = {
  email: 'contact@lawredj.ro',
  phone: '07XX XXX XXX',
  area: 'București + Ilfov',
  instagram: 'https://www.instagram.com/lawre_dj/',
  instagramHandle: '@lawre_dj',
} as const

export const FOOTER_COLUMNS = [
  {
    heading: 'Lawre DJ',
    links: [
      { label: 'Despre', href: '/despre' },
      { label: 'Echipament', href: '/echipament' },
      { label: 'Galerie', href: '/galerie' },
      { label: 'Mixuri', href: '/mixuri' },
    ],
  },
  {
    heading: 'Servicii',
    links: [
      { label: 'DJ Nuntă București', href: '/servicii/dj-nunta-bucuresti' },
      { label: 'DJ Botez București', href: '/servicii/dj-botez-bucuresti' },
      { label: 'DJ Corporate București', href: '/servicii/dj-corporate-bucuresti' },
      { label: 'DJ Club', href: '/servicii/dj-club-rezidenta' },
      { label: 'DJ Majorat', href: '/servicii/dj-majorat-bucuresti' },
      { label: 'DJ Petrecere Privată', href: '/servicii/dj-petrecere-privata' },
    ],
  },
  {
    heading: 'Resurse',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Pachete & Prețuri', href: '/pachete' },
      { label: 'Întrebări frecvente', href: '/servicii/dj-nunta-bucuresti#faq' },
      { label: 'Cere ofertă', href: '/cerere-oferta' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { label: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
      { label: CONTACT.area, href: '/contact' },
      { label: CONTACT.instagramHandle, href: CONTACT.instagram },
    ],
  },
] as const

export const LEGAL_LINKS = [
  { label: 'Termeni', href: '/termeni' },
  { label: 'Confidențialitate', href: '/confidentialitate' },
] as const
