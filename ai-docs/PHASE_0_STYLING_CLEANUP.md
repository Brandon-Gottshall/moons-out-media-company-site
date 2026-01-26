# Phase 0: Styling System Cleanup (PREREQUISITE)

> **Purpose:** Prepare the codebase for brand transformation by converting hardcoded colors to CSS variables
> **Status:** MUST COMPLETE BEFORE `TRANSFORMATION_PLAN_v3.md`
> **Estimated Scope:** 148+ hardcoded color instances across 13 files

---

## Why This Phase Exists

The current codebase has **hardcoded hex colors and rgba values scattered throughout components**. The transformation plan assumes colors are controlled via CSS variables. Without this cleanup, changing the brand palette would require touching 148+ individual color references.

**After this phase:**
- All colors flow from CSS variables in `:root`
- Changing the brand = changing ~20 variables in one file
- Components use semantic color tokens, not raw hex values

---

## AUDIT SUMMARY

### Critical Files (Must Fix)

| File | Issues | Hardcoded Colors |
|------|--------|------------------|
| `tailwind.config.ts` | Keyframes, text shadows | 12 |
| `globals.css` | Component classes, backgrounds | 25 |
| `navigation.tsx` | Inline styles, rgba() | 80+ |
| `portfolio-categories.tsx` | Color mapping function | 20 |
| `creative-process.tsx` | Gradient | 3 |
| `service-hero.tsx` | Grid patterns | 6 |

### Secondary Files (Should Fix)

| File | Issues | Hardcoded Colors |
|------|--------|------------------|
| `video-hero.tsx` | Grid patterns | 4 |
| `app/services/page.tsx` | Grid patterns | 4 |
| `app/services/creative/page.tsx` | Grid patterns | 4 |
| `app/services/labs/page.tsx` | Grid patterns | 4 |
| `contact-form.tsx` | Arbitrary TW values | 6 |
| `contact-info.tsx` | Social brand colors | 5 |
| `app/projects/[slug]/page.tsx` | accentColor prop | 1 |

---

## TASK 0.1: Create Intermediate CSS Variable Layer

**File:** `app/globals.css`

**Goal:** Add CSS variables for ALL currently-used colors so we can swap them later.

Add this block BEFORE the `:root` block:

```css
/* ============================================
   LEGACY CYBERPUNK COLORS (To be replaced)
   These variables exist to decouple components
   from hardcoded values. Once all components
   use these, we can swap in Brand Kit colors.
   ============================================ */

:root {
  /* Core Cyberpunk Palette - LEGACY */
  --cp-background: #121212;
  --cp-background-rgb: 18, 18, 18;

  --cp-blue: #00CCFF;
  --cp-blue-rgb: 0, 204, 255;
  --cp-blue-light: #66F0FF;

  --cp-pink: #FF69B4;
  --cp-pink-rgb: 255, 105, 180;
  --cp-pink-light: #FF85C1;

  --cp-green: #00FF7F;
  --cp-green-rgb: 0, 255, 127;
  --cp-green-light: #66FF99;

  --cp-purple: #483D8B;
  --cp-purple-rgb: 72, 61, 139;
  --cp-purple-light: #6A5ACD;

  --cp-teal: #14B8A6;
  --cp-teal-rgb: 20, 184, 166;

  --cp-yellow: #FACC15;
  --cp-yellow-rgb: 250, 204, 21;

  --cp-gold: #FFD700;
  --cp-gold-rgb: 255, 215, 0;

  --cp-orange: #FF7F50;
  --cp-orange-rgb: 255, 127, 80;

  --cp-red: #A6192E;
  --cp-red-rgb: 166, 25, 46;

  --cp-cyan: #22D3EE;
  --cp-cyan-rgb: 34, 211, 238;

  --cp-silver: #C0C0C0;
  --cp-silver-rgb: 192, 192, 192;

  /* Glow/Shadow opacity variants */
  --cp-glow-blue: rgba(var(--cp-blue-rgb), 0.5);
  --cp-glow-blue-subtle: rgba(var(--cp-blue-rgb), 0.15);
  --cp-glow-pink: rgba(var(--cp-pink-rgb), 0.5);
  --cp-glow-pink-subtle: rgba(var(--cp-pink-rgb), 0.15);
  --cp-glow-green: rgba(var(--cp-green-rgb), 0.5);
  --cp-glow-purple: rgba(var(--cp-purple-rgb), 0.3);

  /* Text shadow colors */
  --cp-text-glow-blue: 0 0 7px var(--cp-blue), 0 0 10px var(--cp-blue), 0 0 21px var(--cp-blue);
  --cp-text-glow-pink: 0 0 7px var(--cp-pink), 0 0 10px var(--cp-pink), 0 0 21px var(--cp-pink);
  --cp-text-glow-green: 0 0 7px var(--cp-green), 0 0 10px var(--cp-green), 0 0 21px var(--cp-green);
  --cp-text-glow-gold: 0 0 7px var(--cp-gold), 0 0 10px var(--cp-gold), 0 0 21px var(--cp-gold);
}
```

