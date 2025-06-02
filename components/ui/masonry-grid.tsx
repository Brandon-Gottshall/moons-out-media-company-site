import { cn } from "@/lib/utils"

interface MasonryGridProps {
  children: React.ReactNode
  className?: string
}

export function MasonryGrid({ children, className }: MasonryGridProps) {
  return (
    <div className={cn(
      "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6",
      "[&>*]:break-inside-avoid [&>*]:mb-6 [&>*]:inline-block [&>*]:w-full",
      className
    )}>
      {children}
    </div>
  )
} 