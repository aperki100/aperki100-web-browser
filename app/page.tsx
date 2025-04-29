import SearchBar from "@/components/search-bar"
import ColorChangingLogo from "@/components/color-changing-logo"
import MichaelAI from "@/components/michael-ai"
import Extensions from "@/components/extensions"
import LoginButton from "@/components/login-button"
import QuickLinks from "@/components/quick-links"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="w-full p-4">
        <div className="flex justify-end items-center space-x-4">
          <Extensions />
          <LoginButton />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <ColorChangingLogo />
          <div className="w-full mt-8">
            <SearchBar />
          </div>
          <div className="mt-8">
            <QuickLinks />
          </div>
        </div>
      </main>

      <MichaelAI />
    </div>
  )
}
