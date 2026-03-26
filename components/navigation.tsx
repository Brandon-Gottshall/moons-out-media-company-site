"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeSwitch } from "@/components/mode-switch"
import type { ReactNode } from "react"

const navLinks = [
  { name: "Creative Process", href: "/creative-process" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Our Team", href: "/our-team" },
  { name: "Contact", href: "/contact" },
]

interface NavigationProps {
  logoSlot?: ReactNode
}

export default function Navigation({ logoSlot }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            {logoSlot}
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ModeSwitch />
            <Button onClick={() => (window.location.href = "/contact")}>Start a project</Button>
          </div>

          <button
            className="md:hidden text-foreground"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 flex flex-col gap-4">
            <ModeSwitch />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button onClick={() => (window.location.href = "/contact")}>Start a project</Button>
          </div>
        </div>
      )}
    </header>
  )
}
