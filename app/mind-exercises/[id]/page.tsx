"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Sparkles,
  Clock,
  Lightbulb,
  Feather,
  Waves,
  Check,
  ArrowLeft,
  Volume2,
  VolumeX,
  Moon,
  Flower,
} from "lucide-react"

// Define the exercise type
interface Exercise {
  id: string
  title: string
  description: string
  longDescription: string
  icon: React.ReactNode
  category: "meditation" | "cognitive" | "emotional" | "creative" | "mindfulness" | "hypnosis"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in seconds
  steps: ExerciseStep[]
  benefits: string[]
  imageSrc: string
  audioSrc?: string
}

interface ExerciseStep {
  title: string
  instruction: string
  duration?: number // in seconds, optional for non-timed steps
  type: "instruction" | "timed" | "input" | "choice" | "visualization" | "breathing"
  options?: string[] // for choice type
}

// Exercise data
const exercisesData: Record<string, Exercise> = {
  "deep-breathing": {
    id: "deep-breathing",
    title: "Deep Breathing",
    description: "A simple yet powerful breathing technique to quickly reduce stress and increase oxygen flow.",
    longDescription:
      "Deep breathing is one of the most effective ways to activate your body's natural relaxation response. This exercise uses diaphragmatic breathing to slow your heart rate, lower blood pressure, and help you feel more centered and calm within minutes.",
    icon: <Waves size={24} />,
    category: "meditation",
    difficulty: "beginner",
    duration: 180, // 3 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable seated position with your back straight. Place one hand on your chest and the other on your abdomen. Close your eyes or maintain a soft gaze.",
        type: "instruction",
      },
      {
        title: "Awareness",
        instruction:
          "Take a moment to notice your natural breathing pattern. Is your breath shallow or deep? Fast or slow? No need to change it yet, just observe.",
        type: "timed",
        duration: 20,
      },
      {
        title: "Deep Inhale",
        instruction:
          "Now, slowly inhale through your nose for a count of 4. Feel your abdomen expand outward as your lungs fill with air. The hand on your abdomen should rise more than the hand on your chest.",
        type: "breathing",
        duration: 40,
      },
      {
        title: "Hold",
        instruction: "Gently hold your breath for a count of 2.",
        type: "timed",
        duration: 20,
      },
      {
        title: "Slow Exhale",
        instruction:
          "Exhale slowly through your mouth for a count of 6, letting all the air out. Feel your abdomen move inward as your lungs empty.",
        type: "breathing",
        duration: 60,
      },
      {
        title: "Continue Cycle",
        instruction:
          "Continue this breathing pattern: inhale for 4, hold for 2, exhale for 6. Focus on the sensation of your breath and the movement of your abdomen.",
        type: "breathing",
        duration: 60,
      },
      {
        title: "Completion",
        instruction:
          "Gradually return to your natural breathing pattern. Notice how your body feels now compared to when you started. When you're ready, gently open your eyes.",
        type: "instruction",
      },
    ],
    benefits: [
      "Immediately reduces stress and anxiety",
      "Lowers heart rate and blood pressure",
      "Increases oxygen to the brain and muscles",
      "Improves focus and mental clarity",
      "Can be done anywhere, anytime",
    ],
    imageSrc: "https://images.unsplash.com/photo-1474418397713-2f1091953b6a?q=80&w=500&auto=format&fit=crop",
  },
  "breathing-rhythm": {
    id: "breathing-rhythm",
    title: "Breathing Rhythm",
    description: "A guided breathing exercise to help you find your natural rhythm and reduce stress.",
    longDescription:
      "This breathing exercise helps you establish a calming rhythm that can reduce stress and anxiety. By focusing on your breath, you'll activate your parasympathetic nervous system, which helps counteract the fight-or-flight response and promotes relaxation.",
    icon: <Waves size={24} />,
    category: "meditation",
    difficulty: "beginner",
    duration: 300, // 5 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable seated position with your back straight. Place your hands on your knees or in your lap. Close your eyes or maintain a soft gaze.",
        type: "instruction",
      },
      {
        title: "Awareness",
        instruction:
          "Begin by simply noticing your natural breath without trying to change it. Observe the sensation of air moving in and out of your body.",
        type: "timed",
        duration: 30,
      },
      {
        title: "Deep Breathing",
        instruction:
          "Now, slowly inhale through your nose for 4 counts, filling your lungs completely. Hold for 2 counts. Then exhale through your mouth for 6 counts, emptying your lungs completely.",
        type: "breathing",
        duration: 60,
      },
      {
        title: "Rhythmic Breathing",
        instruction:
          "Continue this pattern: inhale for 4, hold for 2, exhale for 6. Focus on the rhythm and the sensation of your breath.",
        type: "breathing",
        duration: 120,
      },
      {
        title: "Natural Rhythm",
        instruction:
          "Now let go of counting and allow your breath to find its natural rhythm. Keep your awareness on the sensations of breathing.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Completion",
        instruction:
          "Slowly bring your awareness back to your surroundings. Notice how your body feels. When you're ready, gently open your eyes.",
        type: "instruction",
      },
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Lowers heart rate and blood pressure",
      "Improves focus and concentration",
      "Promotes better sleep quality",
      "Increases energy levels",
    ],
    imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/ocean-waves.mp3",
  },
  "hypnotic-relaxation": {
    id: "hypnotic-relaxation",
    title: "Hypnotic Relaxation",
    description: "A guided hypnotic journey to help you reach a deeply relaxed and receptive state of mind.",
    longDescription:
      "This hypnotic relaxation exercise guides you into a state of focused awareness and deep relaxation. While not a replacement for clinical hypnotherapy, this practice can help reduce stress, enhance creativity, and increase receptivity to positive suggestions. You'll remain aware and in control throughout the experience.",
    icon: <Moon size={24} />,
    category: "hypnosis",
    difficulty: "intermediate",
    duration: 900, // 15 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a quiet place where you won't be disturbed. Sit or lie down in a comfortable position. Ensure your body is fully supported and you can remain still for the duration of the exercise.",
        type: "instruction",
      },
      {
        title: "Initial Relaxation",
        instruction:
          "Close your eyes and take three deep breaths. With each exhale, feel yourself sinking deeper into relaxation. Allow your body to become heavy and comfortable.",
        type: "timed",
        duration: 30,
      },
      {
        title: "Progressive Relaxation",
        instruction:
          "Bring your awareness to your feet and toes. Feel them becoming heavy and relaxed. This relaxation slowly moves up through your legs, abdomen, chest, arms, and finally to your head. Each part of your body becomes completely relaxed.",
        type: "timed",
        duration: 120,
      },
      {
        title: "Deepening",
        instruction:
          "Imagine yourself at the top of a staircase with 10 steps. With each step down, you'll feel twice as relaxed. Begin counting down now: 10... deeper relaxed... 9... sinking further... continuing all the way down to 1, where you'll be in a perfect state of calm awareness.",
        type: "timed",
        duration: 120,
      },
      {
        title: "Safe Place Visualization",
        instruction:
          "Imagine a place where you feel completely safe, peaceful, and happy. It could be real or imaginary. Notice the details—what you see, hear, feel, and perhaps even smell in this special place. Allow yourself to fully experience being there.",
        type: "visualization",
        duration: 180,
      },
      {
        title: "Positive Suggestions",
        instruction:
          "In this receptive state, allow yourself to hear and absorb these positive statements: 'I am calm and centered in all situations. I easily release tension and stress. My mind is clear and focused. I am capable of deep relaxation whenever I choose.'",
        type: "timed",
        duration: 120,
      },
      {
        title: "Personal Affirmation",
        instruction:
          "Now create your own positive statement that addresses something you'd like to improve or reinforce in your life. Repeat this statement silently to yourself three times, feeling its truth.",
        type: "input",
      },
      {
        title: "Integration",
        instruction:
          "Take a moment to integrate this experience. The positive suggestions and your personal affirmation are being absorbed at a deep level, creating positive change naturally and easily.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Gentle Return",
        instruction:
          "I'll count from 1 to 5. With each number, you'll become more alert and refreshed. 1... becoming aware of your body... 2... energy returning... 3... feeling refreshed... 4... almost fully alert... 5... eyes open, fully awake, feeling wonderful.",
        type: "timed",
        duration: 60,
      },
    ],
    benefits: [
      "Induces deep physical and mental relaxation",
      "Reduces stress and anxiety",
      "Enhances receptivity to positive suggestions",
      "Improves sleep quality",
      "Increases access to creativity and intuition",
      "Helps establish new positive thought patterns",
    ],
    imageSrc: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/ocean-waves.mp3",
  },
  "self-love-meditation": {
    id: "self-love-meditation",
    title: "Self-Love Meditation",
    description: "A gentle practice to cultivate compassion and love toward yourself.",
    longDescription:
      "This self-love meditation helps you develop a kinder relationship with yourself through mindful awareness and compassionate reflection. By practicing self-love, you can reduce self-criticism, build emotional resilience, and improve your overall sense of well-being and worthiness.",
    icon: <Heart size={24} />,
    category: "emotional",
    difficulty: "beginner",
    duration: 600, // 10 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable seated position in a quiet space. Place your hands gently on your heart, one on top of the other. Close your eyes and take a few deep breaths to center yourself.",
        type: "instruction",
      },
      {
        title: "Heart Connection",
        instruction:
          "Feel the warmth of your hands on your heart center. With each breath, imagine sending love and kindness to your heart. Notice any sensations that arise—warmth, tingling, openness, or perhaps tension.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Self-Acknowledgment",
        instruction:
          "Acknowledge something you've done recently that you're proud of, no matter how small. Perhaps you were kind to someone, accomplished a task, or simply took care of yourself. Take a moment to truly recognize this positive action.",
        type: "input",
      },
      {
        title: "Loving-Kindness Phrases",
        instruction:
          "Silently repeat these phrases to yourself, allowing them to resonate in your heart: 'May I be happy. May I be healthy. May I be safe. May I live with ease.' Feel the meaning behind each phrase.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Self-Compassion",
        instruction:
          "Bring to mind a challenge or difficulty you're facing. Place your hand on your heart and offer yourself the same kindness you would offer a dear friend. Say to yourself: 'This is a moment of suffering. Suffering is part of life. May I be kind to myself in this moment.'",
        type: "timed",
        duration: 90,
      },
      {
        title: "Gratitude for Your Body",
        instruction:
          "Bring awareness to your body and all the ways it supports you each day. Your heart that beats, your lungs that breathe, your legs that carry you. Send gratitude to each part of your body, acknowledging its service to you.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Personal Affirmation",
        instruction:
          "Create a personal self-love affirmation that feels true and meaningful to you. For example: 'I am worthy of love and respect exactly as I am.' Write it down and repeat it to yourself.",
        type: "input",
      },
      {
        title: "Integration",
        instruction:
          "Place your hands on your heart once more. Feel the warmth and connection. Know that you can return to this feeling of self-love anytime you need it. It is always available to you.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Completion",
        instruction:
          "Slowly deepen your breath and gently open your eyes. Carry this feeling of self-love with you throughout your day.",
        type: "instruction",
      },
    ],
    benefits: [
      "Reduces self-criticism and negative self-talk",
      "Increases self-compassion and emotional resilience",
      "Improves overall mood and outlook",
      "Enhances relationships with others",
      "Builds a foundation for sustainable self-care practices",
      "Promotes healing from past wounds",
    ],
    imageSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop",
  },
  "mindful-body-scan": {
    id: "mindful-body-scan",
    title: "Mindful Body Scan",
    description: "A progressive relaxation technique that helps you become aware of sensations throughout your body.",
    longDescription:
      "The body scan is a foundational mindfulness practice that helps you develop awareness of physical sensations, release tension, and connect with your body. This practice can help reduce stress, improve body awareness, and prepare you for deeper meditation practices.",
    icon: <Feather size={24} />,
    category: "mindfulness",
    difficulty: "beginner",
    duration: 600, // 10 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Lie down on your back in a comfortable position, or sit in a chair with your feet flat on the floor. Close your eyes and take a few deep breaths to settle in.",
        type: "instruction",
      },
      {
        title: "Feet & Legs",
        instruction:
          "Bring your awareness to your feet. Notice any sensations - warmth, coolness, tingling, pressure. Without judgment, simply observe. Then slowly move your attention up through your legs.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Torso & Back",
        instruction:
          "Continue moving your awareness through your hips, abdomen, chest, and back. Notice areas of tension or relaxation. If you find tension, breathe into that area and imagine it softening.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Arms & Hands",
        instruction:
          "Bring your attention to your shoulders, then down your arms to your hands. Notice any sensations in your fingers. Be aware of any tension you might be holding and allow it to release.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Neck & Head",
        instruction:
          "Move your awareness to your neck, throat, jaw, face, and scalp. Notice if you're holding tension in your jaw or forehead. Allow these areas to soften and relax.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Whole Body",
        instruction:
          "Now expand your awareness to your entire body at once. Feel the sensations of your whole body breathing. Notice the sense of aliveness throughout your body.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Completion",
        instruction:
          "Slowly begin to deepen your breath. Gently wiggle your fingers and toes. When you're ready, open your eyes and carry this awareness with you.",
        type: "instruction",
      },
    ],
    benefits: [
      "Reduces physical tension and stress",
      "Improves body awareness",
      "Helps identify and release emotional tension",
      "Promotes better sleep",
      "Develops concentration and mindfulness",
    ],
    imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
  },
  "self-hypnosis": {
    id: "self-hypnosis",
    title: "Self-Hypnosis",
    description:
      "Learn to guide yourself into a hypnotic state to access your subconscious mind and create positive change.",
    longDescription:
      "Self-hypnosis is a powerful technique that allows you to access your subconscious mind and create positive changes in your thoughts, feelings, and behaviors. This practice teaches you how to induce a hypnotic state on your own, where you can work with affirmations and visualizations to support your goals and well-being.",
    icon: <Moon size={24} />,
    category: "hypnosis",
    difficulty: "intermediate",
    duration: 720, // 12 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a quiet place where you won't be disturbed. Sit in a comfortable chair with your feet flat on the floor and your hands resting comfortably. Set a clear intention for what you'd like to work on during this session.",
        type: "instruction",
      },
      {
        title: "Relaxation Induction",
        instruction:
          "Close your eyes and take three deep breaths. With each exhale, feel yourself becoming more relaxed. Now, tense and then release each muscle group in your body, starting from your feet and moving up to your head.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Deepening",
        instruction:
          "Imagine yourself at the top of a beautiful staircase with 10 steps. With each step down, you'll go deeper into relaxation. Count down from 10 to 1, taking a breath between each number, feeling yourself going deeper with each step.",
        type: "timed",
        duration: 120,
      },
      {
        title: "Special Place",
        instruction:
          "Imagine yourself in a special place where you feel completely safe and peaceful. It could be a beach, forest, mountain, or any place real or imagined. Use all your senses to make this place vivid and real.",
        type: "visualization",
        duration: 90,
      },
      {
        title: "Suggestion Phase",
        instruction:
          "In this receptive state, create 3-5 positive suggestions related to your intention. Phrase them in the present tense, as if they're already true. For example: 'I am calm and confident in social situations.' Write them down.",
        type: "input",
      },
      {
        title: "Anchoring",
        instruction:
          "Choose a physical gesture (like touching your thumb and forefinger together) that you'll use as an anchor. As you repeat your suggestions to yourself, perform this gesture, linking the positive feelings with the physical action.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Future Visualization",
        instruction:
          "Imagine yourself in the future, having already achieved the changes you desire. See yourself acting, feeling, and thinking in new ways. Make this vision as detailed and vivid as possible.",
        type: "visualization",
        duration: 90,
      },
      {
        title: "Emergence",
        instruction:
          "Prepare to return to full awareness. Count from 1 to 5, and with each number, feel yourself becoming more alert and refreshed. At 5, open your eyes feeling calm, confident, and fully present.",
        type: "timed",
        duration: 60,
      },
    ],
    benefits: [
      "Enhances ability to create positive change",
      "Reduces stress and anxiety",
      "Improves focus and concentration",
      "Helps overcome limiting beliefs",
      "Supports goal achievement",
      "Increases self-awareness and personal insight",
    ],
    imageSrc: "https://images.unsplash.com/photo-1515894274780-af5d4d90b30f?q=80&w=500&auto=format&fit=crop",
  },
  "loving-kindness": {
    id: "loving-kindness",
    title: "Loving Kindness",
    description:
      "Cultivate compassion and positive feelings toward yourself and others through this heart-centered meditation.",
    longDescription:
      "Loving-kindness meditation (Metta) is a practice that cultivates unconditional love and goodwill toward yourself and others. This practice helps dissolve barriers of anger, resentment, and judgment, replacing them with feelings of connection, compassion, and genuine care.",
    icon: <Flower size={24} />,
    category: "meditation",
    difficulty: "beginner",
    duration: 600, // 10 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable seated position. Rest your hands on your knees or in your lap. Close your eyes or maintain a soft gaze. Take a few deep breaths to center yourself.",
        type: "instruction",
      },
      {
        title: "Self-Kindness",
        instruction:
          "Bring your attention to your heart center. Imagine a warm, gentle light glowing in your chest. As you breathe, silently repeat: 'May I be happy. May I be healthy. May I be safe. May I live with ease.' Feel the meaning behind these words.",
        type: "timed",
        duration: 120,
      },
      {
        title: "Benefactor",
        instruction:
          "Bring to mind someone who has shown you kindness - a mentor, friend, or loved one. Direct the same wishes toward them: 'May you be happy. May you be healthy. May you be safe. May you live with ease.'",
        type: "timed",
        duration: 90,
      },
      {
        title: "Neutral Person",
        instruction:
          "Think of someone you neither like nor dislike - perhaps someone you see regularly but don't know well. Direct the same wishes toward them, recognizing their humanity and desire for happiness.",
        type: "timed",
        duration: 90,
      },
      {
        title: "Difficult Person",
        instruction:
          "If you feel ready, bring to mind someone with whom you have difficulty. Start with someone mildly challenging rather than your most difficult relationship. Send them the same wishes, acknowledging that they too wish to be happy.",
        type: "timed",
        duration: 90,
      },
      {
        title: "All Beings",
        instruction:
          "Finally, expand your awareness to include all beings everywhere. Imagine your loving-kindness radiating outward like ripples on a pond: 'May all beings be happy. May all beings be healthy. May all beings be safe. May all beings live with ease.'",
        type: "timed",
        duration: 120,
      },
      {
        title: "Completion",
        instruction:
          "Bring your awareness back to your own heart. Notice how you feel after this practice. When you're ready, gently open your eyes and carry this sense of loving-kindness with you.",
        type: "instruction",
      },
    ],
    benefits: [
      "Increases positive emotions and decreases negative emotions",
      "Reduces self-criticism and enhances self-compassion",
      "Improves relationships and social connection",
      "Helps heal interpersonal conflicts",
      "Reduces symptoms of depression and PTSD",
      "Activates empathy and caregiving regions of the brain",
    ],
    imageSrc: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=500&auto=format&fit=crop",
  },
  "gratitude-journal": {
    id: "gratitude-journal",
    title: "Gratitude Journal",
    description: "Practice expressing gratitude by recording things you're thankful for to boost positive emotions.",
    longDescription:
      "Gratitude journaling is a powerful practice that shifts your focus from what's lacking to what's present and positive in your life. Regular gratitude practice has been shown to increase happiness, reduce depression, and improve overall well-being.",
    icon: <Heart size={24} />,
    category: "emotional",
    difficulty: "beginner",
    duration: 300, // 5 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a quiet space where you won't be interrupted. Take a few deep breaths to center yourself. Bring to mind the intention to notice and appreciate the positive aspects of your life.",
        type: "instruction",
      },
      {
        title: "Recent Gratitude",
        instruction:
          "Think about the past 24 hours. What are three things, big or small, that you feel grateful for? These could be people, experiences, opportunities, or simple pleasures.",
        type: "input",
      },
      {
        title: "Unexpected Gratitude",
        instruction:
          "Consider something unexpected that happened recently that you now feel grateful for. Perhaps a challenge that taught you something or a surprise that brought joy.",
        type: "input",
      },
      {
        title: "Self Gratitude",
        instruction:
          "What is something about yourself that you're grateful for? This could be a personal quality, an accomplishment, or something you're proud of.",
        type: "input",
      },
      {
        title: "Future Gratitude",
        instruction:
          "Think about something in the future that you're looking forward to. How can you bring gratitude into this anticipation?",
        type: "input",
      },
      {
        title: "Reflection",
        instruction:
          "Notice how you feel after this practice. Has your mood shifted? Do you feel more open or aware of the positive aspects of your life?",
        type: "instruction",
      },
    ],
    benefits: [
      "Increases positive emotions",
      "Reduces negative thinking patterns",
      "Improves sleep quality",
      "Enhances empathy and reduces aggression",
      "Strengthens resilience during challenging times",
    ],
    imageSrc: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=500&auto=format&fit=crop",
  },
  "creative-visualization": {
    id: "creative-visualization",
    title: "Creative Visualization",
    description: "Use your imagination to visualize positive outcomes and manifest your goals.",
    longDescription:
      "Creative visualization is a mindfulness technique that uses the power of imagination to create positive changes in your life. By visualizing desired outcomes with all your senses, you can enhance motivation, reduce anxiety about future events, and align your actions with your goals.",
    icon: <Lightbulb size={24} />,
    category: "creative",
    difficulty: "intermediate",
    duration: 900, // 15 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable position where you won't be disturbed. Close your eyes and take several deep breaths to relax your body and clear your mind.",
        type: "instruction",
      },
      {
        title: "Goal Setting",
        instruction:
          "Think of a specific goal or outcome you'd like to manifest. Make it clear, positive, and meaningful to you. What would achieving this goal look and feel like?",
        type: "input",
      },
      {
        title: "Relaxation",
        instruction:
          "Deepen your relaxation. Imagine a peaceful light or warmth flowing through your body from head to toe, releasing any tension.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Visualization",
        instruction:
          "Now, imagine yourself having already achieved your goal. Create a vivid mental image with as much detail as possible. What do you see? What sounds do you hear? What physical sensations do you feel?",
        type: "visualization",
        duration: 180,
      },
      {
        title: "Emotional Connection",
        instruction:
          "Connect with the emotions of having achieved your goal. Feel the satisfaction, joy, pride, or peace that comes with this achievement. Let these positive emotions fill your entire being.",
        type: "timed",
        duration: 120,
      },
      {
        title: "Affirmation",
        instruction:
          "Create a positive affirmation that supports your visualization. Repeat it silently to yourself several times, feeling the truth of these words.",
        type: "input",
      },
      {
        title: "Integration",
        instruction:
          "Consider what steps you can take in reality to move toward this goal. See yourself taking these actions with confidence and ease.",
        type: "timed",
        duration: 120,
      },
      {
        title: "Completion",
        instruction:
          "Gradually bring your awareness back to the present moment. Take a few deep breaths and, when you're ready, open your eyes, carrying the positive energy of your visualization with you.",
        type: "instruction",
      },
    ],
    benefits: [
      "Increases motivation and commitment to goals",
      "Reduces anxiety about future events",
      "Improves performance in various activities",
      "Enhances creative problem-solving abilities",
      "Builds confidence and positive self-image",
    ],
    imageSrc: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=500&auto=format&fit=crop",
  },
  "present-moment": {
    id: "present-moment",
    title: "Present Moment",
    description: "A guided exercise to bring your awareness fully into the present moment.",
    longDescription:
      "This practice helps you develop the skill of present moment awareness, which is at the heart of mindfulness. By intentionally bringing your attention to your current experience without judgment, you can reduce stress, increase joy, and develop greater clarity and focus.",
    icon: <Clock size={24} />,
    category: "mindfulness",
    difficulty: "beginner",
    duration: 480, // 8 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable seated position. Allow your back to be straight but not rigid. Rest your hands wherever they feel comfortable. Take a few deep breaths to settle in.",
        type: "instruction",
      },
      {
        title: "Sensory Awareness",
        instruction:
          "Begin by noticing five things you can see in your environment. Observe colors, shapes, light, and shadows with curiosity.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Sound Awareness",
        instruction:
          "Now shift your attention to four things you can hear. Notice sounds both near and far, loud and subtle. There's no need to label or judge them, just listen.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Touch Awareness",
        instruction:
          "Bring your awareness to three things you can feel. Notice the sensation of your clothing against your skin, the temperature of the air, the texture of surfaces you're touching.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Smell & Taste",
        instruction:
          "Notice two things you can smell or taste right now. Even subtle sensations count. If you can't detect anything, simply notice that fact with curiosity.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Breath Awareness",
        instruction:
          "Finally, focus on one thing: your breath. Feel the sensations of breathing without trying to control it. Notice the rise and fall of your chest and abdomen.",
        type: "breathing",
        duration: 120,
      },
      {
        title: "Open Awareness",
        instruction:
          "Now expand your awareness to include your entire experience in this moment - sights, sounds, sensations, thoughts, and emotions. Hold it all in a spacious awareness.",
        type: "timed",
        duration: 60,
      },
      {
        title: "Completion",
        instruction:
          "Gently bring your practice to a close. Take a moment to appreciate giving yourself this time. Carry this present moment awareness with you as you continue your day.",
        type: "instruction",
      },
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Increases focus and concentration",
      "Enhances enjoyment of daily experiences",
      "Improves emotional regulation",
      "Develops greater self-awareness",
    ],
    imageSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=500&auto=format&fit=crop",
  },
}

