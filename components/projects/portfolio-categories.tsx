"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, ChevronLeft, ChevronRight } from "lucide-react" 
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperInstance } from "swiper"
import { Navigation, A11y } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

type Category = {
  id: string
  title: string
  description: string
  image: string // This will now point to a public GIF URL or a placeholder service
  projectCount: number // This will be a placeholder for now
  color: string // e.g., "cyberpunk-blue"
  placeholderVideoUrl?: string; // New field for placeholder video URLs
}

// New categoriesData based on the filter buttons
const categoriesData: Category[] = [
  {
    id: "all",
    title: "All",
    description: "Browse all projects across every category.",
    image: "https://media.giphy.com/media/3o7btPCcdNni1e3KBa/giphy.gif", // Generic 'all' or 'grid' GIF
    projectCount: 0, // Placeholder
    color: "cyberpunk-blue-light", // Unique color for 'All'
    placeholderVideoUrl: "https://www.youtube.com/watch?v=genericAllProjectsVideo"
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
    description: "Projects utilizing Artificial Intelligence and Machine Learning.",
    image: "https://media.giphy.com/media/l2J2V3a3bJq3q7W4o/giphy.gif", // Generic AI/robot GIF
    projectCount: 0,
    color: "cyberpunk-teal",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleAIvid"
  },
  {
    id: "artisan-goods",
    title: "Artisan Goods",
    description: "Projects related to artisan goods and crafts.",
    image: "https://media.giphy.com/media/3o7TKyJsS4R6j1z9y8/giphy.gif", // Generic crafting/handmade GIF
    projectCount: 0,
    color: "cyberpunk-orange",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleArtisanVid"
  },
  {
    id: "automation",
    title: "Automation",
    description: "Projects focusing on automation solutions.",
    image: "https://media.giphy.com/media/sWN50Ttynxu00/giphy.gif", // Generic gears/automation GIF
    projectCount: 0,
    color: "cyberpunk-green",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleAutomationVid"
  },
  {
    id: "brand-storytelling",
    title: "Brand Storytelling",
    description: "Narratives that communicate brand values.",
    image: "https://media.giphy.com/media/3o6Zt6KHxsgXG6QZpK/giphy.gif", // Generic storytelling/book GIF
    projectCount: 0,
    color: "cyberpunk-purple-light",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleBrandVid"
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Projects involving cloud infrastructure and solutions.",
    image: "https://media.giphy.com/media/3o7bua5m2u2ZfN8z8k/giphy.gif", // Generic cloud GIF
    projectCount: 0,
    color: "cyberpunk-blue",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleCloudVid"
  },
  {
    id: "community-building",
    title: "Community Building",
    description: "Projects focused on building and engaging communities.",
    image: "https://media.giphy.com/media/l4FGqk535Ld4c8g1O/giphy.gif", // Generic community/people GIF
    projectCount: 0,
    color: "cyberpunk-pink",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleCommunityVid"
  },
  {
    id: "corporate-video",
    title: "Corporate Video",
    description: "Professional videos for corporate communications.",
    image: "https://media.giphy.com/media/3o7btObqg30F1Q9M5y/giphy.gif", // Generic corporate/business GIF
    projectCount: 0,
    color: "cyberpunk-yellow", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleCorporateVid"
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Projects involving data analysis and insights.",
    image: "https://media.giphy.com/media/3o7WIK2w77i3x61uZW/giphy.gif", // Generic data/chart GIF
    projectCount: 0,
    color: "cyberpunk-lime", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleDataVid"
  },
  {
    id: "documentary",
    title: "Documentary",
    description: "Cinematic authentic storytelling content.",
    image: "https://media.giphy.com/media/d2Z9QYzA2aidi/giphy.gif", // Generic film/documentary GIF
    projectCount: 0,
    color: "cyberpunk-sky", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleDocumentaryVid"
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    description: "Projects related to online stores and e-commerce platforms.",
    image: "https://media.giphy.com/media/3oKIPEh5Lk3o2cT4n6/giphy.gif", // Generic shopping/e-commerce GIF
    projectCount: 0,
    color: "cyberpunk-red", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleEcommerceVid"
  },
  {
    id: "enterprise-solutions",
    title: "Enterprise Solutions",
    description: "Solutions tailored for large enterprise needs.",
    image: "https://media.giphy.com/media/o0vwzuFklcNa8/giphy.gif", // Generic enterprise/building GIF
    projectCount: 0,
    color: "cyberpunk-gold", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleEnterpriseVid"
  },
  {
    id: "fitness",
    title: "Fitness",
    description: "Projects in the health and fitness sector.",
    image: "https://media.giphy.com/media/3o7btPS41uR49AGxig/giphy.gif", // Generic fitness/exercise GIF
    projectCount: 0,
    color: "cyberpunk-magenta", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleFitnessVid"
  },
  {
    id: "next-js",
    title: "Next.js",
    description: "Projects built with the Next.js framework.",
    image: "https://via.placeholder.com/180x100.gif?text=Next.js+Code", // Placeholder text GIF
    projectCount: 0,
    color: "cyberpunk-gray", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleNextjsVid"
  },
  {
    id: "node-js",
    title: "Node.js",
    description: "Projects utilizing Node.js for backend development.",
    image: "https://via.placeholder.com/180x100.gif?text=Node.js+Server", // Placeholder text GIF
    projectCount: 0,
    color: "cyberpunk-light-green", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleNodejsVid"
  },
  {
    id: "python",
    title: "Python",
    description: "Projects developed using the Python language.",
    image: "https://media.giphy.com/media/26n6PrzypmK0Pdtq0M/giphy.gif", // Generic Python/snake GIF
    projectCount: 0,
    color: "cyberpunk-dark-blue", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=examplePythonVid"
  },
  {
    id: "saas",
    title: "SaaS",
    description: "Software as a Service applications.",
    image: "https://media.giphy.com/media/3o7TKsHFo2T38c8HZe/giphy.gif", // Generic software/cloud app GIF
    projectCount: 0,
    color: "cyberpunk-silver", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleSaaSvid"
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Content and campaigns for social media platforms.",
    image: "https://media.giphy.com/media/26BRATEolA2g8ZXW0/giphy.gif", // Generic social media icons GIF
    projectCount: 0,
    color: "cyberpunk-green", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleSocialVid"
  },
  {
    id: "sustainability",
    title: "Sustainability",
    description: "Projects focused on sustainable practices and technologies.",
    image: "https://media.giphy.com/media/3o7TKNpaPPsD02vJvO/giphy.gif", // Generic nature/sustainability GIF
    projectCount: 0,
    color: "cyberpunk-forest-green", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleSustainabilityVid"
  },
  {
    id: "video-marketing",
    title: "Video Marketing",
    description: "Marketing campaigns centered around video content.",
    image: "https://media.giphy.com/media/l4FGpP4gD3vV7qYyA/giphy.gif", // Generic video/play button GIF
    projectCount: 0,
    color: "cyberpunk-olive", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleVideoMarketingVid"
  },
  {
    id: "visual-content",
    title: "Visual Content",
    description: "Creation of engaging visual content.",
    image: "https://media.giphy.com/media/3o7btNExKT3x49S0RG/giphy.gif", // Generic visual/art GIF
    projectCount: 0,
    color: "cyberpunk-brown", 
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleVisualVid"
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Projects involving website and web application development.",
    image: "https://media.giphy.com/media/xT9IgzoPsqh6NBgE48/giphy.gif", // Generic code/web dev GIF
    projectCount: 0,
    color: "cyberpunk-orange",
    placeholderVideoUrl: "https://www.youtube.com/watch?v=exampleWebDevVid"
  },
];

