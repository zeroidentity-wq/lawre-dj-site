import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'price'] },
  access: { read: () => true },
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
