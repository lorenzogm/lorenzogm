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
  metadataBase: new URL('https://lorenzogm.github.io/lorenzogm'),
  title: "Tech Blog - Latest Web Development Trends",
  description: "Exploring the latest trends and technologies in web development. Stay up to date with Next.js, React, and modern web development practices.",
  keywords: ["web development", "Next.js", "React", "TypeScript", "JavaScript", "tech blog"],
  authors: [{ name: "Tech Blog" }],
  openGraph: {
    title: "Tech Blog - Latest Web Development Trends",
    description: "Exploring the latest trends and technologies in web development",
    type: "website",
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
