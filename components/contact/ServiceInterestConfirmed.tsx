import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MASTER_SERVICES } from '@/app/data/services'
import type { Service } from '@/app/types/services'

interface ServiceInterestConfirmedProps {
  selectionType: string
  services: string[]
  onChange: () => void
}

export default function ServiceInterestConfirmed({ selectionType, services, onChange }: ServiceInterestConfirmedProps) {
  // Map internal selectionType to user-facing label
  const typeLabel = {
    unsure: 'Help Me Choose',
    both: 'Both',
    media: 'Moons Out Media',
    labs: 'Moons Out Labs'
  }[selectionType] || ''
  // Determine if we list individual services
  const showServices = selectionType === 'services'

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-gray-800 text-white">
      <CardHeader>
        <CardTitle>Service Interest Confirmed</CardTitle>
      </CardHeader>
      <CardContent>
        {typeLabel && !showServices && <p className="text-lg font-semibold text-cyberpunk-blue">{typeLabel}</p>}
        {showServices && (
          <div className="space-y-1">
            <p className="text-lg font-semibold text-cyberpunk-blue mb-2">Your Selected Services:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              {services.map(service => {
                const svc = MASTER_SERVICES.find((s: Service) => s.id === service)
                return <li key={service} className="text-gray-300">{svc?.shortTitle ?? svc?.title}</li>
              })}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="button" variant="outline" onClick={onChange} className="border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10 hover:text-cyberpunk-pink">
          Change Selection
        </Button>
      </CardFooter>
    </Card>
  )
} 