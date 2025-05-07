# Project Architecture

## Directory Structure

The project follows the Next.js 15 App Router architecture with the following key directories:

```
moons-out-media-company-site/
├── app/                     # Next.js App Router pages and layouts
│   ├── about-us/            # About Us page
│   ├── contact/             # Contact page
│   ├── portfolio/           # Portfolio page
│   ├── services/            # Services page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── about/               # About page components
│   ├── contact/             # Contact page components
│   ├── portfolio/           # Portfolio page components
│   ├── services/            # Services page components
│   ├── ui/                  # Shadcn UI components
│   └── [shared components]  # Shared components used across pages
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and shared logic
├── public/                  # Static assets
├── styles/                  # Additional styles
└── ai-docs/                 # AI documentation
```

## Application Architecture

### Rendering Strategy

- **Server Components**: Used as the default for most components, especially those requiring data fetching
- **Client Components**: Used only when necessary for interactivity or client-side state
- **Static Pages**: When possible, pages are statically generated for optimal performance
- **Dynamic Routes**: Implemented for content-driven pages that require parameters

### Data Flow

- **Server Components**: Fetch data directly in the component using async/await
- **Client Interactions**: Use Server Actions for form submissions and data mutations
- **State Management**: Primarily relies on React's built-in state management with the App Router
- **Form Handling**: Uses react-hook-form with Zod validation

### Component Organization

1. **Page Components**: Located in the app directory, defining routes
2. **Layout Components**: Define shared layouts for pages and sections
3. **Feature Components**: Located in the components directory, organized by feature or page
4. **UI Components**: Reusable UI components based on Shadcn UI in components/ui
5. **Custom Hooks**: Reusable logic extracted to hooks directory

### Performance Optimization

- **Image Optimization**: Using Next.js Image component with proper sizing
- **Code Splitting**: Automatic code splitting by page route
- **Static Generation**: Where applicable for faster page loads
- **Incremental Static Regeneration**: For dynamic content that changes infrequently
- **Component-Level Code Splitting**: For large interactive components

### Styling Approach

- **Tailwind CSS**: Primary styling method with utility classes
- **Component-Level Styling**: Encapsulated within components
- **Global Styles**: Minimal global styles in globals.css
- **Theme Customization**: Through Tailwind configuration and CSS variables

### Error Handling

- **Error Boundaries**: Used for client-side error handling
- **Not Found Pages**: Custom 404 page implementation
- **Error Pages**: Custom error page implementation
- **Form Validations**: Client-side validations with server-side confirmation 