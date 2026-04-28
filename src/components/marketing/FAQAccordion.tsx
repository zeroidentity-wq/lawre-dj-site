import { Eyebrow } from '@/components/ui/Eyebrow'

type Item = { question: string; answer: string }

type Props = {
  eyebrow?: string
  heading?: string
  items: Item[]
}

export function FAQAccordion({ eyebrow, heading, items }: Props) {
  if (!items || items.length === 0) return null
  return (
    <section id="faq" className="border-t border-hairline py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
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
        <div className="max-w-3xl divide-y divide-hairline border-y border-hairline">
          {items.map((it, idx) => (
            <details key={idx} className="group py-5 md:py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h3 className="font-display text-lg md:text-xl font-medium tracking-tight text-bone">
                  {it.question}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-neon-300 text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 text-bone-muted leading-relaxed whitespace-pre-line">
                {it.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
