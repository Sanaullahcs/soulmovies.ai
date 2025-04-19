"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ResourceCardProps {
  title: string
  excerpt: string
  imageSrc: string
  slug: string
}

const ResourceCard = ({ title, excerpt, imageSrc, slug }: ResourceCardProps) => {
  return (
    <motion.div
      className="group overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={
            imageSrc || "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=500&auto=format&fit=crop"
          }
          alt={title}
          fill
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        {/* Decorative element */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-violet-100/30 blur-3xl"></div>

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-lg font-medium text-slate-800 mb-3 line-clamp-2">{title}</h3>
          <p className="text-sm text-slate-600 mb-5 line-clamp-3 flex-grow">{excerpt}</p>

          <div className="mt-auto pt-4 border-t border-slate-100">
            <Link
              href={`/resources/${slug}`}
              className="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
            >
              Read More
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResourceCard
