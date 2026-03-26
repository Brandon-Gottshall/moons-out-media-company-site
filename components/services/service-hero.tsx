"use client"

import Link from "next/link"

export default function ServiceHero() {
  return (
    <section className="bg-background text-foreground py-16">
      <div className="mx-auto w-full max-w-5xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Services
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-heading text-primary">
          Moons Out Media + Labs
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
          One team for story, one team for systems, aligned around measurable outcomes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/services/creative" className="btn-primary">
            Creative Services
          </Link>
          <Link href="/services/labs" className="btn-secondary">
            Labs & Tech
          </Link>
        </div>
      </div>
    </section>
  )
}
