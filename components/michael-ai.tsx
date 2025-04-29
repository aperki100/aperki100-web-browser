"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Bot, X, Maximize, Minimize, Clock, Search, Gamepad, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MichaelAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Michael, your AI assistant. I can tell time, look up information, and open websites and games for you. How can I help?",
    },
  ])
  const [input, setInput] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    // Process the message and generate a response
    const response = processMessage(input)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 500)

    setInput("")
  }

  const processMessage = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    // Time-related commands
    if (lowerMessage.includes("time") || lowerMessage.includes("what time")) {
      return `The current time is ${currentTime}.`
    }

    // Website opening commands
    if (lowerMessage.includes("open") && lowerMessage.includes("website")) {
      const websites = {
        google: "https://www.google.com",
        youtube: "https://www.youtube.com",
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
        github: "https://www.github.com",
      }

      for (const [name, url] of Object.entries(websites)) {
        if (lowerMessage.includes(name)) {
          window.open(url, "_blank")
          return `Opening ${name} for you.`
        }
      }

      return "I'm not sure which website you want to open. Try specifying a website name like Google, YouTube, etc."
    }

    // Game-related commands
    if (lowerMessage.includes("game") || lowerMessage.includes("play")) {
      const games = {
        chess: "https://www.chess.com",
        sudoku: "https://sudoku.com",
        crossword: "https://www.nytimes.com/crosswords",
        tetris: "https://tetris.com",
      }

      for (const [name, url] of Object.entries(games)) {
        if (lowerMessage.includes(name)) {
          window.open(url, "_blank")
          return `Opening ${name} for you to play.`
        }
      }

      return "I can help you play chess, sudoku, crossword, or tetris. Just let me know which one you'd like to play."
    }

    // Search commands
    if (lowerMessage.includes("search") || lowerMessage.includes("look up") || lowerMessage.includes("find")) {
      const searchTerm = message.replace(/search|look up|find/gi, "").trim()
      if (searchTerm) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, "_blank")
        return `Searching for "${searchTerm}" for you.`
      }
      return "What would you like me to search for?"
    }

    // Default response
    return "I can tell time, open websites, search for information, or help you play games. How can I assist you?"
  }

  return (
    <>
      {/* AI Assistant Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* AI Assistant Dialog */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${
            isMinimized ? "w-64 h-12" : "w-80 sm:w-96 h-96"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800 rounded-t-lg">
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-medium text-white">Michael AI</h3>
            </div>
            <div className="flex items-center space-x-2">
              {isMinimized ? (
                <button onClick={() => setIsMinimized(false)} className="text-gray-400 hover:text-white">
                  <Maximize className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-white">
                  <Minimize className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="p-3 h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-3 py-2 border-t border-gray-700 flex space-x-2 overflow-x-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center whitespace-nowrap"
                  onClick={() => {
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", content: "What time is it?" },
                      { role: "assistant", content: `The current time is ${currentTime}.` },
                    ])
                  }}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Time
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center whitespace-nowrap"
                  onClick={() => {
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", content: "Search for something" },
                      { role: "assistant", content: "What would you like me to search for?" },
                    ])
                  }}
                >
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center whitespace-nowrap"
                  onClick={() => {
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", content: "Open a website" },
                      { role: "assistant", content: "Which website would you like me to open?" },
                    ])
                  }}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Website
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center whitespace-nowrap"
                  onClick={() => {
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", content: "Play a game" },
                      {
                        role: "assistant",
                        content:
                          "I can help you play chess, sudoku, crossword, or tetris. Just let me know which one you'd like to play.",
                      },
                    ])
                  }}
                >
                  <Gamepad className="h-4 w-4 mr-1" />
                  Games
                </Button>
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-gray-700">
                <div className="flex">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Michael something..."
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
