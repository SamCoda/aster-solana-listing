"use client"

import { useEffect, useState, useRef } from "react"
import { mockCoins } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export function PromotedCoins() {
  const [liveData, setLiveData] = useState<Record<string, any>>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const promotedCoins = mockCoins.filter((coin) => coin.promoted)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/live-prices")
        const data = await res.json()
        const mapped = Object.fromEntries(data.map((d: any) => [d.symbol, d]))
        setLiveData(mapped)
      } catch (err) {
        console.error("Error fetching live data:", err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 20000) // refresh every 20s
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="mb-8 w-full">
      <div className={`flex items-center justify-between mb-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="text-xl font-bold">Promoted Coins</h2>
        <Link href="/advertise" className="text-sm text-primary hover:underline transition-all duration-300">
          Your coin here? Advertise
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {promotedCoins.map((coin, index) => {
          const live = liveData[coin.ticker] || {}
          const price = live.price ?? coin.price
          const change24h = live.change24h ?? coin.change24h
          const marketCap = live.marketCap ?? coin.marketCap

          return (
            <Link
              key={coin.id}
              href={`/coin/${coin.id}`}
              className={`bg-card border border-border rounded-lg p-4 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(168,85,247,0.3)] transition-all duration-200 min-w-0 ${
                isVisible ? `animate-fade-in-up stagger-${Math.min(index + 1, 5)}` : "opacity-0"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={coin.logo || "/placeholder.svg"}
                    alt={coin.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{coin.ticker}</div>
                    <div className="text-xs text-muted-foreground">{coin.name}</div>
                  </div>
                </div>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse-glow" />
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold">${price.toFixed(6)}</div>
                <div className={`text-sm font-medium ${change24h >= 0 ? "text-accent" : "text-destructive"}`}>
                  {change24h >= 0 ? "+" : ""}
                  {change24h.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  MCap: ${(marketCap / 1_000_000).toFixed(2)}M
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}