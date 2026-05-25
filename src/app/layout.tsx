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
  metadataBase: new URL('https://cybernest.io'),
  title: "CyberNest | Neural AI Marketplace",
  description: "Discover elite AI tools, legendary scripts, and neural systems for the next digital civilization.",
  keywords: ["AI marketplace", "digital products", "cyberpunk SaaS", "AI tools", "neural systems", "CyberNest"],
  authors: [{ name: "Nexus Council" }],
  openGraph: {
    title: "CyberNest | Neural AI Marketplace",
    description: "The premier futuristic AI-powered marketplace.",
    url: "https://cybernest.io",
    siteName: "CyberNest",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberNest | Neural AI Marketplace",
    description: "Architecting the Digital Civilization.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
