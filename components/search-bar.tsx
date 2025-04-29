"use client"

import type React from "react"
import { useState } from "react"
import { Search, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const activateMichael = () => {
    // Trigger Michael voice assistant
    const michaelEvent = new CustomEvent("activateMichael")
    window.dispatchEvent(michaelEvent)
  }

  return (
    <div className="w-full mt-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search with Aperki100 or ask Michael"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-20 py-6 bg-gray-900 border-gray-700 text-white rounded-full w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:bg-transparent"
            onClick={activateMichael}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="submit" variant="ghost" className="bg-gray-800 hover:bg-gray-700 text-white">
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}
