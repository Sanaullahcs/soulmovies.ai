"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import {
  Brain,
  Heart,
  Sparkles,
  Clock,
  Smile,
  Zap,
  Flame,
  Music,
  Puzzle,
  Lightbulb,
  Feather,
  Compass,
  Leaf,
  Sun,
  Moon,
  Star,
  Palette,
  Shapes,
  Waves,
  Flower,
} from "lucide-react"

// Define the exercise type
interface MindExercise {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: "meditation" | "cognitive" | "emotional" | "creative" | "mindfulness" | "hypnosis"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  imageSrc: string
}

export default function MindExercisesClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Exercises" },
    { id: "meditation", name: "Meditation" },
    { id: "hypnosis", name: "Hypnosis" },
    { id: "emotional", name: "Emotional" },
    { id: "cognitive", name: "Cognitive" },
    { id: "creative", name: "Creative" },
    { id: "mindfulness", name: "Mindfulness" },
  ]

  // Mind exercises data
  const exercises: MindExercise[] = [
    {
      id: "deep-breathing",
      title: "Deep Breathing",
      description: "A simple yet powerful breathing technique to quickly reduce stress and increase oxygen flow.",
      icon: <Waves size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "3 min",
      imageSrc: "https://images.unsplash.com/photo-1474418397713-2f1091953b6a?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "breathing-rhythm",
      title: "Breathing Rhythm",
      description: "A guided breathing exercise to help you find your natural rhythm and reduce stress.",
      icon: <Waves size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "5 min",
      imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "hypnotic-relaxation",
      title: "Hypnotic Relaxation",
      description: "A guided hypnotic journey to help you reach a deeply relaxed and receptive state of mind.",
      icon: <Moon size={24} />,
      category: "hypnosis",
      difficulty: "intermediate",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "self-love-meditation",
      title: "Self-Love Meditation",
      description: "A gentle practice to cultivate compassion and love toward yourself.",
      icon: <Heart size={24} />,
      category: "emotional",
      difficulty: "beginner",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "mindful-body-scan",
      title: "Mindful Body Scan",
      description: "A progressive relaxation technique that helps you become aware of sensations throughout your body.",
      icon: <Feather size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "self-hypnosis",
      title: "Self-Hypnosis",
      description:
        "Learn to guide yourself into a hypnotic state to access your subconscious mind and create positive change.",
      icon: <Moon size={24} />,
      category: "hypnosis",
      difficulty: "intermediate",
      duration: "12 min",
      imageSrc: "https://images.unsplash.com/photo-1515894274780-af5d4d90b30f?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "loving-kindness",
      title: "Loving Kindness",
      description:
        "Cultivate compassion and positive feelings toward yourself and others through this heart-centered meditation.",
      icon: <Flower size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "gratitude-journal",
      title: "Gratitude Journal",
      description: "Practice expressing gratitude by recording things you're thankful for to boost positive emotions.",
      icon: <Heart size={24} />,
      category: "emotional",
      difficulty: "beginner",
      duration: "5 min",
      imageSrc: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "memory-match",
      title: "Memory Match",
      description: "A card-matching game that improves memory, concentration, and cognitive function.",
      icon: <Puzzle size={24} />,
      category: "cognitive",
      difficulty: "intermediate",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "creative-visualization",
      title: "Creative Visualization",
      description: "Use your imagination to visualize positive outcomes and manifest your goals.",
      icon: <Lightbulb size={24} />,
      category: "creative",
      difficulty: "intermediate",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "emotion-wheel",
      title: "Emotion Wheel",
      description: "Identify and understand complex emotions using an interactive emotion wheel.",
      icon: <Smile size={24} />,
      category: "emotional",
      difficulty: "intermediate",
      duration: "7 min",
      imageSrc: "https://images.unsplash.com/photo-1517091879745-a3ebf08d8ca7?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "focus-flow",
      title: "Focus Flow",
      description: "Train your attention and concentration with this progressive focus exercise.",
      icon: <Zap size={24} />,
      category: "cognitive",
      difficulty: "intermediate",
      duration: "12 min",
      imageSrc: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "sound-meditation",
      title: "Sound Meditation",
      description: "Use binaural beats and ambient sounds to achieve deep meditative states.",
      icon: <Music size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "20 min",
      imageSrc: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "mindful-eating",
      title: "Mindful Eating",
      description: "Transform your relationship with food by practicing present-moment awareness while eating.",
      icon: <Flame size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "brain-teasers",
      title: "Brain Teasers",
      description: "Challenge your problem-solving skills with a series of engaging brain teasers.",
      icon: <Brain size={24} />,
      category: "cognitive",
      difficulty: "advanced",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1569510968950-87d17be37521?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "creative-expression",
      title: "Creative Expression",
      description: "Express your emotions through guided creative activities like drawing or writing.",
      icon: <Palette size={24} />,
      category: "creative",
      difficulty: "beginner",
      duration: "25 min",
      imageSrc: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "mindful-walking",
      title: "Mindful Walking",
      description: "Transform an ordinary walk into a meditative practice with guided awareness.",
      icon: <Compass size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "pattern-recognition",
      title: "Pattern Recognition",
      description: "Improve cognitive flexibility with pattern recognition challenges.",
      icon: <Shapes size={24} />,
      category: "cognitive",
      difficulty: "advanced",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "emotional-awareness",
      title: "Emotional Awareness",
      description: "Learn to identify and understand your emotional responses in different situations.",
      icon: <Sparkles size={24} />,
      category: "emotional",
      difficulty: "intermediate",
      duration: "12 min",
      imageSrc: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "dream-journaling",
      title: "Dream Journaling",
      description: "Record and analyze your dreams to gain insights into your subconscious mind.",
      icon: <Moon size={24} />,
      category: "creative",
      difficulty: "intermediate",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "present-moment",
      title: "Present Moment",
      description: "A guided exercise to bring your awareness fully into the present moment.",
      icon: <Clock size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "8 min",
      imageSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "morning-intention",
      title: "Morning Intention",
      description: "Set positive intentions for your day with this guided morning practice.",
      icon: <Sun size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "5 min",
      imageSrc: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "evening-reflection",
      title: "Evening Reflection",
      description: "Reflect on your day and release any lingering tension before sleep.",
      icon: <Star size={24} />,
      category: "emotional",
      difficulty: "beginner",
      duration: "7 min",
      imageSrc: "https://images.unsplash.com/photo-1472552944129-b035e9ea9851?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "nature-connection",
      title: "Nature Connection",
      description: "Strengthen your connection to the natural world through guided visualization.",
      icon: <Leaf size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=500&auto=format&fit=crop",
    },
  ]

  // Filter exercises based on active category and search query
  const filteredExercises = exercises.filter((exercise) => {
    const matchesCategory = activeCategory === "all" || exercise.category === activeCategory
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-blue-100 text-blue-700"
      case "advanced":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1920&auto=format&fit=crop"
            alt="Mind Exercises Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-700/30" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">Mind Exercises</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Interactive exercises designed to enhance your mental well-being and emotional balance
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search exercises..."
                className="w-full px-5 py-4 pr-12 rounded-full bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-violet-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="container px-6">
          <div className="flex flex-wrap gap-3 justify-center px-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-violet-600 text-white"
                    : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">
                {activeCategory === "all"
                  ? "All Mind Exercises"
                  : `${categories.find((c) => c.id === activeCategory)?.name} Exercises`}
              </h2>
              <p className="text-slate-600">
                Explore our collection of interactive exercises designed to enhance your mental well-being
              </p>
            </ParallaxSection>
          </div>

          {filteredExercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredExercises.map((exercise, index) => (
                <ParallaxSection key={exercise.id} direction="up" speed={0.15} delay={index * 0.05}>
                  <motion.div
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-violet-100/30"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={exercise.imageSrc || "/placeholder.svg"}
                        alt={exercise.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="absolute bottom-4 left-4">
                          <Image
                            src="/peaceful-meditation-pose.png"
                            alt="Exercise icon"
                            width={40}
                            height={40}
                            className="rounded-full bg-white/20 backdrop-blur-sm p-1"
                          />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}
                        >
                          {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                          {exercise.icon}
                        </div>
                        <span className="text-xs font-medium text-violet-600">
                          {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                        </span>
                        <span className="ml-auto flex items-center text-xs text-slate-500">
                          <Clock size={14} className="mr-1" />
                          {exercise.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-medium text-slate-800 mb-2">{exercise.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 flex-grow">{exercise.description}</p>

                      <Link href={`/mind-exercises/${exercise.id}`}>
                        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-2 h-auto">
                          Start Exercise
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </ParallaxSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-violet-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">No exercises found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700"
                onClick={() => {
                  setActiveCategory("all")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Benefits of Mind Exercises</h2>
              <p className="text-slate-600">
                Regular practice of mind exercises can lead to significant improvements in your mental and emotional
                well-being
              </p>
            </ParallaxSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <div className="bg-violet-50 rounded-3xl p-8 border border-violet-100/30 h-full">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-6">
                  <Brain className="text-violet-600" size={24} />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Cognitive Enhancement</h3>
                <p className="text-slate-600">
                  Improve memory, focus, and problem-solving abilities through regular mental stimulation and targeted
                  exercises.
                </p>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <div className="bg-violet-50 rounded-3xl p-8 border border-violet-100/30 h-full">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-6">
                  <Heart className="text-violet-600" size={24} />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Emotional Regulation</h3>
                <p className="text-slate-600">
                  Develop greater awareness of your emotions and learn techniques to manage stress, anxiety, and
                  negative thought patterns.
                </p>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.3}>
              <div className="bg-violet-50 rounded-3xl p-8 border border-violet-100/30 h-full">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-6">
                  <Sparkles className="text-violet-600" size={24} />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Mindful Awareness</h3>
                <p className="text-slate-600">
                  Cultivate present-moment awareness and develop a deeper connection with yourself and the world around
                  you.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-violet-600 to-purple-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Ready to Begin Your Practice?</h2>
            <p className="text-white/90 mb-8 text-lg">
              Start your journey toward improved mental well-being with our guided mind exercises
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-xl px-8 py-3 h-auto shadow-lg hover:shadow-xl transition-all">
                Create Free Account
              </Button>
              <Button className="bg-transparent border border-white text-white hover:bg-white/10 rounded-xl px-8 py-3 h-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">What Our Users Say</h2>
              <p className="text-slate-600">
                Hear from individuals who have experienced transformation through our mind exercises
              </p>
            </ParallaxSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <div className="bg-violet-50 rounded-3xl p-8 border border-violet-100/30">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                      alt="Emma Thompson"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Emma Thompson</h3>
                    <p className="text-violet-600 text-sm">Practicing for 6 months</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "The breathing exercises have been a game-changer for my anxiety. I use them daily, especially during
                  stressful moments at work. I've noticed a significant improvement in my ability to stay calm under
                  pressure."
                </p>
              </div>
            </ParallaxSection>

            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <div className="bg-violet-50 rounded-3xl p-8 border border-violet-100/30">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                      alt="Michael Chen"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Michael Chen</h3>
                    <p className="text-violet-600 text-sm">Practicing for 3 months</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "I was skeptical at first, but after consistently practicing the cognitive exercises, I've noticed
                  improvements in my focus and problem-solving abilities. The interface is intuitive and the guidance is
                  excellent."
                </p>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>
    </>
  )
}
