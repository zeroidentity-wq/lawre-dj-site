import type { Block } from 'payload'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  labels: { singular: 'Services grid', plural: 'Services grid blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { description: 'Lasă gol ca să afișezi toate serviciile.' },
    },
  ],
}
