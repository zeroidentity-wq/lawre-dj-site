import type { GlobalConfig } from 'payload'
import { revalidateForGlobal } from '@/lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidateForGlobal('site-settings')
        return doc
      },
    ],
  },
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
    {
      name: 'heroRotating',
      type: 'group',
      label: 'Hero Rotativ',
      fields: [
        {
          name: 'staticTitle',
          type: 'text',
          defaultValue: 'Sunet care schimbă',
          admin: { description: 'Partea fixă a textului hero (ex: "Sunet care schimbă")' },
        },
        {
          name: 'intervalMs',
          type: 'number',
          defaultValue: 2800,
          min: 1500,
          max: 6000,
          admin: { description: 'Cât stă fiecare variantă pe ecran (ms). Recomandat: 2800.' },
        },
        {
          name: 'variants',
          type: 'array',
          minRows: 2,
          maxRows: 6,
          label: 'Variante text',
          fields: [
            {
              name: 'short',
              type: 'text',
              required: true,
              label: 'Text dinamic',
              admin: { description: 'Ex: "nunta voastră", "botezul copilului vostru"' },
            },
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
              label: 'Eyebrow chip text',
              admin: { description: 'Ex: "DJ • Nunți • București"' },
            },
            {
              name: 'cta',
              type: 'text',
              required: true,
              label: 'Buton principal text',
              admin: { description: 'Ex: "Cere ofertă pentru nuntă"' },
            },
            {
              name: 'hashUrl',
              type: 'text',
              required: true,
              label: 'URL destinație',
              admin: { description: 'Ex: "/cerere-oferta?service=nunta"' },
            },
          ],
        },
      ],
    },
  ],
}
