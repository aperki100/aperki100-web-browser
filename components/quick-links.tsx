"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export default function QuickLinks() {
  const [links] = useState([
    { id: 1, name: "YouTube", url: "https://www.youtube.com", icon: "🎬" },
    { id: 2, name: "Gmail", url: "https://mail.google.com", icon: "✉️" },
    { id: 3, name: "Maps", url: "https://maps.google.com", icon: "🗺️" },
    { id: 4, name: "Drive", url: "https://drive.google.com", icon: "📁" },
    { id: 5, name: "Calendar", url: "https://calendar.google.com", icon: "📅" },
    { id: 6, name: "Photos", url: "https://photos.google.com", icon: "🖼️" },
    { id: 7, name: "Translate", url: "https://translate.google.com", icon: "🌐" },
    { id: 8, name: "News", url: "https://news.google.com", icon: "📰" },
  ])

  return (
    <div className="grid grid-cols-4 gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <span className="text-2xl mb-2">{link.icon}</span>
          <span className="text-sm text-gray-300">{link.name}</span>
        </a>
      ))}
      <button className="flex flex-col items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
        <span className="flex items-center justify-center w-8 h-8 mb-2 bg-gray-700 rounded-full">
          <Plus className="h-5 w-5" />
        </span>
        <span className="text-sm text-gray-300">Add</span>
      </button>
    </div>
  )
}
