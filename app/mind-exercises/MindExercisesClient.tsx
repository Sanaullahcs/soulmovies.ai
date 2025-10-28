"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Sparkles, Clock, Zap, Feather, Moon, Flower, Play, Info } from "lucide-react"

// Define the exercise type
interface MindExercise {
  id: string
  title: string
  description: string
  longDescription: string
  icon: React.ReactNode
  category: "meditation" | "cognitive" | "emotional" | "creative" | "mindfulness" | "hypnosis"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  imageSrc: string
  benefits: string[]
  fullDetails: {
    overview: string
    howItWorks: string
    science: string
    techniques: string[]
    tips: string[]
  }
}

export default function MindExercisesClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<MindExercise | null>(null)
  const [showDetails, setShowDetails] = useState(false)

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

  // Mind exercises data - 2 per category
  const exercises: MindExercise[] = [
    // Meditation (2)
    {
      id: "deep-breathing",
      title: "Deep Breathing Technique",
      description: "Master the foundational breathing technique to activate your body's natural relaxation response.",
      longDescription:
        "Deep diaphragmatic breathing is a scientifically-proven method to immediately reduce stress and anxiety. This guided session teaches you the 4-2-6 breathing pattern, which slows your heart rate, increases oxygen circulation, and promotes mental clarity within just three minutes.",
      icon: <Zap size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "3 min",
      imageSrc: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Immediately reduces cortisol levels",
        "Increases oxygen to brain and muscles",
        "Stabilizes heart rate and blood pressure",
        "Can be practiced anywhere, anytime",
      ],
      fullDetails: {
        overview:
          "The Deep Breathing Technique is a foundational practice that forms the basis of all meditation and mindfulness work. By consciously controlling your breath, you directly influence your nervous system, shifting from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) activation.",
        howItWorks:
          "This technique uses the 4-2-6 pattern: inhale through the nose for 4 counts, hold for 2 counts, exhale through the mouth for 6 counts. The longer exhale activates your parasympathetic nervous system. Repeat for 5-10 cycles to experience immediate calming effects.",
        science:
          "Research from Stanford University shows that deep breathing increases heart rate variability (HRV), a marker of nervous system flexibility. Studies published in the Journal of Clinical Psychology demonstrate that diaphragmatic breathing reduces cortisol by up to 25% within minutes.",
        techniques: [
          "4-2-6 breathing pattern for nervous system regulation",
          "Nasal breathing to filter and warm air",
          "Diaphragmatic engagement for full oxygen exchange",
          "Visualization of energy flowing through your body",
        ],
        tips: [
          "Practice in the morning for energy or evening for relaxation",
          "Sit upright to allow full diaphragmatic expansion",
          "Start with 3 minutes and gradually extend to 10-15 minutes",
          "Use this technique before important meetings or stressful situations",
          "Combine with body awareness for enhanced benefits",
        ],
      },
    },
    {
      id: "sound-meditation",
      title: "Sound Bath Meditation",
      description: "Immerse yourself in healing frequencies designed to facilitate deep meditative states.",
      longDescription:
        "Experience the transformative power of binaural beats and ambient soundscapes scientifically engineered to induce theta brainwave states. This 20-minute session combines carefully selected frequencies with natural sounds to guide you into profound relaxation and expanded awareness.",
      icon: <Sparkles size={24} />,
      category: "meditation",
      difficulty: "beginner",
      duration: "20 min",
      imageSrc: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Induces theta brainwave states",
        "Deep cellular relaxation",
        "Enhanced creativity and intuition",
        "Improved sleep quality",
      ],
      fullDetails: {
        overview:
          "Sound Bath Meditation harnesses the therapeutic power of sound frequencies to guide your brain into optimal states for healing and transformation. The combination of binaural beats, isochronic tones, and nature sounds creates a multisensory experience that bypasses the conscious mind.",
        howItWorks:
          "Binaural beats work by playing slightly different frequencies in each ear, causing your brain to perceive a third frequency—the difference between them. When this frequency falls in the theta range (4-7 Hz), your brain naturally entrains to this frequency, inducing deep meditation and enhanced creativity.",
        science:
          "A study in Frontiers in Human Neuroscience found that binaural beats at 40 Hz enhanced gamma wave activity associated with enhanced cognitive processing. Research shows that theta brainwaves are associated with REM sleep, meditation, and creative insight.",
        techniques: [
          "Binaural beats at 5 Hz for theta wave induction",
          "Isochronic tones for additional brainwave entrainment",
          "Nature soundscapes (rainfall, ocean waves, forest ambience)",
          "Spatial audio for immersive three-dimensional experience",
        ],
        tips: [
          "Use quality headphones for binaural beat effectiveness",
          "Lie down or sit comfortably to avoid muscle tension",
          "Practice consistently—effects compound over time",
          "Best used 30 minutes before important creative work",
          "Avoid use while driving or operating machinery",
        ],
      },
    },

    // Hypnosis (2)
    {
      id: "hypnotic-relaxation",
      title: "Guided Hypnotic Journey",
      description: "Access your subconscious mind through professional hypnotic guidance for lasting transformation.",
      longDescription:
        "This carefully crafted hypnotic experience combines proven induction techniques with therapeutic suggestions. Over 15 minutes, you'll descend through progressive relaxation levels, access your inner wisdom, and integrate powerful positive affirmations designed to support your personal growth.",
      icon: <Moon size={24} />,
      category: "hypnosis",
      difficulty: "intermediate",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Access subconscious programming",
        "Release limiting beliefs",
        "Enhanced receptivity to positive change",
        "Deep physical and mental restoration",
      ],
      fullDetails: {
        overview:
          "Guided Hypnotic Journey provides a structured pathway into your subconscious mind—the part of your brain responsible for 95% of your automatic thoughts, behaviors, and beliefs. Unlike stage hypnosis, therapeutic hypnosis is a collaborative process that empowers you to access your inner resources.",
        howItWorks:
          "The session begins with progressive relaxation, gradually deepening your state of consciousness. Once in a receptive hypnotic state, therapeutic suggestions are introduced to reshape limiting beliefs and activate resourceful mental states. You remain in complete control throughout.",
        science:
          "fMRI studies show that during hypnosis, activity in the default mode network (associated with self-referential thinking) decreases, while activity in regions associated with attention and focus increases. This allows therapeutic suggestions to bypass critical factors and integrate directly into subconscious processes.",
        techniques: [
          "Progressive muscle relaxation for physical deepening",
          "Visualization of safe, peaceful sanctuary spaces",
          "Metaphorical language for subconscious communication",
          "Post-hypnotic suggestions for lasting change",
        ],
        tips: [
          "Practice consistently—subconscious changes deepen with repetition",
          "Avoid alcohol or stimulants before sessions",
          "Find a quiet, comfortable space where you won't be disturbed",
          "Keep a journal of insights and shifts you notice",
          "Combine with conscious intention-setting for amplified results",
        ],
      },
    },
    {
      id: "self-hypnosis",
      title: "Self-Empowerment Hypnosis",
      description: "Learn to guide yourself into hypnotic states and leverage your subconscious for personal mastery.",
      longDescription:
        "Master the art of self-hypnosis with this comprehensive 12-minute training. You'll learn professional induction techniques, anchor positive states, and create custom affirmations that reprogram your subconscious mind for confidence, abundance, and success.",
      icon: <Brain size={24} />,
      category: "hypnosis",
      difficulty: "intermediate",
      duration: "12 min",
      imageSrc: "https://images.unsplash.com/photo-1515894274780-af5d4d90b30f?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Build self-hypnosis mastery",
        "Create lasting behavioral changes",
        "Overcome anxiety and self-doubt",
        "Access peak performance states",
      ],
      fullDetails: {
        overview:
          "Self-Hypnosis Mastery teaches you to become your own hypnotherapist. By learning professional induction and suggestion techniques, you gain the ability to access your subconscious mind on-demand, making it the ultimate tool for personal transformation and peak performance.",
        howItWorks:
          "You'll learn the rapid eye closure technique for fast induction, progressive deepening methods, and how to craft personalized affirmations that resonate with your subconscious. These tools enable you to reprogram limiting beliefs and activate empowering mental states in just minutes.",
        science:
          "Research in the International Journal of Clinical and Experimental Hypnosis shows that self-hypnosis produces the same neurological changes as guided hypnosis. The key is proper training and consistent practice to develop automaticity.",
        techniques: [
          "Rapid eye closure induction for quick hypnotic entry",
          "Hand levitation for deepening and confirming trance",
          "Personalized anchor creation for state management",
          "Affirmation engineering for subconscious programming",
        ],
        tips: [
          "Practice the induction technique daily until it becomes automatic",
          "Start with shorter sessions (5 minutes) and extend as you progress",
          "Use anchors—physical gestures that trigger hypnotic states",
          "Record your own voice with affirmations for added power",
          "Practice before bed to integrate suggestions during sleep",
        ],
      },
    },

    // Emotional (2)
    {
      id: "self-love-meditation",
      title: "Self-Compassion Practice",
      description: "Develop a nurturing relationship with yourself through heart-centered compassion work.",
      longDescription:
        "Transform your inner dialogue with this powerful 10-minute self-love practice. Designed to reduce self-criticism and cultivate unconditional acceptance, this meditation uses proven psychological techniques to rewire your relationship with yourself and build emotional resilience.",
      icon: <Heart size={24} />,
      category: "emotional",
      difficulty: "beginner",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Reduce self-criticism and shame",
        "Increase emotional resilience",
        "Improve relationships with others",
        "Build foundation for sustainable self-care",
      ],
      fullDetails: {
        overview:
          "Self-Compassion Practice is grounded in research by Dr. Kristin Neff showing that self-compassion—treating yourself with the same kindness you'd offer a good friend—is more effective for well-being than self-esteem. This practice rewires your inner dialogue and builds psychological resilience.",
        howItWorks:
          "The practice involves placing your hand on your heart and repeating affirmations of self-kindness. Research shows this combination of touch and affirmation activates the caregiving system in your brain, triggering the release of oxytocin—the bonding and relaxation hormone.",
        science:
          "Neuroimaging studies show that self-compassion activates reward circuits in the brain (ventromedial prefrontal cortex) and reduces activity in threat-detection areas (amygdala). Regular practice increases gray matter density in these regions, creating lasting neural changes.",
        techniques: [
          "Heart-centered awareness and touch activation",
          "Loving-kindness phrases tailored to your needs",
          "Recognition of shared human experience",
          "Integration of both strength and vulnerability",
        ],
        tips: [
          "Start with phrases that genuinely resonate with you",
          "Practice especially during moments of struggle",
          "Combine with journal writing to deepen integration",
          "Notice the difference between self-compassion and indulgence",
          "Extend compassion to others once well-established in yourself",
        ],
      },
    },
    {
      id: "loving-kindness",
      title: "Loving-Kindness Meditation",
      description: "Radiate compassion and goodwill to yourself, loved ones, and all beings.",
      longDescription:
        "This ancient yet scientifically-validated practice systematically cultivates feelings of warmth and connection. Over 10 minutes, you'll progressively expand compassion from yourself to others, ultimately radiating unconditional loving-kindness to the entire world.",
      icon: <Flower size={24} />,
      category: "emotional",
      difficulty: "beginner",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Increase positive emotions",
        "Dissolve anger and resentment",
        "Strengthen empathy and connection",
        "Activate caregiving neural pathways",
      ],
      fullDetails: {
        overview:
          "Loving-Kindness Meditation (Metta) is one of the most transformative practices in contemplative traditions. By systematically radiating goodwill to yourself, loved ones, neutral people, difficult people, and all beings, you rewire your brain for compassion and connection.",
        howItWorks:
          "The practice uses phrases like 'May I be happy, may I be healthy, may I be safe, may I live with ease' repeated with genuine feeling. You begin with yourself, then progressively extend these wishes to increasingly wider circles of people, ultimately encompassing all sentient beings.",
        science:
          "Harvard research shows that just 7 minutes of loving-kindness meditation increases positive emotions and social connection. Regular practitioners show increased activation in empathy-related brain regions and decreased activity in threat-detection areas. Brain scans reveal increased gray matter in the insula and anterior cingulate.",
        techniques: [
          "Systematic progression from self to others",
          "Sincere repetition of loving-kindness phrases",
          "Heart visualization and activation",
          "Emotional authenticity over perfect technique",
        ],
        tips: [
          "Don't worry about 'feeling' the love—intention is enough",
          "Start with self-love if difficult; progression is flexible",
          "Practice with people who naturally evoke warm feelings",
          "Gradually include neutral and difficult people",
          "Combine with breathwork for enhanced emotional activation",
        ],
      },
    },

    // Cognitive (2)
    {
      id: "focus-flow",
      title: "Flow State Activation",
      description: "Train your mind to enter optimal performance states with laser-focused concentration.",
      longDescription:
        "Access your peak cognitive performance through this 12-minute guided activation. Using evidence-based neuroscience techniques, this practice trains your attention systems to achieve flow state—that transcendent state where time disappears and performance soars.",
      icon: <Zap size={24} />,
      category: "cognitive",
      difficulty: "intermediate",
      duration: "12 min",
      imageSrc: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Achieve laser-focused concentration",
        "Enter flow state on demand",
        "Increase productivity and creativity",
        "Enhanced problem-solving abilities",
      ],
      fullDetails: {
        overview:
          "Flow State Activation draws from Csikszentmihalyi's flow research, which shows that optimal human performance occurs in a state of deep engagement where challenge and skill are perfectly balanced. This practice trains your brain to reliably access this state.",
        howItWorks:
          "The session combines focused attention training with visualization of seamless task engagement. You'll learn to recognize and maintain the conditions for flow: clear goals, immediate feedback, challenge-skill balance, and minimal distractions.",
        science:
          "Neuroscientific studies show that flow states involve transient hypofrontality—temporary decrease in prefrontal cortex activity responsible for self-criticism and rumination. This allows automatic processing to take over, resulting in peak performance. fMRI scans show increased activity in default mode networks during flow.",
        techniques: [
          "Focused attention training on single objects",
          "Visualization of seamless performance",
          "Challenge-skill calibration awareness",
          "Environmental optimization coaching",
        ],
        tips: [
          "Identify your optimal challenge-to-skill ratio",
          "Remove distractions before starting important work",
          "Use this practice right before deep work sessions",
          "Track flow states in a journal to identify patterns",
          "Combine with the Pomodoro Technique for sustained flow",
        ],
      },
    },
    {
      id: "brain-optimization",
      title: "Cognitive Enhancement Protocol",
      description: "Strengthen memory, mental clarity, and neuroplasticity through targeted cognitive exercises.",
      longDescription:
        "This advanced 15-minute protocol combines memory training, pattern recognition, and cognitive flexibility exercises. Designed to stimulate neuroplasticity and build cognitive reserve, this practice enhances mental agility and long-term brain health.",
      icon: <Brain size={24} />,
      category: "cognitive",
      difficulty: "advanced",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Enhance memory formation",
        "Improve mental agility",
        "Build cognitive reserve",
        "Support long-term brain health",
      ],
      fullDetails: {
        overview:
          "The Cognitive Enhancement Protocol is based on neuroplasticity research showing that challenging cognitive tasks create new neural connections and strengthen existing ones. By combining multiple cognitive exercises, this protocol maximizes brain health across multiple domains.",
        howItWorks:
          "The session progresses through memory encoding exercises, pattern recognition challenges, and cognitive flexibility tasks. Each component targets specific neural circuits, and their combination creates optimal conditions for neuroplastic changes.",
        science:
          "Research in the journal Neuron demonstrates that cognitive training increases gray matter volume in targeted brain regions. Studies show that varied cognitive challenges are more effective for building cognitive reserve than repetitive tasks, protecting against age-related decline.",
        techniques: [
          "Spatial memory palace technique",
          "Pattern recognition and prediction",
          "Cognitive flexibility via task switching",
          "Working memory capacity expansion",
        ],
        tips: [
          "Progress difficulty gradually as you improve",
          "Practice when well-rested for maximum benefit",
          "Vary exercises to prevent adaptation plateaus",
          "Combine with physical exercise for synergistic effects",
          "Track improvements in attention and memory in daily life",
        ],
      },
    },

    // Creative (2)
    {
      id: "creative-visualization",
      title: "Manifestation Visualization",
      description: "Harness the power of visualization to align your mind with your deepest goals and aspirations.",
      longDescription:
        "This sophisticated 15-minute visualization practice uses multisensory imagery and emotional anchoring to reprogram your subconscious mind for success. By vividly imagining desired outcomes, you activate the reticular activating system and align your actions with your goals.",
      icon: <Sparkles size={24} />,
      category: "creative",
      difficulty: "intermediate",
      duration: "15 min",
      imageSrc: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Align subconscious with goals",
        "Increase motivation and commitment",
        "Reduce anxiety about future events",
        "Enhance performance in any domain",
      ],
      fullDetails: {
        overview:
          "Manifestation Visualization leverages the principle that your subconscious mind cannot distinguish between vividly imagined experience and actual experience. By creating detailed mental simulations of desired outcomes, you program your brain to recognize and pursue opportunities aligned with your vision.",
        howItWorks:
          "The practice guides you to visualize in multisensory detail—not just seeing, but feeling, hearing, and even smelling your desired outcome. This engages multiple brain systems and creates stronger neural patterns than visualization alone. Emotional authenticity is crucial for subconscious integration.",
        science:
          "Studies of Olympic athletes show that mental rehearsal activates the same motor cortex regions as actual practice. Research on the reticular activating system shows that focused visualization increases pattern recognition for goal-relevant information in your environment.",
        techniques: [
          "Multisensory vividness (sight, sound, feeling, taste, smell)",
          "Emotional authenticity and genuine desire",
          "Present-tense language ('I am' not 'I will be')",
          "Integration of obstacles and successful navigation",
        ],
        tips: [
          "Visualize with genuine emotion—not forced positive thinking",
          "Include sensory details beyond just visual images",
          "Practice daily, ideally in a meditative state",
          "Combine visualization with aligned action",
          "Journal about opportunities that appear after visualization",
        ],
      },
    },
    {
      id: "creative-expression",
      title: "Artistic Expression Activation",
      description: "Unlock your creative potential and express emotions through guided artistic exploration.",
      longDescription:
        "This 25-minute session combines meditation with creative prompts to overcome creative blocks and access your authentic creative voice. Perfect for artists, writers, and anyone seeking to channel emotions into meaningful creative work.",
      icon: <Flower size={24} />,
      category: "creative",
      difficulty: "beginner",
      duration: "25 min",
      imageSrc: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Overcome creative blocks",
        "Access authentic creative voice",
        "Process emotions through art",
        "Increase creative confidence",
      ],
      fullDetails: {
        overview:
          "Artistic Expression Activation combines neuroscience insights about creativity with proven techniques from art therapy. The session quiets the inner critic, accesses the default mode network associated with creativity, and channels emotional material into artistic expression.",
        howItWorks:
          "The practice begins with meditation to quiet analytical thinking, then progresses through guided prompts and freeform expression. You'll explore your authentic creative impulses without judgment, allowing emotions and imagery to flow without critical filtering.",
        science:
          "Research shows that the default mode network—active during relaxed thinking—is crucial for creative insights. Art-making activates emotion processing centers and provides non-verbal processing of feelings. Studies demonstrate that creative expression reduces cortisol and increases emotional regulation.",
        techniques: [
          "Judgment-free creative exploration",
          "Emotional channeling into artistic mediums",
          "Sensory engagement and immersion",
          "Integration of subconscious imagery",
        ],
        tips: [
          "No art experience needed—focus on process, not product",
          "Use mediums that naturally attract you",
          "Allow emotions to guide your creation",
          "Don't edit or judge while creating",
          "Reflect on what you created after the session",
        ],
      },
    },

    // Mindfulness (2)
    {
      id: "mindful-body-scan",
      title: "Progressive Body Awareness",
      description: "Develop deep somatic awareness and release tension throughout your entire body.",
      longDescription:
        "This foundational 10-minute body scan systematically sweeps awareness through your entire body, identifying and releasing areas of stored tension. This practice enhances body-mind connection and forms the basis for advanced mindfulness practices.",
      icon: <Feather size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "10 min",
      imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Release chronic tension",
        "Improve body-mind connection",
        "Increase proprioceptive awareness",
        "Foundation for deeper meditation",
      ],
      fullDetails: {
        overview:
          "Progressive Body Awareness is a core mindfulness technique that develops interoception—your ability to sense internal bodily states. By systematically scanning your body, you develop the foundational awareness that supports all deeper meditation and somatic practices.",
        howItWorks:
          "Attention moves systematically from your toes to the crown of your head, spending a few seconds at each body area. You notice sensations without judgment, release tension through gentle breathing, and integrate awareness of held emotions. This creates a comprehensive map of your physical and emotional state.",
        science:
          "fMRI studies show that body scan meditation increases activity in the insula—the brain region responsible for interoceptive awareness. Regular practice increases gray matter density in regions associated with emotional awareness and regulation. Studies demonstrate increased heart rate variability (marker of nervous system health).",
        techniques: [
          "Systematic sequential scanning",
          "Sensation observation without judgment",
          "Tension release through breath",
          "Emotional release through awareness",
        ],
        tips: [
          "Practice lying down for full relaxation",
          "Move slowly—don't rush through body areas",
          "Notice both physical and emotional sensations",
          "Practice daily for cumulative benefits",
          "Use when unable to sleep or during high stress",
        ],
      },
    },
    {
      id: "present-moment",
      title: "Sensory Immersion Practice",
      description: "Anchor yourself fully in the present moment through systematic sensory engagement.",
      longDescription:
        "This elegant 8-minute practice uses the 5-4-3-2-1 sensory technique to ground you completely in the present moment. By engaging all five senses, you activate your parasympathetic nervous system and experience profound peace and clarity.",
      icon: <Clock size={24} />,
      category: "mindfulness",
      difficulty: "beginner",
      duration: "8 min",
      imageSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=500&auto=format&fit=crop",
      benefits: [
        "Ground in present moment",
        "Reduce anxiety and rumination",
        "Activate relaxation response",
        "Portable anxiety tool",
      ],
      fullDetails: {
        overview:
          "Sensory Immersion Practice is based on the principle that anxiety exists in the past or future, never in the present moment. By fully engaging your senses, you anchor consciousness in the present and interrupt anxious thought patterns.",
        howItWorks:
          "You systematically notice 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste. This progression through all sensory modalities fully engages your attention system, pulling you out of anxious thinking into sensory presence.",
        science:
          "Neuroscience research shows that fully engaged sensory attention reduces activity in the default mode network—the brain's rumination center. This interrupts anxiety cycles and activates the parasympathetic nervous system. The technique is clinically validated for anxiety reduction.",
        techniques: [
          "Sequential sensory engagement through 5 senses",
          "Detailed sensory description and naming",
          "Non-judgment observation",
          "Grounding through multiple sensory channels",
        ],
        tips: [
          "Practice this technique when feeling anxious or dissociated",
          "Really engage with each sensation—don't rush",
          "Can be done anywhere—workplace, public spaces",
          "Combine with slow breathing for enhanced grounding",
          "Teach to children and loved ones for universal access",
        ],
      },
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
        return "bg-emerald-100 text-emerald-700"
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
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-800/50 to-purple-700/40" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
                Mind Exercises
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
                Professional-grade exercises designed to cultivate mental clarity, emotional balance, and psychological
                resilience through science-backed mindfulness practices.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative max-w-xl"
            >
              <input
                type="text"
                placeholder="Search exercises..."
                className="w-full px-5 py-4 pr-12 rounded-full bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-violet-400 focus:outline-none shadow-lg"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="container px-6">
          <div className="flex flex-wrap gap-3 justify-center overflow-x-auto pb-2">
            {categories.map((category, idx) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-violet-50/30 to-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                {activeCategory === "all"
                  ? "Curated Mind Exercises"
                  : `${categories.find((c) => c.id === activeCategory)?.name} Collection`}
              </h2>
              <p className="text-slate-600 text-lg">
                Each exercise is meticulously designed by wellness professionals and backed by neuroscience research
              </p>
            </motion.div>
          </div>

          {filteredExercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-violet-100/40 group">
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100">
                      <Image
                        src={exercise.imageSrc || "/placeholder.svg"}
                        alt={exercise.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Badge Container */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${getDifficultyColor(exercise.difficulty)}`}
                        >
                          {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                        </span>
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-violet-600 shadow-lg">
                        {exercise.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                            {exercise.category}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock size={14} />
                            {exercise.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 leading-tight">{exercise.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">{exercise.description}</p>

                      {/* Benefits Preview */}
                      <div className="mb-6 pb-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                          Key Benefits
                        </p>
                        <ul className="space-y-1">
                          {exercise.benefits.slice(0, 2).map((benefit, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start">
                              <span className="text-violet-500 mr-2">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-2">
                        <Link href={`/mind-exercises/${exercise.id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl py-2.5 h-auto font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                            <Play size={16} className="mr-1" />
                            Begin
                          </Button>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedExercise(exercise)
                            setShowDetails(true)
                          }}
                          className="px-3 py-2.5 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-700 transition-colors duration-200 flex items-center justify-center"
                        >
                          <Info size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
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
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No exercises found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50 bg-transparent"
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

      {/* Details Modal */}
      {showDetails && selectedExercise && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDetails(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={selectedExercise.imageSrc || "/placeholder.svg"}
                alt={selectedExercise.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-slate-900 hover:bg-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedExercise.title}</h2>
                <div className="flex gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(selectedExercise.difficulty)}`}
                  >
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-white/20 text-white rounded-full">
                    {selectedExercise.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 max-h-96 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Overview</h3>
                  <p className="text-slate-600 leading-relaxed">{selectedExercise.fullDetails.overview}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">How It Works</h3>
                  <p className="text-slate-600 leading-relaxed">{selectedExercise.fullDetails.howItWorks}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Scientific Basis</h3>
                  <p className="text-slate-600 leading-relaxed">{selectedExercise.fullDetails.science}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Techniques Used</h3>
                  <ul className="space-y-2">
                    {selectedExercise.fullDetails.techniques.map((tech, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-600">
                        <span className="text-violet-600 font-bold">•</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Pro Tips</h3>
                  <ul className="space-y-2">
                    {selectedExercise.fullDetails.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-600">
                        <span className="text-violet-600 font-bold">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">All Benefits</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedExercise.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-violet-500">✓</span>
                        <span className="text-sm text-slate-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 border-t border-slate-200 flex gap-3">
              <Link href={`/mind-exercises/${selectedExercise.id}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl py-3 h-auto font-semibold">
                  <Play size={18} className="mr-2" />
                  Start This Exercise
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50 bg-transparent"
                onClick={() => setShowDetails(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
        </div>

        <div className="container px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Practice Mind Exercises?</h2>
              <p className="text-white/70 text-lg">
                Backed by decades of neuroscience research and proven by thousands of practitioners
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Enhanced Mental Performance",
                description:
                  "Improve focus, memory, and cognitive flexibility through targeted neural activation and neuroplasticity enhancement.",
                icon: Brain,
              },
              {
                title: "Emotional Mastery",
                description:
                  "Develop sophisticated emotional regulation skills and cultivate resilience in the face of life's challenges.",
                icon: Heart,
              },
              {
                title: "Deep Relaxation",
                description:
                  "Access profound states of calm that activate your parasympathetic nervous system and promote cellular healing.",
                icon: Sparkles,
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center mb-4">
                    <Icon className="text-violet-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-violet-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fillRule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fillOpacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Begin Your Transformation Today</h2>
              <p className="text-white/90 mb-8 text-lg">
                Join thousands of practitioners who have unlocked their mental potential and transformed their lives
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-violet-700 hover:bg-white/95 rounded-xl px-8 py-3 h-auto font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Free Trial
                </Button>
                <Button className="bg-white/20 border border-white text-white hover:bg-white/30 rounded-xl px-8 py-3 h-auto font-semibold backdrop-blur-sm">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Transformational Stories</h2>
              <p className="text-slate-600 text-lg">
                Real experiences from practitioners who have benefited from our guided exercises
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Executive, Tech Industry",
                content:
                  "These exercises completely transformed my approach to stress management. The breathing techniques alone have saved my career during high-pressure situations.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
              },
              {
                name: "James Richardson",
                role: "Creative Professional",
                content:
                  "The creative visualization sessions unlocked potential I didn't know I had. My output has doubled, and I've never felt more aligned with my work.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100/50"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-violet-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
