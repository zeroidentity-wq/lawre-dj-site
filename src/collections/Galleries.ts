import type { CollectionConfig } from 'payload'
import { revalidateForCollection } from '@/lib/revalidate'

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('galleries', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('galleries', doc)
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      options: ['nunta', 'botez', 'corporate', 'club', 'majorat', 'privat'],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
