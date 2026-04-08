import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

// Umami analytics configuration (hardcoded to avoid GitHub secrets)
const UMAMI_WEBSITE_ID = 'b5af0b3c-7a6b-4b3e-8a9d-1f2c3d4e5f6a'
const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js'

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
    tailwindcss(),
    // Inject Umami analytics script into <head> at build time
    {
      name: 'inject-umami',
      transformIndexHtml(html) {
        const tag = `  <script defer src="${UMAMI_SCRIPT_URL}" data-website-id="${UMAMI_WEBSITE_ID}"></script>`
        return html.replace('</head>', `${tag}\n  </head>`)
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
