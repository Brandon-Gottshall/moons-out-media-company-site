"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Mail, ExternalLink, Globe, X } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    email?: string;
    site?: string;
  };
}

export default function TeamSection() {
  const [activeTeamMember, setActiveTeamMember] = useState<TeamMember | null>(
    null
  );

  useEffect(() => {
    document.body.style.overflow = activeTeamMember ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeTeamMember]);

  const team: TeamMember[] = [
    {
      name: "Levi Armentrout",
      role: "Founder / Creative Director",
      bio: "As a U.S. Marine Corps Veteran, father, and the heart behind Moon Out Media, my path has been uniquely shaped by a profound realization from my service: pivotal stories deserve to be preserved through video and photography. This conviction, coupled with the discipline honed in the Marines and a deep-seated love for local enterprise learned in my family's childhood pizza shop, fuels my passion to see local businesses thrive. Working alongside inspiring Ohio businesses like Dave Arbogast and ThinkTV, I've witnessed firsthand that while well-planned ads are vital for reach, it's a business's courage to authentically share its story that truly builds lasting trust and paves the way for genuine, sustainable growth. This core belief is why Moon Out Media is dedicated to partnering with you—to teach, collaborate, and ensure your unique narrative not only connects but helps your business flourish.",
      image: "/images/Levi.webp",
      social: {
        twitter: "",
        linkedin: "https://www.linkedin.com/in/levi-armentrout-94ba13359/",
        email: "levi@moonsoutmedia.com",
      },
    },
    {
      name: "Brandon Gottshall",
      role: "Software Alchemist / Technical Director",
      bio: "Brandon Gottshall is a Marine Corps veteran who architects containerized infrastructures, secure reverse-proxy gateways, and AI-driven automation pipelines for Moons Out Media. He leverages Vercel, Docker, Next.js, Tailwind, ShadCN, and PostgreSQL to deploy scalable web platforms. At Moons Out Labs, he implemented Authelia for internal AI-service authentication and orchestrated n8n, Langflow, and LibreChat workflows to eliminate repetitive tasks. With a focus on CI/CD best practices, infrastructure as code, and maintainability, Brandon transforms complex requirements into robust systems that empower creative teams to focus on storytelling.",
      image: "/images/Brandon.webp",
      social: {
        twitter: "https://x.com/gottcodes",
        linkedin: "https://www.linkedin.com/in/brandon-gottshall/",
        site: "https://brandongottshall.com",
        email: "brandon@moonsoutmedia.com",
      },
    },
    {
      name: "Emma Gibbons",
      role: "UX/UI Designer & Creative Strategist",
      bio: "Emma brings clarity and strategic insight to Moons Out Media's user experience and creative direction. With a sharp eye for detail and a passion for intuitive design, she bridges storytelling with interactive design, ensuring every digital touchpoint is seamless, engaging, and conversion-focused. Emma's expertise in UX/UI design, content strategy, and creative ideation empowers the team to craft compelling experiences that resonate deeply with audiences and drive meaningful results.",
      image: "/images/Emma.webp",
      social: {
        linkedin: "https://www.linkedin.com/in/emma-gibbons-3375a724a/",
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
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-heading mb-12 text-center">
          Meet Our <span className="text-cyberpunk-green">Team</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-lg bg-black/40 hover:bg-black/60 transition-all duration-300"
              whileHover={{
                y: -5,
                boxShadow: `0 10px 25px -5px rgba(var(--cp-blue-electric-rgb), 0.2)`,
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
                <h3 className="text-heading-md font-heading text-white">
                  {member.name}
                </h3>
                <p className="text-cyberpunk-blue font-small mb-3 text-center">
                  {member.role}
                </p>
                <p className="text-gray-300 text-body-sm opacity-0 hidden transition-display group-hover:block group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {member.bio.substring(0, 80)}...
                </p>
                <div className="mt-4 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-cyberpunk-blue transition-colors"
                    >
                      <Image
                        src="/images/x.com.svg"
                        alt="Twitter"
                        width={10}
                        height={10}
                        className=""
                      />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-cyberpunk-blue transition-colors"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-cyberpunk-pink transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                  )}
                  {member.social.site && (
                    <a
                      href={member.social.site}
                      className="text-gray-400 hover:text-cyberpunk-pink transition-colors"
                    >
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyberpunk-pink opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyberpunk-blue opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Member Modal */}
        {activeTeamMember && (
          <div
            onClick={() => setActiveTeamMember(null)}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 pt-16 sm:pt-0 sm:flex-row"
          >
            <div className="absolute inset-0 bg-black/80 pointer-events-none"></div>
            {/* Fixed close button always visible */}
            <div className="flex flex-col items-end gap-y-2">
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveTeamMember(null)}
                className="fixed sm:relative top-20 sm:top-0 right-10 sm:right-0 z-[9999] text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black/90 border border-cyberpunk-blue/30 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] md:max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-y-contain relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className="w-full md:w-1/4 aspect-square relative rounded-lg overflow-hidden mt-8"
                    >
                    <Image
                      src={activeTeamMember.image || "/images/placeholder.svg"}
                      alt={activeTeamMember.name}
                      fill
                      className={
                        "object-cover " +
                        (activeTeamMember.name === "Emma Gibbons"
                          ? "object-[80%_30%] "
                          : "") +
                        (activeTeamMember.name === "Jacai"
                          ? "object-[65%_50%] "
                          : "") +
                        (activeTeamMember.name === "Brandon Gottshall"
                          ? "object-[45%_10%] "
                          : "") +
                        (activeTeamMember.name === "Levi Armentrout"
                          ? "object-[63%_50%] "
                          : "object-center")
                      }
                    />
                  </div>

                  <div className="w-full md:w-3/4">
                    <h3 className="text-2xl font-heading text-white">
                      {activeTeamMember.name}
                    </h3>
                    <p className="text-cyberpunk-blue font-emphasis mb-4">
                      {activeTeamMember.role}
                    </p>
                    <p className="text-gray-300 mb-6">{activeTeamMember.bio}</p>

                    <div className="flex space-x-4 pb-16">
                      {activeTeamMember.social.twitter && (
                        <a
                          href={activeTeamMember.social.twitter}
                          className="p-2 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue hover:bg-cyberpunk-blue/20 transition-colors"
                        >
                          <Image
                            src="/images/x.com.svg"
                            alt="X.com"
                            width={15}
                            height={15}
                          />
                        </a>
                      )}
                      {activeTeamMember.social.linkedin && (
                        <a
                          href={activeTeamMember.social.linkedin}
                          className="p-2 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue hover:bg-cyberpunk-blue/20 transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {activeTeamMember.social.email && (
                        <a
                          href={`mailto:${activeTeamMember.social.email}`}
                          className="p-2 rounded-full bg-cyberpunk-pink/10 text-cyberpunk-pink hover:bg-cyberpunk-pink/20 transition-colors"
                        >
                          <Mail size={18} />
                        </a>
                      )}
                      {activeTeamMember.social.site && (
                        <a
                          href={activeTeamMember.social.site}
                          className="p-2 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue hover:bg-cyberpunk-blue/20 transition-colors"
                        >
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
