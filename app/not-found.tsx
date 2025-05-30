"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyberpunk-background p-4 text-center">
      <div className="max-w-md w-full bg-black/50 backdrop-blur-md p-8 rounded-lg border border-cyberpunk-blue/30">
        <h1 className="text-4xl font-heading mb-4 text-white">404</h1>
        <h2 className="text-2xl font-subheading mb-6 text-cyberpunk-blue">Page Not Found</h2>

        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved to another dimension.
        </p>

        <div className="flex flex-col space-y-4">
          <Link href="/" className="cyberpunk-button w-full inline-flex items-center justify-center rounded-md text-body-sm font-emphasis transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 px-4 py-2 border border-transparent shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(0,0,0,0.1)] bg-gradient-to-b from-black/10 to-transparent hover:shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.1)] active:shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.05)]">
            Return to Home
          </Link>

          <Link
            href="/contact"
            className="border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10 w-full inline-flex items-center justify-center rounded-md text-body-sm font-emphasis transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 px-4 py-2 border border-transparent shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(0,0,0,0.1)] bg-gradient-to-b from-black/10 to-transparent hover:shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.1)] active:shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.05)]"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

