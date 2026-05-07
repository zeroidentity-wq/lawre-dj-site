import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPage } from '@/components/legal/LegalPage'
import { H2, P, UL, Strong } from '@/components/legal/elements'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { OPERATOR, PRIVACY_POLICY_UPDATED_AT } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Politica de cookies — ${SITE_NAME}`,
  description:
    'Ce cookie-uri folosim pe lawredj.ro, în ce scop și cum îți poți gestiona consimțământul.',
  alternates: { canonical: `${SITE_URL}/cookies` },
}

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Politica de cookies"
      updatedAt={PRIVACY_POLICY_UPDATED_AT}
    >
      <P>
        Acest site folosește cookie-uri pentru a funcționa corect și — doar cu acordul tău — pentru a măsura
        audiența anonim. Această politică explică ce sunt cookie-urile, ce categorii folosim și cum îți poți
        schimba alegerea.
      </P>

      <H2 id="ce-sunt">Ce sunt cookie-urile</H2>
      <P>
        Cookie-urile sunt fișiere text mici stocate de browserul tău la vizitarea unui site. Ne ajută, de exemplu,
        să ținem minte că ești autentificat în admin sau că ai acceptat / refuzat anumite categorii.
      </P>

      <H2 id="categorii">Categoriile pe care le folosim</H2>

      <H2 id="strict-necesare">1. Strict necesare</H2>
      <P>
        Aceste cookie-uri sunt esențiale pentru ca site-ul să funcționeze. NU pot fi dezactivate și nu necesită
        consimțământ (art. 5 alin. (3) Directiva ePrivacy).
      </P>
      <UL>
        <li><Strong>lawre_consent</Strong> — reține alegerea ta privind consimțământul cookies. Durată: 6 luni. Furnizor: lawredj.ro.</li>
        <li><Strong>payload-token</Strong> — sesiune autentificare admin (doar pentru utilizatorii admin). Durată: sesiune. Furnizor: lawredj.ro.</li>
      </UL>

      <H2 id="analitice">2. Analitice (opt-in)</H2>
      <P>
        Se încarcă doar dacă ai apăsat „Accept" în bannerul de cookies. Ne ajută să înțelegem cum e folosit site-ul,
        anonim și agregat.
      </P>
      <UL>
        <li>
          <Strong>_ga, _ga_*</Strong> (Google Analytics 4) — ID anonim de utilizator pentru a măsura sesiuni unice. Durată: până la 13 luni. Furnizor: Google LLC.
          IP-urile sunt anonimizate. Folosim Consent Mode v2: dacă refuzi, NU se setează aceste cookie-uri.
        </li>
      </UL>

      <H2 id="terti">3. Cookie-uri terțe (embed-uri)</H2>
      <P>
        Anumite pagini conțin elemente încorporate (Instagram, SoundCloud, Mixcloud, YouTube, Google Maps). Acești
        furnizori pot seta propriile cookie-uri când interacționezi cu conținutul lor. Te invităm să consulți politicile lor.
      </P>

      <H2 id="cum-controlezi">Cum îți controlezi alegerea</H2>
      <UL>
        <li>
          La prima vizită apare bannerul de consimțământ, unde poți <Strong>Accepta</Strong> sau{' '}
          <Strong>Refuza</Strong> categoriile opționale.
        </li>
        <li>
          Îți poți schimba oricând alegerea apăsând butonul „Setări cookies" din subsolul site-ului.
        </li>
        <li>
          Poți șterge cookie-urile direct din browser (Chrome, Firefox, Safari, Edge — fiecare browser are propriile setări).
        </li>
      </UL>

      <H2 id="legaturi">Mai multe informații</H2>
      <P>
        Vezi și{' '}
        <Link href="/confidentialitate" className="text-neon-400 hover:text-neon-300">
          Politica de confidențialitate
        </Link>
        . Pentru întrebări:{' '}
        <a href={`mailto:${OPERATOR.privacyEmail}`} className="text-neon-400 hover:text-neon-300">
          {OPERATOR.privacyEmail}
        </a>.
      </P>
    </LegalPage>
  )
}
