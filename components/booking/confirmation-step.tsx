"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Check, Calendar, User, MessageSquare } from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "open-ended"
  options?: string[]
}

interface PersonalInfo {
  name: string
  email: string
  phone: string
  concerns: string
}

interface ConfirmationStepProps {
  answers: Record<string, string>
  questions: Question[]
  dateTime: Date | null
  timezone: string
  personalInfo: PersonalInfo
  onConfirm: () => void
}

export default function ConfirmationStep({
  answers,
  questions,
  dateTime,
  timezone,
  personalInfo,
  onConfirm,
}: ConfirmationStepProps) {
  // Function to get a readable timezone name
  const getReadableTimezone = (tz: string) => {
    try {
      // Try to get a more readable format if possible
      const now = new Date()
      const tzOptions = { timeZoneName: "long", timeZone: tz } as Intl.DateTimeFormatOptions
      const tzParts = new Intl.DateTimeFormat("en-US", tzOptions).formatToParts(now)
      const timeZonePart = tzParts.find((part) => part.type === "timeZoneName")
      return timeZonePart ? timeZonePart.value : tz
    } catch (e) {
      // Fallback to the raw timezone if there's an error
      return tz
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-slate-800">Confirm Your Booking</h2>
      <p className="text-slate-600">Please review your information before finalizing your booking.</p>

      <div className="space-y-6">
        <div className="bg-violet-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calendar className="text-violet-600 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <h3 className="text-sm font-medium text-slate-800">Session Date & Time</h3>
              {dateTime ? (
                <div>
                  <p className="text-slate-700">
                    {format(dateTime, "EEEE, MMMM d, yyyy")} at {format(dateTime, "h:mm a")}
                  </p>
                  <p className="text-slate-600 text-sm mt-1">Timezone: {getReadableTimezone(timezone)}</p>
                </div>
              ) : (
                <p className="text-red-500">No date selected</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-violet-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <User className="text-violet-600 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <h3 className="text-sm font-medium text-slate-800">Your Information</h3>
              <p className="text-slate-700">{personalInfo.name}</p>
              <p className="text-slate-700">{personalInfo.email}</p>
              <p className="text-slate-700">{personalInfo.phone}</p>
              {personalInfo.concerns && (
                <>
                  <h4 className="text-sm font-medium text-slate-800 mt-2">Additional Concerns:</h4>
                  <p className="text-slate-700">{personalInfo.concerns}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-violet-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="text-violet-600 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <h3 className="text-sm font-medium text-slate-800">Your Responses</h3>
              <div className="space-y-3 mt-2">
                {questions.map((question) => (
                  <div key={question.id}>
                    <p className="text-sm font-medium text-slate-700">{question.question}</p>
                    <p className="text-slate-600">{answers[question.id] || "Not answered"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 mt-6">
        <p className="text-slate-600 text-sm mb-4">
          By confirming, your booking details will be sent to our team via WhatsApp. We'll contact you shortly to
          confirm your appointment.
        </p>
        <Button
          onClick={onConfirm}
          className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-full w-full py-3 h-auto shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Check size={18} /> Confirm Booking
        </Button>
      </div>
    </div>
  )
}
