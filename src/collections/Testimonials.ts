import type { CollectionConfig } from 'payload'
import { revalidateForCollection } from '@/lib/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'clientName' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('testimonials', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('testimonials', doc)
      },
    ],
  },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'eventType', type: 'text' },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'consentGiven', type: 'checkbox', defaultValue: false },
    { name: 'date', type: 'date' },
  ],
}
