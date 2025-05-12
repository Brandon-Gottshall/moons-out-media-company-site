export interface PortfolioItem {
  title: string
  slug: string
  clientName: string
  industry?: string
  projectYear?: string | number
  status: 'draft' | 'published' | 'archived'
  publishedDate?: string // ISO date string
  heroImage: { url: string; alt: string }
  summary: string
  challenge: string // RichText, simplified to string for placeholder
  solution: string // RichText, simplified to string for placeholder
  servicesRendered: string[] // Slugs of services
  keyFeatures?: Array<{
    featureTitle: string
    featureDescription: string
    featureIcon?: string // e.g., Lucide icon name
  }>
  results: string // RichText, simplified to string for placeholder
  metrics?: Array<{
    metricLabel: string
    metricValue: string
    metricChange?: string
    metricDescription?: string
  }>
  testimonial?: {
    quote: string
    authorName: string
    authorTitle?: string
    authorImage?: { url: string; alt: string }
  }
  galleryImages?: Array<{
    image: { url: string; alt: string }
    caption?: string
  }>
  tags?: string[] // Slugs or names of tags
  callToAction?: {
    ctaLabel: string
    ctaUrl: string
    ctaType: 'internal' | 'external'
    ctaVariant?: 'primary' | 'secondary'
  }
}

