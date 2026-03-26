"use client"

import Link from "next/link"

export function VideoHero() {
  return (
    <section className="relative min-h-[70vh] bg-background text-foreground flex items-center">
      <div className="mx-auto w-full max-w-5xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Moons Out Media
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-heading text-primary">
          Documentary storytelling for modern brands
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          We turn real-world narratives into campaigns that earn trust, drive conversion, and build durable audiences.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects" className="btn-primary">
            View projects
          </Link>
          <Link href="/contact" className="btn-secondary">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  )
}
