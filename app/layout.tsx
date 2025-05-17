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
  generator: 'v0.dev'
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

