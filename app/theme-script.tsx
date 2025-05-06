"use client"

import { useEffect } from "react"

export default function ThemeScript() {
  useEffect(() => {
    // Apply saved theme or default to cyberpunk
    const savedTheme = localStorage.getItem("theme") || "cyberpunk"
    document.documentElement.classList.add(savedTheme)
  }, [])

  return null
}

