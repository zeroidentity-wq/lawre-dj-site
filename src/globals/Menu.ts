import type { GlobalConfig } from 'payload'

export const Menu: GlobalConfig = {
  slug: 'menu',
  access: { read: () => true },
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
