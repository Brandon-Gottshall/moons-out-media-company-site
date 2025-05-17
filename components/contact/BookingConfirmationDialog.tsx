import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"

interface BookingConfirmationDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  bookingLink: string
}

export default function BookingConfirmationDialog({
  isOpen,
  onOpenChange,
  bookingLink,
}: BookingConfirmationDialogProps) {
  const handleBookExternal = () => {
    window.open(bookingLink, "_blank", "noopener,noreferrer")
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black/80 backdrop-blur-md border-cyberpunk-blue text-white">
        <DialogHeader>
          <DialogTitle className="text-cyberpunk-blue">Confirm External Booking</DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            You are about to be directed to an external site (Google Calendar, LinkedIn, or Reddit) to schedule your appointment.
            <br /><br />
            Please be aware that you may need to re-enter your name, email, and optionally your company information on the booking page.
            <br /><br />
            We apologize for this inconvenience and are actively working on a more streamlined solution. To help us connect your booking with this inquiry, please try to use the same information.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2 border-gray-600 text-gray-300 hover:bg-gray-700">
            Cancel
          </Button>
          <Button onClick={handleBookExternal} className="bg-cyberpunk-blue hover:bg-cyberpunk-blue/80 text-white">
            Proceed to Booking <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 