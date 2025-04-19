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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical images */}
        <link rel="preload" href="/hero-bg.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/services-hero-bg.jpg" as="image" type="image/jpeg" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden", poppins.variable)}>
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
