import { ImageResponse } from 'next/og'

// Route segment config for static export
export const dynamic = 'force-static'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: '#1f2937',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f3f4f6',
          fontWeight: 'bold',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '20px',
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
