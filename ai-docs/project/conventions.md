# Coding Conventions

## File & Folder Naming

- **Directories**: Use kebab-case (e.g., `about-us`, `client-success`)
- **Component Files**: Use kebab-case for filenames (e.g., `navigation.tsx`, `hero.tsx`)
- **Utility Files**: Use kebab-case for utility files (e.g., `use-mobile.tsx`)
- **Page Files**: Standard Next.js App Router conventions (`page.tsx`, `layout.tsx`)

## Component Structure

- **Component Declaration**: Use function declarations (not arrow functions)
- **TypeScript**: Use TypeScript interfaces for component props
- **Export Pattern**: Use named exports for components

```tsx
// Preferred pattern
function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic
  return (
    // JSX
  )
}

interface ComponentNameProps {
  prop1: string
  prop2: number
}

export { ComponentName }
```

## TypeScript Patterns

- **Interfaces**: Prefer interfaces over types for object definitions
- **Prop Types**: Define prop interfaces adjacent to components
- **Type Imports**: Use `import type` for type-only imports
- **Enums**: Avoid enums, prefer union types or const objects
- **Generics**: Use generics for reusable components and functions

## React & Next.js Patterns

- **Server Components**: Default to server components unless client interactivity is needed
- **Client Components**: Mark with `'use client'` directive at the top of the file
- **Data Fetching**: Use async/await in Server Components
- **Form Submission**: Use Server Actions with proper validation
- **Error Handling**: Implement error boundaries and custom error pages

## Styling Conventions

- **Tailwind Classes**: Use Tailwind utility classes for styling
- **Class Organization**: Order classes by layout, typography, visual, and interactive properties
- **Responsive Design**: Use Tailwind's responsive prefixes consistently (e.g., `md:`, `lg:`)
- **Dark Mode**: Use Tailwind's dark mode classes with the `dark:` prefix
- **Custom Classes**: Define custom utility classes in Tailwind config when needed
- **Conditional Classes**: Use clsx or tailwind-merge for conditional class application

## JavaScript Conventions

- **Modern Syntax**: Use modern JavaScript features (optional chaining, nullish coalescing)
- **Destructuring**: Use object and array destructuring for cleaner code
- **Async/Await**: Prefer async/await over Promise chains
- **Error Handling**: Use try/catch blocks for proper error handling
- **Immutability**: Treat data as immutable, use spread operators for updates

## Documentation

- **JSDoc**: Use JSDoc comments for complex functions and components
- **TODO Comments**: Format as `// TODO: description` for future tasks
- **Inline Comments**: Use sparingly, only for complex logic that isn't self-explanatory
- **README**: Maintain comprehensive README files for major features

## State Management

- **Local State**: Use React's useState and useReducer for component-level state
- **Context**: Use React Context for sharing state across component trees
- **Server State**: Rely on Server Components for data that can be server-rendered
- **Form State**: Use react-hook-form for complex form state management

## Error Handling & Validation

- **Form Validation**: Use Zod schemas with react-hook-form
- **API Errors**: Handle errors gracefully with user-friendly messages
- **Fallbacks**: Provide fallback UI for error states
- **Error Logging**: Log errors properly for debugging

## Accessibility

- **Semantic HTML**: Use proper semantic HTML elements
- **ARIA Attributes**: Add ARIA attributes when semantic HTML isn't sufficient
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Maintain sufficient color contrast for text readability 