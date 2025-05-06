import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moons Out Media | Creative Agency",
  description:
    "Cutting-edge creative agency specializing in documentary-style content creation, authentic storytelling, targeted digital ad campaigns, and social media marketing.",
    generator: 'v0.dev'
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

