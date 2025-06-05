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
          fontSize: 20,
          background: '#dc2626',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '6px',
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
