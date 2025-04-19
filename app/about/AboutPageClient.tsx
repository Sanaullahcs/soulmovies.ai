"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import ParallaxBackground from "@/components/parallax-background"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920&auto=format&fit=crop"
            alt="About Us Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-700/30" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Founded with a vision to create a sanctuary where individuals can reconnect with their true selves
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">
            <ParallaxSection direction="left" speed={0.15}>
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </ParallaxSection>

            <ParallaxSection direction="right" speed={0.15}>
              <div className="space-y-5">
                <h2 className="text-3xl font-medium text-slate-800">Our Mission</h2>
                <p className="text-slate-600">
                  At SoulMovies.ai, our mission is to provide a sanctuary for individuals seeking emotional balance and
                  personal growth. We believe that everyone deserves access to tools and guidance that support their
                  journey toward wholeness.
                </p>
                <p className="text-slate-600">
                  Through our personalized approach, we aim to help you reconnect with your authentic self, navigate
                  life's challenges with resilience, and cultivate a deeper sense of purpose and fulfillment.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-visible">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-200/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-pink-200/20 blur-3xl"></div>

        <div className="container px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <span className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-medium text-slate-800 mb-6">Our Core Values</h2>
              <p className="text-slate-600 text-lg">
                These principles guide everything we do at SoulMovies.ai, shaping our approach to emotional wellness and
                personal growth.
              </p>
            </ParallaxSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full flex flex-col border border-violet-100/30 relative overflow-visible">
                {/* Decorative element */}
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-violet-100/30 blur-3xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-6 shadow-md">
                    <span className="text-2xl font-medium">1</span>
                  </div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-4">Authenticity</h3>
                  <p className="text-slate-600 flex-grow">
                    We believe in creating a space where you can be your true self, without judgment or expectation. Our
                    approach honors your unique journey and experiences.
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-violet-600">Core Principle</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full flex flex-col border border-violet-100/30 relative overflow-visible">
                {/* Decorative element */}
                <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-pink-100/30 blur-3xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white mb-6 shadow-md">
                    <span className="text-2xl font-medium">2</span>
                  </div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-4">Compassion</h3>
                  <p className="text-slate-600 flex-grow">
                    We approach every interaction with deep empathy and understanding, recognizing that each person's
                    journey is unique and deserving of care and respect.
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-pink-600">Core Principle</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.3}>
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full flex flex-col border border-violet-100/30 relative overflow-visible">
                {/* Decorative element */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-violet-100/30 blur-3xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white mb-6 shadow-md">
                    <span className="text-2xl font-medium">3</span>
                  </div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-4">Growth</h3>
                  <p className="text-slate-600 flex-grow">
                    We are committed to supporting your continuous evolution and transformation, providing tools and
                    guidance to help you reach your full potential.
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-blue-600">Core Principle</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>

          <div className="flex justify-center">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all border border-violet-500 font-medium">
              Learn More About Our Values
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Meet Our Team</h2>
              <p className="text-slate-600">The passionate individuals behind SoulMovies.ai</p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-visible shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="relative h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
                    alt="Sarah Lee"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8 relative">
                  {/* Decorative element */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-violet-100/30 blur-3xl"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-medium text-slate-800 mb-1">Sarah Lee</h3>
                    <p className="text-violet-600 mb-4">Founder & Emotional Wellness Guide</p>
                    <p className="text-sm text-slate-600">
                      With over 15 years of experience in emotional wellness and personal development, Sarah founded
                      SoulMovies.ai to create a sanctuary for those seeking deeper connection and growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-visible shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="relative h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                    alt="James Carter"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8 relative">
                  {/* Decorative element */}
                  <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-pink-100/30 blur-3xl"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-medium text-slate-800 mb-1">James Carter</h3>
                    <p className="text-violet-600 mb-4">Co-Founder & Mindfulness Expert</p>
                    <p className="text-sm text-slate-600">
                      James brings his extensive background in mindfulness and meditation practices to SoulMovies.ai,
                      having studied with master practitioners in Nepal and developed innovative approaches to mind-body
                      connection.
                    </p>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.3}>
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-visible shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="relative h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                    alt="Maya Johnson"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8 relative">
                  {/* Decorative element */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-violet-100/30 blur-3xl"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-medium text-slate-800 mb-1">Maya Johnson</h3>
                    <p className="text-violet-600 mb-4">Emotional Intelligence Coach</p>
                    <p className="text-sm text-slate-600">
                      Maya specializes in helping clients develop emotional intelligence and build healthier
                      relationships. Her compassionate approach creates a safe space for exploration and growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Our Approach</h2>
              <p className="text-slate-600">
                How we combine ancient wisdom with modern techniques to create a holistic experience
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ParallaxSection direction="left" speed={0.15}>
              <div className="space-y-5">
                <h3 className="text-2xl font-medium text-slate-800">Heart-Centered Methodology</h3>
                <p className="text-slate-600">
                  Our approach begins with the understanding that true healing comes from reconnecting with your heart's
                  wisdom. We integrate practices that help you tune into your body's innate intelligence and emotional
                  signals.
                </p>
                <p className="text-slate-600">
                  Through a combination of mindfulness, somatic awareness, and emotional processing techniques, we help
                  you develop a deeper relationship with yourself and access your inner guidance system.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Heart-brain coherence practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Embodied mindfulness techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Emotional intelligence development</span>
                  </li>
                </ul>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="right" speed={0.15}>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop"
                  alt="Heart-Centered Methodology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent"></div>
              </div>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-16">
            <ParallaxSection direction="right" speed={0.15} className="md:order-2">
              <div className="space-y-5">
                <h3 className="text-2xl font-medium text-slate-800">Personalized Growth Path</h3>
                <p className="text-slate-600">
                  We recognize that each person's journey is unique, which is why we create customized plans that honor
                  your specific needs, challenges, and goals. There is no one-size-fits-all approach to emotional
                  wellness.
                </p>
                <p className="text-slate-600">
                  Through careful assessment and ongoing dialogue, we adapt our methods to support your evolution at
                  every stage of your journey, providing the right balance of challenge and support.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Comprehensive initial assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Adaptive growth strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">•</span>
                    <span className="text-slate-600">Regular progress evaluation</span>
                  </li>
                </ul>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="left" speed={0.15} className="md:order-1">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                  alt="Personalized Growth Path"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent"></div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-gradient-to-r from-violet-600/90 to-rose-500/90 backdrop-blur-sm"
        className="py-16 md:py-20"
      >
        <div className="container px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step toward reconnecting with your true self and discovering a life of emotional balance and
            fulfillment.
          </p>
          <Link href="/booking">
            <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all border border-white/30 font-medium">
              Book a Session
            </Button>
          </Link>
        </div>
      </ParallaxBackground>
    </>
  )
}
