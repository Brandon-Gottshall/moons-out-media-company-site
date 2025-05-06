"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, X } from "lucide-react"

type Question = {
  id: number
  text: string
  options: {
    id: string
    text: string
    value: string
  }[]
}

type Result = {
  id: string
  title: string
  description: string
  serviceType: string
  caseStudyLink: string
  image: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "What's your primary goal with content marketing?",
    options: [
      { id: "1a", text: "Increase brand awareness", value: "awareness" },
      { id: "1b", text: "Drive more conversions", value: "conversion" },
      { id: "1c", text: "Build deeper audience connections", value: "connection" },
      { id: "1d", text: "Establish industry authority", value: "authority" },
    ],
  },
  {
    id: 2,
    text: "Which best describes your current content strategy?",
    options: [
      { id: "2a", text: "We have high-quality content but low engagement", value: "engagement" },
      { id: "2b", text: "Our content is similar to competitors", value: "differentiation" },
      { id: "2c", text: "We struggle to consistently produce content", value: "consistency" },
      { id: "2d", text: "Our content doesn't convert well", value: "conversion" },
    ],
  },
  {
    id: 3,
    text: "What type of storytelling resonates most with your audience?",
    options: [
      { id: "3a", text: "Emotional, human-centered stories", value: "emotional" },
      { id: "3b", text: "Data-driven, educational content", value: "educational" },
      { id: "3c", text: "Behind-the-scenes, authentic content", value: "authentic" },
      { id: "3d", text: "Aspirational, visionary content", value: "aspirational" },
    ],
  },
  {
    id: 4,
    text: "What's your biggest challenge with video content?",
    options: [
      { id: "4a", text: "Creating professional-quality production", value: "quality" },
      { id: "4b", text: "Telling a compelling story", value: "storytelling" },
      { id: "4c", text: "Measuring ROI and effectiveness", value: "measurement" },
      { id: "4d", text: "Maintaining consistent output", value: "consistency" },
    ],
  },
]

const results: Result[] = [
  {
    id: "documentary",
    title: "Documentary-Style Brand Storytelling",
    description:
      "Your brand would benefit from our documentary-style approach that captures authentic moments and creates emotional connections with your audience.",
    serviceType: "Documentary Production",
    caseStudyLink: "/case-studies/documentary-storytelling",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "campaign",
    title: "Conversion-Focused Campaign",
    description:
      "Based on your goals, we recommend a strategic campaign that combines storytelling with data-driven optimization to drive measurable conversions.",
    serviceType: "Digital Ad Campaigns",
    caseStudyLink: "/case-studies/conversion-campaigns",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "social",
    title: "Authentic Social Media Content",
    description:
      "Your brand would thrive with our authentic social media approach that builds community and drives consistent engagement.",
    serviceType: "Social Media Marketing",
    caseStudyLink: "/case-studies/social-media-storytelling",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "series",
    title: "Educational Content Series",
    description:
      "We recommend an educational content series that establishes your authority while providing valuable insights to your audience.",
    serviceType: "Brand Storytelling",
    caseStudyLink: "/case-studies/educational-series",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function StoryMatchmaker() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<Result | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const handleStart = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
  }

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Determine result based on answers
      const resultId = determineResult(answers)
      setResult(results.find((r) => r.id === resultId) || results[0])
    }
  }

  const determineResult = (answers: Record<number, string>): string => {
    // Simple algorithm to determine the best match based on answers
    const valueCount: Record<string, number> = {}

    Object.values(answers).forEach((value) => {
      valueCount[value] = (valueCount[value] || 0) + 1
    })

    if (valueCount["emotional"] >= 2 || valueCount["authentic"] >= 2) {
      return "documentary"
    } else if (valueCount["conversion"] >= 2 || valueCount["measurement"] >= 2) {
      return "campaign"
    } else if (valueCount["engagement"] >= 2 || valueCount["consistency"] >= 2) {
      return "social"
    } else {
      return "series"
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-cyberpunk-blue/30 overflow-hidden">
        {!isStarted ? (
          <div className="p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Find Your Perfect Story</h3>
            <div className="bg-black/40 p-6 rounded-lg mb-6">
              <p className="text-white text-lg leading-relaxed">
                Take our quick quiz to discover which storytelling approach will best elevate your brand and connect
                with your audience.
              </p>
            </div>
            <Button
              className="cyberpunk-button py-6 text-base hover:shadow-glow-blue transition-all duration-300"
              onClick={handleStart}
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="p-10">
            {!result ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-white">Story Matchmaker</h3>
                  <div className="flex items-center">
                    {questions.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: index === currentQuestion ? 1.2 : 1,
                          backgroundColor:
                            index === currentQuestion
                              ? "rgb(0, 255, 255)"
                              : index < currentQuestion
                                ? "rgb(0, 255, 127)"
                                : "rgb(75, 85, 99)",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-3 h-3 rounded-full mx-1`}
                      ></motion.div>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-black/40 p-6 rounded-lg mb-6">
                      <h4 className="text-xl font-medium text-white mb-4">{questions[currentQuestion].text}</h4>
                    </div>

                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option) => (
                        <motion.button
                          key={option.id}
                          className={`w-full p-5 rounded-lg bg-black/50 border ${
                            hoveredOption === option.id ? "border-cyberpunk-blue shadow-glow-blue" : "border-gray-700"
                          } text-left transition-all duration-300 flex justify-between items-center group`}
                          onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                          onMouseEnter={() => setHoveredOption(option.id)}
                          onMouseLeave={() => setHoveredOption(null)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-white text-lg">{option.text}</span>
                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{
                              x: hoveredOption === option.id ? 0 : -10,
                              opacity: hoveredOption === option.id ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-5 w-5 text-cyberpunk-blue" />
                          </motion.div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Your Perfect Match</h3>
                  <div className="bg-black/40 p-6 rounded-lg">
                    <p className="text-white text-lg leading-relaxed">
                      Based on your responses, we've found the ideal storytelling approach for your brand.
                    </p>
                  </div>
                </div>

                <div className="bg-black/70 rounded-lg border border-cyberpunk-pink/30 overflow-hidden mb-8">
                  <div className="aspect-video relative">
                    <img
                      src={result.image || "/placeholder.svg"}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-8">
                        <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-cyberpunk-blue/30 text-cyberpunk-blue mb-3">
                          {result.serviceType}
                        </span>
                        <h4 className="text-2xl font-bold text-white">{result.title}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="bg-black/40 p-6 rounded-lg mb-8">
                      <p className="text-white text-lg leading-relaxed">{result.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button
                        className="cyberpunk-button py-6 text-base hover:shadow-glow-blue transition-all duration-300"
                        onClick={() => (window.location.href = result.caseStudyLink)}
                      >
                        View Case Study
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 py-6 text-base hover:shadow-glow-blue transition-all duration-300"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white py-6 text-base hover:bg-red-900/20 transition-all duration-300"
                    onClick={resetQuiz}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5 mr-2" /> Retake Quiz
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white py-6 text-base hover:bg-green-900/20 transition-all duration-300"
                    onClick={() => (window.location.href = "/services")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Check className="h-5 w-5 mr-2" /> Explore All Services
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

