import { Loader2 } from "lucide-react"

interface SearchResult {
  title: string
  url: string
  description: string
}

interface SearchResultsProps {
  query: string
  results: SearchResult[]
  isLoading: boolean
}

export default function SearchResults({ query, results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      <p className="text-sm text-gray-400">
        About {results.length} results for "{query}"
      </p>

      {results.map((result, index) => (
        <div key={index} className="border-b border-gray-800 pb-4">
          <div className="flex flex-col">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 mb-1 hover:underline truncate"
            >
              {result.url}
            </a>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-blue-500 hover:underline"
            >
              {result.title}
            </a>
          </div>
          <p className="mt-1 text-gray-300">{result.description}</p>
        </div>
      ))}
    </div>
  )
}
