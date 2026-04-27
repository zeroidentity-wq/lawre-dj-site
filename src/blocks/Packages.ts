import type { Block } from 'payload'

export const Packages: Block = {
  slug: 'packages',
  labels: { singular: 'Packages', plural: 'Packages blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'packages',
      type: 'relationship',
      relationTo: 'packages',
      hasMany: true,
      admin: { description: 'Lasă gol ca să afișezi toate pachetele.' },
    },
  ],
}
