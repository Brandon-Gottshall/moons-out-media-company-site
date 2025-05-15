import Link from "next/link"
import { VideoHero } from "@/components/home/video-hero"
import { ServiceCard } from "@/components/home/service-card"
import CallToAction from "@/components/call-to-action"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <VideoHero />

      {/* Services Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyberpunk-blue/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyberpunk-pink/5 rounded-full blur-3xl z-0"></div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple">
            Our Services
          </h2>
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800 max-w-2xl mx-auto mb-12">
            <p className="text-gray-300">
              Explore our portfolio of authentic story telling content, authentic storytelling, and targeted digital
              campaigns that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </div>
  )
}

// Static data that can be accessed by both server and client components
// Static data that can be accessed by both server and client components
export const SERVICES = [
  {
    title: "Digital Marketing",
    description: "Targeted digital ad campaigns that drive measurable results.",
    color: "pink",
    icon: "📱",
  },
  {
    title: "Brand Storytelling",
    description: "Authentic narratives that connect with your audience on a deeper level.",
    color: "purple",
    icon: "📖",
  },
  {
    title: "Web Application Development",
    description: "End-to-end web apps built on Next.js, React & Node—designed for scale, security and speed.",
    color: "teal",
    icon: "💻",
  },
  {
    title: "AI & Automation Engineering",
    description: "Tailored AI/ML pipelines, chatbots and workflow automations (n8n, Langflow, etc.).",
    color: "yellow",
    icon: "🤖",
  },
  {
    title: "Cloud & DevOps Solutions",
    description: "Containerized infrastructure, CI/CD pipelines, Kubernetes, Docker & hybrid-cloud hosting.",
    color: "cyan",
    icon: "☁️",
  },
];
