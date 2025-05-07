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

3. **Portfolio Items**
   - Title
   - Slug
   - Client
   - Services used
   - Description
   - Images/media
   - Results/metrics
   - Testimonial

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
1. Define collection schemas
2. Configure access control
3. Create relationship fields
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
2. Migrate content from static pages to CMS
3. Switch to CMS-powered pages in phased approach

## 7. Success Criteria
- Content editors can manage all site content without developer assistance
- Website loads in under 2 seconds
- Seamless visual integration between CMS and frontend
- All existing functionality preserved with improved content flexibility

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
- [ ] Define Portfolio Items collection
  - [ ] Create schema with all required fields
  - [ ] Configure media upload options
- [ ] Define Team Members collection
- [ ] Configure Media collection
  - [ ] Set up image processing options
  - [ ] Configure storage provider
- [ ] Define Global collections
  - [ ] Site Settings
  - [ ] Navigation

### Phase 3: Next.js Integration
- [ ] Set up Payload API route in Next.js
- [ ] Create utility functions for data fetching
- [ ] Update Home page to use CMS data
- [ ] Update About Us page to use CMS data
- [ ] Update Services page to use CMS data
- [ ] Update Portfolio page to use CMS data
- [ ] Update Contact page to use CMS data
- [ ] Implement dynamic routes for services
- [ ] Implement dynamic routes for portfolio items
- [ ] Set up image optimization with Next.js

### Phase 4: Advanced Features
- [ ] Implement preview mode for draft content
- [ ] Add access control for different user roles
- [ ] Set up webhooks for content updates
- [ ] Configure content versioning
- [ ] Implement form submission handling
- [ ] Add SEO management features
- [ ] Set up redirects management

### Phase 5: Testing & Optimization
- [ ] Perform security testing
- [ ] Test content creation workflows
- [ ] Optimize image loading performance
- [ ] Implement caching strategy
- [ ] Test on mobile devices
- [ ] Run accessibility audit
- [ ] Perform load testing

### Phase 6: Deployment & Documentation
- [ ] Configure production environment
- [ ] Set up CI/CD pipeline
- [ ] Create database backup strategy
- [ ] Document content management workflows
- [ ] Create user guide for content editors
- [ ] Train team on CMS usage
- [ ] Go live with CMS-powered site

### Phase 7: Post-Launch
- [ ] Monitor performance metrics
- [ ] Gather user feedback
- [ ] Implement any necessary adjustments
- [ ] Plan for future enhancements 