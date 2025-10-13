"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Flame } from "lucide-react"

interface TickerCoin {
  rank: number
  name: string
  ticker: string
  price: number
  change24h: number
}

export function TopTicker() {
  const [coins, setCoins] = useState<TickerCoin[]>([
    { rank: 1, name: "ASTER", ticker: "ASTER", price: 0.01525, change24h: 3.38 },
    { rank: 2, name: "LION", ticker: "LION", price: 0.00123, change24h: 12.56 },
    { rank: 3, name: "SKYAI", ticker: "SKYAI", price: 0.0045, change24h: 13.45 },
    { rank: 4, name: "USELESS", ticker: "USELESS", price: 0.000234, change24h: 23.65 },
    { rank: 5, name: "PALU", ticker: "PALU", price: 0.0012, change24h: -7.03 },
    { rank: 7, name: "AITCH", ticker: "AITCH", price: 0.0089, change24h: 3.65 },
    { rank: 8, name: "VIRTUAL", ticker: "VIRTUAL", price: 0.0234, change24h: 5.4 },
  ])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`h-14 bg-[rgba(20,20,35,0.85)] backdrop-blur-[30px] border-b border-[rgba(168,85,247,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center px-4 md:px-6 overflow-x-hidden w-full ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
    >
      <div className="flex items-center gap-2 mr-6 text-sm font-semibold whitespace-nowrap flex-shrink-0">
        <Flame className="w-5 h-5 text-[var(--neon-purple)] animate-pulse-glow" />
        <span className="[text-shadow:0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.5)] hidden sm:inline">
          Trending Now
        </span>
      </div>

      <div className="flex-1 flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide min-w-0">
        {coins.map((coin, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 text-sm whitespace-nowrap hover:scale-105 transition-all duration-300 flex-shrink-0 bg-[rgba(20,20,35,0.7)] backdrop-blur-[20px] border border-[rgba(168,85,247,0.2)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-3 py-1.5 rounded-lg cursor-pointer group"
          >
            <span className="text-gray-500 text-xs">#{coin.rank}</span>
            <span className="font-bold text-white">{coin.ticker}</span>
            <span className="text-gray-300 hidden sm:inline font-mono">${coin.price.toFixed(6)}</span>
            <span
              className={`flex items-center gap-1 font-semibold ${coin.change24h >= 0 ? "text-[var(--neon-cyan)] [text-shadow:0_0_10px_rgba(6,182,212,0.5),0_0_20px_rgba(6,182,212,0.5)]" : "text-[var(--neon-magenta)]"}`}
            >
              {coin.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {Math.abs(coin.change24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
