# MoonsOut Website - Phase 1 Specification (v3 - Task Tree Aligned)

## 1. Overview
This specification outlines the focused plan for Phase 1 of the MoonsOut Media Company website refinements. It is directly derived from the `MoonsOut-Phase1-TaskTree` provided, prioritizing critical (🔴) tasks first, followed by important (🟡) tasks. The primary goals are to enhance user experience, implement key structural and content changes, ensure data consistency, and improve specific page functionalities, all while adhering to the project's established coding patterns and Next.js 14 App Router best practices.

## 2. Architecture & Components Affected
The proposed changes will impact various parts of the application, as detailed in the Task Tree:

*   **Global Systems & Configuration:**
    *   Video data management (spreadsheet for Levi, G-01).
    *   Favicon assets (`public/` directory) and `public/manifest.webmanifest` (G-02, G-03).
    *   Global CSS for 100vh hero components (G-05).
    *   Global smooth scroll behavior and anchor link integrity (G-06).
    *   `components/layout/header.tsx` for mobile padding (C-02 🟡).
    *   `components/layout/footer.tsx` for whitespace removal (C-03 🟡).
    *   Removal of the global metrics bar (G-04).
*   **Core Data Management:**
    *   Services data (updated for Home page P-H-02, Projects page filters P-P-03).
    *   Project data types to make tabs optional on Portfolio Project page (P-PP-02).
    *   Video data structure for hero locations and Projects page subtitles (G-01).
*   **Pages (within `app/` directory, including structural and content changes):**
    *   Home Page (`app/page.tsx`): "Why Choose Us" block move and copy revision (P-H-01, CP-02), updated services (P-H-02).
    *   Projects Page (formerly Stories, route `/projects` P-P-01): Featured project logic, mobile clipping (P-P-02), new filter tabs (P-P-03), search-bar UX (P-P-04), simplified project cards (P-P-05 🟡), External Case Studies section (P-P-06 🟡).
    *   About Page (`app/about/page.tsx`): Removal of "Our Story" tab (P-A-01), full-viewport hero with 3 anchor buttons (P-A-02), deletion of "Risk-Taking" value (P-A-03), removal of bottom CTA (P-A-04), addition of Emma's profile (P-A-05 🟡).
    *   Services Page (`app/services/page.tsx`): Removal of "Our Process" (P-S-01), quiz, and "Transform Your Brand Story" section (P-S-02), centering of "View Projects" button (P-S-03), copy changes for button and typewriter text (CP-03), video hero (P-S-04 🟡), mobile arrow button border fix (P-S-05 🟡).
    *   Contact Page (`app/contact/page.tsx`): Stripped down structure (P-CT-01), revised Quick Contact Form with new label and optional fields (P-CT-02), updated contact emails and phone removal (P-CT-03), FAQ to dropdown (P-CT-04), new FAQ copy integration (P-CT-05), service multi-select with Google Booking links (P-CT-05 🟡).
    *   Portfolio Project Page (`app/portfolio/[slug]/page.tsx`): Removal of metrics bar and "Project at a Glance" (P-PP-01), optional tabs (P-PP-02), video hero with modal flow (P-PP-02 🟡).
*   **Shared Components (within `components/`):**
    *   Call to Action (CTA) component: Copy updates (CP-01), purge newsletter variant (C-01), condense/min-height tweak (C-04 🟡).
*   **Accessibility & UX:**
    *   Overlay contrast for hero text (UX-01).

## 3. Data Models
Based on the `MoonsOut-Phase1-TaskTree`:

### 3.1 Video Data (New Requirement from G-01)
Levi requires a spreadsheet for video assets. This implies a need to structure video data that includes:
*   Project association (linking videos to specific projects).
*   Hero location flags (to identify videos for specific page heroes).
*   For the `/projects` page: an ordered list of videos with corresponding subtitle text.
*   Standard video metadata: URL/source, poster image, title, description (if any).

