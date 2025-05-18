"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Mail, ExternalLink } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    twitter: string
    linkedin: string
    email: string
  }
}

export default function TeamSection() {
  const [activeTeamMember, setActiveTeamMember] = useState<TeamMember | null>(
    null
  )

  const team: TeamMember[] = [
    {
      name: "Levi Armentrout",
      role: "HNIC",
      bio: "Levi Armentrout, HNIC at Moons Out Media, brings Marine Corps discipline and a documentary cinematographer's eye to every project. After multiple tours of duty, he immersed himself in authentic storytelling—directing and shooting films that uncover untold personal narratives. As HNIC, Levi shapes narrative strategy, oversees brand-film direction, and guides creative execution, ensuring each story combines cinematic polish with genuine human emotion. His steady leadership and visual expertise drive Moons Out's mission to craft memorable, human-centered experiences that linger long after the credits roll.",
      image: "/images/Levi.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "levi@moonsoutmedia.com",
      },
    },
    {
      name: "Brandon",
      role: "Software Alchemist",
      bio: "Brandon Gottshall is a Marine Corps veteran who architects containerized infrastructures, secure reverse-proxy gateways, and AI-driven automation pipelines for Moons Out Media. He leverages Vercel, Docker, Next.js, Tailwind, ShadCN, and PostgreSQL to deploy scalable web platforms. At Moons Out Labs, he implemented Authelia for internal AI-service authentication and orchestrated n8n, Langflow, and LibreChat workflows to eliminate repetitive tasks. With a focus on CI/CD best practices, infrastructure as code, and maintainability, Brandon transforms complex requirements into robust systems that empower creative teams to focus on storytelling.",
      image: "/images/Brandon.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "brandon@moonsoutmedia.com",
      },
    },
    {
      name: "Jacai",
      role: "Audio Engineering/Sound Design",
      bio: "Independent artist and audio engineer Jacai is deeply immersed in crafting his authentic sound. His mastery of audio engineering and production fuels his growth as a songwriter, recording artist, and mixing engineer across diverse musical projects. Beyond his solo work, Jacai collaborates with other artists, using his keen ear and technical skills to realize their sonic visions. Driven by a passion for music and a commitment to his community, Jacai supports fellow artists and shares his unique creative approach, aiming to create impactful art and be a positive influence. His burgeoning fanbase and love for music continue to propel this mission.",
      image: "/images/jacai_cropped.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "",
      },
    },
    {
      name: "Emma",
      role: "UX & Creative Strategist",
      bio: "Emma brings clarity and strategic insight to Moons Out Media's user experience and creative direction. With a sharp eye for detail and a passion for intuitive design, she bridges storytelling with interactive design, ensuring every digital touchpoint is seamless, engaging, and conversion-focused. Emma's expertise in UX/UI design, content strategy, and creative ideation empowers the team to craft compelling experiences that resonate deeply with audiences and drive meaningful results.",
      image: "/images/Emma.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "emma@moonsoutmedia.com",
      },
    },
  ];  

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
          Meet Our <span className="text-cyberpunk-green">Team</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-lg bg-black/40 hover:bg-black/60 transition-all duration-300"
              whileHover={{
                y: -5,
                boxShadow: `0 10px 25px -5px rgba(0, 240, 255, 0.2)`,
              }}
              onClick={() => setActiveTeamMember(member)}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={member.image || "/images/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-cyberpunk-blue font-small mb-3 text-center">{member.role}</p>
                <p className="text-gray-300 text-sm opacity-0 hidden transition-display group-hover:block group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {member.bio.substring(0, 80)}...
                </p>
                <div className="mt-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <a href={member.social.twitter} className="text-gray-400 hover:text-cyberpunk-blue transition-colors">
                    <Twitter size={16} />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-cyberpunk-blue transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-400 hover:text-cyberpunk-pink transition-colors"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>

              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyberpunk-pink opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyberpunk-blue opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Member Modal */}
        {activeTeamMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80" onClick={() => setActiveTeamMember(null)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/90 border border-cyberpunk-blue/30 rounded-lg p-6 max-w-2xl w-full relative z-10"
            >
              <button
                onClick={() => setActiveTeamMember(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <ExternalLink size={20} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={activeTeamMember.image || "/images/placeholder.svg"}
                    alt={activeTeamMember.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold text-white">{activeTeamMember.name}</h3>
                  <p className="text-cyberpunk-blue font-medium mb-4">{activeTeamMember.role}</p>
                  <p className="text-gray-300 mb-6">{activeTeamMember.bio}</p>

                  <div className="flex space-x-4">
                    <a
                      href={activeTeamMember.social.twitter}
                      className="p-2 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue hover:bg-cyberpunk-blue/20 transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={activeTeamMember.social.linkedin}
                      className="p-2 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue hover:bg-cyberpunk-blue/20 transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`mailto:${activeTeamMember.social.email}`}
                      className="p-2 rounded-full bg-cyberpunk-pink/10 text-cyberpunk-pink hover:bg-cyberpunk-pink/20 transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

