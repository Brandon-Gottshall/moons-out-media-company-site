export type SubCategory = {
  id: string;
  title: string;
  image: string;
  color: string;
  projectCount: number; // Placeholder
  isMetaAll?: boolean;
  placeholderVideoUrl?: string;
};

export type MetaCategory = {
  id: string;
  title: string;
  image: string;
  color: string;
  isGlobalAll?: boolean;
  subCategories: SubCategory[];
};

export const metaCategoriesData: MetaCategory[] = [
  {
    id: "all-projects",
    title: "All Projects",
    image: "https://media.giphy.com/media/3o7btPCcdNni1e3KBa/giphy.gif", // Global All GIF
    color: "cyberpunk-blue-light", // Unique color for 'All'
    isGlobalAll: true,
    subCategories: []
  },
  {
    id: "creative-narrative-driven",
    title: "Creative & Narrative Driven",
    image: "https://media.giphy.com/media/l2SpSQLHst12fcVq0/giphy.gif", // Placeholder Meta GIF
    color: "cyberpunk-purple", // Meta color
    subCategories: [
      { 
        id: "all-creative-narrative-driven", 
        title: "All Creative & Narrative", 
        image: "https://media.giphy.com/media/l2SpSQLHst12fcVq0/giphy.gif", // Placeholder for "All" in meta
        color: "cyberpunk-purple-light", 
        projectCount: 0, 
        isMetaAll: true,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleMetaCreativeAll"
      },
      { 
        id: "brand-narrative-driven", 
        title: "Brand Narrative Driven", 
        image: "https://media.giphy.com/media/3o6Zt6KHxsgXG6QZpK/giphy.gif", 
        color: "cyberpunk-purple-light", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleBrandVid"
      },
      { 
        id: "documentary", 
        title: "Documentary", 
        image: "https://media.giphy.com/media/d2Z9QYzA2aidi/giphy.gif", 
        color: "cyberpunk-sky", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleDocumentaryVid"
      },
      { 
        id: "corporate-video", 
        title: "Corporate Video", 
        image: "https://media.giphy.com/media/3o7btObqg30F1Q9M5y/giphy.gif", 
        color: "cyberpunk-yellow", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleCorporateVid"
      },
      { 
        id: "video-marketing", 
        title: "Video Marketing", 
        image: "https://media.giphy.com/media/l4FGpP4gD3vV7qYyA/giphy.gif", 
        color: "cyberpunk-olive", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleVideoMarketingVid"
      },
      { 
        id: "visual-content", 
        title: "Visual Content", 
        image: "https://media.giphy.com/media/3o7btNExKT3x49S0RG/giphy.gif", 
        color: "cyberpunk-brown", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleVisualVid"
      },
      { 
        id: "artisan-goods", 
        title: "Artisan Goods", 
        image: "https://media.giphy.com/media/3o7TKyJsS4R6j1z9y8/giphy.gif", 
        color: "cyberpunk-orange", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleArtisanVid"
      },
    ]
  },
  {
    id: "digital-platforms-development",
    title: "Digital Platforms & Development",
    image: "https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif", // Placeholder Meta GIF
    color: "cyberpunk-green", // Meta color
    subCategories: [
      { 
        id: "all-digital-platforms-development", 
        title: "All Digital & Development", 
        image: "https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif",
        color: "cyberpunk-light-green", 
        projectCount: 0, 
        isMetaAll: true,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleMetaDigitalAll"
      },
      { 
        id: "web-development", 
        title: "Web Development", 
        image: "https://media.giphy.com/media/xT9IgzoPsqh6NBgE48/giphy.gif", 
        color: "cyberpunk-orange", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleWebDevVid"
      },
      { 
        id: "e-commerce", 
        title: "E-commerce", 
        image: "https://media.giphy.com/media/3oKIPEh5Lk3o2cT4n6/giphy.gif", 
        color: "cyberpunk-red", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleEcommerceVid"
      },
      { 
        id: "saas", 
        title: "SaaS", 
        image: "https://media.giphy.com/media/3o7TKsHFo2T38c8HZe/giphy.gif", 
        color: "cyberpunk-silver", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleSaaSvid"
      },
      { 
        id: "next-js", 
        title: "Next.js", 
        image: "https://via.placeholder.com/180x100.gif?text=Next.js+Code", 
        color: "cyberpunk-gray", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleNextjsVid"
      },
      { 
        id: "node-js", 
        title: "Node.js", 
        image: "https://via.placeholder.com/180x100.gif?text=Node.js+Server", 
        color: "cyberpunk-light-green", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleNodejsVid"
      },
      // Assuming Python is primarily for web/backend dev in this context
      { 
        id: "python-dev", // Changed ID to be more specific if general Python is also a sub-cat elsewhere
        title: "Python (Development)", 
        image: "https://media.giphy.com/media/26n6PrzypmK0Pdtq0M/giphy.gif", 
        color: "cyberpunk-dark-blue", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=examplePythonVid" 
      }, 
      { 
        id: "cloud-solutions", 
        title: "Cloud Solutions", 
        image: "https://media.giphy.com/media/3o7bua5m2u2ZfN8z8k/giphy.gif", 
        color: "cyberpunk-blue", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleCloudVid"
      },
    ]
  },
  {
    id: "growth-engagement-strategies",
    title: "Growth & Engagement", // Shortened for brevity
    image: "https://media.giphy.com/media/3ornjPte2I2dF1k7yE/giphy.gif", // Placeholder Meta GIF
    color: "cyberpunk-pink", // Meta color
    subCategories: [
      { 
        id: "all-growth-engagement", 
        title: "All Growth & Engagement", 
        image: "https://media.giphy.com/media/3ornjPte2I2dF1k7yE/giphy.gif",
        color: "cyberpunk-light-pink", 
        projectCount: 0, 
        isMetaAll: true,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleMetaGrowthAll"
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        image: "https://media.giphy.com/media/3o7btN8xS5d9vT4yA0/giphy.gif", // Generic marketing/graph GIF
        color: "cyberpunk-orange", // Using a distinct color
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleDigitalMarketingVid"
      },
      { 
        id: "social-media", 
        title: "Social Media", 
        image: "https://media.giphy.com/media/26BRATEolA2g8ZXW0/giphy.gif", 
        color: "cyberpunk-green", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleSocialVid"
      },
      { 
        id: "community-building", 
        title: "Community Building", 
        image: "https://media.giphy.com/media/l4FGqk535Ld4c8g1O/giphy.gif", 
        color: "cyberpunk-pink", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleCommunityVid"
      },
      // Assuming 'Fitness' here relates to marketing/strategy for fitness brands
      { 
        id: "fitness-marketing", // Made ID more specific
        title: "Fitness (Marketing)", 
        image: "https://media.giphy.com/media/3o7btPS41uR49AGxig/giphy.gif", 
        color: "cyberpunk-magenta", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleFitnessVid"
      }, 
    ]
  },
  {
    id: "data-ai-solutions",
    title: "Data & AI Solutions",
    image: "https://media.giphy.com/media/l41Yqxc9yS2A6Y784/giphy.gif", // Placeholder Meta GIF
    color: "cyberpunk-cyan", // Meta color
    subCategories: [
      { 
        id: "all-data-ai-solutions", 
        title: "All Data & AI", 
        image: "https://media.giphy.com/media/l41Yqxc9yS2A6Y784/giphy.gif",
        color: "cyberpunk-light-cyan", 
        projectCount: 0, 
        isMetaAll: true,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleMetaDataAIAll"
      },
      { 
        id: "ai-machine-learning", 
        title: "AI & Machine Learning", 
        image: "https://media.giphy.com/media/l2J2V3a3bJq3q7W4o/giphy.gif", 
        color: "cyberpunk-teal", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleAIvid"
      },
      { 
        id: "data-analytics", 
        title: "Data Analytics", 
        image: "https://media.giphy.com/media/3o7WIK2w77i3x61uZW/giphy.gif", 
        color: "cyberpunk-lime", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleDataVid"
      },
      { 
        id: "automation", 
        title: "Automation", 
        image: "https://media.giphy.com/media/sWN50Ttynxu00/giphy.gif", 
        color: "cyberpunk-green", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleAutomationVid"
      },
      // Assuming 'Enterprise Solutions' are data/AI driven in this context
      { 
        id: "enterprise-solutions-data-ai", // Made ID more specific
        title: "Enterprise (Data/AI)", 
        image: "https://media.giphy.com/media/o0vwzuFklcNa8/giphy.gif", 
        color: "cyberpunk-gold", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleEnterpriseVid"
      }, 
      // Assuming 'Sustainability' here is about data/tech solutions for it
      { 
        id: "sustainability-tech", // Made ID more specific
        title: "Sustainability (Tech)", 
        image: "https://media.giphy.com/media/3o7TKNpaPPsD02vJvO/giphy.gif", 
        color: "cyberpunk-forest-green", 
        projectCount: 0,
        placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleSustainabilityVid"
      }, 
    ]
  }
]; 