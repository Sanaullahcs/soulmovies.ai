"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PersonalInfo {
  name: string
  email: string
  phone: string
  concerns: string
}

interface PersonalInfoFormProps {
  initialValues: PersonalInfo
  onSubmit: (info: PersonalInfo) => void
}

export default function PersonalInfoForm({ initialValues, onSubmit }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof PersonalInfo]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-slate-800">Your Information</h2>
      <p className="text-slate-600">Please provide your contact details so we can confirm your booking.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn(errors.name && "border-red-300 focus:ring-red-500")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(errors.email && "border-red-300 focus:ring-red-500")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone" className="text-slate-700">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={cn(errors.phone && "border-red-300 focus:ring-red-500")}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="concerns" className="text-slate-700">
            Additional Concerns or Requests
          </Label>
          <Textarea
            id="concerns"
            name="concerns"
            value={formData.concerns}
            onChange={handleChange}
            placeholder="Is there anything specific you'd like to address in your session?"
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-full px-6 py-2 h-auto shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            Continue <ChevronRight size={16} />
          </Button>
        </div>
      </form>
    </div>
  )
}
