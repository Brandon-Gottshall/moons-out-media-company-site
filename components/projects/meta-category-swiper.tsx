"use client"

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation, A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { MetaCategory } from "@/lib/category-data"; // Import the type

// Import Swiper styles - ensure these are correctly picked up or managed globally
import "swiper/css";
import "swiper/css/navigation";

interface MetaCategorySwiperProps {
  metaCategories: MetaCategory[];
  selectedMetaCategoryId: string;
  onMetaCategorySelect: (metaId: string) => void;
  isSearchActive: boolean;
  // Consider adding layoutMode if it affects this swiper as well, or manage layout from parent
}

// Basic card structure, can be enhanced later
function MetaCategoryCard({ 
  category, 
  isSelected, 
  onSelect,
  isSearchActive
}: { 
  category: MetaCategory; 
  isSelected: boolean; 
  onSelect: () => void;
  isSearchActive: boolean;
}) {
  // const categoryColorName = category.color || 'cyberpunk-blue'; // Fallback color name

  return (
    <motion.div
      key={category.id}
      onClick={onSelect}
      className={`relative overflow-hidden rounded-lg border-2 group transition-all cursor-pointer
        w-64 ${isSearchActive ? 'h-20' : 'h-40'} flex-shrink-0 
        ${isSelected ? `border-${category.color} ring-2 ring-${category.color}/30 opacity-100` : 'border-gray-800 opacity-70 hover:opacity-100'}`}
      transition={{ duration: 0.3 }}
    >
      <img
        src={category.image || "/images/placeholder.svg"}
        alt={category.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-${category.color}`}></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h3 className={`text-body-lg font-heading line-clamp-2 transition-colors duration-300
          ${isSelected ? `text-${category.color}` : 'text-white group-hover:text-gray-100'}`}>
          {category.title}
        </h3>
      </div>
      {isSelected && (
          <motion.div 
            layoutId="meta-active-indicator" 
            // Use Tailwind class for background color
            className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full z-20 bg-${category.color}`}
            // For boxShadow, we need a real color. Using a generic bright glow or define themed shadows in Tailwind.
            // Option 1: Generic bright glow
            style={{ boxShadow: `0 0 6px var(--ui-white)` }} 
            // Option 2: If you have themed shadow color utilities in Tailwind (e.g., shadow-glow-cyberpunk-blue)
            // you could add them to className, e.g., className={`... shadow-glow-${category.color}`}
          />
        )}
    </motion.div>
  );
}

export default function MetaCategorySwiper({ 
  metaCategories, 
  selectedMetaCategoryId, 
  onMetaCategorySelect,
  isSearchActive
}: MetaCategorySwiperProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null); // Ref for the Swiper container
  const [isFitMode, setIsFitMode] = useState(false);
  const [currentTotalSlidesWidth, setCurrentTotalSlidesWidth] = useState(0);

  const selectedIndex = metaCategories.findIndex(cat => cat.id === selectedMetaCategoryId);

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const prevCategory = metaCategories[selectedIndex - 1];
      onMetaCategorySelect(prevCategory.id);
    }
  };
  const handleNext = () => {
    if (selectedIndex < metaCategories.length - 1) {
      const nextCategory = metaCategories[selectedIndex + 1];
      onMetaCategorySelect(nextCategory.id);
    }
  };

  useEffect(() => {
    if (swiperRef.current && selectedIndex !== -1) {
      if (swiperRef.current.activeIndex !== selectedIndex) {
        swiperRef.current.slideTo(selectedIndex);
      }
    }
  }, [selectedMetaCategoryId, selectedIndex, metaCategories.length]);

  useEffect(() => {
    const calculateMode = () => {
      if (swiperContainerRef.current && metaCategories.length > 0) {
        const containerWidth = swiperContainerRef.current.offsetWidth;
        const slideWidth = 256; // w-64
        const spaceBetweenSlides = 16;
        const calculatedTotalWidth = 
          metaCategories.length * slideWidth + 
          (metaCategories.length > 0 ? (metaCategories.length - 1) * spaceBetweenSlides : 0);
        
        setCurrentTotalSlidesWidth(calculatedTotalWidth);

        if (calculatedTotalWidth <= containerWidth) {
          setIsFitMode(true);
        } else {
          setIsFitMode(false);
        }
      } else if (metaCategories.length === 0) {
        setIsFitMode(false); // Or true if an empty centered swiper is desired
        setCurrentTotalSlidesWidth(0);
      }
    };

    calculateMode();
    window.addEventListener("resize", calculateMode);
    return () => window.removeEventListener("resize", calculateMode);
  }, [metaCategories, swiperContainerRef.current]); // Add swiperContainerRef.current to dependencies

  return (
    <TooltipProvider>
      <div 
        ref={swiperContainerRef}
        className={`relative py-4 ${isFitMode ? 'flex justify-center' : ''}`}
      >
        <Swiper
          modules={[Navigation, A11y]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          initialSlide={selectedIndex === -1 ? 0 : selectedIndex}
          onSlideChange={(swiper) => {
            if (metaCategories[swiper.activeIndex] && metaCategories[swiper.activeIndex].id !== selectedMetaCategoryId) {
              onMetaCategorySelect(metaCategories[swiper.activeIndex].id);
            }
          }}
          slidesPerView={"auto"}
          spaceBetween={16}
          centeredSlides={false} // Always false now
          centerInsufficientSlides={false} // Always false now
          grabCursor={true}
          watchSlidesProgress={true}
          className={`!px-0 !py-4 ${isFitMode ? '!w-auto' : '!w-full'}`}
          style={isFitMode ? { width: `${currentTotalSlidesWidth}px` } : {}}
        >
          {metaCategories.map((category) => (
            <SwiperSlide key={category.id} className="!w-auto !h-auto"> {/* Important for slidesPerView: 'auto' */}
              <MetaCategoryCard 
                category={category} 
                isSelected={category.id === selectedMetaCategoryId}
                onSelect={() => onMetaCategorySelect(category.id)}
                isSearchActive={isSearchActive}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons should still work and be visible */}
        {!isFitMode && ( // Only show nav buttons if not in fit mode (i.e., when scrollable)
          <>
            <button 
              aria-label="Previous Meta Category"
              className="portfolio-cat-prev absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-20 p-2 rounded-full bg-cyberpunk-background/70 border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue transition-colors shadow-lg text-white group disabled:opacity-30 disabled:pointer-events-none"
              onClick={handlePrev}
              disabled={selectedIndex <= 0} 
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-cyberpunk-blue group-hover:text-white transition-colors" />
            </button>
            <button 
              aria-label="Next Meta Category"
              className="portfolio-cat-next absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-20 p-2 rounded-full bg-cyberpunk-background/70 border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue transition-colors shadow-lg text-white group disabled:opacity-30 disabled:pointer-events-none"
              onClick={handleNext}
              disabled={selectedIndex >= metaCategories.length - 1} 
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-cyberpunk-blue group-hover:text-white transition-colors" />
            </button>
          </>
        )}
      </div>
    </TooltipProvider>
  );
} 