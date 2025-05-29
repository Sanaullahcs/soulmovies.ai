"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioContextRef = useRef<AudioContext | null>(null)
  const soundNodesRef = useRef<any[]>([])

  const createEnhancedForestAmbience = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume()
      }

      const ctx = audioContextRef.current
      const nodes: any[] = []

      // 🌊 DISTANT WATERFALL/FLOWING STREAM - Enhanced with echo
      const waterfallNoise = ctx.createBufferSource()
      const waterfallBuffer = ctx.createBuffer(2, ctx.sampleRate * 15, ctx.sampleRate)

      for (let channel = 0; channel < 2; channel++) {
        const waterfallData = waterfallBuffer.getChannelData(channel)
        for (let i = 0; i < waterfallData.length; i++) {
          const noise = (Math.random() * 2 - 1) * 0.4
          const cascade = Math.sin(i * 0.001) * Math.sin(i * 0.0008) * 0.7
          const flow = Math.sin(i * 0.003) * 0.3
          const sparkle = Math.sin(i * 0.01) * 0.2 // Added sparkle
          waterfallData[i] = noise * cascade + flow * 0.4 + sparkle * 0.1
        }
      }

      waterfallNoise.buffer = waterfallBuffer
      waterfallNoise.loop = true

      const waterfallFilter = ctx.createBiquadFilter()
      waterfallFilter.type = "lowpass"
      waterfallFilter.frequency.setValueAtTime(1500, ctx.currentTime)

      const waterfallGain = ctx.createGain()
      waterfallGain.gain.setValueAtTime(volume * 0.35, ctx.currentTime)

      waterfallNoise.connect(waterfallFilter)
      waterfallFilter.connect(waterfallGain)
      waterfallGain.connect(ctx.destination)
      waterfallNoise.start()

      nodes.push({ source: waterfallNoise, gain: waterfallGain })

      // 🍃 ENHANCED WIND WITH TREE CREAKING
      const windNoise = ctx.createBufferSource()
      const windBuffer = ctx.createBuffer(2, ctx.sampleRate * 20, ctx.sampleRate)

      for (let channel = 0; channel < 2; channel++) {
        const windData = windBuffer.getChannelData(channel)
        for (let i = 0; i < windData.length; i++) {
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

      const windGain = ctx.createGain()
      windGain.gain.setValueAtTime(volume * 0.25, ctx.currentTime)

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

      // 🦅 COOL BIRD SOUNDS - Enhanced with exotic species
      const coolBirds = [
        { name: "Loon", freq: 600, pattern: "haunting", volume: 0.15, delay: 3000 },
        { name: "Hawk", freq: 1000, pattern: "screech", volume: 0.12, delay: 8000 },
        { name: "Raven", freq: 400, pattern: "caw", volume: 0.14, delay: 12000 },
        { name: "Nightingale", freq: 1800, pattern: "melodic", volume: 0.16, delay: 5000 },
        { name: "Woodpecker", freq: 800, pattern: "drum", volume: 0.13, delay: 15000 },
        { name: "Mockingbird", freq: 1400, pattern: "mimic", volume: 0.15, delay: 18000 },
      ]

      const createCoolBird = (bird: any) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const birdOsc = ctx.createOscillator()
          const birdGain = ctx.createGain()
          const birdFilter = ctx.createBiquadFilter()

          birdOsc.type = "sine"
          birdFilter.type = "bandpass"
          birdFilter.frequency.setValueAtTime(bird.freq, ctx.currentTime)
          birdFilter.Q.setValueAtTime(8, ctx.currentTime)

          const now = ctx.currentTime

          switch (bird.pattern) {
            case "haunting": // Loon - mystical call
              birdOsc.frequency.setValueAtTime(bird.freq, now)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq * 0.5, now + 1.0)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq * 1.2, now + 2.0)
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.3)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5)
              break

            case "screech": // Hawk - sharp cry
              birdOsc.frequency.setValueAtTime(bird.freq * 2, now)
              birdOsc.frequency.exponentialRampToValueAtTime(bird.freq, now + 0.8)
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.1)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0)
              break

            case "caw": // Raven - deep caw
              for (let i = 0; i < 3; i++) {
                const cawTime = now + i * 0.4
                birdOsc.frequency.setValueAtTime(bird.freq, cawTime)
                birdGain.gain.setValueAtTime(0, cawTime)
                birdGain.gain.linearRampToValueAtTime(volume * bird.volume, cawTime + 0.05)
                birdGain.gain.exponentialRampToValueAtTime(0.001, cawTime + 0.3)
              }
              break

            case "melodic": // Nightingale - beautiful song
              const melody = [1.0, 1.3, 1.6, 1.2, 0.8, 1.4, 1.0]
              melody.forEach((mult, i) => {
                const noteTime = now + i * 0.2
                birdOsc.frequency.setValueAtTime(bird.freq * mult, noteTime)
              })
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.1)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5)
              break

            case "drum": // Woodpecker - rhythmic drumming
              for (let i = 0; i < 8; i++) {
                const drumTime = now + i * 0.1
                birdOsc.frequency.setValueAtTime(bird.freq, drumTime)
                birdGain.gain.setValueAtTime(0, drumTime)
                birdGain.gain.linearRampToValueAtTime(volume * bird.volume, drumTime + 0.02)
                birdGain.gain.exponentialRampToValueAtTime(0.001, drumTime + 0.08)
              }
              break

            case "mimic": // Mockingbird - varied calls
              const mimicPattern = [1.0, 1.5, 0.7, 1.8, 0.9, 1.3]
              mimicPattern.forEach((mult, i) => {
                const mimicTime = now + i * 0.3
                birdOsc.frequency.setValueAtTime(bird.freq * mult, mimicTime)
              })
              birdGain.gain.setValueAtTime(0, now)
              birdGain.gain.linearRampToValueAtTime(volume * bird.volume, now + 0.05)
              birdGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8)
              break
          }

          birdOsc.connect(birdFilter)
          birdFilter.connect(birdGain)
          birdGain.connect(ctx.destination)

          birdOsc.start(now)
          birdOsc.stop(now + 3.0)

          // Schedule next call
          const nextDelay = Math.random() * 20000 + 10000 // 10-30 seconds
          createCoolBird(bird)
        }, bird.delay)
      }

      coolBirds.forEach((bird) => createCoolBird(bird))

      // 🌙 MYSTICAL FOREST CHIMES - Wind chimes effect
      const createWindChimes = (delay: number) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const chimeFreqs = [523, 659, 784, 880, 1047] // C major pentatonic
          const randomChimes = Math.floor(Math.random() * 3) + 2 // 2-4 chimes

          for (let i = 0; i < randomChimes; i++) {
            setTimeout(() => {
              const chimeOsc = ctx.createOscillator()
              const chimeGain = ctx.createGain()

              chimeOsc.type = "sine"
              chimeOsc.frequency.setValueAtTime(
                chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)],
                ctx.currentTime,
              )

              const now = ctx.currentTime
              chimeGain.gain.setValueAtTime(0, now)
              chimeGain.gain.linearRampToValueAtTime(volume * 0.08, now + 0.1)
              chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0)

              chimeOsc.connect(chimeGain)
              chimeGain.connect(ctx.destination)
              chimeOsc.start(now)
              chimeOsc.stop(now + 3.5)
            }, i * 200)
          }

          // Schedule next chimes
          const nextDelay = Math.random() * 40000 + 30000 // 30-70 seconds
          createWindChimes(nextDelay)
        }, delay)
      }

      createWindChimes(20000) // First chimes after 20 seconds

      // 🦗 CRICKET SYMPHONY - Evening crickets
      const createCrickets = () => {
        const cricketOsc = ctx.createOscillator()
        const cricketGain = ctx.createGain()
        const cricketFilter = ctx.createBiquadFilter()

        cricketOsc.type = "square"
        cricketOsc.frequency.setValueAtTime(3000, ctx.currentTime)

        cricketFilter.type = "bandpass"
        cricketFilter.frequency.setValueAtTime(3000, ctx.currentTime)
        cricketFilter.Q.setValueAtTime(5, ctx.currentTime)

        cricketGain.gain.setValueAtTime(0, ctx.currentTime)
        cricketGain.gain.linearRampToValueAtTime(volume * 0.06, ctx.currentTime + 10)

        // Add cricket rhythm modulation
        const cricketLFO = ctx.createOscillator()
        const cricketLFOGain = ctx.createGain()
        cricketLFO.frequency.setValueAtTime(8, ctx.currentTime) // 8 Hz chirping
        cricketLFOGain.gain.setValueAtTime(volume * 0.03, ctx.currentTime)
        cricketLFO.connect(cricketLFOGain)
        cricketLFOGain.connect(cricketGain.gain)
        cricketLFO.start()

        cricketOsc.connect(cricketFilter)
        cricketFilter.connect(cricketGain)
        cricketGain.connect(ctx.destination)
        cricketOsc.start()

        nodes.push({ source: cricketOsc, gain: cricketGain, lfo: cricketLFO })
      }

      createCrickets()

      // 🌲 TREE CREAKING - Occasional wood creaking
      const createTreeCreak = (delay: number) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const creakOsc = ctx.createOscillator()
          const creakGain = ctx.createGain()
          const creakFilter = ctx.createBiquadFilter()

          creakOsc.type = "sawtooth"
          creakOsc.frequency.setValueAtTime(80, ctx.currentTime)

          creakFilter.type = "lowpass"
          creakFilter.frequency.setValueAtTime(200, ctx.currentTime)

          const now = ctx.currentTime
          creakOsc.frequency.linearRampToValueAtTime(120, now + 1.0)
          creakOsc.frequency.linearRampToValueAtTime(60, now + 2.0)

          creakGain.gain.setValueAtTime(0, now)
          creakGain.gain.linearRampToValueAtTime(volume * 0.1, now + 0.3)
          creakGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5)

          creakOsc.connect(creakFilter)
          creakFilter.connect(creakGain)
          creakGain.connect(ctx.destination)

          creakOsc.start(now)
          creakOsc.stop(now + 3.0)

          // Schedule next creak
          const nextDelay = Math.random() * 50000 + 30000 // 30-80 seconds
          createTreeCreak(nextDelay)
        }, delay)
      }

      createTreeCreak(25000) // First creak after 25 seconds

      // 🦉 ENHANCED OWL CALLS - Multiple owl species
      const createOwlCall = (delay: number) => {
        setTimeout(() => {
          if (!audioContextRef.current) return

          const owlTypes = ["hoot", "screech", "barn"]
          const owlType = owlTypes[Math.floor(Math.random() * owlTypes.length)]

          const owlOsc = ctx.createOscillator()
          const owlGain = ctx.createGain()
          const owlFilter = ctx.createBiquadFilter()

          const now = ctx.currentTime

          switch (owlType) {
            case "hoot":
              owlOsc.type = "sine"
              owlOsc.frequency.setValueAtTime(400, now)
              owlOsc.frequency.setValueAtTime(350, now + 0.3)
              owlOsc.frequency.setValueAtTime(400, now + 0.6)
              owlFilter.frequency.setValueAtTime(600, now)
              break

            case "screech":
              owlOsc.type = "sawtooth"
              owlOsc.frequency.setValueAtTime(800, now)
              owlOsc.frequency.exponentialRampToValueAtTime(400, now + 1.0)
              owlFilter.frequency.setValueAtTime(1000, now)
              break

            case "barn":
              owlOsc.type = "square"
              owlOsc.frequency.setValueAtTime(600, now)
              owlOsc.frequency.linearRampToValueAtTime(500, now + 0.8)
              owlFilter.frequency.setValueAtTime(800, now)
              break
          }

          owlFilter.type = "lowpass"
          owlFilter.Q.setValueAtTime(2, now)

          owlGain.gain.setValueAtTime(0, now)
          owlGain.gain.linearRampToValueAtTime(volume * 0.1, now + 0.1)
          owlGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5)

          owlOsc.connect(owlFilter)
          owlFilter.connect(owlGain)
          owlGain.connect(ctx.destination)

          owlOsc.start(now)
          owlOsc.stop(now + 2.0)

          // Schedule next owl
          const nextDelay = Math.random() * 60000 + 40000 // 40-100 seconds
          createOwlCall(nextDelay)
        }, delay)
      }

      createOwlCall(35000) // First owl after 35 seconds

      // 🌟 DEEP FOREST RESONANCE WITH HARMONICS
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
      console.log("🎵 Enhanced forest ambience with cool sounds started!")
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
        await createEnhancedForestAmbience()
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
      aria-label={isPlaying ? "Stop enhanced forest" : "Play enhanced forest"}
    >
      {isPlaying ? <Volume2 size={20} className="text-violet-600" /> : <VolumeX size={20} className="text-slate-500" />}
    </button>
  )
}

export default AudioPlayer
