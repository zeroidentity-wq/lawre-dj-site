'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContact, type SubmitState } from '@/app/(frontend)/actions'
import { EVENT_TYPES, EVENT_TYPE_LABELS } from '@/lib/schemas/contact'
import { cn } from '@/lib/utils'

const INITIAL: SubmitState = { ok: false }

const inputBase =
  'w-full bg-ink-soft border rounded-md px-4 py-3 text-bone text-sm placeholder:text-bone-dim focus:outline-none focus:border-neon-500/60 transition-colors'

type Props = { variant?: 'compact' | 'full' }

export function ContactForm({ variant = 'compact' }: Props) {
  const [state, formAction] = useActionState(submitContact, INITIAL)
  const showFull = variant === 'full'

  if (state.ok) {
    return (
      <div className="bg-ink-soft border border-neon-500/40 rounded-lg p-8 text-center">
        <h3 className="font-display text-2xl font-medium tracking-tight text-bone">Mulțumim!</h3>
        <p className="mt-3 text-bone-muted">{state.message}</p>
      </div>
    )
  }

  const err = state.errors ?? {}

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Nume" name="name" required error={err.name} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required error={err.email} />
        <Field label="Telefon" name="phone" type="tel" error={err.phone} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField label="Tip eveniment" name="eventType" required error={err.eventType} />
        {showFull && <Field label="Data evenimentului" name="eventDate" type="date" error={err.eventDate} />}
      </div>
      {showFull && (
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Locație" name="location" error={err.location} />
          <Field label="Nr. invitați" name="guestCount" type="number" error={err.guestCount} />
          <Field label="Buget orientativ" name="budget" error={err.budget} />
        </div>
      )}
      <TextareaField label="Mesaj" name="message" required error={err.message} />
      {state.message && !state.ok && (
        <p className="text-sm text-red-400" role="alert">
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-neon-500 hover:bg-neon-400 text-ink font-medium px-6 py-3.5 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Trimit...' : 'Trimite cererea →'}
    </button>
  )
}

type FieldProps = {
  label: string
  name: string
  type?: string
  required?: boolean
  error?: string
}

function Field({ label, name, type = 'text', required, error }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.08em] text-bone-muted mb-2">
        {label}
        {required && <span className="text-neon-300 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-err` : undefined}
        className={cn(inputBase, error ? 'border-red-500/60' : 'border-hairline')}
      />
      {error && (
        <p id={`${name}-err`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({ label, name, required, error }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.08em] text-bone-muted mb-2">
        {label}
        {required && <span className="text-neon-300 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={Boolean(error)}
        className={cn(inputBase, error ? 'border-red-500/60' : 'border-hairline')}
      >
        <option value="" disabled>
          Alege...
        </option>
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>
            {EVENT_TYPE_LABELS[t]}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

function TextareaField({ label, name, required, error }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.08em] text-bone-muted mb-2">
        {label}
        {required && <span className="text-neon-300 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-err` : undefined}
        className={cn(inputBase, 'resize-y', error ? 'border-red-500/60' : 'border-hairline')}
      />
      {error && (
        <p id={`${name}-err`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
