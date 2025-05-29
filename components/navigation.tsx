"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Set initial scroll state
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleBookNow = () => {
    window.location.href = "/booking"
  }

  // Update the navItems array to have simpler names
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Stories", path: "/stories" },
    { name: "PlayGround", path: "/mind-exercises" },
    { name: "Contact", path: "/contact" },
  ]

  // Add or update this function to check for active links more precisely
  const isActivePath = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/"
    }
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
  }

  // Determine if we're on an inner page (not the homepage)
  const isInnerPage = pathname !== "/"

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700 ease-out",
        isScrolled || isInnerPage
          ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-violet-100/50"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center group relative z-10">
          <div className="relative h-14 w-14 md:h-18 md:w-18 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Image
              src="/logo-new.png"
              alt="SoulMovies.ai Logo"
              width={72}
              height={72}
              className="object-contain relative z-10 drop-shadow-lg"
              priority
            />
          </div>
          <div className="ml-3 flex flex-col">
            <span
              className={cn(
                "text-xl font-bold transition-all duration-500 tracking-tight",
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
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = isActivePath(item.path)

            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "text-sm font-semibold transition-all duration-300 relative py-3 px-4 rounded-xl group",
                  isActive
                    ? isScrolled || isInnerPage
                      ? "text-violet-700 bg-gradient-to-r from-violet-50 to-pink-50 shadow-soft"
                      : "text-white bg-white/15 backdrop-blur-sm shadow-glow"
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
            )
          })}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Button
            onClick={handleBookNow}
            className={cn(
              "hidden md:inline-flex h-auto rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-base font-semibold border-0 relative overflow-hidden group",
              isScrolled || isInnerPage
                ? "bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white"
                : "bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 to-pink-400/0 group-hover:from-violet-400/20 group-hover:to-pink-400/20 transition-all duration-300"></div>
            <span className="relative z-10">Book Now</span>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group",
              isScrolled || isInnerPage
                ? "text-slate-800 hover:bg-violet-50 hover:text-violet-700"
                : "text-white hover:bg-white/10 backdrop-blur-sm",
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-white/98 backdrop-blur-xl shadow-2xl z-50 overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="w-full max-w-md mx-auto px-6">
              {navItems.map((item, index) => {
                const isActive = isActivePath(item.path)

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center justify-between text-2xl font-bold transition-all duration-300 py-6 px-8 mx-0 rounded-3xl mb-4",
                        isActive
                          ? "text-violet-700 bg-gradient-to-r from-violet-50 to-pink-50 shadow-soft"
                          : "text-slate-700 hover:text-violet-700 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-pink-50/50",
                      )}
                      onClick={() => {
                        setIsMenuOpen(false)
                        window.scrollTo(0, 0)
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive ? (
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 shadow-glow"></div>
                      ) : (
                        <ChevronRight size={20} className="text-slate-400" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="px-0 py-8 border-t border-violet-100/50 mt-8">
                <Button
                  onClick={() => {
                    handleBookNow()
                    setIsMenuOpen(false)
                  }}
                  className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 rounded-3xl w-full h-auto py-6 px-8 shadow-lg text-white text-xl font-bold transition-all duration-300 border-0 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 to-pink-400/0 group-hover:from-violet-400/20 group-hover:to-pink-400/20 transition-all duration-300"></div>
                  <span className="relative z-10">Book Now</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Navigation
