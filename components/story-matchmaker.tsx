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
    scores: Record<string, number>
  }[]
}

type ServiceCategory = {
  id: string
  title: string
  description: string
  serviceType: string
  caseStudyLink: string
  image: string
}

type Result = ServiceCategory & {
  score?: number
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "documentary",
    title: "Authentic Story Telling Brand Storytelling",
    description:
      "Our authentic story telling approach captures authentic moments and creates emotional connections with your audience, perfect for brands looking to build depth and trust.",
    serviceType: "Narrative Driven Production",
    caseStudyLink: "/projects/documentary-storytelling",
    image: "/images/placeholder.svg?height=300&width=500&text=DocuStory",
  },
  {
    id: "digital-ads",
    title: "Conversion-Focused Ad Campaigns",
    description:
      "We craft strategic ad campaigns that combine compelling storytelling with data-driven optimization to drive measurable conversions and maximize your ROI.",
    serviceType: "Digital Ad Campaigns",
    caseStudyLink: "/projects/conversion-campaigns",
    image: "/images/placeholder.svg?height=300&width=500&text=AdCampaigns",
  },
  {
    id: "social-media",
    title: "Authentic Social Media Engagement",
    description:
      "Your brand can thrive with our authentic social media approach, building a strong community and driving consistent engagement through genuine interaction.",
    serviceType: "Social Media Marketing",
    caseStudyLink: "/projects/social-media-strategy",
    image: "/images/placeholder.svg?height=300&width=500&text=SocialMedia",
  },
  {
    id: "web-apps",
    title: "Custom Web Application Development",
    description:
      "Need a bespoke web application or a high-performance landing page? We build tailored digital experiences that are both functional and engaging.",
    serviceType: "Web Development",
    caseStudyLink: "/projects/custom-web-applications",
    image: "/images/placeholder.svg?height=300&width=500&text=WebApps",
  },
  {
    id: "ai-automation",
    title: "AI & Automation Solutions",
    description:
      "Leverage the power of AI and automation to streamline your processes, gain insights, and create innovative solutions for your business challenges.",
    serviceType: "AI & Automation",
    caseStudyLink: "/projects/ai-driven-automation",
    image: "/images/placeholder.svg?height=300&width=500&text=AI+Automation",
  },
  {
    id: "cloud-devops",
    title: "Enterprise Cloud & DevOps",
    description:
      "Build a scalable and resilient infrastructure with our enterprise-grade DevOps and cloud solutions, ensuring your technology foundation is robust and future-proof.",
    serviceType: "Cloud & DevOps",
    caseStudyLink: "/projects/enterprise-cloud-devops",
    image: "/images/placeholder.svg?height=300&width=500&text=CloudDevOps",
  },
]

