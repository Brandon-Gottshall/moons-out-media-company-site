import React, { useState, useRef, useEffect } from 'react'

interface ConfirmServiceOverlayProps {
  children: React.ReactNode
  onConfirm: () => void
}

export default function ConfirmServiceOverlay({ children, onConfirm }: ConfirmServiceOverlayProps) {
  const [region, setRegion] = useState<'left'|'right'|'none'>('none')
  const [countdown, setCountdown] = useState(3)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const startTimer = () => {
    if (timerRef.current) return
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timerRef.current!) // @ts-ignore
          timerRef.current = null
          onConfirm()
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setCountdown(3)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!overlayRef.current) return
    const { left, width } = overlayRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const newRegion = x < width * 0.2 ? 'left' : 'right'
    if (newRegion !== region) {
      setRegion(newRegion)
      if (newRegion === 'right') startTimer()
      else resetTimer()
    }
  }

  const handleMouseLeave = () => {
    setRegion('none')
    startTimer() // start confirm countdown in center
  }

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* children behind */}
      <div className="pointer-events-none">{children}</div>
      {/* overlay */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-y-0 left-0 w-1/5 border-2 border-red-500 flex items-center justify-center text-red-500 font-bold">
          Pick
        </div>
        <div className="absolute inset-y-0 left-1/5 w-4/5 border-2 border-green-500 flex flex-col items-center justify-center text-green-500 font-bold">
          Confirm
          {countdown > 0 && (
            <div className="mt-2 flex space-x-1">
              {Array.from({ length: countdown }).map((_, i) => (
                <div key={i} className="h-2 w-2 bg-white rounded-full"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 