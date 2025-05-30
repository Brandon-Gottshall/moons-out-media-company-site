"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

type SuccessStory = {
  id: number
  year: string
  client: string
  industry: string
  title: string
  description: string
  metrics: {
    label: string
    value: string
    change: string
  }[]
  image: string
  caseStudyLink: string
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    year: "2020",
    client: "EcoTech Innovations",
    industry: "Sustainable Technology",
    title: "Documenting Sustainable Innovation",
    description:
      "Created a documentary series showcasing EcoTech's revolutionary sustainable technologies and their real-world impact.",
    metrics: [
      { label: "Brand Awareness", value: "87%", change: "+42%" },
      { label: "Investor Interest", value: "$12M", change: "+156%" },
      { label: "New Partnerships", value: "14", change: "+250%" },
    ],
    image: "/images/placeholder.svg?height=400&width=600",
    caseStudyLink: "/projects/ecotech-innovations-documentary",
  },
  {
    id: 2,
    year: "2021",
    client: "Urban Fitness",
    industry: "Health & Wellness",
    title: "Authentic Fitness Journey",
    description:
      "Developed a social media campaign featuring real customer transformation stories that resonated deeply with the target audience.",
    metrics: [
      { label: "Membership Growth", value: "10,500", change: "+73%" },
      { label: "Social Engagement", value: "1.2M", change: "+215%" },
      { label: "Retention Rate", value: "92%", change: "+24%" },
    ],
    image: "/images/placeholder.svg?height=400&width=600",
    caseStudyLink: "/projects/urban-fitness-transformation",
  },
  {
    id: 3,
    year: "2022",
    client: "Artisan Collective",
    industry: "Handcrafted Goods",
    title: "Craftsmanship Storytelling",
    description:
      "Produced a series of intimate artisan profiles that showcased the craftsmanship, passion, and stories behind each handmade product.",
    metrics: [
      { label: "E-commerce Sales", value: "$1.8M", change: "+94%" },
      { label: "Average Order Value", value: "$120", change: "+35%" },
      { label: "Customer Loyalty", value: "78%", change: "+47%" },
    ],
    image: "/images/placeholder.svg?height=400&width=600",
    caseStudyLink: "/projects/artisan-collective-showcase",
  },
  {
    id: 4,
    year: "2023",
    client: "TechStart Inc.",
    industry: "Software & Technology",
    title: "Humanizing Technology",
    description:
      "Created a campaign that translated complex technology into relatable human stories, showcasing real-world impact and applications.",
    metrics: [
      { label: "Lead Generation", value: "8,700", change: "+128%" },
      { label: "Conversion Rate", value: "12.4%", change: "+86%" },
      { label: "Market Share", value: "23%", change: "+15%" },
    ],
    image: "/images/placeholder.svg?height=400&width=600",
    caseStudyLink: "/projects/techstart-growth-engine",
  },
]

