/**
 * Seed: actualizează serviciile cu conținut detaliat (Faza 3.1).
 * Idempotent: poate fi rulat de mai multe ori.
 *
 * Run with: pnpm seed:services-detailed
 */
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

import {
  h3,
  h4,
  p,
  pBold,
  pInline,
  richDoc,
  ul,
} from '../src/lib/lexical'
import type { Service } from '../src/payload-types'
import type { getPayload as GetPayloadFn } from 'payload'

type ServiceLayout = NonNullable<Service['layout']>
type PayloadInstance = Awaited<ReturnType<typeof GetPayloadFn>>

type ServiceUpdateData = {
  eyebrow?: string
  shortDescription?: string
  startingPrice?: number
  layout: ServiceLayout
  seo: {
    metaTitle?: string
    metaDescription?: string
    canonicalUrl?: string
    noindex?: boolean
  }
}

async function findPackagesBySlug(payload: PayloadInstance, slugs: string[]) {
  const { docs } = await payload.find({
    collection: 'packages',
    where: { slug: { in: slugs } },
    limit: slugs.length,
    depth: 0,
  })
  return docs
}

async function upsertService(
  payload: PayloadInstance,
  slug: string,
  data: ServiceUpdateData,
) {
  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'services', id: existing.docs[0].id, data })
    console.log(`[seed:detailed] updated  slug=${slug}`)
  } else {
    console.log(`[seed:detailed] skip (not found): ${slug}`)
  }
}

// ---------------------------------------------------------------------------
// BOTEZ
// ---------------------------------------------------------------------------

