"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, ChevronLeft, Check, Send, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

type Step = {
  id: string
  title: string
  description: string
}

type Challenge = {
  id: string
  title: string
  description: string
  followUpQuestion: string
  icon: string
}

type Testimonial = {
  id: number
  quote: string
  name: string
  position: string
  company: string
  challenge: string
}

const steps: Step[] = [
  {
    id: "challenge",
    title: "What's your biggest media challenge?",
    description: "Let us know what area is causing the most issues for your brand.",
  },
  {
    id: "specifics",
    title: "Tell us more about it",
    description: "Help us understand your specific situation so we can provide the best solution.",
  },
  {
    id: "contact",
    title: "Let's connect",
    description: "Share your contact information so we can reach out with a tailored solution.",
  },
]

const challenges: Challenge[] = [
  {
    id: "cinematography",
    title: "Cinematography",
    description: "Creating professional-quality video content",
    followUpQuestion: "What visual challenges are you facing?",
    icon: "🎬",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    description: "Crafting compelling narratives that resonate",
    followUpQuestion: "What's your biggest storytelling hurdle?",
    icon: "📖",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Reaching and engaging your target audience",
    followUpQuestion: "What marketing challenges are you struggling with?",
    icon: "📱",
  },
  {
    id: "seo",
    title: "SEO",
    description: "Improving your online visibility",
    followUpQuestion: "What SEO issues are you facing?",
    icon: "🔍",
  },
  {
    id: "other",
    title: "Other",
    description: "Something else not listed here",
    followUpQuestion: "What specific challenge can we help you with?",
    icon: "✨",
  },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Moons Out Media transformed our brand narrative with cinematic authentic story telling content. They captured the essence of our mission in a way traditional video never could.",
    name: "Sarah Johnson",
    position: "Chief Marketing Officer",
    company: "EcoTech Innovations",
    challenge: "cinematography",
  },
  {
    id: 2,
    quote:
      "Their storytelling approach helped us connect with our audience on a deeper level. The narrative was authentic and compelling, driving real engagement.",
    name: "Michael Chen",
    position: "Founder & CEO",
    company: "Urban Fitness",
    challenge: "storytelling",
  },
  {
    id: 3,
    quote:
      "The digital marketing campaign they created delivered exceptional ROI. We saw a 215% increase in engagement and a 78% boost in conversion rates.",
    name: "Marcus Williams",
    position: "Head of Digital",
    company: "Urban Apparel",
    challenge: "digital-marketing",
  },
  {
    id: 4,
    quote:
      "Our search rankings improved dramatically after working with Moons Out Media. Their strategic approach to content and SEO was exactly what we needed.",
    name: "Priya Patel",
    position: "Marketing Director",
    company: "TechStart Inc.",
    challenge: "seo",
  },
  {
    id: 5,
    quote:
      "We had a unique challenge that required a creative solution. Moons Out Media understood our needs instantly and delivered beyond our expectations.",
    name: "David Park",
    position: "Creative Director",
    company: "Artisan Collective",
    challenge: "other",
  },
]

