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

        <div className="hidden md:block">
          <Button href="/cerere-oferta" variant="primary" size="sm">
            Cere ofertă →
          </Button>
        </div>

        <HeaderMobileMenu />
      </Container>
    </header>
  )
}
