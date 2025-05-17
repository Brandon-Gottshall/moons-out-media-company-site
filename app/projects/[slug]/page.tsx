"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
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
  Video // Added for potential use in Videos tab icon
} from "lucide-react"
import CallToAction from "@/components/call-to-action"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { allPortfolioItems, type PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { notFound, useSearchParams } from "next/navigation"
import { PortfolioItemCard } from "@/components/projects/portfolio-item-card"
import MuxPlayer from '@mux/mux-player-react';

// Helper to simulate RichText rendering (replace with actual RichText renderer if you have one)
function SimpleRichText({ content }: { content?: string }) {
  if (!content) return null
  return (
    <div className="prose prose-invert prose-sm md:prose-base max-w-none text-white whitespace-pre-line leading-relaxed">
      {content.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export default function PortfolioItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params)
  const { slug } = unwrappedParams
  
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("challenge") 
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentItem = allPortfolioItems.find(item => item.slug === slug && item.status === 'published');
  const primaryVideo = currentItem?.showcaseVideos?.find(v => v.order === 1);

  if (!mounted) {
    return null
  }

  if (!currentItem) {
    notFound(); 
  }

  const displayCategory = currentItem.tags?.[0] || currentItem.industry || "Case Study";

  return (
    <div className="min-h-screen bg-cyberpunk-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-cyberpunk-background z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.15)_0%,transparent_70%)] z-20"></div>
          {primaryVideo?.muxPlaybackId ? (
            <MuxPlayer
              streamType="on-demand"
              playbackId={primaryVideo.muxPlaybackId}
              autoPlay="muted"
              className="absolute w-full h-full object-cover"
              poster={currentItem.heroImage?.url || ''}
              accentColor="#00CCFF"
            />
          ) : currentItem.heroImage && (
            <Image
              src={currentItem.heroImage.url}
              alt={currentItem.heroImage.alt}
              fill
              className="absolute w-full h-full object-cover"
              priority
            />
          )}
        </div>

        <div className="container mx-auto px-4 relative z-30">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-white hover:text-cyberpunk-blue transition-colors mb-6 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="border-b border-transparent group-hover:border-cyberpunk-blue/50">Back to Portfolio</span>
          </Link>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="outline" className="bg-cyberpunk-blue/20 text-cyberpunk-blue border-cyberpunk-blue/30 mb-4">
                {displayCategory}
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">{currentItem.title}</h1>
              <p className="text-xl text-cyberpunk-pink mb-6">Client: {currentItem.clientName}</p>
              {currentItem.summary && (
                <p className="text-base md:text-xl text-white mb-8 max-w-3xl bg-black/30 backdrop-blur-sm p-4 rounded-md border border-gray-800/50">
                  {currentItem.summary}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {currentItem.callToAction && currentItem.callToAction.ctaType === 'external' && (!primaryVideo || currentItem.callToAction.ctaUrl !== `https://stream.mux.com/${primaryVideo.muxPlaybackId}.m3u8`) && (
                   <Link href={currentItem.callToAction.ctaUrl} target="_blank" rel="noopener noreferrer">
                     <Button className="cyberpunk-button">
                       {currentItem.callToAction.ctaLabel || 'View Project'} <ExternalLink className="ml-2 h-4 w-4" />
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
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-cyberpunk-pink text-sm mb-2">Scroll for details</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="h-6 w-6 text-cyberpunk-pink" />
          </motion.div>
        </motion.div>
      </section>

      {/* Project Quick Stats - Adapted for PortfolioItem */}
      <section className="py-8 border-y border-gray-800/50 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentItem.projectYear && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-cyberpunk-blue" />
                <div>
                  <p className="text-sm text-gray-400">Year</p>
                  <p className="text-white font-medium">{currentItem.projectYear}</p>
                </div>
              </div>
            )}
            {currentItem.industry && (
              <div className="flex items-center space-x-3">
                <Briefcase className="h-8 w-8 text-cyberpunk-pink" />
                <div>
                  <p className="text-sm text-gray-400">Industry</p>
                  <p className="text-white font-medium">{currentItem.industry}</p>
                </div>
              </div>
            )}
            {currentItem.servicesRendered && currentItem.servicesRendered.length > 0 && (
              <div className="flex items-center space-x-3">
                <Tag className="h-8 w-8 text-cyberpunk-green" />
                <div>
                  <p className="text-sm text-gray-400">Key Service</p>
                  {/* Display first service, or join them. For simplicity, first one. */}
                  <p className="text-white font-medium">{currentItem.servicesRendered[0]}</p>
                </div>
              </div>
            )}
             {currentItem.metrics && currentItem.metrics.length > 0 && (
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-cyberpunk-gold" />
                <div>
                  <p className="text-sm text-gray-400">Key Metric</p>
                  <p className="text-white font-medium">
                    {currentItem.metrics[0].metricLabel}: {currentItem.metrics[0].metricValue} {currentItem.metrics[0].metricChange || ''}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Details Tabs */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex overflow-x-auto space-x-1 sm:space-x-2 mb-8 pb-2 border-b border-gray-800/50">
                <button
                  className={`px-3 py-2 whitespace-nowrap font-medium text-sm sm:text-base ${
                    activeTab === "challenge"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("challenge")}
                >
                  <Target className="inline h-4 w-4 mr-1.5 sm:mr-2" /> Challenge
                </button>
                <button
                  className={`px-3 py-2 whitespace-nowrap font-medium text-sm sm:text-base ${
                    activeTab === "solution"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("solution")}
                >
                  <Lightbulb className="inline h-4 w-4 mr-1.5 sm:mr-2" /> Solution
                </button>
                <button
                  className={`px-3 py-2 whitespace-nowrap font-medium text-sm sm:text-base ${
                    activeTab === "results"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("results")}
                >
                 <BarChart2 className="inline h-4 w-4 mr-1.5 sm:mr-2" /> Results
                </button>
                {currentItem.galleryImages && currentItem.galleryImages.length > 0 && (
                  <button
                    className={`px-3 py-2 whitespace-nowrap font-medium text-sm sm:text-base ${
                      activeTab === "gallery"
                        ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("gallery")}
                  >
                    <Camera className="inline h-4 w-4 mr-1.5 sm:mr-2" /> Gallery
                  </button>
                )}
                {currentItem.showcaseVideos && currentItem.showcaseVideos.length > 0 && (
                  <button
                    className={`px-3 py-2 whitespace-nowrap font-medium text-sm sm:text-base ${
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

              <AnimatePresence mode="wait">
                {activeTab === "challenge" && (
                  <motion.div key="challenge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Challenge</h2>
                    <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 md:p-8 mb-8">
                      <SimpleRichText content={currentItem.challenge} />
                    </div>
                  </motion.div>
                )}

                {activeTab === "solution" && (
                  <motion.div key="solution" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Solution</h2>
                    <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 md:p-8 mb-8">
                      <SimpleRichText content={currentItem.solution} />
                    </div>
                    {currentItem.keyFeatures && currentItem.keyFeatures.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Key Features Delivered</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentItem.keyFeatures.map((feature, index) => (
                            <div key={index} className="bg-black/50 border border-gray-700/70 p-4 rounded-md">
                              {feature.featureIcon && <Lightbulb className="h-6 w-6 text-cyberpunk-blue mb-2" />}
                              <h4 className="font-bold text-white mb-1">{feature.featureTitle}</h4>
                              <p className="text-sm text-gray-300">{feature.featureDescription}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "results" && (
                  <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Project Results</h2>
                    <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 md:p-8 mb-8">
                      <SimpleRichText content={currentItem.results} />
                    </div>
                    {currentItem.metrics && currentItem.metrics.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {currentItem.metrics.map((metric, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-black/50 border border-gray-700/70 rounded-lg p-4 text-center flex flex-col justify-center items-center"
                          >
                            <p className="text-2xl font-bold text-cyberpunk-green">{metric.metricValue}</p>
                            <p className="text-sm text-white mt-1">{metric.metricLabel}</p>
                            {metric.metricChange && <p className="text-xs text-gray-400">({metric.metricChange})</p>}
                            {metric.metricDescription && <p className="text-xs text-gray-500 mt-1">{metric.metricDescription}</p>}
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {currentItem.testimonial && (
                      <div className="bg-black/70 backdrop-blur-sm border border-cyberpunk-pink/30 rounded-lg p-6 md:p-8 mb-8">
                        {currentItem.testimonial.authorImage && (
                          <Image 
                            src={currentItem.testimonial.authorImage.url} 
                            alt={currentItem.testimonial.authorImage.alt} 
                            width={60} height={60} 
                            className="rounded-full mx-auto mb-4 border-2 border-cyberpunk-pink" />
                        )}
                        <blockquote className="text-lg italic text-white mb-4 text-center">"{currentItem.testimonial.quote}"</blockquote>
                        <div className="text-center">
                          <p className="font-bold text-white">{currentItem.testimonial.authorName}</p>
                          {currentItem.testimonial.authorTitle && <p className="text-sm text-gray-400">{currentItem.testimonial.authorTitle}</p>}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "gallery" && currentItem.galleryImages && currentItem.galleryImages.length > 0 && (
                  <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Project Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                      {currentItem.galleryImages.map((galleryItem, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative overflow-hidden rounded-lg border border-gray-800/50 aspect-video"
                        >
                          <Image
                            src={galleryItem.image.url}
                            alt={galleryItem.caption || `Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {galleryItem.caption && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                              <p className="text-white text-sm">{galleryItem.caption}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "videos" && currentItem.showcaseVideos && currentItem.showcaseVideos.length > 0 && (
                  <motion.div key="videos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Showcase Videos</h2>
                    <div className="space-y-8">
                      {currentItem.showcaseVideos.map((video, index) => (
                        <div key={video.muxPlaybackId || index} className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg overflow-hidden shadow-lg">
                          {video.title && <h3 className="text-xl font-semibold p-4 text-white bg-black/30">{video.title}</h3>}
                          <div className="aspect-video bg-black">
                            <MuxPlayer
                              streamType="on-demand"
                              playbackId={video.muxPlaybackId}
                              className="w-full h-full"
                              title={video.title || currentItem.title}
                              accentColor="#00CCFF"
                              poster={video.thumbnailUrl || currentItem.heroImage?.url || ''}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Details */}
            <div className="lg:sticky top-24 self-start">
              <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6 text-white">Project At a Glance</h3>
                <div className="space-y-5 mb-6">
                  <div>
                    <p className="text-sm text-gray-400 flex items-center"><Briefcase className="h-4 w-4 mr-2 text-cyberpunk-blue"/> Client</p>
                    <p className="text-white mt-1">{currentItem.clientName}</p>
                  </div>
                  {currentItem.projectYear && (
                    <div>
                      <p className="text-sm text-gray-400 flex items-center"><Calendar className="h-4 w-4 mr-2 text-cyberpunk-blue"/> Year</p>
                      <p className="text-white mt-1">{currentItem.projectYear}</p>
                    </div>
                  )}
                  {currentItem.industry && (
                    <div>
                      <p className="text-sm text-gray-400 flex items-center"><Tag className="h-4 w-4 mr-2 text-cyberpunk-blue"/> Industry</p>
                      <p className="text-white mt-1">{currentItem.industry}</p>
                    </div>
                  )}
                </div>

                {currentItem.servicesRendered && currentItem.servicesRendered.length > 0 && (
                  <>
                    <h4 className="text-lg font-medium mb-3 text-white">Services Provided</h4>
                    <ul className="space-y-2 mb-6">
                      {currentItem.servicesRendered.map((service, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-green mr-2 mt-1">✓</span>
                          <span className="text-white capitalize">{service.replace(/-/g, ' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {currentItem.tags && currentItem.tags.length > 0 && (
                  <>
                    <h4 className="text-lg font-medium mb-3 text-white">Project Tags</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentItem.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-gray-700/50 text-gray-300">{tag}</Badge>
                        ))}
                    </div>
                  </>
                )}

                <Link href="/contact">
                  <Button className="w-full cyberpunk-button mb-3">
                    Discuss Your Project
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="w-full border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10"
                  >
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects - Simplified for now */}
      {/* This would ideally fetch related items based on tags or services */}
      {/* For now, it will show the first 2 items from the main list, excluding the current one */}
      {((): PortfolioItem[] => {
        const related = allPortfolioItems.filter(p => p.slug !== slug && p.status === 'published').slice(0, 2);
        if (related.length === 0) return []; // Ensure it returns empty array if no related items found
        return related;
      })().length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-cyberpunk-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">Other Projects You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {allPortfolioItems
                .filter(p => p.slug !== slug && p.status === 'published')
                .slice(0, 2)
                .map((relatedItem, index) => (
                  <PortfolioItemCard key={relatedItem.slug} item={relatedItem} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction />
    </div>
  )
}