```typescript
// Example structure for video data (conceptual)
export interface VideoAsset {
  id: string;
  title?: string;
  src: string;
  poster: string;
  associatedProjectId?: string; // Links to a project
  isHeroForPage?: 'home' | 'services' | 'about' | 'portfolio_project'; // Specific page hero
  heroSubtitle?: string; // For changing subtitles on Projects page hero
  order?: number; // For sequenced videos
}
```

### 3.2 Services Data (Refinement for P-H-02, P-P-03)
The existing `Service` interface might need to ensure it robustly supports filtering for "Moons Out Media" and "Moons Out Labs" branches, and that services can be dynamically pulled for display (e.g., on Home page and for Projects filter tabs).

```typescript
// Located in e.g., types/services.ts (ensure branch property is robust)
export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  icon?: string;
  slug: string;
  branch: 'media' | 'labs'; // Crucial for P-P-03 filtering
  // Add other relevant fields if services are directly displayed on Home (P-H-02)
}
```

### 3.3 Project Data (Portfolio - Refinement for P-PP-02, P-P-06 🟡)
*   **Optional Tabs (P-PP-02):** The `tabs` field within the `Project` interface needs to allow for individual tabs (like `overview`, `videos`, `results`) to be optional or conditionally rendered if no content exists for them.
*   **External Case Studies (P-P-06 🟡):** A structure for these will be needed, potentially simpler than full projects. Task P-P-06 specifies: Header, Sub-Header (disclaimer), Sub-Heading for each brand/creator, Case Study Cards (based on Project Cards).

```typescript
// Located in e.g., types/projects.ts
// ... (Stat, Testimonial interfaces as before)
export interface Project {
  // ... (id, title, slug, branch, servicesProvided, projectTags, heroImage, posterUrl, trailerUrl as before)
  tabs?: { // Make the entire tabs object optional, or individual tabs optional
    overview?: string; // Or structured content
    videos?: { /* video data if applicable */ };
    results?: {
      summaryParagraph: string;
      statistics?: Stat[];
      testimonial?: Testimonial;
    };
  };
  isExternal?: boolean; // Flag for external case studies
  externalCreator?: string; // For P-P-06 sub-heading
}

// Simplified structure for External Case Study display if not using full Project type
export interface ExternalCaseStudy {
    id: string;
    title: string;
    link: string;
    imageUrl: string;
    creator: string;
    briefDescription: string;
}
```

## 4. Implementation Plan
This plan follows the `MoonsOut-Phase1-TaskTree` structure, addressing Critical (🔴) tasks first within each group, then Important (🟡) tasks. The overall flow is Foundation → Copy/Content → Global Components → Pages → UX/A11y → QA.

### I. Critical Tasks (🔴 "Ready to share")

**A. Foundation (G_Foundation)**
1.  **Video Spreadsheet Prep (G-01):** Compile and send the spreadsheet for video assets to Levi, including project details, hero locations, and ordered video lists with subtitles for the Projects page.
2.  **Favicon Creation (G-02):** Design/Create the necessary favicon image assets.
3.  **Favicon & Manifest Integration (G-03):** Add the new favicon set and update `manifest.webmanifest`.
4.  **Metrics Bar Removal (G-04):** Remove the global metrics bar component/feature from the site.
5.  **100vh Heroes (G-05):** Ensure all designated hero sections consistently fill `100vh`.

**B. Copy/Content (CP_CopyContent - Initial Pass)**
1.  **CTA Copy Updates (CP-01):** Implement specified copy changes for the main Call to Action component:
    *   Headline: "Convert Viewers to Customers"
    *   Sub-line: "Engaging Content + Cutting-Edge Tech = More Conversions"
    *   Button Label: "Book Now"

**C. Global Components (C_GlobalComponents - Initial Pass)**
1.  **Purge Newsletter CTA (C-01):** Delete the obsolete newsletter-variant Call to Action component and its references.

