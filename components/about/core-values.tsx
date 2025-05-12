"use client";

import { motion } from "framer-motion";
import {
  Check,
  Lightbulb,
  Target,
  Users,
  Award,
  RefreshCwIcon as Refresh,
  Quote,
  Shield,
  Sword,
} from "lucide-react";

interface ValueCard {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function CoreValues() {
  const marineDnaValues: ValueCard[] = [
    {
      title: "Honor",
      description: "Authenticity first—stories grounded in real character.",
      icon: <Shield className="w-5 h-5 stroke-white group-hover:fill-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300" />,
      color: "cyberpunk-blue",
    },
    {
      title: "Courage",
      description: "Risk-taking creativity that cuts through noise.",
      icon: <Sword className="w-5 h-5 stroke-white group-hover:fill-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300" />,
      color: "cyberpunk-pink",
    },
    {
      title: "Commitment",
      description: "Relentless follow-through until goals are met.",
      icon: <Target className="w-5 h-5 stroke-white group-hover:fill-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300" />,
      color: "cyberpunk-green",
    },
  ];
  const values = [
    {
      title: "Authentic Storytelling",
      description:
        "We believe in the power of genuine narratives that connect on a human level.",
      icon: <Quote className="w-5 h-5" />,
      color: "cyberpunk-blue",
    },
    {
      title: "Creative Innovation",
      description:
        "We constantly push boundaries and explore new approaches to content creation.",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "cyberpunk-pink",
    },
    {
      title: "Strategic Impact",
      description:
        "Every creative decision is guided by strategic goals and measurable outcomes.",
      icon: <Target className="w-5 h-5" />,
      color: "cyberpunk-green",
    },
    {
      title: "Collaborative Spirit",
      description:
        "We thrive on partnership, both within our team and with our clients.",
      icon: <Users className="w-5 h-5" />,
      color: "cyberpunk-purple",
    },
    {
      title: "Technical Excellence",
      description:
        "We maintain the highest standards in production quality and technical execution.",
      icon: <Award className="w-5 h-5" />,
      color: "cyberpunk-blue",
    },
    {
      title: "Adaptive Evolution",
      description:
        "We embrace change and continuously evolve our approaches and methodologies.",
      icon: <Refresh className="w-5 h-5" />,
      color: "cyberpunk-pink",
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

  function renderValueCard({ value, index }: { value: ValueCard; index: number }) {
    return (
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
            {value.icon}
          </div>
          <h3 className="text-xl font-bold text-white">{value.title}</h3>
        </div>
        <p className="text-gray-300">{value.description}</p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Marine Corps DNA Section */}
      <section id="marine-dna" className="relative py-16 bg-[url('/camo.svg')] bg-repeat bg-opacity-5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-2">
            Our <span className="text-cyberpunk-red">Marine Corps DNA</span>
          </h2>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink rounded-full mb-8" />
          <p className="lead text-center mb-12">
            Harness the discipline, precision, and time management of the Marine Corps<br />
            to make your project mission-ready.
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {marineDnaValues.map((value, index) => (
              <motion.div
                key={value.title}
                variants={item}
                className="bg-black/50 p-6 rounded-lg border border-gray-800 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_0_4px_#00CCFF33]"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 border border-cyberpunk-blue group-hover:bg-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-8 text-sm text-cyberpunk-red-light text-center">
            The same ethos that keeps Marines mission-ready keeps your project moving.
            When we say we'll deliver, it's a promise—backed by 247 years of tradition.
          </p>
        </div>
      </section>
      {/* Core Values Section */}
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
            {values.map((value, index) =>
              renderValueCard({ value, index })
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
