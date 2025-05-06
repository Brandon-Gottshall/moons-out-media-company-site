"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Play, ChevronDown, Calendar, Clock, Tag, Award } from "lucide-react"
import CallToAction from "@/components/call-to-action"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setMounted(true)
  }, [])

  // In a real app, you would fetch the project data based on the slug
  const project = {
    id: params.slug,
    title: "Sustainable Innovation Documentary",
    client: "EcoTech Innovations",
    category: "Documentary",
    description:
      "A documentary series showcasing EcoTech's revolutionary sustainable technologies and their real-world impact on communities and the environment.",
    fullDescription: `
      This five-part documentary series follows the journey of EcoTech Innovations as they develop and deploy sustainable technologies in communities around the world. 
      
      Our team spent six months capturing the stories of the engineers, community members, and environmental experts involved in these groundbreaking projects. The result is a compelling narrative that not only showcases the technology but also the human impact and environmental benefits.
      
      The series was distributed across multiple platforms, including the client's website, social media channels, and select streaming services, reaching a global audience and significantly increasing brand awareness and investor interest.
    `,
    challenge: `
      EcoTech Innovations faced a significant challenge: their groundbreaking sustainable technologies were revolutionary, but highly technical and difficult for the average person to understand. This created barriers to adoption and investment.
      
      Additionally, they needed to demonstrate the real-world impact of their solutions beyond technical specifications and data points. The human stories and environmental benefits were getting lost in technical presentations.
    `,
    approach: `
      We took a documentary-style approach that focused on the human stories behind the technology. Our strategy included:
      
      1. **Narrative-Driven Storytelling**: Following the journey from concept to implementation
      2. **Character Development**: Highlighting the engineers, community members, and environmental experts
      3. **Visual Demonstration**: Using cinematic techniques to visualize complex technical concepts
      4. **Emotional Connection**: Capturing authentic moments of impact and transformation
      5. **Multi-Platform Distribution**: Creating versions optimized for different channels and audiences
    `,
    image: "/images/project1.png",
    year: "2023",
    duration: "5-part series, 25 minutes per episode",
    services: ["Documentary Production", "Storytelling Strategy", "Distribution Planning"],
    technologies: ["RED Cinema Cameras", "Drone Cinematography", "4K HDR Production", "Dolby Atmos Sound"],
    team: ["Alex Chen - Director", "Sarah Johnson - Producer", "Michael Wong - Cinematographer", "Lisa Park - Editor"],
    results: [
      { label: "Brand Awareness", value: "87%", change: "+42%" },
      { label: "Investor Interest", value: "$12M", change: "+156%" },
      { label: "New Partnerships", value: "14", change: "+250%" },
      { label: "Audience Engagement", value: "3.2M", change: "+320%" },
    ],
    testimonial: {
      quote:
        "Moons Out Media transformed our brand story into a compelling documentary that not only showcased our technology but the human impact behind it. The results were immediate—increased engagement, deeper customer connections, and a significant boost in investor interest.",
      author: "Alex Johnson",
      position: "Marketing Director, EcoTech Innovations",
    },
    relatedProjects: [
      { id: "urban-fitness-campaign", title: "Fitness Transformation Campaign", image: "/images/project2.png" },
      { id: "techstart-impact", title: "Tech Impact Stories", image: "/images/project4.png" },
    ],
    gallery: [
      { image: "/images/project1.png", caption: "Behind the scenes with EcoTech engineers" },
      { image: "/images/project2.png", caption: "Community implementation in rural areas" },
      { image: "/images/project3.png", caption: "Interview with environmental experts" },
      { image: "/images/project4.png", caption: "Technology demonstration" },
    ],
  }

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="min-h-screen bg-cyberpunk-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-cyberpunk-background z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.15)_0%,transparent_70%)] z-20"></div>
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="absolute w-full h-full object-cover"
          />
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
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyberpunk-blue/20 text-cyberpunk-blue mb-4">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">{project.title}</h1>
              <p className="text-xl text-cyberpunk-pink mb-6">Client: {project.client}</p>
              <p className="text-base md:text-xl text-white mb-8 max-w-3xl bg-black/30 backdrop-blur-sm p-4 rounded-md border border-gray-800/50">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="cyberpunk-button" onClick={() => setIsVideoModalOpen(true)}>
                  <Play className="mr-2 h-4 w-4" /> Watch Trailer
                </Button>
                <Button
                  variant="outline"
                  className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Start Your Project
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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

      {/* Project Quick Stats */}
      <section className="py-8 border-y border-gray-800/50 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-cyberpunk-blue" />
              <div>
                <p className="text-sm text-gray-400">Year</p>
                <p className="text-white font-medium">{project.year}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-cyberpunk-pink" />
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-white font-medium">5-Part Series</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Tag className="h-8 w-8 text-cyberpunk-green" />
              <div>
                <p className="text-sm text-gray-400">Category</p>
                <p className="text-white font-medium">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-cyberpunk-gold" />
              <div>
                <p className="text-sm text-gray-400">Recognition</p>
                <p className="text-white font-medium">Industry Award Finalist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tabs Navigation */}
              <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 border-b border-gray-800/50">
                <button
                  className={`px-4 py-2 whitespace-nowrap ${
                    activeTab === "overview"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${
                    activeTab === "challenge"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("challenge")}
                >
                  Challenge
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${
                    activeTab === "approach"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("approach")}
                >
                  Our Approach
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${
                    activeTab === "results"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("results")}
                >
                  Results
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${
                    activeTab === "gallery"
                      ? "text-cyberpunk-blue border-b-2 border-cyberpunk-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  Gallery
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">About the Project</h2>
                    <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 mb-8">
                      <p className="text-white whitespace-pre-line leading-relaxed">{project.fullDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">Technologies Used</h3>
                        <ul className="space-y-2">
                          {project.technologies.map((tech, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-cyberpunk-blue mr-2">•</span>
                              <span className="text-white">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">Team</h3>
                        <ul className="space-y-2">
                          {project.team.map((member, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-cyberpunk-pink mr-2">•</span>
                              <span className="text-white">{member}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "challenge" && (
                  <motion.div
                    key="challenge"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Challenge</h2>
                    <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 mb-8">
                      <p className="text-white whitespace-pre-line leading-relaxed">{project.challenge}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "approach" && (
                  <motion.div
                    key="approach"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Approach</h2>
                    <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 mb-8">
                      <p className="text-white whitespace-pre-line leading-relaxed">{project.approach}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Project Results</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {project.results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 text-center"
                        >
                          <p className="text-2xl font-bold text-white">{result.value}</p>
                          <p className="text-sm text-white">{result.label}</p>
                          <p className="text-xs text-cyberpunk-green">{result.change}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-black/60 backdrop-blur-sm border border-cyberpunk-pink/30 rounded-lg p-6 mb-8">
                      <blockquote className="text-lg italic text-white mb-4">"{project.testimonial.quote}"</blockquote>
                      <div className="flex items-center">
                        <div className="mr-4 w-12 h-12 bg-cyberpunk-pink/20 rounded-full flex items-center justify-center">
                          <span className="text-cyberpunk-pink text-xl font-bold">
                            {project.testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-white">{project.testimonial.author}</p>
                          <p className="text-sm text-gray-400">{project.testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "gallery" && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {project.gallery.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative overflow-hidden rounded-lg border border-gray-800/50"
                        >
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.caption}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                            <p className="p-4 text-white">{item.caption}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-white">Project Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Client</p>
                    <p className="text-white">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Year</p>
                    <p className="text-white">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="text-white">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-white">{project.duration}</p>
                  </div>
                </div>

                <h4 className="text-lg font-medium mb-2 text-white">Services Provided</h4>
                <ul className="space-y-2 mb-6">
                  {project.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-cyberpunk-green mr-2">✓</span>
                      <span className="text-white">{service}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full cyberpunk-button mb-3" onClick={() => (window.location.href = "/contact")}>
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10"
                  onClick={() => (window.location.href = "/services")}
                >
                  Explore Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-cyberpunk-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">Related Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {project.relatedProjects.map((relatedProject, index) => (
              <motion.div
                key={relatedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg overflow-hidden group hover:border-cyberpunk-blue/50 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={relatedProject.image || "/placeholder.svg"}
                    alt={relatedProject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-4">{relatedProject.title}</h3>
                  <Button
                    className="w-full cyberpunk-button"
                    onClick={() => (window.location.href = `/portfolio/${relatedProject.id}`)}
                  >
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-cyberpunk-background border border-cyberpunk-blue/30 rounded-lg w-full max-w-5xl overflow-hidden"
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="aspect-video bg-black">
                <img
                  src="/images/project1.png"
                  alt="EcoTech Innovations Documentary"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-50" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

