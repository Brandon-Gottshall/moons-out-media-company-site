# Phase 0: Styling System Cleanup - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert all hardcoded color values to CSS variables so the brand transformation (TRANSFORMATION_PLAN_v3.md) can execute as a simple variable swap.

**Architecture:** Add a CSS variable layer (`--cp-*`) for all cyberpunk colors, then systematically replace hardcoded hex/rgba values across 13 files. Colors flow from `:root` variables → component usage.

**Tech Stack:** CSS Custom Properties, Tailwind CSS, TypeScript/React

---

## Prerequisites

- Node.js installed
- Project runs locally (`npm run dev`)
- Git clean working state

---

## Task 1: Add CSS Variable Layer to globals.css

**Files:**
- Modify: `app/globals.css:15-37`

**Step 1: Add the CSS variable block**

Open `app/globals.css` and add this block IMMEDIATELY AFTER line 14 (after the `:root {` opening) and BEFORE line 16 (before `--background`):

```css
  /* ============================================
     LEGACY CYBERPUNK COLORS (To be replaced)
     These variables exist to decouple components
     from hardcoded values. Once all components
     use these, we can swap in Brand Kit colors.
     ============================================ */

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
  --cp-purple-light-rgb: 106, 90, 205;

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

  /* Social media brand colors */
  --social-twitter: #1DA1F2;
  --social-facebook: #4267B2;
  --social-instagram: #C13584;
  --social-linkedin: #0077B5;
  --social-youtube: #FF0000;

  /* Custom UI accent colors */
  --ui-purple-accent: #FF56F6;
  --ui-purple-accent-rgb: 255, 86, 246;
  --ui-cyan-accent: #65CEF0;
  --ui-cyan-accent-rgb: 101, 206, 240;

  /* Glow/Shadow opacity presets */
  --cp-glow-blue: rgba(var(--cp-blue-rgb), 0.5);
  --cp-glow-blue-subtle: rgba(var(--cp-blue-rgb), 0.15);
  --cp-glow-pink: rgba(var(--cp-pink-rgb), 0.5);
  --cp-glow-pink-subtle: rgba(var(--cp-pink-rgb), 0.15);
  --cp-glow-green: rgba(var(--cp-green-rgb), 0.5);
  --cp-glow-purple: rgba(var(--cp-purple-rgb), 0.3);
```

**Step 2: Verify the file still parses**

Run: `npm run dev`

Expected: Dev server starts without CSS errors.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(phase0): add CSS variable layer for cyberpunk colors"
```

---

## Task 2: Update globals.css Background Colors

**Files:**
- Modify: `app/globals.css:13,52,85`

**Step 1: Replace hardcoded background on line 13**

Find:
```css
background-color: rgb(18, 18, 18); /* Match site background */
```

Replace with:
```css
background-color: var(--cp-background); /* Match site background */
```

**Step 2: Replace hardcoded background on line 52**

Find:
```css
background-color: rgb(18, 18, 18); /* Match site background */
```

Replace with:
```css
background-color: var(--cp-background); /* Match site background */
```

**Step 3: Replace hardcoded background on line 85**

Find:
```css
background-color: rgb(18, 18, 18); /* Match site background */
```

Replace with:
```css
background-color: var(--cp-background); /* Match site background */
```

**Step 4: Verify visually**

Run: `npm run dev`

Check: Homepage background should still be dark (#121212).

**Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(phase0): convert background colors to CSS variables"
```

---

## Task 3: Update globals.css Component Classes

**Files:**
- Modify: `app/globals.css:106-234`

**Step 1: Update .neon-border (line 107)**

Find:
```css
@apply border-2 border-cyberpunk-blue shadow-[0_0_5px_rgba(0,255,255,0.5)];
```

Replace with:
```css
@apply border-2 border-cyberpunk-blue shadow-[0_0_5px_rgba(var(--cp-blue-rgb),0.5)];
```

**Step 2: Update .text-shadow-lg (line 112)**

Find:
```css
text-shadow: 0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4);
```

Replace with:
```css
text-shadow: 0 0 10px rgba(var(--cp-blue-rgb), 0.6), 0 0 20px rgba(var(--cp-blue-rgb), 0.4);
```

**Step 3: Update .shadow-glow-blue (line 117)**

Find:
```css
box-shadow: 0 2px 8px rgba(0, 255, 255, 0.15);
```

Replace with:
```css
box-shadow: 0 2px 8px rgba(var(--cp-blue-rgb), 0.15);
```

