"use client"
import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MasonryGridProps {
  children: React.ReactNode
  className?: string
}

export function MasonryGrid({ children, className }: MasonryGridProps) {
  const [columns, setColumns] = useState<number>(1)

  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth
      if (width >= 1280) return 4
      if (width >= 1024) return 3
      if (width >= 768) return 2
      return 1
    }
    const updateColumns = () => setColumns(calculateColumns())
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const items = React.Children.toArray(children)
  const columnsArray = Array.from({ length: columns }, () => [] as React.ReactNode[])
  items.forEach((child, index) => {
    columnsArray[index % columns].push(child)
  })

  return (
    <div className={cn('flex gap-6', className)}>
      {columnsArray.map((columnItems, idx) => (
        <div key={idx} className="flex flex-col gap-6 flex-1">
          {columnItems}
        </div>
      ))}
    </div>
  )
} 