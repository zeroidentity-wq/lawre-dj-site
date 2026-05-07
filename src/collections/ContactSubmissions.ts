import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Mesaj contact', plural: 'Mesaje contact' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'eventType', 'eventDate', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'eventType', type: 'text' },
    { name: 'eventDate', type: 'date' },
    { name: 'location', type: 'text' },
    { name: 'guestCount', type: 'number' },
    { name: 'budget', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'gdprConsent',
      type: 'checkbox',
      label: 'Consimțământ GDPR',
      admin: { readOnly: true, description: 'Bifat de utilizator la trimiterea formularului.' },
    },
    {
      name: 'gdprConsentAt',
      type: 'date',
      label: 'Data consimțământului',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
