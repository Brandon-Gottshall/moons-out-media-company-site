"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "cyberpunk" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, defaultTheme = "cyberpunk" }: ThemeProviderProps) {
  // Use state with no initial value
  const [theme, setTheme] = useState<Theme | null>(null)
  const [mounted, setMounted] = useState(false)

  // Set the theme only after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme | null
    setTheme(savedTheme || defaultTheme)
  }, [defaultTheme])

  // Update theme class on document element
  useEffect(() => {
    if (!mounted || theme === null) return

    document.documentElement.classList.remove("cyberpunk", "light")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  // Provide a stable context value
  const contextValue = {
    theme: theme || defaultTheme,
    setTheme: (newTheme: Theme) => {
      if (mounted) {
        setTheme(newTheme)
      }
    },
  }

  // Return children directly during SSR to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

