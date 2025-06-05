import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PiwikProProvider from '@piwikpro/next-piwik-pro';
import { AnalyticsProvider } from '@/components/Analytics';
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
              <div className="min-h-screen">
                {children}
              </div>
            </AnalyticsProvider>
          </PiwikProProvider>
        ) : (
          <div className="min-h-screen">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
