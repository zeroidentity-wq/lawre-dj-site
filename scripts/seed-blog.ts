/**
 * Seed: cele 3 articole de blog din lawre-package/0{1,2,3}-*.md
 * Idempotent: update dacă slug există, create altfel.
 *
 * Run with:  pnpm seed:blog
 */
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

import { h2, h3, ol, p, pBold, pInline, richDoc, ul } from '../src/lib/lexical'
import type { Post } from '../src/payload-types'
import type { getPayload as GetPayloadFn } from 'payload'

type PayloadInstance = Awaited<ReturnType<typeof GetPayloadFn>>

type PostCategory = 'dj-nunta' | 'dj-corporate' | 'dj-club' | 'dj-botez-majorat' | 'evergreen'

type PostData = {
  title: string
  slug: string
  excerpt: string
  content: ReturnType<typeof richDoc>
  publishedAt: string
  status: 'published' | 'draft'
  category: PostCategory
  tags: { tag: string }[]
  seo: {
    metaTitle?: string | null
    metaDescription?: string | null
    noindex?: boolean | null
    canonicalUrl?: string | null
  }
}

async function upsertPost(payload: PayloadInstance, slug: string, data: PostData) {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
    console.log(`[seed] updated  slug=${slug}`)
  } else {
    const created = await payload.create({ collection: 'posts', data })
    console.log(`[seed] created  slug=${slug} id=${created.id}`)
  }
}

// ---------------------------------------------------------------------------
// Articol 1 — Cât costă un DJ la nuntă în București
// ---------------------------------------------------------------------------