function buildBotezDetailed(pkgIds: number[]): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Botezul e diferit de orice alt eveniment de viață. Spre deosebire de o nuntă — unde publicul e relativ omogen ca vârstă — la botez ai trei generații în aceeași sală: bunici de 70+, părinții de 30-40 și prietenii noi cu copii mici. Repertoriul muzical trebuie să meargă fluid de la "Mireasa frumoasă" și momentele tradiționale la pop modern și hituri internaționale, fără să le piardă pe niciuna din generații.'),
        p('Lucrez cu părinți din București pe botezuri între 50 și 200 de invitați — în restaurante, săli de evenimente, vile cu grădină, pensiuni sau locații proprietate. Fie că vreți un eveniment foarte tradițional (cu cumetria, momentul torței, hora în jurul mesei), fie unul mai modern (cocktail bar, photo booth, prima parte tradițională + petrecere energică), reușesc să țin lumea în atmosferă fără efort.'),
        p('Botezul nu e doar o petrecere. E un moment cu greutate emoțională — primul eveniment major din viața copilului. Asta înseamnă că muzica trebuie să fie corectă în fiecare moment cheie: la intrarea în sală, la cumetria, la tăierea torței, la primul dans cu nașii. Greșelile muzicale de la botez se țin minte ani întregi — filmul cu botezul îl vor revedea părinții și copilul la 18 ani.'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'De ce Lawre la botezul vostru',
      heading: 'Repertoriu și coordonare pentru toate momentele',
      columns: '2',
      items: [
        {
          title: 'Repertoriu real cross-generațional',
          body: 'Nu am playlist standard de botez pe care îl repet identic. Construiesc setlist-ul pe baza listei voastre + cunoașterea specifică a publicului tradițional românesc. Florin Salam pentru bunici, Despacito pentru părinți, hituri internaționale pentru prieteni — toate orchestrate, nu aruncate haotic.',
        },
        {
          title: 'Înțeleg momentele tradiționale',
          body: 'Cumetria, lapte și miere, momentul torței, hora cu nașii, dansul moașei — știu ordinea, momentul potrivit, melodiile asociate fiecăruia. Coordonez direct cu maestrul de ceremonii și cu nașii fără să trebuiască să mă învețe nimeni cum se face un botez românesc tradițional.',
        },
        {
          title: 'Volum potrivit pentru copii și seniori',
          body: 'La botezuri sunt copii mici (sub 5 ani) și bunici. Volumul în prima parte trebuie să permită conversații și să nu sperie copiii. În a doua parte urcăm energia, dar nu la nivel de club. Calibrarea volumului în timp real e esențială.',
        },
        {
          title: 'Coordonare cu fotograful pentru momentele cheie',
          body: 'Tăierea torței, momentul nașilor, primul dans cu copilul, lapte și miere — toate au cue muzical sincronizat cu fotograful. Vorbesc direct cu fotograful înainte de eveniment, nu las coordonarea la voia întâmplării.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum se desfășoară',
      heading: 'De la discuția inițială la petrecerea de seară',
      steps: [
        {
          label: 'Discuția pre-eveniment',
          body: 'Call de 30-45 minute. Stabilim structura completă, ora exactă a momentelor cheie, lista melodiilor obligatorii (intrare în sală, hora nașilor, primul dans cu copilul, melodii speciale ale familiei), tonul evenimentului (tradițional sau modern), preferințele invitaților cheie.',
        },
        {
          label: 'Setup și coordonare în ziua botezului',
          body: 'Sosesc cu 90-120 minute înainte de prima invitație programată. Setup audio + lumini finalizat înainte să apară primii invitați. Soundcheck cu fotograful și cu maestrul de ceremonii. Verificare microfoane pentru momentele de discursuri și anunțuri ale nașilor.',
        },
        {
          label: 'Mix structurat pe fazele evenimentului',
          body: 'Welcome (sosire invitați): ambient pop calm. Masa: mix instrumental + popular românesc light, volum redus pentru conversații. Cumetria și torța: cue exact cu anunțurile maestrului. Petrecerea (după 21:00-22:00): tranziție în energy mode — etno-house, manele moderne, pop internațional.',
        },
        {
          label: 'Wrap-up și amintire',
          body: 'La sfârșit, 1-2 melodii "anthem" care semnează seara (o piesă tradițională + o piesă pop iubită de toți). La cerere, înregistrarea audio a seturilor cheie (hora nașilor, primul dans). Feedback sincer a doua zi — mă ajută să mă îmbunătățesc.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachetele recomandate pentru botez'),
        pBold('Essential (350-500 €) — pentru botezuri mici:'),
        ul([
          'Până la 80 de invitați, eveniment de 4-6 ore mix',
          'Sistem audio basic suficient pentru sală mică',
          '1 microfon wireless pentru maestrul de ceremonii',
          'Lumini de bază (4 par-uri LED)',
          'Pentru: botezuri intime, prânz lung, locații cu sound system existent',
        ]),
        pBold('Premium (650-900 €) — standardul recomandat pentru botez:'),
        ul([
          '100-200 de invitați, 8 ore de mix',
          'Sistem audio top + sub (suficient pentru orice restaurant standard)',
          '2 microfoane Shure wireless (maestru + backup)',
          'Moving heads (4x) + mașină de fum subtilă pentru petrecerea de seară',
          'Coordonare extinsă cu fotograful și restaurantul',
          'Backup echipament inclus',
        ]),
        p('Botezurile rar trec în zona Platinum — în general nu necesită line array. Dacă aveți peste 250 de invitați sau locație outdoor cu cort, discutăm specific.'),
        pInline('Citește și ', { text: 'ghidul complet DJ Botez București', href: '/blog/ghid-complet-dj-botez-bucuresti' }, ' — ce să întrebați, ce să evitați.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete pentru botez',
      heading: 'Simplu, transparent, fără surprize.',
      packages: pkgIds,
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Tipuri de botezuri cu care lucrez'),
        ul([
          'Botezuri de prânz (12:00-19:00) — cu masă lungă urmată de petrecere de seară. Cele mai comune în București.',
          'Botezuri de seară (17:00-02:00) — mai compacte ca timp, dar cu energie de petrecere de la început.',
          'Botezuri tradiționale "de la țară" — cu cumetria în detaliu, multă muzică românească, hora cu toți invitații.',
          'Botezuri "moderne urbane" — accent pe eveniment ca petrecere de prieteni, repertoriu predominant internațional.',
          'Botezuri combinate cu cununie civilă — un singur eveniment care comemorează ambele momente.',
          'Botezuri cu mulți invitați străini — repertoriu adaptat, cumetria explicată în engleză dacă nașii nu vorbesc română.',
        ]),
        h3('Locații populare din București'),
        p('Am lucrat la botezuri în multe restaurante și săli de evenimente. Câteva locații pe care le cunosc bine: Casa Doina (Aviatorilor), Bordei (Sector 1), Vila Dorobanți (Dorobanți), Casa Universitarilor, JW Marriott Ballroom pentru botezuri premium cu 150+ invitați, pensiuni în Băneasa și Otopeni pentru outdoor cu grădină. Dacă locația voastră nu e în listă, vin la o vizită tehnică la cerere.'),
      ),
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe părinții înainte de a rezerva DJ-ul pentru botez.',
      items: [
        {
          question: 'Cât costă un DJ profesionist la un botez în București?',
          answer: 'Pentru un botez de 100-150 de invitați, prețul realist al unui DJ profesionist este 600-800 €. Mai puțin de 350 € înseamnă pachet limitat fără backup și lumini moving heads. Mai mult de 1000 € e justificat doar pentru botezuri foarte mari (300+ invitați) sau locații cu cerințe tehnice speciale.',
        },
        {
          question: 'Cu cât timp înainte trebuie să rezerv DJ-ul pentru botez?',
          answer: 'Pentru weekend-uri în lunile de high season (mai-iulie, septembrie-octombrie), recomand cu 3-4 luni înainte. Pentru ianuarie, februarie, august — 6-8 săptămâni e suficient. Botezurile au mai multă flexibilitate decât nunțile (multe se programează duminica).',
        },
        {
          question: 'Faceți și momentul tradițional cu cumetria, hora și lapte și miere?',
          answer: 'Da, complet. Am repertoriu de melodii tradiționale (instrumentale și vocale) pentru toate momentele cheie — cumetria, lapte și miere, hora nașilor, momentul torței, dansul moașei. Le mixez seamless între ele și cu partea modernă. Pot trimite playlist demo dacă vreți să verificați stilul.',
        },
        {
          question: 'Aduceți și microfon pentru anunțurile maestrului de ceremonii?',
          answer: 'Da, microfon wireless Shure inclus în toate pachetele. La pachetul Premium aduc 2 microfoane (unul pentru maestrul de ceremonii, unul backup pentru toasturi). Microfoanele sunt setate cu nivelul corect ÎNAINTE de eveniment.',
        },
        {
          question: 'Lucrați și sâmbăta dimineața (botezuri cu masă de prânz)?',
          answer: 'Da, frecvent. Botezurile cu prânz (12:00-19:00) sunt comune în București. Pachetele includ același număr de ore mix — alegeți voi când le folosiți.',
        },
        {
          question: 'Putem avea muzică liniștită pentru momentul slujbei?',
          answer: 'Dacă slujba e în aceeași locație ca petrecerea, da. Pot mixa muzică ambient liniștită (instrumental clasic, lounge, piano) în timpul slujbei, cu tranziție delicată spre ambient pentru masă. Volumul în timpul slujbei e foarte redus, ca să nu acopere preotul.',
        },
        {
          question: 'Ce melodii recomandați pentru intrarea cu copilul?',
          answer: 'Top 5 alegeri pentru 2026: "Welcome to the World" (Eminem instrumental) pentru vibe modern. "Beautiful" (James Blunt) pentru atmosferă clasică pop. "Mama" (Andra) pentru atmosferă tradițională românească. "What a Wonderful World" (Louis Armstrong) pentru vibe vintage elegant. "First Day of My Life" (Bright Eyes) pentru cuplii indie. Discutăm la consultarea pre-eveniment.',
        },
        {
          question: 'Faceți și botezuri în pensiuni sau outdoor cu cort?',
          answer: 'Da. Pentru botezuri outdoor sau locații neconvenționale, aducem sistem audio adaptat (boxe portabile cu putere mai mare). Verificăm în avans sursa de curent, distanțele și planul B în caz de ploaie. La pachetul Premium e tot inclus.',
        },
        {
          question: 'Putem invita și un solist live pentru anumite momente?',
          answer: 'Da, frecvent. La botezuri cu mulți invitați seniori, mulți părinți aleg combinația DJ + solist (vioară, voce, acordeon) pentru momentele tradiționale. Coordonez tehnica audio și mixul. Dacă nu aveți solist, pot recomanda colegi profesioniști.',
        },
        {
          question: 'Câte ore de mix sunt suficiente pentru un botez?',
          answer: 'Pentru un botez standard cu prânz lung urmat de petrecere de seară, 8 ore (incluse în pachetul Premium) sunt suficiente. Botezuri tipice: sosire DJ 14:00, muzica 15:30, masa până 18:30, cumetria 19:00-19:30, petrecere 19:30-23:30. Pentru botezuri lungi (până la 2-3 dimineața), avem extensii.',
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
      heading: 'Verificați disponibilitatea pe data botezului',
      body: 'Trimiteți data, locația și numărul aproximativ de invitați. Răspund în max 24h cu disponibilitate confirmată și pachetul potrivit. Briefing aprofundat cu părinți și nași după confirmarea rezervării.',
      primaryLabel: 'Cere ofertă pentru botez →',
      primaryHref: '/cerere-oferta?service=botez',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    eyebrow: 'DJ • Botezuri • București',
    shortDescription: 'DJ profesionist pentru botez în București — atmosferă potrivită pentru toate vârstele, de la cumetria și momentul "lapte și miere" la afterparty.',
    startingPrice: 350,
    layout,
    seo: {
      metaTitle: 'DJ Botez București — Lawre DJ | Pachete de la 350€',
      metaDescription: 'DJ profesionist pentru botezul copilului vostru. București + Ilfov. Echipament propriu, repertoriu cross-generațional, coordonare cu nașii. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-botez-bucuresti',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// MAJORAT
// ---------------------------------------------------------------------------

function buildMajoratDetailed(pkgIds: number[]): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Majoratul de 18 ani e un eveniment ciudat ca dinamică: ai într-o singură seară doi tineri și două generații în plus (părinți și bunici). Sărbătoritul/sărbătorita vrea atmosferă de petrecere reală — muzică actuală, ringul plin, energie până la 3-4 dimineața. Părinții vor să fie un eveniment "frumos", nu un club underground unde nu mai înțeleg ce se întâmplă.'),
        p('Lucrez cu adolescenți și părinți din București pentru majorate între 80 și 250 de invitați. Restaurante, săli de evenimente, vile cu grădină, locații private. Cei mai mulți părinți care mă contactează sunt în zona "vrem să fie o seară pe care să o țină minte, dar fără să ne îngrozim noi". Pe asta o livrez constant.'),
        p('Ce mă diferențiază: înțeleg playlist-ul actual real (nu doar TikTok hits din anul precedent), știu să citesc o cameră cu adolescenți și am răbdare cu tinerii care vin cu cereri specifice.'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'De ce Lawre la majoratul vostru',
      heading: 'Mix actual, atmosferă de petrecere, fără cringe',
      columns: '2',
      items: [
        {
          title: 'Repertoriu actual real (nu TikTok-ul de anul trecut)',
          body: 'Mix curat de pop modern (Olivia Rodrigo, Sabrina Carpenter, Tate McRae), hip-hop internațional (Drake, Travis Scott), trap & drill, hituri românești (Carla\'s Dreams, INNA, Smiley), reggaeton (Bad Bunny), EDM mainstream. Playlist-ul e actualizat săptămânal.',
        },
        {
          title: 'Coordonare cu sărbătoritul/sărbătorita',
          body: 'Înainte de eveniment am call cu sărbătoritul/sărbătorita direct (nu doar cu părinții). Stabilesc piesele MUST PLAY — cele 5-10 melodii care nu pot lipsi. La majorate, sărbătoritul e clientul real — el/ea trebuie să fie 100% mulțumit.',
        },
        {
          title: 'Tranziție inteligentă pop → petrecere',
          body: 'Prima parte (cina, cuvântări, tortul): pop modern melodic, volum mediu, părinții se simt confortabil. Dupa momentul torții, tranziție progresivă spre energy mode — primele 30 minute escalation, apoi peak time. Părinții pleacă liniștiți pe la 1 dimineața, tinerii rămân.',
        },
        {
          title: 'Fără cringe',
          body: 'Nu pun Macarena sau Cha Cha Slide la majorat în 2026. Nu fac dance challenges generice din anii 2000. Setlist real, contemporan, profesional. Distracție colectivă fără momentele de cringe care fac sărbătoritul să-și ascundă fața în pernă la vizionarea înregistrării.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum planificăm',
      heading: 'De la idee la petrecerea perfectă de 18 ani',
      steps: [
        {
          label: 'Discuția pre-eveniment cu sărbătoritul (și părinții)',
          body: 'Call dual: 30 minute cu sărbătoritul pentru playlist și ton, 15 minute cu părinții pentru logistică. Stabilesc cele 5 piese MUST PLAY ale sărbătoritului, 2-3 piese pentru părinți (pop românesc 80-90 pentru momentul nostalgic), structura serii.',
        },
        {
          label: 'Setup și soundcheck',
          body: 'Sosesc cu 90 minute înainte de prima invitație. Setup audio + lumini complet montate înainte de sosire. Soundcheck cu sărbătoritul dacă vrea. Verificare microfoane pentru discursuri ale părinților și prietenilor.',
        },
        {
          label: 'Mix structurat pe fazele serii',
          body: 'Welcome (30-60 min): pop modern lounge. Cina și cuvântări: pop melodic, volum scăzut pentru momentele de discurs. Tortul: piesa aleasă de sărbătorit. Petrecerea (după 22:00): tranziție în energy mode, mix continuu hits actuali. Peak time între 23:30-01:30.',
        },
        {
          label: 'Wrap-up',
          body: 'Ultimele 15 minute: 2-3 piese anthem care semnează seara. Feedback rapid de la sărbătorit a doua zi prin WhatsApp. Dacă sunt înregistrări audio importante (piesa de intrare, piesa de tort), le trimit la cerere.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachetele recomandate pentru majorat'),
        pBold('Essential (350-500 €) — pentru majorate mici (până la 80 invitați):'),
        ul([
          'Eveniment de 5-6 ore mix',
          'Sistem audio basic',
          '1 microfon wireless pentru cuvântări',
          'Lumini de bază (4 par-uri LED)',
          'Pentru: aniversări intime în restaurant mic sau vilă privată',
        ]),
        pBold('Premium (650-900 €) — standardul pentru majorat:'),
        ul([
          '100-200 de invitați, 7-8 ore de mix (19:00 → 02:00)',
          'Top + Sub 2000W RMS pentru ring de dans real',
          '2 microfoane wireless',
          'Moving heads (4x) + mașină de fum + lumini disco energice',
          'Backup echipament inclus',
        ]),
        p('Platinium pentru majorate mari (250+ invitați): mix nelimitat, line array, light show complet + lasere, tehnician sunet dedicat.'),
        pInline('Citește și ', { text: 'cum organizezi un majorat memorabil în București', href: '/blog/majorat-18-ani-petrecere-memorabila' }, ' — ghid complet cu idei și checklist.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete pentru majorat',
      heading: 'Petrecere privată sau eveniment mare — avem pachetul potrivit.',
      packages: pkgIds,
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Tipuri de majorate cu care lucrez'),
        ul([
          'Majorat clasic la restaurant (cu cină + petrecere) — cel mai comun',
          'Majorat la sală de evenimente — cu loc dedicat ringului, atmosferă de club privat',
          'Majorat în vilă cu grădină — outdoor + indoor, cu sistem mobil',
          'Majorat tematic (anii 80, 90, Hollywood, Festival vibes) — repertoriu adaptat strict la temă',
          'Majorat cu invitați internaționali — repertoriu echilibrat român + internațional',
        ]),
      ),
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe părinții și tinerii care organizează majoratul.',
      items: [
        {
          question: 'Cât costă un DJ pentru majorat în București?',
          answer: 'Pentru un majorat de 100-150 invitați, 600-800 € e prețul realist. Mai puțin de 350 € înseamnă DJ amator sau echipament limitat. Mai mult de 1000 € e justificat doar pentru evenimente foarte mari sau cu cerințe tehnice speciale.',
        },
        {
          question: 'Cu cât timp înainte trebuie să rezerv DJ-ul pentru majorat?',
          answer: 'Majoratele sunt mai flexibile decât nunțile — 2-3 luni înainte e suficient pentru weekend-uri, 4-6 săptămâni pentru zilele lucrătoare. Dacă majoratul e în lunile mai-iulie sau octombrie-decembrie, recomand 3 luni minim.',
        },
        {
          question: 'Lucrați cu cereri specifice ale sărbătoritului?',
          answer: 'Da, e standardul meu pe majorate. Cer lista cu 10-15 piese MUST PLAY de la sărbătorit, plus genurile preferate. Pe lângă, întreb dacă există momente secrete pe care vrea să le pregătesc (surpriză cu o piesă specifică, dedicație pentru cineva).',
        },
        {
          question: 'Faceți și petreceri de 18 ani la club / lounge bar?',
          answer: 'Da. Lucrez și în spații private în restaurante/cluburi (closed events pentru majorate). Echipament adaptat la sound system existent — uneori adaug doar lumini/microfoane, uneori vin cu sistem propriu complet.',
        },
        {
          question: 'Pot părinții să adauge câteva piese old school?',
          answer: 'Da, foarte des se face asta. Recomand 2-3 piese din partea părinților (pop românesc 80-90 sau international hits). Le mixez în prima parte, nu pe ringul peak time. Sărbătoritul nu se dezice public, părinții au momentul lor.',
        },
        {
          question: 'Faceți și anunțul / introducerea sărbătoritului la intrarea în sală?',
          answer: 'Da. Pot face anunțul cu microfon și piesa de intrare aleasă de sărbătorit. La majorate, intrarea cu efect dramatic e populară — lumini stinse, spotlight, fum, urcare scenă. Discutăm efectul în pre-meeting.',
        },
        {
          question: 'Lucrați și pentru majorate de băieți?',
          answer: 'Da, aproximativ 40% din majoratele mele sunt pentru băieți. Repertoriul e ușor diferit (mai mult hip-hop, trap, EDM), dar standardul de profesionalism e identic. Am lucrat cu sărbătoriți timizi și extroverti — mă adaptez.',
        },
        {
          question: 'Câte ore de mix sunt suficiente pentru un majorat?',
          answer: 'Pentru un majorat clasic de seară: 7-8 ore (incluse în pachetul Premium). Exemplu: 19:30 sosire DJ, 20:00 cocktail, 21:00 cină, 22:30 tortul, 23:00-02:00 petrecere. Pentru afterparty extins (până la 04:00), avem extensii.',
        },
      ],
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Ce spun tinerii și părinții',
      heading: 'Recenzii de la majoratele recente.',
      eventType: 'majorat',
      max: 3,
    },
    {
      blockType: 'cta',
      heading: 'Hai să facem majoratul memorabil',
      body: 'Trimiteți data, locația, numărul aproximativ de invitați și preferințele muzicale ale sărbătoritului. Răspund în max 24h. Pre-meeting cu sărbătoritul direct (nu doar părinți) după confirmare.',
      primaryLabel: 'Cere ofertă majorat →',
      primaryHref: '/cerere-oferta?service=majorat',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    eyebrow: 'DJ • Majorate • București',
    shortDescription: 'DJ pentru majoratul de 18 ani — energie reală, mix actual, atmosferă tinerească dar profesionistă. Părinții liniștiți, copiii distrați.',
    startingPrice: 350,
    layout,
    seo: {
      metaTitle: 'DJ Majorat București — Lawre DJ | 18 ani',
      metaDescription: 'DJ pentru majoratul de 18 ani în București. Mix actual (pop, hip-hop, EDM, dance), echipament profesional, coordonare cu sărbătoritul. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-majorat-bucuresti',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// CORPORATE
// ---------------------------------------------------------------------------

function buildCorporateDetailed(pkgIds: number[]): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Evenimentele corporate sunt diferite de cele private în trei feluri concrete: decizia de cumpărare implică mai multe persoane (HR, marketing, agenția de events), standardele formale sunt mai stricte (contract, factură, NDA, GDPR), publicul e amestecat (executivi, angajați, parteneri externi).'),
        p('Lucrez cu firme și agenții de events din București pe evenimente între 50 și 800 invitați. Lansări de produs, gale aniversare ale firmei, teambuilding-uri, Christmas parties, employee recognition events. Factură pe SRL, contract clar, asigurare echipament, NDA semnat dacă e cerut.'),
        p('Ce mă diferențiază de DJ-ii care fac nunți + corporate "ocazional": înțeleg cum funcționează un eveniment corporate — rundown strict, coordonare cu MC, momente de discurs ale CEO-ului, prezentări video cu sound sincronizat, timing precis pe minut. Nu e o petrecere mai mare — e operațiune.'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Tipuri de evenimente corporate',
      heading: 'De la gale la teambuilding — acoperim tot',
      columns: '2',
      items: [
        {
          title: 'Gale și aniversari de firmă',
          body: 'Evenimente formale (cina + discursuri + premii + petrecere). Repertoriu: lounge sofisticat în prima parte, energic-pop în partea a doua. Coordonare cu MC pentru momentele de premii și discursuri ale executivilor.',
        },
        {
          title: 'Lansări de produs',
          body: 'Accent pe produs (prezentare, demo, video, branding). Sound design pentru momentele cheie (intrarea audiences, video presentation, momentul reveal, networking after-party). Coordonare strânsă cu agenția de events.',
        },
        {
          title: 'Teambuilding-uri și team dinners',
          body: 'Mai casual, mai energice. Repertoriu pop modern, fără momente formale. Atmosferă relaxată, energie continuă, fără cuvântări lungi.',
        },
        {
          title: 'Christmas parties și anniversaries',
          body: 'Cele mai populare evenimente din decembrie. Mix de atmosferă festivă în prima oră, tranziție în petrecere clasică. Include momentele speciale: Secret Santa, premii angajați ai anului, video retrospectivă.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum lucrăm',
      heading: 'Colaborare simplă cu echipa voastră',
      steps: [
        {
          label: 'Briefing cu agenția / HR / marketing',
          body: 'Meeting (live sau Zoom) cu persoana responsabilă. Stabilim: rundown-ul exact pe minute, momentele speciale (discursuri, premii, video presentations), tone-of-voice (formal, energic, sofisticat), restricții, branding considerations.',
        },
        {
          label: 'Documente: contract, factură, NDA',
          body: 'Contract de prestări servicii standard în 24h. Cuprinde: scope of work, livrabile, tarif, condiții plată, GDPR, force majeure. NDA la cerere. Factură SRL emisă în 7 zile de la final. Plată la 30 zile sau termen agreat.',
        },
        {
          label: 'Setup și execuție în ziua evenimentului',
          body: 'Sosesc cu 2-3 ore înainte. Coordonare cu agenția on-site. Soundcheck cu MC, video team, prezentatori. Backup echipament dublat la pachetul Platinum — dacă pică sound-ul în mijlocul discursului CEO-ului e dezastru.',
        },
        {
          label: 'Reporting post-eveniment',
          body: 'Raport scurt post-eveniment: ore exacte, incidente (rar), feedback general. Pentru agencies care lucrează des cu mine, debrief informal despre ce a mers bine și ce ar fi putut fi mai bine.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachete pentru corporate'),
        pBold('Premium (650-1200 €) — pentru majoritatea evenimentelor corporate:'),
        ul([
          '100-300 invitați, 6-8 ore mix',
          'Sistem audio profesional + sub',
          '2 microfoane wireless Shure pentru MC + executive speeches',
          'Moving heads + ambient lighting',
          'Backup inclus',
          'NDA semnat dacă e cerut',
        ]),
        pBold('Platinum (1500-2500 €) — pentru evenimente mari sau cu cerințe speciale:'),
        ul([
          '300-800 invitați, ore extinse',
          'Line array pentru sound coverage uniform',
          '4x microfoane (MC, executive, panel discussions)',
          'Light show complet (moving heads, lasere, ambient)',
          'Tehnician sunet dedicat separat de DJ',
          'Backup dublat la fiecare componentă critică',
        ]),
        p('Pentru evenimente cu specific tehnic special (sync video presentation, live streaming audio, simultanous translation feed), discutăm soluții customizate.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete pentru corporate',
      heading: 'Ofertă personalizată disponibilă la cerere.',
      packages: pkgIds,
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce întreabă organizatorii de evenimente corporate.',
      items: [
        {
          question: 'Cât costă un DJ pentru un eveniment corporate în București?',
          answer: 'Pentru un Christmas party sau aniversare firmă cu 100-200 angajați, 800-1500 € e prețul realist. Pentru gale formale cu 200-400 invitați, 1500-2500 €. Pentru lansări de produs cu cerințe tehnice speciale, 2500-4000 €.',
        },
        {
          question: 'Emiteți factură pe SRL?',
          answer: 'Da, sunt înregistrat ca SRL plătitor de TVA. Factura e emisă în 7 zile de la finalul evenimentului. Plata standard la 30 zile, acceptăm și termene mai scurte. Pentru events recurente (Christmas party anual), oferim contracte multi-event cu condiții preferențiale.',
        },
        {
          question: 'Aveți contract standard de prestări servicii?',
          answer: 'Da, contract standard semnat înainte de eveniment (trimis în 24h). Cuprinde toate clauzele standard: scope, livrabile, tarif, plată, asigurare echipament, GDPR, force majeure, anulare. Pentru companii cu departament legal propriu, accept template-ul lor (review în 48h).',
        },
        {
          question: 'Semnați NDA pentru evenimente confidențiale?',
          answer: 'Da, des. Lansări de produs, evenimente cu invitați VIP, anunțuri strategice — toate cer NDA. Trimit NDA standard sau accept template-ul vostru. Confidențialitatea e respectată inclusiv în portofoliu (nu menționez clienți corporate fără permisiune explicită).',
        },
        {
          question: 'Lucrați cu agenții de events?',
          answer: 'Da, frecvent. Sunt familiarizat cu workflow-ul agencies (rundown-uri detaliate, briefing meetings, on-site coordination, reporting). Dacă agenția voastră a lucrat cu mine înainte, lucrăm cu același template de comunicare.',
        },
        {
          question: 'Câte ore de mix sunt suficiente pentru un eveniment corporate?',
          answer: 'Depinde de tip. Christmas party / team dinner: 5-7 ore. Gala formală: 7-9 ore (welcome + cina lungă + cuvântări + premii + petrecere). Lansare de produs: 4-6 ore. Pachetele Premium și Platinum acoperă majoritatea cazurilor.',
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
      heading: 'Hai să discutăm despre evenimentul vostru',
      body: 'Trimiteți briefing-ul preliminar (data, locația, numărul aproximativ de invitați, tipul de eveniment, agenția de events dacă lucrați cu una). Răspund în 24h cu propunere preliminară. Meeting live sau Zoom după confirmarea interesului.',
      primaryLabel: 'Cere ofertă pentru eveniment corporate →',
      primaryHref: '/cerere-oferta?service=corporate',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    eyebrow: 'DJ • Corporate Events • București',
    shortDescription: 'DJ pentru evenimente corporate — gale, lansări de produs, teambuilding-uri, Christmas parties. Factură SRL, contract, NDA dacă e nevoie.',
    startingPrice: 650,
    layout,
    seo: {
      metaTitle: 'DJ Corporate București — Lawre DJ | Gale & Events',
      metaDescription: 'DJ profesionist pentru evenimente corporate în București. Factură SRL, contract clar, NDA opțional. Gale, teambuilding, Christmas party. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-corporate-bucuresti',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// CLUB
// ---------------------------------------------------------------------------

function buildClubDetailed(): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Spre deosebire de evenimentele private (nuntă, botez, majorat), unde DJ-ul construiește un mix orchestrat în jurul momentelor evenimentului, în club totul e despre flow continuu. Set de 4-6 ore care nu pierde energia, care construiește progresiv, care răspunde la cum reacționează ringul în timp real.'),
        p('Activ în scena de club din București de peste 8 ani. Rezidențe la mai multe locații, guest sets ocazionale pentru evenimente speciale (lansări de label, b2b cu DJ-i internaționali, parties tematice). Repertoriu predominant: tech-house, melodic house, organic house, occasional drum & bass / breakbeat pentru seturile de noapte târzie.'),
        p('Pentru proprietarii de cluburi: ofer demo mixuri reale (nu doar SoundCloud playlist) pentru orice format pe care îl considerați relevant. Pot trimite înregistrări recente de la seturi live în cluburi.'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Stiluri și genuri',
      heading: 'Tech-house, melodic, deep — pe pulsul scenei actuale',
      columns: '2',
      items: [
        {
          title: 'Tech-House',
          body: 'Mix-ul principal de weekend. Energy continuu, groovy, cu accent pe vocale chopped și basslines drumming. Artiști favoriti: Solardo, Patrick Topping, Cloonee, Mau P, Dombresky.',
        },
        {
          title: 'Melodic House & Deep',
          body: 'Pentru seturile de warm-up sau pentru cluburi cu vibe mai melodic. Artiști: Anyma, Argy, Massano, Tale of Us, Adriatique.',
        },
        {
          title: 'Organic House & Down-tempo',
          body: 'Pentru seturi early evening sau lounge sets. Mai puțin BPM, mai mult mood. Artiști: Bedouin, Audiofly, Acid Pauli.',
        },
        {
          title: 'Specialty: Breaks, Indie Dance, Italo Disco',
          body: 'Pentru parties tematice sau seturi nocturne specifice. Repertoriu adaptat la tema serii.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum lucrez cu cluburile',
      heading: 'De la prima discuție la rezidență',
      steps: [
        {
          label: 'Discuție despre venue și public',
          body: 'Îmi spui ce tip de public are clubul tău, ce stiluri muzicale funcționează, ce orar trebuie acoperit. Dacă vrei, trimit seturi anterioare înregistrate pentru a verifica stilul.',
        },
        {
          label: 'Gig de probă',
          body: 'De obicei propun un gig de probă (sau back-to-back cu DJ-ul vostru resident) pentru a vedea cum interacționăm cu publicul specific. Fără contract pe termen lung înainte de proba asta.',
        },
        {
          label: 'Rezidență sau colaborare continuă',
          body: 'Dacă merge, stabilim un ritm: săptămânal, de două ori pe lună, lunar. Tarifele pentru rezidențe pe termen lung sunt mai avantajoase față de gig-urile izolate.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Cum lucrez cu cluburile'),
        ul([
          'Rezidențe weekly — disponibil cu cel puțin 2 seturi/lună. Slot-uri preferate: vineri night, sâmbătă early și peak time.',
          'Guest sets ocazionale — disponibil pentru evenimente speciale (label parties, b2b sets, lansări).',
          'Demo înainte de booking — trimit demo mixuri specifice pentru BPM-ul și genul cerut.',
          'Tehnică și logistică — vin cu USB-uri pregătite, cunosc CDJ-2000 nexus / CDJ-3000 / Pioneer XDJ-RX2 / XDJ-RX3.',
          'Adaptabilitate — citesc ringul în timp real și schimb direcția fără disrupție.',
        ]),
        p('Cluburile din București unde am lucrat: lista disponibilă la cerere. În ultimii 8 ani am lucrat în majoritatea cluburilor mainstream (Centrul Vechi, Calea Victoriei, Lipscani, Universitate), plus cluburi de boutique din Aviatorilor și Floreasca.'),
      ),
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe managerii de cluburi și venue-uri.',
      items: [
        {
          question: 'Care e tariful pentru un set în club?',
          answer: 'Pentru rezidență weekly în club mainstream din București: 250-500 € per set (4-6 ore). Pentru guest set la party special: 400-800 €. Pentru opening pentru DJ internațional: discutăm caz-cu-caz.',
        },
        {
          question: 'Aveți rezidențe permanente?',
          answer: 'Am rezidențe active în București — detalii la cerere directă. Pentru rezidențe noi, sunt deschis la discuții cu cluburi cu vibe matching repertoriul meu (predominant tech-house și melodic).',
        },
        {
          question: 'Pot trimite demo mix specific genului meu?',
          answer: 'Da, send-uri specifice (60-90 minute) pentru orice gen relevant. Trimit prin WeTransfer sau SoundCloud private link. Pot include și drone footage din seturile live recente dacă e relevant.',
        },
        {
          question: 'Lucrați și cu cluburi din afara Bucureștiului?',
          answer: 'Da, ocazional. Pentru cluburi din Constanța (Mamaia, Vama Veche în vară), Brașov, Cluj — disponibil cu cazare inclusă în contract.',
        },
        {
          question: 'Aduceți echipament propriu sau folosiți cel din club?',
          answer: 'Folosesc echipamentul cluburilor mainstream (CDJ-uri Pioneer, mixer, monitoare). Aduc doar headphone propriu (Pioneer HDJ-X10), USB-uri, și opțional un controller dacă cluburile mici nu au CDJ-uri.',
        },
      ],
    },
    {
      blockType: 'cta',
      heading: 'Hai să facem booking',
      body: 'Pentru rezidențe sau guest sets — trimite-mi data, locația, formatul și BPM-ul / genul cerut. Răspund cu disponibilitate și demo mix specific.',
      primaryLabel: 'Contact pentru booking →',
      primaryHref: '/cerere-oferta?service=club',
      secondaryLabel: 'Ascultă mixurile',
      secondaryHref: '/mixuri',
    },
  ]

  return {
    eyebrow: 'DJ • Club & Lounge • București',
    shortDescription: 'DJ pentru club, lounge sau bar — house, tech-house, deep, melodic. Disponibil pentru rezidențe weekly și guest sets în cluburile din București.',
    startingPrice: 250,
    layout,
    seo: {
      metaTitle: 'DJ Club București — Lawre DJ | House, Tech-House, Deep',
      metaDescription: 'DJ profesionist pentru club, lounge, bar în București. Rezidențe sau guest sets. House, tech-house, deep, melodic. 8 ani experiență. Demo mixuri disponibile.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-club-rezidenta',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// CUNUNIE
// ---------------------------------------------------------------------------

function buildCununieDetailed(pkgIds: number[]): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Cununia civilă e un moment scurt (10-30 minute), dar important emoțional și fotogenic. Spre deosebire de petrecerea de seară, ceremonia nu cere mix energic — cere atmosferă elegantă, sound clean, momente cheie cu cue exact (intrarea miresei, momentul "Da", semnături, plecarea mirilor).'),
        p('Lawre face frecvent cununii civile în București — atât ca eveniment separat, cât și ca parte din ziua de nuntă. Pachet dedicat, scurt și concis, fără să trebuiască să rezervi pachetul mare de nuntă dacă cununia e separată.'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Pentru ce situații',
      heading: 'Flexibil pentru orice format de cununie',
      columns: '3',
      items: [
        {
          title: 'Cununia separată de nuntă',
          body: 'Multe cuplii din București își fac cununia civilă în zile separate. Pachetul dedicat doar pentru cununie e mult mai accesibil decât rezervarea pachetului complet de nuntă.',
        },
        {
          title: 'Cununia în aceeași zi cu nunta',
          body: 'Ceremonia civilă urmată direct de cocktail welcome și petrecerea de seară. Lawre coordonează tot — ceremonia, cocktail, cina, petrecerea — într-un singur contract.',
        },
        {
          title: 'Cununia în locație non-tradițională',
          body: 'Palat, parc, plajă, vilă. Locații cu cerințe speciale de sonorizare (outdoor, acustică complicată). Echipament adaptat la specificul locației.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Ce include',
      heading: 'Sonorizarea completă a ceremoniei',
      steps: [
        {
          label: 'Pre-eveniment',
          body: 'Consultare pentru alegerea pieselor: intrare miri, background în timpul semnăturilor, plecare. Coordonare cu ofițerul stării civile sau ceremoniarul. Verificare specificații locație (interior/exterior, acces curent).',
        },
        {
          label: 'Setup la locație',
          body: 'Sosire cu 60-90 minute înainte. Setup audio, microfon wireless pentru ofițer, teste de nivel. Coordonare finală cu fotograful pentru sincronizarea momentelor.',
        },
        {
          label: 'Ceremonia',
          body: 'Muzica intrare miri, background ambient în timpul semnăturilor (volum scăzut pentru ca ofițerul să fie auzit clar), muzica plecare cuplului. Tranziție spre cocktail welcome dacă urmează imediat.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Ce include un pachet de cununie civilă'),
        ul([
          'Sosire 60-90 minute înainte pentru setup audio',
          'Sonorizarea ceremoniei (1-2 ore: sosire invitați + ceremonie + cocktail welcome)',
          'Microfon wireless pentru ofițerul stării civile',
          'Microfon backup pentru nași / discurs scurt al mirilor (opțional)',
          'Muzica intrare miri (piesa aleasă, mixată să se sincronizeze cu pasul)',
          'Background music în timpul semnăturilor (instrumental ambient, volum scăzut)',
          'Muzica plecare miri (piesa anthem celebratorie)',
          'Cocktail welcome music (30-60 minute lounge dacă urmează cocktail)',
        ]),
        pBold('Essential (250-400 €) pentru cununia separată:'),
        ul([
          '2-3 ore prezență (1.5h ceremonia + cocktail welcome)',
          'Sistem audio basic pentru sală de stare civilă',
          '1 microfon wireless pentru ofițer',
          'Muzica de intrare + ieșire customizată',
        ]),
        pInline('Pentru cununia civilă inclusă în ziua de nuntă completă, vezi ', { text: 'pachetele Premium și Platinum', href: '/pachete/premium' }, ' din pagina DJ Nuntă București.'),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete disponibile',
      heading: 'Flexibil — doar cununie sau combinat cu petrecere.',
      packages: pkgIds,
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce vor să știe cuplurile despre DJ la cununia civilă.',
      items: [
        {
          question: 'Cât costă un DJ doar pentru cununia civilă?',
          answer: 'Pentru cununia civilă separată (1-2 ore prezență), 250-400 € e prețul realist. Mai puțin de 200 € înseamnă echipament foarte basic, fără rezervă. Mai mult de 500 € e justificat doar pentru locații cu acustică complicată (outdoor, sală foarte mare).',
        },
        {
          question: 'Aduceți și microfon pentru ofițerul stării civile?',
          answer: 'Da, microfon wireless inclus în toate pachetele. Setat la nivelul corect înainte de eveniment. Backup în caz de defect (rar, dar ne asigurăm că nu se întâmplă).',
        },
        {
          question: 'Putem alege piesa de intrare?',
          answer: 'Da, alegerea piesei de intrare e parte din consultarea pre-eveniment. Dacă piesa e lungă, o editez să se sincronizeze cu pasul de intrare. Recomand să trimiteți piesa cu 1-2 săptămâni înainte.',
        },
        {
          question: 'Lucrați și pentru cununii outdoor (parc, plajă)?',
          answer: 'Da. Pentru outdoor, aducem sistem portabil cu putere mai mare (vântul + spațiul deschis cer asta). Verificăm sursa de curent sau folosim baterie portabilă. Plan B în caz de ploaie discutat în pre-meeting.',
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
      heading: 'Vreți sonorizare elegantă pentru cununie?',
      body: 'Trimiteți data, locația și ora cununiei. Răspund în 24h cu disponibilitate și pachet potrivit.',
      primaryLabel: 'Cere ofertă cununie civilă →',
      primaryHref: '/cerere-oferta?service=cununie',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    eyebrow: 'DJ • Cununie Civilă • București',
    shortDescription: 'DJ pentru cununia civilă — sonorizare ceremonia, microfon ofițer stare civilă, muzica intrare și plecare miri. Inclusiv dacă cununia e separată de petrecere.',
    startingPrice: 250,
    layout,
    seo: {
      metaTitle: 'DJ Cununie Civilă București — Lawre DJ',
      metaDescription: 'DJ pentru cununia civilă în București. Sonorizare ceremonia (intrare miri, momentul Da, semnături, plecare). Microfon ofițer + muzică. Pachete dedicate.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-cununie-civila',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// PETRECERE PRIVATA
// ---------------------------------------------------------------------------

function buildPetrecereDetailed(pkgIds: number[]): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Petrecerile private sunt cea mai diversă categorie de evenimente cu care lucrez. Fiecare e diferită ca structură: o aniversare de 50 ani cu familia extinsă vs un party în vilă cu prieteni colegi de facultate vs o reuniune cu 80 absolvenți după 20 ani — toate cer abordări diferite ca repertoriu, energie, stil de mix.'),
        p('În București, lucrez pe petreceri private de 30 până la 300 invitați. Locații variate: vile cu grădină în Pipera și Băneasa, restaurante private în Centrul Vechi, terase în Aviatorilor, locații de eveniment dedicate, apartamente mari, rooftop-uri.'),
        p('Ce mă diferențiază: nu am playlist standard de party. Înainte de fiecare eveniment vorbesc cu host-ul ca să înțeleg vibe-ul cerut: party clasic cu prieteni, aniversare cu familia mai conservatoare, sau networking event casual? Repertoriul se construiește în jurul răspunsului.'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Tipuri de petreceri',
      heading: 'Aniversări, party în vilă, reuniuni, bachelorette',
      columns: '2',
      items: [
        {
          title: 'Aniversări (30, 40, 50, 60 ani)',
          body: 'Cele mai frecvente. Aniversări cu prieteni + familie, mix de generații. Repertoriu echilibrat: hituri din anii 90-2000 pentru sărbătorit + pop modern + românesc popular pentru atmosferă cross-generațională.',
        },
        {
          title: 'Party în vilă (housewarming, weekends)',
          body: 'Atmosferă mai relaxată, mai casual. Pop/EDM/house pentru background, cu momente de petrecere în partea a doua. Volum adaptat (vecini). Setup configurat pentru spațiu specific (curte + interior).',
        },
        {
          title: 'Bachelorette / Bachelor parties',
          body: 'Energie mai mare, mix mai pop-modern, cu momente speciale (dedicări, surprize). Sărbătoritul/sărbătorita e în centrul atenției. Coordonare cu organizatorul pentru momentele de spectacol (intrare cu sound effect, dedicări).',
        },
        {
          title: 'Reuniuni (clase, colegi)',
          body: 'Hituri din anii respectivi (perioada de școală/facultate). Atmosferă nostalgică în prima parte, petrecere clasică în a doua. Pre-meeting cu organizatorul pentru must-plays specifice grupului.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum se desfășoară',
      heading: 'De la discuție la petrecerea memorabilă',
      steps: [
        {
          label: 'Discuția pre-eveniment cu host-ul',
          body: 'Call de 20-30 minute. Stabilim: tipul exact (aniversare, party, reuniune), profilul invitaților (vârstă medie, gusturi generale), tonul cerut (formal, casual, energic, nostalgic), restricții (volum cap pentru vecini, oră limită).',
        },
        {
          label: 'Setup adaptat la spațiu',
          body: 'Pentru locații private (vile, apartamente), evaluare tehnică în avans dacă e necesar. Echipament adaptat la dimensiunea și acustica spațiului. Configurări speciale pentru outdoor sau indoor mic.',
        },
        {
          label: 'Mix flexibil în timp real',
          body: 'La petrecerile private, mixul e foarte responsive — ascult ce cer invitații, observ pe ringul de dans cum reacționează. Dacă o piesă explodează, merg pe direcția aceea. Dacă pică, schimb rapid.',
        },
        {
          label: 'Wrap-up natural',
          body: 'Petrecerile private rar au moment final oficial. De regulă, după ce majoritatea pleacă, dau drumul la 2-3 piese liniștite pentru ultimii rămași. Wrap-up natural, fără anunțuri formale.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachete pentru petreceri private'),
        pBold('Essential (350-500 €) — pentru petreceri mici (30-80 invitați):'),
        ul([
          '5-6 ore mix',
          'Sistem audio basic (pentru spații mici / interior)',
          '1 microfon wireless (dedicații, anunțuri)',
          'Lumini de bază',
          'Pentru: aniversari intime, party în apartament, reuniuni mici',
        ]),
        pBold('Premium (650-900 €) — pentru petreceri medii și mari (100-200 invitați):'),
        ul([
          '7-8 ore mix',
          'Top + Sub 2000W',
          '2 microfoane wireless',
          'Moving heads + mașină de fum',
          'Cabină DJ profesională',
          'Pentru: aniversari mari, party în vilă cu grădină, reuniuni 100+',
        ]),
      ),
    },
    {
      blockType: 'packages',
      eyebrow: 'Pachete disponibile',
      heading: 'De la petrecere mică la party mare — avem soluție.',
      packages: pkgIds,
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Răspunsuri pentru cei care organizează o petrecere privată.',
      items: [
        {
          question: 'Cât costă un DJ pentru o petrecere privată în București?',
          answer: 'Pentru o petrecere de 50-100 invitați, 500-800 € e prețul realist. Petreceri mici (30 invitați, în apartament) — 300-450 €. Petreceri mari (150+ invitați în vilă cu grădină) — 800-1500 €.',
        },
        {
          question: 'Lucrați și în apartamente mari sau doar în vile / restaurante?',
          answer: 'Da, lucrez și în apartamente mari (penthouse, duplex). Echipamentul e adaptat la spațiu — nu aduc line array în living-ul de 60mp. Discuția pre-eveniment include verificarea spațiului (dimensiuni, acustică, acces curent, vecini).',
        },
        {
          question: 'Aduceți și fum / lumini la o petrecere mică?',
          answer: 'La Essential, lumini basic (4 par-uri LED). Fum opțional, dar la petreceri în spații mici (apartamente) recomand să nu folosim — declanșează detectoarele de fum. La Premium, fum + moving heads incluse, dar cer locații cu ventilație ok.',
        },
        {
          question: 'Faceți și petreceri în zile lucrătoare (joi, vineri)?',
          answer: 'Da, frecvent. Petreceri private în zilele de joi-vineri sunt comune. Tarifele sunt identice cu weekend-urile, exceptând rezervările last-minute (sub 1 săptămână) unde pot exista ajustări.',
        },
        {
          question: 'Pot invitații să sugereze piese în timpul petrecerii?',
          answer: 'Da, e standard la petreceri private. Țin un slot deschis pentru cereri (30-40% din playlist e cereri ale invitaților). Dacă cererea e bună pentru momentul respectiv, o pun. Dacă ar pica energia ringului, o pun la momentul potrivit mai târziu.',
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
      heading: 'Hai să facem petrecerea memorabilă',
      body: 'Trimite-mi data, locația, numărul aproximativ de invitați și tipul de petrecere. Răspund în 24h cu disponibilitate și pachet potrivit.',
      primaryLabel: 'Cere ofertă petrecere privată →',
      primaryHref: '/cerere-oferta?service=petrecere',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    eyebrow: 'DJ • Petreceri Private • București',
    shortDescription: 'DJ pentru petrecere privată — aniversare, party în vilă, eveniment intim de prieteni. Echipament scalabil 30-300 invitați, repertoriu adaptat tonului.',
    startingPrice: 350,
    layout,
    seo: {
      metaTitle: 'DJ Petrecere Privată București — Lawre DJ',
      metaDescription: 'DJ pentru petreceri private în București — aniversări, party în vilă, evenimente intime. Repertoriu adaptat, echipament scalabil. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-petrecere-privata',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// SONORIZARE
// ---------------------------------------------------------------------------

function buildSonorizareDetailed(): ServiceUpdateData {
  const layout: ServiceLayout = [
    {
      blockType: 'richText',
      content: richDoc(
        p('Pe lângă serviciile complete de DJ, ofer și sonorizare standalone pentru evenimente unde DJ-ul e altcineva sau nu există. Echipament profesional propriu, închiriat cu sau fără tehnician.'),
        p('Servicii folosite frecvent de: cuplii care au DJ extern dar nu sunt mulțumiți de echipamentul oferit (mai ales pentru locații outdoor), organizatori de conferințe care vor sonorizare clean fără DJ, evenimente private cu DJ amator, ceremonii religioase (botezuri tradiționale cu preot), și evenimente outdoor (festivaluri private, party-uri în grădină, zile ale firmei).'),
      ),
    },
    {
      blockType: 'featureGrid',
      eyebrow: 'Servicii oferite',
      heading: 'Sonorizare cu tehnician, self-service sau mixed',
      columns: '3',
      items: [
        {
          title: 'Sonorizare cu tehnician',
          body: 'Aduc echipamentul + un tehnician on-site pe toată durata. Setează, monitorizează nivelele, ajustează în timp real, intervine la probleme. Recomandat pentru conferințe, gale și events cu speakers internaționali.',
        },
        {
          title: 'Închiriere echipament self-service',
          body: 'Pentru events unde aveți DJ propriu sau tehnician propriu, închiriem doar echipamentul. Setup și pickup făcute de mine, funcționarea e responsabilitatea voastră. Recomandat pentru events mici sau DJ-i profesioniști.',
        },
        {
          title: 'Sonorizare ceremonie + petrecere mixed',
          body: 'Ceremonia (botez, cununie, slujbă) separată de petrecere — sonorizare ceremonie + opțional petrecere. Pachet adaptat dacă petrecerea are DJ propriu sau nu.',
        },
      ],
    },
    {
      blockType: 'processSteps',
      eyebrow: 'Cum lucrăm',
      heading: 'De la cerință la eveniment sonorizat',
      steps: [
        {
          label: 'Evaluarea nevoilor tehnice',
          body: 'Îmi spui tipul evenimentului, spațiul (dimensiuni, interior/exterior), numărul de persoane, ce ai nevoie (muzică, microfoane, monitoare, sub-uri). Îți trimit specificațiile tehnice și un tarif.',
        },
        {
          label: 'Vizită tehnică sau plan de setup',
          body: 'Pentru evenimente mai mari, vizitez locația în avans pentru a planifica poziționarea echipamentului, lungimea cablurilor și sursele de curent. Pentru events mici, e suficient un plan pe e-mail.',
        },
        {
          label: 'Evenimentul',
          body: 'Sosesc cu timp suficient pentru setup complet și soundcheck. Dacă e cu operator, cineva e la mixer tot timpul. Dacă e fără, instalez, testez și las instrucțiuni clare.',
        },
      ],
    },
    {
      blockType: 'richText',
      content: richDoc(
        h3('Echipament disponibil'),
        h4('Audio:'),
        ul([
          'Boxe active full-range (Pioneer XPRS, RCF, JBL EON)',
          'Sub-bass active',
          'Line array pentru events mari (200+ invitați)',
          'Boxe portabile cu baterie pentru locații fără priză',
        ]),
        h4('Microfoane:'),
        ul([
          'Microfoane wireless Shure (PG, BLX, ULX series)',
          'Microfoane cu fir (vocal + instrument)',
          'Microfoane headset (pentru speakers care se mișcă)',
          'Microfoane lavalier (clip-on)',
        ]),
        h4('Lumini:'),
        ul([
          'Par-uri LED RGB',
          'Moving heads (beam, wash, spot)',
          'Mașini de fum (haze și smoke)',
          'Cabini DJ (standard și LED branded)',
        ]),
        h3('Tarife orientative'),
        ul([
          'Sonorizare ceremonie botez/cununie (1-2 ore, 1 microfon + boxe): 250-400 €',
          'Sonorizare conferință mică (1 zi, 2-4 microfoane + sound system + tehnician): 600-1200 €',
          'Sonorizare conferință mare (1 zi, line array + 4-6 microfoane + tehnician): 1500-3000 €',
          'Închiriere self-service pentru petrecere (1 noapte, sound + lumini): 350-700 €',
        ]),
      ),
    },
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Ce trebuie să știți despre sonorizarea unui eveniment.',
      items: [
        {
          question: 'Cât costă închirierea echipamentului fără tehnician?',
          answer: 'Pentru un setup de party (2 boxe + sub + 2 microfoane + lumini basic) — 350-500 € pentru o noapte. Cu 1 microfon și fără lumini — 250-350 €. Setup și pickup incluse în tarif.',
        },
        {
          question: 'Aveți echipament pentru outdoor / locații fără priză?',
          answer: 'Da. Boxe portabile cu baterie internă (PA system mobil) pentru locații complet izolate. Suficient pentru 50-80 invitați outdoor sau ceremonie de 1-2 ore.',
        },
        {
          question: 'Aduceți și tehnician pentru sonorizare conferință?',
          answer: 'Da. Tehnicianul rămâne pe toată durata evenimentului, monitorizează sound, ajustează nivelele. Tarif separat de echipament (200-400 €/zi). Pentru events de 8+ ore sau cu speakers internaționali, recomand 2 tehnicieni.',
        },
        {
          question: 'Lucrați și pentru evenimente outside Bucureștiului?',
          answer: 'Da, ocazional. Pentru events în Constanța, Brașov, Cluj — disponibil cu transport și cazare incluse în contract. Pentru events foarte mari (festivaluri private), discutăm specific cu echipa organizatoare.',
        },
      ],
    },
    {
      blockType: 'cta',
      heading: 'Aveți nevoie doar de echipament?',
      body: 'Trimiteți data, locația, tipul de eveniment și ce echipament credeți că aveți nevoie. Vă răspund în 24h cu propunere și tarif.',
      primaryLabel: 'Cere ofertă sonorizare →',
      primaryHref: '/cerere-oferta?service=sonorizare',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]

  return {
    eyebrow: 'Servicii sunet & lumini · București',
    shortDescription: 'Sonorizare profesională pentru orice tip de eveniment — închiriere echipament cu tehnician, sau setup complet pentru DJ extern.',
    startingPrice: 150,
    layout,
    seo: {
      metaTitle: 'Sonorizare Evenimente București — Lawre DJ',
      metaDescription: 'Sonorizare profesională pentru evenimente în București. Boxe, microfoane, lumini. Cu tehnician sau self-service. Conferințe, ceremonii, petreceri.',
      canonicalUrl: 'https://lawredj.ro/servicii/sonorizare-evenimente',
      noindex: false,
    },
  }
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: await configPromise })
  console.log('[seed:services-detailed] connected to Payload')

  const allPkgs = await findPackagesBySlug(payload, ['essential', 'premium', 'platinum'])
  const essentialPremium = allPkgs.filter((p) => ['essential', 'premium'].includes(p.slug ?? '')).map((p) => p.id as number)
  const premiumPlatinum = allPkgs.filter((p) => ['premium', 'platinum'].includes(p.slug ?? '')).map((p) => p.id as number)
  const allPkgIds = allPkgs.map((p) => p.id as number)

  const updates: Array<{ slug: string; data: ServiceUpdateData }> = [
    { slug: 'dj-botez-bucuresti', data: buildBotezDetailed(essentialPremium) },
    { slug: 'dj-majorat-bucuresti', data: buildMajoratDetailed(essentialPremium) },
    { slug: 'dj-corporate-bucuresti', data: buildCorporateDetailed(premiumPlatinum) },
    { slug: 'dj-club-rezidenta', data: buildClubDetailed() },
    { slug: 'dj-cununie-civila', data: buildCununieDetailed(essentialPremium) },
    { slug: 'dj-petrecere-privata', data: buildPetrecereDetailed(essentialPremium) },
    { slug: 'sonorizare-evenimente', data: buildSonorizareDetailed() },
  ]

  for (const svc of updates) {
    await upsertService(payload, svc.slug, svc.data)
  }

  console.log('[seed:services-detailed] ✓ done — 7 services updated with detailed content')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed:services-detailed] failed', err)
  process.exit(1)
})
