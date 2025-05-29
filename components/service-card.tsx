"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
  index?: number
  className?: string
}

const ServiceCard = ({ title, description, icon, delay = 0, index = 0, className }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full perspective-1000"
    >
      <motion.div
        ref={cardRef}
        className={cn(
          "glass-card rounded-3xl p-8 shadow-soft hover:shadow-elevation transition-elegant h-full flex flex-col group relative overflow-hidden border border-violet-100/50",
          className,
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-transparent to-pink-50/0 group-hover:from-violet-50/50 group-hover:to-pink-50/30 transition-elegant rounded-3xl" />

        {/* Floating orb */}
        <motion.div
          className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-pink-100/20 to-violet-100/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-elegant"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Enhanced icon section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { delay: delay + 0.2, duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:from-violet-500/20 group-hover:to-pink-500/20 transition-elegant border border-violet-200/50 group-hover:border-violet-300/70"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="text-violet-600 group-hover:text-violet-700 transition-elegant"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced title */}
          <motion.h3
            className="text-xl font-bold text-slate-800 mb-4 group-hover:text-violet-700 transition-elegant leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: delay + 0.3, duration: 0.6 },
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>

          {/* Enhanced description */}
          <motion.p
            className="text-slate-600 leading-relaxed flex-grow text-[15px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: delay + 0.4, duration: 0.6 },
            }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>

          {/* Enhanced footer with subtle animation */}
          <motion.div
            className="mt-6 pt-4 border-t border-violet-100/50 group-hover:border-violet-200/70 transition-elegant"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: delay + 0.5, duration: 0.6 },
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center text-sm font-semibold text-violet-600 group-hover:text-violet-700 transition-elegant"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <span>Learn more</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-elegant"
          initial={{ x: "-100%" }}
          whileHover={{
            x: "100%",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ServiceCard
