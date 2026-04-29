import type { CollectionConfig } from 'payload'
import { revalidateForCollection } from '@/lib/revalidate'

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'brand'] },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('equipment', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('equipment', doc)
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'brand', type: 'text' },
    { name: 'model', type: 'text' },
    {
      name: 'category',
      type: 'select',
      options: ['mixer', 'controller', 'speakers', 'lighting', 'microphone', 'cdj', 'other'],
    },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
