import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
          const websiteId = env.VITE_UMAMI_WEBSITE_ID
          const scriptUrl = env.VITE_UMAMI_URL
          if (!websiteId || !scriptUrl) return html
          const tag = `  <script defer src="${scriptUrl}" data-website-id="${websiteId}"></script>`
          return html.replace('</head>', `${tag}\n  </head>`)
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
