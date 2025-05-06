import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk theme colors
        cyberpunk: {
          background: "#121212",
          purple: {
            light: "#6A5ACD", // Slate Blue (light purple)
            DEFAULT: "#483D8B", // Dark Slate Blue (rich purple)
          },
          blue: "#00CCFF", // Cyan (slightly darker for better contrast)
          pink: "#FF69B4", // Hot pink
          green: "#00FF7F", // Spring green
          gold: "#FFD700", // Metallic gold
          silver: "#C0C0C0", // Metallic silver
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      textShadow: {
        // Adding text shadow utilities based on the industry report
        "neon-blue":
          "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00CCFF, 0 0 20px #00CCFF, 0 0 25px #00CCFF, 0 0 30px #00CCFF",
        "neon-pink":
          "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FF69B4, 0 0 20px #FF69B4, 0 0 25px #FF69B4, 0 0 30px #FF69B4",
        "neon-green":
          "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00FF7F, 0 0 20px #00FF7F, 0 0 25px #00FF7F, 0 0 30px #00FF7F",
      },
      keyframes: {
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.7" },
        },
        pulse: {
          "0%": {
            textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00CCFF, 0 0 20px #00CCFF, 0 0 25px #00CCFF",
          },
          "100%": {
            textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00CCFF, 0 0 30px #00CCFF, 0 0 40px #00CCFF",
          },
        },
      },
      animation: {
        flicker: "flicker 2s infinite alternate",
        pulse: "pulse 3s infinite alternate",
      },
    },
  },
  plugins: [],
}

export default config

