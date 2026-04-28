/**
 * Seed: Service "DJ Nuntă București" — pillar page content from
 * `lawre-package/dj-nunta-bucuresti.md`. Idempotent: updates if a Service with
 * the same slug exists, creates otherwise.
 *
 * Run with:  pnpm seed:dj-nunta
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

const SLUG = 'dj-nunta-bucuresti'

type PayloadInstance = Awaited<ReturnType<typeof GetPayloadFn>>

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
  if (existing.docs[0]) {
    return existing.docs[0]
  }
  const created = await payload.create({
    collection: 'packages',
    data: {
      slug: data.slug,
      name: data.name,
      price: data.price,
      currency: 'EUR',
      tagline: data.tagline,
      features,
    },
  })
  console.log(`  + created package ${data.slug}`)
  return created
}

async function main() {
  // Dynamic imports — must happen AFTER dotenv loaded env vars, because
  // payload.config.ts reads process.env at evaluation time.
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: await configPromise })
  console.log(`[seed] connected to Payload`)

  // Ensure the 3 referenced packages exist (so relatedPackages can link to them)
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
  const relatedPackageIds = packages.map((p) => p.id)
  console.log(`[seed] linked packages: ${packages.map((p) => p.slug).join(', ')}`)

  const layout = buildLayout()

  const data = {
    title: 'DJ Nuntă București',
    slug: SLUG,
    eyebrow: 'Disponibil pentru rezervări 2026',
    shortDescription:
      'Sunet profesional, atmosferă autentică, zero stres pentru voi în ziua cea mare. De la cununia civilă la afterparty, Lawre coordonează toată partea muzicală — și știe exact cum să citească momentul.',
    startingPrice: 350,
    relatedPackages: relatedPackageIds,
    layout,
    seo: {
      metaTitle: 'DJ Nuntă București — Lawre DJ | Pachete de la 350€',
      metaDescription:
        'DJ profesionist pentru nuntă în București. Echipament propriu, coordonare cu fotograful, mix personalizat. Pachete transparente. Cere ofertă.',
      canonicalUrl: 'https://lawredj.ro/servicii/dj-nunta-bucuresti',
      noindex: false,
    },
  }

  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: SLUG } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'services',
      id: existing.docs[0].id,
      data,
    })
    console.log(`[seed] updated service id=${existing.docs[0].id} slug=${SLUG}`)
  } else {
    const created = await payload.create({ collection: 'services', data })
    console.log(`[seed] created service id=${created.id} slug=${SLUG}`)
  }

  console.log('[seed] done')
  process.exit(0)
}

function buildLayout(): ServiceLayout {
  return [
    // Section 1 — De ce contează DJ-ul la o nuntă
    {
      blockType: 'richText',
      content: richDoc(
        h3('De ce contează DJ-ul la o nuntă'),
        p(
          'Muzica nu e detaliu la o nuntă — e exact ce face diferența între o seară frumoasă și o seară pe care invitații o să o povestească luni întregi. Un DJ bun citește ringul, schimbă vibe-ul în secunde când simte că publicul se plictisește, și nu o ia razna cu volumul când bunica vrea să spună un toast.',
        ),
        p(
          'Un DJ slab? Atmosferă plată, oameni care pleacă la 23:00, miri stresați că nu se distrează nimeni. Diferența între cele două înseamnă, în general, mai puțin de 10% din bugetul total al nunții — dar afectează 100% din amintirile pe care le veți avea după.',
        ),
      ),
    },

    // Section 2 — Ce primiți cu Lawre la nunta voastră (FeatureGrid 2x2)
    {
      blockType: 'featureGrid',
      eyebrow: 'Ce primiți',
      heading: 'Ce primiți cu Lawre la nunta voastră',
      columns: '2',
      items: [
        {
          title: 'Coordonare cu fotograful și restaurantul',
          body: 'Nu vorbesc peste anunțurile fotografului. Știu când să las muzica jos pentru tort, prima poză și momentul torței. Comunic cu maestrul de ceremonii înainte și în timpul evenimentului.',
        },
        {
          title: 'Mix adaptat la public, nu playlist gata făcut',
          body: 'Începem cu o discuție pre-eveniment unde îmi spuneți ce ascultați voi, ce ascultă părinții, ce piese trebuie obligatoriu să fie acolo și ce piese NU vreți deloc. Mixul se face live, în funcție de cum reacționează lumea.',
        },
        {
          title: 'Echipament profesional cu backup',
          body: 'Pioneer, Shure, RCF — branduri care nu te lasă în pană. Și pentru orice scenariu am backup: laptop secundar, microfon de rezervă, cabluri în plus. Nimic improvizat în ziua nunții voastre.',
        },
        {
          title: 'Răspund în max 24h, mereu',
          body: 'Pe email, pe WhatsApp, pe Instagram. Cu detalii concrete, nu cu „te sun mâine" și apoi tăcere. Pre-nuntă mai ales, comunicarea trebuie să fie impecabilă.',
        },
      ],
    },

    // Section 3 — Cum se desfășoară (ProcessSteps)
    {
      blockType: 'processSteps',
      eyebrow: 'Procesul',
      heading: 'Cum se desfășoară o nuntă cu Lawre',
      steps: [
        {
          label: 'Înainte de nuntă (cu 2-4 săptămâni)',
          body: 'Discuție inițială (call sau față-în-față), unde stabilim împreună:\n\n• Stilul muzical preferat de voi și de invitații cheie (părinți, nași)\n• Lista pieselor obligatorii (intrare miri, primul dans, dansul mirelui cu mama, sârba, hora)\n• Lista pieselor pe care NU le vreți (genuri sau piese specifice)\n• Detalii despre locație, ora și ordinea momentelor\n• Coordonare cu fotograful, formația (dacă există), maestrul de ceremonii',
        },
        {
          label: 'În ziua nunții',
          body: 'Sosesc cu 2-3 ore înainte de prima invitație programată. Setup complet (sunet, lumini, microfoane), test cu fotograful și restaurantul, verificare playlist final. Când invitații intră în sală, totul e gata și soundcheck-ul deja făcut.',
        },
        {
          label: 'Pe parcursul nopții',
          body: 'Mix continuu adaptat la atmosferă. Schimb tempo-ul când văd că lumea obosește. Fac pauze pentru toasturi, scenete, momente speciale. Mențin volumul la nivel rezonabil în timpul mesei, urc energia după ce începe ringul. Stau până la sfârșit — fără „afterparty cu costuri suplimentare neașteptate".',
        },
        {
          label: 'După nuntă',
          body: 'Trimit înregistrarea audio a unor seturi cheie dacă o cereți (mai ales dansul). Dacă vreți feedback sincer despre cum a fost, îl primiți. Recenziile pe Google sunt importante pentru mine, dar nu insist neplăcut.',
        },
      ],
    },

    // Section 4 — Pachete intro (rich text leading into Packages block)
    {
      blockType: 'richText',
      content: richDoc(
        h3('Pachete și prețuri'),
        p(
          'Trei pachete clare, transparente, cu accent pe contextul de nuntă. Toate includ deplasarea în București + Ilfov. Pentru nunți în afara județului Ilfov, costul deplasării se discută separat.',
        ),
        pInline(
          'Pentru analize aprofundate ale costurilor reale din piață, vezi ',
          {
            text: 'cât costă un DJ la nuntă în București',
            href: '/blog/cat-costa-un-dj-la-nunta-in-bucuresti',
          },
          '.',
        ),
        p(
          'Notă transparentă: pentru weekend-urile din peak season (mai-iulie, septembrie-octombrie 2026), recomand rezervarea cu 4-8 luni înainte. Pentru date mai puțin căutate (ianuarie, februarie, august), 2-3 luni e ok.',
        ),
      ),
    },

    // Packages block — pulls from relatedPackages on the Service
    {
      blockType: 'packages',
      eyebrow: 'Pachete pentru nuntă',
      heading: 'Trei opțiuni clare. Zero surprize.',
      packages: [],
    },

    // FAQ (Section 6)
    {
      blockType: 'faq',
      eyebrow: 'Întrebări frecvente',
      heading: 'Răspuns scurt la întrebările pe care toți miri și-le pun.',
      items: [
        {
          question: 'Cât costă un DJ profesionist la o nuntă în București?',
          answer:
            'Pentru o nuntă în București, un DJ profesionist costă între 350 € (pachet Essential, evenimente mici) și 1500 € (pachet Platinum cu line array, lumini complexe, tehnician separat). Mediana pieței pentru o nuntă de 150 invitați se află în zona 600-900 €. Atenție la prețurile mult sub 300 €: de obicei înseamnă echipament închiriat la limita performanței, fără backup, și DJ fără experiență reală.',
        },
        {
          question: 'Cu cât timp înainte trebuie să rezerv DJ-ul?',
          answer:
            'Pentru weekend-urile din lunile mai-iulie și septembrie-octombrie, recomand cu 4-8 luni înainte. Pentru ianuarie, februarie, august — cu 2-3 luni e suficient. Sâmbetele se ocupă rapid, mai ales weekend-urile cu sărbători. Dacă aveți o dată fixă, e bine să verificați disponibilitatea cât mai devreme.',
        },
        {
          question: 'Cât timp mixați la o nuntă?',
          answer:
            'Pachetul Essential include 6 ore, Premium 8 ore (până la 02:00), Platinum este nelimitat (până dimineața). Cele mai multe nunți merg până la 04:00-05:00 dacă atmosfera e bună. Nu am surcharge pe oră peste contract — dacă ați luat Platinum, stau cât e nevoie.',
        },
        {
          question: 'Pot să vă dau o listă cu piese specifice?',
          answer:
            'Absolut. Mai mult, e încurajat. Există 3 categorii utile: piese obligatorii (le mixez sigur la momentul potrivit), piese preferate (le inserez când se potrivesc cu atmosfera), piese interzise (nu le pun deloc, indiferent de cereri). Lista o stabilim împreună la consultarea pre-eveniment.',
        },
        {
          question: 'Aduceți și boxe / lumini / microfon?',
          answer:
            'Da, întreg sistemul vine cu mine — boxe, sub-uri, mixer, microfoane wireless, lumini, mașină de fum (dacă o vreți), cabluri. Voi nu trebuie să închiriați nimic. La pachetul Platinum vine și un tehnician sunet care se ocupă strict de partea audio cât eu mă concentrez pe mix.',
        },
        {
          question: 'Ce se întâmplă dacă se strică un echipament?',
          answer:
            'Toate pachetele includ backup. Pentru orice piesă critică (laptop, mixer, microfon principal) am echivalent de rezervă în mașină. La pachetul Platinum backup-ul e dublat și există un tehnician dedicat pentru schimbarea rapidă. În 8 ani, am avut un singur incident — și am fost înapoi în mai puțin de 90 de secunde.',
        },
        {
          question: 'Faceți și cununia civilă în plus față de petrecere?',
          answer:
            'Da. Pot mixa și la cununia civilă (de obicei muzică de fundal liniștită + 1-2 piese specifice pentru intrare, semnătură, ieșire), apoi tranziția spre petrecere. Costul depinde de distanța între locații și de ora cununiei — discutăm la ofertă personalizată.',
        },
        {
          question: 'Lucrați și cu formație live?',
          answer:
            'Da, frecvent. La nunți mari sau tradiționale, formația live cântă în prima parte (intrare, ceremonial, masă), iar eu preiau pentru ringul de seară și până dimineața. Coordonarea o facem împreună înainte — momentul de tranziție, microfoanele, sunetul comun.',
        },
        {
          question: 'Faceți și nunți tematice / non-tradiționale?',
          answer:
            'Da. Am mixat la nunți cu vibe boho, industrial, cu temă din ani \'80, nunți cu majoritate invitați străini, nunți LGBTQ+. Fiecare e diferită, repertoriul se adaptează. Nu am un „playlist standard de nuntă" pe care îl repet identic.',
        },
        {
          question: 'Sunteți disponibil pentru nunți în afara Bucureștiului?',
          answer:
            'Da, lucrez în tot județul Ilfov fără cost suplimentar. Pentru județele învecinate (Giurgiu, Dâmbovița, Prahova, Călărași, Ialomița) cost mic de deplasare. Pentru zone mai îndepărtate (Constanța, Brașov, etc.) discutăm separat — uneori e fezabil, alteori recomand un coleg local.',
        },
      ],
    },

    // Testimonials filtered for nunti
    {
      blockType: 'testimonials',
      eyebrow: 'Ce spun mirii',
      heading: 'Recenzii de la nunți recente.',
      eventType: 'nunta',
      max: 3,
    },

    // Final CTA (Section 8)
    {
      blockType: 'cta',
      heading: 'Verifică disponibilitatea pe data nunții voastre.',
      body: 'Trimiteți data, locația și numărul aproximativ de invitați. Răspund în max 24h cu disponibilitate confirmată și pachetul potrivit. Fără pretenții de avans pentru ofertă.',
      primaryLabel: 'Cere ofertă pentru nuntă →',
      primaryHref: '/cerere-oferta?service=nunta',
      secondaryLabel: 'Întrebări frecvente',
      secondaryHref: '#faq',
    },
  ]
}

main().catch((err) => {
  console.error('[seed] failed', err)
  process.exit(1)
})
