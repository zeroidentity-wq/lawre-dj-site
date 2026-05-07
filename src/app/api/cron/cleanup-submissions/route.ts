import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CONTACT_RETENTION_MONTHS } from '@/lib/legal'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Deletes contact-submissions older than CONTACT_RETENTION_MONTHS.
// Triggered by Vercel Cron (vercel.json) or any external scheduler.
// Auth: Authorization: Bearer ${CRON_SECRET}
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return Response.json(
      { ok: false, error: 'CRON_SECRET not configured on server' },
      { status: 500 },
    )
  }

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - CONTACT_RETENTION_MONTHS)

  const payload = await getPayload({ config: configPromise })

  const result = await payload.delete({
    collection: 'contact-submissions',
    where: { createdAt: { less_than: cutoff.toISOString() } },
  })

  const deleted = result.docs?.length ?? 0
  const errors = result.errors?.length ?? 0

  payload.logger.info(
    `[cron:cleanup-submissions] deleted=${deleted} errors=${errors} cutoff=${cutoff.toISOString()}`,
  )

  return Response.json({
    ok: true,
    deleted,
    errors,
    cutoff: cutoff.toISOString(),
    retentionMonths: CONTACT_RETENTION_MONTHS,
  })
}
