"use client";

import { motion } from "framer-motion";
import type { MetaCategory } from "@/lib/category-data";
import { Button } from "@/components/ui/button"; // Assuming you might want to use your Button component

interface MetaCategoryNavButtonsProps {
  // Filter out global "All" before passing if these buttons should only represent actual content categories
  metaCategories: MetaCategory[]; 
  onMetaCategorySelect: (metaId: string) => void;
  gallerySectionId: string; // ID of the gallery section to scroll to
}

export default function MetaCategoryNavButtons({ 
  metaCategories,
  onMetaCategorySelect,
  gallerySectionId
}: MetaCategoryNavButtonsProps) {

  const handleButtonClick = (metaId: string) => {
    onMetaCategorySelect(metaId);
    // Scroll to gallery section
    setTimeout(() => { // Timeout to allow state update and potential re-render before scroll
      const galleryElement = window.document.getElementById(gallerySectionId);
      galleryElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50); // Small delay
  };

  if (!metaCategories || metaCategories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 md:gap-4 py-2 sm:py-4 md:py-6 vh-short:py-1 vh-short:gap-1">
      {metaCategories.map((category) => {
        const color = category.color || "cyberpunk-blue"; // Fallback color
        const isGlobalAllButton = category.isGlobalAll;

        // Consistent styling for all buttons, with hover effects using their theme color
        let buttonClasses = `
          px-2 py-1.5 sm:py-1 md:px-5 md:py-2.5 vh-short:px-2 vh-short:py-1 text-xs md:text-sm vh-short:text-xs rounded-md md:rounded-lg transition-all duration-300 ease-in-out 
          font-semibold border md:border-2 vh-short:border focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-opacity-50
          bg-black/60`; // Base background

        if (isGlobalAllButton) {
          // Specific styling for "All Projects" button for better visibility
          buttonClasses += ` 
            border-cyberpunk-blue-light/70 text-cyberpunk-blue-light 
            hover:border-cyberpunk-blue-light hover:bg-black/50 hover:text-cyberpunk-blue-light 
            hover:shadow-md hover:shadow-cyberpunk-blue-light/30 
            ring-cyberpunk-blue-light/70 focus:ring-cyberpunk-blue-light`;
        } else {
          buttonClasses += ` 
            border-${color}/50 text-${color}/90 
            hover:border-${color} hover:text-${color} hover:bg-black/50 
            hover:shadow-md hover:shadow-${color}/30 
            ring-${color}/50 focus:ring-${color}`;
        }

        return (
          <Button
            key={category.id}
            variant="outline" 
            onClick={() => handleButtonClick(category.id)}
            className={buttonClasses}
          >
            {category.title}
          </Button>
        );
      })}
    </div>
  );
} 