**Step 4: Update .shadow-glow-pink (line 121)**

Find:
```css
box-shadow: 0 2px 8px rgba(255, 105, 180, 0.15);
```

Replace with:
```css
box-shadow: 0 2px 8px rgba(var(--cp-pink-rgb), 0.15);
```

**Step 5: Update .neon-text (line 132)**

Find:
```css
text-shadow: 0 0 3px rgba(255, 255, 255, 0.8), 0 0 8px rgba(0, 204, 255, 0.6), 0 0 12px rgba(0, 204, 255, 0.4);
```

Replace with:
```css
text-shadow: 0 0 3px rgba(255, 255, 255, 0.8), 0 0 8px rgba(var(--cp-blue-rgb), 0.6), 0 0 12px rgba(var(--cp-blue-rgb), 0.4);
```

**Step 6: Update .neon-pink-text (line 139)**

Find:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.8), 0 0 2px rgba(255, 105, 180, 0.6), 0 0 3px rgba(255, 105, 180, 0.4);
```

Replace with:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.8), 0 0 2px rgba(var(--cp-pink-rgb), 0.6), 0 0 3px rgba(var(--cp-pink-rgb), 0.4);
```

**Step 7: Update .neon-green-text (line 146)**

Find:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.8), 0 0 2px rgba(0, 255, 127, 0.6), 0 0 3px rgba(0, 255, 127, 0.4);
```

Replace with:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.8), 0 0 2px rgba(var(--cp-green-rgb), 0.6), 0 0 3px rgba(var(--cp-green-rgb), 0.4);
```

**Step 8: Update .neon-gold-text (line 153)**

Find:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.8), 0 0 2px rgba(255, 215, 0, 0.6), 0 0 3px rgba(255, 215, 0, 0.4);
```

Replace with:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.8), 0 0 2px rgba(var(--cp-gold-rgb), 0.6), 0 0 3px rgba(var(--cp-gold-rgb), 0.4);
```

**Step 9: Update .neon-text-accent (line 161)**

Find:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.9), 0 0 2px rgba(0, 204, 255, 0.7), 0 0 4px rgba(0, 204, 255, 0.5);
```

Replace with:
```css
text-shadow: 0 0 0.75px rgba(255, 255, 255, 0.9), 0 0 2px rgba(var(--cp-blue-rgb), 0.7), 0 0 4px rgba(var(--cp-blue-rgb), 0.5);
```

**Step 10: Update .cyberpunk-button (line 182)**

Find:
```css
box-shadow: 0 2px 8px rgba(72, 61, 139, 0.3);
```

Replace with:
```css
box-shadow: 0 2px 8px rgba(var(--cp-purple-rgb), 0.3);
```

**Step 11: Update .cyberpunk-button:hover (line 189)**

Find:
```css
box-shadow: 0 4px 12px rgba(72, 61, 139, 0.4);
```

Replace with:
```css
box-shadow: 0 4px 12px rgba(var(--cp-purple-rgb), 0.4);
```

**Step 12: Update .glitch-text::before (line 228)**

Find:
```css
text-shadow: -2px 0 #00ffff;
```

Replace with:
```css
text-shadow: -2px 0 var(--cp-cyan);
```

**Step 13: Update .glitch-text::after (line 233)**

Find:
```css
text-shadow: -2px 0 #ff69b4;
```

Replace with:
```css
text-shadow: -2px 0 var(--cp-pink);
```

**Step 14: Verify visually**

Run: `npm run dev`

Check: Navigate to pages with neon text effects. Colors should be unchanged.

**Step 15: Commit**

```bash
git add app/globals.css
git commit -m "feat(phase0): convert globals.css component classes to CSS variables"
```

---

## Task 4: Update tailwind.config.ts Text Shadows

**Files:**
- Modify: `tailwind.config.ts:204-212`

**Step 1: Update neon-blue text shadow**

Find (line 206-207):
```typescript
"neon-blue":
  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00CCFF, 0 0 20px #00CCFF, 0 0 25px #00CCFF, 0 0 30px #00CCFF",
```

Replace with:
```typescript
"neon-blue":
  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--cp-blue), 0 0 20px var(--cp-blue), 0 0 25px var(--cp-blue), 0 0 30px var(--cp-blue)",
```

**Step 2: Update neon-pink text shadow**

Find (line 208-209):
```typescript
"neon-pink":
  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FF69B4, 0 0 20px #FF69B4, 0 0 25px #FF69B4, 0 0 30px #FF69B4",
