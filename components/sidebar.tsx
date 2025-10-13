"use client"

import Link from "next/link"
import { Home, TrendingUp, Settings, Star, Sparkles, Zap, Users, LogIn, LogOut, MessageCircle, Twitter, Instagram, Wand2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useVote } from "@/lib/vote-context"
import { useState } from "react"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()
  const { user, login, logout } = useVote()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState("")

  const navItems = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Wand2, href: "#", label: "Advertise" },
    { icon: Star, href: "#", label: "Promoted" },
    { icon: MessageCircle, href: "https://listing.astersolana.com/", label: "Teleegram" },
    { icon: Twitter, href: "https://x.com/asterxsolana", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/asterxsolana", label: "Instagram" },
  ]

  const handleLogin = () => {
    if (username.trim()) {
      login(username.trim())
      setShowLoginModal(false)
      setUsername("")
    }
  }

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-16 md:w-16 bg-[rgba(20,20,35,0.85)] backdrop-blur-[30px] border border-[rgba(168,85,247,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center py-4 z-50 animate-slide-in-left border-r">
        <Link href="https://astersolana.com/" className="mb-8 animate-scale-in hover:scale-110 transition-all duration-300">
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xlKE07cZA3YwvA23c65NNvGkMYxbDJ.png"
              alt="ASTER"
              width={40}
              height={40}
              className="rounded-lg animate-pulse-glow"
            />
          </div>
        </Link>

        <nav className="flex-1 flex flex-col gap-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 animate-fade-in stagger-${Math.min(index + 1, 5)} relative group ${
                  isActive
                    ? "bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-magenta)] text-white shadow-lg shadow-[rgba(168,85,247,0.5)]"
                    : "text-gray-400 hover:text-white hover:bg-[rgba(30,30,50,0.8)] hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-0.5"
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 relative z-10" />
                {isActive && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-magenta)] opacity-50 blur-md animate-pulse-glow" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* <div className="mt-auto">
          {user ? (
            <button
              onClick={logout}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[rgba(30,30,50,0.8)] hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 transition-all duration-300 group relative"
              title={`Logout (${user.name})`}
            >
              <LogOut className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 rounded-lg bg-[var(--neon-purple)] opacity-0 group-hover:opacity-20 blur-md transition-all duration-300" />
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[rgba(30,30,50,0.8)] hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 transition-all duration-300 group relative"
              title="Login"
            >
              <LogIn className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 rounded-lg bg-[var(--neon-purple)] opacity-0 group-hover:opacity-20 blur-md transition-all duration-300" />
            </button>
          )}
        </div> */}
      </aside>

      {/* {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in px-4">
          <div className="bg-[rgba(20,20,35,0.85)] backdrop-blur-[30px] border border-[rgba(168,85,247,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xl p-8 w-full max-w-md animate-scale-in shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 [text-shadow:0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.5)]">
              Login to Vote
            </h2>
            <p className="text-gray-400 text-sm mb-6">Enter your username to start voting for coins</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Username"
              className="w-full px-4 py-3 bg-[rgba(20,20,35,0.7)] backdrop-blur-[20px] border border-[rgba(168,85,247,0.2)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)] transition-all duration-300 text-white placeholder-gray-500"
            />
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-magenta)] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 hover:bg-[rgba(30,30,50,0.8)] hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-gray-300 border border-[rgba(168,85,247,0.2)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}