// For any exercise ID not explicitly defined, use this template
const createDefaultExercise = (id: string): Exercise => {
  // Convert kebab-case to Title Case
  const title = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    id,
    title,
    description: `A mindfulness exercise to enhance your mental well-being.`,
    longDescription: `This exercise helps you develop greater awareness and presence in your daily life. Regular practice can lead to reduced stress, improved focus, and enhanced emotional well-being.`,
    icon: <Sparkles size={24} />,
    category: "mindfulness",
    difficulty: "beginner",
    duration: 300, // 5 minutes
    steps: [
      {
        title: "Preparation",
        instruction:
          "Find a comfortable position where you won't be disturbed. Take a few deep breaths to center yourself.",
        type: "instruction",
      },
      {
        title: "Practice",
        instruction: `Begin the ${title} exercise by focusing your attention on your present experience.`,
        type: "timed",
        duration: 240,
      },
      {
        title: "Completion",
        instruction:
          "Gradually bring your awareness back to your surroundings. Notice how you feel after this practice.",
        type: "instruction",
      },
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus and concentration",
      "Enhances emotional well-being",
      "Promotes self-awareness",
    ],
    imageSrc: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=500&auto=format&fit=crop",
  }
}

export default function ExercisePage({ params }: { params: { id: string } }) {
  const { id } = params
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  // Get exercise data or create default if not found
  const exercise = exercisesData[id] || createDefaultExercise(id)

  // If the exercise doesn't exist in our data and isn't a valid ID from the list, return 404
  const validExerciseIds = [
    "deep-breathing",
    "breathing-rhythm",
    "hypnotic-relaxation",
    "self-love-meditation",
    "mindful-body-scan",
    "self-hypnosis",
    "loving-kindness",
    "gratitude-journal",
    "memory-match",
    "creative-visualization",
    "emotion-wheel",
    "focus-flow",
    "sound-meditation",
    "mindful-eating",
    "brain-teasers",
    "creative-expression",
    "mindful-walking",
    "pattern-recognition",
    "emotional-awareness",
    "dream-journaling",
    "present-moment",
    "morning-intention",
    "evening-reflection",
    "nature-connection",
  ]

  if (!validExerciseIds.includes(id)) {
    notFound()
  }

  // Initialize audio if available
  useEffect(() => {
    if (exercise.audioSrc && !audioElement) {
      const audio = new Audio(exercise.audioSrc)
      audio.loop = true
      audio.volume = 0.3
      setAudioElement(audio)
    }

    return () => {
      if (audioElement) {
        audioElement.pause()
        setAudioElement(null)
      }
    }
  }, [exercise.audioSrc, audioElement])

  // Handle timer for timed steps
  useEffect(() => {
    const currentStepData = exercise.steps[currentStep]

    if (
      currentStepData &&
      (currentStepData.type === "timed" ||
        currentStepData.type === "breathing" ||
        currentStepData.type === "visualization") &&
      currentStepData.duration
    ) {
      setTimeLeft(currentStepData.duration)

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }

    return undefined
  }, [currentStep, exercise.steps])

  // Handle breathing phases
  useEffect(() => {
    if (exercise.steps[currentStep]?.type === "breathing") {
      const breathTimer = setInterval(() => {
        setBreathPhase((prev) => {
          switch (prev) {
            case "inhale":
              return "hold"
            case "hold":
              return "exhale"
            case "exhale":
              return "rest"
            case "rest":
              return "inhale"
            default:
              return "inhale"
          }
        })
      }, 4000) // 4 seconds per phase

      return () => clearInterval(breathTimer)
    }
  }, [currentStep, exercise.steps])

  // Auto-advance when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      // Small delay before advancing to next step
      const timeout = setTimeout(() => {
        handleNext()
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [timeLeft])

  // Toggle audio playback
  const toggleAudio = () => {
    if (!audioElement) return

    if (isAudioPlaying) {
      audioElement.pause()
    } else {
      audioElement.play().catch((e) => console.log("Audio playback failed", e))
    }

    setIsAudioPlaying(!isAudioPlaying)
  }

  // Handle next step
  const handleNext = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponses({
      ...responses,
      [currentStep]: e.target.value,
    })
  }

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / exercise.steps.length) * 100

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

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

  // Render current step content
  const renderStepContent = () => {
    const step = exercise.steps[currentStep]

    if (!step) return null

    switch (step.type) {
      case "instruction":
        return (
          <div className="bg-violet-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700">{step.instruction}</p>
          </div>
        )

      case "timed":
        return (
          <div className="bg-violet-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700 mb-4">{step.instruction}</p>
            {timeLeft !== null && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-violet-200 flex items-center justify-center text-violet-800 text-xl font-medium mb-2">
                  {formatTime(timeLeft)}
                </div>
                <Progress
                  value={((step.duration! - timeLeft) / step.duration!) * 100}
                  className="w-full max-w-md h-2"
                />
              </div>
            )}
          </div>
        )

      case "breathing":
        return (
          <div className="bg-violet-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700 mb-6">{step.instruction}</p>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <motion.div
                  className="absolute inset-0 bg-violet-200 rounded-full"
                  animate={{
                    scale: breathPhase === "inhale" || breathPhase === "hold" ? 1.5 : 1,
                    opacity: [0.7, 0.9, 0.9, 0.7, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-violet-800 font-medium">
                  {timeLeft !== null && formatTime(timeLeft)}
                </div>
              </div>
              <p className="text-violet-700 text-lg font-medium mb-2">
                {breathPhase === "inhale" && "Breathe in..."}
                {breathPhase === "hold" && "Hold..."}
                {breathPhase === "exhale" && "Breathe out..."}
                {breathPhase === "rest" && "Rest..."}
              </p>
            </div>
          </div>
        )

      case "visualization":
        return (
          <div className="bg-violet-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700 mb-6">{step.instruction}</p>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white text-xl font-medium mb-2">
                {timeLeft !== null && formatTime(timeLeft)}
              </div>
              <Progress
                value={((step.duration! - (timeLeft || 0)) / step.duration!) * 100}
                className="w-full max-w-md h-2"
              />
            </div>
          </div>
        )

      case "input":
        return (
          <div className="bg-violet-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700 mb-4">{step.instruction}</p>
            <textarea
              className="w-full p-3 rounded-lg border border-violet-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent min-h-[120px]"
              placeholder="Type your response here..."
              value={responses[currentStep] || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
        )

      case "choice":
        return (
          <div className="bg-violet-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700 mb-4">{step.instruction}</p>
            <div className="space-y-2">
              {step.options?.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 text-left rounded-lg border ${
                    responses[currentStep] === option
                      ? "bg-violet-100 border-violet-300"
                      : "bg-white border-slate-200 hover:bg-violet-50"
                  }`}
                  onClick={() => setResponses({ ...responses, [currentStep]: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Render completion screen
  const renderCompletionScreen = () => {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Exercise Complete!</h2>
          <p className="text-slate-600">
            Congratulations on completing the {exercise.title} exercise. Take a moment to notice how you feel.
          </p>
        </div>

        {Object.keys(responses).length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Your Responses</h3>
            <div className="space-y-4">
              {Object.entries(responses).map(([stepIndex, response]) => (
                <div key={stepIndex} className="bg-violet-50 rounded-lg p-4">
                  <p className="font-medium text-slate-700 mb-2">{exercise.steps[Number.parseInt(stepIndex)].title}</p>
                  <p className="text-slate-600">{response}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-violet-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-medium text-slate-800 mb-3">Benefits of This Practice</h3>
          <ul className="space-y-2">
            {exercise.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-slate-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              setCurrentStep(0)
              setIsComplete(false)
              setResponses({})
              setTimeLeft(null)
            }}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            Practice Again
          </Button>
          <Button
            onClick={() => (window.location.href = "/mind-exercises")}
            variant="outline"
            className="border-violet-300 text-violet-700"
          >
            Back to Exercises
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gradient-to-b from-white to-violet-50">
      <div className="container max-w-4xl mx-auto px-4">
        {isComplete ? (
          renderCompletionScreen()
        ) : (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mr-4">
                  {exercise.icon}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-slate-800">{exercise.title}</h1>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(exercise.difficulty)} mr-2`}
                    >
                      {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {Math.ceil(exercise.duration / 60)} min
                    </span>
                  </div>
                </div>
              </div>

              {exercise.audioSrc && (
                <button
                  onClick={toggleAudio}
                  className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"
                  aria-label={isAudioPlaying ? "Mute background sounds" : "Play background sounds"}
                >
                  {isAudioPlaying ? (
                    <Volume2 size={18} className="text-violet-600" />
                  ) : (
                    <VolumeX size={18} className="text-slate-500" />
                  )}
                </button>
              )}
            </div>

            <div className="mb-8">
              <p className="text-slate-600">{exercise.longDescription}</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>
                  Step {currentStep + 1} of {exercise.steps.length}
                </span>
                <span>{exercise.steps[currentStep]?.title}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {renderStepContent()}

            <div className="flex justify-between">
              <Button onClick={handlePrev} variant="outline" className="border-slate-200" disabled={currentStep === 0}>
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                className="bg-violet-600 hover:bg-violet-700 text-white"
                disabled={
                  (exercise.steps[currentStep]?.type === "input" && !responses[currentStep]) ||
                  (exercise.steps[currentStep]?.type === "choice" && !responses[currentStep])
                }
              >
                {currentStep === exercise.steps.length - 1 ? "Complete" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
