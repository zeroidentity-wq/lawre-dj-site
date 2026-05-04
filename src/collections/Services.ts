import type { CollectionConfig } from 'payload'
import { layoutBlocks } from '@/blocks'
import { seo } from '@/fields/seo'
import { revalidateForCollection } from '@/lib/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'displayOrder', 'cardTag'] },
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
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 999,
      admin: {
        description: 'Ordinea pe homepage. Mai mic = primul card afișat.',
        position: 'sidebar',
      },
    },
    {
      name: 'cardTag',
      type: 'select',
      options: [
        { label: '— fără tag —', value: 'none' },
        { label: 'Cel mai cerut', value: 'most-popular' },
        { label: 'Specialitate', value: 'specialty' },
        { label: 'Nou', value: 'new' },
      ],
      defaultValue: 'none',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Card cu border accent (atrage atenție)',
        position: 'sidebar',
      },
    },
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
