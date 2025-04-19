"use client"

import { useRef } from "react"
import Image from "next/image"
import { Heart, Brain, Sparkles, Compass, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import ParallaxBackground from "@/components/parallax-background"
import Link from "next/link"

export default function ServicesPage() {
  // Reference to the booking button at the top
  const bookingButtonRef = useRef<HTMLDivElement>(null)

  // Function to scroll to the booking button
  const scrollToBooking = () => {
    bookingButtonRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section with Booking Button */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
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

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">Our Services</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Comprehensive support designed to guide you on your journey toward emotional well-being
            </p>

            {/* Prominent Booking Button */}
            <div ref={bookingButtonRef} className="mt-8 mb-4 animate-pulse">
              <Link href="/booking">
                <Button className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all border border-white/30 font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Your Session Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="down" speed={0.2}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">How We Help</h2>
              <p className="text-slate-600">
                Our comprehensive support services are designed to guide you on your journey toward emotional well-being
                and personal growth.
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12 overflow-visible">
            <ParallaxSection direction="up" speed={0.25} scale={true}>
              <div
                id="personalized-emotional-support"
                className="bg-white rounded-3xl p-8 shadow-md border border-violet-100"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-600 mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-medium text-slate-800 mb-4">Personalized Emotional Support</h3>
                <p className="text-slate-600 mb-6">
                  One-on-one sessions tailored to your unique emotional needs, providing a safe space for expression and
                  healing. Our approach combines active listening, empathy, and personalized guidance to help you
                  navigate life's challenges.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Personalized emotional wellness assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Customized support strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Safe space for processing emotions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Ongoing guidance and accountability</span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToBooking}
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-6 h-auto border border-violet-500 font-medium"
                >
                  Book This Service
                </Button>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.25} scale={true}>
              <div id="heart-mind-harmony" className="bg-white rounded-3xl p-8 shadow-md border border-violet-100">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-600 mb-6">
                  <Brain size={32} />
                </div>
                <h3 className="text-2xl font-medium text-slate-800 mb-4">Heart & Mind Harmony</h3>
                <p className="text-slate-600 mb-6">
                  Techniques to align your emotional and mental states, creating balance and inner peace in your daily
                  life. Our heart-centered approach helps you integrate your thoughts and feelings for greater
                  wellbeing.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Heart-brain coherence techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Emotional regulation practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Cognitive-emotional integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Stress reduction methods</span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToBooking}
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-6 h-auto border border-violet-500 font-medium"
                >
                  Book This Service
                </Button>
              </div>
            </ParallaxSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16 overflow-visible">
            <ParallaxSection direction="up" speed={0.25} scale={true}>
              <div id="mindfulness-meditation" className="bg-white rounded-3xl p-8 shadow-md border border-violet-100">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-600 mb-6">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-medium text-slate-800 mb-4">Mindfulness & Meditation</h3>
                <p className="text-slate-600 mb-6">
                  Guided practices to help you stay present, reduce stress, and cultivate a deeper connection with
                  yourself. Our mindfulness techniques are designed to fit into your daily life and create lasting
                  positive change.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Personalized meditation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Mindful awareness practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Breath work techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Present-moment integration</span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToBooking}
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-6 h-auto border border-violet-500 font-medium"
                >
                  Book This Service
                </Button>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.25} scale={true}>
              <div
                id="personal-growth-guidance"
                className="bg-white rounded-3xl p-8 shadow-md border border-violet-100"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-600 mb-6">
                  <Compass size={32} />
                </div>
                <h3 className="text-2xl font-medium text-slate-800 mb-4">Personal Growth Guidance</h3>
                <p className="text-slate-600 mb-6">
                  Structured support to help you overcome obstacles, set meaningful goals, and achieve your full
                  potential. Our guidance empowers you to create lasting positive change in all areas of your life.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Values clarification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Goal setting and achievement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Obstacle identification and navigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Personal development planning</span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToBooking}
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-6 h-auto border border-violet-500 font-medium"
                >
                  Book This Service
                </Button>
              </div>
            </ParallaxSection>
          </div>

          {/* Reminder Booking Button */}
          <div className="mt-16 text-center">
            <Button
              onClick={scrollToBooking}
              className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all border border-violet-500/30 font-medium"
            >
              Book Your Session
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="down" speed={0.2} opacity={true}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Our Process</h2>
              <p className="text-slate-600">
                How we work with you to create a personalized journey toward emotional well-being
              </p>
            </ParallaxSection>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-violet-200 hidden md:block"></div>

            <div className="space-y-12 relative">
              <ParallaxSection direction="left" speed={0.3} opacity={true}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                    <div className="bg-white rounded-3xl p-8 shadow-md max-w-md">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-600 text-white mb-6">
                        <span className="text-xl font-medium">1</span>
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 mb-3">Initial Consultation</h3>
                      <p className="text-slate-600">
                        We begin with a comprehensive assessment to understand your unique needs, challenges, and goals.
                        This helps us create a personalized approach tailored specifically to you.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2 md:order-2 hidden md:block"></div>
                </div>
              </ParallaxSection>

              <ParallaxSection direction="right" speed={0.3} opacity={true}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 order-1 md:order-2">
                    <div className="bg-white rounded-3xl p-8 shadow-md max-w-md">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-600 text-white mb-6">
                        <span className="text-xl font-medium">2</span>
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 mb-3">Personalized Plan</h3>
                      <p className="text-slate-600">
                        Based on your consultation, we develop a customized plan that integrates the most effective
                        approaches for your situation, with clear milestones and practices.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2 md:order-1 hidden md:block"></div>
                </div>
              </ParallaxSection>

              <ParallaxSection direction="left" speed={0.3} opacity={true}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                    <div className="bg-white rounded-3xl p-8 shadow-md max-w-md">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-600 text-white mb-6">
                        <span className="text-xl font-medium">3</span>
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 mb-3">Guided Implementation</h3>
                      <p className="text-slate-600">
                        We work together through regular sessions to implement your plan, providing support, guidance,
                        and adjustments as needed to ensure you're making progress.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2 md:order-2 hidden md:block"></div>
                </div>
              </ParallaxSection>

              <ParallaxSection direction="right" speed={0.3} opacity={true}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 order-1 md:order-2">
                    <div className="bg-white rounded-3xl p-8 shadow-md max-w-md">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-600 text-white mb-6">
                        <span className="text-xl font-medium">4</span>
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 mb-3">Ongoing Support</h3>
                      <p className="text-slate-600">
                        Your journey doesn't end after the initial program. We provide ongoing support and resources to
                        help you maintain your progress and continue growing.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2 md:order-1 hidden md:block"></div>
                </div>
              </ParallaxSection>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.25} rotate={true}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Investment in Your Well-being</h2>
              <p className="text-slate-600">Choose the support option that best fits your needs and journey</p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto overflow-visible mb-12">
            <ParallaxSection direction="up" speed={0.3} scale={true} delay={0.1}>
              <div className="bg-gradient-to-b from-white to-violet-50 rounded-3xl p-8 shadow-lg border border-violet-100 flex flex-col h-full relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-100 rounded-full opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-100 rounded-full opacity-20"></div>

                {/* Badge */}
                <div className="absolute -top-1 -left-1">
                  <div className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-br-lg rounded-tl-lg shadow-sm">
                    FREE
                  </div>
                </div>

                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-2xl font-medium text-slate-800 mb-2">Initial Consultation</h3>
                  <p className="text-green-600 font-medium text-xl">$0</p>
                  <p className="text-slate-500 text-sm">30-minute session</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">30-minute discovery call</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">Discuss your needs and goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">Learn about our approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">No obligation to continue</span>
                  </li>
                </ul>

                <Button
                  onClick={scrollToBooking}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl w-full py-3 h-auto font-medium shadow-md hover:shadow-lg transition-all border border-green-500"
                >
                  Book Free Session
                </Button>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.3} scale={true} delay={0.2}>
              <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 shadow-xl flex flex-col h-full relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 scale-105">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full opacity-10"></div>

                {/* Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-yellow-400 text-violet-900 text-xs font-bold px-4 py-1 rounded-bl-lg shadow-sm">
                    MOST POPULAR
                  </div>
                </div>

                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-2xl font-medium text-white mb-2">Transformation</h3>
                  <p className="text-white font-medium text-2xl">$499</p>
                  <p className="text-white/80 text-sm">per month</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-white">4 weekly 60-minute sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-white">Comprehensive assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-white">Priority email & text support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-white">Personalized practice materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-white">Access to group workshops</span>
                  </li>
                </ul>

                <Button
                  onClick={scrollToBooking}
                  className="bg-white text-violet-700 hover:bg-white/90 rounded-xl w-full py-3 h-auto font-medium shadow-md hover:shadow-lg transition-all border border-white/30"
                >
                  Start Your Journey
                </Button>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.3} scale={true} delay={0.3}>
              <div className="bg-gradient-to-b from-white to-violet-50 rounded-3xl p-8 shadow-lg border border-violet-100 flex flex-col h-full relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-100 rounded-full opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-100 rounded-full opacity-20"></div>

                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-2xl font-medium text-slate-800 mb-2">Premium</h3>
                  <p className="text-violet-600 font-medium text-2xl">$899</p>
                  <p className="text-slate-500 text-sm">per month</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-violet-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">4 weekly 90-minute sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-violet-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">Deep comprehensive assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-violet-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">24/7 VIP support access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-violet-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">Custom wellness program</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-violet-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">Exclusive resources library</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-violet-600 text-xs">✓</span>
                    </span>
                    <span className="text-slate-700">Quarterly progress review</span>
                  </li>
                </ul>

                <Button
                  onClick={scrollToBooking}
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl w-full py-3 h-auto font-medium shadow-md hover:shadow-lg transition-all border border-violet-500"
                >
                  Contact for Details
                </Button>
              </div>
            </ParallaxSection>
          </div>

          {/* Reminder Booking Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={scrollToBooking}
              className="bg-gradient-to-r from-violet-600 to-rose-500 hover:opacity-90 text-white rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all border border-violet-500/30 font-medium flex items-center gap-2 mx-auto"
            >
              <Calendar className="h-5 w-5" />
              Book Your Session Now
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-gradient-to-r from-violet-600/90 to-rose-500/90 backdrop-blur-sm"
        className="py-20"
        speed={0.4}
        minHeight="400px"
      >
        <div className="container px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Begin Your Transformation Today</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step toward emotional well-being and personal growth with a complimentary consultation.
          </p>
          <Button
            onClick={scrollToBooking}
            className="bg-white text-violet-700 hover:bg-white/90 rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all border border-white/30 font-medium flex items-center gap-2 mx-auto"
          >
            <ArrowRight className="h-5 w-5" />
            Get Started Now
          </Button>
        </div>
      </ParallaxBackground>
    </>
  )
}
