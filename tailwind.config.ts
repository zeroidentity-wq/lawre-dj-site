import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/app/(frontend)/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#111111',
          raised: '#1a1a1a',
        },
        bone: {
          DEFAULT: '#fafafa',
          // a1a1aa = ~7.2:1 on #0a0a0a — AAA for body
          muted: '#a1a1aa',
          // bumped from #71717a (~4.3:1, fails WCAG AA on body text)
          // #9a9aa3 → ~7:1 on #0a0a0a — AAA for normal text, AA-safe for small caps eyebrows
          dim: '#9a9aa3',
        },
        neon: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        hairline: 'rgba(255, 255, 255, 0.08)',
        hairline2: 'rgba(255, 255, 255, 0.16)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        md: '6px',
        lg: '8px',
        '2xl': '16px',
      },
    },
  },
  plugins: [animate, typography],
}

export default config
