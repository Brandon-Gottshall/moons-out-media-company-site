# Case Studies Feature Specification

## 1. Overview
This document outlines the specification for the "Case Studies" feature on the Moons Out Media Company website. Case studies will be implemented as enhanced "Portfolio Items" and managed via Payload CMS. They will showcase the company's work, expertise, and the value delivered to clients.

## 2. Data Model (Payload CMS: `portfolio-items` Collection)
The existing `Portfolio Items` collection in Payload CMS will be utilized and enhanced to store case study data. The following fields are required:

*   **`title`**: `text` (Required)
    *   Example: "Revitalizing EcoTech's Brand with Documentary Storytelling"
    *   *Corresponds to existing `Title` in Payload spec.*
*   **`slug`**: `text` (Required, Unique, Index)
    *   Generated from title, editable by admin.
    *   Example: `ecotech-documentary-storytelling`
    *   *Corresponds to existing `Slug` in Payload spec.*
*   **`clientName`**: `text` (Required)
    *   Example: "EcoTech Innovations"
    *   *Corresponds to existing `Client` in Payload spec.*
*   **`industry`**: `text` (Optional)
    *   Example: "Sustainable Technology", "Health & Wellness"
*   **`projectYear`**: `text` or `number` (Optional)
    *   Example: "2023" or 2023
*   **`status`**: `select` (Required, default: 'draft')
    *   Options: `draft`, `published`, `archived`
*   **`publishedDate`**: `date` (Optional, auto-set on first publish)
*   **`heroImage`**: `upload` (Required, Relationship to `media` collection)
    *   Primary visual for the case study. Alt text should be configurable.
    *   *Enhances existing `Images/media` which might be an array.*
*   **`summary`**: `textarea` (Required)
    *   A brief overview (1-2 sentences) for listings and SEO.
    *   Example: "Discover how our documentary approach amplified EcoTech's message, resulting in a 42% increase in brand awareness."
*   **`challenge`**: `richText` (Required)
    *   Detailed description of the client's problem, goals, or the situation before Moons Out Media's involvement.
*   **`solution`**: `richText` (Required)
    *   Detailed description of the strategies, creative process, and work delivered by Moons Out Media.
*   **`servicesRendered`**: `relationship` (Required, Many-to-many relationship to the `services` collection)
    *   Links to one or more defined services offered by the company.
    *   *Replaces/formalizes `Services used` from original Payload spec.*
*   **`keyFeatures`**: `array` (Optional)
    *   Fields:
        *   `featureTitle`: `text`
        *   `featureDescription`: `textarea`
        *   `featureIcon`: `text` (Optional, e.g., Lucide icon name or SVG string)
    *   Allows highlighting specific aspects of the solution or project.
*   **`results`**: `richText` (Required)
    *   Narrative description of the outcomes, impact, and value delivered.
    *   *Enhances `Results/metrics` from original Payload spec.*
*   **`metrics`**: `array` (Optional)
    *   Fields:
        *   `metricLabel`: `text` (e.g., "Audience Engagement", "Conversion Rate")
        *   `metricValue`: `text` (e.g., "+50%", "3.2x ROI")
        *   `metricChange`: `text` (Optional, e.g., "+20% vs. Benchmark", "Previously 1.5x")
        *   `metricDescription`: `textarea` (Optional, for context)
    *   *Standardizes `Results/metrics` from original Payload spec.*
*   **`testimonial`**: `group` (Optional)
    *   Fields:
        *   `quote`: `textarea` (Required if group is used)
        *   `authorName`: `text` (Required if group is used)
        *   `authorTitle`: `text` (Optional)
        *   `authorImage`: `upload` (Optional, Relationship to `media` collection)
    *   *Enhances `Testimonial` from original Payload spec.*
*   **`galleryImages`**: `array` (Optional)
    *   Fields:
        *   `image`: `upload` (Relationship to `media` collection)
        *   `caption`: `text` (Optional)
    *   For additional project visuals.
    *   *Enhances `Images/media` from original Payload spec.*