**D. Pages (P_Pages - Critical Structure & Content)**

    **D.1. Home (H_Home)**
    1.  **Move "Why Choose Us" (P-H-01):** Relocate the "Why Choose Us" block to be above the Services grid. Implement a horizontal layout for this block.
    2.  **Update Services Display (P-H-02):** Ensure services listed on the Home page are pulled from the central services data source.

    **D.2. Copy/Content (CP_CopyContent - Home Page Specific)**
    1.  **Revise "Why Choose Us" Copy (CP-02):** Update the copy for the "Why Choose Us" section to highlight roles as Marine Vets and Gen Z Digital Natives.

    **D.3. Projects (P_Projects - formerly Stories)**
    1.  **Rename Route/Nav (P-P-01):** Change routing and navigation links from `/stories` to `/projects`.
    2.  **Featured Project & Mobile Clipping (P-P-02):** Implement logic for the featured project (auto-select first portfolio item) and fix any image clipping issues on mobile (<1022px).
    3.  **New Filter Tabs (P-P-03):** Implement filter tabs: "All Projects", "Moons Out Media" (with services sub-filter from data), "Moons Out Labs" (with services sub-filter from data).
    4.  **Search-Bar UX Logic (P-P-04):** Implement specified search bar behavior: slide-down on type, sticky when active and scrolling down, no action on click alone.

    **D.4. About (P_About)**
    1.  **Remove "Our Story" Tab (P-A-01):** Delete this tab from the About page structure.
    2.  **Full-Viewport Hero & Buttons (P-A-02):** Update About page hero to be full-viewport (`100vh`) and include three anchor buttons linking to the three main tabs/sections of the page.
    3.  **Delete "Risk-Taking" Value (P-A-03):** Remove "Risk-Taking" from the "Core Values" tab/section.
    4.  **Remove Bottom CTA (P-A-04):** Delete the Call to Action component instance at the bottom of the About page.

    **D.5. Copy/Content (CP_CopyContent - Services Page Specific)**
    1.  **Services Page Copy Updates (CP-03):**
        *   Change button "View Case Studies" in "Our Services" section to "View Projects".
        *   Update typewriter effect text to: "Measurable Growth", "Higher Conversions", "Scalable Tech".

    **D.6. Services (S_Services)**
    1.  **Remove "Our Process" (P-S-01):** Delete this section (moved to About page in previous spec, now task A-02 implies static Our Process component on About, this confirms removal from Services).
    2.  **Remove Quiz & TYBS (P-S-02):** Delete the quiz and the "Transform Your Brand Story" section entirely.
    3.  **Center "View Projects" Button (P-S-03):** Adjust layout to center this button beneath the services grid.

    **D.7. Contact (C_Contact - Critical Structure & Form)**
    1.  **Strip Page Content (P-CT-01):** Simplify the Contact page to include only the Form, Contact Details, and FAQ. Remove Hero, CTA, Guided Process, specific Section Header, and "Why Choose Us".
    2.  **Revise Quick Contact Form (P-CT-02):** Update form header to "Ready to Book?". Add optional fields for "Phone Number" and "How did you find us?".
    3.  **Update Contact Information (P-CT-03):** Change email addresses to `Brandon@moonsoutmedia.com` for Media and `Levi@moonsoutmedia.com` for Labs. Remove the phone number from display in this section.
    4.  **Make FAQs Dropdown (P-CT-04):** Convert the FAQ section to use a dropdown/accordion style for questions and answers.

    **D.8. Portfolio Project (P_PortfolioProject - Critical Removals)**
    1.  **Remove Sections (P-PP-01):** Delete the "Metrics Bar" and "Project at a Glance" sections from the Portfolio Project page.
    2.  **Make Tabs Optional (P-PP-02):** Modify data structure and rendering logic so that project tabs (Overview, Videos, Results etc.) are optional and only render if content exists for them.

**E. Copy/Content (CP_CopyContent - FAQ)**
1.  **Write FAQ Pain-Point Copy (CP-04):** Develop new FAQ content focusing on typical client pain points in simple language, taking inspiration from `2gether creative`.

