"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Clock, Award, ShieldCheck, Users, ExternalLink } from "lucide-react"

export default function ContactInfo() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div
        className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800"
        variants={item}
        whileHover={{
          boxShadow: "0 0 20px rgba(255, 86, 246, 0.2)",
          borderColor: "rgba(255, 86, 246, 0.4)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white relative inline-block">
          Contact Details
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple"></span>
        </h2>

        <div className="space-y-5">
          {[
            {
              icon: <Phone className="w-5 h-5 text-cyberpunk-blue" />,
              title: "Phone",
              content: "(555) 123-4567",
              color: "blue",
            },
            {
              icon: <Mail className="w-5 h-5 text-cyberpunk-pink" />,
              title: "Email",
              content: "hello@moonsoutmedia.com",
              color: "pink",
            },
            {
              icon: <Clock className="w-5 h-5 text-cyberpunk-green" />,
              title: "Response Time",
              content: "We typically respond within 24 hours to all inquiries",
              color: "green",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full bg-cyberpunk-${item.color}/20 flex items-center justify-center mr-4 flex-shrink-0`}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `rgba(var(--color-cyberpunk-${item.color}-rgb), 0.3)`,
                }}
              >
                {item.icon}
              </motion.div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 pt-6 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="text-base font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "twitter", color: "#1DA1F2" },
              { name: "facebook", color: "#4267B2" },
              { name: "instagram", color: "#C13584" },
              { name: "linkedin", color: "#0077B5" },
              { name: "youtube", color: "#FF0000" },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={`https://${social.name}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/60 border border-gray-700 flex items-center justify-center hover:border-cyberpunk-blue transition-colors duration-300 group"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(101, 206, 240, 0.5)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
              >
                <span className="sr-only">{social.name}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyberpunk-blue transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

