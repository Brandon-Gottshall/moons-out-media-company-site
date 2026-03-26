"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type Mode = "media" | "labs"

export function ModeSwitch() {
  const pathname = usePathname()
  const [mode, setMode] = useState<Mode>("media")

  useEffect(() => {
    if (pathname.startsWith("/labs") || pathname.startsWith("/services/labs")) {
      setMode("labs")
    } else {
      setMode("media")
    }
  }, [pathname])

  useEffect(() => {
    localStorage.setItem("theme", mode)
    document.documentElement.dataset.mode = mode
  }, [mode])

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Mode | null
    if (stored === "media" || stored === "labs") {
      setMode(stored)
    }
  }, [])

  return (
    <div className="flex items-center gap-1 rounded-md border border-primary/30 p-1">
      <button
        onClick={() => setMode("media")}
        className={`px-3 py-1 rounded text-xs font-heading font-semibold transition-all duration-200 ${
          mode === "media" ? "bg-primary text-background" : "text-primary hover:bg-primary/10"
        }`}
        type="button"
      >
        Media
      </button>
      <button
        onClick={() => setMode("labs")}
        className={`px-3 py-1 rounded text-xs font-heading font-semibold transition-all duration-200 ${
          mode === "labs" ? "bg-primary text-background" : "text-primary hover:bg-primary/10"
        }`}
        type="button"
      >
        Labs
      </button>
    </div>
  )
}
