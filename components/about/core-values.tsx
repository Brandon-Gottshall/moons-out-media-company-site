"use client"

import { motion } from "framer-motion"
import { Check, Lightbulb, Target, Users, Award, RefreshCwIcon as Refresh, Quote } from "lucide-react"

export default function CoreValues() {
  const values = [
    {
      title: "Authentic Storytelling",
      description: "We believe in the power of genuine narratives that connect on a human level.",
      icon: <Quote className="w-5 h-5" />,
      color: "cyberpunk-blue",
    },
    {
      title: "Creative Innovation",
      description: "We constantly push boundaries and explore new approaches to content creation.",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "cyberpunk-pink",
    },
    {
      title: "Strategic Impact",
      description: "Every creative decision is guided by strategic goals and measurable outcomes.",
      icon: <Target className="w-5 h-5" />,
      color: "cyberpunk-green",
    },
    {
      title: "Collaborative Spirit",
      description: "We thrive on partnership, both within our team and with our clients.",
      icon: <Users className="w-5 h-5" />,
      color: "cyberpunk-purple",
    },
    {
      title: "Technical Excellence",
      description: "We maintain the highest standards in production quality and technical execution.",
      icon: <Award className="w-5 h-5" />,
      color: "cyberpunk-blue",
    },
    {
      title: "Adaptive Evolution",
      description: "We embrace change and continuously evolve our approaches and methodologies.",
      icon: <Refresh className="w-5 h-5" />,
      color: "cyberpunk-pink",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-16 text-center">
          Our <span className="text-cyberpunk-pink">Core Values</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-cyberpunk-blue transition-all duration-300 group"
              whileHover={{
                y: -5,
                boxShadow: `0 10px 25px -5px rgba(0, 240, 255, 0.2)`,
              }}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-10 h-10 rounded-full bg-${value.color}/20 flex items-center justify-center mr-4 group-hover:bg-${value.color}/40 transition-all duration-300`}
                >
                  <Check className={`w-5 h-5 text-${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
              </div>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

