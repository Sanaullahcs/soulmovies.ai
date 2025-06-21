"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter, Facebook, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    // Add your social media links here
    const socialLinks = {
      instagram: "https://instagram.com/soulmovies.ai",
      twitter: "https://twitter.com/soulmovies_ai",
      facebook: "https://facebook.com/soulmovies.ai",
      email: "mailto:hello@soulmovies.ai",
    }

    if (platform === "email") {
      window.location.href = socialLinks.email
    } else {
      window.open(socialLinks[platform as keyof typeof socialLinks], "_blank")
    }
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/923418349814", "_blank")
  }

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-violet-50/30 to-pink-50/30 pt-16 pb-8 px-4 md:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, violet 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center group">
              <motion.div
                className="relative h-12 w-12 mr-3"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/logo-new.png" alt="SoulMovies.ai Logo" width={48} height={48} className="object-contain" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  SoulMovies.ai
                </h3>
                <p className="text-xs text-slate-500 font-medium">Reconnect with your true self</p>
              </div>
            </Link>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              A sanctuary for the soul, offering personalized emotional support and heart-centered healing through
              custom meditation movies.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, action: () => handleSocialClick("instagram") },
                { icon: Twitter, action: () => handleSocialClick("twitter") },
                { icon: Facebook, action: () => handleSocialClick("facebook") },
                { icon: Mail, action: () => handleSocialClick("email") },
              ].map((social, index) => (
                <motion.button
                  key={index}
                  onClick={social.action}
                  className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-500 hover:text-violet-600 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Client Stories", path: "/stories" },
                { name: "Mind Exercises", path: "/mind-exercises" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-sm text-slate-600 hover:text-violet-600 transition-all duration-300 group flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {[
                "Guided Questionnaire Path",
                "Quantum Healing Hypnosis",
                "Custom SoulMovie Creation",
                "Higher Self Connection",
                "Personal Transformation",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-sm text-slate-600 hover:text-violet-600 transition-all duration-300 group flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Connect</h4>
            <div className="space-y-4">
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-700 mb-1">Email</p>
                <button onClick={() => handleSocialClick("email")} className="hover:text-violet-600 transition-colors">
                  hello@soulmovies.ai
                </button>
              </div>

              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-700 mb-1">Schedule a Session</p>
                <Link
                  href="https://calendly.com/soulmovies-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-600 transition-colors"
                >
                  Book 30-min consultation
                </Link>
              </div>

              <motion.button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center text-sm bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md group"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 group-hover:scale-110 transition-transform"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Chat on WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SoulMovies.ai. All rights reserved.
          </p>
          <div className="flex items-center mt-3 md:mt-0">
            <p className="text-xs text-slate-500 flex items-center">
              Made with <Heart size={12} className="mx-1 text-rose-500" /> for your soul's journey
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
