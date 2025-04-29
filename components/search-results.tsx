interface SearchResultsProps {
  query: string
  results: string[]
  isLoading: boolean
}

export default function SearchResults({ query, results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
          <p>Searching for "{query}"...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <p className="text-sm text-gray-400">
          About {results.length} results for "{query}"
        </p>
      </div>
      <div className="divide-y divide-gray-800">
        {results.map((result, index) => (
          <div key={index} className="p-4 hover:bg-gray-800 cursor-pointer">
            <h3 className="text-blue-400 hover:underline">{result}</h3>
            <p className="text-green-500 text-sm">https://aperki100.com/result/{index}</p>
            <p className="text-gray-400 mt-1">
              This is a sample search result description for the query "{query}". Click to view more information about
              this result.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
