import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

type Props = {
  title: string
  excerpt?: string
  href: string
  cover?: { url: string; alt: string }
  publishedAt?: string
}

export function PostCard({ title, excerpt, href, cover, publishedAt }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full bg-ink-soft border border-hairline hover:border-neon-500/40 rounded-lg overflow-hidden transition-colors"
    >
      {cover && (
        <div className="relative aspect-[16/9] bg-ink-raised">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
        {publishedAt && (
          <time dateTime={publishedAt} className="text-xs text-bone-dim uppercase tracking-[0.08em]">
            {formatDate(publishedAt)}
          </time>
        )}
        <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-bone group-hover:text-neon-200 transition-colors">
          {title}
        </h3>
        {excerpt && <p className="mt-3 text-sm text-bone-muted leading-relaxed line-clamp-3">{excerpt}</p>}
        <span className="mt-6 inline-flex items-center gap-1 text-sm text-neon-300 group-hover:text-neon-200 transition-colors">
          Citește
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  )
}
