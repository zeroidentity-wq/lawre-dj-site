import type { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'CTA', plural: 'CTA blocks' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'primaryLabel', type: 'text' },
    { name: 'primaryHref', type: 'text' },
    { name: 'secondaryLabel', type: 'text' },
    { name: 'secondaryHref', type: 'text' },
  ],
}
