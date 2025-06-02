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
    ctaUrl: "https://www.rtdayton.org/volunteer",
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
    url: "/images/portfolio/Missy/Missy.webp", 
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
      featureTitle: "Celebrity-Adjacent Chef",
      featureDescription:
        "Missy is actually John Legend's sister.",
    },
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
        url: "/images/portfolio/Missy/Missy Still 1.webp",
        alt: "Woman gesturing beside a pot on a stovetop in a modern kitchen.",
      },
      caption: "Missy explains her cooking process while standing at the stove, with potted plants and a bottle of bourbon visible behind her.",
    },
    {
      image: {
        url: "/images/portfolio/Missy/Missy Still 2.webp ",
        alt: "Woman taking a bite of salmon from a plate in a kitchen.",
      },
      caption: "Missy samples her bourbon-glazed salmon and roasted vegetables at the countertop, bourbon bottle on display in the background.",
    },
    {
      image: {
        url: "/images/portfolio/Missy/Missy Still 3.webp",
        alt: "Woman gesturing with hands in a kitchen setting.",
      },
      caption: "Missy describes her recipe steps, speaking animatedly in front of a bronze-tone backsplash and potted window plants.",
    },
    {
      image: {
        url: "/images/portfolio/Missy/Missy Still 4.webp",
        alt: "Hand blotting salmon fillets on a parchment-lined baking tray.",
      },
      caption: "Missy uses a paper towel to pat dry raw salmon fillets before baking.",
    },
  ],

  tags: ["recipe", "bourbon", "salmon", "home-cooking"],

  showcaseVideos: [
    {
      muxPlaybackId: "rU01i200kEowDcTrk8giILnBGvx02zLGjHML00qjmLTi02600", // placeholder until video uploaded
      order: 1,
      title: "Full Episode",
      description: "3-minute bourbon-glazed salmon tutorial",
    },
  ],
};

// lib/placeholder-data/portfolio-items.ts
export const gmcDenaliUltimateShowcase: PortfolioItem = {
  /* ──────────────────────────
     Required
  ────────────────────────── */
  title:       "GMC Sierra Denali Ultimate — Interior & Exterior Showcase",
  slug:        "gmc-denali-ultimate-showcase",
  clientName:  "Arbogast Buick GMC",
  status:      "published",
  summary:
    "One-minute spec film that pairs low-angle slider moves and macro close-ups to spotlight the 2023 GMC Sierra Denali Ultimate’s bold grille, 22-inch wheels, and Alpine Umber interior.",
  heroImage: {
    url: "/images/portfolio/GMC Denali Ultimate/Denali.webp",
    alt: "Front three-quarter view of a GMC Sierra Denali Ultimate parked on grass"
  },
  servicesRendered: [
    "video-production",
    "automotive-visuals",
    "editing",
    "color-grading"
  ],
  metaCategory: "video",
  subCategory:  "automotive",

  /* ──────────────────────────
     Strongly-recommended extras
  ────────────────────────── */
  industry:      "Automotive",
  projectYear:   2025,
  publishedDate: "2025-06-02T00:00:00Z",

  challenge:
    "Convey premium craftsmanship inside a full-size pickup while retaining the Denali’s rugged identity, all within a single-location daylight shoot and without voice-over.",
  solution:
    "Natural-light exteriors, handheld macro passes on chrome and leather, and interior gimbal shots through the panoramic sunroof. A warm, contrast-rich grade accentuates Alpine Umber leather and the exclusive ‘Ultimate’ wood grain.",

    keyFeatures: [
      { featureTitle: "Signature Denali Chrome Grille", featureDescription: "Low‑angle slider shot emphasizes the multi‑dimensional chrome grille and LED headlamps." },
      { featureTitle: "22‑inch Ultra‑Bright Wheels",  featureDescription: "Tight orbit highlights the intricate spoke design and GMC center cap." },
      { featureTitle: "Alpine Umber Leather Cabin",    featureDescription: "Macro inserts capture the two‑tone leather, contrast stitching, and laser‑etched topographical accents." },
      { featureTitle: "Dual‑Pane Panoramic Sunroof",    featureDescription: "Interior dolly move reveals the full‑length glass roof flooding the cabin with natural light." },
      { featureTitle: "13.4” Infotainment & Digital Cluster", featureDescription: "Rear‑seat perspective shows the expansive center screen and customizable driver display." }
    ],
  

  galleryImages: [
    {
      image: { url: "/images/portfolio/GMC Denali Ultimate/Denali Still 1.webp", alt: "GMC Sierra Denali Ultimate front grille and wheel" }, // Still 2.4.1
      caption: "Denali chrome and 22-inch wheels"
    },
    {
      image: { url: "/images/portfolio/GMC Denali Ultimate/Denali Still 2.webp", alt: "Driver seat and console with open door" },             // Still 2.5.1
      caption: "Alpine Umber driver cockpit"
    },
    {
      image: { url: "/images/portfolio/GMC Denali Ultimate/Denali Still 3.webp", alt: "Close-up of door panel with Ultimate badge" },        // Still 2.6.1
      caption: "Ultimate-trim door detail"
    },
    {
      image: { url: "/images/portfolio/GMC Denali Ultimate/Denali Still 4.webp", alt: "Rear-seat view toward dash and infotainment" },       // Still 2.7.1
      caption: "Full-cabin perspective"
    }
  ],

  tags: ["denali", "luxury-truck", "automotive", "spec-film"],

  callToAction: {
    ctaLabel:  "View Sierra Denali Inventory",
    ctaUrl:    "https://www.davearbogast.com/new-vehicles/sierra-1500/?trim=Denali+Ultimate", // TODO verify
    ctaType:   "external",
    ctaVariant:"primary"
  }
};


export const allPortfolioItems: PortfolioItem[] = [
  glassHouseVolunteerDay,
  cookingWithMissyBourbonSalmon,
  gmcDenaliUltimateShowcase,
];
