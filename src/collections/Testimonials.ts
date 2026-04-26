import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'clientName' },
  access: { read: () => true },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'eventType', type: 'text' },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'consentGiven', type: 'checkbox', defaultValue: false },
    { name: 'date', type: 'date' },
  ],
}
