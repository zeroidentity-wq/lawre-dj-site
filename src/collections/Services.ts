import type { CollectionConfig } from 'payload'
import { layoutBlocks } from '@/blocks'
import { seo } from '@/fields/seo'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'startingPrice'] },
  access: { read: () => true },
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
