import type { GroupField } from 'payload'

export const seo: GroupField = {
  name: 'seo',
  label: 'SEO',
  type: 'group',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'metaTitle', type: 'text', maxLength: 60 },
    { name: 'metaDescription', type: 'textarea', maxLength: 160 },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'noindex', type: 'checkbox', defaultValue: false },
    { name: 'canonicalUrl', type: 'text' },
  ],
}
