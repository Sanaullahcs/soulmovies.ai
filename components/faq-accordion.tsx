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
    <div className="space-y-4 w-full max-w-3xl mx-auto pb-8">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="rounded-2xl overflow-hidden glass-card shadow-soft hover:shadow-medium transition-elegant border border-violet-100/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -2 }}
        >
          <motion.button
            onClick={() => toggleItem(index)}
            className={cn(
              "flex items-center justify-between w-full p-6 text-left transition-elegant",
              activeIndex === index ? "bg-violet-50/50" : "hover:bg-violet-50/30",
            )}
            whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center">
              <motion.div
                className="mr-4 flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <HelpCircle size={20} className="text-violet-500" />
              </motion.div>
              <span className="text-base font-semibold text-slate-800">{faq.question}</span>
            </div>
            <motion.div
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ChevronDown size={20} className="text-violet-500" />
            </motion.div>
          </motion.button>

          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                key={`content-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <motion.div
                  className="px-6 py-6 text-sm text-slate-600 border-t border-violet-100/30 leading-relaxed"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default FaqAccordion
