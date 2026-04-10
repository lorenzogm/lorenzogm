/// <reference types="vite/client" />
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { Container } from "@/components/elements/container";
import { LanguageAwareHeader } from "@/components/elements/language-aware-header";
import { SearchBar } from "@/components/elements/search-bar";
import globalsCss from "../globals.css?url";

function RootDocument({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lang = location.pathname.startsWith("/es") ? "es" : "en";
  const analyticsEnabled =
    !!import.meta.env.UMAMI_SCRIPT_SRC && !!import.meta.env.UMAMI_WEBSITE_ID;
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
        {analyticsEnabled && (
          <script
            data-website-id={import.meta.env.UMAMI_WEBSITE_ID}
            defer
            src={import.meta.env.UMAMI_SCRIPT_SRC}
          />
        )}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Container as="header" className="bg-white py-12" fullWidth>
          <LanguageAwareHeader />
        </Container>

        {/* Search */}
        <Container className="bg-white pb-8" fullWidth>
          <SearchBar />
        </Container>

        <Container as="main" className="flex-1 bg-white py-16" fullWidth>
          <Outlet />
        </Container>

        <Container
          as="footer"
          className="mt-auto border-gray-200 border-t bg-white py-6 text-center"
          fullWidth
        >
          <p className="text-gray-600">
            © {new Date().getFullYear()} Lorenzo GM.
          </p>
        </Container>
      </div>
    </RootDocument>
  );
}

function NotFoundComponent() {
  return (
    <RootDocument>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <h1 className="mb-2 font-bold text-6xl text-gray-300">404</h1>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Page Not Found
            </h2>
            <p className="mb-6 text-gray-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
              to="/en"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </RootDocument>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#dc2626" },
      { title: "Lorenzo GM" },
    ],
    links: [
      { rel: "stylesheet", href: globalsCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});
