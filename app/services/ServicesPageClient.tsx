"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, MessageCircle, Sparkles, Heart, Brain, Star, CheckCircle, ArrowRight, Clock, Users, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ServicesPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const services = [
    {
      id: 0,
      icon: MessageCircle,
      title: "Share Your Soul",
      subtitle: "Personal Discovery Path",
      description:
        "Tell us what matters most to you. We listen with complete presence and transform your words into a Soul Movie that reflects your deepest essence.",
      features: [
        "Share your authentic story",
        "Feel truly understood",
        "Personal transformation begins",
        "Your soul recognized",
      ],
      duration: "45-60 minutes",
      price: "Starting at $297",
      color: "violet",
      gradient: "from-violet-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 1,
      icon: Brain,
      title: "Quantum Healing Hypnosis",
      subtitle: "Higher Self Connection",
      description:
        "Experience a transformative session inspired by QHHT to connect directly with your Higher Self and access profound healing wisdom.",
      features: [
        "Deep hypnotic state guidance",
        "Higher Self communication",
        "Past life exploration",
        "Quantum healing activation",
      ],
      duration: "3-4 hour session",
      price: "Starting at $697",
      color: "rose",
      gradient: "from-rose-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop",
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Personalized Healing",
      description: "Each SoulMovie is uniquely crafted based on your personal information and Higher Self guidance.",
    },
    {
      icon: Sparkles,
      title: "Higher Self Connection",
      description: "Connect with your inner wisdom and receive guidance tailored specifically for your soul's journey.",
    },
    {
      icon: Star,
      title: "Transformative Experience",
      description: "Experience profound shifts in consciousness through your custom-made meditation movie.",
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Minimal Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-violet-50">
        {/* Subtle Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-rose-500/5" />
          {/* Minimal floating elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block px-4 py-2 bg-violet-100/80 backdrop-blur-sm rounded-full text-violet-700 text-sm font-medium">
                ✨ Transform Your Soul's Journey
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-light text-slate-800 mb-4 leading-tight"
            >
              Your Custom
            </motion.h1>
            <motion.div variants={fadeInUp} className="mt-4 mb-8">
              <span className="text-5xl md:text-7xl bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent font-medium">
                SoulMovie
              </span>
              <span className="text-5xl md:text-7xl font-light text-slate-800 ml-4">Awaits</span>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience personalized meditation movies crafted from your soul's wisdom. Choose your path to
              transformation through our guided questionnaire or profound QHHT sessions.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/booking">
                  <Button className="bg-violet-600 text-white hover:bg-violet-700 rounded-xl px-8 py-4 h-auto shadow-lg transition-all font-medium">
                    Begin Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl px-8 py-4 h-auto font-medium"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Sample
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-6 w-6 text-slate-400" />
        </motion.div>
      </section>

      {/* Minimal Services Section */}
      <section className="py-24 bg-white">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                Two Sacred Paths
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Choose Your Path
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
              Each path connects you with your Higher Self to create a personalized meditation movie for your spiritual
              journey.
            </motion.p>
          </motion.div>

          {/* Clean Service Cards */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-8">
                    {/* Service Image */}
                    <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      <motion.div
                        className={`absolute top-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <service.icon className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Service Content */}
                    <div className="space-y-4">
                      <div>
                        <span className={`text-xs font-medium text-${service.color}-600 uppercase tracking-wider`}>
                          {service.subtitle}
                        </span>
                        <h3 className="text-2xl font-medium text-slate-800 mt-1">{service.title}</h3>
                      </div>

                      <p className="text-slate-600 leading-relaxed">{service.description}</p>

                      {/* Features */}
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className={`h-4 w-4 text-${service.color}-500`} />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Duration & Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center space-x-2 text-slate-500">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                        <div className={`text-lg font-semibold text-${service.color}-600`}>{service.price}</div>
                      </div>

                      {/* CTA Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                        <Link href="/booking">
                          <Button
                            className={`w-full bg-gradient-to-r ${service.gradient} text-white rounded-lg py-3 h-auto shadow-sm hover:shadow-md transition-all font-medium`}
                          >
                            Choose This Path
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Why SoulMovies Transform Lives
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
              Experience the profound impact of personalized meditation designed for your soul's unique journey.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <benefit.icon className="h-8 w-8 text-violet-600" />
                </motion.div>

                <h3 className="text-xl font-medium text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Minimal CTA Section */}
      <section className="py-24 bg-white">
        <div className="container px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Ready to Create Your SoulMovie?
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-12 leading-relaxed">
              Begin your transformative journey today. Your Higher Self is waiting to guide you toward healing, growth,
              and profound self-discovery.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/booking">
                  <Button className="bg-violet-600 text-white hover:bg-violet-700 rounded-xl px-8 py-4 h-auto shadow-lg transition-all font-medium">
                    Begin Your SoulMovie Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl px-8 py-4 h-auto font-medium"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
