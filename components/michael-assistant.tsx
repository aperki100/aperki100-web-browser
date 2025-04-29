"use client"

import { useState, useEffect, useRef } from "react"
import { X, Mic, Clock, Search, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MichaelAssistantProps {
  onClose: () => void
}

export default function MichaelAssistant({ onClose }: MichaelAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }, 1000)

    // Initialize audio
    audioRef.current = new Audio("/jarvis.mp3") // This would be a Jarvis-like sound effect

    return () => {
      clearInterval(timeInterval)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const startListening = () => {
    setIsListening(true)
    setTranscript("")
    setResponse("")

    // Simulate speech recognition
    setTimeout(() => {
      setIsListening(false)
      const mockCommands = ["What time is it?", "Open YouTube", "Search for weather in New York", "Play a game"]
      const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)]
      setTranscript(randomCommand)
      processCommand(randomCommand)
    }, 2000)
  }

  const processCommand = (command: string) => {
    setIsLoading(true)

    // Play Jarvis sound
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
    }

    setTimeout(() => {
      let responseText = ""

      if (command.toLowerCase().includes("time")) {
        responseText = `The current time is ${currentTime}.`
      } else if (command.toLowerCase().includes("open youtube")) {
        responseText = "Opening YouTube for you."
        window.open("https://www.youtube.com", "_blank")
      } else if (command.toLowerCase().includes("search")) {
        const searchTerm = command.replace(/search for/i, "").trim()
        responseText = `Searching for "${searchTerm}".`
      } else if (command.toLowerCase().includes("game")) {
        responseText = "I can open a simple game for you. Would you like to play?"
      } else {
        responseText = "I'm sorry, I didn't understand that command."
      }

      setResponse(responseText)
      setIsLoading(false)

      // Text-to-speech simulation
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(responseText)
        speech.rate = 0.9
        speech.pitch = 0.8
        speech.volume = 1
        window.speechSynthesis.speak(speech)
      }
    }, 1500)
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-20">
      <div className="flex justify-between items-center bg-gray-800 p-4">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
          <h3 className="font-medium">Michael (Jarvis Voice)</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 h-64 overflow-y-auto">
        {transcript && (
          <div className="mb-4">
            <p className="text-sm text-gray-400">You said:</p>
            <p className="bg-gray-800 p-2 rounded-lg mt-1">{transcript}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-16">
            <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
            <div
              className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}

        {response && (
          <div>
            <p className="text-sm text-gray-400">Michael:</p>
            <p className="bg-blue-900 p-2 rounded-lg mt-1">{response}</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-800 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Clock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Play className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={startListening}
          variant="outline"
          size="icon"
          className={`rounded-full ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
