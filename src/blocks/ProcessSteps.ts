import type { Block } from 'payload'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  labels: { singular: 'Process steps', plural: 'Process steps blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Pas', plural: 'Pași' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
