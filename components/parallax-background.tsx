"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface ParallaxBackgroundProps {
  children: ReactNode
  imageSrc: string
  overlayColor?: string
  className?: string
  speed?: number
  minHeight?: string
  enableParticles?: boolean
}

const ParallaxBackground = ({
  children,
  imageSrc,
  overlayColor = "bg-gradient-to-br from-violet-900/40 via-violet-700/30 to-rose-500/40",
  className = "",
  speed = 0.5,
  minHeight = "auto",
  enableParticles = false,
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Enhanced parallax layers with spring physics
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 60}%`]))
  const overlayY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 30}%`]))
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${speed * -15}%`]))

  // Additional depth layers
  const midgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 40}%`]))
  const foregroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 20}%`]))

  // Rotation and scale effects
  const backgroundRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, speed * 2]))
  const backgroundScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.05, 1.15]))

  return (
    <div ref={ref} className={`relative overflow-hidden ${className} mb-8 md:mb-12`} style={{ minHeight }}>
      {/* Enhanced background layer with rotation and scale */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          y: backgroundY,
          rotate: backgroundRotate,
          scale: backgroundScale,
        }}
        initial={{ opacity: 0.8, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={imageSrc || "/placeholder.svg?height=1080&width=1920&text=Background&bg=a78bfa&textColor=ffffff"}
          alt="Parallax background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Midground layer for depth */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{ y: midgroundY }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-pink-600/10" />
      </motion.div>

      {/* Enhanced overlay layer with multiple gradients */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ y: overlayY }}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div
          className={`absolute inset-0 ${overlayColor}`}
          style={{
            height: "100%",
            background: `
              linear-gradient(135deg, rgba(124, 58, 237, 0.6) 0%, rgba(219, 39, 119, 0.4) 100%),
              radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
            `,
            mixBlendMode: "soft-light",
            opacity: 0.85,
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* Foreground decorative layer */}
      <motion.div
        className="absolute inset-0 z-15"
        style={{ y: foregroundY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {enableParticles && (
          <>
            {/* Floating particles */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
            <div
              className="absolute top-40 right-32 w-1 h-1 bg-violet-300/40 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-32 left-40 w-3 h-3 bg-pink-300/30 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-float"
              style={{ animationDelay: "3s" }}
            ></div>
          </>
        )}
      </motion.div>

      {/* Content layer with enhanced counter-parallax */}
      <motion.div
        className="relative z-20 w-full h-full"
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxBackground
