# Payload CMS Integration Specification

## 1. Overview
This specification outlines the integration of Payload CMS with the existing Next.js 15.2.4 application to create a headless content management system for the Moons Out Media Company website.

## 2. Architecture
- **Headless CMS**: Payload CMS as the backend content management system
- **Frontend**: Next.js 15.2.4 with App Router to consume Payload API
- **Authentication**: Payload's built-in authentication for admin access
- **Database**: MongoDB for data persistence
- **Deployment**: Self-hosted Payload instance alongside Next.js

## 3. Content Models

### 3.1 Core Collections
1. **Pages**
   - Home
   - About Us
   - Services
   - Portfolio
   - Contact

2. **Services**
   - Title
   - Slug
   - Description
   - Features
   - Pricing
   - Related services
   - Featured image

3. **Portfolio Items (also serves as Case Studies)**
   - **`title`**: `text` (Required)
     - *Example: "Revitalizing EcoTech's Brand with Documentary Storytelling"*
   - **`slug`**: `text` (Required, Unique, Index)
     - *Generated from title, editable. Example: `ecotech-documentary-storytelling`*
   - **`clientName`**: `text` (Required)
     - *Example: "EcoTech Innovations"*
   - **`industry`**: `text` (Optional)
     - *Example: "Sustainable Technology"*
   - **`projectYear`**: `text` or `number` (Optional)
     - *Example: "2023"*
   - **`status`**: `select` (Required, default: 'draft'; Options: `draft`, `published`, `archived`)
   - **`publishedDate`**: `date` (Optional, auto-set on first publish)
   - **`heroImage`**: `upload` (Required, Relationship to `media` collection, with alt text)
   - **`summary`**: `textarea` (Required, 1-2 sentences for listings/SEO)
   - **`challenge`**: `richText` (Required, Detailed description of client's problem/goals)
   - **`solution`**: `richText` (Required, Detailed description of strategies/work delivered)
   - **`servicesRendered`**: `relationship` (Required, Many-to-many to `services` collection)
   - **`keyFeatures`**: `array` (Optional)
     - Fields: `featureTitle` (text), `featureDescription` (textarea), `featureIcon` (text, optional)
   - **`results`**: `richText` (Required, Narrative of outcomes/impact)
   - **`metrics`**: `array` (Optional)
     - Fields: `metricLabel` (text), `metricValue` (text), `metricChange` (text, optional), `metricDescription` (textarea, optional)
   - **`testimonial`**: `group` (Optional)
     - Fields: `quote` (textarea), `authorName` (text), `authorTitle` (text, optional), `authorImage` (upload, optional)
   - **`galleryImages`**: `array` (Optional)
     - Fields: `image` (upload), `caption` (text, optional)
   - **`tags`**: `relationship` (Optional, Many-to-many to `tags` collection or `select` field)
   - **`callToAction`**: `group` (Optional)
     - Fields: `ctaLabel` (text), `ctaUrl` (text), `ctaType` (select: `internal`, `external`), `ctaVariant` (select, optional)
   - *Note: This collection serves as the primary source for "Case Studies". Rich text fields should be used for detailed narratives.*

4. **Team Members**
   - Name
   - Position
   - Bio
   - Image
   - Social links

5. **Media Assets**
   - Images
   - Videos
   - Documents

6. **Tags** (New Collection or Global Varies - for Portfolio Items/Case Studies)
    - `name`: `text` (Required, Unique)
    - `slug`: `text` (Required, Unique, Index)

### 3.2 Global Elements
1. **Site Settings**
   - Company info
   - Contact details
   - Social media links
   - SEO defaults

2. **Navigation**
   - Primary menu
   - Footer menu
   - Secondary links

## 4. Implementation Plan

### 4.1 Initial Setup
1. Install Payload CMS and dependencies
2. Configure MongoDB connection
3. Set up environment variables
4. Create Payload config

### 4.2 Collection Development
1. Define collection schemas (Pages, Services, **Portfolio Items (updated)**, Team Members, Media Assets, **Tags**)
2. Configure access control
3. Create relationship fields (especially for Portfolio Items to Services and Tags)
4. Set up media handling

### 4.3 Next.js Integration
1. Create API routes for Payload
2. Implement data fetching in page components
3. Set up preview functionality
4. Implement authentication

### 4.4 Admin UI Customization
1. Brand admin interface
2. Configure dashboard
3. Set up user roles and permissions

### 4.5 Deployment
1. Configure production environment
2. Set up database backups
3. Implement security measures

## 5. Technical Requirements

### 5.1 Dependencies
```
payload: ^2.0.0
@payloadcms/next: ^0.1.0
mongodb: ^5.8.0
```

### 5.2 Environment Variables
```
MONGODB_URI=
PAYLOAD_SECRET=
PAYLOAD_PUBLIC_SERVER_URL=
NEXT_PUBLIC_PAYLOAD_URL=
```

### 5.3 Performance Considerations
- Implement data caching
- Use static site generation where possible
- Optimize media delivery

### 5.4 Security Requirements
- HTTPS for all connections
- Environment variable protection
- Rate limiting for API endpoints
- Input validation
- Authentication for sensitive operations

## 6. Migration Strategy
1. Develop CMS in parallel with existing site
2. Migrate content from static pages to CMS (including placeholder Case Study content into Portfolio Items)
3. Switch to CMS-powered pages in phased approach

## 7. Success Criteria
- Content editors can manage all site content without developer assistance, including detailed Portfolio Items/Case Studies.
- Website loads in under 2 seconds.
- Seamless visual integration between CMS and frontend.
- All existing functionality preserved with improved content flexibility.

## 8. Implementation Checklist

### Phase 1: Setup & Configuration
- [ ] Install Payload CMS and dependencies
  - [ ] `payload`
  - [ ] `@payloadcms/next`
  - [ ] `mongodb`
  - [ ] `dotenv`
- [ ] Create `.env` file with required variables
- [ ] Initialize MongoDB database
- [ ] Create basic Payload configuration file
- [ ] Set up basic authentication
- [ ] Test Payload admin panel access

### Phase 2: Content Modeling
- [ ] Define Pages collection
  - [ ] Create schema
  - [ ] Add fields for flexible content blocks
  - [ ] Set up page-specific metadata
- [ ] Define Services collection
  - [ ] Create schema with all required fields
  - [ ] Set up relationships to other services
- [ ] **Define/Update Portfolio Items collection (as per detailed spec)**
  - [ ] **Create schema with all specified fields (title, slug, clientName, industry, etc.)**
  - [ ] **Configure relationships to `services`, `media`, and `tags` collections.**
  - [ ] **Ensure richText fields are set up for challenge, solution, results.**
  - [ ] Configure media upload options for `heroImage`, `galleryImages`, `testimonial.authorImage`.
- [ ] Define Team Members collection
- [ ] Configure Media collection
  - [ ] Set up image processing options
  - [ ] Configure storage provider
- [ ] **Define Tags collection (if using relationship for Portfolio Item tags)**
  - [ ] `name`: `text`
  - [ ] `slug`: `text`
- [ ] Define Global collections
  - [ ] Site Settings
  - [ ] Navigation

### Phase 3: Next.js Integration
- [ ] Set up Payload API route in Next.js
- [ ] Create utility functions for data fetching (including for Portfolio Items/Case Studies)
- [ ] Update Home page to use CMS data
- [ ] Update About Us page to use CMS data
- [ ] Update Services page to use CMS data
- [ ] **Update/Create Portfolio listing page (`/portfolio`) to use CMS data for Portfolio Items**
- [ ] **Implement dynamic routes for individual Portfolio Items/Case Studies (`/portfolio/[slug]`)**
- [ ] Update Contact page to use CMS data
- [ ] Implement dynamic routes for services
- [ ] Set up image optimization with Next.js

### Phase 4: Advanced Features
- [ ] Implement preview mode for draft content (including Portfolio Items)
- [ ] Add access control for different user roles
- [ ] Set up webhooks for content updates
- [ ] Configure content versioning
- [ ] Implement form submission handling
- [ ] Add SEO management features
- [ ] Set up redirects management

### Phase 5: Testing & Optimization
- [ ] Perform security testing
- [ ] Test content creation workflows (especially for detailed Portfolio Items/Case Studies)
- [ ] Optimize image loading performance
- [ ] Implement caching strategy
- [ ] Test on mobile devices
- [ ] Run accessibility audit
- [ ] Perform load testing

### Phase 6: Deployment & Documentation
- [ ] Configure production environment
- [ ] Set up CI/CD pipeline
- [ ] Create database backup strategy
- [ ] Document content management workflows (including for Portfolio Items/Case Studies)
- [ ] Create user guide for content editors
- [ ] Train team on CMS usage
- [ ] Go live with CMS-powered site

### Phase 7: Post-Launch
- [ ] Monitor performance metrics
- [ ] Gather user feedback
- [ ] Implement any necessary adjustments
- [ ] Plan for future enhancements 