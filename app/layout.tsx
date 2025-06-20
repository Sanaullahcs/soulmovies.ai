import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { cn } from "@/lib/utils"
// Import the CursorEffect component
import CursorEffect from "@/components/cursor-effect"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "SoulMovies.ai - Reconnect with Your True Self",
  description:
    "A sanctuary for the soul, offering personalized emotional support, mindfulness guidance, and heart-centered healing.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* Preload critical images */}
        <link rel="preload" href="/hero-bg.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/services-hero-bg.jpg" as="image" type="image/jpeg" />

        {/* Preload audio */}
        <link rel="preload" href="/audio/pure-theta-4-7hz-with-emotional.mp3" as="audio" type="audio/mpeg" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased no-horizontal-scroll", poppins.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="relative flex min-h-screen flex-col">
            <CursorEffect />
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
