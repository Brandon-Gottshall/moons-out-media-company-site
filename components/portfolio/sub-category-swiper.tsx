"use client"

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation, A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { SubCategory } from "@/lib/category-data"; // Import the type

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface SubCategorySwiperProps {
  subCategories: SubCategory[];
  activeGalleryFilterId: string; // To know which sub-category is selected (or the meta's "All")
  onSubCategorySelect: (subId: string) => void;
  metaCategoryColor?: string; // Optional: to theme the swiper or cards to parent meta-category
}

function SubCategoryCard({ 
  category, 
  isSelected, 
  onSelect,
  metaColor
}: { 
  category: SubCategory; 
  isSelected: boolean; 
  onSelect: () => void; 
  metaColor?: string;
}) {
  const borderColor = isSelected ? (category.color || metaColor || "cyberpunk-blue") : "gray-800";
  const ringColor = category.color || metaColor || "cyberpunk-blue";
  const dotColorName = category.color || metaColor || "cyberpunk-blue"; // Color name for Tailwind class

  return (
    <motion.div
      key={category.id}
      onClick={onSelect}
      className={`relative overflow-hidden rounded-lg border-2 group transition-all cursor-pointer
        w-56 h-36 flex-shrink-0  // Slightly smaller than meta cards
        border-${borderColor} ${isSelected ? `ring-2 ring-${ringColor}/30` : ''}`}
      transition={{ duration: 0.3 }}
    >
      <img
        src={category.image || "/placeholder.svg"}
        alt={category.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-${category.color || metaColor}`}></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2.5 z-10">
        <h4 className={`text-sm font-semibold line-clamp-2 transition-colors duration-300
          ${isSelected ? `text-${category.color || metaColor}` : 'text-white group-hover:text-gray-200'}`}>
          {category.title}
        </h4>
      </div>
      {isSelected && (
          <motion.div 
            layoutId="sub-active-indicator" 
            // Use Tailwind class for background color
            className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full z-20 bg-${dotColorName}`}
            // Generic bright glow for boxShadow
            style={{ boxShadow: `0 0 5px #fff` }} 
          />
        )}
    </motion.div>
  );
}

export default function SubCategorySwiper({ 
  subCategories, 
  activeGalleryFilterId, // This prop tells us which sub-category is currently selected
  onSubCategorySelect,
  metaCategoryColor = "cyberpunk-blue"
}: SubCategorySwiperProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null); // Ref for the Swiper container
  const [isFitMode, setIsFitMode] = useState(false);
  const [currentTotalSlidesWidth, setCurrentTotalSlidesWidth] = useState(0);

  const selectedIndex = subCategories.findIndex(cat => cat.id === activeGalleryFilterId);

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const prevCategory = subCategories[selectedIndex - 1];
      onSubCategorySelect(prevCategory.id);
    }
  };
  const handleNext = () => {
    if (selectedIndex < subCategories.length - 1) {
      const nextCategory = subCategories[selectedIndex + 1];
      onSubCategorySelect(nextCategory.id);
    }
  };

  useEffect(() => {
    if (swiperRef.current && selectedIndex !== -1) {
      // Check if swiper is not already at the target index
      if (swiperRef.current.activeIndex !== selectedIndex) {
        swiperRef.current.slideTo(selectedIndex);
      }
    }
    // Also, if subCategories array itself changes (meaning a new meta-category was selected),
    // and the currently activeGalleryFilterId (which might be from a *previous* set of subCategories)
    // isn't found in the new list, we should probably default to selecting the first subCategory (the "All" for the meta)
    // This is implicitly handled if the parent component sets activeGalleryFilterId to the new meta's "All" 
    // when a meta category changes, which it does.
  }, [activeGalleryFilterId, selectedIndex, subCategories]); // Depend on activeGalleryFilterId and subCategories

  useEffect(() => {
    const calculateMode = () => {
      if (swiperContainerRef.current && subCategories.length > 0) {
        const containerWidth = swiperContainerRef.current.offsetWidth;
        const slideWidth = 224; // w-56
        const spaceBetweenSlides = 12;
        const calculatedTotalWidth = 
          subCategories.length * slideWidth + 
          (subCategories.length > 0 ? (subCategories.length - 1) * spaceBetweenSlides : 0);

        setCurrentTotalSlidesWidth(calculatedTotalWidth);

        if (calculatedTotalWidth <= containerWidth) {
          setIsFitMode(true);
        } else {
          setIsFitMode(false);
        }
      } else if (subCategories.length === 0) {
        setIsFitMode(false);
        setCurrentTotalSlidesWidth(0);
      }
    };

    calculateMode();
    // Ensure swiperContainerRef.current is stable or included in deps if it can change
    // For now, assuming it's stable after initial render of the div
    window.addEventListener("resize", calculateMode);
    return () => window.removeEventListener("resize", calculateMode);
  }, [subCategories, swiperContainerRef.current]); // Add swiperContainerRef.current to dependencies

  const swiperVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  if (!subCategories || subCategories.length === 0) {
    return null; 
  }

  return (
    <TooltipProvider>
      <motion.div 
        ref={swiperContainerRef} // Ref moved to the motion.div which is the actual container
        variants={swiperVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`relative py-3 mt-2 mb-4 border-t-2 border-b-2 border-dashed border-gray-700/50 ${isFitMode ? 'flex justify-center' : ''}`}
        style={{borderColor: metaCategoryColor ? `${metaCategoryColor}33` : '#4B556366'}} 
      >
        <Swiper
          modules={[Navigation, A11y]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          initialSlide={selectedIndex === -1 ? 0 : selectedIndex}
          onSlideChange={(swiper) => {
            if (subCategories[swiper.activeIndex] && subCategories[swiper.activeIndex].id !== activeGalleryFilterId) {
              onSubCategorySelect(subCategories[swiper.activeIndex].id);
            }
          }}
          slidesPerView={"auto"}
          spaceBetween={12}
          centeredSlides={false} // Always false
          centerInsufficientSlides={false} // Always false
          grabCursor={true}
          watchSlidesProgress={true}
          className={`!px-0 !py-3 ${isFitMode ? '!w-auto' : '!w-full'}`}
          style={isFitMode ? { width: `${currentTotalSlidesWidth}px` } : {}}
        >
          {subCategories.map((category) => (
            <SwiperSlide key={category.id} className="!w-auto !h-auto">
              <SubCategoryCard 
                category={category} 
                isSelected={category.id === activeGalleryFilterId}
                onSelect={() => onSubCategorySelect(category.id)}
                metaColor={metaCategoryColor}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isFitMode && (
          <>
            <button 
              aria-label="Previous Sub-Category"
              className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 z-10 p-1.5 rounded-full bg-black/50 border border-gray-600 hover:border-gray-400 transition-colors text-white group disabled:opacity-30 disabled:pointer-events-none"
              onClick={handlePrev}
              disabled={selectedIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <button 
              aria-label="Next Sub-Category"
              className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 z-10 p-1.5 rounded-full bg-black/50 border border-gray-600 hover:border-gray-400 transition-colors text-white group disabled:opacity-30 disabled:pointer-events-none"
              onClick={handleNext}
              disabled={selectedIndex >= subCategories.length - 1}
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
          </>
        )}
      </motion.div>
    </TooltipProvider>
  );
} 