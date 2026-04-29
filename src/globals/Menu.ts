import type { GlobalConfig } from 'payload'
import { revalidateForGlobal } from '@/lib/revalidate'

export const Menu: GlobalConfig = {
  slug: 'menu',
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidateForGlobal('menu')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
