# Page Structure & Routing

## App Router Overview

This project uses Next.js 15's App Router, which provides file-system based routing with support for layouts, loading states, error handling, and more.

## Directory Structure

The site is organized with the following route structure:

```
app/
├── about-us/            # About Us page
│   └── page.tsx         # /about-us route
├── contact/             # Contact page
│   └── page.tsx         # /contact route
├── portfolio/           # Portfolio page
│   └── page.tsx         # /portfolio route
├── services/            # Services page
│   └── page.tsx         # /services route
├── layout.tsx           # Root layout (applied to all pages)
├── page.tsx             # Home page (/)
├── not-found.tsx        # Custom 404 page
├── globals.css          # Global styles
└── theme-script.tsx     # Theme initialization script
```

## Route Implementation

### Page Components

Each page is implemented as a Server Component by default:

```tsx
// app/about-us/page.tsx
export const metadata = {
  title: "About Us | Moons Out Media",
  description: "Learn about Moons Out Media and our mission to transform your business through storytelling.",
}

export default function AboutUsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Page content */}
    </main>
  )
}
```

### Layout Structure

The site uses nested layouts for consistent UI elements:

```tsx
// app/layout.tsx (Root layout)
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Special Pages

### Not Found Page

The site has a custom 404 page for handling non-existent routes:

```tsx
// app/not-found.tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-6">We couldn't find the page you were looking for.</p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-primary rounded-md hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  )
}
```

## Page Metadata

Each page defines its metadata using the Next.js metadata API:

```tsx
// Define metadata for a page
export const metadata = {
  title: "Page Title | Moons Out Media",
  description: "Page description for SEO",
  openGraph: {
    title: "Page Title | Moons Out Media",
    description: "Page description for social sharing",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moons Out Media",
      },
    ],
  },
}
```

## Loading States

Loading states are implemented using Next.js loading files:

```tsx
// app/portfolio/loading.tsx
export default function PortfolioLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Loading UI with skeleton components */}
      <div className="space-y-4">
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}
```

## Error Handling

Error handling is implemented using error boundary files:

```tsx
// app/error.tsx
'use client'

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-6">We apologize for the inconvenience. Please try again.</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
```

## Route Groups

The project uses route groups to organize related routes:

```
app/
├── (marketing)/        # Marketing route group
│   ├── about-us/
│   ├── services/
│   └── portfolio/
├── (auth)/             # Authentication route group (if applicable)
│   ├── login/
│   └── register/
└── (main)/             # Main content routes
    └── contact/
```

## Dynamic Routes

For dynamic content like portfolio items or blog posts:

```
app/
├── portfolio/
│   ├── page.tsx         # Main portfolio page
│   └── [slug]/          # Dynamic route for individual portfolio items
│       └── page.tsx     # Individual portfolio item page
```

## Best Practices

1. **Server Components First**: Use Server Components by default for better performance
2. **Client Components When Needed**: Use Client Components only when interactivity is required
3. **Route Organization**: Group related routes using route groups
4. **Metadata**: Define metadata for each page for better SEO
5. **Loading States**: Provide loading states for better UX during data fetching
6. **Error Boundaries**: Implement error boundaries to handle unexpected errors
7. **Progressive Enhancement**: Design for progressive enhancement with core functionality working without JavaScript 