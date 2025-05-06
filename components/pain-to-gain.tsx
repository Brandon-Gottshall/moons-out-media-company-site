"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

type PainPoint = {
  id: number
  title: string
  description: string
  icon: string
  solution: {
    title: string
    description: string
    results: string[]
    caseStudyLink: string
  }
}

const painPoints: PainPoint[] = [
  {
    id: 1,
    title: "Generic Content",
    description: "Your marketing content looks the same as everyone else's, failing to differentiate your brand.",
    icon: "🤖",
    solution: {
      title: "Authentic Storytelling",
      description:
        "We create documentary-style content that captures your unique brand story and connects with your audience on an emotional level.",
      results: [
        "43% increase in audience engagement",
        "2.7x longer view time compared to industry average",
        "87% of viewers reported stronger brand connection",
      ],
      caseStudyLink: "/case-studies/authentic-storytelling",
    },
  },
  {
    id: 2,
    title: "Low Engagement",
    description: "Your content isn't resonating with your audience, resulting in poor engagement metrics.",
    icon: "📉",
    solution: {
      title: "Emotional Narrative",
      description:
        "We craft compelling narratives that evoke emotion and inspire action, keeping your audience engaged from start to finish.",
      results: [
        "68% increase in social sharing",
        "3.2x higher comment rate on campaign content",
        "52% increase in conversion from engaged viewers",
      ],
      caseStudyLink: "/case-studies/emotional-narrative",
    },
  },
  {
    id: 3,
    title: "Inconsistent Results",
    description: "Your marketing efforts produce unpredictable results, making it difficult to plan and scale.",
    icon: "🎲",
    solution: {
      title: "Data-Driven Creativity",
      description:
        "We combine creative storytelling with data-driven insights to create content that consistently delivers measurable results.",
      results: [
        "41% reduction in cost per acquisition",
        "2.3x ROI improvement over previous campaigns",
        "Predictable growth pattern established over 6-month period",
      ],
      caseStudyLink: "/case-studies/data-driven-creativity",
    },
  },
  {
    id: 4,
    title: "Disconnect with Audience",
    description: "Your brand message isn't resonating with your target audience, creating a disconnect.",
    icon: "🔌",
    solution: {
      title: "Audience-Centric Approach",
      description:
        "We deeply research your audience to create content that speaks directly to their needs, desires, and pain points.",
      results: [
        "76% of surveyed customers felt content 'spoke directly to them'",
        "3.8x increase in qualified leads",
        "47% improvement in customer retention metrics",
      ],
      caseStudyLink: "/case-studies/audience-centric-approach",
    },
  },
]

export default function PainToGain() {
  const [activePain, setActivePain] = useState<PainPoint>(painPoints[0])
  const [showSolution, setShowSolution] = useState(false)

  const handlePainClick = (pain: PainPoint) => {
    if (activePain.id === pain.id) {
      setShowSolution(!showSolution)
    } else {
      setActivePain(pain)
      setShowSolution(true)
    }
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Solution Details - Left Column */}
        <div className="md:w-1/2 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePain.id}-${showSolution ? "solution" : "pain"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-cyberpunk-pink/20 text-cyberpunk-pink mb-3">
                  {showSolution ? "Solution" : "Challenge"}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {showSolution ? activePain.solution.title : activePain.title}
                </h3>
              </div>

              <div className="bg-black/40 p-5 rounded-lg mb-6">
                <p className="text-white text-lg leading-relaxed">
                  {showSolution ? activePain.solution.description : activePain.description}
                </p>
              </div>

              {showSolution && (
                <>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-cyberpunk-blue mb-4">Measurable Results:</h4>
                    <ul className="space-y-3">
                      {activePain.solution.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-green mr-2 text-lg">✓</span>
                          <span className="text-white">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="cyberpunk-button"
                    onClick={() => (window.location.href = activePain.solution.caseStudyLink)}
                  >
                    View Case Study
                  </Button>
                </>
              )}

              {!showSolution && (
                <Button className="cyberpunk-button" onClick={() => setShowSolution(true)}>
                  Discover Our Solution
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Challenge Selection - Right Column */}
        <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold text-white">Common Challenges</h3>
            <p className="text-gray-400 text-sm mt-1">Select a challenge to see our solution</p>
          </div>

          <div className="divide-y divide-gray-800">
            {painPoints.map((pain) => (
              <button
                key={pain.id}
                className={`w-full text-left p-6 transition-colors ${
                  activePain.id === pain.id
                    ? "bg-black/70 border-r-4 border-cyberpunk-pink"
                    : "hover:bg-black/40 border-r-4 border-transparent"
                }`}
                onClick={() => handlePainClick(pain)}
              >
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{pain.icon}</div>
                  <div>
                    <h4
                      className={`text-lg font-medium ${
                        activePain.id === pain.id ? "text-cyberpunk-pink" : "text-white"
                      }`}
                    >
                      {pain.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{pain.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

