"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

interface TestimonialCardProps {
  name: string
  location: string
  quote: string
  rating: number
  imageSrc: string
  slug?: string
  delay?: number
  index?: number
}

const TestimonialCard = ({
  name,
  location,
  quote,
  rating,
  imageSrc,
  slug,
  delay = 0,
  index = 0,
}: TestimonialCardProps) => {
  const storySlug = slug || name.toLowerCase().replace(/\s+/g, "-")
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

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
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        className="glass-card rounded-3xl p-8 shadow-soft hover:shadow-elevation transition-elegant h-full flex flex-col group relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-transparent to-pink-50/0 group-hover:from-violet-50/40 group-hover:to-pink-50/20 transition-elegant rounded-3xl" />

        {/* Floating orb */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-100/30 to-violet-100/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-elegant" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Profile section */}
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: delay + 0.1, duration: 0.5 },
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative w-16 h-16 rounded-2xl overflow-hidden mr-4 ring-2 ring-violet-200/50 flex-shrink-0 group-hover:ring-violet-300/70 transition-elegant"
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src={imageSrc || "https://randomuser.me/api/portraits/lego/1.jpg"}
                alt={name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <div>
              <h4 className="text-lg font-bold text-slate-800 group-hover:text-violet-700 transition-elegant">
                {name}
              </h4>
              <p className="text-sm text-violet-600 font-medium">{location}</p>
            </div>
          </motion.div>

          {/* Rating with enhanced animation */}
          <motion.div
            className="flex mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: delay + 0.2, duration: 0.5 },
            }}
            viewport={{ once: true }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    delay: delay + 0.3 + i * 0.05,
                    duration: 0.4,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  },
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.1 },
                }}
              >
                <Star
                  size={18}
                  className={cn(
                    "transition-elegant",
                    i < rating ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-slate-300",
                  )}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Quote with elegant reveal */}
          <motion.div
            className="relative mb-8 flex-grow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: delay + 0.4, duration: 0.5 },
            }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{
                scale: 1,
                rotate: 0,
                transition: { delay: delay + 0.5, duration: 0.4 },
              }}
              viewport={{ once: true }}
            >
              <Quote size={24} className="absolute -top-2 -left-2 text-violet-200 opacity-60" />
            </motion.div>
            <p className="text-slate-600 italic pl-6 leading-relaxed font-medium text-[15px]">"{quote}"</p>
          </motion.div>

          {/* Footer with enhanced interaction */}
          <motion.div
            className="mt-auto pt-6 border-t border-violet-100/50 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: delay + 0.6, duration: 0.5 },
            }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              Verified Client
            </motion.span>
            <Link
              href={`/stories#${storySlug}`}
              className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-elegant flex items-center group/link relative overflow-hidden"
            >
              <span className="relative z-10">Read Story</span>
              <motion.div className="ml-1 relative z-10" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>

              {/* Subtle underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-violet-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TestimonialCard
