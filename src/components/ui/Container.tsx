import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = HTMLAttributes<HTMLDivElement> & { size?: 'default' | 'narrow' }

export function Container({ className, size = 'default', ...props }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-8',
        size === 'narrow' ? 'max-w-3xl' : 'max-w-7xl',
        className,
      )}
      {...props}
    />
  )
}
