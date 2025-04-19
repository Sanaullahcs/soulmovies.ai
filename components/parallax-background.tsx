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
  overlayColor = "bg-gradient-to-br from-violet-900/40 via-violet-700/30 to-rose-500/40",
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
      <motion.div
        className="absolute inset-0 z-0 h-full w-full"
        style={{ y }}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
            height: "100%",
            backgroundImage: "linear-gradient(to bottom right, rgba(124, 58, 237, 0.6), rgba(219, 39, 119, 0.4))",
            boxShadow: "inset 0 0 100px rgba(139, 92, 246, 0.2)",
            mixBlendMode: "soft-light",
            opacity: 0.85,
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}
        />
      </motion.div>
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}

export default ParallaxBackground
