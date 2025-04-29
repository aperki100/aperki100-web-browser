"use client"

import { useState } from "react"
import SearchBar from "@/components/search-bar"
import Header from "@/components/header"
import Extensions from "@/components/extensions"
import LoginButton from "@/components/login-button"
import SearchResults from "@/components/search-results"
import MichaelAssistant from "@/components/michael-assistant"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)

    // Simulate search results
    setTimeout(() => {
      setSearchResults([
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
        `Result 4 for "${query}"`,
        `Result 5 for "${query}"`,
      ])
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-4 flex justify-between items-center">
            <Extensions />
            <LoginButton />
          </div>

          {searchQuery && (
            <div className="mt-8">
              <SearchResults query={searchQuery} results={searchResults} isLoading={isSearching} />
            </div>
          )}
        </div>
      </main>

      <MichaelAssistant />
    </div>
  )
}
