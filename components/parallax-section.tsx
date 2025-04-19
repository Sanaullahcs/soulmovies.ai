"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  speed?: number
  opacity?: boolean
  scale?: boolean
  rotate?: boolean
}

const ParallaxSection = ({
  children,
  className = "",
  direction = "up",
  speed = 0.2,
  opacity = true,
  scale = false,
  rotate = false,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const defaultX = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  const defaultY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])

  const upY = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, "0%"])
  const downY = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const leftX = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, "0%"])
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  let x = defaultX
  let y = defaultY

  if (direction === "up") {
    y = upY
  } else if (direction === "down") {
    y = downY
  } else if (direction === "left") {
    x = leftX
  } else if (direction === "right") {
    x = rightX
  }

  const opacityValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])

  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [0.8, 1, 0.8] : [1, 1, 1])

  const rotateValue = useTransform(scrollYProgress, [0, 1], rotate ? [-5, 5] : [0, 0])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          x,
          y,
          opacity: opacity ? opacityValue : 1,
          scale: scaleValue,
          rotate: rotateValue,
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxSection
