import React from 'react'

interface ServiceInterestConfirmedProps {
  services: string[]
  onChange: () => void
}

export default function ServiceInterestConfirmed({ services, onChange }: ServiceInterestConfirmedProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg text-white">
      <p className="mb-4">You selected: {services.join(', ')}</p>
      <button
        type="button"
        onClick={onChange}
        className="text-cyberpunk-blue underline"
      >
        Change
      </button>
    </div>
  )
} 