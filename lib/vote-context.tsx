"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface VoteContextType {
  votedCoins: Set<string>
  voteForCoin: (coinId: string) => boolean
  isVoted: (coinId: string) => boolean
  user: { id: string; name: string } | null
  login: (name: string) => void
  logout: () => void
}

const VoteContext = createContext<VoteContextType | undefined>(undefined)

export function VoteProvider({ children }: { children: ReactNode }) {
  const [votedCoins, setVotedCoins] = useState<Set<string>>(new Set())
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)

  // Load voted coins and user from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem("votedCoins")
    const savedUser = localStorage.getItem("user")

    if (savedVotes) {
      setVotedCoins(new Set(JSON.parse(savedVotes)))
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const voteForCoin = (coinId: string): boolean => {
    if (!user) {
      alert("Please log in to vote")
      return false
    }

    if (votedCoins.has(coinId)) {
      return false
    }

    const newVotedCoins = new Set(votedCoins)
    newVotedCoins.add(coinId)
    setVotedCoins(newVotedCoins)

    // Save to localStorage
    localStorage.setItem("votedCoins", JSON.stringify(Array.from(newVotedCoins)))

    return true
  }

  const isVoted = (coinId: string): boolean => {
    return votedCoins.has(coinId)
  }

  const login = (name: string) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name,
    }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    setVotedCoins(new Set())
    localStorage.removeItem("user")
    localStorage.removeItem("votedCoins")
  }

  return (
    <VoteContext.Provider value={{ votedCoins, voteForCoin, isVoted, user, login, logout }}>
      {children}
    </VoteContext.Provider>
  )
}

export function useVote() {
  const context = useContext(VoteContext)
  if (context === undefined) {
    throw new Error("useVote must be used within a VoteProvider")
  }
  return context
}
