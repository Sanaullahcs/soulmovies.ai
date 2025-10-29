import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AIChatbot from "@/components/ai-chatbot"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SoulMovies - Unlock Your Inner Peace",
  description: "Transform your mind and life through guided meditations, hypnosis, and mindfulness exercises.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-white antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  )
}
