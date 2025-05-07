# Tailwind CSS Conventions

## Configuration

The project uses Tailwind CSS 3.4.17 with a custom configuration defined in `tailwind.config.ts`. Key customizations include:

- Custom color palette 
- Custom theme extensions
- Special cyberpunk theme colors
- Text shadow utilities
- Custom animations and keyframes

## Color System

### Base Colors

The project uses CSS variables for the base color system, allowing for theme switching:

```css
--background
--foreground
--border
--input
--ring
--primary / --primary-foreground
--secondary / --secondary-foreground
--destructive / --destructive-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--popover / --popover-foreground
--card / --card-foreground
```

### Cyberpunk Theme Colors

A custom cyberpunk color palette is available:

```css
--cyberpunk-background: #121212
--cyberpunk-purple-light: #6A5ACD (Slate Blue)
--cyberpunk-purple: #483D8B (Dark Slate Blue)
--cyberpunk-blue: #00CCFF (Cyan)
--cyberpunk-pink: #FF69B4 (Hot Pink)
--cyberpunk-green: #00FF7F (Spring Green)
--cyberpunk-gold: #FFD700 (Metallic Gold)
--cyberpunk-silver: #C0C0C0 (Metallic Silver)
```

## Text Effects

Custom text shadow utilities for neon effects:

```css
.text-shadow-neon-blue
.text-shadow-neon-pink
.text-shadow-neon-green
```

## Animations

Custom animation utilities:

```css
.animate-flicker /* Flickering neon effect */
.animate-pulse /* Pulsing glow effect */
```

## Usage Patterns

### Layout

- Use Flexbox and Grid for layouts
- Mobile-first approach with responsive breakpoints
- Use container class for consistent width constraints

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Responsive Design

- Start with mobile styling
- Add breakpoint prefixes for larger screens
- Common breakpoints used:
  - `sm:` (640px)
  - `md:` (768px)
  - `lg:` (1024px)
  - `xl:` (1280px)
  - `2xl:` (1536px)

```tsx
<div className="flex flex-col md:flex-row">
  <div className="w-full md:w-1/2">{/* Content */}</div>
  <div className="w-full md:w-1/2">{/* Content */}</div>
</div>
```

### Typography

- Use relative size units where possible (rem/em)
- Consistent heading patterns:
  - `h1`: text-4xl md:text-5xl lg:text-6xl font-bold
  - `h2`: text-3xl md:text-4xl lg:text-5xl font-bold
  - `h3`: text-2xl md:text-3xl font-semibold
  - `h4`: text-xl md:text-2xl font-semibold
- Body text: text-base/text-lg with appropriate leading

### Spacing

- Use consistent spacing with Tailwind's spacing scale
- Common patterns:
  - Section spacing: `py-12 md:py-16 lg:py-24`
  - Component spacing: `space-y-4` or `gap-4`
  - Content padding: `p-4 md:p-6`

### Dark Mode

- Dark mode is implemented using `next-themes`
- Use `dark:` prefix for dark mode variants
- Key dark mode classes:
  - `dark:bg-background`
  - `dark:text-foreground`
  - `dark:border-border`

```tsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  {/* Content */}
</div>
```

## Cyberpunk Theme Elements

For components using the cyberpunk aesthetic:

```tsx
<div className="bg-cyberpunk-background text-white">
  <h2 className="text-cyberpunk-blue text-shadow-neon-blue animate-pulse">
    Neon Title
  </h2>
  <span className="text-cyberpunk-pink animate-flicker">
    Flickering Element
  </span>
</div>
```

## Custom Utilities

### Using the `cn()` Utility

For conditional classes, use the `cn()` utility:

```tsx
import { cn } from "@/lib/utils"

function Button({ className, variant }) {
  return (
    <button 
      className={cn(
        "base-button-classes", 
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className
      )}
    >
      Button
    </button>
  )
}
```

### Using Class Variance Authority (CVA)

For components with multiple variants:

```tsx
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "base-button-classes",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "text-sm py-1 px-2",
        md: "text-base py-2 px-4",
        lg: "text-lg py-3 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
```

## Best Practices

1. **Utility-First Approach**: Start with utility classes before extracting components or custom classes
2. **Consistent Spacing**: Use Tailwind's spacing scale consistently
3. **Mobile-First**: Begin with mobile styling, then add responsive variants
4. **Semantic HTML**: Use proper HTML elements with appropriate Tailwind classes
5. **Group Related Classes**: Order classes by category (layout, typography, colors, spacing, etc.)
6. **Extract Components**: For repeated patterns, extract into reusable components
7. **Maintain Accessibility**: Ensure sufficient color contrast and appropriate text sizes
8. **Dark Mode Support**: Include dark mode variants for key elements
9. **Performance**: Minimize custom CSS in favor of Tailwind utilities when possible 