function buildArticle1(): PostData {
  return {
    title: 'Cât costă un DJ la nuntă în București în 2026 (răspuns onest, cu cifre reale)',
    slug: 'cat-costa-un-dj-la-nunta-in-bucuresti',
    excerpt:
      '"Cât costă un DJ la nuntă?" e una dintre primele întrebări pe care orice cuplu și-o pune. Și e una dintre cele mai prost răspunse pe internet. Acest ghid îți dă cifre reale pentru București în 2026.',
    publishedAt: '2026-04-26T10:00:00.000Z',
    status: 'published',
    category: 'dj-nunta',
    tags: [{ tag: 'pret dj nunta' }, { tag: 'dj nunta bucuresti' }, { tag: 'pachete dj' }],
    seo: {
      metaTitle: 'Cât costă un DJ la nuntă în București în 2026? Ghid real',
      metaDescription:
        'Cât costă DJ-ul la nuntă în București? Prețuri reale 2026, ce conține fiecare pachet, cum eviți DJ-ii ieftini care strică nunta. Breakdown complet.',
      noindex: false,
      canonicalUrl: 'https://lawredj.ro/blog/cat-costa-un-dj-la-nunta-in-bucuresti',
    },
    content: richDoc(
      p('"Cât costă un DJ la nuntă?" e una dintre primele întrebări pe care orice cuplu și-o pune. Și e una dintre cele mai prost răspunse pe internet — fie cu prețuri vagi gen "depinde", fie cu cifre umflate de la furnizori care vor să te impresioneze, fie cu prețuri suspicios de mici care ascund probleme.'),
      p('Acest ghid îți dă cifre reale pentru București în 2026, ce intră în fiecare interval de preț și — important — ce semnale trebuie să te facă să fii precaut indiferent de buget.'),

      h2('TL;DR — Prețuri reale pentru nuntă în București, 2026'),
      p('Pentru o nuntă de 150 de invitați în București, în 2026, prețul realist al unui DJ profesionist este 600-900 €.'),
      ul([
        'Sub 350 € → de obicei DJ amator sau echipament închiriat la limită',
        '350-500 € → DJ începător profesionist sau pachete mici (sub 80 invitați)',
        '600-900 € → zona "sweet spot" pentru majoritatea nunților',
        '1000-1500 € → pachete premium cu lumini complexe, line array, tehnician separat',
        'Peste 1500 € → DJ-i cu nume mare, echipament de festival, sau complexitate logistică',
      ]),

      h2('De ce variază atât de mult prețul?'),
      p('Un DJ care îți cere 250 € și unul care îți cere 1200 € fac, teoretic, "același lucru" — pun muzică la nunta ta. Dar diferența între cei doi e similară cu cea între un fotograf cu telefonul și un fotograf profesionist cu echipament de zeci de mii de euro.'),

      h3('1. Echipamentul'),
      p('Cea mai mare variabilă. Un DJ cu echipament propriu profesional (Pioneer DDJ-1000+, RCF / JBL pentru audio, Shure pentru microfoane, Chauvet sau Robe pentru lumini) are costuri reale de zeci de mii de euro investite în setup. Un DJ care închiriază echipamentul de la o firmă de sonorizare îți va factura mai puțin, dar cu riscuri mai mari: echipament ieftin, compatibilități imprevizibile, fără backup.'),
      pBold('Întreabă întotdeauna: "Ce echipament aduceți?" cu modele specifice. Un DJ profesionist îți poate răspunde fără să se uite la ceva. Un DJ care evită răspunsul concret e un red flag.'),

      h3('2. Experiența și backlog-ul'),
      p('Un DJ cu 200+ nunți la activ știe ce funcționează și ce nu funcționează. Știe să citească când o piesă "moare" și să facă tranziția în timp util. Știe că la momentul "lapte și miere" nu pui Despacito și că invitații în vârstă au nevoie de Florin Salam la momentul potrivit, nu de tech house.'),

      h3('3. Durata și complexitatea evenimentului'),
      p('6 ore vs 8 ore vs "până dimineața" sunt prețuri diferite. La fel, o nuntă cu cununie civilă în altă locație + petrecere în restaurant + afterparty are costuri logistice mai mari decât o nuntă într-o singură locație.'),

      h3('4. Coordonarea și pre-eveniment'),
      p('Un DJ profesionist face cel puțin un call de 30-60 minute înainte de eveniment, citește lista pieselor, vorbește cu fotograful și restaurantul, ajunge cu 2-3 ore înainte pentru setup. Toate astea sunt timp plătit, chiar dacă nu apar pe factură.'),

      h3('5. Lumini și efecte'),
      p('Un set basic de lumini (4 par-uri LED) are alt preț față de un setup complex (moving heads, lasere, mașină de fum, LED bars sincronizate cu muzica). Pentru o nuntă mare, luminile pot adăuga 200-500 € la pachetul de bază.'),

      h2('Breakdown pe pachete (București, 2026)'),

      h3('Pachet Essential — 350-500 €'),
      p('6 ore de mix live, 2x boxe active (până la 800W RMS), 1x microfon wireless, lumini de bază (4 par-uri LED), consultare playlist (call de 30 min). Potrivit pentru nunți mici (sub 80 invitați), botezuri, majorate, buget restrâns.'),

      h3('Pachet Premium — 600-900 € (cel mai cerut)'),
      p('8 ore de mix live (până la 02:00), 2x top-uri + 2x sub-uri (până la 2000W RMS), 2x microfoane wireless Shure, lumini moving heads (4x) + par LED + mașină de fum, coordonare cu fotograful și restaurantul, backup echipament inclus. Potrivit pentru nunți medii (100-200 invitați) — majoritatea nunților din București.'),

      h3('Pachet Platinum — 1100-1500 €'),
      p('Mix live nelimitat (până dimineața), sistem audio line array (până la 4000W RMS), 4x microfoane wireless + monitor stage, light show complet, tehnician sunet dedicat pe lângă DJ, sesiune planning față-în-față. Potrivit pentru nunți mari (300-500+ invitați), locații complexe, nunți tematice.'),

      h2('Cum recunoști un DJ ieftin care îți va strica nunta'),
      ol([
        'Nu îți răspunde la mesaje în 24-48h. Dacă comunică greu pre-rezervare, va comunica și mai prost în ziua nunții.',
        'Răspunde vag despre echipament. "Aduc tot ce trebuie" nu e răspuns. Vrei modele specifice.',
        'Nu are recenzii sau le are doar pe Facebook fără verificare. Caută-l pe Google.',
        'Nu vrea contract. Nicio nuntă serioasă nu se face fără contract scris cu termenii clari.',
        'Cere avans de 70%+ pentru "rezervarea datei". 30-50% e standard în industrie.',
        'Nu are website / portfolio. Cel puțin un Instagram cu mixuri și poze de la evenimente recente e minimum.',
        'Nu vrea să facă call înainte de eveniment. Un DJ profesionist insistă pe asta.',
        'Prețul e suspicios de mic. 200 € pentru o nuntă întreagă e ori amator în formare, ori cineva care va veni cu echipament închiriat în ultima clipă.',
      ]),

      h2('Concluzie'),
      p('Pentru o nuntă în București în 2026, bugetează 600-900 € pentru DJ dacă vrei o experiență fără stres și o atmosferă bună. Mai puțin de atât poate funcționa în anumite cazuri, dar înseamnă risc.'),
      p('La o nuntă de 100.000 RON, diferența între un DJ de 350 € și unul de 800 € e 0.5% din buget. Dar afectează 100% din amintirile pe care le veți avea după.'),

      h3('Vrei o ofertă concretă pentru nunta voastră?'),
      p('Spune-mi data, locația și numărul aproximativ de invitați. Îți răspund în max 24h cu disponibilitate, pachetul potrivit și prețul exact — fără surprize.'),
      pInline('→ ', { text: 'Cere ofertă personalizată', href: '/cerere-oferta?service=nunta' }),
    ),
  }
}

