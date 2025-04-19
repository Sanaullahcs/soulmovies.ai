"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  className?: string
  slug?: string
}

const ServiceCard = ({ title, description, icon, className, slug }: ServiceCardProps) => {
  // Convert title to slug if not provided
  const serviceSlug = slug || title.toLowerCase().replace(/\s+/g, "-")

  return (
    <motion.div
      className={cn(
        "relative overflow-visible rounded-3xl p-6 md:p-8 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30",
        className,
      )}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative background elements */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-purple-100/50 blur-2xl" />
      <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-100 to-pink-100 text-violet-600 shadow-sm">
          {icon}
        </div>

        <h3 className="text-lg font-medium text-slate-800 mb-3">{title}</h3>

        <p className="text-sm text-slate-600 line-clamp-4 flex-grow mb-4">{description}</p>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <Link
            href={`/services#${serviceSlug}`}
            className="text-sm font-medium text-violet-600 inline-flex items-center hover:text-violet-700 transition-colors"
          >
            Read more
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
