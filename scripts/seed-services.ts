/**
 * Seed: cele 7 servicii rămase după dj-nunta-bucuresti.
 * Idempotent: update dacă slug există, create altfel.
 *
 * Run with:  pnpm seed:services
 */
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

import { h3, p, pInline, richDoc } from '../src/lib/lexical'
import type { Service } from '../src/payload-types'
import type { getPayload as GetPayloadFn } from 'payload'

type ServiceLayout = NonNullable<Service['layout']>
type PayloadInstance = Awaited<ReturnType<typeof GetPayloadFn>>

type ServiceData = {
  title: string
  slug: string
  eyebrow?: string | null
  shortDescription?: string | null
  startingPrice?: number | null
  relatedPackages: number[]
  layout: ServiceLayout
  seo: {
    metaTitle?: string | null
    metaDescription?: string | null
    canonicalUrl?: string | null
    noindex?: boolean | null
  }
}

// ---------------------------------------------------------------------------
// Helpers (identice cu seed-dj-nunta.ts)
// ---------------------------------------------------------------------------

async function findPackagesBySlug(payload: PayloadInstance, slugs: string[]) {
  const { docs } = await payload.find({
    collection: 'packages',
    where: { slug: { in: slugs } },
    limit: slugs.length,
    depth: 0,
  })
  return docs
}

async function ensurePackage(
  payload: PayloadInstance,
  data: { slug: string; name: string; price: number; tagline: string; features: string[] },
) {
  const existing = await payload.find({
    collection: 'packages',
    where: { slug: { equals: data.slug } },
    limit: 1,
    depth: 0,
  })
  const features = data.features.map((feature) => ({ feature }))
  if (existing.docs[0]) return existing.docs[0]
  const created = await payload.create({
    collection: 'packages',
    data: { slug: data.slug, name: data.name, price: data.price, currency: 'EUR', tagline: data.tagline, features },
  })
  console.log(`  + created package ${data.slug}`)
  return created
}

async function upsertService(
  payload: PayloadInstance,
  slug: string,
  data: ServiceData,
) {
  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'services', id: existing.docs[0].id, data })
    console.log(`[seed] updated  slug=${slug}`)
  } else {
    const created = await payload.create({ collection: 'services', data })
    console.log(`[seed] created  slug=${slug} id=${created.id}`)
  }
}

// ---------------------------------------------------------------------------
// Service definitions
// ---------------------------------------------------------------------------

