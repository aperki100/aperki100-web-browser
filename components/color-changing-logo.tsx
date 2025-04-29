"use client"

import { useState, useEffect } from "react"

export default function ColorChangingLogo() {
  const [color, setColor] = useState("#4285F4") // Google blue as default

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
      setColor(randomColor)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold transition-colors duration-300 ease-in-out" style={{ color }}>
        Aperki100
      </h1>
    </div>
  )
}
