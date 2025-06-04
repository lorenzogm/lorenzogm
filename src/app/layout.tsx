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
  title: "Lorenzo GM - Tech Blog",
  description: "Lorenzo GM's insights on web development, software engineering, and modern tech practices. Exploring Next.js, React, TypeScript, and development best practices.",
  keywords: ["Lorenzo GM", "web development", "Next.js", "React", "TypeScript", "JavaScript", "software engineering", "tech blog"],
  authors: [{ name: "Lorenzo GM" }],
  openGraph: {
    title: "Lorenzo GM - Tech Blog",
    description: "Lorenzo GM's insights on web development, software engineering, and modern tech practices",
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
