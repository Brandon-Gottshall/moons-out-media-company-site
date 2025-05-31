"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Video, Code2 } from "lucide-react"
import ContactForm from "@/components/contact/contact-form"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [companyValue, setCompanyValue] = useState("")
  const [roleValue, setRoleValue] = useState("")
  const [goalValue, setGoalValue] = useState("")
  // Track current step: intro (name), contact (contact details), info (company/role), choose (path), source (referral), book (appointment type), goal (meeting goals), schedule, form
  const [step, setStep] = useState<'intro' | 'contact' | 'info' | 'choose' | 'source' | 'book' | 'goal' | 'schedule' | 'form'>("intro")
  // Track chosen path for confirmation
  const [pathSelection, setPathSelection] = useState<'media' | 'labs' | 'both' | ''>("")
  // Track how user found us
  const [foundValue, setFoundValue] = useState<string>("")
  // Track chosen appointment type
  const [appointmentType, setAppointmentType] = useState<'discovery' | 'audit' | ''>("")
  // Track other source option
  const [showOtherInput, setShowOtherInput] = useState(false)
  // Track other source value
  const [otherSourceValue, setOtherSourceValue] = useState("")

  // Schedule submission state and logic
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const isDebug = process.env.NODE_ENV === 'development'
  const countdownStart = isDebug ? 5 : 3
  const [countdown, setCountdown] = useState(countdownStart)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scheduleUrls: Record<string, Record<string, string>> = {
    labs: {
      discovery: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ10MfFXCLnngwj5wQ9CRQ6Mqw2r6sF1IBHMYr8y2pQmV4OZ8-kcvoeWxbx8mHgWM2QfLW4aPVZw",
      audit: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2aH1pzQypmOn60h6UVK6MK6zt9O4Me-VDYYk4kb9BaRJtlU9Pl2gP5xUlt7PyyPHfU6MLSQ98i"
    },
    media: {
      discovery: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0j_9jF_j4qd-GUPZxxyt9oicMUSIaVXSDHPgwEbxwNN-XC53TuuhgLrDflxTlXDsXMjJF8TFOy",
      audit: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2_Woqu-NgofXbtzKO4uG7jDVqeaN9Ix9nfH3OYN-7pM_-_fRNQogkllypawboVowoGlcCqTMQB"
    },
    both: {
      audit: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2aH1pzQypmOn60h6UVK6MK6zt9O4Me-VDYYk4kb9BaRJtlU9Pl2gP5xUlt7PyyPHfU6MLSQ98i"
    }
  }

  const bookingLink = scheduleUrls[pathSelection as 'media'|'labs'|'both']?.[appointmentType as 'discovery'|'audit'] ?? ""

  // Dev helper: fill all form values and jump to schedule
  const fillForm = () => {
    setNameValue('Debug Name')
    setPhoneValue('1234567890')
    setCompanyValue('DebugCo')
    setRoleValue('Developer')
    setGoalValue('Debug Goal')
    setPathSelection('media')
    setFoundValue('Google')
    setAppointmentType('discovery')
    setStep('schedule')
  }

  const handleScheduleAndRedirect = async () => {
    setIsSubmittingContact(true)
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue.trim(),
          email: emailValue.trim(),
          phone: phoneValue.trim(),
          company: companyValue.trim(),
          role: roleValue.trim(),
          path: pathSelection,
          found: foundValue.trim(),
          appointmentType,
          goal: goalValue.trim(),
        })
      })
      if (!response.ok) throw new Error('Schedule email failed')
      setContactSent(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmittingContact(false)
    }
  }

  useEffect(() => {
    if (contactSent && !isPaused) {
      setProgress(0)
      setCountdown(countdownStart)
      const interval = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            clearInterval(interval)
            window.open(bookingLink, '_blank')
            return 0
          }
          return c - 1
        })
        setProgress(p => p + 100 / countdownStart)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [contactSent, bookingLink, isPaused, countdownStart])

  return (
    <div className="min-h-[80dvh] bg-black">
      {/* Global page styling elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-50 pointer-events-none"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-6 pt-20">
        <div className="max-w-5xl mx-auto">
          {isDebug && (
            <div className="flex justify-center mb-6">
              <button onClick={fillForm} className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400">
                Dev: Fill & Jump to Schedule
              </button>
            </div>
          )}

          {/* Hero Section */}
          <motion.section
            className="text-center mb-16 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink">
              Let's Build Something Amazing
            </h1>
            <p className="text-heading-md text-gray-300 max-w-2xl mx-auto">
              Tell us about your next project and book time instantly.
            </p>
          </motion.section>

          {/* Intro Name & Phone Question */}
          {step === 'intro' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">What is your name?</h2>
              </div>
              <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
                <Input
                  id="intro-name"
                  placeholder="Your Name"
                  value={nameValue}
                  onChange={e => setNameValue(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                />
                <button
                  disabled={!nameValue.trim()}
                  onClick={() => setStep('contact')}
                  className="mt-4 inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white px-6 py-2 rounded-lg font-subheading hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.section>
          )}

          {/* Contact Details Question */}
          {step === 'contact' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('intro')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">How can we reach you?</h2>
                <p className="text-gray-300">Please provide your email and optional phone number.</p>
              </div>
              <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Your Email"
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                  required
                />
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phoneValue}
                  onChange={e => setPhoneValue(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                />
                <button
                  disabled={!emailValue.trim()}
                  onClick={() => setStep('info')}
                  className="mt-4 inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white px-6 py-2 rounded-lg font-subheading hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.section>
          )}

          {/* Selection Summary */}
          {step !== 'intro' && (
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                Name: {nameValue}
              </span>
              {emailValue && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Email: {emailValue}
                </span>
              )}
              {phoneValue && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Phone: {phoneValue}
                </span>
              )}
              {companyValue && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Company: {companyValue}
                </span>
              )}
              {roleValue && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Role: {roleValue}
                </span>
              )}
              {foundValue && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Found via: {foundValue}
                </span>
              )}
              {pathSelection && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Path: {pathSelection === 'media' ? 'Moons Out Media' : pathSelection === 'labs' ? 'Moons Out Labs' : 'Both'}
                </span>
              )}
              {appointmentType && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Appointment: {appointmentType === 'discovery' ? 'Creative Discovery Call' : '15-Min Labs Audit'}
                </span>
              )}
              {goalValue && (
                <span className="inline-flex items-center bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 text-sm">
                  Goal: {goalValue}
                </span>
              )}
            </div>
          )}

          {/* Company & Role Question */}
          {step === 'info' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('intro')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-2">What is your company?</h2>
                <p className="text-gray-300 text-sm">This helps us tailor our communication.</p>
              </div>
              <div className="max-w-md mx-auto mb-4">
                <Input
                  id="intro-company"
                  placeholder="Your Company"
                  value={companyValue}
                  onChange={e => setCompanyValue(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                />
              </div>
              <div className="max-w-md mx-auto mb-6">
                <label htmlFor="intro-role" className="block text-body-sm font-emphasis text-gray-300 mb-1">What is your role? <span className="text-body-xs text-gray-500">(Optional)</span></label>
                <Input
                  id="intro-role"
                  placeholder="Your Role"
                  value={roleValue}
                  onChange={e => setRoleValue(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                />
              </div>
              <div className="flex justify-center">
                <button
                  disabled={!companyValue.trim()}
                  onClick={() => setStep('choose')}
                  className="inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white px-6 py-2 rounded-lg font-subheading hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.section>
          )}

          {/* Choose Your Path */}
          {step === 'choose' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('info')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">Choose Your Path</h2>
                <p className="text-gray-300">Select the service that best fits your needs</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                {/* Creative Services Card */}
                <div
                  onClick={() => { setPathSelection('media'); setStep('source') }}
                  role="button"
                  className="cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-purple/20 border border-cyberpunk-blue/30 p-6 hover:border-cyberpunk-blue/60 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center mb-4">
                      <Video className="w-6 h-6 text-cyberpunk-blue" />
                    </div>
                    <h3 className="text-heading-md font-heading text-white mb-2">Moons Out Media</h3>
                    <p className="text-gray-300 text-body-sm mb-4">Creative storytelling, video production, and digital marketing campaigns</p>
                    <ul className="space-y-1 text-label-base text-gray-400">
                      <li>• Brand Storytelling</li>
                      <li>• Digital Marketing</li>
                      <li>• Social Media Content</li>
                    </ul>
                  </div>
                </div>
                {/* Labs Services Card */}
                <div
                  onClick={() => { setPathSelection('labs'); setStep('source') }}
                  role="button"
                  className="cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-br from-cyberpunk-pink/20 to-cyberpunk-purple/20 border border-cyberpunk-pink/30 p-6 hover:border-cyberpunk-pink/60 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-cyberpunk-pink/20 flex items-center justify-center mb-4">
                      <Code2 className="w-6 h-6 text-cyberpunk-pink" />
                    </div>
                    <h3 className="text-heading-md font-heading text-white mb-2">Moons Out Labs</h3>
                    <p className="text-gray-300 text-body-sm mb-4">Web development, AI automation, and cloud infrastructure</p>
                    <ul className="space-y-1 text-label-base text-gray-400">
                      <li>• Web Applications</li>
                      <li>• AI & Automation</li>
                      <li>• Cloud & DevOps</li>
                    </ul>
                  </div>
                </div>
                {/* Both Services Card */}
                <div
                  onClick={() => { setPathSelection('both'); setStep('source') }}
                  role="button"
                  className="cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-br from-cyberpunk-cyan/20 to-cyberpunk-pink/20 border border-cyberpunk-cyan/30 p-6 hover:border-cyberpunk-pink/60 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center space-x-2 mb-4">
                      <div className="flex space-x-2 mb-4">
                        <Video className="w-6 h-6 text-cyberpunk-blue" />
                        <Code2 className="w-6 h-6 text-cyberpunk-pink" />
                      </div>
                    </div>
                    <h3 className="text-heading-md font-heading text-white mb-2">Both</h3>
                    <p className="text-gray-300 text-body-sm mb-4">Creative & Technical Services</p>
                    <ul className="space-y-1 text-label-base text-gray-400">
                      <li>• Brand Storytelling</li>
                      <li>• Digital Marketing</li>
                      <li>• Web Applications</li>
                      <li>• Cloud & DevOps</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
          {/* How Did You Find Us? */}
          {step === 'source' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('choose')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">How did you find us?</h2>
                <p className="text-gray-300">This helps us know where people discover our services.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Google','Word of Mouth','Social Media'].map(source => (
                  <button
                    key={source}
                    onClick={() => { setFoundValue(source); setShowOtherInput(false) }}
                    className={`flex flex-col items-center bg-black/60 border px-6 p-6 rounded-lg transition-all ${foundValue === source ? 'border-cyberpunk-blue' : 'border-gray-700'} hover:border-cyberpunk-blue`}
                  >
                    <span className="text-white mb-2">{source}</span>
                  </button>
                ))}
              </div>
              {/* Other source option always visible */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => { setShowOtherInput(true); setFoundValue('') }}
                  className={`flex flex-col items-center bg-black/60 ${showOtherInput ? 'border-2 border-cyberpunk-blue' : 'border border-gray-700'} px-6 py-2 rounded-lg transition-all hover:border-cyberpunk-blue`}
                >
                  <span className="text-white">Other</span>
                </button>
              </div>
              {/* Other source input optionally visible */}
              {showOtherInput && (
                <motion.div
                  className="mt-6 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Input
                    id="intro-source-other"
                    placeholder="Please specify"
                    value={otherSourceValue}
                    onChange={e => { setOtherSourceValue(e.target.value); setFoundValue(e.target.value) }}
                    className="bg-black/60 border-gray-700 text-white focus:border-cyberpunk-blue"
                  />
                </motion.div>
              )}
              {/* Unified Next button */}
              <div className="flex justify-center mt-6">
                <button
                  disabled={!foundValue.trim()}
                  onClick={() => setStep('book')}
                  className="inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white px-6 py-2 rounded-lg font-subheading hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.section>
          )}
          {/* Book Time Instantly */}
          {step === 'book' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('choose')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">Choose an Appointment type</h2>
                <p className="text-gray-300">Select how you'd like to meet with us.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Appointment Type Buttons */}
                <button
                  type="button"
                  onClick={() => { setAppointmentType('discovery'); setStep('goal') }}
                  className="group w-full"
                >
                  <div className="bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple p-6 rounded-xl text-center hover:scale-105 transition-transform">
                    <h3 className="text-body-lg font-subheading text-white mb-2">Creative Discovery Call</h3>
                    <p className="text-gray-200 text-body-sm mb-4">30 minutes • Strategy & Planning</p>
                    <div className="flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { setAppointmentType('audit'); setStep('goal') }}
                  className="group w-full"
                >
                  <div className="bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple p-6 rounded-xl text-center hover:scale-105 transition-transform">
                    <h3 className="text-body-lg font-subheading text-white mb-2">15-Min Labs Audit</h3>
                    <p className="text-gray-200 text-body-sm mb-4">15 minutes • Technical Assessment</p>
                    <div className="flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </button>
              </div>
            </motion.section>
          )}
          {/* Meeting Goal Question */}
          {step === 'goal' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('book')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-2">What would you like to accomplish in this meeting?</h2>
                <p className="text-gray-300 text-sm">Let us know your objectives so we can prepare ahead.</p>
              </div>
              <div className="max-w-md mx-auto mb-6">
                <textarea
                  id="intro-goal"
                  placeholder="Describe your objectives..."
                  value={goalValue}
                  onChange={e => setGoalValue(e.target.value)}
                  rows={4}
                  className="w-full bg-black/60 border border-gray-700 text-white focus:border-cyberpunk-blue p-3 rounded-lg resize-none"
                />
              </div>
              <div className="flex justify-center">
                <button
                  disabled={!goalValue.trim()}
                  onClick={() => setStep('schedule')}
                  className="inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white px-6 py-2 rounded-lg font-subheading hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.section>
          )}
          {/* Schedule External Appointment */}
          {step === 'schedule' && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('goal')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">Proceed to Schedule Your Meeting</h2>
                <p className="text-gray-300 mb-4 max-w-2xl text-body mx-auto">
                You will be leaving our site to schedule via Google Calendar Appointments and will need to enter your name and email accurately.
                </p>
                <p className="text-gray-300 mb-4 text-body-sm max-w-2xl mx-auto"> 
                  We apologize for the inconvenience and are planning a long-term solution that keeps you on our site.
                  Please use the same information you provided above for a seamless experience.
                </p>

              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleScheduleAndRedirect}
                  disabled={isSubmittingContact || contactSent}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white px-6 py-3 rounded-lg font-subheading transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactSent
                    ? (isPaused
                        ? 'Paused'
                        : (countdown > 0
                            ? `${countdown}${isDebug ? ' (debug mode)' : ''}`
                            : 'Redirecting...'
                          )
                      )
                    : isSubmittingContact
                      ? 'Sending...'
                      : 'Send my Information and Book Now'
                  }
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                {isDebug && (
                  <div className="mt-4 p-4 bg-gray-800 text-white rounded">
                    <h3 className="font-semibold mb-2">Debug Info</h3>
                    <p>isSubmittingContact: {isSubmittingContact.toString()}</p>
                    <p>contactSent: {contactSent.toString()}</p>
                    <p>countdown: {countdown}</p>
                    <p>progress: {Math.round(progress)}%</p>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="mt-2 inline-flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                    >
                      {isPaused ? 'Resume Redirect' : 'Pause Redirect'}
                    </button>
                  </div>
                )}
              </div>
              {contactSent && (
                <div className="mt-4 max-w-2xl mx-auto">
                  <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
                    <div className="bg-cyberpunk-blue h-2 rounded" style={{ width: `${progress}%`, transition: "width 1s linear" }} />
                  </div>
                </div>
              )}
              {contactSent && (
                <p className="text-gray-300 mt-2 text-center">Redirecting in {contactSent ? countdown : 0} seconds...</p>
              )}
              <p className="text-gray-300 mb-4 text-body-sm mx-auto max-w-xs mt-2">
                By clicking "Send my Information and Book Now", agreeing to send your information to us and you'll be redirected to Google Calendar to schedule your meeting.
              </p>
            </motion.section>
          )}
          {/* Contact Form Section */}
          {step === 'form' && (
            <motion.section
              id="contact-form"
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('schedule')}
                className="inline-flex items-center text-gray-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading text-white mb-4">Tell Us About Your Project</h2>
                <p className="text-gray-300">Fill out the details below and we'll get back to you soon.</p>
              </div>
              <div className="max-w-2xl mx-auto">
                <ContactForm />
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  )
}

