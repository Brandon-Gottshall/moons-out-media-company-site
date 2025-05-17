export interface Service {
  id: string;
  branch: string;
  title: string; // Main title, potentially longer for showcase
  shortTitle?: string; // Optional: For contexts like homepage cards
  description: string; // Detailed description for showcase
  shortDescription?: string; // Optional: Concise description for homepage cards
  icon?: string; // Emoji or SVG path, used on homepage
  color: string; // Theme color (e.g., "pink", "purple") used by both
  features: string[]; // List of features for showcase
  image: string; // Path to image for showcase
  caseStudyLink: string; // URL to case study
} 