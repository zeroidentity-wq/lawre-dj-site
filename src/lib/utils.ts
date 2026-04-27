import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | Date, locale = 'ro-RO'): string {
  const d = typeof input === 'string' ? new Date(input) : input
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}
