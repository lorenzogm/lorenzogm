import { ImageResponse } from 'next/og'

// Route segment config for static export
export const dynamic = 'force-static'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: 'linear-gradient(135deg, #dc2626, #991b1b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: '800',
          fontFamily: 'Georgia, serif',
          borderRadius: '6px',
          letterSpacing: '-1px',
        }}
      >
        L
      </div>
    ),
    {
      ...size,
    }
  )
}