export default function ClientSuccessTimeline() {
  const router = useRouter()
  const [activeStory, setActiveStory] = useState<SuccessStory>(successStories[0])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  // Mobile-friendly approach - use state instead of scroll position for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth < 768) return

      const container = containerRef.current
      const containerTop = container.getBoundingClientRect().top
      const containerHeight = container.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate which story should be active based on scroll position
      const scrollProgress = (windowHeight - containerTop) / (containerHeight + windowHeight)
      const storyIndex = Math.min(
        Math.max(Math.floor(scrollProgress * successStories.length), 0),
        successStories.length - 1,
      )

      setActiveStory(successStories[storyIndex])
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline for desktop */}
      <div className="hidden md:block">
        <motion.div
          style={{ opacity }}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyberpunk-blue via-cyberpunk-pink to-cyberpunk-green"
        ></motion.div>

        <div className="space-y-32">
          {successStories.map((story, index) => {
            const isActive = activeStory.id === story.id
            const isLeft = index % 2 === 0

            return (
              <div
                key={story.id}
                className={`relative ${isLeft ? "ml-auto mr-[50%]" : "ml-[50%]"} w-full max-w-[45%] ${isActive ? "z-10" : "z-0"}`}
              >
                <div
                  className={`absolute top-1/2 ${isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"} -translate-y-1/2 w-6 h-6 rounded-full border-2 ${isActive ? "border-cyberpunk-blue bg-cyberpunk-blue/30 animate-pulse-glow" : "border-gray-600 bg-gray-800"}`}
                ></div>

                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`p-6 rounded-lg ${
                    isActive
                      ? "bg-black/80 backdrop-blur-md border border-cyberpunk-blue/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                      : "bg-black/60 border border-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-body-sm font-emphasis mb-2 ${isActive ? "bg-cyberpunk-blue/20 text-cyberpunk-blue" : "bg-gray-800 text-gray-400"}`}
                      >
                        {story.year}
                      </span>
                      <h3 className={`text-heading-md font-heading ${isActive ? "text-white" : "text-gray-400"}`}>
                        {story.client}
                      </h3>
                      <p className={`text-body-sm ${isActive ? "text-cyberpunk-pink" : "text-gray-500"}`}>
                        {story.industry}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyberpunk-blue to-cyberpunk-purple flex items-center justify-center">
                        <span className="text-white font-heading">{index + 1}</span>
                      </div>
                    )}
                  </div>

                  {isActive && (
                    <>
                      <div className="mb-4 overflow-hidden rounded-md">
                        <img
                          src={story.image || "/images/placeholder.svg"}
                          alt={story.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      <h4 className="text-body-lg font-subheading text-white mb-2">{story.title}</h4>
                      <p className="text-white mb-4">{story.description}</p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {story.metrics.map((metric, idx) => (
                          <div key={idx} className="bg-black/50 p-3 rounded-md text-center">
                            <p className="text-body-lg font-heading text-white">{metric.value}</p>
                            <p className="text-label-base text-white">{metric.label}</p>
                            <p className="text-label-base text-cyberpunk-green">{metric.change}</p>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full cyberpunk-button" onClick={() => router.push(story.caseStudyLink)}>
                        View Case Study <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {!isActive && (
                    <>
                      <h4 className="text-body-lg font-subheading text-gray-300 mb-2">{story.title}</h4>
                      <p className="text-gray-400 line-clamp-2">{story.description}</p>
                    </>
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile version - card-based layout */}
      <div className="md:hidden space-y-6">
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-cyberpunk-blue/30 mb-6">
          <p className="text-white text-center">Swipe through our success stories</p>
        </div>

        {successStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-black/80 backdrop-blur-sm border border-cyberpunk-blue/30 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-4 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-body-sm font-emphasis bg-cyberpunk-blue/20 text-cyberpunk-blue">
                  {story.year}
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyberpunk-blue to-cyberpunk-purple flex items-center justify-center">
                  <span className="text-white font-heading">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-heading-md font-heading text-white mt-2">{story.client}</h3>
              <p className="text-body-sm text-cyberpunk-pink">{story.industry}</p>
            </div>

            <div className="overflow-hidden">
              <img src={story.image || "/images/placeholder.svg"} alt={story.title} className="w-full h-40 object-cover" />
            </div>

            <div className="p-4">
              <h4 className="text-body-lg font-subheading text-white mb-2">{story.title}</h4>
              <p className="text-white mb-4 text-body-sm">{story.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {story.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-black/50 p-2 rounded-md text-center">
                    <p className=" font-heading text-white">{metric.value}</p>
                    <p className="text-label-base text-white">{metric.label}</p>
                    <p className="text-label-base text-cyberpunk-green">{metric.change}</p>
                  </div>
                ))}
              </div>

              <Button className="w-full cyberpunk-button text-body-sm py-2" onClick={() => router.push(story.caseStudyLink)}>
                View Case Study <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

