import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { HeaderMobileMenu } from './HeaderMobileMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-ink/80 border-b border-hairline">
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <span className="size-2 rounded-sm bg-neon-500 group-hover:bg-neon-400 transition-colors" aria-hidden />
          <span className="font-display font-medium tracking-tight text-bone text-base md:text-lg">
            LAWRE DJ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-bone-muted hover:text-bone transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.instagram.com/lawre_dj/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neon-500/40 text-neon-400 hover:border-neon-400 hover:bg-neon-500/10 transition-colors text-xs font-medium"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            @lawre_dj
          </a>
          <Button
            href="https://wa.me/40764443356"
            variant="ghost"
            size="sm"
            className="text-neon-400 border border-neon-500/40 hover:border-neon-400 hover:bg-neon-500/10"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.858L0 24l6.335-1.502A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.022-1.381l-.36-.214-3.732.885.944-3.617-.235-.372A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            WhatsApp
          </Button>
          <Button href="/cerere-oferta" variant="primary" size="sm">
            Cere ofertă →
          </Button>
        </div>

        <HeaderMobileMenu />
      </Container>
    </header>
  )
}