*   **`tags`**: `relationship` (Optional, Many-to-many relationship to a new `tags` collection or `select` field with predefined options)
    *   For categorization and filtering (e.g., "Documentary", "Brand Strategy", "Web Development", "Social Media Campaign").
*   **`callToAction`**: `group` (Optional)
    *   Fields:
        *   `ctaLabel`: `text` (e.g., "View Live Project", "Download Full Report")
        *   `ctaUrl`: `text`
        *   `ctaType`: `select` (Options: `internal`, `external`)
        *   `ctaVariant`: `select` (Optional, e.g., `primary`, `secondary` for styling)

## 3. URL Structure
*   **Canonical URL for individual case studies:** `/portfolio/[slug]`
    *   Example: `/portfolio/ecotech-documentary-storytelling`
*   **Listing Page URL:** `/portfolio` (This page will list all published portfolio items/case studies)

## 4. Page Structure & Components

### 4.1. Individual Case Study Page (`app/portfolio/[slug]/page.tsx`)
*   Displays the full content of a single case study.
*   Leverages a main component like `PortfolioItemDetail.tsx`.
*   **Layout:**
    *   Hero section with `heroImage` and `title`, `clientName`, `projectYear`, `industry`.
    *   `summary` section.
    *   `servicesRendered` (displayed as linked tags or pills).
    *   Tabbed or sectioned layout for:
        *   `challenge`
        *   `solution` (potentially including `keyFeatures` within)
        *   `results` (including `metrics` display)
    *   `testimonial` section (if available).
    *   `galleryImages` section (if available).
    *   `callToAction` button (if available).
    *   Navigation to other/related case studies.

### 4.2. Case Study Listing Page (`app/portfolio/page.tsx`)
*   Displays a filterable and paginated list of all published case studies.
*   Uses a `PortfolioItemCard.tsx` component for each item.
*   **Features:**
    *   Filtering by `tags`/`categories` and potentially `servicesRendered`.
    *   Search functionality (future enhancement).
    *   Pagination.

### 4.3. Components
*   **`PortfolioItemCard.tsx`** (`components/portfolio/portfolio-item-card.tsx`):
    *   Displays `heroImage` (thumbnail), `title`, `clientName`, `summary`, and `tags`.
    *   Links to the individual case study page.
*   **`PortfolioItemDetail.tsx`** (`components/portfolio/portfolio-item-detail.tsx`):
    *   The main component rendering the structure of an individual case study page.
    *   Takes the full case study data object as a prop.

## 5. Placeholder Content Strategy for Examples
For initial setup and development, example case studies will be created using placeholder content.
*   **Quantity:** Approximately 15-20 unique case studies based on slugs identified from existing components.
*   **Content:**
    *   **Titles:** Meaningful titles combining client/theme with a benefit.
    *   **Text Fields (`summary`, `challenge`, `solution`, `results`):** Use 2-3 paragraphs of relevant "Lorem Ipsum" or themed placeholder text.
    *   **Images (`heroImage`, `galleryImages`):** Use placeholder images (e.g., `https://via.placeholder.com/1200x600`, `https://via.placeholder.com/800x600`) with appropriate alt text.
    *   **Services Rendered:** Link to 1-2 relevant services.
    *   **Metrics:** Fabricate 2-3 simple metrics (e.g., "Engagement: +50%", "Leads: +30%").
    *   **Testimonials:** Short, generic quotes.
*   **Data Source:** Initially, this data will reside in a local file (e.g., `lib/placeholder-data/portfolio-items.ts`) and will be migrated to Payload CMS once the collection is fully configured.

## 6. List of Example Case Studies (Initial Set - Slugs for `/portfolio/[slug]`)
This list is derived from slugs found in `StoryMatchmaker`, `ServiceShowcase`, `PortfolioGallery`, `PainToGain`, and `ClientSuccessTimeline`. Duplicates and thematic overlaps will be rationalized into distinct portfolio items.

