import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'date', 'eventType'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'location', type: 'text' },
    {
      name: 'eventType',
      type: 'select',
      options: ['nunta', 'botez', 'cununie', 'majorat', 'corporate', 'club', 'privat'],
    },
    { name: 'description', type: 'richText' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'completed',
      options: ['upcoming', 'completed'],
    },
  ],
}
