"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Heart, ArrowRight, Sparkles, Brain, Compass, ChevronDown, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParallaxBackground from "@/components/parallax-background"
import FloatingParticles from "@/components/floating-particles"
import AudioPlayer from "@/components/audio-player"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import FaqAccordion from "@/components/faq-accordion"
import { useRef, useState } from "react"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  // Hero parallax with spring physics
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroY = useSpring(useTransform(heroProgress, [0, 1], ["0%", "30%"]))
  const heroOpacity = useSpring(useTransform(heroProgress, [0, 0.7], [1, 0]))
  const heroScale = useSpring(useTransform(heroProgress, [0, 1], [1, 1.05]))

  // About section with smooth parallax
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  const aboutY = useSpring(useTransform(aboutProgress, [0, 1], ["60px", "-60px"]))

  // Services section
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  })

  const servicesY = useSpring(useTransform(servicesProgress, [0, 1], ["40px", "-40px"]))

  // Contact section with enhanced parallax
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactSectionRef,
    offset: ["start end", "end start"],
  })

  const contactScale = useSpring(useTransform(contactScrollProgress, [0, 0.5, 1], [0.98, 1, 1.02]))
  const contactOpacity = useSpring(useTransform(contactScrollProgress, [0, 0.2, 1], [0.8, 1, 1]))
  const cardOneY = useSpring(useTransform(contactScrollProgress, [0, 1], [40, -20]))
  const cardTwoY = useSpring(useTransform(contactScrollProgress, [0, 1], [20, -10]))

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
    <>
      <FloatingParticles />
      <AudioPlayer />

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <Image
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1920&auto=format&fit=crop"
            alt="Serene landscape with calming atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-purple-800/40 to-pink-500/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-pink-900/20" />
        </motion.div>

        <motion.div className="container relative z-10 container-spacing text-center" style={{ opacity: heroOpacity }}>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-12 tracking-tight text-balance"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Reconnect With
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Your True Self
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-16 leading-relaxed font-medium text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            A sanctuary for the soul, offering personalized emotional support, mindfulness guidance, and heart-centered
            healing
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-primary text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold">
                  <span className="relative z-10">Explore Our Guidance</span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/stories">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="glass text-white hover:bg-white/20 rounded-2xl text-lg px-12 py-4 h-auto shadow-large border border-white/30 font-semibold transition-elegant">
                  Read Client Stories
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-12 right-12 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                Scroll
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

      {/* Enhanced About Section */}
      <section
        id="about-section"
        ref={aboutRef}
        className="section-padding bg-gradient-to-b from-white via-violet-50/30 to-white relative"
      >
        <motion.div className="container container-spacing max-w-7xl mx-auto" style={{ y: aboutY }}>
          <motion.div
            className="max-w-4xl mx-auto text-center mb-24"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
              Our <span className="gradient-text">Story</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed text-balance">
              Founded with a vision to create a sanctuary where individuals can reconnect with their true selves,
              SoulMovies.ai was born from a deep understanding of the human need for emotional connection and growth.
            </p>
          </motion.div>

          {/* Team cards with enhanced spacing */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="perspective-1000"
            >
              <motion.div
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-large group"
                whileHover={{
                  rotateY: 3,
                  scale: 1.02,
                  transition: { duration: 0.4 },
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                  alt="Founder Sarah Lee"
                  fill
                  className="object-cover group-hover:scale-105 transition-elegant duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-violet-900/20 to-transparent flex items-end">
                  <motion.div
                    className="p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">Sarah Lee</h3>
                    <p className="text-white/90 text-base font-medium">Founder & Emotional Wellness Guide</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

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
                <motion.p
                  className="text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  At SoulMovies.ai, we believe that true healing comes from reconnecting with your authentic self. Our
                  approach combines ancient wisdom with modern techniques to create a holistic experience that nurtures
                  your mind, body, and spirit.
                </motion.p>
                <motion.p
                  className="text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  We understand that each person's journey is unique, which is why we offer personalized guidance
                  tailored to your specific needs and goals. Our team of experienced practitioners is dedicated to
                  creating a safe, supportive environment where you can explore, heal, and grow.
                </motion.p>
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

          {/* Second team member */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:order-2 perspective-1000"
            >
              <motion.div
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-large group"
                whileHover={{
                  rotateY: -3,
                  scale: 1.02,
                  transition: { duration: 0.4 },
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Co-Founder James Carter"
                  fill
                  className="object-cover group-hover:scale-105 transition-elegant duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-violet-900/20 to-transparent flex items-end">
                  <motion.div
                    className="p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">James Carter</h3>
                    <p className="text-white/90 text-base font-medium">Co-Founder & Mindfulness Expert</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:order-1"
            >
              <div className="space-y-8">
                <motion.h3
                  className="text-3xl font-bold text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Our Journey to SoulMovies.ai
                </motion.h3>
                <motion.p
                  className="text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  James brings over 15 years of experience in mindfulness and meditation practices to SoulMovies.ai. His
                  journey began in the mountains of Nepal, where he studied with master practitioners and developed a
                  deep understanding of the mind-body connection.
                </motion.p>
                <motion.p
                  className="text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Together with Sarah, they've created a unique approach that combines traditional wisdom with
                  cutting-edge techniques to help individuals navigate life's challenges with grace and resilience.
                </motion.p>
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
          </div>
        </motion.div>
      </section>

      {/* Enhanced Services Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-white/95 backdrop-blur-sm"
        className="section-padding overflow-visible"
      >
        <motion.div
          ref={servicesRef}
          className="container container-spacing max-w-7xl mx-auto"
          style={{ y: servicesY }}
        >
          <motion.div
            className="max-w-4xl mx-auto text-center mb-24"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
              How We <span className="gradient-text">Help</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed text-balance">
              Our comprehensive support services are designed to guide you on your journey toward emotional well-being
              and personal growth.
            </p>
          </motion.div>

          {/* Enhanced service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
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

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-primary text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold">
                  <span className="relative z-10">Explore All Services</span>
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
        {/* Floating background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-100/30 to-pink-100/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-100/20 to-violet-100/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-violet-50/40 to-pink-50/30 rounded-full blur-2xl"></div>
        </div>

        <div className="container container-spacing max-w-7xl mx-auto relative z-10">
          {/* Enhanced header with better spacing and visual hierarchy */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative element */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-violet-200/50">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Heart size={24} className="text-violet-600" />
                  </motion.div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            {/* Enhanced title with better typography */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 text-balance leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Stories That{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Heal</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-400/60 to-pink-400/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>

            {/* Enhanced subtitle with better spacing */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-slate-600 leading-relaxed text-balance mb-4">
                Hear from individuals who have experienced transformation through our guidance and support.
              </p>
              <motion.div
                className="flex justify-center items-center space-x-2 text-sm text-violet-600 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <span>Real stories from real people</span>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced testimonial cards with better grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <TestimonialCard
              name="Emma Thompson"
              location="New York, NY"
              quote="Working with SoulMovies.ai has been transformative. I've found a sense of peace I didn't know was possible."
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              delay={0.1}
              index={0}
            />

            <TestimonialCard
              name="Michael Chen"
              location="San Francisco, CA"
              quote="The mindfulness techniques I've learned have helped me manage stress and find joy in everyday moments."
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              delay={0.2}
              index={1}
            />

            <TestimonialCard
              name="Sophia Rodriguez"
              location="Austin, TX"
              quote="I was skeptical at first, but the personalized approach made all the difference. I feel like myself again."
              rating={4}
              imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
              delay={0.3}
              index={2}
            />
          </div>

          {/* Enhanced CTA with better design */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/stories">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-primary text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Read More Stories
                    <motion.div className="ml-2" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <ArrowRight size={18} />
                    </motion.div>
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
        <div className="container container-spacing max-w-7xl mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
              We're <span className="gradient-text">Here For You</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed text-balance">
              Find answers to commonly asked questions about our services and approach.
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
            <p className="text-lg text-slate-600 mb-8">Still unsure? We're happy to help.</p>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="btn-primary text-white rounded-2xl text-lg px-12 py-4 h-auto shadow-large font-semibold">
                  <span className="relative z-10">Talk To Us</span>
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
        <div className="container container-spacing max-w-7xl mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            style={{ scale: contactScale, opacity: contactOpacity }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Begin Your <span className="gradient-text">Journey</span>
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 leading-relaxed text-balance"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Take the first step toward emotional well-being and personal growth with our simple booking process.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 relative">
            {/* Enhanced Left card */}
            <motion.div className="relative z-10" style={{ y: cardOneY }} transition={{ duration: 0.5 }}>
              <motion.div
                className="glass-card rounded-3xl shadow-soft p-10 md:p-12 border border-violet-100/50 h-full flex flex-col group hover:shadow-elevation transition-elegant"
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
                <h3 className="text-2xl font-bold text-slate-800 mb-10">Book A Session</h3>

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
                        className="w-full btn-primary text-white rounded-2xl text-lg px-8 py-4 h-auto shadow-large font-semibold"
                        onClick={handleBookNow}
                      >
                        <span className="relative z-10">Book Now</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>

            {/* Enhanced Right card */}
            <motion.div className="relative z-10" style={{ y: cardTwoY }} transition={{ duration: 0.5 }}>
              <motion.div
                className="glass-card rounded-3xl shadow-soft p-10 md:p-12 border border-violet-100/50 h-full flex flex-col group hover:shadow-elevation transition-elegant"
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -6,
                  rotateX: -1,
                  transition: { duration: 0.3 },
                }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-10">Get In Touch</h3>

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
                        className="w-full btn-primary text-white rounded-2xl text-lg px-8 py-4 h-auto shadow-large font-semibold"
                      >
                        <MessageSquare size={20} className="mr-3 relative z-10" />
                        <span className="relative z-10">Send via WhatsApp</span>
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
                      <h4 className="text-base font-bold text-slate-800 mb-4">Hours</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Monday - Friday: 9am - 7pm
                        <br />
                        Saturday: 10am - 4pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800 mb-4">Contact</h4>
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

            {/* Subtle decorative elements */}
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
      >
        <div className="container container-spacing relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-10 text-balance"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Begin Your Journey To <span className="block">Inner Peace</span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-12 leading-relaxed font-medium text-balance"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Take the first step toward reconnecting with your true self and discovering a life of emotional balance
              and fulfillment.
            </motion.p>
            <motion.div
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
                  <Button className="bg-white text-violet-700 hover:bg-white/95 rounded-2xl text-lg px-16 py-5 h-auto shadow-elevation font-bold transition-elegant hover-lift">
                    <span className="relative z-10">Start Your Journey</span>
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
    </>
  )
}
