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
      setCurrentStep("datetime")
    }
  }

  const handleExerciseComplete = () => {
    setExerciseIndex((prev) => prev + 1)
    setQuestionIndex((prev) => prev + 1)
    setCurrentStep("questionnaire")
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
      // Format the data for WhatsApp
      const formattedDate = selectedDateTime?.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })

      // Prepare the message for WhatsApp
      let message = `*New Booking Request*\n\n`
      message += `*Name:* ${personalInfo.name}\n`
      message += `*Email:* ${personalInfo.email}\n`
      message += `*Phone:* ${personalInfo.phone}\n`
      message += `*Date & Time:* ${formattedDate}\n`
      message += `*Timezone:* ${selectedTimezone}\n\n`
      message += `*Additional Concerns:* ${personalInfo.concerns || "None"}\n\n`
      message += `*Questionnaire Responses:*\n`

      // Add all question answers
      questions.forEach((q) => {
        message += `*${q.question}*\n${answers[q.id] || "Not answered"}\n\n`
      })

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message)

      // Open WhatsApp with the pre-filled message
      window.open(`https://wa.me/923418349814?text=${encodedMessage}`, "_blank")

      // Set success state
      setCurrentStep("success")
    } catch (error) {
      console.error("Error sending booking:", error)
      alert("There was an error processing your booking. Please try again.")
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
            <h2 className="text-2xl font-medium text-slate-800 mb-4">Booking Successful!</h2>
            <p className="text-slate-600 mb-6">
              Your session has been booked successfully. We've sent the details to our team via WhatsApp. You'll receive
              a confirmation shortly.
            </p>
            <Button
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all border border-violet-500 font-medium"
              onClick={() => (window.location.href = "/")}
            >
              Return to Home
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-slate-800 mb-2">Book Your Session</h1>
        <p className="text-slate-600">
          Take a few moments to help us understand your needs before booking your personalized session.
        </p>
        <div className="mt-6">
          <Progress value={progress} className="h-2 bg-slate-100" />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Start</span>
            <span>Complete</span>
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
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white"
            >
              Continue <ChevronRight size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
