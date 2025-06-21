"use client"
import Image from "next/image"
import type React from "react"
import { motion } from "framer-motion"
import {
  Heart,
  ArrowRight,
  Sparkles,
  Brain,
  Compass,
  ChevronDown,
  MessageSquare,
  Play,
  Users,
  Award,
  Clock,
  Star,
  Film,
  Zap,
  Eye,
  Palette,
  Music,
  Waves,
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

    const handleScroll = () => {
      if (!isScrolling) {
        document.documentElement.classList.add("is-scrolling")
        isScrolling = true
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling")
        isScrolling = false
      }, 50)
    }

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledScroll)
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

  const handleScheduleConsultation = () => {
    window.open("https://calendly.com/soulmovies-ai/30min", "_blank")
  }

  const handleWatchStories = () => {
    window.location.href = "/stories"
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
            className="absolute inset-0 will-change-transform"
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
                className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full blur-2xl will-change-transform"
                animate={{
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-violet-400/20 rounded-full blur-xl will-change-transform"
                animate={{
                  y: [0, 40, 0],
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-br from-violet-300/15 to-pink-300/15 rounded-full blur-3xl will-change-transform"
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
              <span className="block bg-gradient-to-r from-violet-300 via-pink-300 to-violet-300 bg-clip-text text-transparent mt-4">
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
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group">
              <Button
                onClick={handleBookNow}
                className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl font-bold border-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="group">
              <Button
                onClick={handleWatchStories}
                className="bg-white/10 text-white hover:bg-white/20 rounded-3xl text-xl px-16 py-6 h-auto shadow-2xl border-2 border-white/30 font-bold backdrop-blur-md"
              >
                <Play size={18} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                Watch Stories
              </Button>
            </motion.div>
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
                const statsSection = document.querySelector(".py-12.md\\:py-16.bg-gradient-to-b")
                if (statsSection) {
                  statsSection.scrollIntoView({ behavior: "smooth" })
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
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-violet-50/50 relative overflow-hidden">
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

      {/* NEW: Personalized SoulMovie Creation Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-violet-50/30 via-white to-pink-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, violet 1px, transparent 1px), radial-gradient(circle at 80% 20%, pink 1px, transparent 1px)`,
              backgroundSize: "60px 60px, 40px 40px",
            }}
            animate={{
              backgroundPosition: ["0% 0%, 0% 0%", "100% 100%, -100% -100%"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Film size={18} className="text-violet-600" />
                  <span className="text-violet-700 font-bold text-base">Personalized SoulMovies</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                  Your Story,{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                    Your Healing
                  </span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Experience the power of personalized visual meditation through custom-crafted SoulMovies designed
                  specifically for your unique healing journey and emotional transformation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Eye, title: "Visual Meditation", desc: "Immersive visual experiences" },
                  { icon: Palette, title: "Custom Crafted", desc: "Tailored to your needs" },
                  { icon: Music, title: "Healing Soundscapes", desc: "Therapeutic audio design" },
                  { icon: Waves, title: "Emotional Flow", desc: "Guided emotional release" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100/50 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <Button
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-2xl text-lg px-10 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 font-bold border-0 group"
                >
                  <span className="flex items-center">
                    Create My SoulMovie
                    <ArrowRight
                      size={18}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <motion.div
                className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(124,58,237,0.3)] group bg-gradient-to-br from-violet-100 to-pink-100 border border-white/50"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-pink-600/20 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop"
                  alt="Personalized meditation visualization"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-8 left-8 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Film size={24} className="text-white" />
                </motion.div>

                <motion.div
                  className="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                >
                  <Sparkles size={20} className="text-white" />
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-8 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                >
                  <Heart size={22} className="text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: Interactive Journey Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white via-violet-50/20 to-white relative">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Zap size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">Your Journey</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
              How It{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Your transformation journey is unique. Follow these simple steps to begin your personalized healing
              experience.
            </p>
          </motion.div>

          {/* Journey Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-pink-200 to-violet-200 transform -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  description: "Share your story and goals in a safe, supportive environment",
                  icon: MessageSquare,
                  color: "from-violet-500 to-purple-600",
                },
                {
                  step: "02",
                  title: "Personalized Assessment",
                  description: "Complete our guided questionnaire to understand your unique needs",
                  icon: Compass,
                  color: "from-pink-500 to-rose-600",
                },
                {
                  step: "03",
                  title: "Custom SoulMovie",
                  description: "Receive your personalized meditation movie crafted just for you",
                  icon: Film,
                  color: "from-violet-600 to-indigo-600",
                },
                {
                  step: "04",
                  title: "Ongoing Support",
                  description: "Continue your journey with regular check-ins and guidance",
                  icon: Heart,
                  color: "from-pink-600 to-violet-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative text-center group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Step Number */}
                  <motion.div
                    className="relative z-10 w-20 h-20 mx-auto mb-6 bg-white rounded-3xl shadow-xl flex items-center justify-center border-4 border-violet-100 group-hover:border-violet-200 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                      {item.step}
                    </span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <item.icon size={24} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-violet-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={handleScheduleConsultation}
              className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 font-bold border-0 group"
            >
              <span className="flex items-center">
                Start Your Journey Today
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-violet-50/50 via-white to-violet-50/50 relative">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            className="max-w-5xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">Our Story</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-8 leading-tight">
              Healing Hearts,{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Transforming Lives
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Founded with a vision to create a sanctuary where individuals can reconnect with their true selves,
              SoulMovies.ai was born from a deep understanding of the human need for emotional connection and growth.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Team Member */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <motion.div
                className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(124,58,237,0.3)] group bg-gradient-to-br from-violet-100 to-pink-100 border border-white/50"
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
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-black text-white mb-3">Juan Carlos Calzada</h3>
                    <p className="text-white/90 text-lg font-semibold mb-6">Founder & Emotional Wellness Guide</p>
                    <div className="flex space-x-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-slate-800 leading-tight">
                  Meet Your{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                    Transformation Guide
                  </span>
                </h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  With over 5 years of experience in emotional wellness and personal transformation, Juan Carlos brings
                  a unique blend of professional expertise and genuine compassion to every session.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Brain, title: "Certified Practitioner", desc: "Advanced training in emotional wellness" },
                  { icon: Heart, title: "Empathetic Approach", desc: "Deep understanding of human emotions" },
                  { icon: Compass, title: "Personalized Guidance", desc: "Tailored strategies for each individual" },
                  { icon: Sparkles, title: "Transformative Results", desc: "Proven track record of success" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100/50 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={24} className="text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <Button
                  onClick={handleScheduleConsultation}
                  className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-2xl text-lg px-10 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 font-bold border-0 group"
                >
                  <span className="flex items-center">
                    Schedule Free Consultation
                    <ArrowRight
                      size={18}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-violet-50/30 to-pink-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, violet 1px, transparent 1px)`,
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
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">Our Services</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-8 leading-tight">
              Your Path to{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Inner Peace
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Discover our comprehensive range of services designed to support your emotional well-being and personal
              transformation journey.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Guided Questionnaire Path",
                description: "Personalized assessment to understand your unique emotional landscape and needs.",
                icon: Compass,
                color: "from-violet-500 to-purple-600",
                features: ["Deep self-discovery", "Personalized insights", "Clear direction"],
              },
              {
                title: "Quantum Healing Hypnosis",
                description:
                  "Advanced healing techniques to access your subconscious and facilitate deep transformation.",
                icon: Brain,
                color: "from-pink-500 to-rose-600",
                features: ["Subconscious healing", "Past life regression", "Energy alignment"],
              },
              {
                title: "Custom SoulMovie Creation",
                description: "Personalized meditation movies crafted specifically for your healing journey.",
                icon: Play,
                color: "from-violet-600 to-indigo-600",
                features: ["Tailored content", "Visual meditation", "Lasting transformation"],
              },
              {
                title: "Higher Self Connection",
                description: "Guided sessions to connect with your inner wisdom and authentic self.",
                icon: Sparkles,
                color: "from-pink-600 to-violet-600",
                features: ["Inner wisdom access", "Authentic self discovery", "Spiritual guidance"],
              },
              {
                title: "Personal Transformation",
                description: "Comprehensive support for your journey of personal growth and healing.",
                icon: Heart,
                color: "from-violet-500 to-pink-500",
                features: ["Holistic approach", "Ongoing support", "Measurable progress"],
              },
              {
                title: "Emotional Support Sessions",
                description: "One-on-one sessions providing compassionate support for life's challenges.",
                icon: MessageSquare,
                color: "from-rose-500 to-pink-600",
                features: ["Active listening", "Empathetic guidance", "Safe space"],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(124,58,237,0.15)] transition-all duration-500 border border-white/60 h-full relative overflow-hidden group-hover:border-violet-200/50">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon size={28} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-violet-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <motion.button
                    onClick={() => {
                      const contactSection = document.querySelector("section:last-child")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                    className="text-violet-600 font-bold text-sm flex items-center group-hover:text-pink-600 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => (window.location.href = "/services")}
              className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 font-bold border-0 group"
            >
              <span className="flex items-center">
                Explore All Services
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white via-violet-50/20 to-white relative overflow-hidden">
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative Element */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-[2rem] flex items-center justify-center backdrop-blur-sm border border-violet-200/50 shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Heart size={32} className="text-violet-600" />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Star size={16} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl font-black text-slate-800 mb-8 leading-tight"
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
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-400/60 to-pink-400/60 rounded-full"
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
              <p className="text-xl text-slate-600 leading-relaxed font-light mb-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
            <Button
              onClick={handleWatchStories}
              className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-3xl text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 font-bold border-0 group"
            >
              <span className="flex items-center">
                Read More Stories
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-violet-50/50 via-white to-pink-50/50 relative">
        <div className="container max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MessageSquare size={18} className="text-violet-600" />
              <span className="text-violet-700 font-bold text-base">FAQ</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
              Questions &{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                Answers
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Find answers to common questions about our services and approach to emotional wellness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FaqAccordion faqs={faqs} />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, violet 1px, transparent 1px), radial-gradient(circle at 80% 20%, pink 1px, transparent 1px)`,
              backgroundSize: "60px 60px, 40px 40px",
            }}
            animate={{
              backgroundPosition: ["0% 0%, 0% 0%", "100% 100%, -100% -100%"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-white"
            >
              <motion.div
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Heart size={18} className="text-violet-300" />
                <span className="text-violet-200 font-bold text-base">Get In Touch</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Ready to Begin Your{" "}
                <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                  Transformation?
                </span>
              </h2>

              <p className="text-xl text-white/80 leading-relaxed mb-12">
                Take the first step towards emotional wellness and personal growth. We're here to support you every step
                of the way on your journey to inner peace and self-discovery.
              </p>

              {/* Contact Options */}
              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: MessageSquare,
                    title: "WhatsApp Chat",
                    description: "Quick response via WhatsApp",
                    action: () => window.open("https://wa.me/923418349814", "_blank"),
                  },
                  {
                    icon: Heart,
                    title: "Free Consultation",
                    description: "Schedule a 30-minute discovery call",
                    action: handleScheduleConsultation,
                  },
                ].map((option, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    onClick={option.action}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <option.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{option.title}</h4>
                      <p className="text-white/70">{option.description}</p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ml-auto"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8">Send us a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 font-semibold mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 font-semibold mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white/80 font-semibold mb-3">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={contactFormData.message}
                      onChange={handleContactInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you on your journey..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-2xl text-lg px-8 py-4 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center">
                      Send Message
                      <ArrowRight
                        size={20}
                        className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
