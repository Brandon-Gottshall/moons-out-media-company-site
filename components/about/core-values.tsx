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
import Image from "next/image";

interface ValueCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },
};

function ValueCardComponent({ value }: { value: ValueCard }) {
  return (
    <motion.div
      variants={animations.item}
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
  );
}

export default function CoreValues() {
  const marineDnaValues: ValueCard[] = [
    {
      title: "Honor",
      description: "Authenticity first—stories grounded in real character.",
      icon: (
        <Shield className="w-5 h-5 stroke-white group-hover:fill-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300" />
      ),
      color: "cyberpunk-blue",
    },
    {
      title: "Courage",
      description: "Bold creativity that breaks through the noise.",
      icon: (
        <Sword className="w-5 h-5 stroke-white group-hover:fill-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300" />
      ),
      color: "cyberpunk-pink",
    },
    {
      title: "Commitment",
      description: "Relentless follow-through until goals are met.",
      icon: (
        <Target className="w-5 h-5 stroke-white group-hover:fill-gradient-to-r group-hover:from-cyberpunk-blue group-hover:to-cyberpunk-pink transition-all duration-300" />
      ),
      color: "cyberpunk-green",
    },
  ];
  
  const coreValues: ValueCard[] = [
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

  return (
    <>
      {/* Marine Corps DNA Section */}
      <section
        id="marine-dna"
        className="relative py-12 bg-[url('/camo.svg')] bg-repeat bg-opacity-5"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-2">
              Our <span className="text-cyberpunk-red">Marine Corps DNA</span>
            </h2>
            <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-8">
            <p className="lead text-center max-w-md">
              Harness the discipline, precision, and time management of
              the Marine Corps to make your project mission-ready.
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/red_racoons.png"
                alt="Marine Corps Raccoons"
                width={250}
                height={250}
                className="object-cover max-w-full overflow-clip opacity-60"
              />
            </motion.div>
          </div>

          <motion.div
            variants={animations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          >
            {marineDnaValues.map((value) => (
              <ValueCardComponent key={value.title} value={value} />
            ))}
          </motion.div>

          <p className="text-sm text-cyberpunk-red-light text-center">
            The same ethos that keeps Marines mission-ready keeps your
            project moving. When we say we'll deliver, it's a promise—backed
            by 247 years of tradition.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Our <span className="text-cyberpunk-pink">Core Values</span>
          </motion.h2>

          <motion.div
            variants={animations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value) => (
              <ValueCardComponent key={value.title} value={value} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
