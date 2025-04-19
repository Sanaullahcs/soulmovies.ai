"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, ArrowRight, Sparkles, Brain, Compass, ChevronDown, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import ParallaxBackground from "@/components/parallax-background"
import FloatingParticles from "@/components/floating-particles"
import AudioPlayer from "@/components/audio-player"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import FaqAccordion from "@/components/faq-accordion"
import { useRef, useState } from "react"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

  // New ref and parallax values for Contact Section
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactSectionRef,
    offset: ["start end", "end start"],
  })

  const contactScale = useTransform(contactScrollProgress, [0, 0.5, 1], [0.95, 1, 1.02])
  const contactOpacity = useTransform(contactScrollProgress, [0, 0.2, 1], [0.6, 1, 1])
  const cardOneY = useTransform(contactScrollProgress, [0, 1], [50, -20])
  const cardTwoY = useTransform(contactScrollProgress, [0, 1], [30, -10])

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

    // Format the message for WhatsApp
    const message = `*Quick Contact Request*\n\n*Name:* ${contactFormData.name}\n*Email:* ${contactFormData.email}\n\n*Message:*\n${contactFormData.message}`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/15551234567?text=${encodedMessage}`, "_blank")

    // Reset form
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1920&auto=format&fit=crop"
            alt="Serene landscape with calming atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-purple-800/30 to-pink-500/30" />
        </div>

        <motion.div className="container relative z-10 px-6 text-center" style={{ opacity, y }}>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Reconnect With Your True Self
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A sanctuary for the soul, offering personalized emotional support, mindfulness guidance, and heart-centered
            healing
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/services">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium">
                Explore Our Guidance
              </Button>
            </Link>
            <Link href="/stories">
              <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-white/30 font-medium">
                Read Client Stories
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator - helps users know there's more content below */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center cursor-pointer bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
              onClick={() => {
                const aboutSection = document.getElementById("about-section")
                if (aboutSection) {
                  window.scrollTo({
                    top: aboutSection.offsetTop - 80, // Offset for header
                    behavior: "smooth",
                  })
                }
              }}
            >
              <span className="text-white/90 text-sm mb-1 tracking-wider font-medium">Discover More</span>
              <ChevronDown size={20} className="text-white/90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50">
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Our Story</h2>
              <p className="text-slate-600">
                Founded with a vision to create a sanctuary where individuals can reconnect with their true selves,
                SoulMovies.ai was born from a deep understanding of the human need for emotional connection and growth.
              </p>
            </ParallaxSection>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <ParallaxSection direction="left" speed={0.15}>
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                  alt="Founder Sarah Lee"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-white mb-1">Sarah Lee</h3>
                    <p className="text-white/80 text-sm">Founder & Emotional Wellness Guide</p>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="right" speed={0.15}>
              <div className="space-y-5">
                <h3 className="text-2xl font-medium text-slate-800">Our Heart-Centered Philosophy</h3>
                <p className="text-slate-600">
                  At SoulMovies.ai, we believe that true healing comes from reconnecting with your authentic self. Our
                  approach combines ancient wisdom with modern techniques to create a holistic experience that nurtures
                  your mind, body, and spirit.
                </p>
                <p className="text-slate-600">
                  We understand that each person's journey is unique, which is why we offer personalized guidance
                  tailored to your specific needs and goals. Our team of experienced practitioners is dedicated to
                  creating a safe, supportive environment where you can explore, heal, and grow.
                </p>
                <div className="pt-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    Learn more about our journey
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </ParallaxSection>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
            <ParallaxSection direction="right" speed={0.15} className="md:order-2">
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Co-Founder James Carter"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-white mb-1">James Carter</h3>
                    <p className="text-white/80 text-sm">Co-Founder & Mindfulness Expert</p>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="left" speed={0.15} className="md:order-1">
              <div className="space-y-5">
                <h3 className="text-2xl font-medium text-slate-800">Our Journey to SoulMovies.ai</h3>
                <p className="text-slate-600">
                  James brings over 15 years of experience in mindfulness and meditation practices to SoulMovies.ai. His
                  journey began in the mountains of Nepal, where he studied with master practitioners and developed a
                  deep understanding of the mind-body connection.
                </p>
                <p className="text-slate-600">
                  Together with Sarah, they've created a unique approach that combines traditional wisdom with
                  cutting-edge techniques to help individuals navigate life's challenges with grace and resilience.
                </p>
                <div className="pt-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    Discover our methodology
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-white/90 backdrop-blur-sm"
        className="py-16 md:py-24 overflow-visible"
      >
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">How We Help</h2>
              <p className="text-slate-600">
                Our comprehensive support services are designed to guide you on your journey toward emotional well-being
                and personal growth.
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            <ParallaxSection direction="up" speed={0.1} delay={0.1}>
              <ServiceCard
                title="Personalized Emotional Support"
                description="One-on-one sessions tailored to your unique emotional needs, providing a safe space for expression and healing."
                icon={<Heart size={24} />}
              />
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.1} delay={0.2}>
              <ServiceCard
                title="Heart & Mind Harmony"
                description="Techniques to align your emotional and mental states, creating balance and inner peace in your daily life."
                icon={<Brain size={24} />}
              />
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.1} delay={0.3}>
              <ServiceCard
                title="Mindfulness & Meditation"
                description="Guided practices to help you stay present, reduce stress, and cultivate a deeper connection with yourself."
                icon={<Sparkles size={24} />}
              />
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.1} delay={0.4}>
              <ServiceCard
                title="Personal Growth Guidance"
                description="Structured support to help you overcome obstacles, set meaningful goals, and achieve your full potential."
                icon={<Compass size={24} />}
              />
            </ParallaxSection>
          </div>

          <div className="mt-12 text-center">
            <ParallaxSection direction="up" speed={0.05}>
              <Link href="/services">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium">
                  Explore All Services
                </Button>
              </Link>
            </ParallaxSection>
          </div>
        </div>
      </ParallaxBackground>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1920&auto=format&fit=crop"
            alt="Background texture"
            fill
            className="object-cover"
          />
        </div>

        <div className="container px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Stories That Heal</h2>
              <p className="text-slate-600">
                Hear from individuals who have experienced transformation through our guidance and support.
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <TestimonialCard
                name="Emma Thompson"
                location="New York, NY"
                quote="Working with SoulMovies.ai has been transformative. I've found a sense of peace I didn't know was possible."
                rating={5}
                imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              />
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <TestimonialCard
                name="Michael Chen"
                location="San Francisco, CA"
                quote="The mindfulness techniques I've learned have helped me manage stress and find joy in everyday moments."
                rating={5}
                imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              />
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.3}>
              <TestimonialCard
                name="Sophia Rodriguez"
                location="Austin, TX"
                quote="I was skeptical at first, but the personalized approach made all the difference. I feel like myself again."
                rating={4}
                imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
              />
            </ParallaxSection>
          </div>

          <div className="mt-12 text-center">
            <ParallaxSection direction="up" speed={0.05}>
              <Link href="/stories">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium">
                  Read More Stories
                </Button>
              </Link>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-white/90 backdrop-blur-sm"
        className="py-16 md:py-24"
      >
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">We're Here For You</h2>
              <p className="text-slate-600">
                Find answers to commonly asked questions about our services and approach.
              </p>
            </ParallaxSection>
          </div>

          <div className="py-4">
            <ParallaxSection direction="up" speed={0.1}>
              <FaqAccordion faqs={faqs} />
            </ParallaxSection>
          </div>

          <div className="mt-10 text-center">
            <ParallaxSection direction="up" speed={0.05}>
              <p className="text-slate-600 mb-4">Still unsure? We're happy to help.</p>
              <Link href="/contact">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium">
                  Talk To Us
                </Button>
              </Link>
            </ParallaxSection>
          </div>
        </div>
      </ParallaxBackground>

      {/* Contact Section - New Parallax Effect */}
      <section
        ref={contactSectionRef}
        className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50 overflow-hidden mb-16 md:mb-24"
      >
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-8 mt-8 md:mt-10 lg:mt-12"
            style={{ scale: contactScale, opacity: contactOpacity }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Begin Your Journey</h2>
            <p className="text-slate-600">
              Take the first step toward emotional well-being and personal growth with our simple booking process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative">
            {/* Left card with motion */}
            <motion.div className="relative z-10" style={{ y: cardOneY }} transition={{ duration: 0.5 }}>
              <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-violet-100/30 h-full flex flex-col">
                <h3 className="text-xl font-medium text-slate-800 mb-6">Book A Session</h3>

                <form className="space-y-4 flex-grow">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                      Select a service
                    </label>
                    <select
                      id="service"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                      <option value="">Choose a service...</option>
                      <option value="emotional-support">Personalized Emotional Support</option>
                      <option value="heart-mind">Heart & Mind Harmony</option>
                      <option value="mindfulness">Mindfulness & Meditation</option>
                      <option value="growth">Personal Growth Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">
                      Preferred time
                    </label>
                    <input
                      type="time"
                      id="time"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div className="pt-2 mt-auto pb-2">
                    <Button
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right card with motion */}
            <motion.div className="relative z-10" style={{ y: cardTwoY }} transition={{ duration: 0.5 }}>
              <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-violet-100/30 h-full flex flex-col">
                <h3 className="text-xl font-medium text-slate-800 mb-6">Get In Touch</h3>

                <form className="space-y-4 flex-grow" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Enter your name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Enter your email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="How can we help you?"
                      value={contactFormData.message}
                      onChange={handleContactInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Send via WhatsApp
                    </Button>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-800 mb-2">Hours</h4>
                      <p className="text-sm text-slate-600">
                        Monday - Friday: 9am - 7pm
                        <br />
                        Saturday: 10am - 4pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-800 mb-2">Contact</h4>
                      <p className="text-sm text-slate-600">
                        hello@soulmovies.ai
                        <br />
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-gradient-to-r from-violet-600/90 to-rose-500/90 backdrop-blur-sm"
        className="py-16 md:py-24"
      >
        <div className="container px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-5">Begin Your Journey To Inner Peace</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-6">
              Take the first step toward reconnecting with your true self and discovering a life of emotional balance
              and fulfillment.
            </p>
            <Link href="/booking">
              <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-xl text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-white/30 font-medium">
                Book Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </ParallaxBackground>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl hover:bg-green-600 transition-all group"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-green-600 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </>
  )
}
