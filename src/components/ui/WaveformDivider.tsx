import { cn } from '@/lib/utils'

type Props = {
  className?: string
  /**
   * Stagger animation start so adjacent dividers don't pulse in sync.
   * Pass a small number (0–4) — converted to a fraction of the cycle.
   */
  delay?: number
  /**
   * Visual variant — "rail" is a flat line (default), "wave" adds a low-amplitude
   * sine path behind the pulse for a more pronounced waveform feel.
   */
  variant?: 'rail' | 'wave'
}

/**
 * Animated horizontal divider — a thin neon "rail" with a traveling glow pulse.
 * Drop-in replacement for `<hr>` / `border-t border-hairline` between sections.
 * Pure CSS, no JS — safe in server components.
 */
export function WaveformDivider({ className, delay = 0, variant = 'rail' }: Props) {
  // Cycle is 9s; offset each instance by up to ~4.5s to desync.
  const animationDelay = `${(delay * 1.1).toFixed(2)}s`

  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(
        'waveform-divider relative w-full overflow-hidden',
        variant === 'wave' ? 'h-3' : 'h-px',
        className,
      )}
    >
      {/* Static rail */}
      {variant === 'rail' ? (
        <div className="absolute inset-0 bg-hairline" />
      ) : (
        <svg
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-3 opacity-40"
          viewBox="0 0 340 12"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,6 Q21.25,3 42.5,6 Q63.75,9 85,6 Q106.25,3 127.5,6 Q148.75,9 170,6 Q191.25,3 212.5,6 Q233.75,9 255,6 Q276.25,3 297.5,6 Q318.75,9 340,6"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-hairline2"
          />
        </svg>
      )}

      {/* Traveling pulse */}
      <div
        className="waveform-divider-sweep absolute inset-y-0 w-[28%] bg-gradient-to-r from-transparent via-neon-500/70 to-transparent"
        style={{ animationDelay, filter: 'blur(0.5px)' }}
      />
    </div>
  )
}
