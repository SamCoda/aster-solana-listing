"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function TrendingSolanaTokens() {
  const [tokens, setTokens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await axios.get("/api/solana-tokens")
        setTokens(response.data)
      } catch (error) {
        console.error("Error fetching tokens:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        🔥 Top 10 Trending Solana Tokens
      </h2>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Token</th>
            <th className="p-2 text-right">Price ($)</th>
            <th className="p-2 text-right">24h %</th>
            <th className="p-2 text-right">Volume (24h)</th>
            <th className="p-2 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.id} className="border-t hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2">
                {token.logo && (
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{token.name}</span>
                <span className="text-gray-500 text-sm">({token.symbol})</span>
              </td>
              <td className="p-2 text-right">
                {token.quote.USD.price.toFixed(4)}
              </td>
              <td
                className={`p-2 text-right ${
                  token.quote.USD.percent_change_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {token.quote.USD.percent_change_24h.toFixed(2)}%
              </td>
              <td className="p-2 text-right">
                {token.quote.USD.volume_24h.toLocaleString()}
              </td>
              <td className="p-2 text-right">
                {token.quote.USD.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}