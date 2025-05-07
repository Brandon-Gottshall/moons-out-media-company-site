# Component Patterns

## Custom Component Overview

The Moons Out Media website includes several custom components specific to the brand and its services:

1. **Hero Components**: Dynamic hero sections with motion effects
2. **Interactive Tools**: Story Wheel, Story Matchmaker, Trust Meter
3. **Timeline Components**: Client Success Timeline
4. **Media Components**: Video Elevator Pitch
5. **Navigation**: Custom navigation with mobile responsiveness
6. **Service Showcases**: Pain-to-Gain transformations and Featured Projects

## Component Architecture

### Standard Component Structure

Components follow a consistent organization pattern:

```tsx
// 1. Imports
import { useState } from "react"
import { motion } from "framer-motion"
import { ClassName } from "class-variance-authority"
// ... other imports

// 2. Component definition with TypeScript interface
function ComponentName({ prop1, prop2, className }: ComponentNameProps) {
  // 3. State and hooks
  const [state, setState] = useState()

  // 4. Helper functions
  function handleSomething() {
    // Implementation
  }

  // 5. Render JSX
  return (
    <section className={cn("base-styles", className)}>
      {/* Component content */}
    </section>
  )
}

// 6. TypeScript interfaces
interface ComponentNameProps {
  prop1: string
  prop2?: number
  className?: string
}

// 7. Export
export { ComponentName }
```

### Component Composition

Components are composed following these principles:

1. **Modularity**: Break down complex UIs into smaller, reusable pieces
2. **Composition over Inheritance**: Favor component composition over inheritance hierarchies
3. **Single Responsibility**: Each component has a clear, focused purpose
4. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with client-side features

## Interactive Component Patterns

### Animation Pattern (using Framer Motion)

```tsx
import { motion } from "framer-motion"

function AnimatedComponent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.3 
      } 
    }
  }
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={childVariants}>
        Item 1
      </motion.div>
      <motion.div variants={childVariants}>
        Item 2
      </motion.div>
    </motion.div>
  )
}
```

### Interactive Tools Pattern

Interactive components like the Story Wheel follow this pattern:

1. **Client-Side Component**: Marked with `"use client"`
2. **State Management**: Uses React state for user interactions
3. **Motion Effects**: Employs Framer Motion for animations
4. **Progressive Disclosure**: Reveals information progressively based on user interaction
5. **Responsive Design**: Adapts to different screen sizes with Tailwind breakpoints

## Media Component Patterns

For components like Video Elevator Pitch:

1. **Lazy Loading**: Components load only when needed
2. **Responsive Media**: Images and videos adapt to screen sizes
3. **Accessibility**: Proper alt text, ARIA labels, and captions
4. **Fallbacks**: Graceful fallbacks when media cannot be loaded

## Styling Patterns

Components follow these styling conventions:

1. **Tailwind First**: Use Tailwind utility classes for styling
2. **Composition with `cn()`**: Combine classes with the `cn()` utility
3. **Class Variance Authority**: Use cva for component variants
4. **Dynamic Classes**: Apply classes conditionally based on props or state
5. **Custom Utility Classes**: Create custom utility classes for repeated patterns

```tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        // Other variants
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
```

## Responsive Design Pattern

Components implement responsive design following these principles:

1. **Mobile-First**: Base styles target mobile devices
2. **Breakpoint Classes**: Use Tailwind's responsive prefixes (`md:`, `lg:`, etc.)
3. **Stack to Grid/Flex**: Elements often stack vertically on mobile and switch to grid/flex layouts on larger screens
4. **Conditional Rendering**: Some elements are conditionally rendered based on screen size
5. **Responsive Typography**: Font sizes adjust based on screen size

## Special Components

### Story Wheel Component

An interactive tool that helps users explore different story types with an engaging wheel interface.

### Trust Meter Component

A visual representation of trust building through progressive steps, using animations to illustrate the process.

### Client Success Timeline

A chronological display of client success stories with interactive elements and visual storytelling.

## Performance Considerations

- **Component Splitting**: Large components are split into smaller, focused subcomponents
- **Lazy Loading**: Non-critical components use dynamic imports with Next.js
- **Image Optimization**: Images use Next.js Image component with proper sizing
- **Animation Performance**: Heavy animations are optimized using Framer Motion's features like `layoutId` and `useInView` 