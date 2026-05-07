import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

type Props = {
  eyebrow: string
  title: string
  updatedAt: string
  children: ReactNode
}

export function LegalPage({ eyebrow, title, updatedAt, children }: Props) {
  return (
    <>
      <Section className="pt-24 pb-8">
        <Container>
          <p className="text-xs uppercase tracking-[0.12em] text-neon-400 font-medium mb-4">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone max-w-3xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-bone-dim">Ultima actualizare: {updatedAt}</p>
        </Container>
      </Section>
      <Section className="pt-4 pb-24">
        <Container>
          <div className="prose-legal max-w-3xl text-bone-muted leading-relaxed text-[15px] space-y-6">
            {children}
          </div>
        </Container>
      </Section>
    </>
  )
}