**Validation:**
```bash
grep -c "cp-blue\|cp-pink\|cp-green" app/globals.css
# Expected: Multiple matches (variables defined)
```

---

## TASK 0.2: Update tailwind.config.ts Keyframes

**File:** `tailwind.config.ts`

Replace hardcoded colors in keyframes with CSS variable references.

**Find (around line 213-240):**
```typescript
pulse: {
  '0%, 100%': {
    textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #00CCFF, 0 0 40px #00CCFF',
  },
  '50%': {
    textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #00CCFF, 0 0 80px #00CCFF',
  },
},
```

**Replace with:**
```typescript
pulse: {
  '0%, 100%': {
    textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px var(--cp-blue), 0 0 40px var(--cp-blue)',
  },
  '50%': {
    textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px var(--cp-blue), 0 0 80px var(--cp-blue)',
  },
},
```

**Find (header-glow keyframes):**
```typescript
'header-glow': {
  '0%': { borderColor: 'transparent' },
  '100%': { borderColor: 'rgba(0, 204, 255, 0.5)' },
},
'header-glow-out': {
  '0%': { borderColor: 'rgba(0, 204, 255, 0.5)' },
  '100%': { borderColor: 'transparent' },
},
```

**Replace with:**
```typescript
'header-glow': {
  '0%': { borderColor: 'transparent' },
  '100%': { borderColor: 'var(--cp-glow-blue)' },
},
'header-glow-out': {
  '0%': { borderColor: 'var(--cp-glow-blue)' },
  '100%': { borderColor: 'transparent' },
},
```

---

## TASK 0.3: Update tailwind.config.ts Text Shadows

**File:** `tailwind.config.ts`

**Find (around line 204-212):**
```typescript
textShadow: {
  'neon-blue': '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #00CCFF, 0 0 42px #00CCFF',
  'neon-pink': '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #FF69B4, 0 0 42px #FF69B4',
  'neon-green': '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #00FF7F, 0 0 42px #00FF7F',
},
```

**Replace with:**
```typescript
textShadow: {
  'neon-blue': 'var(--cp-text-glow-blue)',
  'neon-pink': 'var(--cp-text-glow-pink)',
  'neon-green': 'var(--cp-text-glow-green)',
},
```

---

## TASK 0.4: Update globals.css Component Classes

**File:** `app/globals.css`

Replace all hardcoded colors in `@layer components` with CSS variable references.

### 0.4.1: `.neon-border`

**Find:**
```css
.neon-border {
  box-shadow: 0 0 5px rgba(0,255,255,0.5), 0 0 10px rgba(0,255,255,0.3);
}
```

**Replace:**
```css
.neon-border {
  box-shadow: 0 0 5px var(--cp-glow-blue), 0 0 10px rgba(var(--cp-blue-rgb), 0.3);
}
```

### 0.4.2: `.text-shadow-lg`

**Find:**
```css
.text-shadow-lg {
  text-shadow: 0 1px 3px rgba(0, 255, 255, 0.6), 0 4px 6px rgba(0, 255, 255, 0.4);
}
```

