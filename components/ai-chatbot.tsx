"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minimize2, Maximize2, MessageCircle, ArrowRight, Heart, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "text" | "buttons"
  buttons?: Array<{ text: string; action: string }>
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi, I'm Lumi. 🌿\n\nWelcome to SoulMovies.\n\nHow are you feeling today?",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showInitialButtons, setShowInitialButtons] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateLumiResponse = (
    userMessage: string,
  ): { text: string; buttons?: Array<{ text: string; action: string }> } => {
    const lowerMessage = userMessage.toLowerCase()

    // Good mood responses
    if (
      lowerMessage.includes("good") ||
      lowerMessage.includes("fine") ||
      lowerMessage.includes("great") ||
      lowerMessage.includes("well")
    ) {
      return {
        text: "That's wonderful to hear! 💙\n\nEveryone's soul is unique and needs to be heard.\n\nWe create Soul Movies from your heart and emotions through a simple, beautiful questionnaire.\n\nShare your truth, and we'll transform it into something sacred.\n\nReady to begin?",
        buttons: [
          { text: "Unlock My Soul Movie", action: "start_questionnaire" },
          { text: "Tell me more first", action: "tell_more" },
        ],
      }
    }

    // Not great responses
    if (
      lowerMessage.includes("not great") ||
      lowerMessage.includes("tired") ||
      lowerMessage.includes("stressed") ||
      lowerMessage.includes("sad") ||
      lowerMessage.includes("down") ||
      lowerMessage.includes("confused") ||
      lowerMessage.includes("overwhelmed")
    ) {
      return {
        text: "I hear you deeply. What you're feeling is real and worthy of care. 💚\n\nThis is your sacred space to be fully seen and understood.\n\nShare your emotions with us, and we'll weave them into a Soul Movie that heals.\n\nWill you let us listen?",
        buttons: [
          { text: "Let Me Share", action: "start_questionnaire" },
          { text: "Talk to me first", action: "tell_more" },
        ],
      }
    }

    // Curious/looking responses
    if (
      lowerMessage.includes("looking") ||
      lowerMessage.includes("curious") ||
      lowerMessage.includes("just browsing") ||
      lowerMessage.includes("exploring")
    ) {
      return {
        text: "Your curiosity is beautiful. This is how sacred journeys begin. ✨\n\nYou simply speak your truth through our gentle questionnaire.\n\nWe listen with intention, feel what you feel, and create something profoundly personal—your Soul Movie.\n\nReady to explore?",
        buttons: [
          { text: "Begin My Soul Movie", action: "start_questionnaire" },
          { text: "How does it work?", action: "show_how_it_works" },
        ],
      }
    }

    // Tell me more
    if (lowerMessage.includes("tell me more") || lowerMessage.includes("more information") || lowerMessage.includes("talk to me")) {
      return {
        text: "Of course. 🌟\n\nImagine expressing everything on your heart—your dreams, your pain, your essence—to someone who truly understands.\n\nThen imagine seeing it transformed into art that mirrors your soul.\n\nThat's what Soul Movies does for you.\n\nWill you share your story?",
        buttons: [
          { text: "Yes, Let's Begin", action: "start_questionnaire" },
          { text: "Show the process", action: "show_how_it_works" },
        ],
      }
    }

    // How it works
    if (lowerMessage.includes("how it works") || lowerMessage.includes("show me") || lowerMessage.includes("process")) {
      return {
        text: "Your sacred journey: 🎬\n\n💬 Speak Your Truth - Share what matters most to your soul\n👂 We Listen & Feel - Your emotions are honored completely\n✨ We Create - Transform your essence into art\n🎨 Your Soul Movie - Something beautiful, made just for you\n\nEvery step honors who you are.\n\nReady to begin?",
        buttons: [
          { text: "Begin My Soul Movie", action: "start_questionnaire" },
          { text: "Learn more", action: "tell_more" },
        ],
      }
    }

    // Start questionnaire - Redirect to paperform
    if (lowerMessage.includes("start") || lowerMessage.includes("questionnaire") || lowerMessage.includes("begin") || lowerMessage.includes("let's begin") || lowerMessage.includes("journey")) {
      return {
        text: "Your transformation starts now. 💫\n\nClick below to share your story. Be authentic, be honest—this is your sacred space.\n\n🌟 Your soul matters. Let's create something extraordinary together.",
        buttons: [
          { text: "Share My Soul Story", action: "open_questionnaire" },
        ],
      }
    }

    // Help/support
    if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("question")) {
      return {
        text: "I'm here for you! 🤝\n\nYou can:\n✨ Share what's on your heart\n🎯 Tell me what you're seeking\n💭 Describe your feelings\n🎬 Ask about Soul Movies\n❓ Explore the process\n\nWhat would help you most right now?",
      }
    }

    // Default response
    return {
      text: "Thank you for sharing that with me. 💫\n\nYour feelings are valid and important. To guide you better, could you tell me more?\n\nWhat are you hoping to explore or experience?",
    }
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
    setShowInitialButtons(false)
    setIsLoading(true)

    setTimeout(() => {
      const response = generateLumiResponse(messageText)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
        type: response.buttons ? "buttons" : "text",
        buttons: response.buttons,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleButtonClick = (action: string) => {
    if (action === "open_questionnaire") {
      window.open("https://3qvjbtv4.paperform.co/", "_blank")
      return
    }

    const buttonTexts: { [key: string]: string } = {
      show_how_it_works: "Show me how it works",
      tell_more: "Tell me more",
      start_questionnaire: "Let's begin my soul movie",
    }
    handleSend(buttonTexts[action] || action)
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
            className="fixed bottom-4 left-4 z-40 w-14 h-14 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border border-purple-400/30 backdrop-blur-sm hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: [0, 15, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
              <Heart size={24} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-1 rounded-full border border-purple-300/50"
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
            className={`fixed z-50 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 flex flex-col transition-all duration-300 ${
              isMinimized
                ? "bottom-4 left-4 w-72 h-20 sm:w-80"
                : "bottom-4 left-4 right-4 w-auto h-[550px] sm:bottom-6 sm:left-6 sm:right-auto sm:w-96 sm:h-[650px] max-h-[90vh]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white p-3 sm:p-4 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between flex-shrink-0 border-b border-purple-500/30">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm flex-shrink-0"
                >
                  <Sparkles size={16} className="sm:w-5 sm:h-5" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base leading-tight truncate">Lumi</h3>
                  <p className="text-xs text-white/80 truncate">Your wellness guide</p>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMinimized ? <Maximize2 size={16} className="sm:w-4 sm:h-4" /> : <Minimize2 size={16} className="sm:w-4 sm:h-4" />}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-br-none shadow-md"
                            : "bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        {message.buttons && message.buttons.length > 0 && (
                          <div className="mt-2 sm:mt-3 space-y-2">
                            {message.buttons.map((button, idx) => (
                              <motion.button
                                key={idx}
                                onClick={() => handleButtonClick(button.action)}
                                className="w-full px-3 py-2 bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 text-slate-700 rounded-lg text-xs font-medium transition-all duration-200 border border-violet-200/70 hover:border-violet-300 shadow-sm hover:shadow-md"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {button.text}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-white text-slate-900 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl rounded-bl-none border border-slate-200 shadow-sm">
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
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {messages.length === 1 && showInitialButtons && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 sm:mt-6 space-y-2 sm:space-y-3"
                    >
                      <p className="text-xs font-semibold text-slate-600 px-2 uppercase tracking-wide">
                        How are you today?
                      </p>
                      <div className="space-y-2">
                        {[
                          { text: "I'm doing well", emoji: "😊" },
                          { text: "Not great today", emoji: "😔" },
                          { text: "Just exploring", emoji: "✨" },
                        ].map((option, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSend(option.text)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 text-slate-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border border-violet-200/70 hover:border-violet-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                          >
                            <span className="text-base">{option.emoji}</span>
                            <span className="group-hover:text-violet-700 transition-colors">{option.text}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-200/50 p-3 sm:p-4 bg-white rounded-b-2xl sm:rounded-b-3xl flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Share your thoughts..."
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-100 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs sm:text-sm transition-all placeholder-slate-400"
                    />
                    <motion.button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500/30 flex-shrink-0"
                    >
                      <ArrowRight size={16} className="sm:w-4 sm:h-4" />
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
