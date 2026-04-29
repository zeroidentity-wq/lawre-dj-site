import type { CollectionConfig } from 'payload'
import { revalidateForCollection } from '@/lib/revalidate'

export const ClubDates: CollectionConfig = {
  slug: 'club-dates',
  labels: { singular: 'Club Date', plural: 'Club Dates' },
  admin: { useAsTitle: 'venue', defaultColumns: ['venue', 'date', 'city'] },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('club-dates', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('club-dates', doc)
      },
    ],
  },
  fields: [
    { name: 'venue', type: 'text', required: true },
    { name: 'city', type: 'text', defaultValue: 'București' },
    { name: 'date', type: 'date', required: true },
    { name: 'ticketUrl', type: 'text' },
    { name: 'notes', type: 'textarea' },
  ],
}