**Replace:**
```css
.text-shadow-lg {
  text-shadow: 0 1px 3px rgba(var(--cp-blue-rgb), 0.6), 0 4px 6px rgba(var(--cp-blue-rgb), 0.4);
}
```

### 0.4.3: `.shadow-glow-blue`

**Find:**
```css
.shadow-glow-blue {
  box-shadow: 0 4px 14px 0 rgba(0, 255, 255, 0.15);
}
```

**Replace:**
```css
.shadow-glow-blue {
  box-shadow: 0 4px 14px 0 var(--cp-glow-blue-subtle);
}
```

### 0.4.4: `.shadow-glow-pink`

**Find:**
```css
.shadow-glow-pink {
  box-shadow: 0 4px 14px 0 rgba(255, 105, 180, 0.15);
}
```

**Replace:**
```css
.shadow-glow-pink {
  box-shadow: 0 4px 14px 0 var(--cp-glow-pink-subtle);
}
```

### 0.4.5: `.neon-text`

**Find:**
```css
.neon-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(0, 204, 255, 0.8), 0 0 42px rgba(0, 204, 255, 0.6);
}
```

**Replace:**
```css
.neon-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(var(--cp-blue-rgb), 0.8), 0 0 42px rgba(var(--cp-blue-rgb), 0.6);
}
```

### 0.4.6: `.neon-pink-text`

**Find:**
```css
.neon-pink-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(255, 105, 180, 0.8), 0 0 42px rgba(255, 105, 180, 0.6);
}
```

**Replace:**
```css
.neon-pink-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(var(--cp-pink-rgb), 0.8), 0 0 42px rgba(var(--cp-pink-rgb), 0.6);
}
```

### 0.4.7: `.neon-green-text`

**Find:**
```css
.neon-green-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(0, 255, 127, 0.8), 0 0 42px rgba(0, 255, 127, 0.6);
}
```

**Replace:**
```css
.neon-green-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(var(--cp-green-rgb), 0.8), 0 0 42px rgba(var(--cp-green-rgb), 0.6);
}
```

### 0.4.8: `.neon-gold-text`

**Find:**
```css
.neon-gold-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(255, 215, 0, 0.8), 0 0 42px rgba(255, 215, 0, 0.6);
}
```

**Replace:**
```css
.neon-gold-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px rgba(var(--cp-gold-rgb), 0.8), 0 0 42px rgba(var(--cp-gold-rgb), 0.6);
}
```

### 0.4.9: `.cyberpunk-button`

**Find:**
```css
.cyberpunk-button {
  background: rgba(72, 61, 139, 0.3);
  /* ... other properties ... */
}
```

**Replace:**
```css
.cyberpunk-button {
  background: var(--cp-glow-purple);
  /* ... other properties ... */
}
```

### 0.4.10: `.glitch-text` keyframes

**Find:**
```css
@keyframes glitch-1 {
  /* ... */
  text-shadow: -2px 0 #00ffff;
  /* ... */
}
@keyframes glitch-2 {
  /* ... */
  text-shadow: 2px 0 #ff69b4;
  /* ... */
}
```

**Replace:**
```css
@keyframes glitch-1 {
  /* ... */
  text-shadow: -2px 0 var(--cp-cyan);
  /* ... */
}
@keyframes glitch-2 {
  /* ... */
  text-shadow: 2px 0 var(--cp-pink);
  /* ... */
}
```

### 0.4.11: Background Color Fallbacks

**Find (multiple locations):**
```css
background-color: rgb(18, 18, 18);
```

**Replace:**
```css
background-color: var(--cp-background);
```

---

## TASK 0.5: Update portfolio-categories.tsx Color Mapping

**File:** `components/projects/portfolio-categories.tsx`

This file has a function that maps category names to hex colors. Replace it with CSS variable references.

**Find the color mapping function (around line 50-80):**
```typescript
const getColorHex = (colorName: string): string => {
  switch (colorName) {
    case 'cyberpunk-blue': return '#00CCFF';
    case 'cyberpunk-pink': return '#FF69B4';
    // ... etc
  }
}
```

