"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md w-full card text-center">
        <h1 className="text-4xl font-heading mb-4 text-foreground">404</h1>
        <h2 className="text-2xl font-heading mb-6 text-primary">Page Not Found</h2>

        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved to another dimension.
        </p>

        <div className="flex flex-col space-y-4">
          <Link href="/" className="btn-primary w-full">
            Return to Home
          </Link>

          <Link
            href="/contact"
            className="btn-secondary w-full"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
