# Typography System

## Overview

This document defines the consistent typography system for Moons Out Media, implemented through Tailwind CSS custom utilities. The system provides semantic naming that scales appropriately across devices and maintains visual hierarchy.

## Typography Scale

### Hero Text (Main Headlines)
```tsx
// Main hero headlines - typically page titles
<h1 className="text-hero-xl font-hero">...</h1>           // 64px, 900 weight, tight spacing

// Secondary hero headlines - section heroes  
<h1 className="text-hero-lg font-hero">...</h1>           // 48px, 900 weight, tight spacing

// Section hero headlines - subsection heroes
<h2 className="text-hero-md font-hero">...</h2>           // 36px, 900 weight, slightly tight spacing
```

### Headings (Section Structure)
```tsx
// Major section headings
<h2 className="text-heading-xl font-heading">...</h2>     // 32px, 700 weight, slightly tight spacing

// Section headings
<h3 className="text-heading-lg font-heading">...</h3>     // 24px, 700 weight, normal spacing

// Subsection headings  
<h4 className="text-heading-md font-subheading">...</h4>  // 20px, 600 weight, normal spacing

// Small headings
<h5 className="text-heading-sm font-subheading">...</h5>  // 18px, 600 weight, normal spacing
```

### Body Text (Content)
```tsx
// Large body text - introductions, emphasis
<p className="text-body-lg font-body">...</p>             // 18px, 400 weight, relaxed line height

// Standard body text - main content
<p className="text-body-base font-body">...</p>           // 16px, 400 weight, relaxed line height

// Small body text - captions, secondary content
<p className="text-body-sm font-body">...</p>             // 14px, 400 weight, normal line height
```

### Labels & UI Elements
```tsx
// Large labels/buttons - primary CTAs
<button className="text-label-lg font-emphasis">...</button>   // 14px, 500 weight, wide spacing

// Standard labels - form labels, tags
<span className="text-label-base font-emphasis">...</span>     // 12px, 500 weight, wider spacing

// Small labels/captions - metadata, fine print
<span className="text-label-sm font-emphasis">...</span>       // 10px, 500 weight, widest spacing
```

### Brand Text
```tsx
// Brand/logo text
<span className="text-brand font-heading tracking-brand">MOONS OUT</span>  // 24px, 700 weight, extra wide spacing
```

## Font Weights

| Class | Weight | Use Case |
|-------|--------|----------|
| `font-hero` | 900 (Black) | Hero headlines only |
| `font-heading` | 700 (Bold) | Section headings |
| `font-subheading` | 600 (Semibold) | Subsection headings |
| `font-emphasis` | 500 (Medium) | Emphasized text, labels, buttons |
| `font-body` | 400 (Normal) | Body text, default |
| `font-light` | 300 (Light) | Secondary/muted text |

## Letter Spacing

| Class | Spacing | Use Case |
|-------|---------|----------|
| `tracking-hero` | -0.02em | Large headlines |
| `tracking-heading` | -0.01em | Section headings |
| `tracking-normal` | 0 | Body text (default) |
| `tracking-label` | 0.02em | Labels and buttons |
| `tracking-brand` | 0.1em | Brand text |

## Responsive Usage

For responsive typography, combine the system classes with Tailwind's responsive prefixes:

```tsx
// Hero that scales down on smaller screens
<h1 className="text-hero-md md:text-hero-lg lg:text-hero-xl font-hero">
  Main Headline
</h1>

// Body text that scales up on larger screens  
<p className="text-body-base lg:text-body-lg font-body">
  Main content text that becomes larger on desktop
</p>

// Headings with responsive scaling
<h2 className="text-heading-lg lg:text-heading-xl font-heading">
  Section Heading
</h2>
```

## Migration Guide

### Current → New System

| Current Classes | New System |
|----------------|------------|
| `text-4xl md:text-6xl font-bold` | `text-hero-md md:text-hero-xl font-hero` |
| `text-2xl font-bold` | `text-heading-xl font-heading` |
| `text-xl font-semibold` | `text-heading-lg font-subheading` |
| `text-lg font-medium` | `text-heading-sm font-subheading` |
| `text-base` | `text-body-base font-body` |
| `text-sm` | `text-body-sm font-body` |
| `text-sm font-semibold` | `text-label-lg font-emphasis` |
| `text-xs font-medium` | `text-label-base font-emphasis` |

## Best Practices

### 1. Semantic Hierarchy
- Use hero text only for page/section titles
- Maintain logical heading hierarchy (h1 → h2 → h3)
- Don't skip heading levels for visual purposes

### 2. Consistent Spacing
- Let the system handle line heights and letter spacing
- Use the predefined combinations rather than overriding

### 3. Responsive Considerations
- Start with smaller sizes and scale up for larger screens
- Test readability across all device sizes
- Consider viewport height constraints (vh-short, vh-xshort)

### 4. Accessibility
- Maintain sufficient color contrast with background
- Ensure text scales properly with user zoom settings
- Use semantic HTML elements with the typography classes

## Implementation Examples

### Hero Section
```tsx
function HeroSection() {
  return (
    <section className="text-center">
      <h1 className="text-hero-md lg:text-hero-xl font-hero mb-6">
        Main Page Title
      </h1>
      <p className="text-body-lg lg:text-body-xl font-body text-gray-300">
        Supporting description text
      </p>
    </section>
  )
}
```

### Content Section
```tsx
function ContentSection() {
  return (
    <section>
      <h2 className="text-heading-lg lg:text-heading-xl font-heading mb-8">
        Section Title
      </h2>
      <div className="space-y-4">
        <h3 className="text-heading-md font-subheading mb-4">
          Subsection Title  
        </h3>
        <p className="text-body-base font-body leading-relaxed">
          Main content paragraph with proper spacing and readability.
        </p>
      </div>
    </section>
  )
}
```

### Navigation & UI
```tsx
function Navigation() {
  return (
    <nav>
      <div className="text-brand font-heading tracking-brand">
        MOONS OUT
      </div>
      <button className="text-label-lg font-emphasis tracking-label">
        Get Started
      </button>
    </nav>
  )
}
```

This typography system ensures consistency across the entire site while remaining flexible for future updates and theme changes. 