"use client"

import { useState } from "react"
import SearchBar from "@/components/search-bar"
import Header from "@/components/header"
import Extensions from "@/components/extensions"
import LoginButton from "@/components/login-button"
import MichaelAssistant from "@/components/michael-assistant"
import SearchResults from "@/components/search-results"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)

    // Simulate search results
    setTimeout(() => {
      const mockResults = [
        {
          title: query + " - Wikipedia",
          url: "https://en.wikipedia.org/wiki/" + query.replace(/\s+/g, "_"),
          description: "Wikipedia article about " + query,
        },
        {
          title: query + " | Official Website",
          url: "https://" + query.replace(/\s+/g, "") + ".com",
          description: "The official website for " + query,
        },
        {
          title: query + " - Latest News",
          url: "https://news.google.com/search?q=" + query,
          description: "Latest news about " + query,
        },
        {
          title: query + " - Images",
          url: "https://images.google.com/search?q=" + query,
          description: "Images related to " + query,
        },
        {
          title: query + " - Videos",
          url: "https://www.youtube.com/results?search_query=" + query,
          description: "Videos about " + query,
        },
      ]
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  const toggleAssistant = () => {
    setShowAssistant(!showAssistant)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header toggleAssistant={toggleAssistant} />
      <main className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />

          {searchQuery && <SearchResults query={searchQuery} results={searchResults} isLoading={isSearching} />}

          {!searchQuery && (
            <div className="mt-8 flex justify-between items-center">
              <Extensions />
              <LoginButton />
            </div>
          )}
        </div>
      </main>

      {showAssistant && <MichaelAssistant onClose={toggleAssistant} />}
    </div>
  )
}