```

Replace with:
```typescript
"neon-pink":
  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--cp-pink), 0 0 20px var(--cp-pink), 0 0 25px var(--cp-pink), 0 0 30px var(--cp-pink)",
```

**Step 3: Update neon-green text shadow**

Find (line 210-211):
```typescript
"neon-green":
  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00FF7F, 0 0 20px #00FF7F, 0 0 25px #00FF7F, 0 0 30px #00FF7F",
```

Replace with:
```typescript
"neon-green":
  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--cp-green), 0 0 20px var(--cp-green), 0 0 25px var(--cp-green), 0 0 30px var(--cp-green)",
```

**Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(phase0): convert tailwind text shadows to CSS variables"
```

---

## Task 5: Update tailwind.config.ts Keyframes

**Files:**
- Modify: `tailwind.config.ts:218-280`

**Step 1: Update pulse keyframe (lines 218-225)**

Find:
```typescript
pulse: {
  "0%": {
    textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00CCFF, 0 0 20px #00CCFF, 0 0 25px #00CCFF",
  },
  "100%": {
    textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00CCFF, 0 0 30px #00CCFF, 0 0 40px #00CCFF",
  },
},
```

Replace with:
```typescript
pulse: {
  "0%": {
    textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--cp-blue), 0 0 20px var(--cp-blue), 0 0 25px var(--cp-blue)",
  },
  "100%": {
    textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--cp-blue), 0 0 30px var(--cp-blue), 0 0 40px var(--cp-blue)",
  },
},
```

**Step 2: Update header-glow keyframe (lines 227-256)**

Find the entire `"header-glow"` block and replace ALL `rgba(0, 204, 255, X)` with `rgba(var(--cp-blue-rgb), X)`:

```typescript
"header-glow": {
  "0%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0)",
    borderColor: "rgba(var(--cp-blue-rgb), 0)",
  },
  "40%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.1)",
    borderColor: "rgba(var(--cp-blue-rgb), 0.2)",
  },
  "45%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0)",
    borderColor: "rgba(var(--cp-blue-rgb), 0)",
  },
  "50%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.15)",
    borderColor: "rgba(var(--cp-blue-rgb), 0.3)",
  },
  "55%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0)",
    borderColor: "rgba(var(--cp-blue-rgb), 0)",
  },
  "60%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.25)",
    borderColor: "rgba(var(--cp-blue-rgb), 0.4)",
  },
  "100%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.4)",
    borderColor: "rgba(var(--cp-blue-rgb), 0.5)",
  },
},
```

**Step 3: Update header-glow-out keyframe (lines 258-280)**

Find the entire `"header-glow-out"` block and replace ALL `rgba(0, 204, 255, X)` with `rgba(var(--cp-blue-rgb), X)`:

```typescript
"header-glow-out": {
  "0%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.4)",
  },
  "40%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.25)",
  },
  "45%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0)",
  },
  "50%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.15)",
  },
  "55%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0)",
  },
  "60%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0.1)",
  },
  "100%": {
    boxShadow: "0 4px 15px rgba(var(--cp-blue-rgb), 0)",
  },
},
```

**Step 4: Verify the build**

Run: `npm run build`

Expected: Build completes without errors.

