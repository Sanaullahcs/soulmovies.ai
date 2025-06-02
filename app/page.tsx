"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  ArrowRight,
  Sparkles,
  Brain,
  Compass,
  ChevronDown,
  MessageSquare,
  Star,
  Play,
  Users,
  Award,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingParticles from "@/components/floating-particles"
import AudioPlayer from "@/components/audio-player"
import FaqAccordion from "@/components/faq-accordion"
import { useState, useEffect } from "react"

// Smooth scroll optimization
function useScrollOptimization() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let isScrolling = false
    const html = document.documentElement

    const handleScroll = () => {
      if (!isScrolling) {
        html.classList.add("is-scrolling")
        isScrolling = true
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        html.classList.remove("is-scrolling")
        isScrolling = false
      }, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])
}

export default function Home() {
  useScrollOptimization()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setContactFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = `*Quick Contact Request*\n\n*Name:* ${contactFormData.name}\n*Email:* ${contactFormData.email}\n\n*Message:*\n${contactFormData.message}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/923418349814?text=${encodedMessage}`, "_blank")

    setContactFormData({
      name: "",
      email: "",
      message: "",
    })
  }

  const handleBookNow = () => {
    window.location.href = "/booking"
  }

  const faqs = [
    {
      question: "What is emotional support and how can it help me?",
      answer:
        "Emotional support provides a safe space for you to express and process your feelings. Our approach combines active listening, empathy, and personalized guidance to help you navigate life's challenges, reduce stress, and build resilience.",
    },
    {
      question: "How often should I schedule sessions?",
      answer:
        "The frequency of sessions depends on your individual needs. Many clients start with weekly sessions and adjust as they progress. We'll work together to determine the best schedule for your journey.",
    },
    {
      question: "What can I expect in my first session?",
      answer:
        "Your first session is about getting to know you and understanding your needs. We'll discuss your goals, answer any questions you have, and create a comfortable space for you to share at your own pace.",
    },
    {
      question: "Are the sessions confidential?",
      answer:
        "Absolutely. We maintain strict confidentiality for all client interactions. Your privacy is our priority, and we adhere to professional ethical standards to ensure your information remains secure.",
    },
    {
      question: "Do you offer virtual sessions?",
      answer:
        "Yes, we offer both in-person and virtual sessions to accommodate your preferences and needs. Our virtual platform is secure and user-friendly.",
    },
  ]

  return (
    <div className="no-horizontal-scroll">
      <FloatingParticles />
      <AudioPlayer />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1920&auto=format&fit=crop"
              alt="Serene landscape with calming atmosphere"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-purple-800/70 to-pink-600/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full blur-2xl"
                animate={{
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-violet-400/20 rounded-full blur-xl"
                animate={{
                  y: [0, 40, 0],
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-br from-violet-300/15 to-pink-300/15 rounded-full blur-3xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
              />
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center py-20 md:py-32 px-4 md:px-8 max-w-6xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight leading-[0.85]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="block bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                Transform
              </span>
              <span className="block bg-gradient-to-r from-violet-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                Your Soul
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Discover personalized emotional support and transformative healing in a sanctuary designed for your soul's
            journey to inner peace.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/booking">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group">
                <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <ArrowRight
                      size={20}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/stories">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group">
                <Button className="bg-white/10 text-white hover:bg-white/20 rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl border-2 border-white/30 font-bold backdrop-blur-md">
                  <Play size={18} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Watch Stories
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 text-white/80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              { icon: Users, text: "1000+ Lives Transformed" },
              { icon: Award, text: "Certified Practitioners" },
              { icon: Clock, text: "24/7 Support Available" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <item.icon size={20} />
                </div>
                <span className="text-lg font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => {
                const aboutSection = document.getElementById("about-section")
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-white/60 text-sm font-medium mb-4 group-hover:text-white/90 transition-colors uppercase tracking-wider">
                Discover More
              </span>
              <motion.div
                className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:border-white/50 transition-colors"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ChevronDown size={20} className="text-white/70" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50/20 via-transparent to-pink-50/20" />

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { number: "1000+", label: "Lives Transformed", icon: Users, color: "from-violet-500 to-purple-600" },
              { number: "98%", label: "Success Rate", icon: Award, color: "from-pink-500 to-rose-600" },
              { number: "5+", label: "Years Experience", icon: Clock, color: "from-violet-600 to-indigo-600" },
              { number: "24/7", label: "Support Available", icon: Heart, color: "from-pink-600 to-violet-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon size={28} className="text-white" />
                </motion.div>
                <motion.h3
                  className="text-4xl md:text-5xl font-black text-slate-800 mb-3"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-lg text-slate-600 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section
        id="about-section"
        className="py-20 md:py-28 bg-gradient-to-b from-violet-50/50 via-white to-violet-50/50 relative"
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            className="max-w-5xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">Our Story</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-10 leading-tight">
              Healing Hearts,{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Transforming Lives
              </span>
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed font-light">
              Founded with a vision to create a sanctuary where individuals can reconnect with their true selves,
              SoulMovies.ai was born from a deep understanding of the human need for emotional connection and growth.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-16">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <motion.div
                className="relative h-[700px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(124,58,237,0.3)] group bg-gradient-to-br from-violet-100 to-pink-100 border border-white/50"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-pink-600/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/images/juan-carlos-calzada.png"
                  alt="Founder Juan Carlos Calzada"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/30 to-transparent" />
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-black text-white mb-3">Juan Carlos Calzada</h3>
                    <p className="text-white/90 text-lg font-semibold mb-6">Founder & Emotional Wellness Guide</p>
                    <div className="flex items-center space-x-6 text-white/80 text-base">
                      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        15+ Years Experience
                      </span>
                      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        Certified Therapist
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br from-violet-500/30 to-pink-500/30 rounded-full blur-2xl z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Content for Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-10">
                <motion.h3
                  className="text-4xl font-black text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Our Heart-Centered Philosophy
                </motion.h3>

                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xl text-slate-600 leading-relaxed">
                    At SoulMovies.ai, Juan Carlos brings a unique blend of emotional intelligence and innovative
                    therapeutic approaches. His background in psychology and personal transformation has helped
                    countless individuals reconnect with their authentic selves.
                  </p>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    We understand that each person's journey is unique, which is why we offer personalized guidance
                    tailored to your specific needs and goals, combining evidence-based practices with compassionate
                    support.
                  </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  className="grid grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {["Personalized Approach", "Certified Practitioners", "Holistic Methods", "Safe Environment"].map(
                    (feature, index) => (
                      <motion.div key={index} className="flex items-center space-x-3 group" whileHover={{ x: 5 }}>
                        <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span className="text-slate-700 font-semibold text-lg">{feature}</span>
                      </motion.div>
                    ),
                  )}
                </motion.div>

                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center text-xl font-bold text-violet-600 hover:text-violet-700 transition-colors group"
                  >
                    <span>Learn more about our journey</span>
                    <motion.div className="ml-3" whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                      <ArrowRight size={22} />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Team Member 2 - Reversed Layout */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content for Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:order-1"
            >
              <div className="space-y-10">
                <motion.h3
                  className="text-4xl font-black text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Mindfulness & Meditation Expertise
                </motion.h3>

                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Miriam brings over 15 years of experience in mindfulness and meditation practices to SoulMovies.ai.
                    Her journey began on the serene beaches of Bali, where she studied with master practitioners.
                  </p>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Together with our team, she's created a unique approach that combines traditional wisdom with
                    cutting-edge techniques to help individuals navigate life's challenges with grace and inner
                    strength.
                  </p>
                </motion.div>

                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center text-xl font-bold text-violet-600 hover:text-violet-700 transition-colors group"
                  >
                    <span>Discover our methodology</span>
                    <motion.div className="ml-3" whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                      <ArrowRight size={22} />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:order-2 relative"
            >
              <motion.div
                className="relative h-[700px] rounded-[3rem] overflow-hidden shadow-2xl group bg-gradient-to-br from-pink-100 to-violet-100"
                whileHover={{ scale: 1.02, rotateY: -2 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/mirium-meditation.jpg"
                  alt="Co-Founder Miriam"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-black text-white mb-3">Miriam</h3>
                    <p className="text-white/90 text-lg font-semibold mb-6">Co-Founder & Mindfulness Expert</p>
                    <div className="flex items-center space-x-6 text-white/80 text-base">
                      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Master Practitioner</span>
                      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Published Author</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Quote */}
              <motion.div
                className="absolute -left-12 top-5 bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-sm shadow-2xl border border-violet-100 mb-[100px]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: -1 }}
              >
                <p className="text-slate-700 italic text-base leading-relaxed font-medium">
                  "True meditation is not an escape from life, but a deeper connection with the present moment."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-violet-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, violet 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="max-w-5xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">Our Services</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-10 leading-tight">
              How We{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Transform Lives
              </span>
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed font-light">
              Our comprehensive support services are designed to guide you on your journey toward emotional well-being
              and personal growth through proven methodologies and personalized care.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                title: "Personalized Emotional Support",
                description:
                  "One-on-one sessions tailored to your unique emotional needs, providing a safe space for expression and healing.",
                icon: Heart,
                gradient: "from-violet-500 to-purple-600",
              },
              {
                title: "Heart & Mind Harmony",
                description:
                  "Techniques to align your emotional and mental states, creating balance and inner peace in your daily life.",
                icon: Brain,
                gradient: "from-pink-500 to-rose-600",
              },
              {
                title: "Mindfulness & Meditation",
                description:
                  "Guided practices to help you stay present, reduce stress, and cultivate a deeper connection with yourself.",
                icon: Sparkles,
                gradient: "from-violet-600 to-indigo-600",
              },
              {
                title: "Personal Growth Guidance",
                description:
                  "Structured support to help you overcome obstacles, set meaningful goals, and achieve your full potential.",
                icon: Compass,
                gradient: "from-pink-600 to-violet-600",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 h-full group-hover:shadow-2xl transition-all duration-500">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-violet-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group inline-block">
                <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                  <span className="relative z-10 flex items-center">
                    Explore All Services
                    <ArrowRight
                      size={20}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-violet-50/20 to-white relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-pink-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-violet-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative Element */}
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-[2rem] flex items-center justify-center backdrop-blur-sm border border-violet-200/50 shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Heart size={36} className="text-violet-600" />
                </motion.div>
                <motion.div
                  className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Star size={18} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-black text-slate-800 mb-10 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Stories That{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                  Heal & Inspire
                </span>
                <motion.div
                  className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-violet-400/60 to-pink-400/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl text-slate-600 leading-relaxed font-light mb-8">
                Hear from individuals who have experienced profound transformation through our guidance and support.
                Their journeys illuminate the path to healing and self-discovery.
              </p>
              <motion.div
                className="flex justify-center items-center space-x-4 text-base text-violet-600 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-violet-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span>1000+ verified transformations</span>
                <motion.div
                  className="w-3 h-3 bg-pink-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {[
              {
                name: "Emma Thompson",
                location: "New York, NY",
                quote:
                  "Working with SoulMovies.ai has been transformative. I've found a sense of peace I didn't know was possible. The personalized approach made all the difference.",
                rating: 5,
                imageSrc:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
                gradient: "from-violet-500 to-purple-600",
              },
              {
                name: "Michael Chen",
                location: "San Francisco, CA",
                quote:
                  "The mindfulness techniques I've learned have helped me manage stress and find joy in everyday moments. This journey has been life-changing.",
                rating: 5,
                imageSrc:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
                gradient: "from-pink-500 to-rose-600",
              },
              {
                name: "Sophia Rodriguez",
                location: "Austin, TX",
                quote:
                  "I was skeptical at first, but the personalized approach and genuine care from the team made all the difference. I feel like myself again.",
                rating: 5,
                imageSrc:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
                gradient: "from-violet-600 to-indigo-600",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 h-full group-hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="relative w-16 h-16 rounded-2xl overflow-hidden mr-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={testimonial.imageSrc || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-black text-slate-800">{testimonial.name}</h4>
                      <p className="text-slate-600 font-medium">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Star size={18} className="text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed italic text-lg">"{testimonial.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/stories">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group inline-block">
                <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                  <span className="relative z-10 flex items-center">
                    Read More Stories
                    <ArrowRight
                      size={20}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-violet-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 75% 75%, pink 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MessageSquare size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">FAQ</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-10 leading-tight">
              We're{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Here For You
              </span>
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed font-light">
              Find answers to commonly asked questions about our services and approach. Still have questions? We're here
              to help.
            </p>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FaqAccordion faqs={faqs} />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-xl text-slate-600 mb-12 font-medium">
              Still have questions? We're here to help you on your journey.
            </p>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group inline-block">
                <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                  <span className="relative z-10 flex items-center">
                    Talk To Us
                    <MessageSquare size={20} className="ml-3 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-violet-50/30 to-white overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="max-w-5xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">Get Started</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-10 leading-tight">
              Begin Your{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Transformation
              </span>
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed font-light">
              Take the first step toward emotional well-being and personal growth. Choose how you'd like to connect with
              us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative">
            {/* Left Card - Book Session */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-12 border border-white/50 h-full flex flex-col group hover:shadow-3xl transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex items-center space-x-4 mb-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-3xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Heart size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-800">Book A Session</h3>
                </div>

                <form className="space-y-8 flex-grow">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="service" className="block text-lg font-bold text-slate-700 mb-4">
                      Select a service
                    </label>
                    <motion.select
                      id="service"
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 bg-white shadow-lg transition-all duration-300 text-lg"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">Choose a service...</option>
                      <option value="emotional-support">Personalized Emotional Support</option>
                      <option value="heart-mind">Heart & Mind Harmony</option>
                      <option value="mindfulness">Mindfulness & Meditation</option>
                      <option value="growth">Personal Growth Guidance</option>
                    </motion.select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="date" className="block text-lg font-bold text-slate-700 mb-4">
                      Preferred date
                    </label>
                    <motion.input
                      type="date"
                      id="date"
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 shadow-lg transition-all duration-300 text-lg"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="time" className="block text-lg font-bold text-slate-700 mb-4">
                      Preferred time
                    </label>
                    <motion.input
                      type="time"
                      id="time"
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 shadow-lg transition-all duration-300 text-lg"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    className="pt-8 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group">
                      <Button
                        className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-10 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden"
                        onClick={handleBookNow}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                        <span className="relative z-10 flex items-center justify-center">
                          Book Your Session
                          <ArrowRight
                            size={20}
                            className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>

            {/* Right Card - Quick Contact */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-12 border border-white/50 h-full flex flex-col group hover:shadow-3xl transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex items-center space-x-4 mb-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-violet-500 rounded-3xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <MessageSquare size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-800">Quick Contact</h3>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-8 flex-grow">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-lg font-bold text-slate-700 mb-4">
                      Your name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 bg-white shadow-lg transition-all duration-300 text-lg"
                      placeholder="Enter your name"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="block text-lg font-bold text-slate-700 mb-4">
                      Email address
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 bg-white shadow-lg transition-all duration-300 text-lg"
                      placeholder="Enter your email"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-lg font-bold text-slate-700 mb-4">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      value={contactFormData.message}
                      onChange={handleContactInputChange}
                      rows={4}
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 bg-white shadow-lg transition-all duration-300 text-lg resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    className="pt-8 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white rounded-3xl text-xl px-10 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                        <span className="relative z-10 flex items-center justify-center">
                          Send Message
                          <MessageSquare
                            size={20}
                            className="ml-3 group-hover:scale-110 transition-transform duration-300"
                          />
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