const questions: Question[] = [
  {
    id: 1,
    text: "What's your primary goal with content marketing?",
    options: [
      { id: "1a", text: "Increase brand awareness", value: "awareness", scores: { "documentary": 2, "digital-ads": 1, "social-media": 2, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "1b", text: "Drive more conversions", value: "conversion_goal", scores: { "documentary": 0, "digital-ads": 2, "social-media": 1, "web-apps": 1, "ai-automation": 1, "cloud-devops": 0 } },
      { id: "1c", text: "Build deeper audience connections", value: "connection", scores: { "documentary": 2, "digital-ads": 0, "social-media": 2, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "1d", text: "Establish industry authority", value: "authority", scores: { "documentary": 1, "digital-ads": 1, "social-media": 1, "web-apps": 1, "ai-automation": 1, "cloud-devops": 0 } },
    ],
  },
  {
    id: 2,
    text: "Which best describes your current content strategy?",
    options: [
      { id: "2a", text: "High-quality content but low engagement", value: "engagement_issue", scores: { "documentary": 1, "digital-ads": 1, "social-media": 2, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "2b", text: "Content is too similar to competitors", value: "differentiation_issue", scores: { "documentary": 2, "digital-ads": 1, "social-media": 1, "web-apps": 0, "ai-automation": 1, "cloud-devops": 0 } },
      { id: "2c", text: "Struggle to consistently produce content", value: "consistency_issue", scores: { "documentary": 0, "digital-ads": 0, "social-media": 2, "web-apps": 0, "ai-automation": 1, "cloud-devops": 1 } },
      { id: "2d", text: "Content doesn't convert well", value: "conversion_issue", scores: { "documentary": 0, "digital-ads": 2, "social-media": 1, "web-apps": 1, "ai-automation": 0, "cloud-devops": 0 } },
    ],
  },
  {
    id: 3,
    text: "What type of storytelling resonates most with your audience?",
    options: [
      { id: "3a", text: "Emotional, human-centered stories", value: "emotional", scores: { "documentary": 2, "digital-ads": 1, "social-media": 1, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "3b", text: "Data-driven, educational content", value: "educational", scores: { "documentary": 1, "digital-ads": 2, "social-media": 1, "web-apps": 1, "ai-automation": 1, "cloud-devops": 0 } },
      { id: "3c", text: "Behind-the-scenes, authentic content", value: "authentic", scores: { "documentary": 2, "digital-ads": 0, "social-media": 2, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "3d", text: "Aspirational, visionary content", value: "aspirational", scores: { "documentary": 1, "digital-ads": 1, "social-media": 0, "web-apps": 0, "ai-automation": 1, "cloud-devops": 0 } },
    ],
  },
  {
    id: 4,
    text: "What's your biggest challenge with video content?",
    options: [
      { id: "4a", text: "Creating professional-quality production", value: "quality_video", scores: { "documentary": 2, "digital-ads": 1, "social-media": 1, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "4b", text: "Telling a compelling story", value: "storytelling_video", scores: { "documentary": 2, "digital-ads": 1, "social-media": 1, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "4c", text: "Measuring ROI and effectiveness", value: "measurement_video", scores: { "documentary": 1, "digital-ads": 2, "social-media": 1, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
      { id: "4d", text: "Maintaining consistent output", value: "consistency_video", scores: { "documentary": 1, "digital-ads": 1, "social-media": 2, "web-apps": 0, "ai-automation": 1, "cloud-devops": 0 } },
    ],
  },
  {
    id: 5,
    text: "What kind of digital solution are you primarily looking for? (Select all that apply)",
    options: [
        { id: "5a", text: "A simple landing page or informational website", value: "simple_website", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 2, "ai-automation": 0, "cloud-devops": 0 } },
        { id: "5b", text: "A complex web application with custom features", value: "complex_webapp", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 2, "ai-automation": 1, "cloud-devops": 1 } },
        { id: "5c", text: "Automation for repetitive tasks or processes", value: "automation_need", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 1, "ai-automation": 2, "cloud-devops": 1 } },
        { id: "5d", text: "Improving our cloud infrastructure or DevOps practices", value: "devops_need", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 0, "ai-automation": 1, "cloud-devops": 2 } },
    ]
  },
  {
    id: 6,
    text: "How important is cutting-edge technology (like AI) to your project? (Select all that apply)",
    options: [
        { id: "6a", text: "Very important, we want to be innovative", value: "ai_very_important", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 1, "ai-automation": 2, "cloud-devops": 1 } },
        { id: "6b", text: "Somewhat important, if it solves a problem", value: "ai_somewhat_important", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 1, "ai-automation": 1, "cloud-devops": 0 } },
        { id: "6c", text: "Not a primary focus right now", value: "ai_not_focus", scores: { "documentary": 0, "digital-ads": 0, "social-media": 0, "web-apps": 0, "ai-automation": 0, "cloud-devops": 0 } },
    ]
  }
]

export default function StoryMatchmaker() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [recommendedServices, setRecommendedServices] = useState<Result[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const handleStart = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendedServices([])
  }

  const handleAnswer = (questionId: number, optionValue: string) => {
    setAnswers(prevAnswers => {
      const currentSelections = prevAnswers[questionId] || []
      const newSelections = currentSelections.includes(optionValue)
        ? currentSelections.filter(val => val !== optionValue)
        : [...currentSelections, optionValue]
      return { ...prevAnswers, [questionId]: newSelections }
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleShowResults = () => {
    const finalRecommendations = calculateAndRankRecommendations(answers)
    setRecommendedServices(finalRecommendations)
  }

  const calculateAndRankRecommendations = (currentAnswers: Record<number, string[]>): Result[] => {
    const scores: Record<string, number> = {}
    serviceCategories.forEach(sc => scores[sc.id] = 0)

    for (const questionIdStr in currentAnswers) {
      const questionId = parseInt(questionIdStr)
      const selectedValues = currentAnswers[questionId]
      const question = questions.find(q => q.id === questionId)

      if (question && selectedValues) {
        selectedValues.forEach(selectedValue => {
          const option = question.options.find(opt => opt.value === selectedValue)
          if (option && option.scores) {
            for (const serviceId in option.scores) {
              scores[serviceId] = (scores[serviceId] || 0) + option.scores[serviceId]
            }
          }
        })
      }
    }

    let recommendations: Result[] = serviceCategories.map(sc => ({
      ...sc,
      score: scores[sc.id] || 0,
    }))

    const MIN_SCORE = 3
    let filteredRecommendations = recommendations.filter(r => r.score && r.score >= MIN_SCORE)

    if (filteredRecommendations.length < 2) {
      const sortedByScore = [...recommendations].sort((a, b) => (b.score || 0) - (a.score || 0))
      const topN = sortedByScore.slice(0, Math.max(2, filteredRecommendations.length))
      filteredRecommendations = topN.filter(r => r.score && r.score > 0)
      if (filteredRecommendations.length === 0 && recommendations.some(r => r.score && r.score > 0)) {
         filteredRecommendations = sortedByScore.filter(r => r.score && r.score > 0).slice(0,1);
      }
    } else {
      filteredRecommendations.sort((a, b) => (b.score || 0) - (a.score || 0))
    }
    
    return filteredRecommendations.slice(0, 3)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendedServices([])
  }

  const isOptionSelected = (questionId: number, optionValue: string): boolean => {
    return !!answers[questionId]?.includes(optionValue)
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
                with your audience. Select all options that apply for each question.
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
            {recommendedServices.length === 0 ? (
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
                              : answers[questions[index]?.id]?.length > 0
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
                    {currentQuestion === 0 && (
                      <div className="mb-6 p-4 bg-cyberpunk-blue/10 border border-cyberpunk-blue/30 rounded-lg text-center">
                        <p className="text-cyberpunk-blue font-medium">
                          Feel free to select multiple options for each question to best describe your needs!
                        </p>
                      </div>
                    )}
                    <div className="bg-black/40 p-6 rounded-lg mb-6">
                      <h4 className="text-xl font-medium text-white mb-4">{questions[currentQuestion].text}</h4>
                    </div>

                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option) => {
                        const selected = isOptionSelected(questions[currentQuestion].id, option.value)
                        return (
                          <motion.button
                            key={option.id}
                            className={`w-full p-5 rounded-lg bg-black/50 border ${selected ? "border-cyberpunk-pink shadow-glow-pink scale-105" : hoveredOption === option.id ? "border-cyberpunk-blue shadow-glow-blue" : "border-gray-700"} text-left transition-all duration-300 flex justify-between items-center group`}
                            onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                            onMouseEnter={() => setHoveredOption(option.id)}
                            onMouseLeave={() => setHoveredOption(null)}
                            whileHover={{ scale: selected ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-white text-lg">{option.text}</span>
                            <div className="flex items-center">
                              {selected && <Check className="h-5 w-5 text-cyberpunk-pink mr-2" />}
                              <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{
                                  x: hoveredOption === option.id || selected ? 0 : -10,
                                  opacity: hoveredOption === option.id || selected ? 1 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ArrowRight className="h-5 w-5 text-cyberpunk-blue" />
                              </motion.div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                    <div className="mt-8 flex justify-end">
                      {currentQuestion < questions.length - 1 ? (
                        <Button 
                          className="cyberpunk-button py-3 text-base hover:shadow-glow-blue transition-all duration-300"
                          onClick={handleNextQuestion}
                          disabled={!(answers[questions[currentQuestion].id]?.length > 0)}
                        >
                          Next Question <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      ) : (
                        <Button 
                          className="cyberpunk-button-pink py-3 text-base hover:shadow-glow-pink transition-all duration-300"
                          onClick={handleShowResults}
                          disabled={!(answers[questions[currentQuestion].id]?.length > 0)}
                        >
                          See My Matches <Check className="ml-2 h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Your Perfect Matches</h3>
                  <div className="bg-black/40 p-6 rounded-lg">
                    <p className="text-white text-lg leading-relaxed">
                      {`You've unlocked ${recommendedServices.length} recommended service${recommendedServices.length === 1 ? '' : 's'}! Based on your responses, here's what we think will best suit your brand:`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {recommendedServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-black/70 rounded-lg border ${
                        index === 0 ? "border-cyberpunk-pink/50 shadow-glow-pink" : "border-cyberpunk-blue/30"
                      } overflow-hidden flex flex-col`}
                    >
                      <div className="aspect-video relative">
                        <img
                          src={service.image || "/images/placeholder.svg"}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                          <div className="p-4 md:p-6">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyberpunk-blue/30 text-cyberpunk-blue mb-2">
                              {service.serviceType} (Score: {service.score})
                            </span>
                            <h4 className="text-lg md:text-xl font-bold text-white">{service.title}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:p-6 flex flex-col flex-grow">
                        <div className="bg-black/40 p-4 rounded-lg mb-4 flex-grow">
                          <p className="text-white text-sm md:text-base leading-relaxed">{service.description}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mt-auto">
                          <Button
                            className={`w-full cyberpunk-button py-3 text-sm md:text-base hover:shadow-glow-blue transition-all duration-300 ${
                              index === 0 ? "bg-cyberpunk-pink hover:bg-cyberpunk-pink/80" : ""
                            }`}
                            onClick={() => (window.location.href = service.caseStudyLink)}
                          >
                            View Case Study
                          </Button>
                          <Button
                            variant="outline"
                            className={`w-full border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 py-3 text-sm md:text-base hover:shadow-glow-blue transition-all duration-300 ${
                              index === 0 ? "border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10" : ""
                            }`}
                            onClick={() => (window.location.href = "/contact")}
                          >
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white py-6 text-base hover:bg-red-900/20 transition-all duration-300"
                    onClick={resetQuiz}
                  >
                    <X className="h-5 w-5 mr-2" /> Retake Quiz
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white py-6 text-base hover:bg-green-900/20 transition-all duration-300"
                    onClick={() => (window.location.href = "/services")}
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

