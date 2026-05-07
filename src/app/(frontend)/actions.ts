'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { contactSchema } from '@/lib/schemas/contact'

export type SubmitState = {
  ok: boolean
  errors?: Record<string, string>
  message?: string
}

export async function submitContact(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const raw = Object.fromEntries(formData) as Record<string, string>
  const parsed = contactSchema.safeParse(raw)

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !errors[key]) errors[key] = issue.message
    }
    return { ok: false, errors }
  }

  try {
    const payload = await getPayload({ config: await config })
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        eventType: parsed.data.eventType,
        eventDate: parsed.data.eventDate,
        location: parsed.data.location,
        guestCount: parsed.data.guestCount,
        budget: parsed.data.budget,
        message: parsed.data.message,
        gdprConsent: true,
        gdprConsentAt: new Date().toISOString(),
      },
    })
    return { ok: true, message: 'Mulțumim, îți răspund în max 24h.' }
  } catch (err) {
    console.error('[submitContact] payload create failed', err)
    return {
      ok: false,
      message: 'A apărut o eroare. Încearcă din nou sau scrie-ne pe email.',
    }
  }
}
