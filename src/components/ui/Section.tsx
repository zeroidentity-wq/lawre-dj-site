import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'

type Props = HTMLAttributes<HTMLElement> & {
  containerClassName?: string
  withContainer?: boolean
}

export function Section({
  className,
  containerClassName,
  withContainer = true,
  children,
  ...props
}: Props) {
  const content = withContainer ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  )
  return (
    <section className={cn('py-20 md:py-32', className)} {...props}>
      {content}
    </section>
  )
}
