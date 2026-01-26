# Moons Out Media & Labs - Transformation Execution Plan

> **Version:** 3.0
> **Last Updated:** January 2025
> **Purpose:** Step-by-step executable instructions for transforming the website into a dual-mode Media/Labs system
> **Target Executor:** Small LLM model with code editing capabilities

---

## ⚠️ PREREQUISITE: Complete Phase 0 First

**STOP.** Before executing this plan, you MUST complete:

📄 **`PHASE_0_STYLING_CLEANUP.md`** (in this same directory)

**Why?** The current codebase has 148+ hardcoded color values scattered across 13 files. This plan assumes colors are controlled via CSS variables. Without Phase 0, you'll be chasing individual hex values instead of swapping variables.

**Phase 0 creates:**
- CSS variables for all current colors (`--cp-blue`, `--cp-pink`, etc.)
- Converts all hardcoded values to use these variables
- Makes this transformation a simple variable swap

**Verification that Phase 0 is complete:**
```bash
# This should return 0 matches
grep -rn "#00CCFF\|#FF69B4\|#00FF7F\|#121212" \
  --include="*.tsx" --include="*.ts" --include="*.css" \
  --exclude-dir=node_modules
```

If the above returns matches, go back and complete Phase 0.

---

## CRITICAL: Read This First

This plan transforms the Moons Out Media website from a cyberpunk aesthetic to Brand Kit v2.7 compliance. **All tasks are atomic and ordered by dependency.** Do not skip ahead.

### Success Criteria
- [ ] All colors use Brand Kit v2.7 palette (no cyberpunk colors)
- [ ] Typography uses Oswald + Roboto (not M PLUS 1, EB Garamond, Inter)
- [ ] Mode switch (Media | Labs) visible on all pages
- [ ] Media pages feel warm, spacious, documentary
- [ ] Labs pages feel sharp, technical, luminous

---

## SECTION 0: NON-NEGOTIABLE INVARIANTS

**These rules cannot be violated. Check every change against them.**

| # | Invariant | Validation Check |
|---|-----------|-----------------|
| 1 | Media and Labs are separate modes | Mode switch exists in navigation |
| 2 | Both modes use SAME color tokens | No mode-specific color variables |
| 3 | Differentiation via treatment, not hue | Labs uses glow effects, sharper corners, denser spacing |
| 4 | No gradients anywhere | `grep -r "gradient"` returns 0 matches in CSS |
| 5 | Only Oswald + Roboto fonts | `grep -r "M PLUS\|EB Garamond\|Inter"` returns 0 matches |
| 6 | No neon/saturated colors | No #00CCFF, #FF69B4, #00FF7F, #121212 |

---

## SECTION 1: COLOR SYSTEM REFERENCE

### 1.1 Brand Kit v2.7 Canonical Palette

Copy these exact values. Do not modify.

```
| Token              | Hex     | HSL (for CSS vars)      | CSS Variable         | Usage                        |
|--------------------|---------|-------------------------|----------------------|------------------------------|
| Primary Background | #024029 | 156 95% 13%             | --background         | Page backgrounds             |
| Primary Type       | #A68549 | 41 36% 47%              | --primary            | Headings, emphasis, borders  |
| Structural Green   | #012A1B | 156 95% 9%              | --muted              | Table headers, containers    |
| Deep Indigo        | #0E1140 | 234 63% 15%             | --input              | Input fields, Labs panels    |
| Wine               | #59052D | 338 91% 18%             | --accent             | Focus states, button hover   |
| Violet             | #380140 | 292 98% 13%             | --secondary          | Limited accent               |
| Light Text         | #F5F5DC | 60 56% 91%              | --foreground         | Body text on dark            |
| Placeholder        | #8B8B8B | 0 0% 55%                | --muted-foreground   | Form placeholder text        |
```

### 1.2 Colors to REMOVE (Search and Replace)

```
| Current Color           | Hex       | Replace With              |
|-------------------------|-----------|---------------------------|
| cyberpunk-background    | #121212   | #024029 (--background)    |
| cyberpunk-blue          | #00CCFF   | #A68549 (--primary)       |
| cyberpunk-pink          | #FF69B4   | #59052D (--accent)        |
| cyberpunk-purple        | #483D8B   | #380140 (--secondary)     |
| cyberpunk-green         | #00FF7F   | #A68549 (--primary)       |
| All neon text shadows   | various   | REMOVE or .labs-text-glow |
| All gradient backgrounds| various   | Solid --background        |
```

---