1.  `documentary-storytelling` (General service case study)
2.  `conversion-campaigns`
3.  `social-media-strategy` (Refined from "social-media-storytelling" & "social-media")
4.  `custom-web-applications` (Refined from "web-applications" & "web-app-development")
5.  `ai-driven-automation` (Refined from "ai-automation")
6.  `enterprise-cloud-devops` (Refined from "cloud-devops")
7.  `ecotech-innovations-documentary` (Specific project for EcoTech, combines themes)
8.  `urban-fitness-transformation` (Specific project for Urban Fitness)
9.  `artisan-collective-showcase` (Specific project for Artisan Collective)
10. `techstart-growth-engine` (Specific project for TechStart Inc.)
11. `global-brands-market-expansion`
12. `city-tourism-local-discoveries`
13. `authentic-brand-narrative-revamp` (From PainToGain context)
14. `emotional-connection-campaign` (From PainToGain context)
15. `data-driven-creative-roi` (From PainToGain context)
16. `audience-centric-engagement` (From PainToGain context)

*(Note: Slugs are illustrative and may be further refined for clarity and SEO.)*

## 7. Implementation Checklist
- [ ] **Phase 1: Setup & Configuration (Payload CMS)**
  - [ ] Update `payload-cms-integration-specification.md` with the detailed `Portfolio Items` data model.
  - [ ] Implement/update the `Portfolio Items` collection in Payload CMS according to the specification.
  - [ ] Configure relationships (to `services`, `media`, `tags`).
  - [ ] Create a `tags` collection if using a relationship for tags.
- [ ] **Phase 2: Placeholder Data & Basic Structure (Next.js)**
  - [ ] Create `lib/placeholder-data/portfolio-items.ts` with example data for 5-10 case studies.
  - [ ] Create `app/portfolio/page.tsx` for listing items.
  - [ ] Create `app/portfolio/[slug]/page.tsx` for individual item display.
  - [ ] Create basic `PortfolioItemCard.tsx` and `PortfolioItemDetail.tsx` components.
  - [ ] Link placeholder data to these pages/components.
- [ ] **Phase 3: Styling & Component Refinement**
  - [ ] Style `PortfolioItemCard.tsx` using Tailwind CSS and Shadcn UI.
  - [ ] Style `PortfolioItemDetail.tsx` layout and content sections.
  - [ ] Implement responsive design for all new components and pages.
- [ ] **Phase 4: Data Integration (Next.js & Payload CMS)**
  - [ ] Develop data fetching logic in Next.js to pull `Portfolio Items` from Payload CMS.
  - [ ] Replace placeholder data usage with live data from Payload.
  - [ ] Implement dynamic route generation for `/portfolio/[slug]`.
- [ ] **Phase 5: Link Updates & Testing**
  - [ ] Update `caseStudyLink` props in all relevant components (`StoryMatchmaker`, `ServiceShowcase`, `PainToGain`, `ClientSuccessTimeline`) to point to `/portfolio/[slug]`.
  - [ ] Thoroughly test case study display, listing, filtering (if basic filters implemented).
  - [ ] Test navigation from all components linking to case studies.
- [ ] **Phase 6: Content Population (Payload CMS)**
  - [ ] Populate Payload CMS with the full set of example case studies.
  - [ ] Replace all placeholder text and images with meaningful example content.
- [ ] **Phase 7: Advanced Features (Optional/Future)**
  - [ ] Implement advanced filtering and search on `/portfolio`.
  - [ ] Add "Related Case Studies" section to individual pages.
  - [ ] SEO optimization for case study pages.

## 8. Open Questions / Future Considerations
*   Detailed design/wireframes for card and detail page layouts.
*   Specific "tags" or "categories" to be used for filtering.
*   Image dimension guidelines for `heroImage` and `galleryImages`. 