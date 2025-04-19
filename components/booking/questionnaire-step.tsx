"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "open-ended"
  options?: string[]
}

interface QuestionnaireStepProps {
  question: Question
  onSubmit: (questionId: string, answer: string) => void
  currentAnswer: string
}

export default function QuestionnaireStep({ question, onSubmit, currentAnswer }: QuestionnaireStepProps) {
  const [answer, setAnswer] = useState(currentAnswer)
  const [error, setError] = useState("")

  useEffect(() => {
    setAnswer(currentAnswer)
  }, [currentAnswer, question.id])

  const handleSubmit = () => {
    if (!answer.trim()) {
      setError("Please provide an answer before continuing")
      return
    }

    setError("")
    onSubmit(question.id, answer)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-slate-800">{question.question}</h2>

      {question.type === "multiple-choice" && question.options && (
        <RadioGroup value={answer} onValueChange={setAnswer} className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-slate-700">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {question.type === "open-ended" && (
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[120px]"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-full px-6 py-2 h-auto shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Continue <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
