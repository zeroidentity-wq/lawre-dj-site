import type { CollectionConfig } from 'payload'

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'brand'] },
  access: { read: () => true },
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
