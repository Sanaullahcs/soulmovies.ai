"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Compass, Users, Sparkles } from "lucide-react"

// First, let's add the necessary imports for animations
import { motion } from "framer-motion"

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

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
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
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 className="text-4xl md:text-5xl font-medium text-white mb-4" variants={fadeIn}>
              About Us
            </motion.h1>
            <motion.p className="text-lg text-white/90 max-w-2xl mb-6" variants={fadeIn}>
              Learn about our story, mission, values, and the team behind SoulMovies.ai.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button className="bg-white text-violet-700 hover:bg-white/90">Learn More</Button>
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
                SoulMovies.ai was founded in 2020 with a vision to create a sanctuary where individuals can reconnect
                with their true selves. Our journey began when our founder, Sarah Lee, experienced the transformative
                power of visualization and mindfulness in her own life.
              </p>
              <p className="text-slate-600 mb-4">
                After years of studying various mindfulness techniques and working with leading practitioners around the
                world, Sarah developed a unique approach that combines ancient wisdom with modern technology to create
                personalized soul movies.
              </p>
              <p className="text-slate-600">
                What started as a small practice has grown into a global community of practitioners and clients who have
                experienced profound transformation through our services. Today, we continue to innovate and expand our
                offerings while staying true to our core mission of fostering emotional well-being and personal growth.
              </p>
            </motion.div>
            <motion.div
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
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
                <Sparkles className="text-violet-600" size={24} />
              </div>
              <h3 className="text-2xl font-medium text-slate-800 mb-4">Our Mission</h3>
              <p className="text-slate-600">
                To provide accessible and personalized emotional support, fostering a world where everyone can reconnect
                with their true self, navigate life's challenges with resilience, and cultivate a deeper sense of
                purpose and fulfillment.
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
                <Users className="text-violet-600" size={24} />
              </div>
              <h3 className="text-2xl font-medium text-slate-800 mb-4">Our Vision</h3>
              <p className="text-slate-600">
                A world where emotional wellness is prioritized and accessible to all, where individuals are empowered
                to transform their inner landscape, and where technology serves as a bridge to deeper human connection
                and self-understanding.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-slate-600">These principles guide everything we do at SoulMovies.ai</p>
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
              <h3 className="text-xl font-medium text-slate-800 mb-2">Compassion</h3>
              <p className="text-slate-600">
                We approach every interaction with empathy and understanding, recognizing that each person's journey is
                unique and deserving of care and respect.
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
              <h3 className="text-xl font-medium text-slate-800 mb-2">Mindfulness</h3>
              <p className="text-slate-600">
                We cultivate present-moment awareness in all that we do, bringing focused attention and intention to our
                work and interactions.
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
              <h3 className="text-xl font-medium text-slate-800 mb-2">Growth</h3>
              <p className="text-slate-600">
                We are committed to continuous learning and personal evolution, supporting our clients and ourselves in
                reaching our full potential.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-violet-50">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Meet Our Team</h2>
            <p className="text-slate-600">
              Our team of experienced practitioners is dedicated to guiding you on your journey.
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
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  alt="Sarah Lee"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-800 mb-1">Sarah Lee</h3>
                <p className="text-violet-600 mb-4">Founder & Emotional Wellness Guide</p>
                <p className="text-sm text-slate-600">
                  With over 15 years of experience in emotional wellness and personal development, Sarah founded
                  SoulMovies.ai to create a sanctuary for those seeking deeper connection and growth.
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
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
                  alt="James Carter"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-800 mb-1">James Carter</h3>
                <p className="text-violet-600 mb-4">Co-Founder & Mindfulness Expert</p>
                <p className="text-sm text-slate-600">
                  James brings his extensive background in mindfulness and meditation practices to SoulMovies.ai, having
                  studied with master practitioners in Nepal and developed innovative approaches to mind-body
                  connection.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Our Approach</h2>
            <p className="text-slate-600">
              How we combine ancient wisdom with modern techniques to create a holistic experience
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
            </motion.div>

            <motion.div
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop"
                alt="Heart-Centered Methodology"
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
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step toward reconnecting with your true self and discovering a life of emotional balance and
            fulfillment.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button className="bg-white text-violet-700 hover:bg-white/90" asChild>
              <Link href="/booking">Book a Session</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
