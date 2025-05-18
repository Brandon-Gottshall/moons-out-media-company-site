import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moons Out Media | Creative Agency",
  description:
    "Cutting-edge creative agency and tech studio: authentic story telling content, authentic storytelling, targeted digital campaigns—and custom web, AI & DevOps solutions.",
  generator: 'v0.dev',
  openGraph: {
    type: 'website',
    title: 'Moons Out Media | Creative Agency',
    description: 'Cutting-edge creative agency and tech studio: authentic story telling content, authentic storytelling, targeted digital campaigns—and custom web, AI & DevOps solutions.',
    // You might want to add a site_name and images here as well
    // site_name: 'Moons Out Media',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image.png', // Replace with your actual OG image URL
    //     width: 1200,
    //     height: 630,
    //     alt: 'Moons Out Media',
    //   },
    // ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} cyberpunk bg-cyberpunk-background min-h-screen`}>
        <div className="relative">
          <Navigation />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

