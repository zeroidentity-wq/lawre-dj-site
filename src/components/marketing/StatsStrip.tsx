type Stat = { value: string; label: string }

const DEFAULT_STATS: Stat[] = [
  { value: '800+', label: 'evenimente' },
  { value: '8 ani', label: 'în industrie' },
  { value: '5.0★', label: 'pe Google' },
]

export function StatsStrip({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  return (
    <div className="border-y border-hairline">
      <dl className="grid grid-cols-3 divide-x divide-hairline">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-8 md:py-10 text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-3xl md:text-5xl font-medium tracking-tight text-bone">
              {s.value}
            </dd>
            <p className="mt-2 text-xs md:text-sm text-bone-dim uppercase tracking-[0.08em]">
              {s.label}
            </p>
          </div>
        ))}
      </dl>
    </div>
  )
}
