"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/audio/pure-theta-4-7hz-with-emotional.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = volume

    // Cleanup on unmount
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

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Audio playback failed:", error)
      setIsPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Volume Control */}
      {isPlaying && (
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg flex items-center gap-2">
          <VolumeX size={14} className="text-slate-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
            className="w-16 h-1 bg-violet-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <Volume2 size={14} className="text-violet-600" />
        </div>
      )}

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group"
        aria-label={isPlaying ? "Pause theta meditation audio" : "Play theta meditation audio"}
      >
        {isPlaying ? (
          <Pause size={20} className="text-violet-600 group-hover:scale-110 transition-transform" />
        ) : (
          <Play size={20} className="text-violet-600 group-hover:scale-110 transition-transform ml-0.5" />
        )}
      </button>

      {/* Audio Description */}
      <div className="text-xs text-slate-600 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
        Theta Meditation Audio
      </div>
    </div>
  )
}

export default AudioPlayer