**F. Pages (P_Pages - Contact FAQ Integration)**
    **F.1. Contact (C_Contact)**
    1.  **Integrate New FAQ Copy (P-CT-05):** Populate the FAQ dropdowns with the newly written copy from CP-04.

**G. Copy/Content (CP_CopyContent - Final Sign-off)**
1.  **Final Copy Sign-off (CP-05):** Review and approve all new and revised copy implemented in this phase.

**H. UX/Accessibility (UX_UX/A11y - Critical)**
1.  **Ensure Overlay Contrast (UX-01):** Verify all hero sections (and other areas with text on images/video) use overlays or text styling to achieve ≥ 4.5:1 contrast ratio.
2.  **Axe & Lighthouse Sweep (UX-02):** Perform an initial accessibility and performance sweep; fix critical violations reported.

**I. Quality Assurance (QA - Critical)**
1.  **Confirm /projects Routing & Anchors (QA-01):** Test the new `/projects` routing thoroughly. Verify all anchor links across the site, especially those affected by hero changes or new page structures (e.g., About page hero buttons), are working correctly.

### II. Important Tasks (🟡 "Polished")

**J. Foundation (G_Foundation - Polishing)**
1.  **Global Smooth-Scroll & Anchor Audit (G-06):** Implement global `scroll-behavior: smooth`. Conduct a comprehensive audit of all anchor links to ensure they are functioning correctly and scroll to the precise intended locations.

**K. Global Components (C_GlobalComponents - Polishing)**
1.  **Header Mobile Padding Tweak (C-02):** Fine-tune horizontal padding in the `Header` component for optimal mobile display.
2.  **Remove Footer Whitespace (C-03):** Address and remove any remaining extra whitespace below the footer, particularly on the Home page.
3.  **Condense CTA Component (C-04):** Adjust the main CTA component for better visual condensation, possibly tweaking `min-height` or internal spacing, while preserving the shimmer effect and new copy.

**L. Pages (P_Pages - Polishing & Enhancements)**

    **L.1. Projects (P_Projects)**
    1.  **Simplify Project Cards (P-P-05):** Revise the design of project cards for a simpler, cleaner look.
    2.  **External Case Studies Section (P-P-06):** Add a new section titled "Interesting External Case Studies". Include the sub-header disclaimer: "* This is not our work but is representative of our friends in the community." Display external case studies using cards (based on simplified project cards) with sub-headings for each brand/creator.

    **L.2. About (P_About)**
    1.  **Add Emma Profile (P-A-05):** Integrate Emma's profile content (headshot and bio) into the relevant section/tab.

    **L.3. Services (S_Services)**
    1.  **Add Video Hero (P-S-04):** Implement a video background for the Services page hero section (looping, muted, with poster). Ensure it adheres to `100vh` and contrast requirements.
    2.  **Fix Mobile Arrow Button Borders (P-S-05):** Resolve the issue of persistent colored borders on mobile arrow buttons in the Services page (and Portfolio filter galleries if the component is shared and issue exists there too).

    **L.4. Contact (C_Contact)**
    1.  **Service Multi-Select & Google Booking (P-CT-05):** Implement the service multi-select dropdown with options: "Both", "Moons Out Media", "Moons Out Labs". Dynamically inject/update Google Booking links based on the selection.

    **L.5. Portfolio Project (P_PortfolioProject)**
    1.  **Video Hero + Modal Flow (P-PP-02 🟡 part):** Implement the background video hero. On click, an icon appears. Clicking icon scrolls to tabs, switches to "Videos" tab, and expands video into a closable modal.

**M. Quality Assurance (QA - Polishing)**
1.  **Full Regression & Device Sweep (QA-02):** Conduct a thorough regression test of all site features and perform cross-browser/cross-device testing.
2.  **Verify Google-Booking Link (QA-03):** Specifically test the dynamic injection and functionality of Google Booking links on the Contact page.
3.  **Tag Release Candidate & Changelog (QA-04):** Prepare for release by tagging a release candidate and compiling a changelog of all Phase 1 updates.