**Replace with:**
```typescript
const getColorVar = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'cyberpunk-blue': 'var(--cp-blue)',
    'cyberpunk-pink': 'var(--cp-pink)',
    'cyberpunk-green': 'var(--cp-green)',
    'cyberpunk-purple': 'var(--cp-purple)',
    'cyberpunk-purple-light': 'var(--cp-purple-light)',
    'cyberpunk-teal': 'var(--cp-teal)',
    'cyberpunk-orange': 'var(--cp-orange)',
    'cyberpunk-yellow': 'var(--cp-yellow)',
    'cyberpunk-gold': 'var(--cp-gold)',
    'cyberpunk-red': 'var(--cp-red)',
    'cyberpunk-cyan': 'var(--cp-cyan)',
    'cyberpunk-silver': 'var(--cp-silver)',
  };
  return colorMap[colorName] || 'var(--cp-blue)';
};
```

Then update all usages of `getColorHex` to `getColorVar`.

---

## TASK 0.6: Update navigation.tsx Inline Styles

**File:** `components/navigation.tsx`

This is the most complex file with 80+ hardcoded color references.

### Strategy: Extract to CSS classes

**Step 1:** Identify all inline style patterns:
```tsx
style={{ color: '#00ccff' }}
style={{ boxShadow: '0 0 10px rgba(0, 204, 255, 0.5)' }}
style={{ borderColor: 'rgba(0, 204, 255, 0.3)' }}
```

**Step 2:** Create CSS utility classes in globals.css:
```css
/* Navigation-specific utilities */
.nav-text-accent {
  color: var(--cp-blue);
}

.nav-glow {
  box-shadow: 0 0 10px var(--cp-glow-blue);
}

.nav-border-glow {
  border-color: rgba(var(--cp-blue-rgb), 0.3);
}

.nav-hover-glow:hover {
  box-shadow: 0 0 15px var(--cp-glow-blue);
}
```

**Step 3:** Replace inline styles with class names:
```tsx
// Before
<span style={{ color: '#00ccff' }}>Text</span>

// After
<span className="nav-text-accent">Text</span>
```

### Specific Replacements

**Find all instances of:**
- `#00ccff` or `#00CCFF` → Replace with `var(--cp-blue)` or use `.nav-text-accent`
- `#ff69b4` or `#FF69B4` → Replace with `var(--cp-pink)`
- `rgba(0, 204, 255, X)` → Replace with `rgba(var(--cp-blue-rgb), X)`
- `rgba(255, 105, 180, X)` → Replace with `rgba(var(--cp-pink-rgb), X)`

**Note:** This file requires careful refactoring. Consider doing it in stages:
1. First pass: Replace hex colors with CSS variables in inline styles
2. Second pass: Extract repeated patterns to CSS classes
3. Third pass: Clean up and verify

---

## TASK 0.7: Update Service Page Grid Patterns

**Files:**
- `components/services/service-hero.tsx`
- `components/home/video-hero.tsx`
- `app/services/page.tsx`
- `app/services/creative/page.tsx`
- `app/services/labs/page.tsx`

These files use grid background patterns with hardcoded rgba colors.

**Find pattern like:**
```tsx
backgroundImage: `linear-gradient(rgba(0, 204, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 204, 255, 0.1) 1px, transparent 1px)`
```

**Replace with:**
```tsx
backgroundImage: `linear-gradient(rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px)`
```

**Better approach - Create a reusable class:**