// ---------------------------------------------------------------------------
// Articol 2 — Top 50 melodii deschidere nuntă 2026
// ---------------------------------------------------------------------------

function buildArticle2(): PostData {
  return {
    title: 'Top 50 melodii pentru deschiderea nunții în 2026',
    slug: 'top-melodii-deschidere-nunta-2026',
    excerpt:
      'Lista pe care o folosesc cel mai des la nunți din București. Organizate pe momente cheie: intrare miri, primul dans, dansul cu mama, deschiderea ringului. Cu motivul pentru care funcționează fiecare.',
    publishedAt: '2026-04-27T10:00:00.000Z',
    status: 'published',
    category: 'dj-nunta',
    tags: [{ tag: 'melodii nunta' }, { tag: 'primul dans' }, { tag: 'playlist nunta 2026' }],
    seo: {
      metaTitle: 'Top 50 melodii deschidere nuntă 2026 — Lista oficială',
      metaDescription:
        '50 de melodii pentru deschiderea nunții — primul dans, intrare miri, dansul mirelui cu mama. Selecție de DJ profesionist din București, actualizat 2026.',
      noindex: false,
      canonicalUrl: 'https://lawredj.ro/blog/top-melodii-deschidere-nunta-2026',
    },
    content: richDoc(
      p('După 300+ nunți la activ, am ajuns la o concluzie simplă: melodiile pentru momentele cheie ale nunții nu sunt pur și simplu "piese frumoase". Sunt piese care funcționează — adică au ritmul potrivit pentru moment, lungimea corectă (3-4 minute, nu 7), un build-up emoțional clar și nu sunt nici prea pretențioase, nici clișeu.'),
      p('Lista de mai jos e ce recomand efectiv perechilor cu care lucrez. E împărțită pe momente, cu o motivație scurtă pentru fiecare alegere. Ia ce ți se potrivește, ignoră restul.'),

      h2('1. Intrarea mirilor în sală'),
      p('Momentul în care invitații aplaudă și mirii intră prima dată în sala de evenimente. Vrei o piesă cu energie, build-up clar, lungime potrivită pentru drumul de la ușă la masa principală (de obicei 60-90 secunde de muzică folosită).'),
      h3('Top 10 piese pentru intrarea mirilor'),
      ol([
        'Marry You — Bruno Mars — clasic, energic, formula sigură',
        'Hall of Fame — The Script ft. will.i.am — anthemic, perfect pentru nunți cu mulți invitați',
        'Best Day of My Life — American Authors — vibe upbeat, optimist',
        'September — Earth, Wind & Fire — pentru cupluri care vor ceva clasic dar non-clișeu',
        'Walking on Sunshine — Katrina & The Waves — funcționează la orice vârstă',
        "I'm Yours — Jason Mraz — pentru intrări mai relaxate, vibe natural",
        'Halo — Beyoncé — dramatic, perfect pentru intrări lungi',
        'Vivir Mi Vida — Marc Anthony — pentru cupluri cu vibe latino sau internațional',
        'Imagination — Shawn Mendes — varianta modern-romantică',
        "Can't Stop the Feeling — Justin Timberlake — energic, garantat că aplaudă toți",
      ]),
      pBold('Tip pro: Piesa pe care o alegi pentru intrare poate fi diferită de cea pentru primul dans. Mulți cuplii fac confuzia asta. La intrare vrei energie, la primul dans vrei emoție.'),

      h2('2. Primul dans al mirilor'),
      p('Cel mai emoțional moment al serii (în general). Vrei o piesă care are 3-4 minute (nu 6+), un ritm dansabil (4/4 medium tempo), să nu fie suprasolicitată, și să însemne ceva pentru voi ca pereche.'),
      h3('Top 10 piese pentru primul dans'),
      ol([
        'Perfect — Ed Sheeran — clasic modern, lungime perfectă, ușor de dansat chiar pentru cei fără experiență',
        'All of Me — John Legend — emotional, melodic, funcționează la orice nuntă',
        'Thinking Out Loud — Ed Sheeran — pentru cei care nu vor "Perfect" pentru că o au prea mulți',
        'A Thousand Years — Christina Perri — pentru intrări tematice de tip fairytale',
        'At Last — Etta James — clasic intemporal, perfect pentru cupluri "de stil"',
        'Marry Me — Train — emotional fără să fie prea pretențios',
        'Lover — Taylor Swift — pentru cuplurile mai tinere, vibe modern',
        'Make You Feel My Love — Adele — emotional, dramatic, lung dar bine construit',
        'From This Moment On — Shania Twain — clasic pentru cei care vor și un pic de country/pop',
        'Stand By Me — Ben E. King — pentru cupluri "de vinil"',
      ]),
      h3('Bonus românesc'),
      ul([
        'Cum am fost cândva — Smiley & Delia — funcționează surprinzător de bine',
        'Vino — Carla\'s Dreams — pentru cupluri tinere, vibe modern românesc',
        'Te Iubesc — Voltaj — clasic românesc, emotional, mulți invitați îl știu',
      ]),
      pBold('Atenție: Evită piesele extrem de populare ale ultimului an — riscul e ca alți 5 cupli din anturajul tău să fi avut aceeași piesă.'),

      h2('3. Dansul mirelui cu mama'),
      p('Moment intim, emoțional. Vrei o piesă mai înceată, cu mesaj clar despre legătura mamă-fiu, lungime 2-3 minute.'),
      ul([
        'A Mother\'s Love — Jim Brickman — explicit pentru moment, lacrimi garantate',
        'Mama — Spice Girls (versiunea acustică) — pentru cupluri mai tinere',
        'You Are the Sunshine of My Life — Stevie Wonder — vibe vesel, nu plâns',
        'Wind Beneath My Wings — Bette Midler — clasic, dramatic',
        'What a Wonderful World — Louis Armstrong — universal, scurt, perfect',
        'Mother — Andra — pentru cei care vor în română',
      ]),

      h2('4. Deschiderea ringului după masă'),
      p('Cea mai importantă alegere a serii pentru DJ. Aici se decide dacă invitații vin pe ring sau stau la masă. Vrei piese cu energie clară, ritm 4/4 medium-fast, recognoscibilitate maximă.'),
      h3('Top 10 piese pentru "killer opener"'),
      ol([
        'Dancing Queen — ABBA — funcționează 100% din timp, la orice nuntă, în orice țară',
        'September — Earth, Wind & Fire — la fel, formula sigură',
        'Uptown Funk — Bruno Mars — pentru nunți cu invitați 25-45',
        "Don't Stop Believin' — Journey — anthemic, mulți cântă cu",
        'Mr. Brightside — The Killers — pentru nunți cu invitați mai tineri',
        'Sweet Caroline — Neil Diamond — sing-along garantat',
        'Y.M.C.A. — Village People — clasic absolut, mișcare colectivă',
        'I Will Survive — Gloria Gaynor — pentru ringul predominant feminin',
        'Mambo No. 5 — Lou Bega — energie instantanee',
        'Hai să dansăm — Pavel Stratan — pentru atmosferă românească autentică',
      ]),
      pBold('Tip pro: Nu deschide ringul cu o piesă slow, cu ceva super nou, sau cu ceva de nișă. Vrei familiar și energic. Lasă tranziția gradual spre vibe-ul mai chill mai târziu.'),

      h2('Cum alegi melodia potrivită — sfaturi practice'),
      ol([
        'Ascultă piesa cap-coadă, nu doar refrenul — multe piese au versuri despre despărțire / infidelitate. Nu vrei "primul dans" pe o piesă care e de fapt despre trădare.',
        'Verifică BPM-ul — dacă vrei să dansezi o coregrafie pre-învățată, BPM contează. 75-90 e ideal pentru primul dans clasic. Peste 100 e pentru deschiderea ringului.',
        'Lungimea piesei — sub 2:30 e prea scurt. Peste 4:30 e prea lung. Sweet spot: 3:00-4:00.',
        'Discută cu DJ-ul — un DJ profesionist îți poate spune dacă piesa pe care ai ales-o "funcționează" pentru moment. A văzut deja ce merge și ce nu.',
        'Lasă loc pentru cereri — dacă faci playlist 100% pre-stabilit, anulezi unul din avantajele DJ-ului. Dă-i 70% lista ta + 30% libertate.',
        'Evită capcana "trebuie să fie ceva neuzual" — mai bine o piesă cunoscută bine plasată decât una rară plasată prost.',
      ]),

      h3('Vrei ajutor să construiești playlistul perfect pentru nunta voastră?'),
      p('La fiecare nuntă cu mine, facem împreună o sesiune de planning a playlistului — alegem piesele cheie, eu adaug recomandări bazate pe ce a funcționat la nunți similare, și construim atmosfera. Fără playlist generic, fără surprize.'),
      pInline('→ ', { text: 'Cere ofertă pentru DJ nuntă', href: '/cerere-oferta?service=nunta' }),
    ),
  }
}

