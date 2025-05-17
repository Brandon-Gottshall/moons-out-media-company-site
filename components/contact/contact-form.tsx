"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { CalendarFold, CheckCircle, ChevronDown } from "lucide-react"
import { MASTER_SERVICES } from "@/app/data/services"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { AnimatePresence } from "framer-motion"
import ServiceInterestConfirmed from "@/components/contact/ServiceInterestConfirmed"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: [] as string[],
    message: "",
    findUs: "",
    branch: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [selectionType, setSelectionType] = useState<string>("")
  // Pending confirm on leave
  const confirmTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceCheckboxChange = (id: string, checked: boolean) => {
    // update selection type
    setSelectionType(id === "unsure" ? "unsure" : "services")
    setFormState(prev => {
      if (id === "unsure") return { ...prev, service: checked ? ["unsure"] : [] }
      const set = new Set(prev.service.filter(s => s !== "unsure"))
      if (checked) set.add(id)
      else set.delete(id)
      return { ...prev, service: Array.from(set) }
    })
  }

  // Handle branch-level selection (Media or Labs)
  const handleBranchCheckboxChange = (branchName: "media" | "labs", checked: boolean) => {
    // update selection type for branch
    setSelectionType(branchName)
    setFormState(prev => ({
      ...prev,
      branch: checked ? branchName : "",
      service: [] // clear specific services when selecting branch
    }))
  }

  // Global both branches selection
  const allBranchIds = MASTER_SERVICES.filter(s => s.branch === "media" || s.branch === "labs").map(s => s.id)
  const allSelectedCount = formState.service.filter(id => allBranchIds.includes(id)).length
  const allChecked: boolean | "indeterminate" = allSelectedCount === allBranchIds.length ? true : allSelectedCount > 0 ? "indeterminate" : false
  const handleAllChange = (checked: boolean) => {
    // update selection type for both
    setSelectionType("both")
    setFormState(prev => {
      const set = new Set(prev.service)
      if (checked) allBranchIds.forEach(id => set.add(id))
      else allBranchIds.forEach(id => set.delete(id))
      return { ...prev, service: Array.from(set), branch: "" }
    })
  }

  // validation and form state helpers
  const emailRegex = /\S+@\S+\.\S+/
  const isFormValid = formState.name.trim() !== "" && emailRegex.test(formState.email) && formState.message.trim() !== ""

  // Only confirm service interest if at least one service or branch is selected
  const handleServiceMouseLeave = () => {
    if ((formState.service.length > 0 || formState.branch) && !confirmTimeout.current) {
      confirmTimeout.current = setTimeout(() => {
        setConfirmed(true)
        confirmTimeout.current = null
      }, 1000)
    }
  }
  const handleServiceMouseEnter = () => {
    if (confirmTimeout.current) {
      clearTimeout(confirmTimeout.current)
      confirmTimeout.current = null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitMessage({
      type: "success",
      text: "Thank you for your message! We'll be in touch soon.",
    })

    // Reset form after successful submission
    setFormState({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: [],
      message: "",
      findUs: "",
      branch: "",
    })

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitMessage(null)
    }, 5000)
  }

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        boxShadow: "0 0 20px rgba(101, 206, 240, 0.2)",
        borderColor: "rgba(101, 206, 240, 0.4)",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-white relative inline-block">
        Get In Touch
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink"></span>
      </h2>

      {submitMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-4 mb-6 rounded-md ${
            submitMessage.type === "success"
              ? "bg-green-900/30 border border-green-700"
              : "bg-red-900/30 border border-red-700"
          }`}
        >
          <div className="flex items-center">
            {submitMessage.type === "success" && <CheckCircle className="h-5 w-5 text-green-400 mr-2" />}
            <p className={`text-${submitMessage.type === "success" ? "green" : "red"}-400`}>{submitMessage.text}</p>
            {submitMessage.type === "success" && (
              <div className="mt-2">
                <a href="#" className="text-cyberpunk-blue underline">Book a discovery call →</a>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name <span className="text-cyberpunk-pink">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email <span className="text-cyberpunk-pink">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleChange}
              placeholder="Optional"
              className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1 text-left">
            Company (optional)
          </label>
          <Input
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
          />
        </motion.div>

        <AnimatePresence initial={false} mode="wait">
          {!confirmed && (
            <motion.div
              key="service-picker"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ layout: { duration: 0.8, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
              onMouseLeave={handleServiceMouseLeave}
              onMouseEnter={handleServiceMouseEnter}
              className="overflow-hidden"
            >
              <label className="block text-sm font-medium text-gray-300 mb-1">Service Interest</label>
              <div className="space-y-2">
                <div className="flex items-center min-h-[36px] gap-2 hover:bg-[#ffffff0b] cursor-pointer">
                  <Checkbox
                    id="help-me-choose"
                    checked={formState.service.includes("unsure") && formState.service.length === 1}
                    onCheckedChange={checked => handleServiceCheckboxChange("unsure", Boolean(checked))}
                    className="h-6 w-6 mr-2 bg-black/60 border-cyberpunk-pink focus-visible:ring-cyberpunk-pink data-[state=checked]:bg-cyberpunk-pink"
                  />
                  <label htmlFor="help-me-choose" className="text-gray-300">Help me choose</label>
                </div>
                <div className="flex items-center min-h-[36px] gap-2 hover:bg-[#ffffff0b] cursor-pointer">
                  <Checkbox
                    id="group-both"
                    checked={allChecked}
                    onCheckedChange={checked => handleAllChange(Boolean(checked))}
                    className="h-6 w-6 mr-2"
                  />
                  <label htmlFor="group-both" className="text-gray-300">Both</label>
                </div>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <div className="flex justify-between items-center w-full min-h-[36px] gap-2 hover:bg-[#ffffff0b] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="branch-media"
                          checked={formState.branch === "media"}
                          onCheckedChange={checked => handleBranchCheckboxChange("media", Boolean(checked))}
                          onClick={e => e.stopPropagation()}
                          className="h-6 w-6 mr-2"
                        />
                        <span className="text-gray-300 font-semibold text-sm">Moons Out Media</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1">
                    {MASTER_SERVICES.filter(s => s.branch === "media").map(s => (
                      <div key={s.id} className="flex items-center min-h-[36px] gap-2 hover:bg-[#ffffff0b] cursor-pointer">
                        <Checkbox
                          id={`service-${s.id}`}
                          name="service"
                          checked={formState.service.includes(s.id)}
                          onCheckedChange={checked => handleServiceCheckboxChange(s.id, Boolean(checked))}
                          className="h-6 w-6 mr-2"
                        />
                        <label htmlFor={`service-${s.id}`} className="text-gray-300">{s.shortTitle ?? s.title}</label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <div className="flex justify-between items-center w-full min-h-[36px] gap-2 hover:bg-[#ffffff0b] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="branch-labs"
                          checked={formState.branch === "labs"}
                          onCheckedChange={checked => handleBranchCheckboxChange("labs", Boolean(checked))}
                          onClick={e => e.stopPropagation()}
                          className="h-6 w-6 mr-2"
                        />
                        <span className="text-gray-300 font-semibold text-sm">Moons Out Labs</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1">
                    {MASTER_SERVICES.filter(s => s.branch === "labs").map(s => (
                      <div key={s.id} className="flex items-center min-h-[36px] gap-2 hover:bg-[#ffffff0b] cursor-pointer">
                        <Checkbox
                          id={`service-${s.id}`}
                          name="service"
                          checked={formState.service.includes(s.id)}
                          onCheckedChange={checked => handleServiceCheckboxChange(s.id, Boolean(checked))}
                          className="h-6 w-6 mr-2"
                        />
                        <label htmlFor={`service-${s.id}`} className="text-gray-300">{s.shortTitle ?? s.title}</label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </motion.div>
          )}
          {confirmed && (formState.service.length > 0 || selectionType !== "") && (
            <motion.div
              key="service-confirmed"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ layout: { duration: 0.8, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
              className="overflow-hidden"
            >
              <ServiceInterestConfirmed
                selectionType={selectionType}
                services={formState.service}
                onChange={() => {
                  setConfirmed(false)
                  setSelectionType("")
                  setFormState({ ...formState, service: [], branch: '' })
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label htmlFor="findUs" className="block text-sm font-medium text-gray-300 mb-1">
            How did you find us?
          </label>
          <Input
            id="findUs"
            name="findUs"
            value={formState.findUs}
            onChange={handleChange}
            placeholder="e.g., Google, Social Media, Referral"
            className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message <span className="text-cyberpunk-pink">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formState.message}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-700 bg-black/60 text-white py-2 px-3 focus:outline-none focus:border-cyberpunk-blue"
          ></textarea>
        </motion.div>

        <motion.button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full py-3 px-6 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white font-bold rounded-md hover:from-cyberpunk-purple hover:to-cyberpunk-blue transition-all duration-300 relative overflow-hidden disabled:opacity-70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{
            boxShadow: "0 0 20px rgba(101, 206, 240, 0.5)",
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Send Message
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

