"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      audioRef.current = new Audio("/placeholder.svg") // This will fail gracefully
      audioRef.current.loop = true
      audioRef.current.volume = volume
    } catch (error) {
      console.log("Audio file not available")
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    try {
      if (isPlaying) {
        audioRef.current?.pause()
      } else {
        audioRef.current?.play().catch((e) => console.log("Audio playback failed"))
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.log("Audio playback error")
    }
  }

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
      aria-label={isPlaying ? "Mute ocean sounds" : "Play ocean sounds"}
    >
      {isPlaying ? <Volume2 size={20} className="text-violet-600" /> : <VolumeX size={20} className="text-slate-500" />}
    </button>
  )
}

export default AudioPlayer
