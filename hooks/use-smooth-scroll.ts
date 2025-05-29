"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    let rafId: number
    let currentScroll = window.scrollY
    let targetScroll = window.scrollY
    const ease = 0.1

    const smoothScroll = () => {
      currentScroll += (targetScroll - currentScroll) * ease

      if (Math.abs(targetScroll - currentScroll) < 0.1) {
        currentScroll = targetScroll
      }

      window.scrollTo(0, currentScroll)

      if (currentScroll !== targetScroll) {
        rafId = requestAnimationFrame(smoothScroll)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetScroll += e.deltaY * 0.8
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight))

      if (!rafId) {
        rafId = requestAnimationFrame(smoothScroll)
      }
    }

    const handleKeydown = (e: KeyboardEvent) => {
      const scrollAmount = 100

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault()
          targetScroll = Math.min(targetScroll + scrollAmount, document.body.scrollHeight - window.innerHeight)
          break
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          targetScroll = Math.max(targetScroll - scrollAmount, 0)
          break
        case "Home":
          e.preventDefault()
          targetScroll = 0
          break
        case "End":
          e.preventDefault()
          targetScroll = document.body.scrollHeight - window.innerHeight
          break
      }

      if (!rafId) {
        rafId = requestAnimationFrame(smoothScroll)
      }
    }

    // Only enable on desktop
    if (window.innerWidth > 768) {
      window.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("keydown", handleKeydown)
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [])
}
