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
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled || isInnerPage ? "py-2 bg-white/95 backdrop-blur-md shadow-md" : "py-4 bg-transparent",
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center group relative z-10">
          <div className="relative h-10 w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110">
            <Image src="/logo.png" alt="SoulMovies.ai Logo" width={56} height={56} className="object-contain" />
          </div>
          <div className="ml-2.5 flex flex-col">
            <span
              className={cn(
                "text-lg font-medium transition-colors duration-300",
                isScrolled || isInnerPage ? "text-violet-700" : "text-white",
              )}
            >
              SoulMovies.ai
            </span>
            <span
              className={cn(
                "text-xs -mt-1 transition-colors duration-300 hidden sm:block",
                isScrolled || isInnerPage ? "text-slate-500" : "text-white/70",
              )}
            >
              Reconnect with your true self
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = isActivePath(item.path)

            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-all relative py-2 px-3 rounded-md",
                  isActive
                    ? isScrolled || isInnerPage
                      ? "text-violet-600 bg-violet-50"
                      : "text-white bg-white/10"
                    : isScrolled || isInnerPage
                      ? "text-slate-700 hover:text-violet-600 hover:bg-violet-50/50"
                      : "text-white/90 hover:text-white hover:bg-white/10",
                )}
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-current rounded-full -mb-0.5"
                    layoutId="navIndicator"
                    initial={{ x: "-50%" }}
                    animate={{ x: "-50%" }}
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            onClick={handleBookNow}
            className={cn(
              "hidden md:inline-flex h-auto rounded-xl px-6 py-2.5 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-base font-medium border",
              isScrolled || isInnerPage
                ? "bg-violet-600 hover:bg-violet-700 text-white border-violet-500"
                : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30",
            )}
          >
            Book Now
          </Button>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors",
              isScrolled || isInnerPage ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10",
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-[56px] left-0 w-full bg-white shadow-lg flex flex-col z-50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="max-h-[calc(100vh-56px)] overflow-y-auto py-2">
              {navItems.map((item, index) => {
                const isActive = isActivePath(item.path)

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "flex items-center justify-between text-base font-medium transition-colors py-3.5 px-6",
                      isActive
                        ? "text-violet-600 bg-violet-50"
                        : "text-slate-700 hover:text-violet-600 hover:bg-violet-50/50",
                    )}
                    onClick={() => {
                      setIsMenuOpen(false)
                      window.scrollTo(0, 0)
                    }}
                  >
                    <span>{item.name}</span>
                    {isActive ? (
                      <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    ) : (
                      <ChevronRight size={16} className="text-slate-400" />
                    )}
                  </Link>
                )
              })}

              <div className="px-5 py-4 border-t border-slate-100 mt-2">
                <Button
                  onClick={() => {
                    handleBookNow()
                    setIsMenuOpen(false)
                  }}
                  className="bg-violet-600 hover:bg-violet-700 rounded-xl w-full h-auto py-2.5 px-6 shadow-md text-white font-medium transition-all border border-violet-500"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
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
