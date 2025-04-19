"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  faqs: FaqItem[]
}

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto pb-8">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-violet-100/30"
          whileHover={{ y: -2 }}
        >
          <button
            onClick={() => toggleItem(index)}
            className={cn(
              "flex items-center justify-between w-full p-5 text-left transition-colors",
              activeIndex === index ? "bg-violet-50" : "hover:bg-violet-50/50",
            )}
          >
            <div className="flex items-center">
              <HelpCircle size={18} className="text-violet-500 mr-3 flex-shrink-0" />
              <span className="text-base font-medium text-slate-800">{faq.question}</span>
            </div>
            <ChevronDown
              size={18}
              className={cn(
                "text-violet-500 transition-transform duration-300",
                activeIndex === index ? "rotate-180" : "",
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                key={`content-${index}`}
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-visible"
              >
                <div className="px-5 py-6 text-sm text-slate-600 border-t border-slate-100">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default FaqAccordion
