"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioContextRef = useRef<AudioContext | null>(null)
  const soundNodesRef = useRef<any[]>([])

  const createForestAmbience = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume()
      }

      const ctx = audioContextRef.current
      const nodes: any[] = []

      // 🌊 DISTANT WATERFALL/FLOWING STREAM - Background water sounds
      const waterfallNoise = ctx.createBufferSource()
      const waterfallBuffer = ctx.createBuffer(2, ctx.sampleRate * 15, ctx.sampleRate)

      for (let channel = 0; channel < 2; channel++) {
        const waterfallData = waterfallBuffer.getChannelData(channel)
        for (let i = 0; i < waterfallData.length; i++) {
          // Create distant waterfall texture
          const noise = (Math.random() * 2 - 1) * 0.4
          const cascade = Math.sin(i * 0.001) * Math.sin(i * 0.0008) * 0.7
          const flow = Math.sin(i * 0.003) * 0.3
          waterfallData[i] = noise * cascade + flow * 0.4
        }
      }

      waterfallNoise.buffer = waterfallBuffer
      waterfallNoise.loop = true

      const waterfallFilter = ctx.createBiquadFilter()
      waterfallFilter.type = "lowpass"
      waterfallFilter.frequency.setValueAtTime(1500, ctx.currentTime)
      waterfallFilter.Q.setValueAtTime(0.7, ctx.currentTime)

      const waterfallGain = ctx.createGain()
      waterfallGain.gain.setValueAtTime(volume * 0.35, ctx.currentTime)

      waterfallNoise.connect(waterfallFilter)
      waterfallFilter.connect(waterfallGain)
      waterfallGain.connect(ctx.destination)
      waterfallNoise.start()

      nodes.push({ source: waterfallNoise, gain: waterfallGain })

      // 🍃 GENTLE WIND THROUGH TREES - Continuous forest breeze
      const windNoise = ctx.createBufferSource()
      const windBuffer = ctx.createBuffer(2, ctx.sampleRate * 20, ctx.sampleRate)

      for (let channel = 0; channel < 2; channel++) {
        const windData = windBuffer.getChannelData(channel)
        for (let i = 0; i < windData.length; i++) {
          // Create gentle wind through forest
          const noise = (Math.random() * 2 - 1) * 0.15
          const wind = Math.sin(i * 0.0002) * Math.sin(i * 0.0001) * 0.8
          const gust = Math.sin(i * 0.0005) * 0.3
          windData[i] = noise * wind + gust * 0.2
        }
      }

      windNoise.buffer = windBuffer
      windNoise.loop = true

      const windFilter = ctx.createBiquadFilter()
      windFilter.type = "bandpass"
      windFilter.frequency.setValueAtTime(400, ctx.currentTime)
      windFilter.Q.setValueAtTime(0.5, ctx.currentTime)

      const windGain = ctx.createGain()
      windGain.gain.setValueAtTime(volume * 0.25, ctx.currentTime)

      // Add gentle wind modulation
      const windLFO = ctx.createOscillator()
      const windLFOGain = ctx.createGain()
      windLFO.frequency.setValueAtTime(0.08, ctx.currentTime)
      windLFOGain.gain.setValueAtTime(volume * 0.05, ctx.currentTime)
      windLFO.connect(windLFOGain)
      windLFOGain.connect(windGain.gain)
      windLFO.start()

      windNoise.connect(windFilter)
      windFilter.connect(windGain)
      windGain.connect(ctx.destination)
      windNoise.start()

      nodes.push({ source: windNoise, gain: windGain, lfo: windLFO })

      // 🐦 FOREST BIRDS CHIRPING - Various species throughout the forest
      const forestBirds = [
        { name: "Wood Thrush", freq: 800, pattern: "flute", volume: 0.18, delay: 2000 },
        { name: "Robin", freq: 1200, pattern: "cheerful", volume: 0.16, delay: 4000 },
        { name: "Wren", freq: 1600, pattern: "trill", volume: 0.14, delay: 6000 },
        { name: "Warbler", freq: 1400, pattern: "sweet", volume: 0.15, delay: 8000 },
        { name: "Chickadee", freq: 1100, pattern: "chick", volume: 0.13, delay: 10000 },
      ]

      const createForestBird = (bird: any) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const birdOsc = ctx.createOscillator()
          const birdGain = ctx.createGain()
          const birdFilter = ctx.createBiquadFilter()

          birdOsc.type = "sine"
          birdFilter.type = "bandpass"
          birdFilter.frequency.setValueAtTime(bird.freq, ctx.currentTime)
          birdFilter.Q.setValueAtTime(10, ctx.currentTime)

          const now = ctx.currentTime

          switch (bird.pattern) {
            case "flute":
              birdOsc.frequency.setValueAtTime(bird.freq, now)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq * 1.5, now + 0.3)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq * 0.8, now + 0.6)
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.1)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
              break

            case "cheerful":
              birdOsc.frequency.setValueAtTime(bird.freq, now)
              birdOsc.frequency.linearRampToValueAtTime(bird.freq * 1.3, now + 0.2)
              birdOsc.frequency.linearRampToValueAtTime(bird.freq * 0.9, now + 0.4)
              birdOsc.frequency.linearRampToValueAtTime(bird.freq * 1.1, now + 0.6)
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.05)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7)
              break

            case "trill":
              for (let i = 0; i < 8; i++) {
                const trillTime = now + i * 0.06
                birdOsc.frequency.setValueAtTime(bird.freq + (i % 2) * 150, trillTime)
              }
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.03)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
              break

            case "sweet":
              birdOsc.frequency.setValueAtTime(bird.freq, now)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq * 1.4, now + 0.25)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq * 0.9, now + 0.5)
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.08)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
              break

            case "chick":
              const chickPattern = [1.0, 1.2, 0.8, 0.8]
              chickPattern.forEach((mult, i) => {
                const chickTime = now + i * 0.1
                birdOsc.frequency.setValueAtTime(bird.freq * mult, chickTime)
              })
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.02)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
              break
          }

          birdOsc.connect(birdFilter)
          birdFilter.connect(birdGain)
          birdGain.connect(ctx.destination)

          birdOsc.start(now)
          birdOsc.stop(now + 1.0)

          // Schedule next bird call
          const nextDelay = Math.random() * 12000 + 6000 // 6-18 seconds
          createForestBird(bird)
        }, bird.delay)
      }

      // Start forest birds
      forestBirds.forEach((bird) => createForestBird(bird))

      // 🍂 OCCASIONAL LEAVES RUSTLING - Random rustling sounds
      const createLeafRustle = (delay: number) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const rustleNoise = ctx.createBufferSource()
          const rustleBuffer = ctx.createBuffer(2, ctx.sampleRate * 2, ctx.sampleRate)

          for (let channel = 0; channel < 2; channel++) {
            const rustleData = rustleBuffer.getChannelData(channel)
            for (let i = 0; i < rustleData.length; i++) {
              const noise = (Math.random() * 2 - 1) * 0.3
              const rustle = Math.sin(i * 0.01) * Math.exp(-i * 0.00001) * 0.8
              rustleData[i] = noise * rustle
            }
          }

          rustleNoise.buffer = rustleBuffer

          const rustleFilter = ctx.createBiquadFilter()
          rustleFilter.type = "highpass"
          rustleFilter.frequency.setValueAtTime(800, ctx.currentTime)

          const rustleGain = ctx.createGain()
          const now = ctx.currentTime
          rustleGain.gain.setValueAtTime(0, now)
          rustleGain.gain.linearRampToValueAtTime(volume * 0.12, now + 0.1)
          rustleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5)

          rustleNoise.connect(rustleFilter)
          rustleFilter.connect(rustleGain)
          rustleGain.connect(ctx.destination)
          rustleNoise.start()

          // Schedule next rustle
          const nextDelay = Math.random() * 25000 + 15000 // 15-40 seconds
          createLeafRustle(nextDelay)
        }, delay)
      }

      createLeafRustle(8000) // First rustle after 8 seconds

      // 🦉 DISTANT OWL - Very occasional owl calls
      const createOwlCall = (delay: number) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const owlOsc = ctx.createOscillator()
          const owlGain = ctx.createGain()
          const owlFilter = ctx.createBiquadFilter()

          owlOsc.type = "sine"
          owlOsc.frequency.setValueAtTime(400, ctx.currentTime)

          owlFilter.type = "lowpass"
          owlFilter.frequency.setValueAtTime(600, ctx.currentTime)
          owlFilter.Q.setValueAtTime(2, ctx.currentTime)

          const now = ctx.currentTime
          // Create "hoo-hoo" pattern
          owlOsc.frequency.setValueAtTime(400, now)
          owlOsc.frequency.setValueAtTime(350, now + 0.3)
          owlOsc.frequency.setValueAtTime(400, now + 0.6)
          owlOsc.frequency.setValueAtTime(350, now + 0.9)

          owlGain.gain.setValueAtTime(0, now)
          owlGain.gain.linearRampToValueAtTime(volume * 0.08, now + 0.1)
          owlGain.gain.setValueAtTime(volume * 0.08, now + 0.25)
          owlGain.gain.setValueAtTime(0, now + 0.35)
          owlGain.gain.linearRampToValueAtTime(volume * 0.08, now + 0.55)
          owlGain.gain.setValueAtTime(volume * 0.08, now + 0.8)
          owlGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

          owlOsc.connect(owlFilter)
          owlFilter.connect(owlGain)
          owlGain.connect(ctx.destination)

          owlOsc.start(now)
          owlOsc.stop(now + 1.5)

          // Schedule next owl call - very infrequent
          const nextDelay = Math.random() * 60000 + 45000 // 45-105 seconds
          createOwlCall(nextDelay)
        }, delay)
      }

      createOwlCall(30000) // First owl after 30 seconds

      // 🌲 DEEP FOREST RESONANCE - Low frequency forest atmosphere
      const forestResonance = ctx.createOscillator()
      const resonanceGain = ctx.createGain()

      forestResonance.type = "triangle"
      forestResonance.frequency.setValueAtTime(45, ctx.currentTime)

      resonanceGain.gain.setValueAtTime(0, ctx.currentTime)
      resonanceGain.gain.linearRampToValueAtTime(volume * 0.08, ctx.currentTime + 8)

      forestResonance.connect(resonanceGain)
      resonanceGain.connect(ctx.destination)
      forestResonance.start()

      nodes.push({ source: forestResonance, gain: resonanceGain })

      soundNodesRef.current = nodes
      console.log("🐦 Birds + 🌊 Stream + 🍃 Wind forest ambience started!")
    } catch (error) {
      console.error("Audio creation failed:", error)
      throw error
    }
  }

  const stopSounds = () => {
    soundNodesRef.current.forEach((node) => {
      try {
        if (node.source && node.source.stop) {
          node.source.stop()
        }
        if (node.lfo && node.lfo.stop) {
          node.lfo.stop()
        }
      } catch (e) {
        // Node might already be stopped
      }
    })

    if (audioContextRef.current) {
      audioContextRef.current.close()
    }

    soundNodesRef.current = []
    audioContextRef.current = null
  }

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        stopSounds()
        setIsPlaying(false)
      } else {
        await createForestAmbience()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Audio toggle failed:", error)
      setIsPlaying(false)
    }
  }

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
      aria-label={isPlaying ? "Stop forest ambience" : "Play forest ambience"}
    >
      {isPlaying ? <Volume2 size={20} className="text-violet-600" /> : <VolumeX size={20} className="text-slate-500" />}
    </button>
  )
}

export default AudioPlayer
