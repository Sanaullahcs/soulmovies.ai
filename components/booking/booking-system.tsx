"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import QuestionnaireStep from "./questionnaire-step"
import MindExercise from "./mind-exercise"
import DateTimeSelector from "./date-time-selector"
import PersonalInfoForm from "./personal-info-form"
import ConfirmationStep from "./confirmation-step"
import { questions } from "./questions-data"
import { exercises } from "./exercises-data"

type BookingStep = "questionnaire" | "exercise" | "datetime" | "personal-info" | "confirmation" | "success"

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("questionnaire")
  const [questionIndex, setQuestionIndex] = useState(0)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  const [selectedTimezone, setSelectedTimezone] = useState<string>("")
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    concerns: "",
  })
  const [progress, setProgress] = useState(0)

  // Calculate progress percentage
  useEffect(() => {
    const totalSteps = questions.length + 3 // questions + datetime + personal info + confirmation
    let completedSteps = Object.keys(answers).length

    if (
      currentStep === "datetime" ||
      currentStep === "personal-info" ||
      currentStep === "confirmation" ||
      currentStep === "success"
    ) {
      completedSteps += 1
    }

    if (currentStep === "personal-info" || currentStep === "confirmation" || currentStep === "success") {
      completedSteps += 1
    }

    if (currentStep === "confirmation" || currentStep === "success") {
      completedSteps += 1
    }

    if (currentStep === "success") {
      completedSteps = totalSteps
    }

    setProgress((completedSteps / totalSteps) * 100)
  }, [currentStep, answers])

  const handleAnswerSubmit = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))

    // Check if we need to show an exercise
    if ((questionIndex + 1) % 4 === 0 && questionIndex < questions.length - 1) {
      setCurrentStep("exercise")
    } else if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1)
    } else {
      // After completing all questions, redirect to Calendly
      handleRedirectToCalendly()
    }
  }

  const handleExerciseComplete = () => {
    setExerciseIndex((prev) => prev + 1)
    setQuestionIndex((prev) => prev + 1)
    setCurrentStep("questionnaire")
  }

  const handleRedirectToCalendly = async () => {
    try {
      // Save the questionnaire data before redirecting
      const bookingData = {
        answers,
        questions,
        timestamp: new Date().toISOString(),
        bookingId: `SM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }

      // Send questionnaire data to your backend
      await fetch("/api/save-questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      // Redirect to correct Calendly link
      window.location.href = "https://calendly.com/soulmovies-ai/30min"
    } catch (error) {
      console.error("Error saving questionnaire:", error)
      // Still redirect to Calendly even if saving fails
      window.location.href = "https://calendly.com/soulmovies-ai/30min"
    }
  }

  const handleDateTimeSubmit = (date: Date, timezone: string) => {
    setSelectedDateTime(date)
    setSelectedTimezone(timezone)
    setCurrentStep("personal-info")
  }

  const handlePersonalInfoSubmit = (info: typeof personalInfo) => {
    setPersonalInfo(info)
    setCurrentStep("confirmation")
  }

  const handleConfirmation = async () => {
    try {
      // Format the data for email
      const formattedDate = selectedDateTime?.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })

      // Prepare the booking data
      const bookingData = {
        personalInfo,
        selectedDateTime: formattedDate,
        selectedTimezone,
        answers,
        questions,
        timestamp: new Date().toISOString(),
        bookingId: `SM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }

      // Send email via API route
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error("Failed to send booking")
      }

      // Redirect to Calendly instead of showing success
      window.location.href = "https://calendly.com/soulmovies-ai/30min"
    } catch (error) {
      console.error("Error sending booking:", error)
      alert("There was an error processing your booking. Please try again or contact us directly.")
    }
  }

  const handleBack = () => {
    if (currentStep === "exercise") {
      setCurrentStep("questionnaire")
    } else if (currentStep === "datetime") {
      setQuestionIndex(questions.length - 1)
      setCurrentStep("questionnaire")
    } else if (currentStep === "personal-info") {
      setCurrentStep("datetime")
    } else if (currentStep === "confirmation") {
      setCurrentStep("personal-info")
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "questionnaire":
        return (
          <QuestionnaireStep
            question={questions[questionIndex]}
            onSubmit={handleAnswerSubmit}
            currentAnswer={answers[questions[questionIndex].id] || ""}
          />
        )
      case "exercise":
        return (
          <MindExercise exercise={exercises[exerciseIndex % exercises.length]} onComplete={handleExerciseComplete} />
        )
      case "datetime":
        return (
          <DateTimeSelector
            onSubmit={handleDateTimeSubmit}
            selectedDate={selectedDateTime}
            selectedTimezone={selectedTimezone}
          />
        )
      case "personal-info":
        return <PersonalInfoForm initialValues={personalInfo} onSubmit={handlePersonalInfoSubmit} />
      case "confirmation":
        return (
          <ConfirmationStep
            answers={answers}
            questions={questions}
            dateTime={selectedDateTime}
            timezone={selectedTimezone}
            personalInfo={personalInfo}
            onConfirm={handleConfirmation}
          />
        )
      case "success":
        return (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-medium text-slate-800 mb-4">Redirecting to Schedule...</h2>
            <p className="text-slate-600 mb-6">
              Thank you for completing the questionnaire. You'll be redirected to schedule your session shortly.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-slate-800 mb-2">Begin Your SoulMovie Journey</h1>
        <p className="text-slate-600">
          Share your soul's calling with us so we can create a meditation movie uniquely designed for your
          transformation.
        </p>
        <div className="mt-6">
          <Progress value={progress} className="h-2 bg-slate-100" />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Soul Discovery</span>
            <span>Schedule Session</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep + questionIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {currentStep !== "questionnaire" && currentStep !== "success" && (
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ChevronLeft size={16} /> Back
          </Button>

          {currentStep === "exercise" && (
            <Button
              onClick={handleExerciseComplete}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white"
            >
              Continue <ChevronRight size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
