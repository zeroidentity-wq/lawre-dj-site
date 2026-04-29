import type { CollectionConfig } from 'payload'
import { layoutBlocks } from '@/blocks'
import { seo } from '@/fields/seo'
import { revalidateForCollection } from '@/lib/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'startingPrice'] },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateForCollection('services', doc, previousDoc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateForCollection('services', doc)
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'eyebrow', type: 'text' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'startingPrice', type: 'number' },
    {
      name: 'relatedPackages',
      type: 'relationship',
      relationTo: 'packages',
      hasMany: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [...layoutBlocks],
    },
    {
      name: 'schema',
      type: 'textarea',
      admin: {
        description: 'JSON-LD custom (opțional). Lasă gol pentru a folosi schema generată automat.',
      },
    },
    seo,
  ],
}
