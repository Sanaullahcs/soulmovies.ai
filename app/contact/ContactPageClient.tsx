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
  const [submitSuccess, setSubmitSuccess] = useState(false)

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

    // Open WhatsApp with the pre-filled message - update with your actual WhatsApp number
    window.open(`https://wa.me/923418349814?text=${encodedMessage}`, "_blank")

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
    setSubmitSuccess(true)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
    }, 5000)
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-slate-600">
              We're here to answer your questions and support you on your journey to emotional well-being
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-violet-100/30 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-medium text-slate-800 mb-6 flex items-center">
                  <MessageSquare size={24} className="text-violet-600 mr-3" />
                  Send Us a Message
                </h3>
                <p className="text-slate-600 mb-8">
                  Have questions about our services or want to schedule a consultation? Fill out the form below and
                  we'll get back to you as soon as possible.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                        First Name<span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50/50"
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                        Last Name<span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50/50"
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                      Email Address<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50/50"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                      Phone Number <span className="text-slate-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50/50"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                      Subject<span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50/50"
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

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Message<span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50/50"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="captcha" className="block text-sm font-medium text-slate-700">
                      Verification<span className="text-rose-500">*</span>{" "}
                      <span className="text-xs text-slate-500">(Anti-spam)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 px-4 py-3 rounded-xl text-slate-700 flex-grow">
                        {captchaValue.equation}
                      </div>
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="p-3 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors"
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
                      className={`mt-2 w-full px-4 py-3 rounded-xl border ${captchaError ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-violet-500"} focus:outline-none focus:ring-2 focus:border-transparent bg-slate-50/50`}
                      placeholder="Enter the answer"
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                    />
                    {captchaError && <p className="text-red-500 text-sm mt-1">Incorrect answer. Please try again.</p>}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-xl py-4 h-auto shadow-lg hover:shadow-xl transition-all border border-violet-500/30 font-medium">
                    <MessageSquare size={18} className="mr-2" />
                    Send via WhatsApp
                  </Button>
                </form>
                {submitSuccess && (
                  <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 animate-pulse">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-gradient-to-br from-violet-600/10 to-rose-500/10 rounded-3xl p-8 shadow-lg border border-violet-100/30 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-medium text-slate-800 mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-violet-600" size={18} />
                      </div>
                      <div className="ml-4">
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
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-violet-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-700">Phone</p>
                        <a href="tel:+15551234567" className="text-slate-600 hover:text-violet-600 transition-colors">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-violet-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-700">Address</p>
                        <p className="text-slate-600">
                          123 Serenity Lane
                          <br />
                          Mindful Valley, CA 94123
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="text-violet-600" size={18} />
                      </div>
                      <div className="ml-4">
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
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our New York Office Location"
                  aria-label="Google Maps showing our New York office location"
                  className="w-full h-full"
                />
              </div>

              <Button
                className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-xl w-full h-auto py-4 shadow-lg hover:shadow-xl transition-all border border-violet-500/30 font-medium"
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
