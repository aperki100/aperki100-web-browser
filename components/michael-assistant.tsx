"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, X, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MichaelAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "michael" }[]>([
    { text: "Hello, I'm Michael, your AI assistant. How can I help you today?", sender: "michael" },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Speech recognition setup
  const SpeechRecognition =
    typeof window !== "undefined" ? window.SpeechRecognition || (window as any).webkitSpeechRecognition : null
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  if (recognition) {
    recognition.continuous = false
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      handleSend(transcript)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }
  }

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Listen for activate Michael event
    const handleActivate = () => {
      setIsOpen(true)
      setTimeout(() => {
        startListening()
      }, 500)
    }

    window.addEventListener("activateMichael", handleActivate)
    return () => window.removeEventListener("activateMichael", handleActivate)
  }, [])

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    } else {
      alert("Speech recognition is not supported in your browser")
    }
  }

  const handleSend = (text = input) => {
    if (!text.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text, sender: "user" }])
    setInput("")

    // Process the request
    setTimeout(() => {
      let response = ""

      // Simple response logic
      const lowerText = text.toLowerCase()

      if (lowerText.includes("time")) {
        response = `The current time is ${new Date().toLocaleTimeString()}.`
      } else if (lowerText.includes("date")) {
        response = `Today is ${new Date().toLocaleDateString()}.`
      } else if (lowerText.includes("open") && lowerText.includes("youtube")) {
        response = "Opening YouTube for you."
        window.open("https://youtube.com", "_blank")
      } else if (lowerText.includes("open") && lowerText.includes("game")) {
        response = "Opening a simple game for you."
        window.open("https://play2048.co", "_blank")
      } else if (lowerText.includes("who are you")) {
        response =
          "I am Michael, your AI assistant with a voice inspired by Jarvis from Iron Man. I can help you search the web, open applications, tell the time, and much more."
      } else {
        response = `I've searched for "${text}" and found some interesting results. Would you like me to tell you more about any specific aspect?`
      }

      // Add Michael's response
      setMessages((prev) => [...prev, { text: response, sender: "michael" }])

      // Speak the response
      speakText(response)
    }, 1000)
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      // Try to get a deep male voice similar to Jarvis
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) => voice.name.includes("Male") || voice.name.includes("Daniel"))

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.pitch = 0.9 // Slightly lower pitch
      utterance.rate = 0.9 // Slightly slower rate

      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <>
      {/* Michael Assistant Button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Michael Assistant Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-blue-500">Michael Assistant</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <CardContent className="p-0">
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`${isListening ? "bg-red-600 text-white" : "bg-gray-800 text-white"}`}
                    onClick={startListening}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask Michael something..."
                    className="flex-1 bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
                  />
                  <Button
                    variant="outline"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleSend()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
