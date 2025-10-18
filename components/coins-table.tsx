"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CoinDetail } from "@/components/coin-detail"

type SortField = "rank" | "price" | "change24h" | "marketCap" | "volume24h"
type SortOrder = "asc" | "desc"

export function CoinsTable() {
  const [coins, setCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState<any | null>(null)
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchTokens = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/solana-tokens")
      const data = await res.json()
      const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []
      setCoins(arr)
    } catch (err) {
      console.error("Error fetching Solana tokens:", err)
      setCoins([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const mapField = (field: SortField) => {
    switch (field) {
      case "rank":
        return "cmc_rank"
      case "price":
        return "price"
      case "change24h":
        return "percent_change_24h"
      case "marketCap":
        return "market_cap"
      case "volume24h":
        return "volume_24h"
      default:
        return "price"
    }
  }

  const sortedCoins = useMemo(() => {
    const arr = [...coins]
    const key = mapField(sortField)
    arr.sort((a: any, b: any) => {
      const getValue = (c: any) => {
        if (key === "cmc_rank") return Number(c?.cmc_rank ?? c?.rank ?? 0)
        const q = c?.quote?.USD
        if (!q) return 0
        switch (key) {
          case "price": return Number(q.price ?? 0)
          case "percent_change_24h": return Number(q.percent_change_24h ?? 0)
          case "market_cap": return Number(q.market_cap ?? 0)
          case "volume_24h": return Number(q.volume_24h ?? 0)
          default: return 0
        }
      }
      const aValue = getValue(a)
      const bValue = getValue(b)
      const modifier = sortOrder === "asc" ? 1 : -1
      return aValue > bValue ? modifier : -modifier
    })
    return arr
  }, [coins, sortField, sortOrder])

  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedCoins.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedCoins, currentPage])

  const totalPages = Math.max(1, Math.ceil((coins?.length ?? 0) / itemsPerPage))

  // 👇 if a coin is selected, show CoinDetail instead of table
  if (selectedCoin) {
    const q = selectedCoin.quote?.USD ?? {}
    const coinForDetail = {
      id: selectedCoin.id,
      name: selectedCoin.name,
      ticker: selectedCoin.symbol,
      logo: selectedCoin.logo,
      rank: selectedCoin.cmc_rank,
      price: q.price ?? 0,
      change24h: q.percent_change_24h ?? 0,
      change7d: q.percent_change_7d ?? 0,
      marketCap: q.market_cap ?? 0,
      volume24h: q.volume_24h ?? 0,
      fdv: q.fully_diluted_market_cap ?? q.market_cap ?? 0,
      categories: ["Solana", "Token"],
      votes: Math.floor(Math.random() * 5000),
    }

    return (
      <div>
        <Button variant="outline" onClick={() => setSelectedCoin(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Coins
        </Button>
        <CoinDetail coin={coinForDetail} />
      </div>
    )
  }

  if (loading) return <p className="text-center py-6">Loading Solana tokens...</p>
  if (!Array.isArray(coins) || coins.length === 0) return <p className="text-center py-6">No tokens found.</p>

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🔥 Trending Solana Coins</h1>
        <Button onClick={fetchTokens} variant="outline" size="sm" className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead className="bg-muted/40 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left font-medium">#</th>
                <th className="px-6 py-3 text-left font-medium">Token</th>
                <th className="px-6 py-3 text-right font-medium">Price ($)</th>
                <th className="px-6 py-3 text-right font-medium">% 24h</th>
                <th className="px-6 py-3 text-right font-medium">Volume (24h)</th>
                <th className="px-6 py-3 text-right font-medium">Market Cap</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {paginatedCoins.map((coin, index) => {
                const q = coin?.quote?.USD ?? {}
                const price = Number(q.price ?? 0)
                const pct24 = Number(q.percent_change_24h ?? 0)
                const vol24 = Number(q.volume_24h ?? 0)
                const mcap = Number(q.market_cap ?? 0)

                return (
                  <tr
                    key={coin.id ?? index}
                    onClick={() => setSelectedCoin(coin)}
                    className="hover:bg-muted/10 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-gray-400">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      {coin.logo ? (
                        <Image src={coin.logo} alt={coin.name} width={28} height={28} className="rounded-full shadow-sm" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-200" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{coin.name}</p>
                        <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">${price.toLocaleString()}</td>
                    <td className={`px-6 py-4 text-right ${pct24 >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {pct24.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground">${vol24.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">${mcap.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center p-4 border-t">
          <span className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, coins.length)} of {coins.length}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}