## SECTION 2: TYPOGRAPHY SYSTEM REFERENCE

### 2.1 Font Stack

```
| Role      | Font   | Weights              | Fallback                     |
|-----------|--------|----------------------|------------------------------|
| Headlines | Oswald | Bold (700), Semi(600)| Bebas Neue, Impact, sans     |
| Body      | Roboto | Regular (400), Lt(300)| Open Sans, Lato, sans-serif |
```

### 2.2 Typography Scale

```
| Element          | Font           | Size    | Use Case          |
|------------------|----------------|---------|-------------------|
| Hero Headline    | Oswald Bold    | 48-64px | Page heroes       |
| Section Headline | Oswald SemiBold| 32-42px | Major sections    |
| Subheading       | Oswald Regular | 24-28px | Subsections       |
| Body Text        | Roboto Regular | 16-18px | Paragraphs        |
| Small/Captions   | Roboto Light   | 14px    | Secondary text    |
| Button Text      | Oswald SemiBold| 16px    | All buttons       |
```

---

## SECTION 3: DUAL EXPRESSION SYSTEM

### 3.1 Media Expression — "Campfire"

**Mood:** Warm, documentary, authentic, spacious

```css
/* MEDIA MODE TREATMENT */
[data-mode="media"] {
  /* Backgrounds */
  --page-bg: var(--background);  /* Solid forest green */

  /* Borders */
  border-radius: 6px;            /* Soft corners */
  border: 1px solid hsl(var(--primary));  /* Subtle goldenrod */

  /* Shadows */
  box-shadow: none;              /* No shadows */

  /* Motion */
  transition-timing-function: ease-out;
  transition-duration: 300ms;

  /* Spacing */
  /* Generous margins, content breathes */
}
```

### 3.2 Labs Expression — "Mission Control"

**Mood:** Technical, precise, luminous, dense

```css
/* LABS MODE TREATMENT */
[data-mode="labs"] {
  /* Backgrounds */
  --panel-bg: var(--input);      /* Indigo for panels/cards */

  /* Borders */
  border-radius: 4px;            /* Sharper corners */
  border: 1px solid hsl(var(--primary) / 0.3);  /* With glow */

  /* Shadows - PERMITTED in Labs only */
  box-shadow: 0 0 12px rgba(166, 133, 73, 0.3);  /* Goldenrod glow */

  /* Motion */
  transition-timing-function: ease-in-out;
  transition-duration: 150ms;

  /* Spacing */
  /* Denser, more info per viewport */
}
```

### 3.3 Labs-Only Utility Classes

```css
/* These classes ONLY work in Labs mode */
.labs-glow {
  box-shadow: 0 0 12px rgba(166, 133, 73, 0.3);
}

.labs-text-glow {
  text-shadow: 0 0 8px rgba(166, 133, 73, 0.4);
}

.labs-panel {
  background: hsl(var(--input));
  border: 1px solid hsl(var(--primary) / 0.3);
}
```

### 3.4 Labs CANNOT Do

