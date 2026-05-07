import type { ReactNode } from 'react'

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-bone mt-10 mb-4 scroll-mt-28">
      {children}
    </h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-lg font-medium text-bone mt-6 mb-3">{children}</h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] text-bone-muted leading-relaxed">{children}</p>
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-[15px] text-bone-muted leading-relaxed">{children}</ul>
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-bone font-medium">{children}</strong>
}
