"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minimize2, Maximize2, MessageCircle, ArrowRight, Heart } from "lucide-react"

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
      content: "Hi, I'm Lumi. 🌿\n\nWelcome to SoulMovies.\n\nHow are you doing today?",
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
        text: "That's nice to hear. 💙\n\nEveryone's story is different, and that's what makes this place special.\n\nWe create Soul Movies, made from your own words and feelings through a short, easy questionnaire.\n\nOur AI reads your answers, writes a gentle summary about you, and turns it into your own Soul Movie.\n\nWould you like me to show you how it works?",
        buttons: [
          { text: "Yes, show me", action: "show_how_it_works" },
          { text: "Maybe later", action: "maybe_later" },
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
        text: "I understand. Some days just feel off, and that's okay. 💚\n\nYou don't have to explain everything — you can tell me as much or as little as you want.\n\nSoulMovies is a calm place where people share how they feel.\n\nOur AI listens through your answers, makes a small written summary, and then we create your Soul Movie from your own words and feelings.\n\nWould you like to see how it starts?",
        buttons: [
          { text: "Yes, please", action: "show_how_it_works" },
          { text: "Not right now", action: "maybe_later" },
        ],
      }
    }

    // Curious/looking responses
    if (
      lowerMessage.includes("looking") ||
      lowerMessage.includes("curious") ||
      lowerMessage.includes("just browsing")
    ) {
      return {
        text: "That's perfect. Curiosity is how most people start here. ✨\n\nOn SoulMovies, you fill a short questionnaire — it's simple and personal.\n\nThen our AI summarizes what you wrote and creates your Soul Movie from your own words and feelings.\n\nIt's a personalized experience based on your story.\n\nWant me to show you where to start?",
        buttons: [
          { text: "Show me", action: "show_how_it_works" },
          { text: "Tell me more", action: "tell_more" },
        ],
      }
    }

    // Tell me more
    if (lowerMessage.includes("tell me more") || lowerMessage.includes("more information")) {
      return {
        text: "Sure. 🌟\n\nYou answer a few questions — things like what makes you feel calm, what inspires you, what moments matter to you.\n\nOur AI then creates a written summary of your answers, something like a reflection of who you are.\n\nAfter that, we turn that summary into your Soul Movie — made from your own words and feelings, with meaning and beauty.\n\nIt's created just for you.\n\nReady to start?",
        buttons: [
          { text: "Start the questionnaire", action: "start_questionnaire" },
          { text: "Ask more questions", action: "ask_more" },
        ],
      }
    }

    // How it works
    if (lowerMessage.includes("how it works") || lowerMessage.includes("show me")) {
      return {
        text: "Here's the journey: 🎬\n\n1️⃣ Discovery Call - Share your story in a safe space\n2️⃣ Soul Questionnaire - Answer simple, personal questions\n3️⃣ AI Summary - We create a written reflection of you\n4️⃣ Your Soul Movie - Created from your words and feelings, just for you\n5️⃣ Ongoing Support - Continue your journey with us\n\nEach step is designed to help you feel heard and understood.\n\nWould you like to start your journey?",
        buttons: [
          { text: "Start now", action: "start_questionnaire" },
          { text: "Schedule a call", action: "schedule_call" },
        ],
      }
    }

    // Start questionnaire
    if (lowerMessage.includes("start") || lowerMessage.includes("questionnaire") || lowerMessage.includes("begin")) {
      return {
        text: "Perfect. Here's the link to start your journey:\n\n🔗 Start the Soul Questionnaire\n\nTake your time. You can write freely — we understand everything with care.\n\nYour story matters. 💫",
      }
    }

    // Schedule call
    if (lowerMessage.includes("schedule") || lowerMessage.includes("call") || lowerMessage.includes("consultation")) {
      return {
        text: "Wonderful! You can schedule a free 30-minute discovery call here:\n\n📅 Book Your Consultation\n\nDuring our call, we'll discuss your goals and answer any questions you have.\n\nI look forward to meeting you. 💙",
      }
    }

    // Help/support
    if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("question")) {
      return {
        text: "I'm here to help! 🤝\n\nYou can:\n✨ Share how you're feeling\n🎯 Tell me what you're seeking\n💭 Describe your emotional state\n🎬 Ask about SoulMovies\n❓ Explore our services\n\nWhat would help you most right now?",
      }
    }

    // Default response
    return {
      text: "Thank you for sharing. 💫\n\nThat sounds meaningful. To help me understand better, could you tell me more?\n\nWhat emotions are you hoping to explore? What would make your soul feel nourished right now?",
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
    const buttonTexts: { [key: string]: string } = {
      show_how_it_works: "Show me how it works",
      maybe_later: "Maybe later",
      tell_more: "Tell me more",
      start_questionnaire: "Start the questionnaire",
      ask_more: "Tell me more",
      schedule_call: "Schedule a consultation",
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
            className="fixed bottom-4 left-4 z-40 w-14 h-14 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border border-purple-400/30 backdrop-blur-sm"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
              <MessageCircle size={24} />
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
            className={`fixed z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/50 flex flex-col transition-all duration-300 ${
              isMinimized
                ? "bottom-4 left-4 w-72 h-20 sm:w-80"
                : "bottom-4 left-4 right-4 w-auto h-[600px] sm:bottom-6 sm:left-6 sm:right-auto sm:w-96 sm:h-[650px] max-h-[90vh]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white p-4 rounded-t-3xl flex items-center justify-between flex-shrink-0 border-b border-purple-500/30">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm flex-shrink-0"
                >
                  <Heart size={20} />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base leading-tight truncate">Lumi</h3>
                  <p className="text-xs text-white/80 truncate">Your wellness guide</p>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
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
                        {message.buttons && message.buttons.length > 0 && (
                          <div className="mt-3 space-y-2">
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

                  {messages.length === 1 && showInitialButtons && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-3"
                    >
                      <p className="text-xs font-semibold text-slate-600 px-2 uppercase tracking-wide">
                        Quick responses
                      </p>
                      <div className="space-y-2">
                        {[
                          { text: "I'm doing well", emoji: "😊" },
                          { text: "Not great today", emoji: "😔" },
                          { text: "Just curious", emoji: "🤔" },
                        ].map((option, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSend(option.text)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-4 py-3 bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 text-slate-700 rounded-xl text-sm font-medium transition-all duration-200 border border-violet-200/70 hover:border-violet-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
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
                <div className="border-t border-slate-200/50 p-4 bg-white rounded-b-3xl flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Share your thoughts..."
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
