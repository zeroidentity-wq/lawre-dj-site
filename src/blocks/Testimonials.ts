import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'eventType',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'Toate', value: 'all' },
        { label: 'Nuntă', value: 'nunta' },
        { label: 'Botez', value: 'botez' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Club', value: 'club' },
        { label: 'Majorat', value: 'majorat' },
        { label: 'Petrecere privată', value: 'privata' },
      ],
    },
    { name: 'max', type: 'number', defaultValue: 3, min: 1, max: 12 },
  ],
}
