import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Lawre DJ' },
    { name: 'tagline', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'tiktok', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'soundcloud', type: 'text' },
      ],
    },
    {
      name: 'seoDefaults',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
