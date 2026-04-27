import Image from 'next/image'

type Props = {
  quote: string
  clientName: string
  eventType?: string
  rating?: number
  photo?: { url: string; alt: string }
}

export function TestimonialCard({ quote, clientName, eventType, rating = 5, photo }: Props) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <figure className="flex flex-col h-full bg-ink-soft border border-hairline rounded-lg p-6 md:p-8">
      <div className="flex gap-0.5 text-neon-300" aria-label={`Rating ${rounded} din 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} aria-hidden className={i < rounded ? 'text-neon-300' : 'text-bone-dim'}>
            ★
          </span>
        ))}
      </div>
      <blockquote className="mt-4 text-bone leading-relaxed">
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {photo && (
          <Image
            src={photo.url}
            alt={photo.alt}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        )}
        <div>
          <div className="text-sm font-medium text-bone">{clientName}</div>
          {eventType && <div className="text-xs text-bone-dim">{eventType}</div>}
        </div>
      </figcaption>
    </figure>
  )
}
