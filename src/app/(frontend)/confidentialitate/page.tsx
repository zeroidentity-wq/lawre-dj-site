import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPage } from '@/components/legal/LegalPage'
import { H2, H3, P, UL, Strong } from '@/components/legal/elements'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'
import {
  ANSPDCP,
  CONTACT_RETENTION_MONTHS,
  OPERATOR,
  PRIVACY_POLICY_UPDATED_AT,
} from '@/lib/legal'

export const metadata: Metadata = {
  title: `Politica de confidențialitate — ${SITE_NAME}`,
  description:
    'Cum prelucrăm datele tale personale conform Regulamentului GDPR (UE) 2016/679 și Legii nr. 190/2018.',
  alternates: { canonical: `${SITE_URL}/confidentialitate` },
  robots: { index: true, follow: true },
}

export default function ConfidentialitatePage() {
  return (
    <LegalPage
      eyebrow="Confidențialitate"
      title="Politica de confidențialitate"
      updatedAt={PRIVACY_POLICY_UPDATED_AT}
    >
      <P>
        Această politică explică cum sunt colectate, folosite și protejate datele tale personale atunci când
        folosești site-ul <Strong>{SITE_NAME}</Strong> (lawredj.ro). Prelucrarea se face în conformitate cu{' '}
        <Strong>Regulamentul (UE) 2016/679</Strong> (GDPR) și <Strong>Legea nr. 190/2018</Strong>.
      </P>

      <H2 id="operator">1. Operatorul de date</H2>
      <P>
        Operatorul datelor cu caracter personal este:
      </P>
      <UL>
        <li><Strong>Denumire:</Strong> {OPERATOR.legalName}</li>
        <li><Strong>CUI:</Strong> {OPERATOR.cui}</li>
        {OPERATOR.regCom.startsWith('TODO') ? null : (
          <li><Strong>Reg. Com.:</Strong> {OPERATOR.regCom}</li>
        )}
        <li><Strong>Sediu:</Strong> {OPERATOR.address}</li>
        <li><Strong>Email pentru date personale:</Strong>{' '}
          <a href={`mailto:${OPERATOR.privacyEmail}`} className="text-neon-400 hover:text-neon-300">
            {OPERATOR.privacyEmail}
          </a>
        </li>
      </UL>

      <H2 id="ce-date">2. Ce date colectăm</H2>
      <H3>2.1. Prin formularul de contact / cerere ofertă</H3>
      <UL>
        <li>Nume și prenume</li>
        <li>Adresă de email</li>
        <li>Număr de telefon (opțional)</li>
        <li>Detalii despre eveniment: tip, dată, locație, număr invitați, buget orientativ (opțional)</li>
        <li>Conținutul mesajului</li>
        <li>Bifa de consimțământ și data/ora trimiterii formularului</li>
      </UL>

      <H3>2.2. Automat, prin navigarea pe site</H3>
      <UL>
        <li>Adresa IP (anonimizată în statistici)</li>
        <li>Tipul de browser și dispozitiv, sistem de operare</li>
        <li>Pagini vizitate, durata sesiunii, sursa de trafic</li>
        <li>Cookie-uri (vezi <Link href="/cookies" className="text-neon-400 hover:text-neon-300">Politica de cookies</Link>)</li>
      </UL>

      <H2 id="scopuri">3. Scopurile prelucrării și temeiul legal</H2>
      <UL>
        <li>
          <Strong>Răspuns la cereri / oferte</Strong> — temei: art. 6 alin. (1) lit. (a) GDPR (consimțământ) și
          lit. (b) (măsuri precontractuale la cererea ta).
        </li>
        <li>
          <Strong>Executarea contractului</Strong> dacă ajungem la o colaborare — temei: art. 6 alin. (1) lit. (b) GDPR.
        </li>
        <li>
          <Strong>Statistici de audiență anonime</Strong> (Google Analytics, dacă ai acceptat cookie-urile analitice) —
          temei: art. 6 alin. (1) lit. (a) GDPR (consimțământ).
        </li>
        <li>
          <Strong>Obligații legale</Strong> (facturare, contabilitate, dacă semnăm contract) — temei: art. 6 alin. (1) lit. (c) GDPR.
        </li>
      </UL>

      <H2 id="retentie">4. Cât timp păstrăm datele</H2>
      <UL>
        <li>
          <Strong>Mesaje formular contact:</Strong> {CONTACT_RETENTION_MONTHS} luni de la primire, după care sunt șterse automat.
        </li>
        <li>
          <Strong>Documente fiscale (facturi/contracte):</Strong> 10 ani, conform Legii contabilității nr. 82/1991.
        </li>
        <li>
          <Strong>Cookie-uri:</Strong> conform duratei specificate în <Link href="/cookies" className="text-neon-400 hover:text-neon-300">Politica de cookies</Link>.
        </li>
      </UL>

      <H2 id="destinatari">5. Cui transmitem datele</H2>
      <P>Datele NU sunt vândute. Le transmitem doar către împuterniciți care ne ajută să oferim serviciile:</P>
      <UL>
        <li><Strong>Furnizor hosting:</Strong> Vercel Inc. (UE/SUA) și Railway / Hetzner — pentru găzduirea site-ului și a bazei de date</li>
        <li><Strong>Resend</Strong> — trimitere email-uri tranzacționale</li>
        <li><Strong>Google LLC (Analytics 4)</Strong> — statistici de audiență, doar dacă ai acceptat</li>
        <li><Strong>Cloudflare R2 / S3</Strong> — stocare fișiere media</li>
        <li><Strong>Autorități publice</Strong> — la cerere, doar dacă există obligație legală</li>
      </UL>
      <P>
        Toate transferurile către spațiul non-UE se fac în baza Clauzelor Contractuale Standard (SCC) sau a Cadrului
        de Confidențialitate UE-SUA (Data Privacy Framework).
      </P>

      <H2 id="drepturi">6. Drepturile tale</H2>
      <P>Conform GDPR, ai următoarele drepturi:</P>
      <UL>
        <li><Strong>Dreptul de acces</Strong> — să afli ce date avem despre tine</li>
        <li><Strong>Dreptul la rectificare</Strong> — să corectezi datele inexacte</li>
        <li><Strong>Dreptul la ștergere</Strong> („dreptul de a fi uitat")</li>
        <li><Strong>Dreptul la restricționarea prelucrării</Strong></li>
        <li><Strong>Dreptul la portabilitatea datelor</Strong></li>
        <li><Strong>Dreptul la opoziție</Strong></li>
        <li><Strong>Dreptul de a-ți retrage consimțământul</Strong> oricând, fără să afecteze legalitatea prelucrării anterioare</li>
        <li>
          <Strong>Dreptul de a depune plângere</Strong> la {ANSPDCP.shortName} — {ANSPDCP.address}, email:{' '}
          <a href={`mailto:${ANSPDCP.email}`} className="text-neon-400 hover:text-neon-300">{ANSPDCP.email}</a>,{' '}
          <a href={ANSPDCP.website} target="_blank" rel="noopener noreferrer" className="text-neon-400 hover:text-neon-300">
            dataprotection.ro
          </a>
        </li>
      </UL>
      <P>
        Pentru a-ți exercita orice drept, scrie-ne la{' '}
        <a href={`mailto:${OPERATOR.privacyEmail}`} className="text-neon-400 hover:text-neon-300">
          {OPERATOR.privacyEmail}
        </a>
        . Vom răspunde în maxim 30 de zile.
      </P>

      <H2 id="securitate">7. Securitatea datelor</H2>
      <P>
        Folosim măsuri tehnice și organizatorice rezonabile: HTTPS pe tot site-ul, parole hash-uite, acces restricționat
        la baza de date, backup-uri criptate. Niciun sistem nu e 100% sigur, dar facem tot ce putem să îți protejăm datele.
      </P>

      <H2 id="minori">8. Minori</H2>
      <P>
        Site-ul nu se adresează persoanelor sub 16 ani și nu colectăm intenționat date de la minori. Dacă afli că un
        minor ne-a transmis date, contactează-ne pentru ștergere.
      </P>

      <H2 id="modificari">9. Modificări ale politicii</H2>
      <P>
        Putem actualiza această politică. Versiunea curentă și data ultimei modificări sunt afișate sus. La modificări
        semnificative îți vom cere consimțământ reînnoit.
      </P>

      <H2 id="contact">10. Contact</H2>
      <P>
        Pentru orice întrebare despre prelucrarea datelor:{' '}
        <a href={`mailto:${OPERATOR.privacyEmail}`} className="text-neon-400 hover:text-neon-300">
          {OPERATOR.privacyEmail}
        </a>{' '}
        sau{' '}
        <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-neon-400 hover:text-neon-300">
          {CONTACT.phone}
        </a>.
      </P>
    </LegalPage>
  )
}
