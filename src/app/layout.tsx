import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import PiwikProProvider from '@piwikpro/next-piwik-pro';
import { AnalyticsProvider } from '@/components/Analytics';
import { Container } from '@/components/elements/Container';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lorenzo GM - Tech Blog",
    template: "%s | Lorenzo GM"
  },
  description: "Lorenzo GM's insights on web development, software engineering, and modern tech practices. Exploring Next.js, React, TypeScript, and development best practices.",
  keywords: ["Lorenzo GM", "web development", "Next.js", "React", "TypeScript", "JavaScript", "software engineering", "tech blog"],
  authors: [{ name: "Lorenzo GM" }],
  creator: "Lorenzo GM",
  publisher: "Lorenzo GM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lorenzogm.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lorenzogm.com",
    title: "Lorenzo GM - Tech Blog",
    description: "Lorenzo GM's insights on web development, software engineering, and modern tech practices",
    siteName: "Lorenzo GM - Tech Blog",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Lorenzo GM - Tech Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenzo GM - Tech Blog",
    description: "Lorenzo GM's insights on web development, software engineering, and modern tech practices",
    creator: "@lorenzogm",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const renderContent = (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Container as="header" className="bg-white py-12" fullWidth>
        <div className="text-center">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity duration-200">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              Lorenzo<span className="text-red-600"> GM</span>
            </h1>
          </Link>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Insights on web development, software engineering, and modern tech practices
          </p>
          <div className="mt-6 w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>
      </Container>
      
      <Container as="main" className="flex-1 bg-white py-16" fullWidth>
        {children}
      </Container>
      
      <Container as="footer" className="bg-white border-t border-gray-200 mt-auto py-6 text-center" fullWidth>
        <p className="text-gray-600">
          © {new Date().getFullYear()} Lorenzo GM.
        </p>
      </Container>
    </div>
  );

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {process.env.NEXT_PUBLIC_PIWIK_PRO_CONTAINER_URL && process.env.NEXT_PUBLIC_PIWIK_PRO_CONTAINER_ID ? (
          <PiwikProProvider
            containerUrl={process.env.NEXT_PUBLIC_PIWIK_PRO_CONTAINER_URL}
            containerId={process.env.NEXT_PUBLIC_PIWIK_PRO_CONTAINER_ID}
          >
            <AnalyticsProvider>
              {renderContent}
            </AnalyticsProvider>
          </PiwikProProvider>
        ) : (
          renderContent
        )}
      </body>
    </html>
  );
}
