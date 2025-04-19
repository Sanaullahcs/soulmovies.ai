"use client"

import type React from "react"

import Image from "next/image"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ContactPageClient() {
  const [captchaValue, setCaptchaValue] = useState(generateCaptcha())
  const [userCaptcha, setUserCaptcha] = useState("")
  const [captchaError, setCaptchaError] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  // Generate a simple math captcha
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    return { equation: `${num1} + ${num2} = ?`, answer: num1 + num2 }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate captcha
    if (Number.parseInt(userCaptcha) !== captchaValue.answer) {
      setCaptchaError(true)
      return
    }

    setCaptchaError(false)

    // Format the message for WhatsApp
    const message = `*New Contact Request*\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || "Not provided"}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/15551234567?text=${encodedMessage}`, "_blank")

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setUserCaptcha("")
    setCaptchaValue(generateCaptcha())
  }

  // Refresh captcha
  const refreshCaptcha = () => {
    setCaptchaValue(generateCaptcha())
    setUserCaptcha("")
    setCaptchaError(false)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1920&auto=format&fit=crop"
            alt="Contact Us Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-700/30" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">Get In Touch</h1>
            <p className="text-lg text-white/90 max-w-2xl mb-0">
              We're here to answer your questions and support you on your journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
              <h2 className="text-2xl font-medium text-slate-800 mb-6">Send Us a Message</h2>
              <p className="text-slate-600 mb-8">
                Have questions about our services or want to schedule a consultation? Fill out the form below and we'll
                get back to you as soon as possible.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Subject*
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="services">Services Information</option>
                    <option value="booking">Book a Session</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="captcha" className="block text-sm font-medium text-slate-700 mb-1">
                    Verification* <span className="text-xs text-slate-500">(Anti-spam)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-slate-700 flex-grow">
                      {captchaValue.equation}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-3 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
                      aria-label="Refresh captcha"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path d="M3 21v-5h5"></path>
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    id="captcha"
                    required
                    className={`mt-2 w-full px-4 py-3 rounded-lg border ${captchaError ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-violet-500"} focus:outline-none focus:ring-2 focus:border-transparent`}
                    placeholder="Enter the answer"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                  />
                  {captchaError && <p className="text-red-500 text-sm mt-1">Incorrect answer. Please try again.</p>}
                </div>

                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium">
                  <MessageSquare size={18} className="mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-violet-50 rounded-3xl p-8 shadow-md border border-violet-100">
                <h3 className="text-xl font-medium text-slate-800 mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-violet-600 mt-1 mr-4" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Email</p>
                      <a
                        href="mailto:hello@soulmovies.ai"
                        className="text-slate-600 hover:text-violet-600 transition-colors"
                      >
                        hello@soulmovies.ai
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="text-violet-600 mt-1 mr-4" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Phone</p>
                      <a href="tel:+15551234567" className="text-slate-600 hover:text-violet-600 transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="text-violet-600 mt-1 mr-4" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Address</p>
                      <p className="text-slate-600">
                        123 Serenity Lane
                        <br />
                        Mindful Valley, CA 94123
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-violet-600 mt-1 mr-4" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Hours</p>
                      <p className="text-slate-600">
                        Monday - Friday: 9am - 7pm
                        <br />
                        Saturday: 10am - 4pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=600&auto=format&fit=crop"
                  alt="Office Location Map"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              <Button
                className="bg-white text-violet-700 hover:bg-white/90 rounded-xl w-full h-auto py-3 shadow-md hover:shadow-lg transition-all border border-white/30 font-medium"
                onClick={() => (window.location.href = "/booking")}
              >
                Schedule Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Simplified */}
      <section className="py-12 md:py-16 bg-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-medium text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Find quick answers to common questions about our services</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-medium text-slate-800 mb-2">How do I schedule my first session?</h3>
                <p className="text-slate-600">
                  You can schedule your first session by filling out the contact form above, calling our office, or
                  using the "Schedule Now" button to access our online booking system. We'll follow up within 24 hours
                  to confirm your appointment.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-medium text-slate-800 mb-2">Do you offer virtual sessions?</h3>
                <p className="text-slate-600">
                  Yes, we offer both in-person and virtual sessions to accommodate your preferences and needs. Our
                  virtual platform is secure, user-friendly, and provides an equally effective experience for most of
                  our services.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-medium text-slate-800 mb-2">What can I expect in my first session?</h3>
                <p className="text-slate-600">
                  Your first session is about getting to know you and understanding your needs. We'll discuss your
                  goals, answer any questions you have, and create a comfortable space for you to share at your own
                  pace. We'll also outline a potential path forward based on your unique situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
