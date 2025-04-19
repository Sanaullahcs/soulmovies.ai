"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Check } from "lucide-react"

interface Exercise {
  id: string
  title: string
  description: string
  type: "breathing" | "visualization" | "gratitude" | "reflection"
  duration: number // in seconds
}

interface MindExerciseProps {
  exercise: Exercise
  onComplete: () => void
}

export default function MindExercise({ exercise, onComplete }: MindExerciseProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(exercise.duration)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (!isStarted || timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)

      if (timeLeft === 1) {
        setIsCompleted(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [isStarted, timeLeft])

  const handleStart = () => {
    setIsStarted(true)
  }

  const renderExerciseContent = () => {
    if (!isStarted) {
      return (
        <div className="text-center">
          <Button
            onClick={handleStart}
            className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-full px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            <Sparkles size={18} /> Begin Exercise
          </Button>
        </div>
      )
    }

    if (isCompleted) {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-2">Well Done!</h3>
          <p className="text-slate-600 mb-6">
            You've completed this exercise. Take a moment to notice how you feel before continuing.
          </p>
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-full px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all"
          >
            Continue to Next Question
          </Button>
        </div>
      )
    }

    switch (exercise.type) {
      case "breathing":
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <motion.div
                className="absolute inset-0 bg-violet-100 rounded-full"
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  opacity: [0.7, 0.9, 0.9, 0.7, 0.7],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-violet-600 font-medium">
                {timeLeft}s
              </div>
            </div>
            <p className="text-slate-700 text-lg mb-2">{timeLeft % 8 < 4 ? "Breathe in..." : "Breathe out..."}</p>
            <p className="text-slate-600">Focus on your breath and follow the circle's rhythm.</p>
          </div>
        )

      case "visualization":
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-400 to-rose-300 flex items-center justify-center text-white font-medium">
              {timeLeft}s
            </div>
            <p className="text-slate-700 text-lg mb-2">Close your eyes and visualize...</p>
            <p className="text-slate-600">Imagine a peaceful place where you feel completely at ease.</p>
          </div>
        )

      case "gratitude":
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-300 to-rose-300 flex items-center justify-center text-white font-medium">
              {timeLeft}s
            </div>
            <p className="text-slate-700 text-lg mb-2">Think of three things you're grateful for...</p>
            <p className="text-slate-600">Take this moment to appreciate the positive aspects of your life.</p>
          </div>
        )

      case "reflection":
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center text-white font-medium">
              {timeLeft}s
            </div>
            <p className="text-slate-700 text-lg mb-2">Reflect on your strengths...</p>
            <p className="text-slate-600">Consider the qualities that make you unique and valuable.</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-violet-50 rounded-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 text-violet-600 mb-4">
          <Sparkles size={20} />
        </div>
        <h2 className="text-xl font-medium text-slate-800 mb-2">{exercise.title}</h2>
        <p className="text-slate-600">{exercise.description}</p>
      </div>

      <div className="py-6">{renderExerciseContent()}</div>
    </div>
  )
}
