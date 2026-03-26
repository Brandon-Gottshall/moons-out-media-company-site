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
      screens: {
        'vh-short': { 'raw': '(max-height: 500px)' },
        'vh-xshort': { 'raw': '(max-height: 400px)' },
      },
      fontFamily: {
        heading: ["Oswald", "Bebas Neue", "Impact", "sans-serif"],
        body: ["Roboto", "Open Sans", "Lato", "sans-serif"],
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.75rem" }],
        // Typography System - Consistent sizing with responsive scaling
        'hero-xl': ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],        // 64px - Main hero headlines
        'hero-lg': ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],        // 48px - Secondary hero headlines  
        'hero-md': ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],     // 36px - Section hero headlines
        'heading-xl': ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],     // 32px - Major section headings
        'heading-lg': ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.005em" }], // 24px - Section headings
        'heading-md': ["1.25rem", { lineHeight: "1.3", letterSpacing: "0" }],        // 20px - Subsection headings
        'heading-sm': ["1.125rem", { lineHeight: "1.4", letterSpacing: "0" }],       // 18px - Small headings
        'body-lg': ["1.125rem", { lineHeight: "1.6", letterSpacing: "0" }],          // 18px - Large body text
        'body-base': ["1rem", { lineHeight: "1.6", letterSpacing: "0" }],            // 16px - Standard body text
        'body-sm': ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }],          // 14px - Small body text
        'label-lg': ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],    // 14px - Large labels/buttons
        'label-base': ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],   // 12px - Standard labels
        'label-sm': ["0.625rem", { lineHeight: "1.3", letterSpacing: "0.03em" }],    // 10px - Small labels/captions
        'brand': ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.1em" }],          // 24px - Brand/logo text
      },
      fontWeight: {
        // Typography System - Consistent weights
        'hero': '900',      // Black - For hero headlines
        'heading': '700',   // Bold - For headings
        'subheading': '600', // Semibold - For subheadings  
        'emphasis': '500',  // Medium - For emphasized text
        'body': '400',      // Normal - For body text
        'light': '300',     // Light - For secondary text
      },
      letterSpacing: {
        // Typography System - Consistent letter spacing
        'hero': '-0.02em',     // Tight for large headlines
        'heading': '-0.01em',  // Slightly tight for headings
        'normal': '0',         // Normal for body text
        'label': '0.02em',     // Wide for labels/buttons
        'brand': '0.1em',      // Wider for brand text
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}

export default config