**N. PMVP (Post MVP Considerations for Future)**
*   **(PMVP-01)** Levi/Brandon - Add Our Story Video to the About Page.
*   **(PMVP-02)** UX - Neon Typography changes.

## 5. Technical Requirements
*   Next.js 14 App Router conventions must be strictly followed.
*   React Server Components (RSC) should be default; "use client" boundaries minimized and clearly justified.
*   TypeScript for all new and modified code, with strict type checking.
*   Tailwind CSS for all styling, adhering to existing design system/tokens.
*   Shadcn UI, Radix UI, Tailwind Aria components should be used where appropriate.
*   Zod for any new data validation schemas.
*   All code must adhere to the established `coding-pattern-preferences.mdc`.
*   Image optimization practices (WebP, size attributes, lazy loading where appropriate).
*   **Hero Standards:** All hero sections must achieve `100vh` height and ensure text has a contrast ratio of at least 4.5:1 (WCAG AA) against backgrounds.
*   Ensure all interactive elements are keyboard accessible and have clear focus states.
*   Video assets to be managed as per spreadsheet (G-01) and optimized for web delivery.

## 6. Migration Strategy
N/A. These changes are refactoring and enhancements to the existing codebase.

## 7. Success Criteria
*   All "🔴 Critical" tasks from the `MoonsOut-Phase1-TaskTree` are verifiably resolved and deployed.
*   All "🟡 Important" tasks are completed and integrated, or a clear plan for their near-term completion exists.
*   Video data is managed via the new spreadsheet system, and videos display correctly in specified locations.
*   Favicon and manifest are correctly implemented.
*   Global metrics bar is removed.
*   Hero sections are consistently 100vh and meet contrast requirements (UX-01).
*   CTA copy and component structure are updated as specified (CP-01, C-01, C-04 🟡).
*   Home Page: "Why Choose Us" moved and copy revised; Services list updated (P-H-01, P-H-02, CP-02).
*   Projects Page: Renamed to `/projects`; featured project, mobile clipping, filters, and search bar logic implemented (P-P-01 to P-P-04). Simplified cards and External Case Studies section added (P-P-05 🟡, P-P-06 🟡).
*   About Page: "Our Story" tab removed; hero updated with 3 anchor buttons; "Risk-Taking" value deleted; bottom CTA removed (P-A-01 to P-A-04). Emma's profile added (P-A-05 🟡).
*   Services Page: "Our Process", quiz, and "Transform Your Brand Story" removed; "View Projects" button centered; typewriter text and button copy updated (P-S-01 to P-S-03, CP-03). Video hero and mobile arrow fix implemented (P-S-04 🟡, P-S-05 🟡).
*   Contact Page: Stripped to Form + Details + FAQ; form revised with new label and optional fields; contact info updated; FAQs are dropdowns with new pain-point copy (P-CT-01 to P-CT-04, CP-04, P-CT-05). Service multi-select with Google Booking links functional (P-CT-05 🟡).
*   Portfolio Project Page: Metrics bar and "Project at a Glance" removed; tabs are optional (P-PP-01, P-PP-02). Video hero + modal flow implemented (P-PP-02 🟡).
*   Accessibility (Axe & Lighthouse) sweep passed with no critical violations (UX-02).
*   Successful QA passes for critical and important features (QA-01 to QA-04).

## 8. Implementation Checklist (Derived from MoonsOut-Phase1-TaskTree)

**Phase 1.A: Critical Tasks (🔴 "Ready to share")**

**G_Foundation (total ≈ 4.5h)**
- [ ] **G-01** 🔴 Send spreadsheet for Videos to Levi (1h)
  - [ ] Should include:
    - [ ] Project Details (Will expand from codebase when starting task)
    - [ ] Hero Locations (If you want it to be displayed in a specific page hero)
      - [ ] For the "Projects" Page, you'll need to include a number of videos ordered, with the changing subtitle text
