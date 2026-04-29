import { ImageResponse } from 'next/og'

import { SITE_NAME } from '@/lib/constants'

export const runtime = 'edge'
export const alt = `${SITE_NAME} — DJ pentru evenimente București`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top neon bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#39ff14',
          }}
        />

        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          <div
            style={{
              fontSize: '14px',
              letterSpacing: '0.18em',
              color: '#39ff14',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            DJ București · Nuntă · Corporate · Club
          </div>

          <div
            style={{
              fontSize: '88px',
              fontWeight: 700,
              color: '#f5f0e8',
              lineHeight: 1,
              letterSpacing: '-3px',
            }}
          >
            {SITE_NAME}
          </div>

          <div
            style={{
              fontSize: '26px',
              color: '#9e9a93',
              maxWidth: '680px',
              lineHeight: 1.45,
            }}
          >
            DJ profesionist cu echipament propriu. Pachete pentru orice tip de eveniment.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            fontSize: '16px',
            color: '#4a4742',
            letterSpacing: '0.06em',
          }}
        >
          lawredj.ro
        </div>
      </div>
    ),
    { ...size },
  )
}
