"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
          service: [],
          branch: "unsure",
          selectionType: "unsure",
        }),
      })

      if (!response.ok) throw new Error("Contact request failed")

      setStatus("sent")
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-heading text-primary">Get in touch</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Share the essentials and we will respond quickly with a clear next step.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={(event) => setFormState({ ...formState, name: event.target.value })}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formState.email}
            onChange={(event) => setFormState({ ...formState, email: event.target.value })}
            required
          />
        </div>
        <Textarea
          name="message"
          placeholder="Project summary, timeline, and what success looks like."
          rows={6}
          value={formState.message}
          onChange={(event) => setFormState({ ...formState, message: event.target.value })}
          required
        />
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit">
            {status === "sending" ? "Sending..." : "Send message"}
          </Button>
          {status === "sent" && (
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              Message sent
            </span>
          )}
          {status === "error" && (
            <span className="text-xs uppercase tracking-[0.3em] text-destructive">
              Something went wrong
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
