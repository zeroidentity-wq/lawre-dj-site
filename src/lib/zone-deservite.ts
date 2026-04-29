import { SITE_URL } from './constants'

export type ZoneData = {
  slug: string
  name: string
  type: 'sector' | 'oras'
  h1: string
  intro: string
  body: string[]
  nearbyZones: string[]
}

const BASE_SERVICES = [
  'DJ Nuntă',
  'DJ Botez',
  'DJ Cununie Civilă',
  'DJ Majorat',
  'DJ Corporate',
  'DJ Petrecere Privată',
  'Sonorizare Evenimente',
]

export const ZONES: ZoneData[] = [
  {
    slug: 'dj-sector-1',
    name: 'Sector 1',
    type: 'sector',
    h1: 'DJ Sector 1 București — Lawre DJ',
    intro:
      'Cauți un DJ profesionist în Sectorul 1? Lawre DJ acoperă toate evenimentele din zona de nord a Bucureștiului — de la Aviatorilor și Floreasca până la Băneasa și Dorobanți.',
    body: [
      'Sectorul 1 găzduiește unele dintre cele mai elegante săli de evenimente din București — Crystal Palace, Crowne Plaza, Radisson. Indiferent de locație, vin cu echipament propriu calibrat pentru spațiul vostru.',
      'Am mixat la zeci de nunți, botezuri și corporate events în Sector 1. Știu că publicul de aici are așteptări ridicate — muzică selectată, tranziții curate, prezență profesionistă pe scenă.',
      'Răspund în max 24h și ofer ofertă clară fără obligații. Prețul de deplasare în Sector 1 e inclus în pachet.',
    ],
    nearbyZones: ['dj-sector-2', 'dj-otopeni', 'dj-voluntari'],
  },
  {
    slug: 'dj-sector-2',
    name: 'Sector 2',
    type: 'sector',
    h1: 'DJ Sector 2 București — Lawre DJ',
    intro:
      'DJ profesionist pentru evenimente în Sectorul 2 — Colentina, Pantelimon, Iancului, Fundeni. Nunți, botezuri, corporate și petreceri private cu sunet de calitate.',
    body: [
      'Sectorul 2 are o comunitate vibrantă și locații variate — de la restaurante clasice la spații industriale reconvertite. Am experiență cu ambele tipuri de venue și știu cum să adaptez sunetul.',
      'Fie că organizezi o nuntă la Noblesse Palace, un botez la un restaurant local sau o petrecere corporativă, vin pregătit: setlist discutat în prealabil, echipament testat, backup plan pentru orice situație tehnică.',
      'Acoperire completă: Colentina, Obor, Pantelimon, Iancului, Tei, Fundeni, Andronache.',
    ],
    nearbyZones: ['dj-sector-3', 'dj-pantelimon', 'dj-voluntari'],
  },
  {
    slug: 'dj-sector-3',
    name: 'Sector 3',
    type: 'sector',
    h1: 'DJ Sector 3 București — Lawre DJ',
    intro:
      'Lawre DJ pentru eventos în Sectorul 3 — Titan, Dristor, Vitan, Decebal, Unirii. DJ cu experiență pentru nunți, botezuri și corporate în zona centrală-estică a Bucureștiului.',
    body: [
      'Sectorul 3 concentrează unele dintre cele mai active zone rezidențiale din București, cu o cerere mare pentru evenimente de calitate. De la restaurante pe Calea Vitan la sălile moderne din Titan.',
      'Lucrez cu echipament propriu profesional — nu depinzi de ce aduce locația. Boxe, controller, iluminare — totul vine cu mine, verificat și calibrat înainte de eveniment.',
      'Disponibil pentru: Titan, Dristor, Vitan, Balta Albă, Decebal, Unirii, Muncii, IOR.',
    ],
    nearbyZones: ['dj-sector-2', 'dj-sector-4', 'dj-popesti-leordeni'],
  },
  {
    slug: 'dj-sector-4',
    name: 'Sector 4',
    type: 'sector',
    h1: 'DJ Sector 4 București — Lawre DJ',
    intro:
      'DJ pentru nunți, botezuri și petreceri în Sectorul 4 — Berceni, Olteniței, Văcărești, Brâncoveanu. Sunet profesional, echipament propriu, ofertă în 24h.',
    body: [
      'Sectorul 4 e o zonă rezidențială mare cu o scenă de evenimente în plină expansiune. Restaurante și săli de evenimente noi se deschid constant — și fiecare eveniment merită un DJ la fel de bun.',
      'Vin cu setup complet: sistem audio profesional dimensionat pentru spațiul vostru, iluminare ambientală sau de dans, microfon wireless pentru cuvântări și toast-uri.',
      'Acoperire: Berceni, Olteniței, Brâncoveanu, Văcărești, Timpuri Noi, Tineretului, Giurgiului.',
    ],
    nearbyZones: ['dj-sector-3', 'dj-sector-5', 'dj-popesti-leordeni', 'dj-bragadiru'],
  },
  {
    slug: 'dj-sector-5',
    name: 'Sector 5',
    type: 'sector',
    h1: 'DJ Sector 5 București — Lawre DJ',
    intro:
      'Lawre DJ — servicii DJ profesionale în Sectorul 5: Rahova, Ferentari, Alexandriei, 13 Septembrie. Prețuri corecte, echipament propriu, fără costuri ascunse.',
    body: [
      'Sector 5 are locații variate pentru evenimente — de la restaurante tradiționale la spații mai noi din zona Alexandriei. Aduc același profesionalism indiferent de tipul sau dimensiunea evenimentului.',
      'Nu fac discriminare pe baza bugetului — pachetul Essential e gândit tocmai pentru evenimente cu buget limitat, fără compromis la calitatea sunetului sau a prestației.',
      'Acoperire Sector 5: Rahova, 13 Septembrie, Cotroceni, Alexandriei, Ferentari, Progresul.',
    ],
    nearbyZones: ['dj-sector-4', 'dj-sector-6', 'dj-bragadiru'],
  },
  {
    slug: 'dj-sector-6',
    name: 'Sector 6',
    type: 'sector',
    h1: 'DJ Sector 6 București — Lawre DJ',
    intro:
      'DJ profesionist pentru Sectorul 6 — Drumul Taberei, Militari, Crângași, Giulești. Nunți, botezuri, corporate și petreceri cu DJ activ pe scena de club.',
    body: [
      'Sectorul 6 e zona de vest a Bucureștiului, cu o comunitate activă și o scenă de evenimente în creștere. Militari Residence și Drumul Taberei au generat o cerere mare pentru servicii DJ de calitate.',
      'Diferențiatorul meu față de alți DJs: vin din scena de club, nu sunt un wedding DJ generic. Asta înseamnă citit mai bun al publicului, energie mai bine construită, tranziții curate chiar și la ore târzii.',
      'Acoperire: Drumul Taberei, Militari, Crângași, Giulești, Crangasi, Favorit, Gorjului.',
    ],
    nearbyZones: ['dj-sector-5', 'dj-chitila', 'dj-bragadiru'],
  },
  {
    slug: 'dj-otopeni',
    name: 'Otopeni',
    type: 'oras',
    h1: 'DJ Otopeni — Lawre DJ pentru evenimente în Otopeni',
    intro:
      'Servicii DJ profesionale în Otopeni, Ilfov — nunți, botezuri, corporate și petreceri private. Deplasare inclusă, echipament propriu, ofertă în 24h.',
    body: [
      'Otopeni e una dintre localitățile din Ilfov cu cea mai rapidă creștere — restaurante și săli de evenimente noi, cerere mare pentru servicii DJ de calitate. Sunt deja familiarizat cu mai multe venue-uri din zonă.',
      'Deplasarea în Otopeni e inclusă în prețul pachetelor standard — nu adaug taxe suplimentare pentru distanța față de București.',
      'Acoperire: Otopeni, Odăile, Pipera (zona Ilfov), Balotești.',
    ],
    nearbyZones: ['dj-sector-1', 'dj-voluntari'],
  },
  {
    slug: 'dj-voluntari',
    name: 'Voluntari',
    type: 'oras',
    h1: 'DJ Voluntari — Lawre DJ pentru evenimente în Voluntari',
    intro:
      'DJ pentru nunți, botezuri și petreceri în Voluntari, Ilfov. Locații precum Baneasa Shopping City area, Ștefănești — acoperite integral cu echipament propriu.',
    body: [
      'Voluntari e o comună urbană mare cu multe locații premium pentru evenimente — în special în zona Pipera și Ștefănești. Am mixat în mai multe restaurante și vile din zonă.',
      'Setup complet disponibil: sunet, lumini, microfon. Nu depinzi de echipamentul locației. Bring my own gear — better results, zero surprises.',
      'Acoperire: Voluntari, Pipera, Ștefănești, Colnic, Edera.',
    ],
    nearbyZones: ['dj-sector-2', 'dj-otopeni', 'dj-pantelimon'],
  },
  {
    slug: 'dj-popesti-leordeni',
    name: 'Popești-Leordeni',
    type: 'oras',
    h1: 'DJ Popești-Leordeni — Lawre DJ',
    intro:
      'Servicii DJ în Popești-Leordeni, Ilfov — nunți, botezuri și petreceri private cu sunet profesional. Deplasare din București, ofertă personalizată în 24h.',
    body: [
      'Popești-Leordeni are o scenă de evenimente în creștere, cu restaurante și grădini de vară care găzduiesc nunți și botezuri pe tot parcursul sezonului.',
      'Vin cu echipament propriu, calibrat pentru spațiul vostru — indiferent dacă e o sală mare sau o terasă mai intimă. Muzica e adaptată publicului, nu rulăm același playlist tuturor.',
      'Zonă acoperită: Popești-Leordeni, Leordeni, Văcărești (Ilfov).',
    ],
    nearbyZones: ['dj-sector-3', 'dj-sector-4', 'dj-pantelimon'],
  },
  {
    slug: 'dj-pantelimon',
    name: 'Pantelimon',
    type: 'oras',
    h1: 'DJ Pantelimon — Lawre DJ pentru evenimente în Pantelimon',
    intro:
      'DJ profesionist în Pantelimon, Ilfov — pentru nunți, botezuri, majorat și petreceri private. Prețuri transparente, echipament propriu, răspuns rapid.',
    body: [
      'Pantelimon e o zonă cu o comunitate mare și o cerere constantă pentru evenimente. Restaurantele și sălile de nunți din zonă găzduiesc sute de evenimente pe an.',
      'Aduc experiența de DJ de club la evenimentele private — asta înseamnă energie mai bine construită, playlist gândit, nu improvizat, și prezență profesionistă de la prima până la ultima piesă.',
      'Acoperire: Pantelimon, Mărcuța, Brănești (parțial).',
    ],
    nearbyZones: ['dj-sector-2', 'dj-sector-3', 'dj-voluntari'],
  },
  {
    slug: 'dj-chitila',
    name: 'Chitila',
    type: 'oras',
    h1: 'DJ Chitila — Lawre DJ pentru evenimente în Chitila și Ilfov Nord-Vest',
    intro:
      'Servicii DJ în Chitila, Ilfov — nunți, botezuri și petreceri cu echipament propriu profesional. Zona nord-vest a Ilfovului, deplasare inclusa.',
    body: [
      'Chitila și zona de nord-vest a Ilfovului (Rudeni, Mogoșoaia) au locații de evenimente din ce în ce mai căutate, mai ales pentru nunți în grădini sau vile.',
      'Pachetele mele acoperă toate tipurile de spații — de la terase mici la săli de 300 de persoane. Echipamentul e scalat în funcție de eveniment.',
      'Acoperire: Chitila, Rudeni, Mogoșoaia, Dărăști-Ilfov.',
    ],
    nearbyZones: ['dj-sector-1', 'dj-sector-6', 'dj-bragadiru'],
  },
  {
    slug: 'dj-bragadiru',
    name: 'Bragadiru',
    type: 'oras',
    h1: 'DJ Bragadiru — Lawre DJ pentru evenimente în Bragadiru',
    intro:
      'DJ profesionist în Bragadiru, Ilfov — nunți, botezuri, petreceri private. Zona de sud-vest a Ilfovului, deplasare fără costuri suplimentare.',
    body: [
      'Bragadiru e o localitate în expansiune din sud-vestul Ilfovului, cu acces rapid din Sectorul 5 și 6. Organizez evenimente în zona asta cu regularitate.',
      'Indiferent dacă alegi un pachet Essential sau Platinum, sunetul și prestația sunt la același nivel profesional. Diferă doar ce include pachetul, nu calitatea execuției.',
      'Acoperire: Bragadiru, Clinceni, Cornetu, Jilava.',
    ],
    nearbyZones: ['dj-sector-5', 'dj-sector-6', 'dj-chitila'],
  },
]

export const ZONE_MAP = Object.fromEntries(ZONES.map((z) => [z.slug, z]))

export function buildZoneUrl(slug: string) {
  return `${SITE_URL}/zone-deservite/${slug}`
}
