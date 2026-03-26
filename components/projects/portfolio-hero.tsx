"use client"

import Link from "next/link"

interface PortfolioHeroProps {
  title?: string
  subtitle?: string
}

export default function PortfolioHero({
  title = "Project Archive",
  subtitle = "Documentary storytelling, campaign narratives, and growth-focused content.",
}: PortfolioHeroProps) {
  return (
    <section className="bg-background text-foreground py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Media Mode
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-heading text-primary">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
          {subtitle}
        </p>
        <div className="mt-6">
          <Link href="/contact" className="btn-secondary">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  )
}
