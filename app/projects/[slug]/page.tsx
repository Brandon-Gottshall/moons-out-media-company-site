"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  ChevronDown,
  Calendar,
  Clock,
  Tag,
  Award,
  Briefcase, // For services
  Target, // For Challenge
  Lightbulb, // For Solution
  BarChart2, // For Results
  Camera, // For Gallery
  Video, // Added for potential use in Videos tab icon
} from "lucide-react";
import CallToAction from "@/components/call-to-action";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  allPortfolioItems,
  type PortfolioItem,
} from "@/lib/placeholder-data/portfolio-items";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { notFound, useSearchParams } from "next/navigation";
import { PortfolioItemCard } from "@/components/projects/portfolio-item-card";
import MuxPlayer from "@mux/mux-player-react";

// Helper to simulate RichText rendering (replace with actual RichText renderer if you have one)
function SimpleRichText({ content }: { content?: string }) {
  if (!content) return null;
  return (
    <div className="prose prose-invert prose-sm md:prose-base max-w-none text-white whitespace-pre-line leading-relaxed">
      {content.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

// Helper to map orientation to correct aspect ratio class
function getAspectClass(orientation?: string) {
  switch (orientation) {
    case 'portrait':
    case 'tall':
      return 'aspect-[9/16]';
    case 'square':
      return 'aspect-square';
    case 'landscape':
    default:
      return 'aspect-video'; // 16:9 landscape
  }
}

export default function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  const searchParams = useSearchParams();

  const currentItem = allPortfolioItems.find(
    (item) => item.slug === slug && item.status === "published"
  );
  const validShowcaseVideos =
    currentItem?.showcaseVideos?.filter(
      (v) => !v.muxPlaybackId.startsWith("TODO")
    ) || [];
  const primaryVideo = validShowcaseVideos.find((v) => v.order === 1);

  // Initialize with a stable default to prevent hydration mismatch
  const [activeTab, setActiveTab] = useState("challenge");
  const [mounted, setMounted] = useState(false);

  // Generate stable playerInitTime to prevent hydration mismatch
  const playerInitTime = 0;

  // Calculate available tabs after component mounts to prevent hydration issues
  useEffect(() => {
    if (!currentItem) return;
    
    const getInitialTab = () => {
      if (currentItem.challenge || currentItem.solution) return "challenge";
      if (currentItem.results) return "results";
      if (currentItem.galleryImages && currentItem.galleryImages.length > 0) return "gallery";
      if (validShowcaseVideos.length > 0) return "videos";
      return "challenge";
    };
    
    setActiveTab(getInitialTab());
    setMounted(true);
  }, [currentItem, validShowcaseVideos.length]);

  if (!currentItem) {
    notFound();
    return null;
  }

  // Calculate available tabs for rendering (after early return)
  const availableTabs = [
    ...(currentItem.challenge || currentItem.solution ? ["challenge"] : []),
    ...(currentItem.results ? ["results"] : []),
    ...(currentItem.galleryImages && currentItem.galleryImages.length > 0 ? ["gallery"] : []),
    ...(validShowcaseVideos.length > 0 ? ["videos"] : [])
  ];

  const displayCategory =
    currentItem.tags?.[0] || currentItem.industry || "Case Study";

  // Get the correct aspect ratio class for this item's orientation
  const heroAspectClass = getAspectClass(currentItem.orientation);

  return (
    <>
      <style jsx global>{`
        mux-player {
          --media-object-fit: cover;
          --media-object-position: center;
          /* Remove mux default aspect so our wrapper owns sizing */
          aspect-ratio: auto !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
      <div className="min-h-screen bg-cyberpunk-background">
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-cyberpunk-background z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.15)_0%,transparent_70%)] z-20"></div>

          <div className="container pl-24 pr-4 relative z-30 w-1/2">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-white hover:text-cyberpunk-blue transition-colors mb-6 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="border-b border-transparent group-hover:border-cyberpunk-blue/50">
                Back to Portfolio
              </span>
            </Link>

            <div className="max-w-4xl">
              <div>
                <Badge
                  variant="outline"
                  className="bg-cyberpunk-blue/20 text-cyberpunk-blue border-cyberpunk-blue/30 mb-4"
                >
                  {displayCategory}
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading mb-4 text-white">
                  {currentItem.title}
                </h1>
                <p className="text-heading-md text-cyberpunk-pink mb-6">
                  Client: {currentItem.clientName}
                </p>
                {currentItem.summary && (
                  <p className=" md:text-heading-md text-white mb-8 max-w-3xl bg-black/30 backdrop-blur-sm p-4 rounded-md border border-gray-800/50">
                    {currentItem.summary}
                  </p>
                )}

                <div className="flex flex-wrap gap-4">
                  {currentItem.callToAction &&
                    currentItem.callToAction.ctaType === "external" &&
                    (!primaryVideo ||
                      currentItem.callToAction.ctaUrl !==
                        `https://stream.mux.com/${primaryVideo.muxPlaybackId}.m3u8`) && (
                      <Link
                        href={currentItem.callToAction.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="cyberpunk-button">
                          {currentItem.callToAction.ctaLabel || "View Project"}{" "}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10"
                    >
                      Start Your Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center z-50">
            <span className="text-cyberpunk-pink text-body-sm mb-2">
              Scroll for details
            </span>
            <div>
              <ChevronDown className="h-6 w-6 text-cyberpunk-pink" />
            </div>
          </div>

          {/* Hero Video / Image Container - Orientation-aware aspect ratio from first paint */}
          <div className="z-30 mx-auto py-8 w-full max-w-4xl px-4 md:px-8">
            {primaryVideo?.muxPlaybackId ? (
              <div className={`relative w-full ${currentItem.orientation === 'portrait' || currentItem.orientation === 'tall' ? 'max-w-sm' : 'max-w-4xl'} mx-auto ${heroAspectClass} ${heroAspectClass === 'aspect-video' ? 'min-h-[400px]' : ''} overflow-hidden rounded-lg bg-black`}>
                {/* Debug: Show what orientation we're using */}
                <div className="absolute top-2 left-2 text-xs text-white bg-red-600/70 px-2 py-1 rounded z-10">
                  HERO: {currentItem.orientation} → {heroAspectClass}
                </div>
                <MuxPlayer
                  playerInitTime={playerInitTime}
                  streamType="on-demand"
                  playbackId={primaryVideo.muxPlaybackId}
                  autoPlay
                  muted
                  maxResolution="1080p"
                  minResolution="1080p"
                  className="absolute inset-0 w-full h-1/3"
                  style={{ width: '100%' }}
                  poster={currentItem.heroImage?.url || ""}
                  accentColor="#00CCFF"
                  storyboardSrc=""
                  envKey={process.env.NEXT_PUBLIC_MUX_DATA_ENV_KEY}
                />
              </div>
            ) : currentItem.heroImage ? (
              <div className={`relative w-full ${currentItem.orientation === 'portrait' || currentItem.orientation === 'tall' ? 'max-w-sm' : 'max-w-4xl'} mx-auto ${heroAspectClass} overflow-hidden rounded-lg bg-black`}>
                <Image
                  src={currentItem.heroImage.url}
                  alt={currentItem.heroImage.alt}
                  fill
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            ) : (
              // Placeholder with correct aspect ratio
              <div className={`w-full ${currentItem.orientation === 'portrait' || currentItem.orientation === 'tall' ? 'max-w-sm' : 'max-w-4xl'} mx-auto ${heroAspectClass} bg-gray-900/50 rounded-lg`} />
            )}
          </div>
        </section>

        {/* Project Details Tabs */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                {/* Only render tabs after mounting to prevent hydration mismatch */}
                {mounted && (
                  <div className="flex overflow-x-auto space-x-1 sm:space-x-2 mb-8 pb-2 border-b border-gray-800/50">
                    {(currentItem.challenge || currentItem.solution) && (
                      <button
                        className={`px-3 py-2 whitespace-nowrap font-emphasis text-body-sm sm:text-body-base ${
                          activeTab === "challenge"
                            ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                            : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("challenge")}
                      >
                        <Target className="inline h-4 w-4 mr-1.5 sm:mr-2" />{" "}
                        Challenge & Solution
                      </button>
                    )}
                    {currentItem.results && (
                      <button
                        className={`px-3 py-2 whitespace-nowrap font-emphasis text-body-sm sm:text-body-base ${
                          activeTab === "results"
                            ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                            : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("results")}
                      >
                        <BarChart2 className="inline h-4 w-4 mr-1.5 sm:mr-2" />{" "}
                        Results
                      </button>
                    )}
                    {currentItem.galleryImages &&
                      currentItem.galleryImages.length > 0 && (
                        <button
                          className={`px-3 py-2 whitespace-nowrap font-emphasis text-body-sm sm:text-body-base ${
                            activeTab === "gallery"
                              ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setActiveTab("gallery")}
                        >
                          <Camera className="inline h-4 w-4 mr-1.5 sm:mr-2" />{" "}
                          Gallery
                        </button>
                      )}
                    {validShowcaseVideos.length > 0 && (
                      <button
                        className={`px-3 py-2 whitespace-nowrap font-emphasis text-body-sm sm:text-body-base ${
                          activeTab === "videos"
                            ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                            : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("videos")}
                      >
                        <Video className="inline h-4 w-4 mr-1.5 sm:mr-2" /> Videos
                      </button>
                    )}
                  </div>
                )}

                <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === "challenge" &&
                    (currentItem.challenge || currentItem.solution) && (
                      <div key="challenge">
                        {currentItem.challenge && (
                          <>
                          <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white">
                            The Challenge
                          </h2>
                          <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 md:p-8 mb-8">
                            <SimpleRichText content={currentItem.challenge} />
                          </div>
                          </>
                        )}
                        {currentItem.solution && (
                          <>
                            <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white">
                              Our Solution
                            </h2>
                            <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 md:p-8 mb-8">
                              <SimpleRichText content={currentItem.solution} />
                            </div>
                          </>
                        )}
                        {currentItem.keyFeatures &&
                          currentItem.keyFeatures.length > 0 && (
                            <div className="mb-8">
                              <h3 className="text-heading-md md:text-2xl font-subheading mb-4 text-white">
                                Key Features Delivered
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentItem.keyFeatures.map((feature, index) => (
                                  <div
                                    key={index}
                                    className="bg-black/50 border border-gray-700/70 p-4 rounded-md"
                                  >
                                    {feature.featureIcon && (
                                      <Lightbulb className="h-6 w-6 text-cyberpunk-blue mb-2" />
                                    )}
                                    <h4 className="font-heading text-white mb-1">
                                      {feature.featureTitle}
                                    </h4>
                                    <p className="text-body-sm text-gray-300">
                                      {feature.featureDescription}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                  {activeTab === "results" && currentItem.results && (
                    <div key="results">
                      <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white">
                        Project Results
                      </h2>
                      <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 md:p-8 mb-8">
                        <SimpleRichText content={currentItem.results} />
                      </div>
                      {currentItem.metrics && currentItem.metrics.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          {currentItem.metrics.map((metric, index) => (
                            <div
                              key={index}
                              className="bg-black/50 border border-gray-700/70 rounded-lg p-4 text-center flex flex-col justify-center items-center"
                            >
                              <p className="text-2xl font-heading text-cyberpunk-green">
                                {metric.metricValue}
                              </p>
                              <p className="text-body-sm text-white mt-1">
                                {metric.metricLabel}
                              </p>
                              {metric.metricChange && (
                                <p className="text-label-base text-gray-400">
                                  ({metric.metricChange})
                                </p>
                              )}
                              {metric.metricDescription && (
                                <p className="text-label-base text-gray-500 mt-1">
                                  {metric.metricDescription}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {currentItem.testimonial && (
                        <div className="bg-black/70 backdrop-blur-sm border border-cyberpunk-pink/30 rounded-lg p-6 md:p-8 mb-8">
                          {currentItem.testimonial.authorImage && (
                            <Image
                              src={currentItem.testimonial.authorImage.url}
                              alt={currentItem.testimonial.authorImage.alt}
                              width={60}
                              height={60}
                              className="rounded-full mx-auto mb-4 border-2 border-cyberpunk-pink"
                            />
                          )}
                          <blockquote className="text-body-lg italic text-white mb-4 text-center">
                            "{currentItem.testimonial.quote}"
                          </blockquote>
                          <div className="text-center">
                            <p className="font-heading text-white">
                              {currentItem.testimonial.authorName}
                            </p>
                            {currentItem.testimonial.authorTitle && (
                              <p className="text-body-sm text-gray-400">
                                {currentItem.testimonial.authorTitle}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "gallery" &&
                    currentItem.galleryImages &&
                    currentItem.galleryImages.length > 0 && (
                      <div key="gallery">
                        <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white">
                          Project Gallery
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                          {currentItem.galleryImages.map((galleryItem, index) => (
                            <div
                              key={index}
                              className="group relative overflow-hidden rounded-lg border border-gray-800/50 aspect-video"
                            >
                              <Image
                                src={galleryItem.image.url}
                                alt={
                                  galleryItem.caption ||
                                  `Gallery image ${index + 1}`
                                }
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {galleryItem.caption && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                                  <p className="text-white text-body-sm">
                                    {galleryItem.caption}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {activeTab === "videos" && validShowcaseVideos.length > 0 && (
                    <div key="videos">
                      <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white">
                        Showcase Videos
                      </h2>
                      <div className="space-y-8">
                        {validShowcaseVideos.map((video, index) => (
                          <div
                            key={video.muxPlaybackId || index}
                            className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg overflow-hidden shadow-lg max-w-fit"
                          > 
                            <div className="relative mx-auto bg-black rounded-lg overflow-hidden" style={{ maxWidth: '400px'}}>
                              <MuxPlayer
                                playerInitTime={playerInitTime}
                                streamType="on-demand"
                                playbackId={video.muxPlaybackId}
                                maxResolution="1080p"
                                minResolution="1080p"
                                className="w-full h-auto"
                                style={{ objectFit: 'contain' }}
                                title={video.title || currentItem.title}
                                accentColor="#00CCFF"
                                poster={video.thumbnailUrl || currentItem.heroImage?.url || ""}
                                storyboardSrc=""
                                envKey={process.env.NEXT_PUBLIC_MUX_DATA_ENV_KEY}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects - Simplified for now */}
        {/* This would ideally fetch related items based on tags or services */}
        {/* For now, it will show the first 2 items from the main list, excluding the current one */}
        {((): PortfolioItem[] => {
          const related = allPortfolioItems
            .filter((p) => p.slug !== slug && p.status === "published")
            .slice(0, 2);
          if (related.length === 0) return []; // Ensure it returns empty array if no related items found
          return related;
        })().length > 0 && (
          <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-cyberpunk-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-heading mb-8 text-white text-center">
                Other Projects You Might Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {allPortfolioItems
                  .filter((p) => p.slug !== slug && p.status === "published")
                  .slice(0, 2)
                  .map((relatedItem, index) => (
                    <PortfolioItemCard
                      key={relatedItem.slug}
                      item={relatedItem}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          </section>
        )}

        <CallToAction />
      </div>
    </>
  );
}
