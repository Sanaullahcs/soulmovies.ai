"use client"

import { useEffect, useRef } from "react"

const AnimatedGradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize canvas
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 300, color: "rgba(124, 58, 237, 0.15)" }, // violet
      { x: canvas.width * 0.8, y: canvas.height * 0.8, radius: 250, color: "rgba(219, 39, 119, 0.15)" }, // pink
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 350, color: "rgba(139, 92, 246, 0.1)" }, // purple
    ]

    // Animation variables
    let time = 0
    const speed = 0.001

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update gradient points
      gradientPoints.forEach((point, index) => {
        point.x = canvas.width * (0.3 + 0.4 * Math.sin(time + index * 2))
        point.y = canvas.height * (0.3 + 0.4 * Math.cos(time + index * 3))
      })

      // Draw gradients
      gradientPoints.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update time
      time += speed

      // Continue animation
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}

export default AnimatedGradientBackground
