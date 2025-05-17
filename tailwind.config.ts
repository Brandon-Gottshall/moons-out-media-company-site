import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'border-cyberpunk-teal',
    'border-cyberpunk-teal/30',
    'border-cyberpunk-yellow',
    'border-cyberpunk-yellow/30',
    'border-cyberpunk-cyan',
    'border-cyberpunk-cyan/30',
    'border-cyberpunk-blue',
    'border-cyberpunk-blue/30',
    'border-cyberpunk-pink',
    'border-cyberpunk-pink/30',
    'border-cyberpunk-green',
    'border-cyberpunk-green/30',
    'border-cyberpunk-purple-light',
    'border-cyberpunk-purple-light/30',
    'border-cyberpunk-orange',
    'border-cyberpunk-orange/30',
    'text-cyberpunk-teal',
    'text-cyberpunk-yellow',
    'text-cyberpunk-cyan',
    'text-cyberpunk-blue',
    'text-cyberpunk-pink',
    'text-cyberpunk-green',
    'text-cyberpunk-purple-light',
    'text-cyberpunk-orange',
    'bg-cyberpunk-teal/10',
    'bg-cyberpunk-teal/30',
    'bg-cyberpunk-yellow/10',
    'bg-cyberpunk-yellow/30',
    'bg-cyberpunk-cyan/10',
    'bg-cyberpunk-cyan/30',
    'bg-cyberpunk-blue',
    'bg-cyberpunk-blue/10',
    'bg-cyberpunk-blue/30',
    'bg-cyberpunk-pink',
    'bg-cyberpunk-pink/10',
    'bg-cyberpunk-pink/30',
    'bg-cyberpunk-green',
    'bg-cyberpunk-green/10',
    'bg-cyberpunk-green/30',
    'bg-cyberpunk-purple-light',
    'bg-cyberpunk-purple-light/10',
    'bg-cyberpunk-purple-light/30',
    'bg-cyberpunk-orange',
    'bg-cyberpunk-orange/10',
    'bg-cyberpunk-orange/30',
    'ring-cyberpunk-blue/30',
    'ring-cyberpunk-pink/30',
    'ring-cyberpunk-green/30',
    'ring-cyberpunk-purple-light/30',
    'ring-cyberpunk-teal/30',
    'ring-cyberpunk-orange/30',
  ],
  theme: {
    extend: {
      screens: {
        'vh-short': { 'raw': '(max-height: 500px)' },
        'vh-xshort': { 'raw': '(max-height: 400px)' },
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.75rem" }],
      },
      backdropBlur: {
        xxxsm: '1px',
        xxsm: '2.5px',
        xsm: '3px',
      },
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
            light: "#6A5ACD",
            DEFAULT: "#483D8B",
          },
          blue: {
            light: "#66F0FF",
            DEFAULT: "#00CCFF",
          },
          pink: {
            light: "#FF85C1",
            DEFAULT: "#FF69B4",
          },
          green: {
            light: "#66FF99",
            DEFAULT: "#00FF7F",
          },
          teal: {
            light: "#5EEAD4",
            DEFAULT: "#14B8A6",
          },
          yellow: {
            light: "#FFF382",
            DEFAULT: "#FACC15",
          },
          cyan: {
            light: "#9DECF9",
            DEFAULT: "#22D3EE",
          },
          orange: {
            light: "#FFAA71",
            DEFAULT: "#FF7F50",
          },
          gold: {
            light: "#FFE066",
            DEFAULT: "#FFD700",
          },
          silver: {
            light: "#E0E0E0",
            DEFAULT: "#C0C0C0",
          },
          red: {
            light: "#FFBFB7",
            DEFAULT: "#A6192E",
          },
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

