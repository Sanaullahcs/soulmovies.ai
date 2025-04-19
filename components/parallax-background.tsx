"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxBackgroundProps {
  children: ReactNode
  imageSrc: string
  overlayColor?: string
  className?: string
  speed?: number
  minHeight?: string
}

const ParallaxBackground = ({
  children,
  imageSrc,
  overlayColor = "bg-gradient-to-b from-violet-900/30 via-violet-600/20 to-rose-500/30",
  className = "",
  speed = 0.2,
  minHeight = "auto",
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className} mb-8 md:mb-12`} style={{ minHeight }}>
      <motion.div className="absolute inset-0 z-0 h-full w-full" style={{ y }}>
        <Image
          src={imageSrc || "/placeholder.svg?height=1080&width=1920&text=Background&bg=a78bfa&textColor=ffffff"}
          alt="Parallax background"
          fill
          className="object-cover"
          priority
        />
        <div
          className={`absolute inset-0 ${overlayColor}`}
          style={{
            height: "calc(100% - 2rem)",
            marginBottom: "2rem",
          }}
        />
      </motion.div>
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}

export default ParallaxBackground
