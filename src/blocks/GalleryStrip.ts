import type { Block } from 'payload'

export const GalleryStrip: Block = {
  slug: 'galleryStrip',
  labels: { singular: 'Gallery strip', plural: 'Gallery strip blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'galleries',
      required: true,
    },
  ],
}
