"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Compass, Sparkles, Target, Eye, Award } from "lucide-react"

// First, let's add the necessary imports for animations
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Update the component to include smooth animations and transitions
export default function AboutPageClient() {
  // Add animation variants for consistent animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Carousel state and data
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800&auto=format&fit=crop",
      alt: "Self-Discovery",
      title: "Reconnect with Your True Self",
      description: "Journey back to your authentic essence",
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
      alt: "Mindfulness Meditation",
      title: "Mindfulness",
      description: "Present moment awareness for inner peace",
    },
    {
      src: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop",
      alt: "Emotional Healing",
      title: "Emotional Healing",
      description: "Process and release emotional trauma",
    },
    {
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
      alt: "Guided Visualization",
      title: "Guided Visualization",
      description: "Transform through the power of imagination",
    },
    {
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      alt: "Yoga Practice",
      title: "Yoga (spiritual discipline)",
      description: "Ancient practice for mind-body-spirit unity",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
      alt: "Nature Connection",
      title: "Nature Connection",
      description: "Heal through the wisdom of natural environments",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  // Handle touch events for mobile
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) {
      // Swipe left
      nextSlide()
    } else if (diff < -50) {
      // Swipe right
      prevSlide()
    }
  }

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      nextSlide()
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(timer)
  }, [currentSlide, isPaused])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920&auto=format&fit=crop"
            alt="About SoulMovies.ai"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-700/30" />
        </div>

        <div className="container relative z-10 px-6">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 className="text-4xl md:text-5xl font-medium text-white mb-4" variants={fadeIn}>
              About SoulMovies.ai
            </motion.h1>
            <motion.p className="text-lg text-white/90 max-w-2xl mb-6" variants={fadeIn}>
              Pioneering the future of emotional wellness through personalized AI-driven soul movies and transformative
              mindfulness experiences.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button className="bg-white text-violet-700 hover:bg-white/90">Discover Our Journey</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4">
                SoulMovies.ai was born from a revolutionary vision to merge cutting-edge artificial intelligence with
                ancient wisdom traditions. Founded in 2020 by Juan Carlos Calzada and Mirium, our platform represents a
                breakthrough in personalized emotional wellness technology.
              </p>
              <p className="text-slate-600 mb-4">
                After witnessing the transformative power of visualization therapy and mindfulness practices, our
                founders recognized the potential to scale these healing modalities through AI. SoulMovies.ai creates
                personalized "soul movies" - immersive visual narratives tailored to each individual's emotional
                landscape and healing journey.
              </p>
              <p className="text-slate-600 mb-4">
                Our proprietary AI algorithms analyze emotional patterns, personal preferences, and therapeutic goals to
                generate unique visual experiences that guide users through profound inner transformation. Each soul
                movie is a carefully crafted journey designed to unlock emotional healing, self-discovery, and personal
                growth.
              </p>
              <p className="text-slate-600">
                Today, SoulMovies.ai serves thousands of users across the United States, combining the wisdom of
                traditional healing practices with the precision and personalization that only advanced AI can provide.
              </p>
            </motion.div>
            <motion.div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl" variants={fadeIn}>
              {/* Carousel Container */}
              <div
                className="relative w-full h-full"
                ref={carouselRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Images */}
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carouselImages.map((image, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white max-w-[80%]">
                        <h4 className="text-xl font-medium">{image.title}</h4>
                        <p className="text-sm text-white/90 mt-1">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Pause/Play Indicator */}
                {isPaused && (
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                    Paused
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-md border border-violet-100"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-6">
                <Target className="text-violet-600" size={24} />
              </div>
              <h3 className="text-2xl font-medium text-slate-800 mb-4">Our Mission</h3>
              <p className="text-slate-600 mb-4">
                To democratize access to personalized emotional healing through AI-powered soul movies that guide
                individuals on transformative journeys of self-discovery and emotional wellness.
              </p>
              <p className="text-slate-600">
                We believe that everyone deserves access to tools that can help them reconnect with their authentic
                self, process emotional challenges, and cultivate lasting inner peace through the power of personalized
                visual storytelling.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-md border border-violet-100"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-6">
                <Eye className="text-violet-600" size={24} />
              </div>
              <h3 className="text-2xl font-medium text-slate-800 mb-4">Our Vision</h3>
              <p className="text-slate-600 mb-4">
                To create a world where AI-enhanced emotional wellness is accessible to everyone, fostering a global
                community of individuals who are empowered to heal, grow, and thrive through personalized soul movie
                experiences.
              </p>
              <p className="text-slate-600">
                We envision SoulMovies.ai as the leading platform where technology and spirituality converge to create
                profound healing experiences that transcend traditional therapeutic boundaries.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Makes SoulMovies.ai Unique */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">What Makes SoulMovies.ai Unique</h2>
            <p className="text-slate-600">
              Our innovative approach combines cutting-edge AI with proven therapeutic methodologies
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-gradient-to-br from-violet-50 to-rose-50 rounded-3xl p-6 shadow-md border border-violet-100/50 h-full"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Brain className="text-violet-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">AI-Powered Personalization</h3>
              <p className="text-slate-600">
                Our advanced algorithms analyze your emotional patterns, preferences, and therapeutic goals to create
                completely personalized soul movie experiences that evolve with your journey.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 shadow-md border border-rose-100/50 h-full"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <Sparkles className="text-rose-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Immersive Visual Storytelling</h3>
              <p className="text-slate-600">
                Each soul movie is a cinematic journey crafted with stunning visuals, therapeutic soundscapes, and
                guided narratives designed to facilitate deep emotional processing and healing.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-6 shadow-md border border-blue-100/50 h-full"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Evidence-Based Methodology</h3>
              <p className="text-slate-600">
                Our approach integrates proven therapeutic techniques including visualization therapy, mindfulness-based
                interventions, and somatic experiencing within our AI-generated experiences.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-slate-600">
              These principles guide every aspect of SoulMovies.ai's development and service delivery
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 h-full"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Heart className="text-violet-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Compassionate Innovation</h3>
              <p className="text-slate-600">
                We develop technology with deep empathy and understanding, ensuring that every feature of SoulMovies.ai
                serves the highest good of our users' emotional well-being and personal growth.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 h-full"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Brain className="text-violet-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Mindful Technology</h3>
              <p className="text-slate-600">
                We believe technology should enhance human consciousness, not diminish it. Our AI is designed to promote
                mindfulness, self-awareness, and deeper connection with one's authentic self.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 h-full"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Compass className="text-violet-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Transformational Growth</h3>
              <p className="text-slate-600">
                We are committed to facilitating profound personal transformation through our platform, supporting users
                in their journey toward emotional mastery, spiritual awakening, and authentic self-expression.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Meet Our Founders</h2>
            <p className="text-slate-600">
              Visionary leaders combining expertise in technology, psychology, and spiritual wellness to revolutionize
              emotional healing.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-violet-100/30"
              variants={fadeIn}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-80">
                <Image
                  src="/images/juan-carlos-calzada.png"
                  alt="Juan Carlos Calzada"
                  fill
                  className="object-cover object-[center_-80px] transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-800 mb-1">Juan Carlos Calzada</h3>
                <p className="text-violet-600 mb-4">Founder & Chief Emotional Wellness Officer</p>
                <p className="text-sm text-slate-600 mb-3">
                  With over 15 years of experience in emotional wellness and AI development, Juan Carlos pioneered the
                  concept of AI-generated soul movies. His background in psychology and machine learning enables him to
                  bridge the gap between technology and human consciousness.
                </p>
                <p className="text-sm text-slate-600">
                  Juan Carlos holds certifications in various therapeutic modalities and has dedicated his career to
                  making transformational healing accessible through innovative technology solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-violet-100/30"
              variants={fadeIn}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-80">
                <Image
                  src="/images/mirium-meditation.jpg"
                  alt="Mirium"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-800 mb-1">Mirium</h3>
                <p className="text-violet-600 mb-4">Co-Founder & Chief Mindfulness Officer</p>
                <p className="text-sm text-slate-600 mb-3">
                  Mirium brings profound expertise in mindfulness, meditation, and somatic healing to SoulMovies.ai.
                  Having trained with master teachers in Bali and studied ancient wisdom traditions, she ensures our AI
                  maintains the sacred essence of traditional healing practices.
                </p>
                <p className="text-sm text-slate-600">
                  Her role involves infusing spiritual wisdom into our technological framework, creating soul movies
                  that honor both innovation and the timeless principles of emotional healing.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">The SoulMovies.ai Methodology</h2>
            <p className="text-slate-600">
              Our proprietary approach combines AI precision with heart-centered healing wisdom
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-5" variants={fadeIn}>
              <h3 className="text-2xl font-medium text-slate-800">AI-Enhanced Soul Movie Creation</h3>
              <p className="text-slate-600">
                Our revolutionary approach begins with comprehensive emotional assessment using advanced AI algorithms
                that understand your unique psychological landscape, trauma patterns, and healing aspirations.
              </p>
              <p className="text-slate-600">
                The AI then generates personalized visual narratives that guide you through transformative experiences,
                incorporating elements of visualization therapy, guided meditation, and somatic healing practices.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start">
                  <span className="text-violet-600 mr-3 mt-1">•</span>
                  <span className="text-slate-600">Personalized emotional profiling and assessment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-3 mt-1">•</span>
                  <span className="text-slate-600">AI-generated therapeutic visual narratives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-3 mt-1">•</span>
                  <span className="text-slate-600">Adaptive healing journeys that evolve with progress</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-3 mt-1">•</span>
                  <span className="text-slate-600">Integration of mindfulness and somatic practices</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop"
                alt="SoulMovies.ai Methodology"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-violet-600 to-rose-500 text-white">
        <motion.div
          className="container px-6 max-w-7xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Experience Your Personal Soul Movie</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands across America who have transformed their lives through AI-powered emotional healing. Begin
            your personalized journey with SoulMovies.ai today.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button className="bg-white text-violet-700 hover:bg-white/90" asChild>
              <Link href="/booking">Start Your Soul Movie Journey</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
