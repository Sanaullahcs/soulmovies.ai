"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const handleBookNow = () => {
    window.location.href = "/booking"
  }

  const handleScheduleConsultation = () => {
    window.open("https://calendly.com/soulmovies-ai/30min", "_blank")
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Stories", path: "/stories" },
    { name: "PlayGround", path: "/mind-exercises" },
    { name: "Contact", path: "/contact" },
  ]

  const isActivePath = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/"
    }
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
  }

  const isInnerPage = pathname !== "/"

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-700 ease-out border-b border-transparent",
          isScrolled || isInnerPage
            ? "bg-white/90 backdrop-blur-2xl shadow-xl border-violet-100/30"
            : "bg-transparent backdrop-blur-sm",
        )}
        style={{
          boxShadow:
            isScrolled || isInnerPage ? "0 8px 32px rgba(139, 92, 246, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-3 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-10">
            <motion.div
              className="relative h-10 w-10 md:h-12 md:w-12 transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
              style={{ marginTop: "8px" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Image
                src="/logo-new.png"
                alt="SoulMovies.ai Logo"
                width={48}
                height={48}
                className="object-contain relative z-10 drop-shadow-lg"
                priority
              />
            </motion.div>
            <div className="ml-3 flex flex-col">
              <span
                className={cn(
                  "text-lg md:text-xl font-bold transition-all duration-500 tracking-tight",
                  isScrolled || isInnerPage ? "text-slate-800" : "text-white drop-shadow-lg",
                )}
              >
                SoulMovies.ai
              </span>
              <span
                className={cn(
                  "text-xs -mt-0.5 transition-all duration-500 hidden sm:block font-medium tracking-wide",
                  isScrolled || isInnerPage ? "text-violet-600" : "text-white/90 drop-shadow-md",
                )}
              >
                Reconnect with your true self
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = isActivePath(item.path)

              return (
                <motion.div key={item.name} whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.path}
                    className={cn(
                      "text-sm font-semibold transition-all duration-300 relative py-2 px-3 rounded-xl group",
                      isActive
                        ? isScrolled || isInnerPage
                          ? "text-violet-700 bg-gradient-to-r from-violet-50 to-pink-50 shadow-lg"
                          : "text-white bg-white/15 backdrop-blur-sm shadow-lg"
                        : isScrolled || isInnerPage
                          ? "text-slate-700 hover:text-violet-700 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-pink-50/50"
                          : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm",
                    )}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-current rounded-full"
                        layoutId="navIndicator"
                        initial={{ x: "-50%", scale: 0 }}
                        animate={{ x: "-50%", scale: 1 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                      />
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/0 to-pink-400/0 group-hover:from-violet-400/5 group-hover:to-pink-400/5 transition-all duration-300"></div>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleBookNow}
                className={cn(
                  "hidden lg:inline-flex h-auto rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold border-0 relative overflow-hidden group",
                  isScrolled || isInnerPage
                    ? "bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white"
                    : "bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 to-pink-400/0 group-hover:from-violet-400/20 group-hover:to-pink-400/20 transition-all duration-300"></div>
                <span className="relative z-10">Book Now</span>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isScrolled || isInnerPage
                  ? "text-slate-800 hover:bg-violet-50 hover:text-violet-700"
                  : "text-white hover:bg-white/10 backdrop-blur-sm",
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/0 to-pink-400/0 group-hover:from-violet-400/10 group-hover:to-pink-400/10 transition-all duration-300"></div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-gradient-to-br from-slate-900/95 via-violet-900/90 to-slate-900/95 backdrop-blur-3xl shadow-2xl z-50 lg:hidden overflow-hidden border-l border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Parallax Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="relative h-10 w-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="/logo-new.png"
                      alt="SoulMovies.ai Logo"
                      width={40}
                      height={40}
                      className="object-contain drop-shadow-lg"
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-white font-bold text-lg">SoulMovies.ai</h2>
                    <p className="text-white/70 text-xs">Reconnect with yourself</p>
                  </div>
                </div>
                <motion.button
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item, index) => {
                  const isActive = isActivePath(item.path)

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <Link
                        href={item.path}
                        className={cn(
                          "group flex items-center justify-between p-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                          isActive
                            ? "bg-gradient-to-r from-violet-600/80 to-pink-600/80 text-white shadow-lg"
                            : "text-white/90 hover:bg-white/10 hover:text-white",
                        )}
                        onClick={() => {
                          setIsMenuOpen(false)
                          window.scrollTo(0, 0)
                        }}
                      >
                        {/* Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/20 group-hover:to-pink-500/20 transition-all duration-300 rounded-2xl" />

                        <div className="flex items-center space-x-4 relative z-10">
                          <motion.div
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              isActive ? "bg-white shadow-glow" : "bg-white/30 group-hover:bg-white/60",
                            )}
                            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <span className="text-lg font-semibold">{item.name}</span>
                        </div>

                        <motion.div
                          className="relative z-10"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {isActive ? (
                            <Sparkles size={20} className="text-white" />
                          ) : (
                            <ChevronRight size={20} className="text-white/60 group-hover:text-white" />
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-white/10 space-y-3">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Button
                    onClick={() => {
                      handleBookNow()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/10 transition-all duration-300" />
                    <motion.span
                      className="relative z-10 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>Book Session</span>
                      <Sparkles size={16} />
                    </motion.span>
                  </Button>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <Button
                    onClick={() => {
                      handleScheduleConsultation()
                      setIsMenuOpen(false)
                    }}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 font-medium py-4 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300"
                  >
                    Schedule Consultation
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
