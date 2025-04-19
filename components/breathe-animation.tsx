"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BreatheAnimationProps {
  isActive: boolean
}

const BreatheAnimation = ({ isActive }: BreatheAnimationProps) => {
  const [breathePhase, setBreathePhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [counter, setCounter] = useState(4)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          // Change phase when counter reaches 0
          setBreathePhase((currentPhase) => {
            switch (currentPhase) {
              case "inhale":
                return "hold"
              case "hold":
                return "exhale"
              case "exhale":
                return "rest"
              case "rest":
                return "inhale"
              default:
                return "inhale"
            }
          })

          // Set new counter based on the next phase
          switch (breathePhase) {
            case "inhale":
              return 4 // Hold for 4 seconds
            case "hold":
              return 4 // Exhale for 4 seconds
            case "exhale":
              return 2 // Rest for 2 seconds
            case "rest":
              return 4 // Inhale for 4 seconds
            default:
              return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, breathePhase])

  const circleVariants = {
    inhale: {
      scale: 1.5,
      opacity: 0.8,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      opacity: 0.8,
      transition: { duration: 4, ease: "linear" },
    },
    exhale: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 4, ease: "easeInOut" },
    },
    rest: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 2, ease: "linear" },
    },
  }

  if (!isActive) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="text-center">
        <motion.div
          className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"
          variants={circleVariants}
          animate={breathePhase}
        />
        <h3 className="text-white text-2xl mb-2 lowercase">
          {breathePhase === "inhale" && "breathe in"}
          {breathePhase === "hold" && "hold"}
          {breathePhase === "exhale" && "breathe out"}
          {breathePhase === "rest" && "rest"}
        </h3>
        <p className="text-white/80 text-4xl">{counter}</p>
        <button
          className="mt-8 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent("closeBreathe"))}
        >
          close
        </button>
      </div>
    </div>
  )
}

export default BreatheAnimation
