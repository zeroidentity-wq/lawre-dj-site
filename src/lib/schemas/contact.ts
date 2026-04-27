import { z } from 'zod'

export const EVENT_TYPES = [
  'nunta',
  'botez',
  'corporate',
  'club',
  'majorat',
  'privata',
  'altul',
] as const

export const EVENT_TYPE_LABELS: Record<(typeof EVENT_TYPES)[number], string> = {
  nunta: 'Nuntă',
  botez: 'Botez',
  corporate: 'Corporate',
  club: 'Club',
  majorat: 'Majorat',
  privata: 'Petrecere privată',
  altul: 'Altul',
}

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === '' ? undefined : v))

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Numele e prea scurt'),
  email: z.string().trim().email('Email invalid'),
  phone: optionalString.pipe(z.string().min(7, 'Telefon invalid').optional()),
  eventType: z.enum(EVENT_TYPES),
  eventDate: optionalString,
  location: optionalString,
  guestCount: z
    .string()
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : Number(v)))
    .pipe(z.number().int().positive('Număr invitați invalid').optional()),
  budget: optionalString,
  message: z.string().trim().min(10, 'Spune mai multe — minim 10 caractere'),
})

export type ContactInput = z.infer<typeof contactSchema>
