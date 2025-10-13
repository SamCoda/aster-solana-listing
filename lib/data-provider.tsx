"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { allCoins, type Coin } from "./mock-data"

interface DataContextType {
  coins: Coin[]
  refreshData: () => void
  isLoading: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

interface CoinTrend {
  direction: "up" | "down" | "sideways"
  strength: number
  volatility: number
  cyclePosition: number
}

const coinTrends = new Map<string, CoinTrend>()

function initializeTrend(coinId: string): CoinTrend {
  return {
    direction: Math.random() > 0.5 ? "up" : "down",
    strength: 0.3 + Math.random() * 0.7,
    volatility: 0.1 + Math.random() * 0.4,
    cyclePosition: Math.random() * Math.PI * 2,
  }
}

function updateTrend(trend: CoinTrend): CoinTrend {
  const newCyclePosition = trend.cyclePosition + 0.1

  if (newCyclePosition > Math.PI * 2) {
    const shouldReverse = Math.random() > 0.7
    return {
      direction: shouldReverse ? (trend.direction === "up" ? "down" : "up") : trend.direction,
      strength: 0.3 + Math.random() * 0.7,
      volatility: 0.1 + Math.random() * 0.4,
      cyclePosition: 0,
    }
  }

  return {
    ...trend,
    cyclePosition: newCyclePosition,
  }
}

function calculatePriceChange(coin: Coin, trend: CoinTrend): number {
  const wave = Math.sin(trend.cyclePosition) * trend.volatility
  const trendEffect = trend.direction === "up" ? trend.strength : -trend.strength
  const baseChange = (trendEffect + wave) * 0.0001

  return coin.price * baseChange
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState<Coin[]>(allCoins)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    coins.forEach((coin) => {
      if (!coinTrends.has(coin.id)) {
        coinTrends.set(coin.id, initializeTrend(coin.id))
      }
    })

    const interval = setInterval(() => {
      setCoins((prevCoins) =>
        prevCoins.map((coin) => {
          let trend = coinTrends.get(coin.id) || initializeTrend(coin.id)
          trend = updateTrend(trend)
          coinTrends.set(coin.id, trend)

          const priceChange = calculatePriceChange(coin, trend)
          const newPrice = Math.max(0.000001, coin.price + priceChange)
          const priceChangePercent = (priceChange / coin.price) * 100

          const change1h = priceChangePercent * 12
          const change24h = coin.change24h * 0.95 + priceChangePercent * 0.05
          const change7d = coin.change7d * 0.98 + priceChangePercent * 0.02

          const volumeChange = (Math.random() - 0.5) * coin.volume24h * 0.01
          const newVolume = Math.max(0, coin.volume24h + volumeChange)

          return {
            ...coin,
            price: newPrice,
            change1h: Math.max(-20, Math.min(20, change1h)),
            change24h: Math.max(-50, Math.min(50, change24h)),
            change7d: Math.max(-70, Math.min(70, change7d)),
            volume24h: newVolume,
            marketCap: newPrice * (coin.marketCap / coin.price),
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCoins(allCoins)
    setIsLoading(false)
  }

  return <DataContext.Provider value={{ coins, refreshData, isLoading }}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