Add to `globals.css`:
```css
.grid-pattern-blue {
  background-image:
    linear-gradient(rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

Then use `className="grid-pattern-blue"` instead of inline styles.

---

## TASK 0.8: Update creative-process.tsx Gradient

**File:** `components/about/creative-process.tsx`

**Find:**
```tsx
background: 'linear-gradient(to bottom, #00ccff, #ff69b4, #00ff7f)'
```

**Replace:**
```tsx
background: 'linear-gradient(to bottom, var(--cp-blue), var(--cp-pink), var(--cp-green))'
```

---

## TASK 0.9: Update contact-form.tsx Arbitrary Values

**File:** `components/contact/contact-form.tsx`

**Find all instances of:**
```tsx
hover:bg-[#ffffff0b]
```

**Replace with:**

First, add to `globals.css`:
```css
.hover-bg-white-subtle:hover {
  background-color: rgba(255, 255, 255, 0.04);
}
```

Then replace the Tailwind arbitrary value with the class.

---

## TASK 0.10: Update projects/[slug]/page.tsx

**File:** `app/projects/[slug]/page.tsx`

**Find:**
```tsx
accentColor="#00CCFF"
```

**Replace:**
```tsx
accentColor="var(--cp-blue)"
```

Or better, pass the CSS variable name and let the component resolve it.

---

## VALIDATION CHECKLIST

After completing all tasks, run these commands:

```bash
# Check for remaining hardcoded cyberpunk hex colors
grep -rn "#00CCFF\|#FF69B4\|#00FF7F\|#121212\|#483D8B\|#6A5ACD" \
  --include="*.tsx" --include="*.ts" --include="*.css" \
  --exclude-dir=node_modules

# Expected: 0 matches (or only in comments)

# Check for remaining hardcoded rgba with raw values
grep -rn "rgba(0, 204, 255\|rgba(255, 105, 180\|rgba(0, 255, 127\|rgba(72, 61, 139" \
  --include="*.tsx" --include="*.ts" --include="*.css" \
  --exclude-dir=node_modules

# Expected: 0 matches

# Verify CSS variables are defined
grep -c "cp-blue\|cp-pink\|cp-green" app/globals.css
# Expected: 20+ matches
```

---

## DEFINITION OF DONE FOR PHASE 0

- [ ] All cyberpunk colors defined as CSS variables in `:root`
- [ ] `tailwind.config.ts` keyframes use CSS variables
- [ ] `tailwind.config.ts` text shadows use CSS variables
- [ ] All `globals.css` component classes use CSS variables
- [ ] `portfolio-categories.tsx` color mapping uses CSS variables
- [ ] `navigation.tsx` inline styles converted to CSS variables/classes
- [ ] Grid pattern backgrounds use CSS variables
- [ ] All service pages updated
- [ ] Validation grep commands return 0 matches
- [ ] Site still renders correctly (visual check)

---

## WHAT HAPPENS NEXT

Once Phase 0 is complete:

1. **All colors are controlled via `--cp-*` CSS variables**
2. **The transformation plan can execute cleanly:**
   - Replace `--cp-background` with `--background` (Brand Kit)
   - Replace `--cp-blue` with `--primary` (Brand Kit)
   - Replace `--cp-pink` with `--accent` (Brand Kit)
   - etc.
3. **One file change = entire site rebranded**

The transformation becomes a simple variable swap rather than hunting through 148+ hardcoded values.

---

## APPENDIX: Full CSS Variable Reference

After Phase 0, these variables control all colors:

```css
:root {
  /* Legacy Cyberpunk (to be swapped) */
  --cp-background: #121212;
  --cp-blue: #00CCFF;
  --cp-pink: #FF69B4;
  --cp-green: #00FF7F;
  --cp-purple: #483D8B;
  --cp-teal: #14B8A6;
  --cp-yellow: #FACC15;
  --cp-gold: #FFD700;
  --cp-orange: #FF7F50;
  --cp-red: #A6192E;
  --cp-cyan: #22D3EE;
  --cp-silver: #C0C0C0;

  /* RGB variants for rgba() usage */
  --cp-blue-rgb: 0, 204, 255;
  --cp-pink-rgb: 255, 105, 180;
  --cp-green-rgb: 0, 255, 127;
  --cp-purple-rgb: 72, 61, 139;
  --cp-gold-rgb: 255, 215, 0;

  /* Pre-computed glow values */
  --cp-glow-blue: rgba(var(--cp-blue-rgb), 0.5);
  --cp-glow-pink: rgba(var(--cp-pink-rgb), 0.5);
  --cp-glow-purple: rgba(var(--cp-purple-rgb), 0.3);
}
```

When transformation runs, these become:

```css
:root {
  /* Brand Kit v2.7 */
  --background: 156 95% 13%;      /* #024029 */
  --primary: 41 36% 47%;          /* #A68549 */
  --accent: 338 91% 18%;          /* #59052D */
  /* ... etc */
}
```
