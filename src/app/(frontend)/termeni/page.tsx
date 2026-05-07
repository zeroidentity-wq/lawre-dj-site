import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPage } from '@/components/legal/LegalPage'
import { H2, P, UL, Strong } from '@/components/legal/elements'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'
import { ANSPDCP, OPERATOR, PRIVACY_POLICY_UPDATED_AT } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Termeni și condiții — ${SITE_NAME}`,
  description:
    'Termenii și condițiile de utilizare a site-ului lawredj.ro și ale serviciilor oferite de Lawre DJ.',
  alternates: { canonical: `${SITE_URL}/termeni` },
}

export default function TermeniPage() {
  return (
    <LegalPage
      eyebrow="Termeni"
      title="Termeni și condiții"
      updatedAt={PRIVACY_POLICY_UPDATED_AT}
    >
      <P>
        Folosirea site-ului <Strong>{SITE_NAME}</Strong> (lawredj.ro) presupune acceptarea acestor termeni.
        Dacă nu ești de acord, te rugăm să nu utilizezi site-ul.
      </P>

      <H2 id="operator">1. Date de identificare</H2>
      <UL>
        <li><Strong>Denumire:</Strong> {OPERATOR.legalName}</li>
        <li><Strong>CUI:</Strong> {OPERATOR.cui}</li>
        {OPERATOR.regCom.startsWith('TODO') ? null : (
          <li><Strong>Reg. Com.:</Strong> {OPERATOR.regCom}</li>
        )}
        <li><Strong>Sediu:</Strong> {OPERATOR.address}</li>
        <li><Strong>Email:</Strong>{' '}
          <a href={`mailto:${CONTACT.email}`} className="text-neon-400 hover:text-neon-300">{CONTACT.email}</a>
        </li>
        <li><Strong>Telefon:</Strong>{' '}
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-neon-400 hover:text-neon-300">
            {CONTACT.phone}
          </a>
        </li>
      </UL>

      <H2 id="obiect">2. Obiectul site-ului</H2>
      <P>
        Site-ul prezintă serviciile de DJ și sonorizare oferite de Lawre DJ pentru evenimente private și publice
        (nuntă, botez, cununie, majorat, corporate, club, petreceri private). Prin formularele puse la dispoziție
        poți solicita oferte. Trimiterea unui formular NU constituie un contract — colaborarea se confirmă printr-un
        contract scris separat.
      </P>

      <H2 id="proprietate-intelectuala">3. Proprietate intelectuală</H2>
      <P>
        Toate textele, fotografiile, video-urile, mixurile, logo-urile și grafica de pe site sunt proprietatea{' '}
        {OPERATOR.legalName} sau folosite cu acordul deținătorilor de drepturi. Reproducerea, distribuirea sau
        folosirea comercială fără acord scris este interzisă.
      </P>

      <H2 id="utilizare">4. Reguli de utilizare</H2>
      <UL>
        <li>Folosește site-ul doar în scopuri legale.</li>
        <li>Nu transmite informații false prin formulare.</li>
        <li>Nu încerca să accesezi neautorizat sistemele site-ului.</li>
        <li>Nu folosi roboți / scrapere pentru a colecta date masiv de pe site.</li>
      </UL>

      <H2 id="oferte">5. Oferte și prețuri</H2>
      <P>
        Prețurile afișate pe paginile de pachete sunt orientative. Prețul final depinde de detaliile evenimentului
        (dată, locație, durată, echipament suplimentar) și se confirmă prin oferta scrisă transmisă pe email,
        valabilă 14 zile de la emitere.
      </P>

      <H2 id="rezervari">6. Rezervări și plăți</H2>
      <P>
        Confirmarea unei date se face printr-un avans (de regulă 30%) și semnarea contractului. Termenii exacți
        (avans, plată finală, anulare, reprogramare, situații de forță majoră) sunt detaliați în contractul
        individual al fiecărui eveniment.
      </P>

      <H2 id="raspundere">7. Limitarea răspunderii</H2>
      <P>
        Site-ul este oferit „așa cum este". Depunem efort să menținem informațiile actualizate, dar nu garantăm că
        toate detaliile (prețuri, disponibilitate, descrieri) sunt complete sau actuale în orice moment. Nu suntem
        răspunzători pentru eventuale daune indirecte rezultate din folosirea site-ului.
      </P>

      <H2 id="link-uri">8. Linkuri externe</H2>
      <P>
        Site-ul poate conține linkuri către site-uri terțe (Instagram, SoundCloud, Google Maps etc.). Nu suntem
        responsabili pentru conținutul sau practicile acestor site-uri.
      </P>

      <H2 id="protectia-datelor">9. Protecția datelor</H2>
      <P>
        Modul în care prelucrăm datele personale este descris în{' '}
        <Link href="/confidentialitate" className="text-neon-400 hover:text-neon-300">
          Politica de confidențialitate
        </Link>{' '}
        și{' '}
        <Link href="/cookies" className="text-neon-400 hover:text-neon-300">
          Politica de cookies
        </Link>.
      </P>

      <H2 id="solutionarea-disputelor">10. Soluționarea disputelor</H2>
      <P>
        Termenii sunt guvernați de legea română. Eventualele neînțelegeri se rezolvă pe cale amiabilă. Dacă nu e
        posibil, sunt competente instanțele din București. Consumatorii se pot adresa și platformei europene{' '}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon-400 hover:text-neon-300"
        >
          ec.europa.eu/consumers/odr
        </a>{' '}
        sau ANPC.
      </P>

      <H2 id="autoritate">11. Autoritatea de supraveghere</H2>
      <P>
        Pentru reclamații privind protecția datelor: {ANSPDCP.name} ({ANSPDCP.shortName}) — {ANSPDCP.address}.
      </P>

      <H2 id="modificari">12. Modificări</H2>
      <P>
        Putem actualiza acești termeni. Versiunea actualizată e marcată cu data ultimei modificări de mai sus.
        Continuarea utilizării site-ului înseamnă acceptarea termenilor actualizați.
      </P>
    </LegalPage>
  )
}
