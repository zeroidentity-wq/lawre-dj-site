import type { CollectionConfig } from 'payload'
import { layoutBlocks } from '@/blocks'
import { seo } from '@/fields/seo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [...layoutBlocks],
    },
    seo,
  ],
}
