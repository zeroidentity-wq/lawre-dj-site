import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'
import { WaveformDivider } from './WaveformDivider'

type Props = HTMLAttributes<HTMLElement> & {
  containerClassName?: string
  withContainer?: boolean
  /** Animated waveform divider above the section. Stagger via `dividerDelay`. */
  divider?: boolean
  dividerDelay?: number
}

export function Section({
  className,
  containerClassName,
  withContainer = true,
  divider = false,
  dividerDelay = 0,
  children,
  ...props
}: Props) {
  const content = withContainer ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  )
  return (
    <>
      {divider && <WaveformDivider delay={dividerDelay} />}
      <section className={cn('py-20 md:py-32', className)} {...props}>
        {content}
      </section>
    </>
  )
}
