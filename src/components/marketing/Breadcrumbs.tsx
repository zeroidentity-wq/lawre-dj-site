import Link from 'next/link'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = { label: string; href?: string }

type Props = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs text-bone-dim', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1
          return (
            <Fragment key={`${it.label}-${idx}`}>
              <li className={cn(isLast && 'text-bone-muted')}>
                {it.href && !isLast ? (
                  <Link href={it.href} className="hover:text-bone transition-colors">
                    {it.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined}>{it.label}</span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="text-bone-dim/60">
                  /
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