- [ ] **G-02** 🔴 Create Favicon (1h)
- [ ] **G-03** 🔴 Add favicon & manifest icons (0.3h)
- [ ] **G-04** 🔴 Remove the metrics bar (0.1h)
- [ ] **G-05** 🔴 100vh heroes (2h)

**CP_CopyContent (total ≈ 0.1h)**
- [ ] **CP-01** 🔴 CTA Copy Updates (0.1h)
  - [ ] Ready to Tell Your Story? -> Convert Viewers to Customers
  - [ ] Let's create authentic story telling content... -> Engaging Content + Cutting-Edge Tech = More Conversions
  - [ ] Button -> Book Now

**C_GlobalComponents (total ≈ 0.1h)**
- [ ] **C-01** 🔴 Purge newsletter CTA component (0.1h)

**P_Pages (Home - total ≈ 0.8h)**
- **H_Home**
  - [ ] **P-H-01** 🔴 Move "Why Choose Us" block (0.5h)
    - [ ] Horizontal Layout
  - [ ] **P-H-02** 🔴 Update Services - Pulled from data (0.3h)

**CP_CopyContent (Home Specific - total ≈ 0.6h)**
- [ ] **CP-02** 🔴 Revise the copy for 'Why Choose Us" on the Home Page (0.6h)
  - [ ] Sell it as we're Marine Vets
  - [ ] And We're Gen Z Digital Natives

**P_Pages (Projects, About - total ≈ 3.5h)**
- **Projects**
  - [ ] **P-P-01** 🔴 Rename route/nav to /projects (0.5h)
  - [ ] **P-P-02** 🔴 Featured project + mobile clipping fix (1h)
  - [ ] **P-P-03** 🔴 New filter tabs (1h)
    - [ ] All Projects
    - [ ] Moons Out Media
      - [ ] Services - pulled from data
    - [ ] Moons Out Labs
      - [ ] Services - pulled from data
  - [ ] **P-P-04** 🔴 Search-bar UX logic (0.3h)
- **About**
  - [ ] **P-A-01** 🔴 Remove "Our Story" tab (0.1h)
  - [ ] **P-A-02** 🔴 Full-viewport hero + 3 buttons (0.3h)
    - [ ] 3 Buttons = 3 Tabs -> Links to tab
  - [ ] **P-A-03** 🔴 Delete "Risk-Taking" keyword from the "Core Values" tab (0.2h)
  - [ ] **P-A-04** 🔴 Remove bottom CTA (0.1h)

**CP_CopyContent (Services Specific - total ≈ 0.1h)**
- [ ] **CP-03** 🔴 Services Page Copy (0.1h)
  - [ ] Change button "View Case Studies" in "Our Services" section to "View Projects"
  - [ ] Change the changing text (typewriter effect) to:
    - [ ] Measurable Growth
    - [ ] Higher Conversions
    - [ ] Scalable Tech

**P_Pages (Services, Contact, PortfolioProject - total ≈ 2.8h)**
- **S_Services**
  - [ ] **P-S-01** 🔴 Remove "Our Process" (0.1h)
  - [ ] **P-S-02** 🔴 Remove quiz + "Transform your brand story" - section (0.1h)
  - [ ] **P-S-03** 🔴 Center "View Projects" button (0.1h)
- **C_Contact**
  - [ ] **P-CT-01** 🔴 Strip to Form + Details + FAQ (0.5h)
    - [ ] Remove:
      - [ ] Hero
      - [ ] Call to Action
      - [ ] Guided Process
      - [ ] Section Header (Header, Description box, Buttons)
      - [ ] Why Choose Us
  - [ ] **P-CT-02** 🔴 Revise Quick Contact Form (0.5h)
    - [ ] Header: Revise to "Ready to Book"
    - [ ] Add Optional Fields: Phone Number, How did you find us?
  - [ ] **P-CT-03** 🔴 Update Contact Information (0.2h)
    - [ ] Media -> Brandon@moonsoutmedia.com
    - [ ] Labs -> Levi@moonsoutmedia.com
    - [ ] Remove Phone Number
  - [ ] **P-CT-04** 🔴 Make FAQs DropDown (0.1h)
