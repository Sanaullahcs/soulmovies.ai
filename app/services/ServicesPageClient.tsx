"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckIcon, Star, Clock, Users, Sparkles, Heart, Brain } from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesPageClient() {
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
        staggerChildren: 0.1,
      },
    },
  }

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1920&auto=format&fit=crop"
            alt="Our Services Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-700/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 className="text-4xl md:text-5xl font-bold text-white mb-6" variants={fadeIn}>
              Our Services
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed" variants={fadeIn}>
              Discover our premium services designed to help you create powerful soul movies that transform your life
              and manifest your deepest desires.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" variants={fadeIn}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-violet-700 hover:bg-white/90">Explore Services</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Book Consultation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Our Services</h2>
            <p className="text-lg text-slate-600">
              We offer a range of personalized services to help you transform your life through the power of
              visualization and emotional connection.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Service 1 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-violet-100 h-full"
              variants={fadeIn}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Personalized Soul Movies</h3>
              <p className="text-slate-600 mb-4">
                Custom-created visual experiences designed to align your conscious and subconscious mind, helping you
                manifest your goals and transform your emotional state.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Tailored to your specific goals</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Custom soundtrack and visuals</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-violet-100 h-full"
              variants={fadeIn}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Emotional Healing Sessions</h3>
              <p className="text-slate-600 mb-4">
                Guided sessions that help you process complex emotions, release blockages, and heal emotional wounds
                through visual storytelling and mindfulness techniques.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">One-on-one guidance</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Personalized healing approach</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-violet-100 h-full"
              variants={fadeIn}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Manifestation Coaching</h3>
              <p className="text-slate-600 mb-4">
                Learn powerful visualization techniques and mindset shifts to manifest your desires and achieve your
                goals with greater ease and alignment.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Practical manifestation tools</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Ongoing support and guidance</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Our Packages</h2>
            <p className="text-lg text-slate-600">
              Select the package that best fits your needs and begin your transformative journey today.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Free Consultation Package */}
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 flex flex-col h-full"
              variants={fadeIn}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
            >
              <div className="p-6 bg-gradient-to-br from-violet-50 to-slate-50">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Free Initial Consultation</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-violet-600">$0</span>
                  <span className="text-slate-600 mb-1">free</span>
                </div>
                <p className="text-slate-600 mb-4">
                  Get to know us and explore how soul movies can transform your life.
                </p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 mb-6">
                  {[
                    "30-minute personal consultation",
                    "Understand your goals and vision",
                    "Explore how soul movies work",
                    "Personalized recommendations",
                    "No obligation to purchase",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">Book Consultation</Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-violet-200 flex flex-col h-full relative"
              variants={fadeIn}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
            >
              <motion.div
                className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                MOST POPULAR
              </motion.div>
              <div className="p-6 bg-gradient-to-br from-violet-100 to-rose-50">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Soul Movies Premium</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-violet-600">$199</span>
                  <span className="text-slate-600 mb-1">one-time</span>
                </div>
                <p className="text-slate-600 mb-4">
                  Enhanced experience with additional customization and premium features.
                </p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 mb-6">
                  {[
                    "Personalized 5-8 minute soul movie",
                    "Custom soundtrack creation",
                    "Advanced visual effects and transitions",
                    "Two rounds of revisions",
                    "Digital delivery within 5 days",
                    "Personal consultation session",
                    "Extended license for commercial use",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-700 hover:to-rose-600 text-white">
                    Choose Premium
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Ultimate Package */}
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 flex flex-col h-full"
              variants={fadeIn}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
            >
              <div className="p-6 bg-gradient-to-br from-violet-50 to-slate-50">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Soul Movies Ultimate</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-violet-600">$349</span>
                  <span className="text-slate-600 mb-1">one-time</span>
                </div>
                <p className="text-slate-600 mb-4">The complete transformative experience with all premium features.</p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 mb-6">
                  {[
                    "Personalized 8-12 minute soul movie",
                    "Fully custom soundtrack creation",
                    "Premium visual effects and transitions",
                    "Unlimited revisions",
                    "Digital delivery within 3 days",
                    "Two personal consultation sessions",
                    "Extended license for commercial use",
                    "Exclusive access to premium templates",
                    "Lifetime updates and support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">Choose Ultimate</Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Our Creative Process</h2>
            <p className="text-lg text-slate-600">
              We follow a thoughtful, collaborative approach to create your personalized soul movie
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                step: 1,
                title: "Discovery",
                description:
                  "We begin with a deep conversation to understand your vision, emotions, and intentions for your soul movie.",
                icon: <Users className="h-6 w-6 text-violet-600" />,
              },
              {
                step: 2,
                title: "Creation",
                description:
                  "Our artists craft a personalized visual journey using imagery, music, and effects that resonate with your vision.",
                icon: <Sparkles className="h-6 w-6 text-violet-600" />,
              },
              {
                step: 3,
                title: "Refinement",
                description:
                  "We collaborate with you to refine the soul movie until it perfectly captures your intended experience.",
                icon: <Star className="h-6 w-6 text-violet-600" />,
              },
              {
                step: 4,
                title: "Integration",
                description:
                  "We provide guidance on how to use your soul movie as a powerful tool for transformation in your daily life.",
                icon: <Clock className="h-6 w-6 text-violet-600" />,
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-md border border-violet-100 h-full flex flex-col"
                variants={fadeIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-2xl bg-violet-100 shadow-sm">
                  {process.icon}
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-medium mr-3">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{process.title}</h3>
                </div>
                <p className="text-slate-600">{process.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Benefits of Soul Movies</h2>
            <p className="text-lg text-slate-600">Discover how our soul movies can transform your life</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Enhanced Manifestation",
                description:
                  "Visualize your goals and desires with greater clarity and emotional resonance, accelerating the manifestation process.",
              },
              {
                title: "Emotional Processing",
                description:
                  "Process complex emotions through visual storytelling, helping you release blockages and heal emotional wounds.",
              },
              {
                title: "Increased Self-Awareness",
                description:
                  "Gain deeper insights into your subconscious patterns, beliefs, and desires through personalized visual journeys.",
              },
              {
                title: "Improved Focus",
                description:
                  "Train your mind to focus on your goals and aspirations with greater intention and clarity.",
              },
              {
                title: "Stress Reduction",
                description: "Experience reduced stress and anxiety through regular engagement with your soul movie.",
              },
              {
                title: "Personal Transformation",
                description:
                  "Accelerate your personal growth journey by aligning your conscious and subconscious mind.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
                variants={fadeIn}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">What Our Clients Say</h2>
            <p className="text-lg text-slate-600">Hear from people who have experienced our services</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Entrepreneur",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
                quote:
                  "The soul movie created for me was truly transformative. I've seen remarkable changes in my business and personal life since incorporating it into my daily routine.",
              },
              {
                name: "Michael Chen",
                role: "Artist",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
                quote:
                  "I was skeptical at first, but the results speak for themselves. My creative blocks disappeared and I've been more productive than ever before.",
              },
              {
                name: "Aisha Patel",
                role: "Therapist",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
                quote:
                  "As a therapist, I've recommended SoulMovies.ai to many of my clients. The results have been incredible, helping them process emotions in ways traditional therapy couldn't.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                variants={fadeIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div className="mr-4" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-violet-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Find answers to common questions about our services</p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                question: "What exactly is a soul movie?",
                answer:
                  "A soul movie is a personalized visual experience created specifically for you, combining imagery, music, and effects that resonate with your goals, desires, and emotional state. It's designed to help you manifest your dreams, process emotions, and connect with your deeper self.",
              },
              {
                question: "How long does it take to create a soul movie?",
                answer:
                  "The creation process typically takes 3-7 days depending on the package you choose. Our Premium and Ultimate packages include faster delivery times.",
              },
              {
                question: "How do I use my soul movie once I receive it?",
                answer:
                  "We recommend watching your soul movie daily, preferably in a quiet space where you can fully immerse yourself in the experience. Many clients find it most effective to watch it first thing in the morning or right before bed when the mind is most receptive.",
              },
              {
                question: "Can I request revisions to my soul movie?",
                answer:
                  "Yes, all packages include at least one round of revisions. Our Premium package includes two rounds, and our Ultimate package includes unlimited revisions to ensure your complete satisfaction.",
              },
              {
                question: "Is there scientific evidence behind soul movies?",
                answer:
                  "Soul movies are based on established principles of visualization, mindfulness, and emotional processing. Research has shown that visualization techniques can positively impact goal achievement, stress reduction, and emotional well-being.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="mb-6 border-b border-slate-200 pb-6 last:border-0"
                variants={fadeIn}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-slate-800 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-rose-500 text-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards manifesting your dreams and creating the life you desire.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button className="bg-white text-violet-600 hover:bg-slate-100 px-8 py-3 text-lg rounded-full" asChild>
              <Link href="/booking">Get Started Today</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
