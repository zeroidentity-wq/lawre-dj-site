import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'

type Step = { label: string; body: string }

type Props = {
  eyebrow?: string
  heading?: string
  steps: Step[]
}

export function ProcessSteps({ eyebrow, heading, steps }: Props) {
  if (!steps || steps.length === 0) return null
  return (
    <section className="border-t border-hairline py-20 md:py-28">
      <Container>
        {(eyebrow || heading) && (
          <header className="max-w-2xl mb-12">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-[-0.015em]">
                {heading}
              </h2>
            )}
          </header>
        )}
        <ol className="max-w-3xl divide-y divide-hairline border-y border-hairline">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-8 md:py-10"
            >
              <span className="font-display text-2xl md:text-3xl font-medium tracking-tight text-neon-300 tabular-nums leading-none pt-1">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-bone leading-snug">
                {step.label}
              </h3>
              <div className="col-start-2 text-bone-muted leading-relaxed whitespace-pre-line">
                {step.body}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