export default function ContactFunnel() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [specificDetails, setSpecificDetails] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setCurrentStep(1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const getRelevantTestimonial = () => {
    if (!selectedChallenge) return null

    const relevantTestimonials = testimonials.filter((testimonial) => testimonial.challenge === selectedChallenge.id)

    if (relevantTestimonials.length === 0) return testimonials[4] // Default to "other" testimonial

    return relevantTestimonials[0]
  }

  const currentTestimonial = getRelevantTestimonial()

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-sm border border-cyberpunk-green/30 rounded-lg p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-cyberpunk-green/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-cyberpunk-green" />
          </div>

          <h2 className="text-3xl font-heading mb-4 text-white">Thank You for Reaching Out!</h2>

          <div className="bg-black/40 p-6 rounded-lg mb-6">
            <p className="text-body-lg text-white">
              We've received your information about your{" "}
              <span className="text-cyberpunk-blue font-emphasis">{selectedChallenge?.title.toLowerCase()}</span>{" "}
              challenge. Our team is already reviewing your details and will craft a tailored solution just for you.
            </p>
          </div>

          <p className="text-body-lg text-white mb-8">
            Expect to hear from us within the next 24-48 business hours at{" "}
            <span className="text-cyberpunk-blue">{formData.email}</span>. We'll schedule a virtual meeting to discuss
            your project in detail.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="cyberpunk-button py-6 " onClick={() => router.push("/portfolio")}>
              Explore Our Work While You Wait
            </Button>

            <Button
              variant="outline"
              className="border-cyberpunk-green text-cyberpunk-green hover:bg-cyberpunk-green/10 py-6 "
              onClick={() => window.open("https://calendly.com", "_blank")}
            >
              Schedule a Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="bg-black/40 backdrop-blur-sm border border-cyberpunk-blue/30 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{
          boxShadow: "0 0 20px rgba(101, 206, 240, 0.2)",
          borderColor: "rgba(101, 206, 240, 0.4)",
        }}
      >
        {/* Progress Indicator */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-body-lg font-emphasis text-white">{steps[currentStep].title}</h3>
            <div className="text-body-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple"
              initial={{ width: `${(currentStep / steps.length) * 100}%` }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300 mb-6">{steps[currentStep].description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {challenges.map((challenge, index) => (
                      <motion.div
                        key={challenge.id}
                        className={`p-5 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedChallenge?.id === challenge.id
                            ? "bg-cyberpunk-blue/20 border-2 border-cyberpunk-blue"
                            : "bg-black/60 border border-gray-700 hover:border-cyberpunk-blue/50"
                        }`}
                        onClick={() => handleChallengeSelect(challenge)}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(101, 206, 240, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center mr-4 text-2xl">
                            {challenge.icon}
                          </div>
                          <div>
                            <h4 className="text-body-lg font-emphasis text-white mb-1">{challenge.title}</h4>
                            <p className="text-body-sm text-gray-400">{challenge.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="cyberpunk-button flex items-center"
                      onClick={handleNext}
                      disabled={!selectedChallenge}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300 mb-6">{selectedChallenge?.followUpQuestion}</p>

                  <div className="mb-6">
                    <textarea
                      name="specificDetails"
                      value={specificDetails}
                      onChange={(e) => setSpecificDetails(e.target.value)}
                      placeholder="Tell us about your current approach and what you'd like to achieve..."
                      className="w-full rounded-md border border-gray-700 bg-black/60 text-white py-3 px-4 focus:outline-none focus:border-cyberpunk-blue resize-none h-32"
                      required
                    ></textarea>
                  </div>

                  {/* Testimonial */}
                  {currentTestimonial && (
                    <motion.div
                      className="bg-black/60 p-5 rounded-lg border border-cyberpunk-purple/30 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="flex items-start">
                        <div className="text-cyberpunk-pink opacity-25 mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                          >
                            <path d="M10 11v5h-5v-5h5m14 0v5h-5v-5h5m-7-7v12h-12v-12h12m7 0v12h-5v-12h5z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white italic mb-3">{currentTestimonial.quote}</p>
                          <div className="flex items-center">
                            <div className="mr-3 w-8 h-8 bg-cyberpunk-purple/20 rounded-full flex items-center justify-center">
                              <span className="text-cyberpunk-purple text-body-sm font-heading">
                                {currentTestimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-emphasis text-white">{currentTestimonial.name}</p>
                              <p className="text-label-base text-gray-400">
                                {currentTestimonial.position}, {currentTestimonial.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={handleBack}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    <Button
                      type="button"
                      className="cyberpunk-button flex items-center"
                      onClick={handleNext}
                      disabled={!specificDetails.trim()}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300 mb-6">{steps[currentStep].description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-body-sm font-emphasis text-gray-300 mb-1">
                        Name <span className="text-cyberpunk-pink">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-body-sm font-emphasis text-gray-300 mb-1">
                        Email <span className="text-cyberpunk-pink">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-body-sm font-emphasis text-gray-300 mb-1">
                        Company <span className="text-cyberpunk-pink">*</span>
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-body-sm font-emphasis text-gray-300 mb-1">
                        Phone (optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                      />
                    </div>
                  </div>

                  <div className="bg-black/60 p-5 rounded-lg border border-gray-800 mb-6">
                    <h4 className="text-white font-emphasis mb-2 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center mr-2 text-cyberpunk-blue">
                        <Check className="h-4 w-4" />
                      </span>
                      Challenge Accepted! (Pending Review of Course)
                    </h4>
                    <p className="text-gray-300 mb-2">
                      <span className="text-gray-400">Challenge Area:</span> {selectedChallenge?.title}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Details:</span> {specificDetails}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={handleBack}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    <Button
                      type="submit"
                      className="cyberpunk-button flex items-center"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Your Custom Strategy <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

