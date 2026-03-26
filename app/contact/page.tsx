"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Levi Armentrout",
    role: "Founder / Creative Director",
    email: "levi@moonsoutmedia.com",
  },
  {
    name: "Brandon Gottshall",
    role: "Software Alchemist / Technical Director",
    email: "brandon@moonsoutmedia.com",
  },
  {
    name: "Emma Gibbons",
    role: "UX/UI Designer & Creative Strategist",
    email: "emma@moonsoutmedia.com",
  },
];

const socialLinks = [
  { label: "Instagram", handle: "@moonsoutmedia", href: "https://instagram.com/moonsoutmedia" },
  { label: "LinkedIn", handle: "Moons Out Media", href: "https://linkedin.com/company/moonsoutmedia" },
  { label: "YouTube", handle: "Moons Out Media", href: "https://youtube.com/@moonsoutmedia" },
  { label: "X (Twitter)", handle: "@moonsoutmedia", href: "https://x.com/moonsoutmedia" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          service: [],
          branch: "unsure",
          selectionType: "unsure",
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Contact
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-heading text-primary">
              Tell us what you are building
            </h1>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl">
              Share the essentials and we will respond quickly with a clear next step.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <Textarea
                name="message"
                placeholder="Project summary, timeline, and what success looks like."
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
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

          <div className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-heading text-primary">Socials</h2>
              <div className="mt-4 space-y-3 text-sm">
                {socialLinks.map((social) => (
                  <div key={social.label} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{social.label}</span>
                    <Link
                      href={social.href}
                      className="text-accent hover:underline"
                      target="_blank"
                    >
                      {social.handle}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-heading text-primary">Direct</h2>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>team@moonsoutmedia.com</p>
                <p>(937) 555-0137</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-heading text-primary">Team</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
            Connect directly with the people leading each discipline.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.email} className="space-y-2">
                <h3 className="text-lg font-heading text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <Link
                  href={`mailto:${member.email}`}
                  className="text-xs uppercase tracking-[0.3em] text-accent hover:underline"
                >
                  {member.email}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
