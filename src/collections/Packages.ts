import type { CollectionConfig } from 'payload'
import { revalidateForCollection } from '@/lib/revalidate'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'price'] },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('packages', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('packages', doc)
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'tagline', type: 'text' },
    { name: 'price', type: 'number' },
    { name: 'currency', type: 'text', defaultValue: 'EUR' },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    { name: 'description', type: 'richText' },
  ],
}
