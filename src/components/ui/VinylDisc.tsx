export function VinylDisc({ className }: { className?: string }) {
  const grooves = Array.from({ length: 18 }, (_, i) => 94 - i * 3)

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`vinyl-spin${className ? ` ${className}` : ''}`}
      aria-hidden
      focusable="false"
    >
      {/* Disc body */}
      <circle cx="100" cy="100" r="99" fill="#0f0f0f" />

      {/* Outer neon rim — makes disc visible against dark backgrounds */}
      <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(168,85,247,0.85)" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(217,70,239,0.25)" strokeWidth="6" />

      {/* Groove rings */}
      {grooves.map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="1.2"
        />
      ))}

      {/* Label */}
      <circle cx="100" cy="100" r="32" fill="#1a0a2e" />
      <circle cx="100" cy="100" r="32" fill="none" stroke="rgba(168,85,247,0.70)" strokeWidth="1" />
      <circle cx="100" cy="100" r="26" fill="none" stroke="rgba(168,85,247,0.40)" strokeWidth="0.8" />

      {/* Center hole */}
      <circle cx="100" cy="100" r="4.5" fill="#050505" />

      {/* Specular highlight */}
      <path
        d="M 33 75 A 70 70 0 0 1 75 33"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.06"
      />
    </svg>
  )
}
