import type { GlobalConfig } from 'payload'
import { revalidateForGlobal } from '@/lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidateForGlobal('footer')
        return doc
      },
    ],
  },
  fields: [
    { name: 'copyright', type: 'text' },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