- **PortfolioProject**
  - [ ] **P-PP-01** 🔴 Remove: Metrics Bar, Project at a Glance (0.1h)
  - [ ] **P-PP-02** 🔴 Make tabs optional (1h) *(Note: Video hero part is 🟡)*

**CP_CopyContent (FAQ - total ≈ 1h)**
- [ ] **CP-04** 🔴 Write FAQ pain-point copy (1h)
  - [ ] Revise to represent typical client pain points in simple language. Take inspiration from 2gether creative.

**P_Pages (Contact FAQ integration - total ≈ 0.1h)**
- **C_Contact**
  - [ ] **P-CT-05** 🔴 Integrate new FAQ copy (0.1h) *(Note: P-CT-05 in tree is this task. The later P-CT-05 🟡 is for service multi-select)*

**CP_CopyContent (Final Sign-off - total ≈ 0.1h)**
- [ ] **CP-05** 🔴 Final copy sign-off (0.1h)

**UX_ UX/A11y (total ≈ 0.6h)**
- [ ] **UX-01** 🔴 Ensure overlay contrast (0.1h)
- [ ] **UX-02** 🔴 Axe & Lighthouse sweep + fixes (0.5h)

**QA (total ≈ 0.3h)**
- [ ] **QA-01** 🔴 Confirm /projects routing & anchors (0.3h)

**--- End of Critical Tasks (🔴 Ready to share | Total: 14.6 hours) ---**

**Phase 1.B: Important Tasks (🟡 "Polished")**

**G_Foundation (total ≈ 1h)**
- [ ] **G-06** 🟡 Global smooth-scroll + anchor audit (1h)

**C_GlobalComponents (total ≈ 0.4h)**
- [ ] **C-02** 🟡 Header mobile padding tweak (0.1h)
- [ ] **C-03** 🟡 Remove footer whitespace (0.1h)
- [ ] **C-04** 🟡 Condense CTA Component (0.3h)

**P_Pages (total ≈ 6h)**
- **Projects**
  - [ ] **P-P-05** 🟡 Simplify the project cards (0.3h)
  - [ ] **P-P-06** 🟡 External Case-Studies section (2h)
    - [ ] Header: "Interesting External Case Studies"
    - [ ] Sub-Header: "* This is not our work but is representative of our friends in the community."
    - [ ] Sub-Heading for each brand or creator
    - [ ] Case Study Cards (Based on Project Cards)
- **About**
  - [ ] **P-A-05** 🟡 Add Emma profile (0.3h)
- **S_Services**
  - [ ] **P-S-04** 🟡 Add a video to the hero (0.3h)
  - [ ] **P-S-05** 🟡 Remove persistent colored borders on mobile arrow buttons (0.1h) (in both the Services and Portfolio filter galleries)
- **C_Contact**
  - [ ] **P-CT-05** 🟡 Service multi-select + Google booking links (2h)
    - [ ] Dropdown will include: Both, Moons Out Media, Moons Out Labs
- **PortfolioProject**
  - [ ] **P-PP-02** 🟡 Video hero + modal scroll/tab flow (1h) *(Note: This is the video part of P-PP-02)*

**QA (total ≈ 1.3h)**
- [ ] **QA-02** 🟡 Full regression & device sweep (1h)
- [ ] **QA-03** 🟡 Verify Google-booking link injection (0.1h)
- [ ] **QA-04** 🟡 Tag Release Candidate & changelog (0.2h)

**PMVP_Make PMVP Feature Github Issues & CRM Tasks (total ≈ 0.2h)**
- [ ] **PMVP-01** 🟡 Levi/Brandon - Add Our Story Video to the About Page (0.1h)
- [ ] **PMVP-02** 🟡 UX - Neon Typography changes (0.1h)

**--- End of Important Tasks (🟡 Polished | Total: 7.9 hours) ---**

--- 
*This specification (v3) is aligned with the MoonsOut-Phase1-TaskTree and supersedes v2.* 