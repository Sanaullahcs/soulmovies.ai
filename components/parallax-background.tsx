"use client"

import type { ReactNode } from "react"
import Image from "next/image"

interface StaticBackgroundProps {
  children: ReactNode
  imageSrc: string
  overlayColor?: string
  className?: string
  minHeight?: string
}

const StaticBackground = ({
  children,
  imageSrc,
  overlayColor = "bg-gradient-to-br from-violet-900/40 via-violet-700/30 to-rose-500/40",
  className = "",
  minHeight = "auto",
}: StaticBackgroundProps) => {
  return (
    <div className={`relative overflow-hidden ${className} mb-8 md:mb-12`} style={{ minHeight }}>
      {/* Static background layer */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={imageSrc || "/placeholder.svg?height=1080&width=1920&text=Background&bg=a78bfa&textColor=ffffff"}
          alt="Background"
          fill
          className="object-cover"
          priority
          loading="eager"
        />
      </div>

      {/* Static overlay layer */}
      <div className="absolute inset-0 z-10">
        <div
          className={`absolute inset-0 ${overlayColor}`}
          style={{
            height: "100%",
            background: `linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(219, 39, 119, 0.3) 100%)`,
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  )
}

export default StaticBackground