**Step 5: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(phase0): convert tailwind keyframes to CSS variables"
```

---

## Task 6: Update portfolio-categories.tsx Color Mapping

**Files:**
- Modify: `components/projects/portfolio-categories.tsx:238-249,325-346`

**Step 1: Update getColorValue function (lines 238-249)**

Find:
```typescript
const getColorValue = (colorName: string, opacity: number = 1): string => {
  const colors: Record<string, string> = {
    'cyberpunk-blue': '0, 204, 255',
    'cyberpunk-pink': '255, 105, 180',
    'cyberpunk-green': '0, 255, 127',
    'cyberpunk-purple-light': '106, 90, 205',
    'cyberpunk-teal': '32, 178, 170',
    'cyberpunk-orange': '255, 127, 80',
  };

  return `rgba(${colors[colorName] || colors['cyberpunk-blue']}, ${opacity})`;
};
```

Replace with:
```typescript
const getColorValue = (colorName: string, opacity: number = 1): string => {
  const colors: Record<string, string> = {
    'cyberpunk-blue': 'var(--cp-blue-rgb)',
    'cyberpunk-pink': 'var(--cp-pink-rgb)',
    'cyberpunk-green': 'var(--cp-green-rgb)',
    'cyberpunk-purple-light': 'var(--cp-purple-light-rgb)',
    'cyberpunk-teal': 'var(--cp-teal-rgb)',
    'cyberpunk-orange': 'var(--cp-orange-rgb)',
  };

  return `rgba(${colors[colorName] || colors['cyberpunk-blue']}, ${opacity})`;
};
```

**Step 2: Find and update getColorHex function (around lines 325-346)**

Search for `case 'cyberpunk-blue': return '#00CCFF';` and update the entire switch:

Find:
```typescript
case 'cyberpunk-blue': return '#00CCFF';
case 'cyberpunk-pink': return '#FF69B4';
case 'cyberpunk-green': return '#00FF7F';
```

Replace with:
```typescript
case 'cyberpunk-blue': return 'var(--cp-blue)';
case 'cyberpunk-pink': return 'var(--cp-pink)';
case 'cyberpunk-green': return 'var(--cp-green)';
```

Also update the default case:
```typescript
default: return 'var(--cp-blue)'; // Default to blue
```

**Step 3: Verify**

Run: `npm run dev`

Navigate to `/projects` and verify category cards still show correct colors.

**Step 4: Commit**

```bash
git add components/projects/portfolio-categories.tsx
git commit -m "feat(phase0): convert portfolio-categories color mapping to CSS variables"
```

---

## Task 7: Update navigation.tsx Hardcoded Colors

**Files:**
- Modify: `components/navigation.tsx:162-315`

**Step 1: Update all text-shadow rgba values**

This file has a CSS-in-JS style block. Find and replace ALL instances:

Find: `rgba(0, 204, 255,`
Replace with: `rgba(var(--cp-blue-rgb),`

**Step 2: Update hex color gradient (lines 300-303)**

Find:
```css
#00ccff,
#00ccff 30%,
#ff69b4 70%,
#ff69b4
```

Replace with:
```css
var(--cp-blue),
var(--cp-blue) 30%,
var(--cp-pink) 70%,
var(--cp-pink)
```

**Step 3: Verify**

Run: `npm run dev`

Navigate around the site and verify navigation glow effects work correctly.

**Step 4: Commit**

```bash
git add components/navigation.tsx
git commit -m "feat(phase0): convert navigation.tsx colors to CSS variables"
```

---

## Task 8: Update Service Pages Grid Patterns

**Files:**
- Modify: `app/services/page.tsx:18-19`
- Modify: `app/services/creative/page.tsx:114-115`
- Modify: `app/services/labs/page.tsx:68-69`
- Modify: `components/services/service-hero.tsx:37-38,144-145`
- Modify: `components/home/video-hero.tsx:205-206`

**Step 1: Update app/services/page.tsx (lines 18-19)**

Find:
```tsx
linear-gradient(to right, rgba(0, 204, 255, 0.1) 1px, transparent 1px),
linear-gradient(to bottom, rgba(0, 204, 255, 0.1) 1px, transparent 1px)
```

Replace with:
```tsx
linear-gradient(to right, rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px),
linear-gradient(to bottom, rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px)
```

**Step 2: Update app/services/creative/page.tsx (lines 114-115)**

Same replacement as Step 1.

**Step 3: Update app/services/labs/page.tsx (lines 68-69)**

Find:
```tsx
linear-gradient(to right, rgba(255, 105, 180, 0.1) 1px, transparent 1px),
linear-gradient(to bottom, rgba(255, 105, 180, 0.1) 1px, transparent 1px)
```

Replace with:
```tsx
linear-gradient(to right, rgba(var(--cp-pink-rgb), 0.1) 1px, transparent 1px),
linear-gradient(to bottom, rgba(var(--cp-pink-rgb), 0.1) 1px, transparent 1px)
```

**Step 4: Update components/services/service-hero.tsx (lines 37-38)**

Same replacement as Step 1.

**Step 5: Update components/services/service-hero.tsx (lines 144-145)**

Find:
```tsx
"linear-gradient(90deg, transparent 0%, rgba(0, 204, 255, 0.1) 50%, transparent 100%)",
"linear-gradient(90deg, transparent 0%, rgba(0, 204, 255, 0) 50%, transparent 100%)",
```

Replace with:
```tsx
"linear-gradient(90deg, transparent 0%, rgba(var(--cp-blue-rgb), 0.1) 50%, transparent 100%)",
"linear-gradient(90deg, transparent 0%, rgba(var(--cp-blue-rgb), 0) 50%, transparent 100%)",
```

**Step 6: Update components/home/video-hero.tsx (lines 205-206)**

Same replacement as Step 1.

**Step 7: Verify**

Run: `npm run dev`

Navigate to `/services`, `/services/creative`, `/services/labs` and verify grid patterns display correctly.

**Step 8: Commit**

```bash
git add app/services/page.tsx app/services/creative/page.tsx app/services/labs/page.tsx components/services/service-hero.tsx components/home/video-hero.tsx
git commit -m "feat(phase0): convert service page grid patterns to CSS variables"
```

---

## Task 9: Update creative-process.tsx Gradients

**Files:**
- Modify: `components/about/creative-process.tsx:84,131-134`

**Step 1: Update the vertical gradient (line 84)**

Find:
```tsx
"linear-gradient(to bottom, #00ccff, #ff69b4, #00ff7f)",
```

Replace with:
```tsx
"linear-gradient(to bottom, var(--cp-blue), var(--cp-pink), var(--cp-green))",
```

**Step 2: Update animated gradients (lines 131-134)**

Find:
```tsx
"linear-gradient(90deg, transparent, rgba(0, 204, 255, 0.1), transparent)",
"linear-gradient(90deg, transparent, rgba(255, 105, 180, 0.1), transparent)",
"linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.1), transparent)",
"linear-gradient(90deg, transparent, rgba(0, 204, 255, 0.1), transparent)",
```

Replace with:
```tsx
"linear-gradient(90deg, transparent, rgba(var(--cp-blue-rgb), 0.1), transparent)",
"linear-gradient(90deg, transparent, rgba(var(--cp-pink-rgb), 0.1), transparent)",
"linear-gradient(90deg, transparent, rgba(var(--cp-green-rgb), 0.1), transparent)",
"linear-gradient(90deg, transparent, rgba(var(--cp-blue-rgb), 0.1), transparent)",
```

**Step 3: Verify**

Run: `npm run dev`

Navigate to the About/Creative Process page and verify gradients display correctly.

**Step 4: Commit**

```bash
git add components/about/creative-process.tsx
git commit -m "feat(phase0): convert creative-process gradients to CSS variables"
```

---

## Task 10: Update contact-form.tsx Arbitrary Values

**Files:**
- Modify: `components/contact/contact-form.tsx:402,411,422,438,453,469`

**Step 1: Create CSS utility class in globals.css**

Add to `app/globals.css` inside `@layer components`:

```css
.hover-bg-white-subtle:hover {
  background-color: rgba(255, 255, 255, 0.04);
}
```

**Step 2: Replace all instances in contact-form.tsx**

Find (6 instances):
```tsx
hover:bg-[#ffffff0b]
```

Replace with:
```tsx
hover-bg-white-subtle
```

**Step 3: Verify**

Run: `npm run dev`

Navigate to `/contact` and verify form hover states work correctly.

**Step 4: Commit**

```bash
git add app/globals.css components/contact/contact-form.tsx
git commit -m "feat(phase0): replace contact-form arbitrary values with utility class"
```

---

## Task 11: Update contact-info.tsx Colors

**Files:**
- Modify: `components/contact/contact-info.tsx:34-35,100-104,114`

**Step 1: Update hover shadow (lines 34-35)**

Find:
```tsx
boxShadow: "0 0 20px rgba(255, 86, 246, 0.2)",
borderColor: "rgba(255, 86, 246, 0.4)",
```

Replace with:
```tsx
boxShadow: "0 0 20px rgba(var(--ui-purple-accent-rgb), 0.2)",
borderColor: "rgba(var(--ui-purple-accent-rgb), 0.4)",
```

**Step 2: Update social media colors (lines 100-104)**

Find:
```tsx
{ name: "twitter", color: "#1DA1F2" },
{ name: "facebook", color: "#4267B2" },
{ name: "instagram", color: "#C13584" },
{ name: "linkedin", color: "#0077B5" },
{ name: "youtube", color: "#FF0000" },
```

Replace with:
```tsx
{ name: "twitter", color: "var(--social-twitter)" },
{ name: "facebook", color: "var(--social-facebook)" },
{ name: "instagram", color: "var(--social-instagram)" },
{ name: "linkedin", color: "var(--social-linkedin)" },
{ name: "youtube", color: "var(--social-youtube)" },
```

**Step 3: Update hover glow (line 114)**

Find:
```tsx
boxShadow: "0 0 15px rgba(101, 206, 240, 0.5)",
```

Replace with:
```tsx
boxShadow: "0 0 15px rgba(var(--ui-cyan-accent-rgb), 0.5)",
```

**Step 4: Verify**

Run: `npm run dev`

Navigate to `/contact` and verify contact info section displays correctly with hover effects.

**Step 5: Commit**

```bash
git add components/contact/contact-info.tsx
git commit -m "feat(phase0): convert contact-info colors to CSS variables"
```

---

## Task 12: Update projects/[slug]/page.tsx

**Files:**
- Modify: `app/projects/[slug]/page.tsx:224,484`

**Step 1: Update accentColor props**

Find (line 224):
```tsx
accentColor="#00CCFF"
```

Replace with:
```tsx
accentColor="var(--cp-blue)"
```

Find (line 484):
```tsx
accentColor="#00CCFF"
```

Replace with:
```tsx
accentColor="var(--cp-blue)"
```

**Step 2: Verify**

Run: `npm run dev`

Navigate to any project detail page (e.g., `/projects/some-slug`) and verify accent colors work.

**Step 3: Commit**

```bash
git add "app/projects/[slug]/page.tsx"
git commit -m "feat(phase0): convert project page accent colors to CSS variables"
```

---

## Task 13: Final Validation

**Step 1: Run validation grep commands**

```bash
# Check for remaining hardcoded cyberpunk hex colors
grep -rn "#00CCFF\|#FF69B4\|#00FF7F\|#121212\|#483D8B\|#6A5ACD" \
  --include="*.tsx" --include="*.ts" --include="*.css" \
  --exclude-dir=node_modules

# Expected: 0 matches OR only in tailwind.config.ts color definitions
```

```bash
# Check for remaining hardcoded rgba with raw values
grep -rn "rgba(0, 204, 255\|rgba(255, 105, 180\|rgba(0, 255, 127\|rgba(72, 61, 139" \
  --include="*.tsx" --include="*.ts" --include="*.css" \
  --exclude-dir=node_modules

# Expected: 0 matches
```

```bash
# Verify CSS variables are defined
grep -c "cp-blue\|cp-pink\|cp-green" app/globals.css

# Expected: 20+ matches
```

```bash
# Check for missed arbitrary values
grep -rn "hover:bg-\[#" --include="*.tsx" --exclude-dir=node_modules

# Expected: 0 matches
```

**Step 2: Visual verification checklist**

- [ ] Homepage loads correctly with dark background
- [ ] Navigation glow effects work
- [ ] Project cards show correct category colors
- [ ] Contact form hover states work
- [ ] Service pages show grid patterns
- [ ] Creative process gradients animate correctly
- [ ] All neon text effects render properly

**Step 3: Run production build**

```bash
npm run build
```

Expected: Build completes without errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(phase0): complete styling cleanup - all colors now use CSS variables"
```

---

## Definition of Done

Phase 0 is complete when:

- [x] All cyberpunk colors defined as CSS variables in `:root`
- [x] Social media brand colors added to CSS variables
- [x] Custom UI accent colors (purple, cyan) added to CSS variables
- [x] `tailwind.config.ts` keyframes use CSS variables
- [x] `tailwind.config.ts` text shadows use CSS variables
- [x] All `globals.css` component classes use CSS variables
- [x] `portfolio-categories.tsx` color mapping uses CSS variables
- [x] `navigation.tsx` inline styles converted to CSS variables
- [x] Grid pattern backgrounds use CSS variables
- [x] All service pages updated
- [x] `creative-process.tsx` gradients use CSS variables
- [x] `contact-form.tsx` arbitrary values replaced
- [x] `contact-info.tsx` colors use CSS variables
- [x] `app/projects/[slug]/page.tsx` accentColor uses CSS variables
- [x] Validation grep commands return 0 matches
- [x] Production build succeeds
- [x] Site renders correctly (visual check)

---

## What Happens Next

Once Phase 0 is complete, execute `TRANSFORMATION_PLAN_v3.md`:

1. All colors are controlled via `--cp-*` CSS variables
2. The transformation becomes a simple variable swap:
   - Replace `--cp-background` with `--background` (Brand Kit)
   - Replace `--cp-blue` with `--primary` (Brand Kit)
   - Replace `--cp-pink` with `--accent` (Brand Kit)
3. One file change = entire site rebranded
