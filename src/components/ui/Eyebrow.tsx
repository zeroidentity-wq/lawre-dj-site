import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-block text-[11px] font-medium uppercase tracking-[0.08em] text-neon-300 bg-neon-500/10 px-3 py-1 rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
