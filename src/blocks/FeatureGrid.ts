import type { Block } from 'payload'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Feature grid', plural: 'Feature grid blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '2',
      options: [
        { label: '2 coloane', value: '2' },
        { label: '3 coloane', value: '3' },
        { label: '4 coloane', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Element', plural: 'Elemente' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
