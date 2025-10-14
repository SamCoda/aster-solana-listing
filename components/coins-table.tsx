"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ChevronUp, ChevronDown, ThumbsUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVote } from "@/lib/vote-context"
import { useData } from "@/lib/data-provider"

type SortField = "rank" | "price" | "change1h" | "change24h" | "change7d" | "marketCap" | "volume24h" | "votes"
type SortOrder = "asc" | "desc"
type FilterTab = "top-today" | "top-all-time" | "new-listings" | "trending" | "gainers" | "losers"
type CategoryFilter =
  | "all"
  | "ecosystems"
  | "ai"
  | "gambling"
  | "sci-ecosystem"
  | "ai-agents"
  | "memes"
  | "gaming"
  | "defi"

export function CoinsTable() {
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [filterTab, setFilterTab] = useState<FilterTab>("top-today")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const { coins, refreshData, isLoading } = useData()
  const { voteForCoin, isVoted } = useVote()
  const [coinVotes, setCoinVotes] = useState<Record<string, number>>(
    Object.fromEntries(coins.map((coin) => [coin.id, coin.votes])),
  )

  const [isVisible, setIsVisible] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (tableRef.current) {
      observer.observe(tableRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const handleVote = (coinId: string) => {
    if (voteForCoin(coinId)) {
      setCoinVotes((prev) => ({
        ...prev,
        [coinId]: (prev[coinId] || 0) + 1,
      }))
    }
  }

  const filteredAndSortedCoins = useMemo(() => {
    let filtered = [...coins]

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((coin) =>
        coin.categories.some((cat) => cat.toLowerCase().includes(categoryFilter.replace("-", " "))),
      )
    }

    // Apply tab filter
    switch (filterTab) {
      case "gainers":
        filtered = filtered.filter((coin) => coin.change24h > 0)
        break
      case "losers":
        filtered = filtered.filter((coin) => coin.change24h < 0)
        break
      case "trending":
        filtered = filtered.sort((a, b) => b.votes - a.votes).slice(0, 20)
        break
      case "new-listings":
        filtered = filtered.slice(-20).reverse()
        break
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const modifier = sortOrder === "asc" ? 1 : -1
      return aValue > bValue ? modifier : -modifier
    })

    return filtered
  }, [coins, sortField, sortOrder, filterTab, categoryFilter])

  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedCoins.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedCoins, currentPage])

  const totalPages = Math.ceil(filteredAndSortedCoins.length / itemsPerPage)

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div ref={tableRef} className="w-full">
      <div
        className={`mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Top Coins Today</h1>
          <p className="text-muted-foreground text-sm">
            Discover Leading Cryptocurrencies Voted by the Community in the Last 24 Hours
          </p>
        </div>
        <Button
          onClick={refreshData}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent transition-smooth hover:scale-105"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      <div
        className={`flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide w-full ${isVisible ? "animate-fade-in stagger-1" : "opacity-0"}`}
      >
        <Button
          variant={filterTab === "top-today" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterTab("top-today")}
          className="whitespace-nowrap transition-smooth hover:scale-105"
        >
          Top Today
        </Button>
        <Button
          variant={filterTab === "top-all-time" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterTab("top-all-time")}
          className="whitespace-nowrap transition-smooth hover:scale-105"
        >
          Top All Time
        </Button>
        <Button
          variant={filterTab === "new-listings" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterTab("new-listings")}
          className="whitespace-nowrap transition-smooth hover:scale-105"
        >
          New Listings
        </Button>
        <Button
          variant={filterTab === "trending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterTab("trending")}
          className="whitespace-nowrap transition-smooth hover:scale-105"
        >
          Trending
        </Button>
        <Button
          variant={filterTab === "gainers" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterTab("gainers")}
          className="whitespace-nowrap transition-smooth hover:scale-105"
        >
          Gainers
        </Button>
        <Button
          variant={filterTab === "losers" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterTab("losers")}
          className="whitespace-nowrap transition-smooth hover:scale-105"
        >
          Losers
        </Button>
      </div>

      <div
        className={`flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide w-full ${isVisible ? "animate-fade-in stagger-2" : "opacity-0"}`}
      >
        <span className="text-sm text-muted-foreground mr-2 whitespace-nowrap">Categories:</span>
        {["all", "ecosystems", "ai", "gambling", "sci-ecosystem", "ai-agents", "memes", "gaming", "defi"].map(
          (category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategoryFilter(category as CategoryFilter)}
              className="whitespace-nowrap text-xs transition-smooth hover:scale-105"
            >
              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
            </Button>
          ),
        )}
      </div>

      <div
        className={`bg-card border border-border rounded-lg overflow-hidden w-full ${isVisible ? "animate-fade-in-up stagger-3" : "opacity-0"}`}
      >
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("rank")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth"
                  >
                    #<SortIcon field="rank" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium">Asset</div>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("price")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    Price
                    <SortIcon field="price" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("change1h")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    %1h
                    <SortIcon field="change1h" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("change24h")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    %24h
                    <SortIcon field="change24h" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("change7d")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    %7d
                    <SortIcon field="change7d" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("marketCap")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    Market Cap
                    <SortIcon field="marketCap" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <div className="flex items-center gap-1 text-sm font-medium">FDV</div>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("volume24h")}
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    24h Volume
                    <SortIcon field="volume24h" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-smooth ml-auto"
                  >
                    Votes
                    <SortIcon field="votes" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCoins.map((coin, index) => (
                <tr key={coin.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground hover:text-yellow-500 cursor-pointer transition-smooth" />
                      <span className="text-muted-foreground">{coin.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/coin/${coin.id}`}
                      className="flex items-center gap-3 hover:text-primary transition-smooth"
                    >
                      <Image
                        src={coin.logo || "/placeholder.svg"}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{coin.name}</div>
                        <div className="text-xs text-muted-foreground">{coin.ticker}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">${coin.price.toFixed(6)}</td>
                  <td className="px-4 py-4 text-right">
                    <span className={coin.change1h >= 0 ? "text-accent" : "text-destructive"}>
                      {coin.change1h >= 0 ? "+" : ""}
                      {coin.change1h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={coin.change24h >= 0 ? "text-accent" : "text-destructive"}>
                      {coin.change24h >= 0 ? "+" : ""}
                      {coin.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={coin.change7d >= 0 ? "text-accent" : "text-destructive"}>
                      {coin.change7d >= 0 ? "+" : ""}
                      {coin.change7d.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">${(coin.marketCap / 1000000).toFixed(2)}M</td>
                  <td className="px-4 py-4 text-right font-mono">${(coin.fdv / 1000000).toFixed(2)}M</td>
                  <td className="px-4 py-4 text-right font-mono">${(coin.volume24h / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm">{coinVotes[coin.id] || coin.votes}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 bg-transparent"
                        // onClick={() => handleVote(coin.id)}
                        // disabled={isVoted(coin.id)}
                      >
                        <ThumbsUp className={`w-3 h-3 ${isVoted(coin.id) ? "fill-primary" : ""}`} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 border-t border-border gap-4 w-full">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedCoins.length)} of {filteredAndSortedCoins.length}
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="transition-smooth hover:scale-105"
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="transition-smooth hover:scale-105"
                >
                  {page}
                </Button>
              )
            })}
            {totalPages > 5 && <span className="text-muted-foreground">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="transition-smooth hover:scale-105"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
