"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [color, setColor] = useState("#ff0000")

  // Function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  // Change color every second
  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRandomColor())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8 text-center transition-colors duration-500" style={{ color: color }}>
          aperki100
        </h1>

        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search the web"
              className="w-full pl-10 py-6 bg-gray-800 text-white border-gray-700 rounded-full focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <Button type="submit" variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => {
                if (searchQuery.trim()) {
                  window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&btnI=I`, "_blank")
                }
              }}
            >
              I'm Feeling Lucky
            </Button>
          </div>
        </form>
      </div>

      <footer className="mt-auto pt-8 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} aperki100 - A custom search experience</p>
      </footer>
    </div>
  )
}
