import Link from 'next/link'
import { CONTACT, FOOTER_COLUMNS, LEGAL_LINKS, SITE_NAME } from '@/lib/constants'
import { OPERATOR } from '@/lib/legal'
import { Container } from '@/components/ui/Container'
import { CookieSettingsButton } from '@/components/consent/CookieBanner'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-20">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] uppercase tracking-[0.08em] text-bone-dim mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-hairline space-y-6 text-xs text-bone-dim">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1.5 leading-relaxed">
              <p className="text-bone-muted">
                <span className="text-bone font-medium">{OPERATOR.legalName}</span>
                {!OPERATOR.cui.startsWith('TODO') && <> · CUI {OPERATOR.cui}</>}
                {!OPERATOR.regCom.startsWith('TODO') && <> · {OPERATOR.regCom}</>}
              </p>
              {!OPERATOR.address.startsWith('TODO') && <p>{OPERATOR.address}</p>}
              <p>
                Pentru cereri privind datele personale:{' '}
                <a
                  href={`mailto:${OPERATOR.privacyEmail}`}
                  className="text-neon-400 hover:text-neon-300 transition-colors"
                >
                  {OPERATOR.privacyEmail}
                </a>
              </p>
            </div>
            <div className="md:text-right">
              <p>
                ANPC:{' '}
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors"
                >
                  Soluționarea alternativă a litigiilor (SAL)
                </a>
                {' · '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors"
                >
                  SOL
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>
              © {YEAR} {SITE_NAME}. Toate drepturile rezervate.
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neon-400 hover:text-neon-300 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                  @lawre_dj
                </a>
              </li>
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-bone transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="hover:text-bone transition-colors" />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
  const isInstagram = href.includes('instagram.com')
  const className = 'text-sm text-bone-muted hover:text-bone transition-colors'

  if (isInstagram) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-neon-400 hover:text-neon-300 transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
        {label}
      </a>
    )
  }

  if (isExternal) {
    return (
      <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}