- ❌ Introduce colors outside Brand Kit
- ❌ Use gradients
- ❌ Use neon/saturated colors (#00CCFF, #FF69B4)
- ❌ Deviate from Oswald/Roboto
- ❌ Override core CSS variables with different hues

---

## PHASE 0: BRAND ALIGNMENT (BLOCKING)

> ⚠️ **ALL OTHER WORK IS BLOCKED UNTIL PHASE 0 COMPLETES**

### Task 0.1: Update tailwind.config.ts Colors

**File:** `tailwind.config.ts`

**Step 1:** Remove the entire `safelist` array (lines 10-62)

**Step 2:** Replace the `fontFamily` section with:
```typescript
fontFamily: {
  heading: ['Oswald', 'Bebas Neue', 'Impact', 'sans-serif'],
  body: ['Roboto', 'Open Sans', 'Lato', 'sans-serif'],
},
```

**Step 3:** Remove the entire `cyberpunk` object from `colors` (lines 150-197)

**Step 4:** Remove all `textShadow` entries (lines 204-212)

**Step 5:** Remove all neon-related `keyframes` (lines 213-280)

**Step 6:** Remove neon-related `animation` entries (lines 282-287)

**Validation:**
```bash
grep -c "cyberpunk" tailwind.config.ts
# Expected: 0
```

---

### Task 0.2: Update globals.css CSS Variables

**File:** `app/globals.css`

**Step 1:** Replace the font imports (lines 1-3) with:
```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
```

**Step 2:** Replace the entire `:root` block (lines 15-37) with:
```css
:root {
  --background: 156 95% 13%;
  --foreground: 60 56% 91%;
  --card: 156 95% 9%;
  --card-foreground: 60 56% 91%;
  --popover: 156 95% 9%;
  --popover-foreground: 60 56% 91%;
  --primary: 41 36% 47%;
  --primary-foreground: 156 95% 13%;
  --secondary: 292 98% 13%;
  --secondary-foreground: 60 56% 91%;
  --muted: 156 95% 9%;
  --muted-foreground: 0 0% 55%;
  --accent: 338 91% 18%;
  --accent-foreground: 60 56% 91%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 60 56% 91%;
  --border: 41 36% 47%;
  --input: 234 63% 15%;
  --ring: 41 36% 47%;
  --radius: 0.5rem;
  --vh: 1vh;
}
```

**Step 3:** Update the `html` background color (line 13):
```css
background-color: #024029;
```

**Step 4:** Update the `body` background color (line 52):
```css
background-color: #024029;
```

**Step 5:** Update `#__next, main, .main-content` background (line 85):
```css
background-color: #024029;
```

**Step 6:** Update heading styles to use new fonts:
```css
h1 {
  @apply text-4xl font-heading font-bold;
}
h2 {
  @apply text-3xl font-heading font-semibold;
}
h3 {
  @apply text-2xl font-heading font-semibold;
}
h4 {
  @apply text-xl font-heading font-semibold;
}
h5 {
  @apply text-lg font-heading font-semibold;
}
h6 {
  @apply text-base font-heading font-semibold;
}
p {
  @apply text-base font-body;
}
```

**Step 7:** Remove all neon-related CSS classes in `@layer components`:
- Remove `.neon-border`
- Remove `.text-shadow-lg`
- Remove `.shadow-glow-blue`
- Remove `.shadow-glow-pink`
- Remove `.shadow-glow-subtle`
- Remove `.neon-text`
- Remove `.neon-pink-text`
- Remove `.neon-green-text`
- Remove `.neon-gold-text`
- Remove `.neon-text-accent`
- Remove `.neon-text-flicker`
- Remove `.cyberpunk-button`
- Remove `.neon-text-contrast`
- Remove `.glitch-text`

**Step 8:** Add Labs utility classes:
```css
@layer components {
  /* Labs-only utility classes */
  .labs-glow {
    box-shadow: 0 0 12px rgba(166, 133, 73, 0.3);
  }

  .labs-text-glow {
    text-shadow: 0 0 8px rgba(166, 133, 73, 0.4);
  }

  .labs-panel {
    background: hsl(var(--input));
    border: 1px solid hsl(var(--primary) / 0.3);
  }

  /* Button styles per Brand Kit */
  .btn-primary {
    @apply bg-background text-foreground border-none rounded-md px-6 py-3;
    @apply font-heading font-semibold text-base;
    @apply transition-all duration-300 ease-out;
  }

  .btn-primary:hover {
    @apply bg-accent;
  }

  .btn-secondary {
    @apply bg-transparent text-primary border-2 border-primary rounded-md px-6 py-3;
    @apply font-heading font-normal text-base;
    @apply transition-all duration-300 ease-out;
  }

  .btn-secondary:hover {
    @apply bg-primary text-background;
  }
}
```

**Step 9:** Remove all neon keyframe animations at the bottom of the file.

**Validation:**
```bash
grep -c "cyberpunk\|neon\|#121212\|#00CCFF\|#FF69B4" app/globals.css
# Expected: 0
```

---

### Task 0.3: Update app/layout.tsx Fonts and Classes

**File:** `app/layout.tsx`

**Step 1:** Remove the Inter font import (line 3):
```typescript
// DELETE: import { Inter } from "next/font/google";
```

**Step 2:** Update the body className (line 60):
```tsx
<body className="font-body bg-background min-h-screen">
```

**Validation:**
```bash
grep -c "cyberpunk\|font-body2" app/layout.tsx
# Expected: 0
```

---

### Task 0.4: Create Mode Switch Component

**File:** `components/mode-switch.tsx` (NEW FILE)

```tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Mode = 'media' | 'labs';

export function ModeSwitch() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>('media');

  // Infer mode from route
  useEffect(() => {
    if (pathname.startsWith('/labs') || pathname.startsWith('/services/labs')) {
      setMode('labs');
    } else {
      setMode('media');
    }
  }, [pathname]);

  // Persist to localStorage and update document
  useEffect(() => {
    localStorage.setItem('moons-out-mode', mode);
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('moons-out-mode') as Mode | null;
    if (stored && (stored === 'media' || stored === 'labs')) {
      setMode(stored);
    }
  }, []);

  return (
    <div className="flex items-center gap-1 rounded-md border border-primary/30 p-1">
      <button
        onClick={() => setMode('media')}
        className={`px-3 py-1 rounded text-sm font-heading font-semibold transition-all duration-200 ${
          mode === 'media'
            ? 'bg-primary text-background'
            : 'text-primary hover:bg-primary/10'
        }`}
      >
        Media
      </button>
      <button
        onClick={() => setMode('labs')}
        className={`px-3 py-1 rounded text-sm font-heading font-semibold transition-all duration-200 ${
          mode === 'labs'
            ? 'bg-primary text-background'
            : 'text-primary hover:bg-primary/10'
        }`}
      >
        Labs
      </button>
    </div>
  );
}
```

---

### Task 0.5: Add Mode Switch to Navigation

**File:** `components/navigation.tsx`

**Step 1:** Add import at top:
```tsx
import { ModeSwitch } from './mode-switch';
```

**Step 2:** Add the ModeSwitch component in the nav, positioned center-right:
```tsx
<ModeSwitch />
```

**Note:** The exact placement depends on current navigation structure. Place it after the main nav links, before any CTA button.

---

### Task 0.6: Update Call-to-Action Component

**File:** `components/call-to-action.tsx`

Remove all cyberpunk-related classes. Use the new button styles:

```tsx
// Replace cyberpunk-button with btn-primary or btn-secondary
className="btn-primary"
// or
className="btn-secondary"
```

---

### Task 0.7: Update All Page Backgrounds

**Files to update:**
- `app/page.tsx`
- `app/contact/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/services/page.tsx`
- `app/services/creative/page.tsx`
- `app/services/labs/page.tsx`
- `app/our-team/page.tsx`
- `app/creative-process/page.tsx`
- `app/privacy/page.tsx`

**For each file:**
1. Search for `bg-cyberpunk-background` → Replace with `bg-background`
2. Search for `#121212` → Replace with `bg-background`
3. Search for any gradient classes → Replace with `bg-background`
4. Search for `text-cyberpunk-*` → Replace with appropriate `text-primary`, `text-foreground`, or `text-accent`
5. Search for `border-cyberpunk-*` → Replace with `border-primary` or `border-accent`

---

## PHASE 1: STRUCTURAL CHANGES

### Task 1.1: Create Route Structure

**Current structure:**
```
/app
├── page.tsx (home - should default to Media)
├── contact/
├── projects/
├── services/
│   ├── creative/
│   └── labs/
```

**Required structure:**
```
/app
├── page.tsx (home - defaults to Media)
├── (media)/           # Route group for Media pages
│   ├── projects/
│   ├── contact/
│   └── services/
├── (labs)/            # Route group for Labs pages
│   ├── projects/
│   └── roadmap/       # Optional
```

**Implementation:** For MVP, the mode switch handles this via localStorage. Routes can remain as-is, with mode-specific styling applied via `[data-mode="media"]` and `[data-mode="labs"]` CSS selectors.

---

### Task 1.2: Add Mode-Specific CSS Selectors

**File:** `app/globals.css`

Add at the end:
```css
/* Mode-specific styling */
[data-mode="media"] {
  /* Media: Campfire - warm, spacious */
}

[data-mode="media"] .card,
[data-mode="media"] .panel {
  border-radius: 6px;
  box-shadow: none;
}

[data-mode="labs"] {
  /* Labs: Mission Control - sharp, technical */
}

[data-mode="labs"] .card,
[data-mode="labs"] .panel {
  border-radius: 4px;
  background: hsl(var(--input));
  border: 1px solid hsl(var(--primary) / 0.3);
}

[data-mode="labs"] .labs-glow {
  box-shadow: 0 0 12px rgba(166, 133, 73, 0.3);
}
```

---

## PHASE 2: MEDIA PAGES (CREDIBILITY)

### Task 2.1: Update Media Landing Page (Home)

**File:** `app/page.tsx`

**Requirements:**
- Primary purpose: Credibility in <5 seconds for social traffic
- Above the fold: 1-3 highlighted projects ONLY
- NO service list
- NO mission paragraph

**Structure:**
```tsx
<main className="min-h-screen bg-background">
  {/* Hero: Featured projects only */}
  <section className="h-screen flex items-center justify-center">
    <div className="max-w-6xl mx-auto px-4">
      {/* 1-3 project highlights */}
    </div>
  </section>

  {/* Below fold: Additional content */}
</main>
```

---

### Task 2.2: Update Projects Page (Gallery Format)

**File:** `app/projects/page.tsx`

**Each project card contains:**
- Hero asset (image/video)
- Short narrative (what it was, why it mattered)
- High-quality gallery
- Optional testimonial

**Styling:**
- Border radius: 6px (Media mode)
- Generous spacing
- Subtle 1px goldenrod border on hover
- Transition: 300ms ease-out

---

### Task 2.3: Update Contact Page (Zero Friction)

**File:** `app/contact/page.tsx`

**Requirements:**
- One-step contact form (name, email, message)
- Social handles directly visible
- Team section below contact
- NO multi-step flows
- NO gating

---

## PHASE 3: LABS PAGES (LEGIBILITY)

### Task 3.1: Update Labs Landing Page

**File:** `app/services/labs/page.tsx`

**Requirements:**
- Sharper, more technical tone
- One-paragraph explanation of Labs' role
- 1-2 active project highlights
- Uses `--input` (indigo) backgrounds for panels
- Permitted: subtle goldenrod glow on key elements

**Structure:**
```tsx
<main className="min-h-screen bg-background" data-section="labs">
  <section className="labs-panel p-8 rounded">
    <h1 className="font-heading text-4xl text-primary labs-text-glow">
      Moons Out Labs
    </h1>
    <p className="font-body text-foreground mt-4">
      {/* One paragraph explaining Labs */}
    </p>
  </section>

  {/* Project highlights with labs-glow */}
</main>
```

---

### Task 3.2: Create Labs Project Page Template

**File:** `app/services/labs/projects/[slug]/page.tsx` (or similar)

**Each Labs project page structure:**

1. **Problem Statement**
   - What's broken?

2. **Broken Invariant**
   - What rule is being violated?

3. **System / Approach**
   - How are we solving it?

4. **Current Status**
   - research | prototype | live

5. **Artifacts**
   - Repo link, demo, write-up

6. **Call to Participate**
   - Read more, follow, collaborate

---

## PHASE 4: COMPONENT UPDATES

### Task 4.1: Button Component Specifications

**Primary Button:**
```css
.btn-primary {
  background: hsl(var(--background));  /* #024029 */
  color: hsl(var(--foreground));       /* #F5F5DC */
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-family: Oswald, sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.btn-primary:hover {
  background: hsl(var(--accent));      /* #59052D */
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: hsl(var(--primary));          /* #A68549 */
  border: 2px solid hsl(var(--primary));
  border-radius: 6px;
  padding: 12px 24px;
  font-family: Oswald, sans-serif;
  font-weight: 400;
  font-size: 16px;
}

.btn-secondary:hover {
  background: hsl(var(--primary));
  color: hsl(var(--background));
}
```

---

### Task 4.2: Form Component Specifications

```css
/* Form container */
.form-container {
  background: hsl(var(--background));
}

/* Input fields */
input, textarea, select {
  background: hsl(var(--input));       /* #0E1140 */
  color: hsl(var(--foreground));       /* #F5F5DC */
  border: 1px solid hsl(var(--primary));
  border-radius: 4px;
  font-family: Roboto, sans-serif;
}

input:focus, textarea:focus, select:focus {
  border: 2px solid hsl(var(--accent));
  outline: none;
}

input::placeholder {
  color: hsl(var(--muted-foreground)); /* #8B8B8B */
}

label {
  color: hsl(var(--foreground));
  font-family: Roboto, sans-serif;
}
```

---

### Task 4.3: Card Component Specifications

**Media Mode Card:**
```css
[data-mode="media"] .card {
  background: hsl(var(--background));
  border: 1px solid hsl(var(--primary) / 0.3);
  border-radius: 6px;
  padding: 24px;
  box-shadow: none;
  transition: border-color 300ms ease-out;
}

[data-mode="media"] .card:hover {
  border-color: hsl(var(--primary));
}
```

**Labs Mode Card:**
```css
[data-mode="labs"] .card {
  background: hsl(var(--input));
  border: 1px solid hsl(var(--primary) / 0.3);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 12px rgba(166, 133, 73, 0.3);
  transition: all 150ms ease-in-out;
}

[data-mode="labs"] .card:hover {
  box-shadow: 0 0 20px rgba(166, 133, 73, 0.5);
}
```

---

## PHASE 5: CLEANUP AND VALIDATION

### Task 5.1: Search and Remove All Cyberpunk References

Run these commands to find remaining issues:

```bash
# Find remaining cyberpunk colors
grep -r "#121212\|#00CCFF\|#FF69B4\|#00FF7F\|#6A5ACD" --include="*.tsx" --include="*.ts" --include="*.css"

# Find remaining cyberpunk classes
grep -r "cyberpunk\|neon" --include="*.tsx" --include="*.ts" --include="*.css"

# Find old fonts
grep -r "M PLUS\|EB Garamond\|font-body2\|font-hero" --include="*.tsx" --include="*.ts" --include="*.css"

# Find gradients (not allowed)
grep -r "gradient" --include="*.tsx" --include="*.ts" --include="*.css"
```

Fix any matches found.

---

### Task 5.2: Accessibility Audit

**Contrast requirements:**
- Text on `--background` (#024029): Use `--foreground` (#F5F5DC) - ✅ Passes WCAG AA
- Text on `--input` (#0E1140): Use `--foreground` (#F5F5DC) - ✅ Passes WCAG AA
- Primary text (#A68549) on background: Check contrast ratio

**Run validation:**
- Lighthouse accessibility score ≥ 90
- No color contrast errors

---

### Task 5.3: Visual Regression Testing

**Checklist:**
- [ ] Homepage loads with forest green background
- [ ] All text is legible (no low contrast)
- [ ] Mode switch toggles between Media/Labs
- [ ] Media pages have 6px border radius
- [ ] Labs pages have 4px border radius + glow effects
- [ ] No neon colors visible anywhere
- [ ] Buttons follow Brand Kit spec
- [ ] Forms follow Brand Kit spec

---

## DEFINITION OF DONE

The transformation is complete when ALL of the following are true:

- [ ] All pages use Brand Kit v2.7 colors (grep returns 0 cyberpunk matches)
- [ ] Typography is Oswald + Roboto throughout
- [ ] Mode switch is visible and functional on all pages
- [ ] Media pages feel warm, documentary, spacious
- [ ] Labs pages feel sharp, technical, luminous (same colors, different treatment)
- [ ] A social visitor understands Moons Out Media in under 5 seconds
- [ ] Projects, not services, lead trust
- [ ] Labs reads as a serious systems arm
- [ ] No gradients anywhere
- [ ] Accessibility score ≥ 90

---

## APPENDIX A: FILE-BY-FILE CHANGE SUMMARY

| File | Changes Required |
|------|------------------|
| `tailwind.config.ts` | Remove safelist, update fontFamily, remove cyberpunk colors, remove textShadow, remove neon keyframes |
| `app/globals.css` | Update font imports, replace CSS variables, update backgrounds, remove neon classes, add labs utilities |
| `app/layout.tsx` | Remove Inter import, update body className |
| `components/mode-switch.tsx` | CREATE NEW FILE |
| `components/navigation.tsx` | Add ModeSwitch import and component |
| `components/call-to-action.tsx` | Replace cyberpunk-button with btn-primary/secondary |
| `app/page.tsx` | Update backgrounds, colors, remove gradients |
| `app/contact/page.tsx` | Update backgrounds, colors, simplify form |
| `app/projects/page.tsx` | Update backgrounds, colors, card styling |
| `app/services/labs/page.tsx` | Add labs-panel, labs-glow classes |
| All other page files | Update backgrounds, colors |

---

## APPENDIX B: COLOR HEX TO HSL CONVERSION

Use these exact values in CSS variables:

```
#024029 → 156 95% 13%   (background)
#A68549 → 41 36% 47%    (primary)
#012A1B → 156 95% 9%    (muted)
#0E1140 → 234 63% 15%   (input)
#59052D → 338 91% 18%   (accent)
#380140 → 292 98% 13%   (secondary)
#F5F5DC → 60 56% 91%    (foreground)
#8B8B8B → 0 0% 55%      (muted-foreground)
```

---

## APPENDIX C: QUICK REFERENCE CARD

**Fonts:**
- Headlines: `font-heading` (Oswald)
- Body: `font-body` (Roboto)

**Colors (Tailwind classes):**
- Background: `bg-background`
- Text: `text-foreground`, `text-primary`, `text-accent`
- Borders: `border-primary`, `border-accent`

**Mode-specific:**
- Media: `rounded-md` (6px), no shadows, `duration-300`
- Labs: `rounded` (4px), `labs-glow`, `labs-panel`, `duration-150`

**Buttons:**
- Primary: `btn-primary`
- Secondary: `btn-secondary`
