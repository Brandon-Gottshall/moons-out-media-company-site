"use client"

import { useEffect } from "react"

export default function ThemeScript() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "media"
    document.documentElement.dataset.mode = savedTheme
  }, [])

  return null
}
