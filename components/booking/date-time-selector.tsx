"use client"

import { useState } from "react"
import { format, setHours, setMinutes, addWeeks, addMinutes, isBefore } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DateTimeSelectorProps {
  onSubmit: (date: Date, timezone: string) => void
  selectedDate: Date | null
  selectedTimezone?: string
}

// List of common timezones
const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (ET) - New York" },
  { value: "America/Chicago", label: "Central Time (CT) - Chicago" },
  { value: "America/Denver", label: "Mountain Time (MT) - Denver" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT) - Los Angeles" },
  { value: "America/Anchorage", label: "Alaska Time - Anchorage" },
  { value: "Pacific/Honolulu", label: "Hawaii Time - Honolulu" },
  { value: "Europe/London", label: "GMT - London" },
  { value: "Europe/Paris", label: "Central European Time - Paris" },
  { value: "Europe/Athens", label: "Eastern European Time - Athens" },
  { value: "Asia/Dubai", label: "Gulf Standard Time - Dubai" },
  { value: "Asia/Kolkata", label: "India Standard Time - Mumbai" },
  { value: "Asia/Singapore", label: "Singapore Time" },
  { value: "Asia/Tokyo", label: "Japan Standard Time - Tokyo" },
  { value: "Australia/Sydney", label: "Australian Eastern Time - Sydney" },
  { value: "Pacific/Auckland", label: "New Zealand Time - Auckland" },
]

export default function DateTimeSelector({ onSubmit, selectedDate, selectedTimezone }: DateTimeSelectorProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate || undefined)
  const [time, setTime] = useState<string | null>(selectedDate ? format(selectedDate, "HH:mm") : null)
  const [timezone, setTimezone] = useState<string>(selectedTimezone || getUserTimezone())
  const [error, setError] = useState("")

  // Try to get the user's timezone
  function getUserTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
    } catch (e) {
      return "UTC"
    }
  }

  // Generate available time slots (9 AM to 5 PM, 45-minute sessions with 15-minute breaks)
  const generateTimeSlots = () => {
    if (!date) return []

    const slots = []
    const now = new Date()
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM

    let currentSlot = setHours(setMinutes(date, 0), startHour)

    while (isBefore(currentSlot, setHours(date, endHour))) {
      // Only include future time slots
      if (!isBefore(currentSlot, now)) {
        slots.push(format(currentSlot, "HH:mm"))
      }

      currentSlot = addMinutes(currentSlot, 60) // 1-hour slots
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleSubmit = () => {
    if (!date) {
      setError("Please select a date")
      return
    }

    if (!time) {
      setError("Please select a time")
      return
    }

    if (!timezone) {
      setError("Please select a timezone")
      return
    }

    setError("")

    // Combine date and time
    const [hours, minutes] = time.split(":").map(Number)
    const dateTime = setHours(setMinutes(date, minutes), hours)

    onSubmit(dateTime, timezone)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-slate-800">Select Date & Time</h2>
      <p className="text-slate-600">Choose a date, time, and timezone that works best for your session.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => {
              // Disable dates in the past and more than 4 weeks in the future
              const now = new Date()
              now.setHours(0, 0, 0, 0)
              const fourWeeksLater = addWeeks(now, 4)
              return isBefore(date, now) || date > fourWeeksLater
            }}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">Time ({timeSlots.length} available)</h3>
            {date ? (
              <div className="grid grid-cols-2 gap-2 h-[200px] overflow-y-auto p-1">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        time === slot && "border-violet-600 bg-violet-50 text-violet-600",
                      )}
                      onClick={() => setTime(slot)}
                    >
                      {format(
                        setHours(
                          setMinutes(new Date(), Number.parseInt(slot.split(":")[1])),
                          Number.parseInt(slot.split(":")[0]),
                        ),
                        "h:mm a",
                      )}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-2 flex items-center justify-center h-full text-slate-500 text-center">
                    No available times for this date. Please select another date.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] border rounded-md text-slate-500 text-center">
                Please select a date first
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="timezone" className="text-sm font-medium text-slate-700">
              Timezone
            </Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone" className="w-full mt-1">
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500 mt-1">
              All session times will be scheduled in your selected timezone.
            </p>
          </div>
        </div>
      </div>

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
