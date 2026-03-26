"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, BarChart2, Gem, FlaskConical } from "lucide-react";

export function WhyChooseUs() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mx-auto max-w-7xl px-6 md:px-10 py-20 flex flex-col"
    >
      <h2 className="text-3xl md:text-4xl font-heading text-center mb-12 text-primary">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {whyChooseUsItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center card min-h-[250px] w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.03 }}
          >
            <div className="flex justify-center w-full mb-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                {item.icon}
              </motion.div>
            </div>
            <h3 className="text-center font-heading text-lg md:text-xl text-foreground mb-2">
              {item.title}
            </h3>
            <div className="w-full text-body-sm text-muted-foreground leading-relaxed text-center">
              {item.descriptionJsx}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// --- Static Content and Types ---

interface WhyChooseUsItem {
  icon: React.ReactNode;
  title: string;
  descriptionJsx: React.ReactNode;
}

const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    icon: <Target className="w-12 h-12 text-primary" />,
    title: "Mission-Ready Media",
    descriptionJsx: (
      <>
        <p className="mt-2 italic text-base md:text-lg text-foreground">
          Need a media partner who delivers with precision?
        </p>
        <p className="mt-3 max-w-[50ch] text-sm md:text-base leading-relaxed text-muted-foreground">
          Mission-Ready Media leverages Marine-veteran discipline and digital-native savvy to execute campaigns that hit your mark, every time.
        </p>
      </>
    ),
  },
  {
    icon: <BarChart2 className="w-12 h-12 text-accent" />,
    title: "Results You Can Track",
    descriptionJsx: (
      <>
        <p className="mt-2 italic text-base md:text-lg text-foreground">
          Tired of marketing that doesn't move the needle?
        </p>
        <p className="mt-3 max-w-[50ch] text-sm md:text-base leading-relaxed text-muted-foreground">
          With Results You Can Track, we build campaigns around crystal-clear KPIs. You'll see exactly how your investment is performing as we adapt quickly to keep your growth on target.
        </p>
      </>
    ),
  },
  {
    icon: <Gem className="w-12 h-12 text-primary" />,
    title: "Quality First, Always",
    descriptionJsx: (
      <>
        <p className="mt-2 italic text-base md:text-lg text-foreground">
          Does your visual content truly reflect your brand's quality?
        </p>
        <p className="mt-3 max-w-[50ch] text-sm md:text-base leading-relaxed text-muted-foreground">
          Quality First, Always is our promise. By managing every aspect of production in-house, our human craftsmanship ensures your brand is presented flawlessly and powerfully.
        </p>
      </>
    ),
  },
  {
    icon: <FlaskConical className="w-12 h-12 text-secondary" />,
    title: "In-House Innovation",
    descriptionJsx: (
      <>
        <p className="mt-2 italic text-base md:text-lg text-foreground">
          We're not just storytellers; we're builders.
        </p>
        <p className="mt-3 max-w-[50ch] text-sm md:text-base leading-relaxed text-muted-foreground">
          Custom websites, applications, and digital solutions you need to connect all the dots, turning your broader vision into a functional, engaging reality.
        </p>
      </>
    ),
  },
];
