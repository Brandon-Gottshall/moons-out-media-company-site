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
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-6 text-cyberpunk-blue">Page Not Found</h2>

        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved to another dimension.
        </p>

        <div className="flex flex-col space-y-4">
          <Button className="cyberpunk-button w-full" asChild>
            <Link href="/">Return to Home</Link>
          </Button>

          <Button
            variant="outline"
            className="border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10 w-full"
            asChild
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