const CARD_MIN_WIDTH_PX = 180 // Corresponds to md:min-w-[180px]
const CARD_GAP_PX = 12        // Corresponds to gap-3

// Helper function for RGBA colors similar to ServiceShowcase
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

interface PortfolioCategoriesProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PortfolioCategories({ 
  activeFilter, 
  onFilterChange 
}: PortfolioCategoriesProps) {
  const [layoutMode, setLayoutMode] = useState<"centered" | "scrollable">("centered")
  const containerRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperInstance | null>(null)

  // Find the current index based on activeFilter
  const selectedIndex = categoriesData.findIndex(cat => cat.id === activeFilter);

  // Custom navigation handlers ensuring selection works properly
  const handlePrevCategory = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      onFilterChange(categoriesData[newIndex].id);
      if (swiperRef.current) {
        swiperRef.current.slideTo(newIndex);
      }
    }
  };

  const handleNextCategory = () => {
    if (selectedIndex < categoriesData.length - 1) {
      const newIndex = selectedIndex + 1;
      onFilterChange(categoriesData[newIndex].id);
      if (swiperRef.current) {
        swiperRef.current.slideTo(newIndex);
      }
    }
  };

  useEffect(() => {
    function checkLayout() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const numCategories = categoriesData.length;
        // Use a representative card width for calculation (e.g., the larger min-width or an average)
        const representativeCardWidth = CARD_MIN_WIDTH_PX; 
        const totalCardsWidthRequired = 
          numCategories * representativeCardWidth + 
          (numCategories > 0 ? (numCategories - 1) * CARD_GAP_PX : 0);

        if (totalCardsWidthRequired > containerWidth && numCategories > 0) {
          setLayoutMode("scrollable");
        } else {
          setLayoutMode("centered");
        }
      }
    }

    checkLayout(); // Initial check
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, [categoriesData.length]);

  const handleCardClick = (categoryId: string, index: number) => {
    onFilterChange(categoryId);
    if (layoutMode === 'scrollable' && swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
    const isActive = category.id === activeFilter;
    
    // Create a more explicit color mapping that always returns a valid value
    const getDotColor = () => {
      switch(category.color) {
        case 'cyberpunk-blue': return 'var(--cp-blue)';
        case 'cyberpunk-pink': return 'var(--cp-pink)';
        case 'cyberpunk-green': return 'var(--cp-green)';
        case 'cyberpunk-purple-light': return 'var(--cp-purple-light)';
        case 'cyberpunk-teal': return 'var(--cp-teal)';
        case 'cyberpunk-orange': return 'var(--cp-orange)';
        // Add new colors here if needed, or rely on default
        case 'cyberpunk-blue-light': return 'var(--cp-blue-light)'; // Example for 'All'
        case 'cyberpunk-yellow': return 'var(--cp-yellow-bright)';
        case 'cyberpunk-lime': return 'var(--cp-lime)';
        case 'cyberpunk-sky': return 'var(--cp-sky)';
        case 'cyberpunk-red': return 'var(--cp-red-bright)';
        case 'cyberpunk-gold': return 'var(--cp-gold)';
        case 'cyberpunk-magenta': return 'var(--cp-magenta)';
        case 'cyberpunk-gray': return 'var(--cp-gray)';
        case 'cyberpunk-light-green': return 'var(--cp-light-green)';
        case 'cyberpunk-dark-blue': return 'var(--cp-dark-blue)';
        case 'cyberpunk-silver': return 'var(--cp-silver)';
        case 'cyberpunk-forest-green': return 'var(--cp-forest-green)';
        case 'cyberpunk-olive': return 'var(--cp-olive)';
        case 'cyberpunk-brown': return 'var(--cp-brown)';
        default: return 'var(--cp-blue)'; // Default to blue
      }
    };
    
    return (
      <motion.div
        key={category.id}
        id={category.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
        className={`relative overflow-hidden rounded-lg border-2 group transition-all
          ${layoutMode === 'centered' ? 'flex-1 basis-0 min-w-[160px] md:min-w-[180px]' : 'w-64 h-48 flex-shrink-0'} 
          ${isActive ? `border-${category.color} ring-2 ring-${category.color}/30` : 'border-gray-800'}`}
        onClick={() => handleCardClick(category.id, index)}
        style={{ cursor: 'pointer' }}
      >
        {/* Explicit indicator rendering */}
        {isActive && (
          <motion.div 
            layoutId="portfolio-active-indicator"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: getDotColor(),
              zIndex: 20,
              boxShadow: `0 0 8px ${getDotColor()}`
            }}
          />
        )}
        
        {/* Image container */}
        <div className="absolute inset-0 z-0 overflow-hidden"> 
          <img
            src={category.image || "/images/placeholder.svg"} // Now points to public Giphy URLs or via.placeholder.com
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-${category.color}`}
          ></div>
        </div>
        
        <div className="relative z-10 p-3 h-full flex flex-col justify-between pointer-events-none">
          <div>
            <h3 className={` font-heading mb-1 line-clamp-2 transition-colors duration-300
              ${isActive ? `text-${category.color}` : 'text-white group-hover:text-gray-200'}`}>
              {category.title}
            </h3>
          </div>
          <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-gray-700/40">
            <span className={`text-label-base font-emphasis transition-colors duration-300
              ${isActive ? `text-${category.color}` : `text-${category.color}/80 group-hover:text-${category.color}`}`}>
              {category.projectCount} Projects
            </span>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild onClick={(e) => { e.stopPropagation(); }} className="pointer-events-auto">
                <Info className={`h-3.5 w-3.5 transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`} />
              </TooltipTrigger>
              <TooltipContent side="top" align="end" className="bg-black border-cyberpunk-blue/30 text-white max-w-[220px] p-2.5 text-label-base shadow-xl">
                <p>{category.description}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <TooltipProvider>
      <div 
        ref={containerRef} 
        className={`relative 
          ${layoutMode === 'centered' ? 'flex flex-row gap-3 py-4 max-w-full justify-center flex-wrap' : 'py-4'}`}>
        {/* Added flex-wrap for centered layout to handle many categories */}
        {layoutMode === 'centered' ? (
          categoriesData.map((category, index) => (
            <CategoryCard category={category} index={index} key={category.id} />
          ))
        ) : (
          <>
            <Swiper
              modules={[Navigation, A11y]}
              onSwiper={(swiper) => { 
                swiperRef.current = swiper;
                // Initial slide setup
                if (selectedIndex !== -1) {
                  swiper.slideTo(selectedIndex, 0);
                }
                setTimeout(() => {
                  swiper.update();
                }, 100);
              }}
              onSlideChange={(swiper) => {
                // Update our selected category when Swiper changes slides
                if (categoriesData[swiper.activeIndex]) {
                  onFilterChange(categoriesData[swiper.activeIndex].id);
                }
              }}
              initialSlide={selectedIndex === -1 ? 0 : selectedIndex}
              loop={false}
              slidesPerView={"auto"}
              spaceBetween={16} 
              centeredSlides={false}
              grabCursor={true}
              watchSlidesProgress={true}
              preventInteractionOnTransition={false}
              allowTouchMove={true}
              updateOnWindowResize={true}
              watchOverflow={true}
              observer={true}
              observeParents={true}
              className="!px-0 !py-4 w-full"
            >
              {categoriesData.map((category, index) => (
                <SwiperSlide key={category.id} className="!w-auto !h-auto">
                  <CategoryCard category={category} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Navigation buttons - Keeping class on one line to prevent string termination errors */}
            <button 
              aria-label="Previous Category"
              className="portfolio-cat-prev absolute top-1/2 -translate-y-1/2 -left-12 md:-left-14 z-20 p-3 rounded-full bg-cyberpunk-background border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue transition-colors shadow-[0_0_10px_rgba(var(--cp-blue-rgb), 0.3)] text-white group disabled:opacity-50 disabled:pointer-events-none"
              onClick={handlePrevCategory}
              disabled={selectedIndex <= 0}
            >
              <ChevronLeft className="h-6 w-6 text-cyberpunk-blue group-hover:text-white transition-colors" />
            </button>
            <button 
              aria-label="Next Category"
              className="portfolio-cat-next absolute top-1/2 -translate-y-1/2 -right-12 md:-right-14 z-20 p-3 rounded-full bg-cyberpunk-background border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue transition-colors shadow-[0_0_10px_rgba(var(--cp-blue-rgb), 0.3)] text-white group disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleNextCategory}
              disabled={selectedIndex >= categoriesData.length - 1}
            >
              <ChevronRight className="h-6 w-6 text-cyberpunk-blue group-hover:text-white transition-colors" />
            </button>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
