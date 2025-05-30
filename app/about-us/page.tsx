"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AboutHero from "@/components/about/about-hero"
import TeamSection from "@/components/about/team-section"
import CoreValues from "@/components/about/core-values"
import CallToAction from "@/components/call-to-action"
// import OurStory from "@/components/about/our-story"

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("team")

  const sections = [
    // { id: "story", label: "Our Story" },
    { id: "values", label: "Core Values" },
    { id: "team", label: "Our Team" },
  ]

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  function handleSectionClick(id: string) {
    setActiveSection(id)
    const el = document.getElementById("about-tabs")
    if (el) {
      // Calculate offset to land tabs just below the fixed header
      const header = document.querySelector("header")
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black/90">
      <AboutHero
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Navigation Tabs */}
      <div id="about-tabs" className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-cyberpunk-blue/20 py-2 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center overflow-x-auto scrollbar-hide space-x-2 md:space-x-4 py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 whitespace-nowrap rounded-md transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-cyberpunk-blue/20 text-cyberpunk-blue border border-cyberpunk-blue/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        key={activeSection}
        className="container mx-auto px-4"
      >
        {/* {activeSection === "story" && <OurStory />} */}
        {activeSection === "values" && <CoreValues />}
        {activeSection === "team" && <TeamSection />}
      </motion.div>
    </div>
  )
}

