import { Buffer } from 'buffer'
import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'
import './globals.css'

// Polyfill Node.js Buffer for gray-matter in the browser
globalThis.Buffer = Buffer

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  )
})
