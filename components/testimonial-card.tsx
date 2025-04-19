"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TestimonialCardProps {
  name: string
  location: string
  quote: string
  rating: number
  imageSrc: string
  slug?: string
}

const TestimonialCard = ({ name, location, quote, rating, imageSrc, slug }: TestimonialCardProps) => {
  // Create a slug from the name if not provided
  const storySlug = slug || name.toLowerCase().replace(/\s+/g, "-")

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative element */}
      <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-violet-100/30 blur-3xl"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center mb-5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-violet-200 flex-shrink-0">
            <Image
              src={imageSrc || "https://randomuser.me/api/portraits/lego/1.jpg"}
              alt={name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h4 className="text-base font-medium text-slate-800">{name}</h4>
            <p className="text-xs text-violet-600">{location}</p>
          </div>
        </div>

        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
          ))}
        </div>

        <div className="relative mb-4">
          <Quote size={24} className="absolute -top-2 -left-1 text-violet-200 opacity-50" />
          <p className="text-sm text-slate-600 italic line-clamp-4 pl-6 flex-grow">{quote}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs font-medium text-violet-600">Verified Client</span>
          <Link
            href={`/stories#${storySlug}`}
            className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors flex items-center"
          >
            Read Full Story
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
