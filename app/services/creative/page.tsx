"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ServiceShowcase from "@/components/services/service-showcase"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

const creativeFaqs: FAQ[] = [
  {
    question: "What services does Moons Out Media offer?",
    answer:
      "Cinematic brand storytelling, digital campaigns, and social content systems built to drive measurable growth.",
  },
  {
    question: "What can I expect from your creative process?",
    answer:
      "Discovery, storyboarding, production, and distribution with transparent collaboration at every step.",
  },
  {
    question: "How do you measure creative campaign success?",
    answer:
      "We set KPIs upfront and report on performance—engagement, conversions, and ROI—throughout the campaign.",
  },
]

export default function CreativeServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Moons Out Media
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-heading text-primary">
          Cinematic storytelling that converts
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl mx-auto">
          We craft authentic narratives that connect with your audience and translate into measurable results.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Schedule creative discovery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <ServiceShowcase branch="media" />
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading text-primary">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {creativeFaqs.map((faq, index) => (
            <AccordionItem key={`creative-faq-${index}`} value={`creative-faq-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <div className="card text-center">
          <h2 className="text-3xl font-heading text-primary">Ready to tell your story?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Let’s create cinematic content that converts your audience into customers.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
              Schedule a creative discovery call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
