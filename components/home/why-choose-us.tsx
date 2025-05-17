"use client"
import React from "react"
import { motion } from "framer-motion"
import { Award, ShieldCheck, Users } from "lucide-react"

export function WhyChooseUs() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex-col justify-center w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6 text-white relative inline-block text-center w-full">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {whyChooseUsItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-black/30 rounded-lg p-6 shadow border border-gray-800 w-full max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.03 }}
          >
            <motion.div
              className={`w-12 h-12 rounded-full bg-cyberpunk-${item.color}/20 flex items-center justify-center mb-4`}
              whileHover={{
                scale: 1.1,
                backgroundColor: `rgba(var(--color-cyberpunk-${item.color}-rgb), 0.3)`,
              }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// --- Static Content and Types ---

interface WhyChooseUsItem {
  icon: React.ReactNode
  title: string
  description: string
  color: "blue" | "pink" | "green"
}

const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    icon: <Award className="w-5 h-5 text-cyberpunk-blue" />,
    title: "Award-Winning Content",
    description: "42 industry awards for excellence in creative content and storytelling",
    color: "blue",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-cyberpunk-pink" />,
    title: "Guaranteed Results",
    description: "We tie our success to yours with measurable, data-driven outcomes",
    color: "pink",
  },
  {
    icon: <Users className="w-5 h-5 text-cyberpunk-green" />,
    title: "Expert Team",
    description: "Seasoned professionals with 15+ years of industry experience",
    color: "green",
  },
] 