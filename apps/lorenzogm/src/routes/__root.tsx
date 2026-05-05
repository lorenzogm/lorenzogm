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
        {/* No-FOUC theme init: runs before paint to apply the right class. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
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
        <Container
          as="header"
          className="bg-white py-12 dark:bg-zinc-950"
          fullWidth
        >
          <LanguageAwareHeader />
        </Container>

        {/* Search */}
        <Container className="bg-white pb-8 dark:bg-zinc-950" fullWidth>
          <SearchBar />
        </Container>

        <Container
          as="main"
          className="flex-1 bg-white py-16 dark:bg-zinc-950"
          fullWidth
        >
          <Outlet />
        </Container>

        <Container
          as="footer"
          className="mt-auto border-gray-200 border-t bg-white py-6 text-center dark:border-zinc-800 dark:bg-zinc-950"
          fullWidth
        >
          <p className="text-gray-600 dark:text-zinc-400">
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-zinc-900 dark:shadow-black/40">
          <div className="mb-6">
            <h1 className="mb-2 font-bold text-6xl text-gray-300 dark:text-zinc-700">
              404
            </h1>
            <h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-zinc-100">
              Page Not Found
            </h2>
            <p className="mb-6 text-gray-600 dark:text-zinc-400">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
              params={{ lang: "en" }}
              to="/$lang"
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
      { title: "Lorenzo GM – Blog on Web Development & Software Engineering" },
      {
        name: "description",
        content:
          "Insights on web development, frontend architecture, React, TypeScript, and modern software engineering practices by Lorenzo GM.",
      },
      { name: "author", content: "Lorenzo GM" },
      { property: "og:site_name", content: "Lorenzo GM" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@lorenzogm" },
    ],
    links: [
      { rel: "stylesheet", href: globalsCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});
