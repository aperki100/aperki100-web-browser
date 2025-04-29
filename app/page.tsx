import SearchBar from "@/components/search-bar"
import Header from "@/components/header"
import Extensions from "@/components/extensions"
import LoginButton from "@/components/login-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar />
          <div className="mt-8 flex justify-between items-center">
            <Extensions />
            <LoginButton />
          </div>
        </div>
      </main>
    </div>
  )
}
