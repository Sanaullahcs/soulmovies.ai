"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

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
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Adjust speed for mobile
  const effectiveSpeed = isMobile ? speed * 0.5 : speed

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Enhanced parallax layers with spring physics - optimized for mobile
  const springConfig = {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  }

  // Optimize spring animations
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * 60}%`]), springConfig)

  const overlayY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * 30}%`]), springConfig)

  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * -15}%`]), springConfig)

  // Additional depth layers - simplified for mobile
  const midgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * 40}%`]), springConfig)

  const foregroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * 20}%`]), springConfig)

  // Rotation and scale effects - reduced for mobile
  const backgroundRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? effectiveSpeed : effectiveSpeed * 2]),
    springConfig,
  )

  const backgroundScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.05, isMobile ? 1.1 : 1.15]), springConfig)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className} mb-8 md:mb-12`} style={{ minHeight }}>
      {/* Enhanced background layer with rotation and scale */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full hardware-accelerated will-change-transform"
        style={{
          y: backgroundY,
          rotate: backgroundRotate,
          scale: backgroundScale,
        }}
        initial={{ opacity: 0.8, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: isMobile ? 0.8 : 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={imageSrc || "/placeholder.svg?height=1080&width=1920&text=Background&bg=a78bfa&textColor=ffffff"}
          alt="Parallax background"
          fill
          className="object-cover"
          priority
          loading="eager"
        />
      </motion.div>

      {/* Midground layer for depth - simplified on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-5 will-change-transform"
          style={{ y: midgroundY }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-pink-600/10" />
        </motion.div>
      )}

      {/* Enhanced overlay layer with multiple gradients */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: isMobile ? 0.8 : 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className={`absolute inset-0 ${overlayColor}`}
          style={{
            height: "100%",
            background: `linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(219, 39, 119, 0.3) 100%)`,
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: isMobile ? "blur(1px)" : "blur(2px)",
            WebkitBackdropFilter: isMobile ? "blur(1px)" : "blur(2px)",
          }}
        />
      </motion.div>

      {/* Foreground decorative layer - disabled on mobile for performance */}
      {(!isMobile || !enableParticles) && (
        <motion.div
          className="absolute inset-0 z-15 will-change-transform"
          style={{ y: foregroundY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isMobile ? 0.8 : 1.5, delay: 0.5 }}
        >
          {enableParticles && (
            <>
              {/* Floating particles - reduced on mobile */}
              <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
              <div
                className="absolute top-40 right-32 w-1 h-1 bg-violet-300/40 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              {!isMobile && (
                <>
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
            </>
          )}
        </motion.div>
      )}

      {/* Content layer with enhanced counter-parallax */}
      <motion.div
        className="relative z-20 w-full h-full will-change-transform"
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.8 : 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxBackground
