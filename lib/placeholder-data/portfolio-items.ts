export interface PortfolioItem {
  title: string;
  slug: string;
  clientName: string;
  industry?: string;
  projectYear?: string | number;
  status: "draft" | "published" | "archived";
  publishedDate?: string; // ISO date string
  heroImage: { url: string; alt: string };
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string;
  servicesRendered: string[];
  keyFeatures?: Array<{
    featureTitle: string;
    featureDescription: string;
    featureIcon?: string;
  }>;
  metrics?: Array<{
    metricLabel: string;
    metricValue: string;
    metricChange?: string;
    metricDescription?: string;
  }>;
  testimonial?: {
    quote: string;
    authorName: string;
    authorTitle?: string;
    authorImage?: { url: string; alt: string };
  };
  galleryImages?: Array<{
    image: { url: string; alt: string };
    caption?: string;
  }>;
  tags?: string[];
  callToAction?: {
    ctaLabel: string;
    ctaUrl: string;
    ctaType: "internal" | "external";
    ctaVariant?: "primary" | "secondary";
  };
  showcaseVideos?: Array<{
    muxPlaybackId: string;
    title?: string;
    thumbnailUrl?: string;
    order: number;
    description?: string;
  }>;
  metaCategory: string;
  subCategory: string;
  orientation?: "portrait" | "landscape" | "square" | "tall";
}

export const glassHouseVolunteerDay: PortfolioItem = {
  /* ──────────────────────────
     Required fields
  ────────────────────────── */
  title: "Glass House Realty × Rebuilding Together Volunteer Day",
  slug: "glass-house-rebuilding-dayton",
  clientName: "Glass House Realty Group",
  status: "published",
  summary:
    "Recap film capturing Glass House Realty agents and community volunteers teaming up with Rebuilding Together Dayton to beautify a caregiver's home through painting, landscaping, and a healthy dose of springtime goodwill.",

  heroImage: {
    url: "/images/portfolio/Glass House Shortened.webp",
    alt: "Volunteer crew painting a Dayton home's exterior during spring cleanup",
  },

  servicesRendered: [
    "video-production",
    "event-coverage",
    "editing",
    "color-grading",
  ],

  metaCategory: "media",
  subCategory: "brand-storytelling",
  orientation: "tall",

  /* ──────────────────────────
     Strongly-recommended extras
  ────────────────────────── */
  industry: "Real Estate",
  projectYear: 2025,
  publishedDate: "2025-06-01T00:00:00Z",

  challenge:
    "Showcase Glass House Realty's commitment to community service by telling a genuine, people-focused story—without scripted narration or a commercial feel.",
  solution:
    "We embedded with the volunteer crew for a single-day shoot, filming handheld interviews, gimbal B-roll, and time-lapses of the exterior transformation. Natural-light color grading and upbeat pacing kept the piece authentic and uplifting.",
  // Results can be filled in once social / listing metrics are available
  results:
    "Video deployed across Facebook and Instagram; early engagement drove inquiries from additional volunteers (metrics pending).",

  keyFeatures: [
    {
      featureTitle: "On-location Interviews",
      featureDescription:
        "Heartfelt sound bites from realtors, volunteers, and Rebuilding Together staff.",
    },
    {
      featureTitle: "Before-and-After Visuals",
      featureDescription:
        "Quick match-cuts highlight the property's curb-appeal transformation.",
    },
    {
      featureTitle: "Same-Day Edit Teaser",
      featureDescription:
        "A 30-second reel delivered that evening to spur next-day social buzz.",
    },
  ],

  testimonial: {
    quote:
      "My favorite part was the volunteers actually wanting to go out and buy flowers for the homeowners. They were really excited to help out and give back and put their own special touch on it.",
    authorName: "Lauren",
    authorTitle: "Project Manager, Rebuilding Together Dayton",
  },

  galleryImages: [
    {
      image: {
        url: "/images/portfolio/glass-house-rebuilding-dayton/gallery-01.jpg",
        alt: "Volunteers planting flowers",
      },
      caption: "Adding pops of color with fresh annuals",
    },
    {
      image: {
        url: "/images/portfolio/glass-house-rebuilding-dayton/gallery-02.jpg",
        alt: "Realtor painting trim",
      },
      caption: "Fresh coat for the porch trim",
    },
    {
      image: {
        url: "/images/portfolio/glass-house-rebuilding-dayton/gallery-03.jpg",
        alt: "Team group photo",
      },
      caption: "Glass House Realty crew & homeowners",
    },
  ],

  tags: ["community", "volunteer", "realtor", "dayton"],

  callToAction: {
    ctaLabel: "Volunteer with Rebuilding Together Dayton",
    ctaUrl: "https://rebuildingtogetherdayton.org/volunteer",
    ctaType: "external",
    ctaVariant: "primary",
  },

  showcaseVideos: [
    {
      muxPlaybackId: "CG6pijG02K02AOgKiKx6uZ9DqD7gKQNZH01xlOGaXdvS2E",
      order: 1,
      title: "Full Recap Video",
      description: "2-minute highlight film",
    },
  ],
};

// lib/placeholder-data/portfolio-items.ts
export const cookingWithMissyBourbonSalmon: PortfolioItem = {
  /* ──────────────────────────
     Required fields
  ────────────────────────── */
  title: "Cooking with Missy – Bourbon-Glazed Salmon",
  slug: "cooking-with-missy-bourbon-glazed-salmon",
  clientName: "Cooking with Missy",
  status: "published",
  summary:
    "In this upbeat recipe episode, Missy shows step-by-step how to make her favorite bourbon-glazed salmon using Stephen Curry's Gentleman's Cut bourbon for a sweet, tangy kick.",

  heroImage: {
    url: "/images/portfolio/Missy.webp", 
    alt: "Missy brushing bourbon glaze onto sizzling salmon fillets",
  },

  servicesRendered: [
    "video-production",
    "food-styling",
    "editing",
    "color-grading",
  ],

  metaCategory: "media",
  subCategory: "social-media-content",
  orientation: "landscape",

  /* ──────────────────────────
     Strongly-recommended extras
  ────────────────────────── */
  industry: "Food & Beverage",
  projectYear: 2025,
  publishedDate: "2025-06-01T00:00:00Z",

  challenge:
    "Create an engaging, easy-to-follow cooking segment that highlights both the recipe and the featured bourbon without feeling like an ad.",
  solution:
    "Shot a single-camera kitchen setup with close-up insert shots of each step. Natural dialogue, quick jump-cuts, and macro B-roll of the glaze keep the pacing lively while product mentions stay organic.",
  // Add concrete numbers once available
  results:
    "Episode published to YouTube Shorts, Instagram Reels, and TikTok; early engagement surpassed channel averages (metrics pending).",

  keyFeatures: [
    {
      featureTitle: "Product Integration",
      featureDescription:
        "Gentleman's Cut bourbon called out naturally during the glazing step.",
    },
    {
      featureTitle: "Step-Count Seasoning Tips",
      featureDescription:
        "Missy shares her unique pepper-shake 'count' method for consistent flavor.",
    },
    {
      featureTitle: "30 Second Ad",
      featureDescription:
        "Perfect for TV, Social Media, and Digital Mediums.",
    },
  ],

  galleryImages: [
    {
      image: {
        url: "/images/portfolio/cooking-with-missy-bourbon-salmon/gallery-01.jpg",
        alt: "Four salmon fillets patted dry on parchment",
      },
      caption: "Prepping and pat-drying the salmon",
    },
    {
      image: {
        url: "/images/portfolio/cooking-with-missy-bourbon-salmon/gallery-02.jpg",
        alt: "Close-up of bourbon glaze bubbling in saucepan",
      },
      caption: "Bourbon glaze coming to temperature",
    },
    {
      image: {
        url: "/images/portfolio/cooking-with-missy-bourbon-salmon/gallery-03.jpg",
        alt: "Finished salmon plated with glaze drizzle",
      },
      caption: "Final plated presentation",
    },
  ],

  tags: ["recipe", "bourbon", "salmon", "home-cooking"],

  callToAction: {
    ctaLabel: "Watch the Full Recipe",
    ctaUrl: "https://youtube.com/@cookingwithmissy",
    ctaType: "external",
    ctaVariant: "primary",
  },

  showcaseVideos: [
    {
      muxPlaybackId: "rU01i200kEowDcTrk8giILnBGvx02zLGjHML00qjmLTi02600", // placeholder until video uploaded
      order: 1,
      title: "Full Episode",
      description: "3-minute bourbon-glazed salmon tutorial",
    },
  ],
};

export const allPortfolioItems: PortfolioItem[] = [
  glassHouseVolunteerDay,
  cookingWithMissyBourbonSalmon,
];
