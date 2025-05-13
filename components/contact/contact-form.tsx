"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitMessage({
      type: "success",
      text: "Thank you for your message! We'll be in touch soon.",
    })

    // Reset form after successful submission
    setFormState({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    })

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitMessage(null)
    }, 5000)
  }

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        boxShadow: "0 0 20px rgba(101, 206, 240, 0.2)",
        borderColor: "rgba(101, 206, 240, 0.4)",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-white relative inline-block">
        Get In Touch
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink"></span>
      </h2>

      {submitMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-4 mb-6 rounded-md ${
            submitMessage.type === "success"
              ? "bg-green-900/30 border border-green-700"
              : "bg-red-900/30 border border-red-700"
          }`}
        >
          <div className="flex items-center">
            {submitMessage.type === "success" && <CheckCircle className="h-5 w-5 text-green-400 mr-2" />}
            <p className={`text-${submitMessage.type === "success" ? "green" : "red"}-400`}>{submitMessage.text}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name <span className="text-cyberpunk-pink">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email <span className="text-cyberpunk-pink">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
              Company
            </label>
            <Input
              id="company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
              Service Interest
            </label>
            <select
              id="service"
              name="service"
              value={formState.service}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-700 bg-black/60 text-white py-2 px-3 focus:outline-none focus:border-cyberpunk-blue"
            >
              <option value="">Select a service</option>
              <option value="narrative-driven">Narrative Driven Production</option>
              <option value="digital-marketing">Digital Marketing Campaigns</option>
              <option value="brand-storytelling">Brand Storytelling</option>
              <option value="social-media-content">Social Media Content</option>
              <option value="other">Other</option>
            </select>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message <span className="text-cyberpunk-pink">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formState.message}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-700 bg-black/60 text-white py-2 px-3 focus:outline-none focus:border-cyberpunk-blue"
          ></textarea>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white font-bold rounded-md hover:from-cyberpunk-purple hover:to-cyberpunk-blue transition-all duration-300 relative overflow-hidden disabled:opacity-70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{
            boxShadow: "0 0 20px rgba(101, 206, 240, 0.5)",
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

