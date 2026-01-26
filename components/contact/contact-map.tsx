"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink } from "lucide-react"

export default function ContactMap() {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        boxShadow: "0 0 20px rgba(var(--ui-cyan-accent-rgb), 0.2)",
        borderColor: "rgba(var(--ui-cyan-accent-rgb), 0.4)",
      }}
    >
      <h2 className="text-3xl font-heading mb-6 text-white relative inline-block">
        Find Us
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-green"></span>
      </h2>

      <div className="mb-6">
        <div className="relative w-full h-72 rounded-lg overflow-hidden border border-gray-700">
          {/* This would typically be a Google Maps or other map integration */}
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Interactive map would be displayed here</p>
              <div className="inline-block px-4 py-2 bg-cyberpunk-blue/20 text-cyberpunk-blue rounded-md">
                123 Creative Ave, Digital City
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyberpunk-blue opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyberpunk-pink opacity-60"></div>

          {/* Animated ping effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyberpunk-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-cyberpunk-pink items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          className="bg-black/60 p-4 rounded-lg border border-gray-700"
          whileHover={{
            scale: 1.02,
            borderColor: "rgba(var(--ui-cyan-accent-rgb), 0.5)",
          }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center mr-3">
              <Navigation className="h-4 w-4 text-cyberpunk-blue" />
            </div>
            <h3 className="font-emphasis text-white">Studio Address</h3>
          </div>
          <p className="text-gray-300 pl-11">123 Creative Ave, Digital City, DC 10101</p>
        </motion.div>

        <motion.div
          className="bg-black/60 p-4 rounded-lg border border-gray-700"
          whileHover={{
            scale: 1.02,
            borderColor: "rgba(var(--ui-purple-accent-rgb), 0.5)",
          }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-cyberpunk-pink/20 flex items-center justify-center mr-3">
              <Clock className="h-4 w-4 text-cyberpunk-pink" />
            </div>
            <h3 className="font-emphasis text-white">Studio Hours</h3>
          </div>
          <p className="text-gray-300 pl-11">
            Monday - Friday: 9am - 6pm
            <br />
            Weekends: By appointment
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-cyberpunk-green mr-2" />
          <span className="text-gray-300">(555) 123-4567</span>
        </div>

        <div className="flex items-center">
          <Mail className="h-5 w-5 text-cyberpunk-pink mr-2" />
          <span className="text-gray-300">studio@moonsoutmedia.com</span>
        </div>

        <motion.a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <span>Get Directions</span>
          <ExternalLink className="h-4 w-4 ml-2" />
        </motion.a>
      </div>
    </motion.div>
  )
}

