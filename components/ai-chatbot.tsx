"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minimize2, Maximize2, Film, ArrowRight, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const QUICK_PROMPTS = [
  { icon: "😌", text: "I'm feeling stressed", category: "mood" },
  { icon: "😴", text: "Help me sleep", category: "mood" },
  { icon: "🚀", text: "Inspire me", category: "mood" },
  { icon: "💔", text: "Emotional healing", category: "mood" },
  { icon: "🎨", text: "Boost creativity", category: "mood" },
  { icon: "❤️", text: "About love", category: "mood" },
  { icon: "🌅", text: "Spiritual journey", category: "mood" },
  { icon: "🧠", text: "Self-discovery", category: "mood" },
]

const MOVIE_DATABASE = {
  spiritual_awakening: [
    {
      title: "The Shawshank Redemption",
      genre: "Drama",
      year: "1994",
      theme: "Redemption & Hope",
      mood: "Inspirational",
      description:
        "A story of hope and transformation. Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      why: "This film shows the power of hope and transformation, perfect for spiritual awakening.",
    },
    {
      title: "Arrival",
      genre: "Sci-Fi",
      year: "2016",
      theme: "Communication & Understanding",
      mood: "Thought-Provoking",
      description:
        "A linguist works with the military to communicate with alien lifeforms. A profound journey about time, language, and interconnectedness.",
      why: "Explores profound themes of connection and perspective shift.",
    },
    {
      title: "The Secret of Kells",
      genre: "Animation",
      year: "2009",
      theme: "Inner Journey & Discovery",
      mood: "Magical",
      description:
        "An animated tale about courage and self-discovery. A young boy ventures into a mystical forest to save his village.",
      why: "A beautiful visual journey of inner strength and self-discovery.",
    },
  ],
  emotional_healing: [
    {
      title: "Life is Beautiful",
      genre: "Drama",
      year: "1997",
      theme: "Love & Resilience",
      mood: "Uplifting",
      description:
        "A father uses imagination and love to shield his son from the horrors of reality. A testament to the power of the human spirit.",
      why: "Shows how love can heal even in the darkest times.",
    },
    {
      title: "About Time",
      genre: "Romance/Drama",
      year: "2013",
      theme: "Family & Connection",
      mood: "Heartwarming",
      description:
        "A man discovers he can travel through time and chooses to use it to improve his relationships with family and loved ones.",
      why: "A beautiful meditation on family bonds and what truly matters.",
    },
    {
      title: "The Pursuit of Happyness",
      genre: "Drama",
      year: "2006",
      theme: "Perseverance",
      mood: "Inspiring",
      description:
        "A homeless salesman works toward a better life for himself and his son. A powerful story of determination and hope.",
      why: "Teaches resilience and unwavering belief in better days.",
    },
  ],
  personal_growth: [
    {
      title: "The Matrix",
      genre: "Sci-Fi/Action",
      year: "1999",
      theme: "Reality & Awakening",
      mood: "Mind-Bending",
      description: "A hacker discovers the true nature of reality. A journey of awakening and choosing one's own path.",
      why: "A metaphor for awakening to your true potential and reality.",
    },
    {
      title: "Into the Wild",
      genre: "Drama",
      year: "2007",
      theme: "Self-Discovery & Freedom",
      mood: "Introspective",
      description:
        "A young man abandons his possessions to live in the wilderness. A profound exploration of purpose and connection with nature.",
      why: "Inspiring journey of finding yourself and your true purpose.",
    },
    {
      title: "Moonlight",
      genre: "Drama",
      year: "2016",
      theme: "Identity & Self-Acceptance",
      mood: "Poignant",
      description:
        "Three chapters of a man's life as he grapples with identity and masculinity. An intimate and transformative journey.",
      why: "Beautiful exploration of identity and self-acceptance.",
    },
  ],
  peace_tranquility: [
    {
      title: "My Neighbor Totoro",
      genre: "Animation",
      year: "1988",
      theme: "Wonder & Innocence",
      mood: "Peaceful",
      description:
        "Two sisters encounter friendly forest spirits. A gentle, magical journey filled with wonder and imagination.",
      why: "Pure magic and serenity. Perfect for calming your mind.",
    },
    {
      title: "Amélie",
      genre: "Fantasy/Comedy",
      year: "2001",
      theme: "Joy & Connection",
      mood: "Whimsical",
      description:
        "A shy waitress decides to change the lives of those around her for the better. A charming celebration of human connection.",
      why: "A delightful journey of spreading joy and magic.",
    },
    {
      title: "Spirited Away",
      genre: "Animation",
      year: "2001",
      theme: "Identity & Courage",
      mood: "Enchanting",
      description:
        "A girl navigates a magical bathhouse to rescue her parents. A visually stunning journey of self-discovery.",
      why: "Stunning visuals and profound themes of growth and courage.",
    },
  ],
  creativity_inspiration: [
    {
      title: "La La Land",
      genre: "Musical/Drama",
      year: "2016",
      theme: "Dreams & Passion",
      mood: "Inspirational",
      description:
        "Two artists pursue their dreams in Los Angeles. A vibrant exploration of passion, ambition, and love.",
      why: "Celebrate your artistic dreams and creative passion.",
    },
    {
      title: "Inception",
      genre: "Sci-Fi",
      year: "2010",
      theme: "Imagination & Reality",
      mood: "Thrilling",
      description:
        "A thief specializing in extraction enters the dreams of others. A mind-bending exploration of creativity and consciousness.",
      why: "Explores the power of imagination and creative thinking.",
    },
    {
      title: "The Grand Budapest Hotel",
      genre: "Comedy/Drama",
      year: "2014",
      theme: "Art & Beauty",
      mood: "Quirky",
      description:
        "The adventures of a legendary concierge and his protégé. A whimsical masterpiece about craftsmanship and friendship.",
      why: "A visual feast celebrating artistry and creativity.",
    },
  ],
  connection_love: [
    {
      title: "Eternal Sunshine of the Spotless Mind",
      genre: "Sci-Fi/Romance",
      year: "2004",
      theme: "Love & Memory",
      mood: "Bittersweet",
      description:
        "A man undergoes a procedure to erase memories of his ex-lover. A profound meditation on love, loss, and connection.",
      why: "A deep exploration of what love truly means.",
    },
    {
      title: "Pride and Prejudice",
      genre: "Romance/Drama",
      year: "2005",
      theme: "Love & Understanding",
      mood: "Romantic",
      description:
        "Elizabeth Bennet navigates society and romance. A timeless story about seeing beyond first impressions.",
      why: "Celebrate the power of true understanding in love.",
    },
    {
      title: "The Farewell",
      genre: "Drama/Comedy",
      year: "2019",
      theme: "Family & Cultural Identity",
      mood: "Touching",
      description:
        "A family keeps a diagnosis secret from their grandmother. A beautiful story about love, family, and cultural differences.",
      why: "A touching celebration of family bonds and love.",
    },
  ],
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "✨ Welcome to your Soul Movies companion! I'm here to have a meaningful conversation and recommend films that truly resonate with your spirit. Tell me how you're feeling or what's on your mind today.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPrompts, setShowPrompts] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateConversationalResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Emotional responses
    if (lowerMessage.includes("stressed") || lowerMessage.includes("anxious") || lowerMessage.includes("overwhelmed")) {
      return "I hear you. Stress can be heavy. 💙 Would you like a film that brings peace and calm? I have some beautiful recommendations that help soothe the soul. Or would you like to talk more about what's causing the stress?"
    }

    if (lowerMessage.includes("sad") || lowerMessage.includes("down") || lowerMessage.includes("depressed")) {
      return "I'm sorry you're feeling this way. 💝 Sometimes a good film can remind us of hope and resilience. Would you like me to recommend some uplifting stories about emotional healing and human connection? Or share what's weighing on your heart?"
    }

    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("rest")) {
      return "Rest is so important for your soul. 🌙 I have some beautifully crafted films with calming atmospheres and peaceful themes that are perfect for winding down. Would you like me to suggest something soothing?"
    }

    if (
      lowerMessage.includes("inspire") ||
      lowerMessage.includes("motivation") ||
      lowerMessage.includes("unmotivated")
    ) {
      return "Let's ignite that spark! 🔥 I have films filled with stories of dreams, perseverance, and triumph. What kind of inspiration are you seeking? Creative passion? Personal achievement? Overcoming challenges?"
    }

    if (lowerMessage.includes("love") || lowerMessage.includes("relationship") || lowerMessage.includes("loneliness")) {
      return "Love and connection are beautiful journeys. ❤️ I have wonderful films exploring relationships, family bonds, and human connection. Are you looking for romantic stories, or something deeper about connection and belonging?"
    }

    if (lowerMessage.includes("spiritual") || lowerMessage.includes("meaning") || lowerMessage.includes("purpose")) {
      return "A spiritual journey is profound. 🌟 I have transformative films that explore awakening, purpose, and deeper meaning. What aspect speaks to you most right now?"
    }

    if (lowerMessage.includes("creative") || lowerMessage.includes("artist") || lowerMessage.includes("inspiration")) {
      return "Your creativity is waiting to bloom! 🎨 I have films that celebrate artistic passion, imagination, and creative flow. What type of creativity calls to you?"
    }

    if (lowerMessage.includes("discover") || lowerMessage.includes("journey") || lowerMessage.includes("growth")) {
      return "Self-discovery is a beautiful adventure. 🚀 I have films about finding yourself and your true path. Are you exploring your identity, your purpose, or your potential?"
    }

    if (lowerMessage.includes("healing") || lowerMessage.includes("recover")) {
      return "Healing takes time and compassion. 💚 I have deeply moving films about resilience, transformation, and human strength. Would you like stories that inspire hope?"
    }

    if (lowerMessage.includes("recommend")) {
      return "I'd love to! 🎬 To give you the perfect recommendation, tell me: What are you feeling right now? Are you seeking peace, inspiration, healing, love, creativity, or something else? The more you share, the better I can guide you."
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("what can")) {
      return "I'm here to be your companion in finding films that feed your soul. 🌿 You can:\n\n✨ Share how you're feeling\n🎯 Tell me what you're seeking\n💭 Describe your mood or emotional state\n🎬 Ask about specific genres or themes\n❓ Explore different soul categories\n\nWhat would help you most right now?"
    }

    // Default conversational response
    return "Thank you for sharing. 💫 That sounds meaningful. To help me recommend the perfect film for you, could you tell me more? What emotions are you hoping to explore? What would make your soul feel nourished right now?"
  }

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setShowPrompts(false)
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateConversationalResponse(messageText),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 900)
  }

  const handlePromptClick = (promptText: string) => {
    handleSend(promptText)
  }

  return (
    <>
      {/* Floating Button - LEFT SIDE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 left-4 z-40 w-14 h-14 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border border-purple-400/30 backdrop-blur-sm"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
              <Film size={24} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-1 rounded-full border border-purple-300/30"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className={`fixed z-50 bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200/50 flex flex-col transition-all duration-300 ${
              isMinimized ? "bottom-4 left-4 w-80 h-20" : "bottom-4 left-4 w-80 h-[600px] sm:w-96 sm:h-[650px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white p-4 rounded-t-3xl flex items-center justify-between flex-shrink-0 border-b border-purple-500/30">
              <div className="flex items-center gap-3 flex-1">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm flex-shrink-0"
                >
                  <Sparkles size={20} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Soul Movies</h3>
                  <p className="text-xs text-white/80">Your cinema companion</p>
                </div>
              </div>
              <div className="flex gap-1">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-br-none shadow-md"
                            : "bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-white text-slate-900 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm">
                        <div className="flex gap-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                              transition={{
                                duration: 0.8,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.15,
                              }}
                              className="w-2.5 h-2.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {messages.length === 1 && showPrompts && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-2"
                    >
                      <p className="text-xs font-semibold text-slate-600 px-2 uppercase tracking-wide">
                        How are you feeling?
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {QUICK_PROMPTS.map((prompt, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handlePromptClick(prompt.text)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-2.5 bg-gradient-to-br from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 text-slate-700 rounded-xl text-xs font-medium transition-all duration-200 border border-violet-200/70 hover:border-violet-300 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 group"
                          >
                            <span className="text-base">{prompt.icon}</span>
                            <span className="group-hover:text-violet-700 transition-colors">{prompt.text}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-200/50 p-4 bg-white rounded-b-3xl flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Share your feelings..."
                      className="flex-1 px-4 py-2.5 bg-slate-100 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all placeholder-slate-400"
                    />
                    <motion.button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500/30"
                    >
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
