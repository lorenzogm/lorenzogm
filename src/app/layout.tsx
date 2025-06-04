import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        url: "/og-image.jpg", // You'll need to add this image to your public folder
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
    creator: "@lorenzogm", // Update this to your actual Twitter handle
    images: ["/og-image.jpg"], // Same image as OpenGraph
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
