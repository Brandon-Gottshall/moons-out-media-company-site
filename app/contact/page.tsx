"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import ContactHero from "@/components/contact/contact-hero"
import ContactFunnel from "@/components/contact/contact-funnel"
import ContactInfo from "@/components/contact/contact-info"
import ContactForm from "@/components/contact/contact-form"

interface FAQ {
  question: string
  answer: string
}

const moonsOutMediaFaqs: FAQ[] = [
  {
    question: "What services does Moons Out Media offer?",
    answer: `We provide a comprehensive suite of creative services that blend cinematic storytelling with modern digital tools, including:

• **Brand Storytelling & Video Production**
  Documentary-style videos and content that tell your brand's story authentically.
• **Digital Marketing Campaigns**
  Targeted ad campaigns (social media, video ads, etc.) built around clear KPIs and continuous A/B optimization.
• **Web & Application Development**
  Custom websites and web apps (Next.js / React / Node) designed for scale, security, and speed.
• **AI & Automation Solutions**
  Tailored AI/ML pipelines and chatbots (using tools like n8n, Langflow) to automate tasks and enhance user engagement.
• **Cloud & DevOps**
  Containerized infrastructure, CI/CD pipelines, Kubernetes/Docker setups, and hybrid cloud hosting for reliable, scalable deployment.

All services are "under one roof" to drive real results. Think of us as a full-service creative agency and tech studio: we handle everything from strategic storytelling to the technical backend.`,
  },
  {
    question: "Who should work with Moons Out Media?",
    answer:
      "Mission-driven businesses and organizations that value high-quality, authentic storytelling and measurable results. Ideal clients include: tech companies, e-commerce brands, educational and non-profit initiatives, and government or defense-related projects. If you want in-house craftsmanship, data-driven campaigns, and Marine-veteran discipline, we're a great fit.",
  },
  {
    question: "What can I expect from your creative process?",
    answer: `A transparent, collaborative workflow:

1. **Listen & Plan** – Understand your story, goals, and audience.
2. **Create & Produce** – In-house shooting, editing, and perfecting every visual with a "quality first" mindset.
3. **Launch & Monitor** – Deploy campaigns, track performance against clear KPIs, and adapt quickly based on results.

You'll be involved at every stage—scripts, edits, strategies—so there are no surprises.`,
  },
  {
    question: "How do you measure the success of your work?",
    answer:
      "By real metrics and ROI. We set goals (e.g., website leads, conversions, video engagement) upfront and build campaigns around them. You'll receive regular reports (impressions, click-throughs, conversions) and see how your investment pays off. We then use that data to optimize in real time.",
  },
  {
    question: "Why focus on authentic storytelling?",
    answer:
      "Authenticity builds trust. Studies show 88% of consumers say authenticity drives their brand choices—and they'll pay more for brands they trust. We uncover what makes your brand unique and present it through compelling visuals and copy to create deeper audience connections.",
  },
  {
    question: "How does budgeting and commitment work?",
    answer:
      "We provide clear, upfront proposals—either a fixed project fee or a retainer. Projects can be phased (concept, production, post-production) with agreed milestones. We never nickel-and-dime; you'll know where every dollar goes, and we deliver on time and on budget.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "Polished content and measurable business impact. Whether it's documentary-style brand awareness videos or targeted ads driving traffic, we deliver top-tier quality and clear improvements in key metrics—higher sales, more leads, better fundraising results, or improved user experience on your new website or app.",
  },
]

