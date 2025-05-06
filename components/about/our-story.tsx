"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function OurStory() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  }

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="text-cyberpunk-blue">Our</span> Story
        </h2>

        <div className="space-y-8 text-gray-200">
          <motion.p
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-lg leading-relaxed"
          >
            <span className="text-2xl font-bold text-cyberpunk-pink">Moons Out Media</span> was born from a simple yet
            powerful idea: authentic stories create meaningful connections. Founded in 2018 by a group of filmmakers,
            digital marketers, and storytelling enthusiasts, we set out to transform how brands communicate with their
            audiences.
          </motion.p>

          <motion.p
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-lg leading-relaxed"
          >
            What began as a small documentary production team quickly evolved into a full-service creative agency. We
            recognized that the documentary-style approach—with its emphasis on authenticity, emotional resonance, and
            narrative depth—could revolutionize brand marketing in a digital landscape saturated with superficial
            content.
          </motion.p>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-lg leading-relaxed"
          >
            Today, we're a diverse collective of creators, strategists, and digital innovators united by our passion for
            storytelling. We've helped over 100 brands discover and amplify their unique voice, creating content that
            doesn't just reach audiences—it resonates with them.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-8 px-8 border-l-4 border-cyberpunk-blue bg-black/30 rounded-r-md relative"
          >
            <Quote className="absolute text-cyberpunk-blue/20 h-16 w-16 -top-6 -left-6" />
            <p className="text-xl italic text-gray-100">
              "We don't just tell stories—we craft experiences that transform how audiences perceive and connect with
              brands."
            </p>
            <p className="mt-4 text-cyberpunk-blue font-semibold">— Alex Rivera, Founder & Creative Director</p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Our <span className="text-cyberpunk-pink">Journey</span>
          </h3>

          <div className="relative border-l-2 border-cyberpunk-blue/30 ml-4 md:ml-0 md:mx-auto md:max-w-2xl pl-8 md:pl-0 space-y-12">
            {[
              {
                year: "2018",
                title: "The Beginning",
                description: "Founded as a documentary production team focused on authentic storytelling.",
              },
              {
                year: "2019",
                title: "Expansion",
                description: "Expanded services to include digital marketing and brand strategy.",
              },
              {
                year: "2020",
                title: "Digital Pivot",
                description: "Adapted to remote production and virtual storytelling during global challenges.",
              },
              {
                year: "2021",
                title: "Growth",
                description: "Doubled our team size and client portfolio with innovative approaches.",
              },
              {
                year: "2022",
                title: "Innovation",
                description: "Launched our proprietary storytelling methodology for brands.",
              },
              {
                year: "2023",
                title: "Today",
                description: "Leading the industry with cutting-edge narrative techniques and technology.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative md:flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                <div className="absolute -left-4 md:static">
                  <div className="h-8 w-8 rounded-full bg-cyberpunk-blue/20 border-2 border-cyberpunk-blue flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-cyberpunk-blue"></div>
                  </div>
                </div>

                <div
                  className={`bg-black/40 border border-gray-800 rounded-lg p-4 md:w-[calc(50%-20px)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  <div className="text-cyberpunk-pink font-bold">{item.year}</div>
                  <h4 className="text-white text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

