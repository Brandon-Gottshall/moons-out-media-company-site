"use client"

import CreativeProcess from "@/components/about/creative-process"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import CallToAction from "@/components/call-to-action"

interface FAQ {
  question: string
  answer: string
}

const synergyFaqs: FAQ[] = [
  {
    question: "How do Moons Out Media and Labs work together?",
    answer:
      "Media shapes the narrative while Labs builds the systems that keep delivery fast, measurable, and repeatable.",
  },
  {
    question: "What's the advantage of having creative and technical under one roof?",
    answer:
      "One integrated team means fewer handoffs, tighter strategy, and faster iteration from story to system.",
  },
]

export default function CreativeProcessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Creative Process
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-heading text-primary">
          How we build stories that scale
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl mx-auto">
          From discovery to optimization, we keep your narrative, production, and distribution aligned.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16">
        <CreativeProcess />
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading text-primary">Working together</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {synergyFaqs.map((faq, index) => (
            <AccordionItem key={`synergy-faq-${index}`} value={`synergy-faq-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CallToAction />
    </main>
  )
}
