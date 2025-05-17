"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AboutHero from "@/components/about/about-hero"
import TeamSection from "@/components/about/team-section"
import OurStory from "@/components/about/our-story"
import CoreValues from "@/components/about/core-values"
import CreativeProcess from "@/components/about/creative-process"
import CallToAction from "@/components/call-to-action"

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("story")

  const sections = [
    { id: "story", label: "Our Story" },
    { id: "values", label: "Core Values" },
    { id: "team", label: "Our Team" },
    { id: "process", label: "Creative Process" },
  ]

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-black/90">
      <AboutHero />

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-cyberpunk-blue/20 py-2 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 md:space-x-4 py-2">
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
        {activeSection === "story" && <OurStory />}
        {activeSection === "values" && <CoreValues />}
        {activeSection === "team" && <TeamSection />}
        {activeSection === "process" && <CreativeProcess />}
      </motion.div>

      <CallToAction
        title="Ready to tell your story?"
        description="Let's create something extraordinary together."
        buttonText="Get in touch"
        buttonLink="/contact"
      />
    </div>
  )
}

