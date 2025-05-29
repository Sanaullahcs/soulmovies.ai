"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
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
import ParallaxBackground from "@/components/parallax-background"
import FloatingParticles from "@/components/floating-particles"
import AudioPlayer from "@/components/audio-player"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import FaqAccordion from "@/components/faq-accordion"
import { useRef, useState, useEffect } from "react"

// Add this function near the top of the file, after imports
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
  // Add this near the top of the component, after other useState declarations
  const [isMobile, setIsMobile] = useState(false)

  // Add this useEffect to detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // Hero parallax with spring physics
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Replace the existing spring configurations with these optimized versions
  const heroY = useSpring(useTransform(heroProgress, [0, 1], ["0%", "30%"]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  const heroOpacity = useSpring(useTransform(heroProgress, [0, 0.7], [1, 0]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  const heroScale = useSpring(useTransform(heroProgress, [0, 1], [1, 1.05]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  // About section with smooth parallax
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  // Apply similar optimizations to other spring animations
  const aboutY = useSpring(useTransform(aboutProgress, [0, 1], ["60px", "-60px"]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  // Services section
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  })

  const servicesY = useSpring(useTransform(servicesProgress, [0, 1], ["40px", "-40px"]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  // Stats section
  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  })

  const statsY = useSpring(useTransform(statsProgress, [0, 1], ["30px", "-30px"]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  // Contact section with enhanced parallax
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactSectionRef,
    offset: ["start end", "end start"],
  })

  // Optimize contact section animations
  const contactScale = useSpring(useTransform(contactScrollProgress, [0, 0.5, 1], [0.98, 1, 1.02]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  const contactOpacity = useSpring(useTransform(contactScrollProgress, [0, 0.2, 1], [0.8, 1, 1]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  const cardOneY = useSpring(useTransform(contactScrollProgress, [0, 1], [40, -20]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

  const cardTwoY = useSpring(useTransform(contactScrollProgress, [0, 1], [20, -10]), {
    stiffness: isMobile ? 300 : 100,
    damping: isMobile ? 30 : 20,
    mass: isMobile ? 0.5 : 1,
  })

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
    <div className={`no-horizontal-scroll ${isMobile ? "reduce-motion" : ""}`}>
      <FloatingParticles />
      <AudioPlayer />

      {/* Completely Redesigned Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: heroY,
            scale: heroScale,
            willChange: "transform",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1920&auto=format&fit=crop"
            alt="Serene landscape with calming atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/50 to-pink-500/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 to-pink-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-20 left-4 md:left-20 w-2 h-2 bg-white/40 rounded-full"
                animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-40 right-4 md:right-32 w-1 h-1 bg-violet-300/60 rounded-full"
                animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute bottom-32 left-4 md:left-40 w-3 h-3 bg-pink-300/50 rounded-full"
                animate={{ y: [0, -25, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
              />
            </>
          )}
        </div>

        {/* Main Hero Content */}
        <motion.div
          className="container relative z-10 text-center py-20 md:py-28 px-4 md:px-8"
          style={{ opacity: heroOpacity }}
        >
          {/* Enhanced Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 mt-20 tracking-tight text-balance leading-[0.9]"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform Your
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Inner World
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-medium text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Discover personalized emotional support, mindfulness guidance, and transformative healing in a sanctuary
            designed for your soul's journey to inner peace and authentic self-connection.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/booking">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-premium text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold group">
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/stories">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="bg-white/10 text-white hover:bg-white/20 rounded-2xl text-lg px-12 py-4 h-auto shadow-large border-2 border-white/40 font-semibold transition-elegant group backdrop-blur-sm">
                  <Play size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  Watch Stories
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="flex items-center space-x-2">
              <Users size={18} />
              <span className="text-sm font-medium">1000+ Lives Transformed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award size={18} />
              <span className="text-sm font-medium">Certified Practitioners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} />
              <span className="text-sm font-medium">24/7 Support Available</span>
            </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-12 right-4 md:right-12 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-end cursor-pointer group"
              onClick={() => {
                const aboutSection = document.getElementById("about-section")
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="text-white/70 text-xs font-medium mb-4 group-hover:text-white/90 transition-elegant tracking-wider uppercase"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                Discover More
              </motion.span>

              <motion.div className="relative">
                <motion.div
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center glass-subtle group-hover:border-white/50 transition-elegant"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 255, 255, 0.1)",
                      "0 0 0 10px rgba(255, 255, 255, 0)",
                      "0 0 0 0 rgba(255, 255, 255, 0)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown size={18} className="text-white/80" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* New Stats Section */}
      <section
        ref={statsRef}
        className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50/30 relative overflow-hidden"
      >
        <motion.div className="container max-w-7xl mx-auto px-4 md:px-8" style={{ y: statsY }}>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { number: "1000+", label: "Lives Transformed", icon: Users },
              { number: "98%", label: "Success Rate", icon: Award },
              { number: "5+", label: "Years Experience", icon: Clock },
              { number: "24/7", label: "Support Available", icon: Heart },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center group-hover:from-violet-500/20 group-hover:to-pink-500/20 transition-elegant"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon size={24} className="text-violet-600" />
                </motion.div>
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-slate-800 mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced About Section with Split Layout */}
      <section
        id="about-section"
        ref={aboutRef}
        className="section-padding bg-gradient-to-b from-violet-50/30 via-white to-violet-50/30 relative"
      >
        <motion.div className="container max-w-7xl mx-auto px-4 md:px-8" style={{ y: aboutY }}>
          {/* Section Header */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-violet-50 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart size={16} className="text-violet-600" />
              <span className="text-violet-700 font-medium text-sm">Our Story</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
              Healing Hearts, <span className="gradient-text">Transforming Lives</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed text-balance">
              Founded with a vision to create a sanctuary where individuals can reconnect with their true selves,
              SoulMovies.ai was born from a deep understanding of the human need for emotional connection and growth.
            </p>
          </motion.div>

          {/* Enhanced Team Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  className="relative h-[600px] rounded-3xl overflow-hidden shadow-large group"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                    alt="Founder Sarah Lee"
                    fill
                    className="object-cover group-hover:scale-105 transition-elegant duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-violet-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">Sarah Lee</h3>
                      <p className="text-white/90 text-base font-medium mb-4">Founder & Emotional Wellness Guide</p>
                      <div className="flex items-center space-x-4 text-white/80 text-sm">
                        <span>15+ Years Experience</span>
                        <span>•</span>
                        <span>Certified Therapist</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Quote */}
                <motion.div
                  className="absolute -right-8 top-20 glass-premium rounded-2xl p-6 max-w-xs"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-slate-700 italic text-sm leading-relaxed">
                    "True healing begins when we create a safe space for authentic self-expression."
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Content for Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-8">
                <motion.h3
                  className="text-3xl font-bold text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Our Heart-Centered Philosophy
                </motion.h3>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg text-slate-600 leading-relaxed">
                    At SoulMovies.ai, we believe that true healing comes from reconnecting with your authentic self. Our
                    approach combines ancient wisdom with modern techniques to create a holistic experience that
                    nurtures your mind, body, and spirit.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We understand that each person's journey is unique, which is why we offer personalized guidance
                    tailored to your specific needs and goals.
                  </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {["Personalized Approach", "Certified Practitioners", "Holistic Methods", "Safe Environment"].map(
                    (feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ),
                  )}
                </motion.div>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center text-lg font-semibold text-violet-600 hover:text-violet-700 transition-elegant group relative overflow-hidden"
                  >
                    <span>Learn more about our journey</span>
                    <motion.div className="ml-2" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <ArrowRight size={20} />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-violet-600 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Team Member 2 - Reversed Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content for Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:order-1"
            >
              <div className="space-y-8">
                <motion.h3
                  className="text-3xl font-bold text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Mindfulness & Meditation Expertise
                </motion.h3>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg text-slate-600 leading-relaxed">
                    James brings over 15 years of experience in mindfulness and meditation practices to SoulMovies.ai.
                    His journey began in the mountains of Nepal, where he studied with master practitioners.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Together with Sarah, they've created a unique approach that combines traditional wisdom with
                    cutting-edge techniques to help individuals navigate life's challenges with grace.
                  </p>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    "15+ Years in Mindfulness",
                    "Trained in Nepal & Tibet",
                    "1000+ Students Guided",
                    "Published Meditation Author",
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-slate-700 font-medium">{achievement}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center text-lg font-semibold text-violet-600 hover:text-violet-700 transition-elegant group relative overflow-hidden"
                  >
                    <span>Discover our methodology</span>
                    <motion.div className="ml-2" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <ArrowRight size={20} />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-violet-600 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
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
              <div className="relative">
                <motion.div
                  className="relative h-[600px] rounded-3xl overflow-hidden shadow-large group"
                  whileHover={{ scale: 1.02, rotateY: -5 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                    alt="Co-Founder James Carter"
                    fill
                    className="object-cover group-hover:scale-105 transition-elegant duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-violet-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">James Carter</h3>
                      <p className="text-white/90 text-base font-medium mb-4">Co-Founder & Mindfulness Expert</p>
                      <div className="flex items-center space-x-4 text-white/80 text-sm">
                        <span>Master Practitioner</span>
                        <span>•</span>
                        <span>Published Author</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Quote */}
                <motion.div
                  className="absolute -left-8 top-20 glass-premium rounded-2xl p-6 max-w-xs"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-slate-700 italic text-sm leading-relaxed">
                    "Mindfulness is not about emptying the mind, but about being present with what is."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Services Section with New Layout */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-white/95 backdrop-blur-sm"
        className="section-padding overflow-visible"
        enableParticles={true}
      >
        <motion.div ref={servicesRef} className="container max-w-7xl mx-auto px-4 md:px-8" style={{ y: servicesY }}>
          {/* Enhanced Section Header */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-violet-50 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles size={16} className="text-violet-600" />
              <span className="text-violet-700 font-medium text-sm">Our Services</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
              How We{" "}
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-500 bg-clip-text text-transparent font-extrabold">
                Transform Lives
              </span>
            </h2>
            <p className="text-xl text-white leading-relaxed text-balance">
              Our comprehensive support services are designed to guide you on your journey toward emotional well-being
              and personal growth through proven methodologies and personalized care.
            </p>
          </motion.div>

          {/* Enhanced service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <ServiceCard
              title="Personalized Emotional Support"
              description="One-on-one sessions tailored to your unique emotional needs, providing a safe space for expression and healing."
              icon={<Heart size={28} />}
              delay={0.1}
              index={0}
            />

            <ServiceCard
              title="Heart & Mind Harmony"
              description="Techniques to align your emotional and mental states, creating balance and inner peace in your daily life."
              icon={<Brain size={28} />}
              delay={0.2}
              index={1}
            />

            <ServiceCard
              title="Mindfulness & Meditation"
              description="Guided practices to help you stay present, reduce stress, and cultivate a deeper connection with yourself."
              icon={<Sparkles size={28} />}
              delay={0.3}
              index={2}
            />

            <ServiceCard
              title="Personal Growth Guidance"
              description="Structured support to help you overcome obstacles, set meaningful goals, and achieve your full potential."
              icon={<Compass size={28} />}
              delay={0.4}
              index={3}
            />
          </div>

          {/* Enhanced CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-premium text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold group">
                  <span className="relative z-10 flex items-center">
                    Explore All Services
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </ParallaxBackground>

      {/* Enhanced Testimonials Section with Premium Design */}
      <section
        ref={testimonialsRef}
        className="section-padding bg-gradient-to-b from-white via-violet-50/20 to-white relative overflow-hidden"
      >
        {/* Enhanced floating background elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-100/30 to-pink-100/20 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-100/20 to-violet-100/30 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-violet-50/40 to-pink-50/30 rounded-full blur-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Enhanced header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative element */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-violet-200/50 shadow-large">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Heart size={32} className="text-violet-600" />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Star size={16} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced title */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-8 text-balance leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Stories That{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Heal & Inspire</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-400/60 to-pink-400/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>

            {/* Enhanced subtitle */}
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-slate-600 leading-relaxed text-balance mb-6">
                Hear from individuals who have experienced profound transformation through our guidance and support.
                Their journeys illuminate the path to healing and self-discovery.
              </p>
              <motion.div
                className="flex justify-center items-center space-x-3 text-sm text-violet-600 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                <span>1000+ verified transformations</span>
                <div
                  className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <TestimonialCard
              name="Emma Thompson"
              location="New York, NY"
              quote="Working with SoulMovies.ai has been transformative. I've found a sense of peace I didn't know was possible. The personalized approach made all the difference."
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              delay={0.1}
              index={0}
            />

            <TestimonialCard
              name="Michael Chen"
              location="San Francisco, CA"
              quote="The mindfulness techniques I've learned have helped me manage stress and find joy in everyday moments. This journey has been life-changing."
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              delay={0.2}
              index={1}
            />

            <TestimonialCard
              name="Sophia Rodriguez"
              location="Austin, TX"
              quote="I was skeptical at first, but the personalized approach and genuine care from the team made all the difference. I feel like myself again."
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
              delay={0.3}
              index={2}
            />
          </div>

          {/* Enhanced CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/stories">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-premium text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold group">
                  <span className="relative z-10 flex items-center">
                    Read More Stories
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-white/95 backdrop-blur-sm"
        className="section-padding"
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-violet-50 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MessageSquare size={16} className="text-violet-600" />
              <span className="text-violet-700 font-medium text-sm">FAQ</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
              We're <span className="gradient-text">Here For You</span>
            </h2>
            <p className="text-xl text-white leading-relaxed text-balance">
              Find answers to commonly asked questions about our services and approach. Still have questions? We're here
              to help.
            </p>
          </motion.div>

          <motion.div
            className="py-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FaqAccordion faqs={faqs} />
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-lg text-slate-600 mb-8">Still have questions? We're here to help you on your journey.</p>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-premium text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold group">
                  <span className="relative z-10 flex items-center">
                    Talk To Us
                    <MessageSquare size={18} className="ml-2 group-hover:scale-110 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </ParallaxBackground>

      {/* Enhanced Contact Section */}
      <section
        ref={contactSectionRef}
        className="section-padding bg-gradient-to-b from-white via-violet-50/30 to-white overflow-hidden"
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            style={{ scale: contactScale, opacity: contactOpacity }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-violet-50 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart size={16} className="text-violet-600" />
              <span className="text-violet-700 font-medium text-sm">Get Started</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Begin Your <span className="gradient-text">Transformation</span>
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 leading-relaxed text-balance"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Take the first step toward emotional well-being and personal growth. Choose how you'd like to connect with
              us.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 relative">
            {/* Enhanced Left card */}
            <motion.div className="relative z-10" style={{ y: cardOneY }} transition={{ duration: 0.5 }}>
              <motion.div
                className="glass-premium rounded-3xl shadow-soft p-10 md:p-12 border border-violet-100/50 h-full flex flex-col group hover:shadow-elevation transition-elegant"
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -6,
                  rotateX: -1,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Heart size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Book A Session</h3>
                </div>

                <form className="space-y-8 flex-grow">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="service" className="block text-base font-semibold text-slate-700 mb-3">
                      Select a service
                    </label>
                    <motion.select
                      id="service"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white shadow-sm transition-elegant focus-ring"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
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
                    <label htmlFor="date" className="block text-base font-semibold text-slate-700 mb-3">
                      Preferred date
                    </label>
                    <motion.input
                      type="date"
                      id="date"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-elegant focus-ring"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="time" className="block text-base font-semibold text-slate-700 mb-3">
                      Preferred time
                    </label>
                    <motion.input
                      type="time"
                      id="time"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-elegant focus-ring"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <motion.div
                    className="pt-6 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        className="w-full btn-premium text-white rounded-2xl text-lg px-8 py-4 h-auto shadow-large font-semibold group"
                        onClick={handleBookNow}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Book Your Session
                          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>

            {/* Enhanced Right card */}
            <motion.div className="relative z-10" style={{ y: cardTwoY }} transition={{ duration: 0.5 }}>
              <motion.div
                className="glass-premium rounded-3xl shadow-soft p-10 md:p-12 border border-violet-100/50 h-full flex flex-col group hover:shadow-elevation transition-elegant"
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -6,
                  rotateX: -1,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Get In Touch</h3>
                </div>

                <form className="space-y-8 flex-grow" onSubmit={handleContactSubmit}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-base font-semibold text-slate-700 mb-3">
                      Your name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-elegant focus-ring"
                      placeholder="Enter your name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      required
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="block text-base font-semibold text-slate-700 mb-3">
                      Your email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-elegant focus-ring"
                      placeholder="Enter your email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      required
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-base font-semibold text-slate-700 mb-3">
                      Your message
                    </label>
                    <motion.textarea
                      id="message"
                      rows={4}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-elegant resize-none focus-ring"
                      placeholder="How can we help you?"
                      value={contactFormData.message}
                      onChange={handleContactInputChange}
                      required
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    ></motion.textarea>
                  </motion.div>

                  <motion.div
                    className="pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        type="submit"
                        className="w-full btn-premium text-white rounded-2xl text-lg px-8 py-4 h-auto shadow-large font-semibold group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <MessageSquare size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                          Send via WhatsApp
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>

                <motion.div
                  className="mt-10 pt-8 border-t border-violet-100/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center">
                        <Clock size={16} className="mr-2 text-violet-600" />
                        Hours
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Monday - Friday: 9am - 7pm
                        <br />
                        Saturday: 10am - 4pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center">
                        <MessageSquare size={16} className="mr-2 text-violet-600" />
                        Contact
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        hello@soulmovies.ai
                        <br />
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-r from-violet-200/5 to-pink-200/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-l from-pink-200/5 to-violet-200/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-gradient-to-r from-violet-600/95 to-rose-500/95 backdrop-blur-sm"
        className="section-padding"
        enableParticles={true}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles size={16} className="text-white" />
              <span className="text-white font-medium text-sm">Start Today</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-10 text-balance leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Begin Your Journey To{" "}
              <span className="block bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                Inner Peace
              </span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-medium text-balance"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Take the first step toward reconnecting with your true self and discovering a life of emotional balance,
              authentic connection, and profound fulfillment.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/booking">
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Button className="bg-white/15 text-white hover:bg-white/25 rounded-2xl text-lg px-16 py-5 h-auto shadow-elevation font-bold transition-elegant hover-lift group border-2 border-white/30 backdrop-blur-sm">
                    <span className="relative z-10 flex items-center">
                      Start Your Journey
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Button className="bg-violet-600/80 text-white hover:bg-violet-700/80 rounded-2xl text-lg px-16 py-5 h-auto shadow-elevation border-2 border-violet-400/30 font-bold transition-elegant group backdrop-blur-sm">
                    <MessageSquare size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    Talk To Us First
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </ParallaxBackground>

      {/* Enhanced WhatsApp Button */}
      <motion.a
        href="https://wa.me/923418349814"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-40 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-elevation hover:shadow-large hover:from-green-600 hover:to-green-700 transition-elegant group hover-lift"
        aria-label="Contact us on WhatsApp"
        whileHover={{
          scale: 1.1,
          rotate: 3,
          boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-emerald-400/0 group-hover:from-green-400/20 group-hover:to-emerald-400/20 rounded-2xl transition-elegant"></div>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </motion.svg>
      </motion.a>
    </div>
  )
}
