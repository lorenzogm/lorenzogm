import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Container } from '@/components/elements/Container'
import { LanguageAwareHeader } from '@/components/elements/LanguageAwareHeader'

function RootComponent() {
  useEffect(() => {
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
    const scriptUrl = import.meta.env.VITE_UMAMI_URL
    if (websiteId && scriptUrl) {
      const script = document.createElement('script')
      script.src = scriptUrl
      script.defer = true
      script.dataset.websiteId = websiteId
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Container as="header" className="bg-white py-12" fullWidth>
        <LanguageAwareHeader />
      </Container>

      <Container as="main" className="flex-1 bg-white py-16" fullWidth>
        <Outlet />
      </Container>

      <Container
        as="footer"
        className="bg-white border-t border-gray-200 mt-auto py-6 text-center"
        fullWidth
      >
        <p className="text-gray-600">
          © {new Date().getFullYear()} Lorenzo GM.
        </p>
      </Container>
    </div>
  )
}

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})