function buildBotez(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('DJ Botez București — muzică potrivită pentru cel mai important prim an'),
        p(
          'Botezul e primul eveniment din viața copilului vostru și prima amintire pe care o veți păstra împreună. Muzica setează atmosfera: caldă, veselă, fără să copleșească micuțul sau bunicii. Un DJ cu experiență la botezuri știe exact când să urce energia și când să o mențină liniștită — diferența față de un playlist pe Spotify e simțită imediat de invitați.',
        ),
        p(
          'La un botez în București, atmosfera corectă combină muzică românească tradițională cu pop modern, adaptată mereu la vârsta și preferințele familiei. Lawre gestionează tranziția naturală între momentele mai intime și dansul de final — fără momente stânjenitoare sau pauze lungi.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Ce primiți',
      heading: 'De ce contează DJ-ul la un botez',
      columns: '2',
      items: [
        {
          title: 'Repertoriu adaptat evenimentului',
          body: 'Nu e nuntă, nu e club. La botez muzica e mai caldă, mai variată ca gen, cu folk românesc, manele soft și pop internațional în proporții potrivite. Stabiliți voi ce doriți — eu mă adaptez.',
        },
        {
          title: 'Gestionarea momentelor speciale',
          body: 'Intrarea bebelușului, momentul tăierii moțului, toasturile nașilor — le marcăm muzical corect, fără să fie kitsch și fără să fie prea sobru. Fiecare moment are piesa lui.',
        },
        {
          title: 'Echipament potrivit pentru sală mică sau medie',
          body: 'La botez nu e nevoie de sistem de 4000W. Aduc un setup calibrat pe spațiu: sunet clar, lumini discrete, volum confortabil. Microfon wireless inclus pentru discursuri.',
        },
        {
          title: 'Comunicare simplă cu familia',
          body: 'Știu că la botezuri decid doi-trei oameni: părinții și nașii. Comunic direct cu voi toți, confirmat pe WhatsApp. Nicio surpriză în ziua evenimentului.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum funcționează',
      heading: 'Trei pași simpli de la rezervare la eveniment',
      steps: [
        {
          label: 'Discuție inițială (cu 2-4 săptămâni înainte)',
          body: 'Stabilim împreună: stilul muzical preferat de familie, piesele obligatorii (hora, cântece tradiționale sau moderne pentru bebeluș), ce să evităm. Aflăm programul serii: intrare, masă, moț, dans.',
        },
        {
          label: 'Setup în ziua botezului',
          body: 'Sosesc cu 1-2 ore înainte de prima invitație. Montez sistemul, testez microfoanele, verific acustica sălii. Cât tu ești cu bebelușul, eu mă ocup de tot tehnicul.',
        },
        {
          label: 'Mix live pe durata evenimentului',
          body: 'Muzică continuă, adaptată la atmosferă. Cobor volumul pentru discursuri și toasturi, urc energia pe ringul de dans. Gestionez orice cerere de la invitați — cu discernământ.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachete și prețuri pentru botez'),
        p(
          'Botezurile au de obicei 40-120 invitați și 4-6 ore de muzică. Pachetul Essential e perfect pentru botezuri mai restrânse; Premium pentru evenimente de 80-150 invitați cu dans și lumini. Nu există suprataxe ascunse.',
        ),
        pInline('Vezi și ghidul nostru despre ', { text: 'muzica la botez — ce funcționează în 2026', href: '/blog/dj-botez-bucuresti-ghid' }, '.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete pentru botez',
      heading: 'Simplu, transparent, fără surprize.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe părinții înainte de a rezerva DJ-ul pentru botez.',
      items: [
        {
          question: 'Cât costă un DJ la un botez în București?',
          answer: 'Pentru un botez în București, prețul unui DJ profesionist pornește de la 250 € (pachet Essential, 4-5 ore, sală mică) și ajunge la 650 € pentru un eveniment mai mare cu lumini și sistem audio complet. Mediana pieței e în zona 300-450 €. Evitați prețurile sub 150 € — de obicei înseamnă echipament fără backup și experiență limitată cu evenimente de familie.',
        },
        {
          question: 'Ce muzică se pune la un botez?',
          answer: 'La botezuri, repertoriul combină: muzică ușoară și pop internațional în timpul mesei, cântece populare românești pentru momentele tradiționale (moț, hora), și muzică mai ritmată pentru dans în a doua parte. Proporțiile le stabiliți voi — îmi spuneți ce preferați și ce să evităm.',
        },
        {
          question: 'Cât timp durează un botez și câte ore de muzică am nevoie?',
          answer: 'Un botez tipic în București durează 5-7 ore (de la 13:00-14:00 la 20:00-21:00). Pachetul Essential (6 ore) acoperă confortabil. Dacă botezul se prelungește sau includeți și dans serios, pachetul Premium e recomandat.',
        },
        {
          question: 'Pot să solicit piese specifice pentru momentul tăierii moțului sau intrarea bebelușului?',
          answer: 'Absolut, și vă încurajez să o faceți. Momentele cheie — intrarea bebelușului, tăierea moțului, prima poză de familie — se marchează cel mai bine cu o piesă aleasă de voi. Stabiliți lista la consultarea pre-eveniment; eu o integrez natural în mix.',
        },
        {
          question: 'Aduceți și microfon wireless pentru discursuri și toasturi?',
          answer: 'Da, microfonul wireless e inclus în toate pachetele. Îl testăm înainte de eveniment și mă asigur că sunetul e clar în întreaga sală. Gestionez eu predarea microfonului între vorbitori ca să nu existe pauze stânjenitoare.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Ce spun părinții',
      heading: 'Recenzii de la botezuri recente.',
      eventType: 'botez',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Rezervați data botezului înainte să se ocupe.',
      body: 'Trimiteți data, locația și numărul de invitați. Vă confirm disponibilitatea și pachetul potrivit în max 24h.',
      primaryLabel: 'Cere ofertă pentru botez →',
      primaryHref: '/cerere-oferta?service=botez',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'DJ Botez București',
    slug: 'dj-botez-bucuresti',
    eyebrow: 'Disponibil 2026',
    shortDescription: 'Muzică caldă și adaptată pentru botezul copilului vostru — de la intrarea bebelușului până la dansul de final. Repertoriu personalizat, echipament profesional, comunicare directă cu familia și nașii.',
    startingPrice: 250,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Botez București — Lawre DJ | de la 250€',
      metaDescription: 'DJ profesionist pentru botez în București. Muzică caldă adaptată evenimentului, microfon wireless, lumini discrete. Pachete transparente. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-botez-bucuresti',
      noindex: false,
    },
  }
}

function buildCununie(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('DJ Cununie Civilă București — momentul oficial, muzical perfect'),
        p(
          'Cununia civilă e momentul în care vă declarați oficial perechea — și merită o muzică pe măsura emoției. Nu e nevoie de un sistem uriaș, dar nici de Spotify pe telefon. Un DJ la cununie civilă în București asigură tranziții muzicale fluide: intrarea miresei, semnătura actelor, primele felicitări, ieșirea cuplului. Fiecare moment capătă greutate cu piesa potrivită.',
        ),
        p(
          'Mulți cupluri optează pentru DJ și la cununie, nu doar la petrecere — mai ales dacă cununia e la o locație separată (Primărie, salon privat, în aer liber). Lawre poate gestiona ambele momente cu același echipament sau cu setup adaptat locației cununiei.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Ce primiți',
      heading: 'Muzică perfectă la cununia civilă',
      columns: '2',
      items: [
        {
          title: 'Setup rapid și discret',
          body: 'La cununie civilă spațiul e de obicei limitat. Aduc un sistem compact care sună profesional fără să ocupe jumătate din sală. Montaj și demontaj rapid, fără să deranjeze programul.',
        },
        {
          title: 'Piese alese de voi pentru fiecare moment',
          body: 'Intrare mireasă, semnarea actelor, momentul „vă declarați soți", ieșirea cuplului — fiecare are piesa ei, aleasă de voi în prealabil. Tranzițiile sunt fluide, fără tăceri.',
        },
        {
          title: 'Coordonare cu ofițerul stării civile',
          body: 'Știu cum să mă sincronizez cu ceremonia oficială: cobor muzica pentru discursul ofițerului, o ridic discret la momentul sărutului. Am mai făcut asta — nu e improvizat.',
        },
        {
          title: 'Pachet combinat cununie + petrecere',
          body: 'Dacă aveți petrecere după cununie, pot gestiona ambele cu o singură ofertă. Sau doar cununia, dacă petrecerea e la altă dată. Fără pachete rigide.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum funcționează',
      heading: 'Planificăm cununia muzical în trei pași',
      steps: [
        {
          label: 'Consultare pre-eveniment',
          body: 'Stabilim lista pieselor pentru fiecare moment al cununiei, durata estimată a ceremoniei, specificul locației (interior/exterior, dimensiuni, restricții sonore). Dacă urmează și petrecere, planificăm și tranziția.',
        },
        {
          label: 'Setup la locație',
          body: 'Sosesc cu minim 45 minute înainte de cununie. Montez sistemul compact, testez acustica, confirm cu ofițerul stării civile semnalele pentru muzică. Nimic improvizat.',
        },
        {
          label: 'Ceremonia și după',
          body: 'Muzică continuă pe durata cununiei, marcând fiecare moment cheie cu piesa aleasă de voi. Dacă urmează petrecere, dezasamblez rapid și mă pregătesc pentru locația următoare.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Tarife pentru cununie civilă'),
        p('Cununia civilă e de obicei mai scurtă decât o petrecere — 1-3 ore de prezență. Oferim tarif separat pentru cununie, sau pachet combinat cununie + petrecere cu reducere față de prețurile separate.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete disponibile',
      heading: 'Flexibil — doar cununie sau combinat cu petrecere.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe cuplurile despre DJ la cununia civilă.',
      items: [
        {
          question: 'Are nevoie cununia civilă de DJ sau e suficient un playlist pe telefon?',
          answer: 'Depinde de importanța pe care o acordați momentului. Un playlist pe telefon și un difuzor Bluetooth funcționează tehnic, dar un DJ asigură tranziții fluide, volum calibrat pe spațiu, și gestionarea în timp real a momentelor (nimeni nu știe exact când se termină discursul ofițerului). La un eveniment care durează toată viața în amintiri, diferența de cost e mică față de câștigul în calitate.',
        },
        {
          question: 'Cât costă DJ-ul doar pentru cununie civilă, fără petrecere?',
          answer: 'Pentru cununie civilă separată (1-2 ore de prezență), tariful pornește de la 200 €, inclusiv transport în București. Dacă urmează și petrecere în aceeași zi, oferim pachet combinat mai avantajos.',
        },
        {
          question: 'Putem alege orice piese vrem pentru intrarea miresei și celelalte momente?',
          answer: 'Absolut — listele voastre, nu ale mele. Singurul lucru pe care îl verific: dacă piesa are un tempo sau ton nepotrivit cu momentul (ex: o piesă melancolică la ieșirea cuplului), vă semnalez și propun alternative. Decizia finală e a voastră.',
        },
        {
          question: 'Puteți veni și la cununie și la petrecere dacă sunt în locații diferite?',
          answer: 'Da, frecvent fac asta. Important e intervalul de timp între cununie și petrecere — dacă e minimum 90 minute, pot dezasambla, transport și monta din nou. Dacă e mai strâns de atât, discutăm soluții (setup mai simplu la cununie sau ajutor din partea restaurantului pentru intervalul dintre).',
        },
        {
          question: 'Cununia e în aer liber — funcționează sistemul vostru?',
          answer: 'Da, am echipament rezistent la exterior și surse de alimentare portabile (dacă nu există priză în apropiere). Singura variabilă e vântul și reflexia sunetului la exterior — ajustăm EQ-ul și poziționarea boxelor pentru claritate maximă.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Ce spun cuplurile',
      heading: 'Recenzii de la nunți și cununii recente.',
      eventType: 'nunta',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Faceți din cununia civilă un moment cu adevărat special.',
      body: 'Spuneți-ne data, locația și cum vă imaginați ceremonia muzical. Răspund în 24h cu disponibilitate și ofertă personalizată.',
      primaryLabel: 'Cere ofertă cununie civilă →',
      primaryHref: '/cerere-oferta?service=cununie',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'DJ Cununie Civilă București',
    slug: 'dj-cununie-civila',
    eyebrow: 'Disponibil 2026',
    shortDescription: 'Muzică perfectă pentru cununia voastră civilă — de la intrarea miresei până la ieșirea cuplului. Setup compact și discret, piese alese de voi, coordonare cu ofițerul stării civile. Disponibil și pachet combinat cununie + petrecere.',
    startingPrice: 200,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Cununie Civilă București — Lawre DJ | 200€',
      metaDescription: 'DJ profesionist pentru cununie civilă București. Piese alese de voi, setup discret, coordonare cu ceremonia. Disponibil combinat cu petrecerea. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-cununie-civila',
      noindex: false,
    },
  }
}

function buildMajorat(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('DJ Majorat București — 18 ani se serbează o singură dată'),
        p(
          'Majoratul e prima petrecere adevărată — și primul eveniment unde muzica e cu adevărat a tânărului care îl organizează, nu a părinților sau a tradițiilor. Un DJ majorat București trebuie să înțeleagă ce ascultă generația Z, să mențină energetic un public de 16-22 ani timp de 5-6 ore, și să facă tranziția naturală între momentele speciale (intrare, tort, discursuri) și ringul pur de dans.',
        ),
        p(
          'Experiența mea pe scena de club e exact ce face diferența la un majorat: știu ce funcționează live pe un ring de dans, nu doar ce sună bine pe un playlist. De la afrobeats la trap, de la hits românești la EDM — adaptez live în funcție de cum reacționează sala.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'De ce Lawre pentru majorat',
      heading: 'Un DJ cu pulsul scenei actuale',
      columns: '2',
      items: [
        {
          title: 'Muzica generației voastre, nu a părinților',
          body: 'Fără hituri din 2008 sau manele cu care nimeni nu se identifică. Repertoriul e construit din ce ascultați voi: trap românesc, afrobeats, house, pop internațional, K-pop dacă vreți. Voi decideți stilul.',
        },
        {
          title: 'Lumini și atmosferă de club',
          body: 'La majorat lumina contează aproape la fel de mult ca muzica. Aduc moving heads, RGB-uri, fum — un setup care face sala să arate ca un club privat, nu ca o sală de festivități.',
        },
        {
          title: 'Gestionarea momentelor speciale',
          body: 'Intrarea festivă, tortul, dansul special, discursurile — le marcăm muzical exact cum îți imaginezi tu. Le planificăm în avans și le executăm precis în ziua evenimentului.',
        },
        {
          title: 'Flexibil cu cererile de melodii',
          body: 'La majorat publicul vrea să ceară piese. Accept cereri în mod controlat — le integrez când se potrivesc cu atmosfera, fără să sparg vibe-ul pentru o piesă izolată. Ring-ul rămâne plin.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum planificăm',
      heading: 'De la idee la petrecerea perfectă de 18 ani',
      steps: [
        {
          label: 'Consultare pe stilul muzical',
          body: 'Discutăm genurile preferate, artiștii preferați, piesele obligatorii (inclusiv piesa ta de intrare — aia pe care o ai în cap de luni). Stabilim ordinea momentelor speciale și durata fiecăruia.',
        },
        {
          label: 'Setup și soundcheck',
          body: 'Sosesc cu 2 ore înainte. Montez sistemul audio și lumini, fac soundcheck, testez cu muzica ta. Când invitații intră, totul e deja perfect calibrat.',
        },
        {
          label: 'Seara în sine',
          body: 'Mix live adaptat la energia sălii. Urc treptat intensitatea spre miezul nopții. Gestionez momentele speciale exact cum am planificat. Mențin ring-ul plin — asta e treaba mea.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachete pentru majorat'),
        p('Majoratele au de obicei 60-150 invitați și 5-7 ore de muzică. Pachetul Premium e cel mai ales — include lumini de calitate care fac diferența vizuală. Pachetul Essential e potrivit pentru petreceri mai intime, sub 80 invitați.'),
        pInline('Citește și ', { text: 'cum organizezi un majorat memorabil în București', href: '/blog/majorat-18-ani-bucuresti' }, ' — ghid complet cu idei și checklist.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete pentru majorat',
      heading: 'Petrecere privată sau eveniment mare — avem pachetul potrivit.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe părinții și tinerii care organizează majoratul.',
      items: [
        {
          question: 'Cât costă un DJ la un majorat în București?',
          answer: 'Pentru un majorat în București, un DJ profesionist costă între 300 € (pachet Essential, eveniment mic) și 900 € (pachet Platinum cu sistem complet și lumini complexe). Media pentru un majorat de 100-120 invitați e în zona 500-700 €. Prețurile sub 200 € sunt de obicei DJ fără experiență sau echipament închiriat fără backup.',
        },
        {
          question: 'Ce muzică se pune la un majorat în 2026?',
          answer: 'Depinde 100% de preferințele tânărului care îl organizează. Trendul actual combină: trap românesc (Babasha, Azteca), afrobeats (Afrojack, Burna Boy), house comercial, pop internațional (dua lipa, The Weeknd), și hits românești retro când ringul are nevoie de energie garantată. Stabiliți împreună cu mine proporțiile în avans.',
        },
        {
          question: 'Pot să am o intrare festivă specială la majorat?',
          answer: 'Absolut, și e un moment pe care să îl planificăm serios. Alegi piesa, stabilim momentul exact, eu cobor muzica de fundal, anunț intrarea ta dacă vrei, și dau drumul la piesa ta cu volum maxim la momentul potrivit. E unul dintre momentele cele mai memorabile ale serii.',
        },
        {
          question: 'Includeți și lumini speciale, nu doar muzică?',
          answer: 'Da, sistemul de lumini e inclus în pachetele Premium și Platinum (moving heads, RGB, fum). La pachetul Essential am lumini de bază (par-uri LED). Dacă vreți un show de lumini mai elaborat sau efecte speciale (stroboscop, laser), menționați la ofertă — le includ sau le adaug la pachet.',
        },
        {
          question: 'Câte ore durează de obicei un majorat?',
          answer: 'Un majorat tipic durează 6-8 ore, de la 19:00-20:00 la 02:00-03:00. Pachetul Essential include 6 ore, Premium 8 ore. Dacă petrecerea se prelungește natural și aveți Platinum — stau cât e energie.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Ce spun tinerii și părinții',
      heading: 'Recenzii de la majoratele recente.',
      eventType: 'nunta',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: '18 ani se serbează o singură dată — fă-o cum trebuie.',
      body: 'Spune-mi data, locația și cam câți invitați. Confirm disponibilitatea și îți trimit o ofertă personalizată pe stilul tău muzical.',
      primaryLabel: 'Cere ofertă majorat →',
      primaryHref: '/cerere-oferta?service=majorat',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'DJ Majorat București',
    slug: 'dj-majorat-bucuresti',
    eyebrow: 'Disponibil 2026',
    shortDescription: 'DJ profesionist pentru majorat în București — muzica generației tale, lumini de club, intrare festivă și ring plin toată seara. Repertoriu adaptat la stilul tău: trap, afrobeats, house, pop. De la 300€.',
    startingPrice: 300,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Majorat București — Lawre DJ | 18 ani de la 300€',
      metaDescription: 'DJ profesionist pentru majorat în București. Muzica generației tale, lumini de club, intrare festivă personalizată. Pachete transparente. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-majorat-bucuresti',
      noindex: false,
    },
  }
}

function buildCorporate(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('DJ Corporate București — evenimentele de firmă au nevoie de alt tip de DJ'),
        p(
          'Un eveniment corporate nu e o nuntă și nu e un club. Publicul e mixt — colegi de la 25 la 55 de ani, cu gusturi diferite, uneori și clienți sau parteneri importanți în sală. Un DJ corporate București trebuie să creeze o atmosferă plăcută fără să polarizeze: muzică recognoscibilă, volum adecvat pentru conversație în prima parte, energie corectă când vine momentul dansului.',
        ),
        p(
          'Am experiență cu petreceri de Crăciun, teambuilding-uri, lansări de produse și gale anuale. Știu să mă adaplez la dress code-ul evenimentului, să fiu discret cu brandul clientului și să livrez exact ce a promis organizatorul — fără surprize.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Avantaje',
      heading: 'Ce face diferența la un DJ pentru corporate',
      columns: '2',
      items: [
        {
          title: 'Repertoriu neutru și incluziv',
          body: 'Muzică recognoscibilă pentru toți: pop internațional, hits românești fără conotații politice, jazz și lounge pentru cocktail hour, dance floor classics pentru seara târzie. Nimic care să creeze disconfort.',
        },
        {
          title: 'Profesionalism în prezentare',
          body: 'Îmbrăcat potrivit cu dress code-ul evenimentului, discret cu telefonul, nu interacționez cu invitații dacă nu mi se cere. Setup profesional, fără cabluri pe jos și echipament second-hand vizibil.',
        },
        {
          title: 'Adaptabil la programul evenimentului',
          body: 'Cocktail muzică de fundal → cina formală → premii/discursuri → after-party dans. Fiecare fază are sunetul potrivit. Gestionez microfoanele pentru discursuri și prezentări.',
        },
        {
          title: 'Factură și contract — fără probleme pentru contabilitate',
          body: 'Emit factură legală pentru firme, cu toate datele necesare pentru deducere. Contract clar, fără surprize financiare ulterioare.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum lucrăm',
      heading: 'Colaborare simplă cu organizatorul de evenimente',
      steps: [
        {
          label: 'Briefing inițial cu organizatorul',
          body: 'Primesc brief-ul evenimentului: tema, publicul țintă, programul serii, momentele cheie (premii, discursuri, surprize). Stabilim stilul muzical agreat de management și lista de evitat.',
        },
        {
          label: 'Coordonare tehnică cu locația',
          body: 'Merg în avans la locație (sau iau specificațiile tehnice) pentru a calibra sistemul pe spațiu. Testez microfoanele pentru discursuri, confirm cine dă semnalul pentru fiecare fază a serii.',
        },
        {
          label: 'Executarea evenimentului',
          body: 'Livrez exact ce s-a agreat în brief. Dacă ceva se schimbă în timp real (un discurs mai lung, o surpriză de la CEO), mă adaptez fără să creez haos sonor. Organizatorul poate comunica cu mine discret pe tot parcursul serii.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Tarife pentru evenimente corporate'),
        p('Evenimentele corporate au specificații diferite față de nunți sau botezuri. Emitem ofertă personalizată bazată pe: număr de invitați, durata evenimentului, necesități tehnice speciale (microfoane suplimentare, sistem pentru prezentare video, etc.).'),
        pInline('Citește și ', { text: 'cum alegi un DJ pentru petrecerea de Crăciun a firmei', href: '/blog/dj-corporate-petrecere-craciun' }, ' — ghid pentru organizatori.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete de bază',
      heading: 'Ofertă personalizată disponibilă la cerere.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce întreabă organizatorii de evenimente corporate.',
      items: [
        {
          question: 'Cât costă un DJ la o petrecere de firmă în București?',
          answer: 'Pentru un eveniment corporate în București, tariful pornește de la 400 € (eveniment de până în 100 persoane, 4-5 ore) și ajunge la 1500 €+ pentru gale sau petreceri mari cu sistem complex. Spre deosebire de nunți, la corporate contează mai mult flexibilitatea programului și capacitatea de a gestiona microfoane/prezentări — de aceea nu recomand cel mai ieftin furnizor.',
        },
        {
          question: 'Puteți emite factură pentru firme?',
          answer: 'Da, emiți factură legală cu toate datele necesare: CUI furnizor, denumire serviciu, valoare, TVA dacă e cazul. Contractul scris e standard pentru orice eveniment corporate.',
        },
        {
          question: 'Puteți gestiona și microfoanele pentru discursuri sau prezentări?',
          answer: 'Da, includ microfoane wireless în toate pachetele și pot gestiona tranziția între muzică și discursuri fără să creez goluri sonore stânjenitoare. Dacă evenimentul include și prezentare video/PowerPoint, coordonăm cu tehnicianul AV al locației.',
        },
        {
          question: 'Ce muzică puneți la un teambuilding sau petrecere de Crăciun?',
          answer: 'Structura tipică: cocktail hour cu jazz/bossa nova/lounge → cina cu pop internațional recognoscibil mediu → after dinner cu hits dance floor pentru toate vârstele. Evit piesele politice, religioase sau cu versuri controversate. Vă trimit propunerea de repertoriu spre aprobare dacă vreți.',
        },
        {
          question: 'Cât timp înainte de eveniment trebuie să facem rezervarea?',
          answer: 'Pentru evenimente corporate mari (100+ persoane, gale), recomand 2-4 luni înainte. Pentru petreceri mai mici de Crăciun sau teambuilding, 4-6 săptămâni e suficient în afara perioadelor aglomerate (noiembrie-decembrie e peak season pentru corporate).',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Referințe corporate',
      heading: 'Feedback de la clienți business.',
      eventType: 'corporate',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Ofertă personalizată pentru evenimentul vostru corporate.',
      body: 'Trimiteți brief-ul: data, locația, numărul de invitați și tipul evenimentului. Răspund în 24h cu disponibilitate și ofertă detaliată.',
      primaryLabel: 'Cere ofertă corporate →',
      primaryHref: '/cerere-oferta?service=corporate',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'DJ Corporate București',
    slug: 'dj-corporate-bucuresti',
    eyebrow: 'Evenimente business 2026',
    shortDescription: 'DJ profesionist pentru evenimente corporate în București — petreceri de Crăciun, teambuilding, gale anuale. Repertoriu incluziv, prezentare impecabilă, factură și contract. Ofertă personalizată la cerere.',
    startingPrice: 400,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Corporate București — Lawre DJ | Evenimente',
      metaDescription: 'DJ profesionist corporate București. Crăciun, teambuilding, gale. Factură legală, contract, repertoriu incluziv pentru orice public. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-corporate-bucuresti',
      noindex: false,
    },
  }
}

function buildClub(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('DJ Club București — rezidențe și gig-uri pentru cluburi și venue-uri'),
        p(
          'Scena de club din București e competitivă și exigentă. Dacă conduci un club sau un venue și cauți un DJ pentru rezidență sau gig-uri periodice, Lawre e activ pe scena locală — nu e un wedding DJ care încearcă să facă și club. E diferența dintre cineva care știe să citească un ring de club la 01:00 și cineva care copiază ce a funcționat la o nuntă.',
        ),
        p(
          'Experiența include gig-uri în cluburi și baruri din București, mix-uri înregistrate în stiluri house, techno-ish, afrobeats și Romanian dance. Disponibil pentru: rezidențe săptămânale sau lunare, seri tematice, petreceri private în venue-uri, open air-uri.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Ce aduce Lawre',
      heading: 'DJ activ pe scena de club, nu adaptat din wedding',
      columns: '2',
      items: [
        {
          title: 'Citire reală a ringului de club',
          body: 'Știu diferența dintre un ring cald (oamenii tocmai au intrat) și unul fierbinte (ai 30 de minute la peak). Știu când să urc BPM-ul, când să dau un track neașteptat care reactivează energia, și când să nu mă joc cu experimentele.',
        },
        {
          title: 'Mix tehnic de calitate',
          body: 'Beatmatching manual, EQ live, mixing în frecvențe — nu doar crossfade pe Auto Sync. Seturile se înregistrează și le poți folosi ca material promoțional pentru clubul tău.',
        },
        {
          title: 'Flexibilitate de program și stiluri',
          body: 'Disponibil pentru sloturi de la 22:00 la 05:00, sau matineuri. House, afrobeats, commercial dance, techno-adjacent — mai multe stiluri în repertoriu, adaptabil la identitatea venue-ului.',
        },
        {
          title: 'Profesionalism și punctualitate',
          body: 'Sunt la venue cu 45 minute înainte de slotul meu. Nu am nevoie de rider de 3 pagini. Știu să lucrez cu tehnicianul casei. Nu creez probleme.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum colaborăm',
      heading: 'De la prima discuție la rezidență',
      steps: [
        {
          label: 'Discuție despre venue și public',
          body: 'Îmi spui ce tip de public are clubul tău, ce stiluri muzicale funcționează, ce orar ai nevoie să acoperi. Dacă vrei, trimit seturi anterioare înregistrate pentru a verifica stilul.',
        },
        {
          label: 'Gig de probă',
          body: 'De obicei propun un gig de probă (sau un back-to-back cu DJ-ul vostru resident) pentru a vedea cum interacționăm cu publicul vostru specific. Fără contract pe termen lung înainte de proba asta.',
        },
        {
          label: 'Rezidență sau colaborare continuă',
          body: 'Dacă merge, stabilim un ritm: săptămânal, de două ori pe lună, lunar. Tariful pentru rezidențe pe termen lung e mai avantajos decât gig-urile izolate.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Tarife pentru gig-uri de club'),
        p('Tarifele pentru club depind de: durata slotului, tipul evenimentului (noapte obișnuită vs. eveniment special), dacă e rezidență sau gig izolat. Contactează direct pentru o discuție — nu am un tarif fix listat pentru club, fiindcă fiecare colaborare e diferită.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Referință de prețuri',
      heading: 'Gig-uri izolate sau rezidențe — tarif la cerere.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe managerii de cluburi și venue-uri.',
      items: [
        {
          question: 'Ce stiluri muzicale mixezi pentru club?',
          answer: 'Stilurile principale: house (deep, afro, melodic), afrobeats / Afro-house, commercial dance și Romanian pop pentru venue-uri mai mainstream, și occasional techno-adjacent pentru seri speciale. Nu mixez trance sau metal. Dacă venue-ul vostru are un stil specific, trimiteți câteva referințe și verificăm compatibilitatea.',
        },
        {
          question: 'Ai seturi înregistrate pe care le pot asculta?',
          answer: 'Da, seturi live și mix-uri studio disponibile pe request. Le trimit direct pe email sau WhatsApp. Sunt și pe SoundCloud — link la cerere.',
        },
        {
          question: 'Poți lucra cu echipamentul nostru din club sau aduci propriul setup?',
          answer: 'Prefer să lucrez cu Pioneer CDJ/XDJ + DJM (standard industrie). Dacă aveți echipament Pioneer în booth, perfect — aduc doar muzica pe USB. Dacă echipamentul e diferit, îmi spuneți din timp ce aveți și vedem compatibilitatea.',
        },
        {
          question: 'Ești disponibil pentru rezidențe pe termen lung?',
          answer: 'Da, rezidențele sunt varianta preferată — creezi o relație cu publicul venue-ului tău, iar tarifele sunt mai avantajoase față de gig-uri izolate. Minim 4-6 gig-uri pentru a considera o colaborare rezidenție.',
        },
        {
          question: 'Ce se întâmplă dacă trebuie să anulez un gig de rezidență?',
          answer: 'Cu minim 7 zile înainte — fără penalizare, propun un alt DJ de înlocuire dacă ai nevoie. Sub 7 zile — se aplică o penalizare parțială (50% din tarif). Același lucru e valabil și invers: dacă clubul anulează sub 7 zile, tariful e datorat parțial.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Feedback',
      heading: 'Ce spun partenerii noștri.',
      eventType: 'club',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Vrei un DJ cu experiență reală de club în lineup-ul tău?',
      body: 'Spune-mi tipul venue-ului, publicul și ce slot ai nevoie să acoperi. Discutăm direct și rapid.',
      primaryLabel: 'Contactează pentru colaborare club →',
      primaryHref: '/cerere-oferta?service=club',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'DJ Club & Rezidență București',
    slug: 'dj-club-rezidenta',
    eyebrow: 'Disponibil pentru gig-uri & rezidențe',
    shortDescription: 'DJ activ pe scena de club din București — gig-uri izolate și rezidențe pentru cluburi și venue-uri. House, afrobeats, commercial dance. Mix tehnic de calitate, punctualitate, fără rider complicat.',
    startingPrice: 500,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Club București — Lawre DJ | Rezidențe & Gig-uri',
      metaDescription: 'DJ activ pe scena de club București. Rezidențe și gig-uri pentru venue-uri. House, afrobeats, commercial dance. Mix tehnic, punctual. Contactează.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-club-rezidenta',
      noindex: false,
    },
  }
}

function buildPetrecere(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('DJ Petrecere Privată București — când vrei ceva cu adevărat al tău'),
        p(
          'Petrecerea privată e cel mai liber tip de eveniment: nu există protocol de nuntă, nu există management de firmă, nu există bunici care trebuie luați în calcul. Ești tu, prietenii tăi și muzica pe care o vreți — și atât. Un DJ petrecere privată București înseamnă exact asta: muzica voastră, în stilul vostru, fără compromisuri.',
        ),
        p(
          'Indiferent că e o petrecere de 20 sau de 200 de persoane, într-un apartament sau o vilă, Lawre aduce echipamentul potrivit și se adaptează la atmosfera pe care o vreți voi. Fără pachete rigide, fără playlist standard.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'De ce contează',
      heading: 'Ce face un DJ petrecere privată mai bun decât un playlist',
      columns: '2',
      items: [
        {
          title: 'Mix live, nu shuffle',
          body: 'Un playlist pe Spotify e aleatoriu și impersonal. Un DJ citește atmosfera din sală — știe când publicul vrea energie, când vrea ceva mai relaxat, și cum să facă tranziția fără să spargă vibe-ul.',
        },
        {
          title: 'Echipament calibrat pe spațiu',
          body: 'Bloc apartament vs. vilă vs. terasă — fiecare spațiu are nevoie de alt setup. Aduc exact ce e necesar: nici prea puțin (sunet slab), nici prea mult (vecini supărați la 23:00).',
        },
        {
          title: 'Stilul muzical total la alegerea voastră',
          body: 'Nu am un repertoriu standard de petrecere privată. Spuneți-mi ce ascultați — trap, R&B, 80s, techno, manele, K-pop — și construiesc seara în jurul asta.',
        },
        {
          title: 'Disponibil și pentru spații mai mici',
          body: 'Nu fac discriminare bazată pe numărul de invitați. Dacă vreți DJ la o petrecere de 25 de persoane într-un apartament frumos, aduc un setup compact care sună bine fără să deranjeze blocul.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Simplu și rapid',
      heading: 'Cum rezervi un DJ pentru petrecerea ta privată',
      steps: [
        {
          label: 'Contactezi și îmi spui ce vrei',
          body: 'Data, locația, numărul aproximativ de invitați, stilul muzical preferat. Dacă nu știi exact ce stil vrei, îmi spui câțiva artiști sau piese pe care îi ascultați și pornesc de acolo.',
        },
        {
          label: 'Primești oferta și confirmi',
          body: 'Îți trimit tariful în funcție de durata și locația evenimentului, confirmi cu un avans, și gata — data e rezervată. Simplu.',
        },
        {
          label: 'Petrecerea',
          body: 'Sosesc în avans, montez echipamentul, și de la ora convenită mixez live. Adaptez în timp real la energia din sală. Tu te distrezi, eu mă ocup de muzică.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Prețuri petrecere privată'),
        p('Petrecerile private au tarife mai mici față de nunți sau corporate, fiindcă de obicei sunt mai scurte și fără coordonare complexă. Tariful de bază pornește de la 250 € pentru 4 ore. Spune-mi detaliile și îți trimit un preț concret în câteva ore.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Referință prețuri',
      heading: 'De la petrecere mică la party mare — avem soluție.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Răspunsuri pentru cei care organizează o petrecere privată.',
      items: [
        {
          question: 'Cât costă un DJ la o petrecere privată în București?',
          answer: 'Tarifele pentru petreceri private în București pornesc de la 250 € pentru 4 ore (setup compact, eveniment până în 50 persoane) și ajung la 700-900 € pentru petreceri mari cu sistem audio complet și lumini. E mai ieftin decât o nuntă fiindcă nu există logistica la fel de complexă.',
        },
        {
          question: 'Veniți și la petreceri în apartamente sau doar la săli?',
          answer: 'Da, vin și în apartamente sau vile private. Aduc un setup compact (2 boxe active de putere medie, mixer, microfon opțional) care sună bine fără să fie excesiv pentru spațiu mic. Singurul lucru important: priză standard și minim 10mp spațiu pentru echipament.',
        },
        {
          question: 'Pot pune și manele sau muzică specifică unui anumit gen?',
          answer: 'Da, fără judecată. E petrecerea voastră privată — dacă vreți manele, le puneți. Dacă vreți 5 ore de R&B, le aveți. Dacă vreți un mix de 80s și afrobeats, se poate. Îmi spuneți ce vreți și livrez.',
        },
        {
          question: 'Câte ore durează de obicei o petrecere privată?',
          answer: 'Petrecerile private durează de obicei 4-6 ore. Pachetul Essential (6 ore) e potrivit pentru cele mai multe. Dacă petrecerea se prelungește, putem conveni suplimentul de ore la tarif pe oră.',
        },
        {
          question: 'Aduceți și lumini sau doar sunet?',
          answer: 'La petreceri private mai mici aduc de obicei sunet + 2-4 par-uri LED care creează atmosferă fără să fie exagerat. Dacă vreți lumini mai spectaculoase (moving heads, fum), adaug la pachet — menționați la ofertă.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Ce spun oamenii',
      heading: 'Feedback de la petreceri private.',
      eventType: 'privata',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Petrecerea ta, muzica ta.',
      body: 'Spune-mi data, locul și stilul. Primești oferta în câteva ore, nu în câteva zile.',
      primaryLabel: 'Cere ofertă petrecere privată →',
      primaryHref: '/cerere-oferta?service=petrecere',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'DJ Petrecere Privată București',
    slug: 'dj-petrecere-privata',
    eyebrow: 'Disponibil oricând',
    shortDescription: 'DJ pentru petreceri private în București — apartamente, vile, terase. Stilul muzical total la alegerea ta: trap, R&B, manele, 80s, techno. Fără playlist standard. De la 250€ pentru 4 ore.',
    startingPrice: 250,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Petrecere Privată București — Lawre DJ | 250€',
      metaDescription: 'DJ pentru petreceri private București. Apartamente, vile, terase. Orice stil muzical, echipament calibrat pe spațiu. Ofertă rapidă. Cere acum.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-petrecere-privata',
      noindex: false,
    },
  }
}

function buildSonorizare(relatedPackageIds: number[]): ServiceData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        h3('Sonorizare Evenimente București — sunet profesional pentru orice tip de eveniment'),
        p(
          'Sonorizarea unui eveniment în București nu înseamnă doar să pui niște boxe și să dai drumul la volum. Înseamnă să ai sunetul potrivit în sala potrivită: claritate vocală pentru conferințe și prezentări, putere și bas pentru petreceri, acoperire uniformă pentru evenimente în aer liber. Fiecare spațiu are acustica lui, fiecare eveniment are cerințele lui.',
        ),
        p(
          'Lawre oferă servicii de sonorizare evenimente București cu echipament profesional Pioneer, RCF și Shure — pentru conferințe, lansări de produse, spectacole mici, concerte unplugged, petreceri în aer liber și altele. Cu sau fără DJ, cu sau fără operator tehnic dedicat.',
        ),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Servicii de sonorizare',
      heading: 'Echipament profesional pentru orice tip de eveniment',
      columns: '2',
      items: [
        {
          title: 'Sisteme audio pentru interior și exterior',
          body: 'Boxe active de până la 4000W RMS, sub-uri pentru bas profund, monitoare pentru scenă — calibrabile pe orice spațiu. Am soluții pentru săli mici de 50 persoane și pentru outdoor-uri de 500+.',
        },
        {
          title: 'Microfoane pentru orice situație',
          body: 'Wireless Shure pentru discursuri și prezentări, microfoane de scenă, lavaliere pentru conferențiari — închiriate și operate de noi sau doar închiriate cu instrucțiuni.',
        },
        {
          title: 'Operator tehnic inclus sau separat',
          body: 'Poți închiria echipamentul cu operator tehnic dedicat (recomand pentru conferințe și spectacole) sau fără operator dacă ai echipă proprie. Ambele variante disponibile.',
        },
        {
          title: 'Setup și demontaj inclus',
          body: 'Nu plătești separat pentru montaj și demontaj. Venim în avans, instalăm, testăm, asistăm evenimentul și strângem totul după. Tu te concentrezi pe conținut.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum lucrăm',
      heading: 'De la cerință la eveniment sonorizat profesional',
      steps: [
        {
          label: 'Evaluarea nevoilor tehnice',
          body: 'Îmi spui tipul evenimentului, spațiul (dimensiuni, interior/exterior), numărul de persoane, ce ai nevoie (muzică, microfoane, monitoare, sub-uri). Îți trimit specificațiile tehnice și un tarif.',
        },
        {
          label: 'Vizită tehnică sau plan de setup',
          body: 'Pentru evenimente mai mari, vizitez locația în avans pentru a planifica poziționarea echipamentului, lungimea cablurilor și sursele de curent. Pentru evenimente mici, e suficient un plan pe e-mail.',
        },
        {
          label: 'Evenimentul',
          body: 'Sosesc cu timp suficient pentru setup complet și soundcheck. Dacă e cu operator tehnic, cineva e la mixer pe toată durata evenimentului. Dacă e fără, instalez, testez și lăs instrucțiuni clare.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Tarife sonorizare evenimente'),
        p('Tarifele variază în funcție de tipul și dimensiunea evenimentului. Un sistem de bază pentru o conferință de 50 persoane pornește de la 300 €; un sistem complet pentru un outdoor de 300 persoane poate ajunge la 1500 €+. Contactați pentru ofertă personalizată.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Referință echipamente',
      heading: 'Pachete adaptabile — ofertă la cerere.',
      packages: [],
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce trebuie să știți despre sonorizarea unui eveniment.',
      items: [
        {
          question: 'Cât costă sonorizarea unui eveniment în București?',
          answer: 'Prețul sonorizării unui eveniment în București depinde de: tipul spațiului (interior vs. exterior), numărul de persoane, tipul evenimentului (conferință, concert, petrecere) și dacă aveți nevoie de operator tehnic. Orientativ: 300-500 € pentru un eveniment interior de 50-100 persoane; 800-1500 € pentru outdoor-uri mari sau spectacole. Cerere ofertă pentru prețul exact.',
        },
        {
          question: 'Puteți sonoriza și conferințe sau prezentări de business, nu doar petreceri?',
          answer: 'Da, sonorizăm orice tip de eveniment: conferințe, lansări de produse, seminare, workshop-uri, spectacole mici, concerte acustice, petreceri, outdoor-uri. Configurăm sistemul în funcție de cerința specifică — claritate vocală pentru vorbit, putere și bas pentru muzică.',
        },
        {
          question: 'Trebuie să închiez echipamentul de la voi sau pot folosi echipamentul locației?',
          answer: 'Poți folosi echipamentul locației dacă e de calitate profesională — verificăm înainte. Dacă nu e suficient sau nu există, oferim înlocuire sau completare cu echipamentul nostru. Preferabil să știm din timp pentru a planifica corect.',
        },
        {
          question: 'Veniți și la outdoor-uri sau doar interior?',
          answer: 'Da, avem experiență cu outdoor-uri: grădini de evenimente, terase, parcuri, curtea vilei. Echipamentul e rezistent la exterior. Singurul lucru important: surse de curent în apropiere sau generator (putem recomanda furnizori de generator dacă nu aveți).',
        },
        {
          question: 'Pot închiria echipamentul fără operator, dacă avem propriul tehnician?',
          answer: 'Da, oferim și închiriere simplă fără operator. Venim cu echipamentul, facem un test inițial împreună cu tehnicianul vostru, și vă lăsăm să gestionați. La final strângem echipamentul noi. Tariful e mai mic față de varianta cu operator dedicat.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Feedback clienți',
      heading: 'Ce spun organizatorii de evenimente.',
      eventType: 'nunta',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Sunet profesional pentru evenimentul vostru.',
      body: 'Spuneți-ne tipul evenimentului, spațiul și data. Primești o ofertă detaliată în 24h.',
      primaryLabel: 'Cere ofertă sonorizare →',
      primaryHref: '/cerere-oferta?service=sonorizare',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    title: 'Sonorizare Evenimente București',
    slug: 'sonorizare-evenimente',
    eyebrow: 'Echipament profesional disponibil',
    shortDescription: 'Sonorizare profesională pentru orice tip de eveniment în București — conferințe, petreceri, spectacole, outdoor-uri. Sistem Pioneer/RCF/Shure, microfoane wireless, operator tehnic. Ofertă personalizată.',
    startingPrice: 300,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'Sonorizare Evenimente București — Lawre DJ',
      metaDescription: 'Sonorizare profesională evenimente București. Conferințe, petreceri, outdoor-uri. Pioneer, RCF, Shure. Cu sau fără operator tehnic. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/sonorizare-evenimente',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: await configPromise })
  console.log('[seed] connected to Payload')

  const baseline = [
    {
      slug: 'essential',
      name: 'Essential',
      price: 350,
      tagline: 'Petreceri private, botezuri mici, până în 80 invitați.',
      features: [
        '6 ore de mix live',
        '2x boxe active (până la 800W RMS)',
        '1x microfon wireless',
        'Lumini de bază (4 par-uri LED)',
        'Deplasare București + Ilfov',
      ],
    },
    {
      slug: 'premium',
      name: 'Premium',
      price: 650,
      tagline: 'Nunți medii, botezuri, corporate până în 200 invitați.',
      features: [
        '8 ore de mix live (până la 02:00)',
        '2x top-uri + 2x sub-uri (2000W RMS)',
        '2x microfoane Shure wireless',
        '4x moving heads + 2x par LED + fum',
        'Coordonare cu fotograf & restaurant',
        'Backup echipament inclus',
      ],
    },
    {
      slug: 'platinum',
      name: 'Platinum',
      price: 1100,
      tagline: 'Nunți mari, corporate până în 500+ invitați.',
      features: [
        'Mix live nelimitat (până dimineața)',
        'Sistem line array (4000W RMS)',
        '4x microfoane wireless + monitor',
        'Light show complet + lasere',
        'Tehnician sunet dedicat',
        'Backup echipament dublat',
      ],
    },
  ]

  for (const pkg of baseline) {
    await ensurePackage(payload, pkg)
  }

  const packages = await findPackagesBySlug(payload, ['essential', 'premium', 'platinum'])
  const relatedPackageIds: number[] = packages.map((p) => p.id as number)
  console.log(`[seed] linked packages: ${packages.map((p) => p.slug).join(', ')}`)

  const services = [
    { slug: 'dj-botez-bucuresti', data: buildBotez(relatedPackageIds) },
    { slug: 'dj-cununie-civila', data: buildCununie(relatedPackageIds) },
    { slug: 'dj-majorat-bucuresti', data: buildMajorat(relatedPackageIds) },
    { slug: 'dj-corporate-bucuresti', data: buildCorporate(relatedPackageIds) },
    { slug: 'dj-club-rezidenta', data: buildClub(relatedPackageIds) },
    { slug: 'dj-petrecere-privata', data: buildPetrecere(relatedPackageIds) },
    { slug: 'sonorizare-evenimente', data: buildSonorizare(relatedPackageIds) },
  ]

  for (const svc of services) {
    await upsertService(payload, svc.slug, svc.data)
  }

  console.log('[seed] done — 7 services seeded')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed] failed', err)
  process.exit(1)
})
