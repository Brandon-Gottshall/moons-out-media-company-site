import Link from "next/link"

// This is a Server Component by default (no "use client")
export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Moons Out Media Home">
      <div className="text-2xl font-bold relative">
        <span className="text-cyberpunk-blue mr-1 tracking-wider">MOONS</span>
        <span className="text-cyberpunk-pink tracking-wider">OUT</span>
        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink"></span>
      </div>
    </Link>
  )
} 