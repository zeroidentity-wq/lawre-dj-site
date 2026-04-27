import Link from 'next/link'
import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-neon-500 hover:bg-neon-400 text-ink',
  ghost: 'border border-hairline hover:border-hairline2 text-bone',
  link: 'text-neon-300 hover:text-neon-200 underline-offset-4 hover:underline px-0 py-0',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children?: React.ReactNode
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
  } & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | keyof CommonProps>

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined
  }

export type ButtonProps = AnchorProps | NativeButtonProps

function isAnchor(props: ButtonProps): props is AnchorProps {
  return typeof (props as AnchorProps).href === 'string'
}

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className } = props
    const variantClass = variant === 'link' ? variants.link : `${variants[variant]}`
    const sizeClass = variant === 'link' ? '' : sizes[size]
    const classes = cn(base, variantClass, sizeClass, className)

    if (isAnchor(props)) {
      const { variant: _v, size: _s, className: _c, href, children, ...rest } = props
      const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            {...rest}
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        >
          {children}
        </Link>
      )
    }
    const { variant: _v, size: _s, className: _c, children, ...rest } = props
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...rest}>
        {children}
      </button>
    )
  },
)
