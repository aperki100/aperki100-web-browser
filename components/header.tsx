"use client"

import { useState, useEffect } from "react"
import { Mic, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  toggleAssistant: () => void
}

export default function Header({ toggleAssistant }: HeaderProps) {
  const [color, setColor] = useState("#FF5733")
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
      setColor(randomColor)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleMicClick = () => {
    setIsListening(!isListening)
    toggleAssistant()
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold transition-colors duration-300 ease-in-out" style={{ color }}>
          Aperki100
        </h1>
        <Button
          onClick={handleMicClick}
          variant="outline"
          size="icon"
          className={`rounded-full ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          {isListening ? <X className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}
