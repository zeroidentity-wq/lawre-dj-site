import type { CollectionConfig } from 'payload'
import { revalidateForCollection } from '@/lib/revalidate'

export const Mixes: CollectionConfig = {
  slug: 'mixes',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'platform'] },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('mixes', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('mixes', doc)
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'platform',
      type: 'select',
      options: ['soundcloud', 'mixcloud', 'youtube'],
      required: true,
    },
    { name: 'embedUrl', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
  ],
}