export const allPortfolioItems: PortfolioItem[] = [
  {
    title: "EcoTech Innovations: Igniting Brand Awareness with Documentary Storytelling",
    slug: "ecotech-innovations-documentary",
    clientName: "EcoTech Innovations",
    industry: "Sustainable Technology",
    projectYear: "2023",
    status: "published",
    publishedDate: "2023-10-15T10:00:00Z",
    heroImage: { url: "https://via.placeholder.com/1200x675?text=EcoTech+Hero+Shot", alt: "EcoTech sustainable technology in action" },
    summary: "Discover how our documentary series amplified EcoTech's message, showcasing their green solutions and achieving a 42% surge in brand recognition.",
    challenge: "EcoTech Innovations, a pioneer in sustainable energy solutions, struggled to convey the real-world impact and technical sophistication of their products to a broader audience. Their existing marketing materials were dense and failed to capture the passion behind their mission, leading to low engagement and difficulty attracting new investors and talent.",
    solution: "We partnered with EcoTech to produce a compelling three-part documentary series, \"The Future is Green.\" Each episode focused on a different aspect of their technology, featuring interviews with engineers, testimonials from early adopters, and stunning visuals of their solutions in practice. The narrative was crafted to be accessible, inspiring, and emotionally resonant, humanizing the technology and highlighting its positive global impact.",
    servicesRendered: ["documentary-production", "brand-strategy", "content-marketing"],
    keyFeatures: [
      { featureTitle: "Cinematic Visuals", featureDescription: "High-quality, on-location filming to capture the scale and beauty of EcoTech's projects." },
      { featureTitle: "Expert Interviews", featureDescription: "In-depth conversations with key EcoTech personnel and industry leaders." },
      { featureTitle: "Global Distribution Strategy", featureDescription: "Targeted outreach to environmental publications and platforms." },
    ],
    results: "The documentary series became a cornerstone of EcoTech's communication strategy. It led to a significant increase in media mentions, investor inquiries, and a marked improvement in public perception. The engaging storytelling transformed complex concepts into an inspiring vision for a sustainable future.",
    metrics: [
      { metricLabel: "Brand Awareness Increase", metricValue: "+42%" },
      { metricLabel: "Investor Inquiries", metricValue: "+156%" },
      { metricLabel: "Website Traffic from Series", metricValue: "+75%" },
    ],
    testimonial: {
      quote: "Moons Out Media didn't just create videos; they told our story with a passion and clarity that resonated deeply. The documentary series has been transformative for our brand.",
      authorName: "Dr. Alistair Finch",
      authorTitle: "CEO, EcoTech Innovations",
      authorImage: { url: "https://via.placeholder.com/100x100?text=AF", alt: "Dr. Alistair Finch" }
    },
    galleryImages: [
      { image: { url: "https://via.placeholder.com/800x600?text=EcoTech+Docu+Still+1", alt: "Behind the scenes of EcoTech documentary" }, caption: "Filming the solar panel installation." },
      { image: { url: "https://via.placeholder.com/800x600?text=EcoTech+Docu+Still+2", alt: "Interview with EcoTech engineer" }, caption: "Capturing expert insights." },
    ],
    tags: ["Documentary", "Sustainability", "Brand Storytelling", "Corporate Video"],
    callToAction: {
      ctaLabel: "Watch The Series",
      ctaUrl: "https://example.com/ecotech-series", // Placeholder external link
      ctaType: "external",
      ctaVariant: "primary"
    }
  },
  {
    title: "Urban Fitness: Powering Growth with Authentic Social Campaigns",
    slug: "urban-fitness-transformation",
    clientName: "Urban Fitness Co.",
    industry: "Health & Wellness",
    projectYear: "2022",
    status: "published",
    publishedDate: "2022-11-20T10:00:00Z",
    heroImage: { url: "https://via.placeholder.com/1200x675?text=Urban+Fitness+Hero", alt: "Diverse group exercising at Urban Fitness" },
    summary: "A targeted social media campaign showcasing real member transformations drove a 73% increase in membership inquiries for Urban Fitness.",
    challenge: "Urban Fitness Co. offered excellent facilities and trainers but faced stiff competition in a crowded market. Their social media presence was generic and failed to highlight their unique community-focused approach, resulting in stagnant growth and low engagement on their posts.",
    solution: "We launched the #MyUrbanJourney social media campaign, centered around authentic video and photo stories of real members and their fitness transformations. Content focused on overcoming challenges, building community, and celebrating personal achievements, rather than just before-and-after shots. This was supported by targeted ads and influencer collaborations with local fitness personalities.",
    servicesRendered: ["social-media-marketing", "video-production", "influencer-marketing"],
    results: "The campaign significantly boosted Urban Fitness Co.'s online presence and brand perception. Engagement rates soared, and the authentic storytelling resonated with their target audience, leading to a substantial increase in class bookings and membership sign-ups. The campaign also fostered a stronger sense of community among existing members.",
    metrics: [
      { metricLabel: "Membership Inquiries", metricValue: "+73%" },
      { metricLabel: "Social Media Engagement", metricValue: "+215%" },
      { metricLabel: "Campaign ROI", metricValue: "3.5x" },
    ],
    tags: ["Social Media", "Fitness", "Community Building", "Video Marketing"],
    testimonial: {
      quote: "The #MyUrbanJourney campaign was a game-changer. Moons Out Media understood our ethos and brought our members' stories to life in a way that felt real and inspiring.",
      authorName: "Sarah Chen",
      authorTitle: "Founder, Urban Fitness Co."
    }
  },
  {
    title: "Artisan Collective: Weaving Narratives for E-commerce Success",
    slug: "artisan-collective-showcase",
    clientName: "The Artisan Collective",
    industry: "Handcrafted Goods & E-commerce",
    projectYear: "2023",
    status: "published",
    publishedDate: "2023-09-05T10:00:00Z",
    heroImage: { url: "https://via.placeholder.com/1200x675?text=Artisan+Collective+Hero", alt: "Beautiful handcrafted goods from Artisan Collective" },
    summary: "Intimate artisan profiles and a revamped e-commerce visual strategy led to a 94% increase in online sales for The Artisan Collective.",
    challenge: "The Artisan Collective curated beautiful, high-quality handcrafted goods, but their online store struggled to convey the skill and passion behind each product. Product photography was inconsistent, and the brand story was lost, leading to high cart abandonment rates and difficulty competing with mass-produced alternatives.",
    solution: "We developed a series of short video profiles for key artisans, showcasing their creative process, inspiration, and dedication. This was complemented by a complete overhaul of their product photography and website visuals, emphasizing a cohesive, aspirational aesthetic. The brand narrative was woven throughout the customer journey, from product pages to email marketing.",
    servicesRendered: ["brand-storytelling", "e-commerce-strategy", "product-photography", "video-production"],
    keyFeatures: [
      { featureTitle: "Artisan Profile Videos", featureDescription: "Short, emotive videos telling the story behind the makers and their craft." },
      { featureTitle: "Consistent Visual Identity", featureDescription: "High-quality, uniform photography stijl across all products and marketing materials." },
      { featureTitle: "Narrative-Driven Product Descriptions", featureDescription: "Copy that highlights the uniqueness and story of each item." }
    ],
    results: "The new content strategy humanized The Artisan Collective, creating a strong emotional connection with customers. The improved visuals and storytelling significantly enhanced the perceived value of the products, leading to higher conversion rates, increased average order value, and a loyal customer base proud to support artisan craftsmanship.",
    metrics: [
      { metricLabel: "E-commerce Sales Growth", metricValue: "+94%" },
      { metricLabel: "Average Order Value", metricValue: "+35%" },
      { metricLabel: "Cart Abandonment Rate Reduction", metricValue: "-28%" },
    ],
    tags: ["Brand Storytelling", "E-commerce", "Artisan Goods", "Visual Content"],
    callToAction: {
      ctaLabel: "Shop The Collection",
      ctaUrl: "/shop", // Placeholder internal link
      ctaType: "internal"
    }
  },
  {
    title: "Custom Web App for Innovate Solutions: Streamlining Complex Workflows",
    slug: "custom-web-applications",
    clientName: "Innovate Solutions Ltd.",
    industry: "Enterprise Software",
    projectYear: "2024",
    status: "published",
    publishedDate: "2024-01-10T10:00:00Z",
    heroImage: { url: "https://via.placeholder.com/1200x675?text=Innovate+Web+App", alt: "Screenshot of Innovate Solutions custom web application" },
    summary: "A bespoke web application built with Next.js and Node.js, designed to automate Innovate Solutions' core operational processes, resulting in a 30% efficiency gain.",
    challenge: "Innovate Solutions was relying on a patchwork of spreadsheets, email, and outdated legacy software to manage their complex project workflows. This led to inefficiencies, data silos, frequent errors, and an inability to scale their operations effectively. They needed a centralized, modern solution tailored to their specific needs.",
    solution: "We designed and developed a custom web application from the ground up using Next.js for the frontend and Node.js for the backend API. The application featured role-based access control, a real-time project dashboard, automated reporting, and integration with their existing CRM. The UI/UX was meticulously designed for ease of use, even for non-technical staff.",
    servicesRendered: ["web-application-development", "ui-ux-design", "api-development", "devops-consulting"],
    results: "The new web application revolutionized Innovate Solutions' operations. It provided a single source of truth, streamlined communication, and automated many previously manual tasks. This led to a significant reduction in errors, improved project turnaround times, and enabled the company to handle a larger volume of work without increasing headcount.",
    metrics: [
      { metricLabel: "Operational Efficiency Gain", metricValue: "+30%" },
      { metricLabel: "Reduction in Manual Errors", metricValue: "-95%" },
      { metricLabel: "User Adoption Rate", metricValue: "98% within 3 months" },
    ],
    tags: ["Web Development", "SaaS", "Enterprise Solutions", "Next.js", "Node.js"],
    testimonial: {
      quote: "The custom application Moons Out Media built for us is more than just software; it's the backbone of our new, more efficient operation. Their technical expertise and understanding of our business needs were exceptional.",
      authorName: "David Miller",
      authorTitle: "COO, Innovate Solutions Ltd."
    }
  },
  {
    title: "AI-Driven Automation for DataCorp: Unlocking Insights & Efficiency",
    slug: "ai-driven-automation",
    clientName: "DataCorp Analytics",
    industry: "Data Analytics & Business Intelligence",
    projectYear: "2023",
    status: "published",
    publishedDate: "2023-11-01T10:00:00Z",
    heroImage: { url: "https://via.placeholder.com/1200x675?text=DataCorp+AI+Hero", alt: "Abstract visualization of AI data processing" },
    summary: "Implemented a custom AI/ML pipeline to automate DataCorp's report generation, reducing processing time by 70% and uncovering new actionable insights.",
    challenge: "DataCorp Analytics processed vast amounts of client data to generate market intelligence reports. Their existing manual processes were time-consuming, prone to human error, and limited their ability to extract deeper, predictive insights from the data. They needed to scale their analytical capabilities and offer more sophisticated services.",
    solution: "We developed a tailored AI/ML pipeline that automated data ingestion, cleaning, analysis, and report generation. This involved creating custom machine learning models for trend prediction and anomaly detection. The solution was built using Python, TensorFlow, and integrated with their existing cloud infrastructure, providing a scalable and robust platform.",
    servicesRendered: ["ai-ml-development", "data-engineering", "cloud-architecture", "automation-solutions"],
    keyFeatures: [
      { featureTitle: "Automated Data Processing", featureDescription: "End-to-end automation from data ingestion to report delivery." },
      { featureTitle: "Predictive Analytics Models", featureDescription: "Custom ML models to forecast market trends and identify opportunities." },
      { featureTitle: "Scalable Cloud Architecture", featureDescription: "Built on AWS to handle growing data volumes and processing needs." }
    ],
    results: "The AI-driven automation solution transformed DataCorp's service delivery. Report generation time was drastically reduced, allowing analysts to focus on higher-value interpretation and client consultation. The new predictive capabilities enabled DataCorp to offer premium services, opening up new revenue streams and enhancing their competitive edge.",
    metrics: [
      { metricLabel: "Report Processing Time Reduction", metricValue: "-70%" },
      { metricLabel: "New Insights Generated", metricValue: "+25% annually" },
      { metricLabel: "Client Satisfaction (Premium Reports)", metricValue: "95%" },
    ],
    tags: ["AI & Machine Learning", "Data Analytics", "Automation", "Cloud Solutions", "Python"],
    testimonial: {
      quote: "Moons Out Media's AI expertise helped us leapfrog our competition. The automation solution is not just efficient; it's a strategic asset that unlocks new value from our data.",
      authorName: "Dr. Emily Carter",
      authorTitle: "Chief Data Scientist, DataCorp Analytics"
    }
  }
] 