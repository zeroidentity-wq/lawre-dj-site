import Link from 'next/link'
import { CONTACT, FOOTER_COLUMNS, LEGAL_LINKS, SITE_NAME } from '@/lib/constants'
import { Container } from '@/components/ui/Container'

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

        <div className="mt-12 pt-8 border-t border-hairline flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-bone-dim">
          <p>
            © {YEAR} {SITE_NAME}. Toate drepturile rezervate.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bone transition-colors"
              >
                Instagram
              </a>
            </li>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-bone transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
  const className = 'text-sm text-bone-muted hover:text-bone transition-colors'
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
