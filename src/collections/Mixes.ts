import type { CollectionConfig } from 'payload'

export const Mixes: CollectionConfig = {
  slug: 'mixes',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'platform'] },
  access: { read: () => true },
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
