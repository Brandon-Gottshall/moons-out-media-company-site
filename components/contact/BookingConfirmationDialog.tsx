import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink, Loader2 } from "lucide-react"

interface BookingConfirmationDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  bookingLink: string
  onSubmitAndProceed: () => Promise<void>
  isParentSubmitting: boolean
}

export default function BookingConfirmationDialog({
  isOpen,
  onOpenChange,
  bookingLink,
  onSubmitAndProceed,
  isParentSubmitting,
}: BookingConfirmationDialogProps) {
  const [isDialogSubmitting, setIsDialogSubmitting] = useState(false)
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null)
  const [redirectCountdown, setRedirectCountdown] = useState(3)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsDialogSubmitting(false)
      setRedirectMessage(null)
      setRedirectCountdown(3)
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
        countdownTimerRef.current = null
      }
    }
  }, [isOpen])

  const handleProceed = async () => {
    setIsDialogSubmitting(true)
    try {
      await onSubmitAndProceed()
      setRedirectMessage("Message Sent! Redirecting in...")
      countdownTimerRef.current = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimerRef.current!)
            window.open(bookingLink, "_blank", "noopener,noreferrer")
            onOpenChange(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      console.error("Submission error in dialog:", error)
      setIsDialogSubmitting(false)
    }
  }

  const handleCancelAndRedirect = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    window.open(bookingLink, "_blank", "noopener,noreferrer")
    onOpenChange(false)
  }

  const renderFooter = () => {
    if (redirectMessage) {
      return (
        <DialogFooter className="pt-4 flex flex-col items-center">
          <p className="text-cyberpunk-green">{redirectMessage} {redirectCountdown > 0 ? redirectCountdown : ""}</p>
          <Button variant="outline" onClick={handleCancelAndRedirect} className="mt-2 border-cyberpunk-green text-cyberpunk-green hover:bg-cyberpunk-green/10 hover:text-cyberpunk-green">
            Redirect Now <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      )
    }
    return (
      <DialogFooter className="pt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2 border-gray-600 text-gray-300 hover:bg-gray-700" disabled={isDialogSubmitting || isParentSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleProceed} className="bg-cyberpunk-blue hover:bg-cyberpunk-blue/80 text-white" disabled={isDialogSubmitting || isParentSubmitting}>
          {isDialogSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending & Preparing Booking...</>
          ) : (
            <>Proceed to Booking <ExternalLink className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </DialogFooter>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black/80 backdrop-blur-md border-cyberpunk-blue text-white">
        <DialogHeader>
          <DialogTitle className="text-cyberpunk-blue">Confirm External Booking</DialogTitle>
          <DialogDescription className="text-gray-300 pt-2 text-body">
            <p className="mb-2">
            You are about to be directed to an external site (Google Calendar, LinkedIn, or Reddit) to schedule your appointment.
            </p>
            <p className="mb-2">
            Please be aware that you will need to re-enter your name, email accurately on the booking page.
            </p>
            <p className="mb-2">
            We apologize for this inconvenience and are actively working on a more streamlined solution. To help us connect your booking with this inquiry, please try to use the same information.
            </p>
            <p className="mb-2">
            By proceeding, we'll also ensure your message from this form reaches our team.
            </p>
          </DialogDescription>
        </DialogHeader>
        {renderFooter()}
      </DialogContent>
    </Dialog>
  )
} 