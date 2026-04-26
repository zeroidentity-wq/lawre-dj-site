import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'publishedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'publishedAt', type: 'date' },
  ],
}