// ---------------------------------------------------------------------------
// Articol 3 — 10 întrebări pentru DJ-ul de nuntă
// ---------------------------------------------------------------------------

function buildArticle3(): PostData {
  return {
    title: '10 întrebări pe care trebuie să le pui DJ-ului înainte să rezervi',
    slug: '10-intrebari-pentru-dj-nunta',
    excerpt:
      'După 8 ani și 300+ nunți, am văzut prea multe perechi care semnează cu DJ-i fără să întrebe lucrurile esențiale — apoi se trezesc cu probleme în ziua nunții. Lista de mai jos e ce ar trebui să întrebi obligatoriu.',
    publishedAt: '2026-04-28T10:00:00.000Z',
    status: 'published',
    category: 'dj-nunta',
    tags: [{ tag: 'intrebari dj nunta' }, { tag: 'rezervare dj' }, { tag: 'sfaturi nunta' }],
    seo: {
      metaTitle: '10 întrebări obligatorii pentru DJ-ul de nuntă în 2026',
      metaDescription:
        'Lista de întrebări pe care trebuie să le pui DJ-ului înainte să rezervi. Cum eviți DJ-ii amatori, ce contract semnezi, ce întrebi despre echipament.',
      noindex: false,
      canonicalUrl: 'https://lawredj.ro/blog/10-intrebari-pentru-dj-nunta',
    },
    content: richDoc(
      p('Faptul că prietenul tău al prietenului ți-a spus că "X DJ e bun" nu e suficient. Trebuie să verifici tu, cu întrebări concrete, ce primești pentru banii tăi. Lista de mai jos îți ia 30 de minute la primul call cu DJ-ul, dar îți poate scuti o nuntă întreagă de probleme.'),
      p('Răspunsurile pe care le primești îți spun mai mult decât conținutul lor — îți spun cum gândește DJ-ul. Un profesionist răspunde direct, cu detalii. Un amator se învârte, evită, sau dă răspunsuri vagi.'),

      h2('Întrebarea 1: Aveți disponibilitate pe data X?'),
      p('Pare evident, dar mulți cuplii sar peste asta. Verifică ÎNAINTE de orice altă discuție.'),
      pBold('Răspuns bun: "Da, am liberă" urmat imediat de "să vorbim despre evenimentul vostru" — sau "nu, dar pe Y data am" cu propunere alternativă.'),
      p('Răspuns slab: "Te sun mâine să confirm." Dacă DJ-ul nu știe instant ce dată e liberă, gestionează agenda prost.'),

      h2('Întrebarea 2: Ce echipament aduceți (cu modele specifice)?'),
      p('Cea mai importantă întrebare pentru calitatea sunetului. Nu accepta răspunsul "echipament profesional" sau "tot ce trebuie". Vrei modele exacte.'),
      ul([
        'Boxe: branduri ca RCF, JBL, Mackie, Dynacord, Yamaha — putere RMS exprimată în watts',
        'Mixer / controller: Pioneer DDJ-1000, DDJ-FLX10, sau echivalente profesionale',
        'Microfoane: Shure SM58, BLX24, sau echivalente — NU "microfoane wireless ieftine de import"',
        'Lumini: brand (Chauvet, Robe, ADJ) + tip (par-uri LED, moving heads, lasere)',
      ]),
      pBold('Răspuns slab: "Boxe profesionale, lumini frumoase, microfon wireless." → DJ amator care nu știe ce are sau care folosește echipament închiriat.'),

      h2('Întrebarea 3: Aveți backup pentru fiecare echipament critic?'),
      p('Ce se întâmplă dacă pică laptopul? Dacă se strică microfonul? Dacă moare un canal pe mixer? Un DJ profesionist are răspuns instant pentru fiecare scenariu.'),
      pBold('Răspuns slab: "Nu am avut probleme până acum." → Va avea în ziua nunții voastre. Garantat. Și nu va fi pregătit.'),

      h2('Întrebarea 4: Ce se întâmplă dacă vă îmbolnăviți / nu puteți veni?'),
      p('Întrebarea pe care nimeni nu vrea să o pună, dar care e crucială. DJ-i serioși au plan B — alți DJ-i de încredere care îi pot înlocui.'),
      pBold('Răspuns slab: "Nu am pățit niciodată." sau "Atunci e problema voastră." → Fugi imediat.'),

      h2('Întrebarea 5: Coordonați cu fotograful / restaurantul / maestrul de ceremonii?'),
      p('La o nuntă lucrează 4-6 furnizori paralel. DJ-ul TREBUIE să se coordoneze cu ei, mai ales cu fotograful. Altfel se calcă pe momente.'),
      pBold('Răspuns bun: "Da, întotdeauna. Cer datele de contact ale fotografului cu o săptămână înainte și ne sincronizăm pe momentele cheie."'),

      h2('Întrebarea 6: Câte ore de mix include pachetul și ce se întâmplă dacă vrem să prelungim?'),
      p('"Mix nelimitat" și "8 ore de mix" sunt două lucruri diferite. Clarifică ÎNAINTE. Un DJ profesionist îți dă un răspuns clar: X ore incluse, costul pe oră suplimentară, plătibil în ziua evenimentului.'),

      h2('Întrebarea 7: Putem să vă vedem mixând live înainte?'),
      p('Cea mai bună formă de evaluare. La un club, la un eveniment public, sau măcar la o repetiție. Un DJ bun te invită la un eveniment public sau îți trimite înregistrări de la nunți recente.'),
      pBold('Răspuns slab: "Nu ies în public, doar la evenimente private." → Cum verifici că e bun?'),

      h2('Întrebarea 8: Ce contract semnăm și ce conține?'),
      p('OBLIGATORIU: contract scris, semnat de ambele părți, înainte de orice plată. Conține: data, ora, locația, pachetul exact, prețul total, condițiile de avans, ce se întâmplă în cazul anulării (de ambele părți).'),
      pBold('Răspuns slab: "Mergem pe încredere, fără contract." → Ești în pericol legal pentru ambele direcții.'),

      h2('Întrebarea 9: Cum gestionați cererile invitaților în timpul nunții?'),
      p('La orice nuntă vor fi rude care vor să "ceară o piesă" la DJ. Cum gestionează DJ-ul asta poate face diferența între atmosferă bună și DJ frustrat care pune ce vor 10 unchi diferiți.'),
      pBold('Răspuns bun: "Cererile rezonabile (în direcția stilistică pe care am stabilit-o) le iau, cele care strică atmosfera nu. Voi sunteți decizia finală."'),

      h2('Întrebarea 10: Aveți recenzii recente pe Google de la nunți?'),
      p('NU recenzii pe Facebook (ușor manipulabile). NU recomandări de la prieteni (subiective). Recenzii pe Google Business Profile, cu nume real, cu profil public. Un DJ bun are link direct la profilul lui Google.'),

      h2('Steaguri roșii — semne că NU trebuie să rezervi'),
      ul([
        'Răspunde la mesaje cu mai mult de 48h întârziere',
        'Insistă pe avans de 70%+',
        'Nu vrea contract scris',
        'Nu poate enumera echipament cu modele specifice',
        'Nu are website / Google Business / Instagram cu mixuri',
        'Spune "te las să mă conduci tu, eu sunt flexibil" la TOTUL',
        'Pretinde "nimeni nu se compară cu mine"',
        'Refuză să-ți dea referințe de la alți cuplii recente',
        'Schimbă prețul în funcție de cum răspunzi',
      ]),

      h2('Steaguri verzi — semne că DJ-ul e bun'),
      ul([
        'Răspunde la mesaje în max 24h',
        'Pune întrebări CONCRETE despre evenimentul vostru încă de la primul mesaj',
        'Insistă pe call înainte de a-ți da ofertă',
        'Are contract clar, în scris, cu termeni transparenți',
        'Echipament nominat cu modele specifice',
        'Recenzii pe Google de la nunți recente',
        'Acceptă vizita la un eveniment public ca să-l vezi mixând',
        'Are mixuri publicate online (SoundCloud / Mixcloud)',
        'Spune lucruri concrete despre stilul muzical, NU "fac de toate"',
      ]),

      h3('Vrei să discutăm despre nunta voastră?'),
      p('Răspund la fiecare întrebare de mai sus în detaliu, în primul nostru call. Niciun avans nu se cere până nu sunteți 100% siguri pe rezervare. Trimite data și locația și să stabilim un call.'),
      pInline('→ ', { text: 'Cere ofertă pentru nuntă', href: '/cerere-oferta?service=nunta' }),
    ),
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

  const articles = [
    { slug: 'cat-costa-un-dj-la-nunta-in-bucuresti', data: buildArticle1() },
    { slug: 'top-melodii-deschidere-nunta-2026', data: buildArticle2() },
    { slug: '10-intrebari-pentru-dj-nunta', data: buildArticle3() },
  ]

  for (const art of articles) {
    await upsertPost(payload, art.slug, art.data)
  }

  console.log('[seed] done — 3 blog articles seeded')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed] failed', err)
  process.exit(1)
})
