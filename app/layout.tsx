import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // Ensure globals.css is imported
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coin Feedly - Real-time Crypto & Finance News",
  description:
    "Stay updated with the latest cryptocurrency and financial news from trusted sources. Read full articles inline without leaving the page.",
  keywords: ["cryptocurrency", "bitcoin", "ethereum", "defi", "finance", "news", "blockchain"],
  authors: [{ name: "Coin Feedly" }],
  creator: "Coin Feedly",
  publisher: "Coin Feedly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Coin Feedly - Real-time Crypto & Finance News",
    description: "Stay updated with the latest cryptocurrency and financial news from trusted sources.",
    url: "https://coinfeedly.com",
    siteName: "Coin Feedly",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Coin Feedly Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coin Feedly - Real-time Crypto & Finance News",
    description: "Stay updated with the latest cryptocurrency and financial news from trusted sources.",
    images: ["/icon.png"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Removed manual link tags for icon.png and apple-touch-icon.png as Next.js handles them automatically from app/ directory */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Set default theme to dark
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* Removed the div attempting to cover the v0 badge as it's a platform UI element */}
      </body>
    </html>
  )
}
