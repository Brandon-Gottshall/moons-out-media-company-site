import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        variant === "default" && "btn-primary",
        variant === "outline" && "btn-secondary",
        variant === "ghost" && "text-primary hover:bg-primary/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
