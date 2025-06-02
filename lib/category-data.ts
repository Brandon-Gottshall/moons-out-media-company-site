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

import { MASTER_SERVICES } from "@/app/data/services"
/**
 * metaCategoriesData is generated from MASTER_SERVICES:
 * - All Projects: shows all
 * - Moons Out Media: services.branch === 'media'
 * - Moons Out Labs: services.branch === 'labs'
 */
export const metaCategoriesData: MetaCategory[] = [
  {
    id: "all-projects",
    title: "All Projects",
    image: "/images/Sunglasses_Animation.webp",
    color: "cyberpunk-blue",
    isGlobalAll: true,
    subCategories: [],
  },
  ...["media", "labs"].map(branch => {
    const services = MASTER_SERVICES.filter(s => s.branch === branch)
    return {
      id: branch,
      title: branch === "media" ? "Moons Out Media" : "Moons Out Labs",
      image: services[0]?.image || "",
      color: services[0]?.color || "cyberpunk-blue",
      subCategories: services.map(s => ({
        id: s.id,
        title: s.shortTitle ?? s.title,
        image: s.image,
        color: s.color,
        projectCount: 0,
      })),
    }
  }),
];