"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [color, setColor] = useState("#FF5733")

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
      setColor(randomColor)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold transition-colors duration-300 ease-in-out" style={{ color }}>
          Aperki100
        </h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
