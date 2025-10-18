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
  const [coins, setCoins] = useState<TickerCoin[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const visibleCount = 7 // how many items to show in the ticker
  const refreshIntervalMs = 30_000 // 30 seconds

  // Map API token object -> TickerCoin
  const mapToTicker = (token: any, idx: number): TickerCoin => {
    const quote = token?.quote?.USD ?? {}
    return {
      rank: Number(token?.cmc_rank ?? token?.rank ?? idx + 1),
      name: token?.name ?? token?.symbol ?? "Unknown",
      ticker: token?.symbol ?? token?.ticker ?? "—",
      price: Number(quote.price ?? 0),
      change24h: Number(quote.percent_change_24h ?? 0),
    }
  }

  const fetchLive = async () => {
    try {
      const res = await fetch("/api/solana-tokens", { cache: "no-store" })
      const data = await res.json()
      // Accept either array or { data: [...] }
      const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []
      if (!Array.isArray(arr) || arr.length === 0) {
        setCoins([])
        return
      }

      // Sort by 24h volume descending (defensive)
      const sorted = [...arr].sort((a: any, b: any) => {
        const aVol = Number(a?.quote?.USD?.volume_24h ?? 0)
        const bVol = Number(b?.quote?.USD?.volume_24h ?? 0)
        return bVol - aVol
      })

      // Take top visibleCount and map
      const top = sorted.slice(0, visibleCount).map((t: any, i: number) => mapToTicker(t, i))
      setCoins(top)
    } catch (err) {
      console.error("TopTicker fetch error:", err)
      // keep last coins if available; else clear
      if (!coins.length) setCoins([])
    }
  }

  useEffect(() => {
    setIsVisible(true)
    fetchLive()

    const iv = setInterval(fetchLive, refreshIntervalMs)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // render the same style you provided, but driven by `coins`
  return (
    <div
      className={`h-14 bg-[rgba(20,20,35,0.85)] backdrop-blur-[30px] border-b border-[rgba(168,85,247,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center px-4 md:px-6 overflow-x-hidden w-full ${
        isVisible ? "animate-slide-in-right" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 mr-6 text-sm font-semibold whitespace-nowrap flex-shrink-0">
        <Flame className="w-5 h-5 text-[var(--neon-purple)] animate-pulse-glow" />
        <span className="[text-shadow:0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.5)] hidden sm:inline">
          Trending Now
        </span>
      </div>

      <div className="flex-1 flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide min-w-0">
        {coins.length === 0 ? (
          <div className="text-sm text-gray-300">No trending tokens</div>
        ) : (
          coins.map((coin, index) => (
            <div
              key={`${coin.ticker}-${coin.rank}-${index}`}
              className="flex items-center gap-2.5 text-sm whitespace-nowrap hover:scale-105 transition-all duration-300 flex-shrink-0 bg-[rgba(20,20,35,0.7)] backdrop-blur-[20px] border border-[rgba(168,85,247,0.2)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-3 py-1.5 rounded-lg cursor-pointer group"
            >
              <span className="text-gray-500 text-xs">#{coin.rank}</span>
              <span className="font-bold text-white">{coin.ticker}</span>
              <span className="text-gray-300 hidden sm:inline font-mono">${coin.price.toFixed(6)}</span>
              <span
                className={`flex items-center gap-1 font-semibold ${
                  coin.change24h >= 0
                    ? "text-[var(--neon-cyan)] [text-shadow:0_0_10px_rgba(6,182,212,0.5),0_0_20px_rgba(6,182,212,0.5)]"
                    : "text-[var(--neon-magenta)]"
                }`}
              >
                {coin.change24h >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {Math.abs(coin.change24h).toFixed(2)}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}