const moonsOutLabsFaqs: FAQ[] = [
  {
    question: "What is Moons Out Labs?",
    answer:
      "Our technology and engineering division. While Moons Out Media focuses on creative storytelling, Labs builds the software and systems powering your digital initiatives—from websites and web apps to complex AI workflows and robust cloud infrastructure.",
  },
  {
    question: "What technology services can Moons Out Labs provide?",
    answer: `End-to-end development of high-quality tech products, including:

• **Web & Mobile Apps**
  Custom applications using Next.js, React, Node.js—fast, secure, and scalable.
• **AI & Automation**
  Chatbots, data-analysis tools, machine-learning modules (Langflow, custom models) to automate routine tasks.
• **Cloud & DevOps**
  Docker/Kubernetes containerization, CI/CD pipelines, hybrid cloud hosting for reliable, maintainable systems.`,
  },
  {
    question: "Who should consider working with Moons Out Labs?",
    answer: `Tech-forward organizations ready to invest in innovation:

• Funded startups (fintech, healthtech, edtech, SaaS)
• Mid- to large-enterprises undergoing digital transformation
• E-commerce businesses needing advanced web platforms
• Established brands (finance, healthcare, government) seeking custom, secure systems`,
  },
  {
    question: "How does the development process work?",
    answer: `A clear, collaborative workflow:

1. **Discovery Session** – Define goals, requirements, timeline.
2. **Sprints/Phases** – Design, build, and deliver in iterative increments with regular demos.
3. **Testing & Launch** – Security checks, load tests, CI/CD deployments.
4. **Ownership & Handoff** – Full documentation and knowledge transfer; you own the code.`,
  },
  {
    question: "How long do projects take and how are costs structured?",
    answer: `
• **Small projects** (simple site/chatbot): a few weeks to 2 months
• **Mid-size projects** (custom web apps): 2–4 months
• **Large projects** (enterprise platforms/AI systems): 6+ months

Cost models: fixed-price for defined scopes or time-and-materials retainers. Payments are milestone-based for transparency.`,
  },
  {
    question: "What technology do you use, and will I be locked in?",
    answer:
      "We use modern, industry-standard stacks (React/Next.js, Node.js/Express, Python/Node ML libraries, Docker/Kubernetes). Everything is portable, open-source where possible, and fully documented—so you retain complete ownership and avoid vendor lock-in.",
  },
  {
    question: "How do you ensure security and reliability?",
    answer:
      "From day one, we enforce secure coding standards, data encryption, and least-privilege access. Our containerized DevOps approach enables environment replication and rapid patching via CI/CD. We conduct unit/integration tests, optional penetration tests, and set up monitoring and alerts for immediate issue detection. Ongoing maintenance or support retainers are available.",
  },
  {
    question: "What happens after the project is completed?",
    answer:
      "We provide final documentation, knowledge-transfer sessions, and a short support period. You can choose an ongoing support retainer or take over internally—handoffs are smooth thanks to standard tech and solid processes. We're also available for future updates and long-term partnership.",
  },
]

const mediaAndLabsSynergyFaqs: FAQ[] = [
  {
    question: "How do Moons Out Media and Moons Out Labs work together for my benefit?",
    answer: "By combining cinematic storytelling with rock-solid engineering, we deliver end-to-end solutions that are both compelling and reliable. Your narrative, brand assets, and technical requirements feed into one unified workflow—no handoffs, no siloed teams—so you get a cohesive product from concept through launch.",
  },
  {
    question: "Can I engage both teams on a single project?",
    answer: "Absolutely. Whether you need a branded video with an interactive web component or an AI-powered marketing campaign backed by custom infrastructure, we scope, budget, and schedule Media and Labs deliverables together, ensuring consistent communication, shared milestones, and a single point of accountability.",
  },
  {
    question: "What's the advantage of having creative and technical under one roof?",
    answer: "You save time, reduce miscommunication, and cut costs. Our cross-team collaboration means creative ideas are technically vetted from day one, and technical builds are informed by strategic storytelling. That synergy accelerates delivery, tightens budgets, and guarantees that what looks great also works flawlessly.",
  },
]

// Helper function to render simple markdown (bold)
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*.*\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 pt-20">
        <div className="max-w-5xl mx-auto">

          {/* Quick Form Section */}
          <motion.section
            id="quick-form"
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold my-4 inline-block relative">
                <span className="text-white">Quick Contact Form</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink"></span>
              </h2>
              <p className="text-gray-300">Need a quick response? Use our simplified contact form.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <div className="max-w-3xl mx-auto space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-cyberpunk-blue mb-6 text-center">Moons Out Media FAQs</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {moonsOutMediaFaqs.map((faq, index) => (
                    <AccordionItem key={`media-faq-${index}`} value={`media-faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-cyberpunk-pink mb-6 text-center">Moons Out Labs FAQs</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {moonsOutLabsFaqs.map((faq, index) => (
                    <AccordionItem key={`labs-faq-${index}`} value={`labs-faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-cyberpunk-green mb-6 text-center">Media & Labs Synergy FAQs</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {mediaAndLabsSynergyFaqs.map((faq, index) => (
                    <AccordionItem key={`synergy-faq-${index}`} value={`synergy-faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-pink/20 z-0"></div>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full grid grid-cols-12 gap-4">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-full border-r border-cyberpunk-blue/30"></div>
                  ))}
              </div>
              <div className="h-full w-full grid grid-rows-12 gap-4">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-full border-b border-cyberpunk-blue/30"></div>
                  ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

