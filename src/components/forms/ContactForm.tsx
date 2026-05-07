'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContact, type SubmitState } from '@/app/(frontend)/actions'
import { EVENT_TYPES, EVENT_TYPE_LABELS } from '@/lib/schemas/contact'
import { cn } from '@/lib/utils'

const INITIAL: SubmitState = { ok: false }

const inputBase =
  'w-full bg-ink-soft border rounded-md px-4 py-3 text-bone text-sm placeholder:text-bone-dim focus:outline-none focus:border-neon-500/60 transition-colors'

type Props = { variant?: 'compact' | 'full'; defaultEventType?: string }

export function ContactForm({ variant = 'compact', defaultEventType }: Props) {
  const [state, formAction] = useActionState(submitContact, INITIAL)
  const formRef = useRef<HTMLFormElement>(null)
  const alertRef = useRef<HTMLParagraphElement>(null)
  const showFull = variant === 'full'

  // Move focus to the first invalid field on validation failure,
  // or to the alert region when there's a server error message.
  useEffect(() => {
    if (state.ok) return
    const errors = state.errors
    if (errors && Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0]
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
      el?.focus()
    } else if (state.message) {
      alertRef.current?.focus()
    }
  }, [state])

  if (state.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-ink-soft border border-neon-500/40 rounded-lg p-8 text-center"
      >
        <h3 className="font-display text-2xl font-medium tracking-tight text-bone">Mulțumim!</h3>
        <p className="mt-3 text-bone-muted">{state.message}</p>
      </div>
    )
  }

  const err = state.errors ?? {}

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-4">
      <Field label="Nume" name="name" required error={err.name} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required error={err.email} />
        <Field label="Telefon" name="phone" type="tel" error={err.phone} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField label="Tip eveniment" name="eventType" required error={err.eventType} defaultValue={defaultEventType} />
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

      <div className="pt-1">
        <label htmlFor="gdprConsent" className="flex items-start gap-3 cursor-pointer">
          <input
            id="gdprConsent"
            name="gdprConsent"
            type="checkbox"
            required
            aria-invalid={Boolean(err.gdprConsent)}
            aria-describedby={err.gdprConsent ? 'gdprConsent-err' : 'gdprConsent-desc'}
            className="mt-1 size-4 rounded border-hairline bg-ink-soft accent-neon-500 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:ring-offset-2 focus:ring-offset-ink"
          />
          <span id="gdprConsent-desc" className="text-xs text-bone-muted leading-relaxed">
            Sunt de acord cu prelucrarea datelor mele personale (nume, email, telefon, detalii eveniment)
            de către Lawre DJ în scopul de a-mi răspunde la această cerere, conform{' '}
            <Link
              href="/confidentialitate"
              className="text-neon-400 hover:text-neon-300 underline underline-offset-2"
            >
              Politicii de confidențialitate
            </Link>
            . Îmi pot retrage consimțământul oricând.
            <span className="text-neon-300 ml-0.5">*</span>
          </span>
        </label>
        {err.gdprConsent && (
          <p id="gdprConsent-err" className="mt-1.5 text-xs text-red-400">
            {err.gdprConsent}
          </p>
        )}
      </div>

      {state.message && !state.ok && (
        <p
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="text-sm text-red-400 outline-none"
        >
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

function SelectField({ label, name, required, error, defaultValue }: FieldProps & { defaultValue?: string }) {
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
        defaultValue={defaultValue ?? ''}
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
