"use client"

import type React from "react"

import { useState } from "react"
import { Search, Mic } from "lucide-react"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real implementation, this would navigate to search results
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank")
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-12 pr-24 rounded-full bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search the web"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <div className="absolute right-4 bottom-0 top-0 flex items-center">
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <Mic className="h-5 w-5" />
          </button>
          <button type="submit" className="ml-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">
            Search
          </button>
        </div>
      </div>
    </form>
  )
}
