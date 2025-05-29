"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const FloatingParticles = () => {
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

  // Reduce number of particles on mobile
  const particleCount = isMobile ? 10 : 30

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: particleCount }).map((_, index) => {
        // Calculate random positions and sizes
        const size = Math.random() * (isMobile ? 40 : 80) + 20
        const left = Math.random() * 100
        const top = Math.random() * 100
        const delay = Math.random() * 5
        const duration = Math.random() * 15 + (isMobile ? 20 : 10)
        const opacity = Math.random() * 0.07 + (isMobile ? 0.01 : 0.03)

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-br from-violet-300/10 to-pink-300/10 blur-xl will-change-transform"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
            }}
            animate={{
              x: [
                Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50),
                Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50),
              ],
              y: [
                Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50),
                Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50),
              ],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

export default FloatingParticles
