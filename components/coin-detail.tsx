"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Zap, Twitter, Send, Instagram, Globe, ChevronDown, ChevronUp } from "lucide-react"
import type { Coin } from "@/lib/mock-data"
import { TradingChart } from "@/components/trading-chart"
import { PromotedCoins } from "@/components/promoted-coins"
import { useVote } from "@/lib/vote-context"

interface CoinDetailProps {
  coin: Coin
}

export function CoinDetail({ coin }: CoinDetailProps) {
  const { voteForCoin, isVoted } = useVote()
  const [votes, setVotes] = useState(coin.votes)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleVote = () => {
    if (voteForCoin(coin.id)) {
      setVotes(votes + 1)
    }
  }

  const faqs = [
    {
      question: `What is the current price of ${coin.ticker} token?`,
      answer: `The current price of ${coin.name} (${coin.ticker}) is $${coin.price.toFixed(6)} USD.`,
    },
    {
      question: `How much ${coin.ticker} tokens can I purchase with $100 USD?`,
      answer: `With $100 USD, you can purchase approximately ${(100 / coin.price).toFixed(0)} ${coin.ticker} tokens at the current price.`,
    },
    {
      question: `What is the market cap of ${coin.name} coin?`,
      answer: `The current market cap of ${coin.name} is $${(coin.marketCap / 1000000).toFixed(2)}M USD.`,
    },
    {
      question: `What is the fully diluted valuation (FDV) of ${coin.ticker} coin?`,
      answer: `The fully diluted valuation of ${coin.name} is $${(coin.fdv / 1000000).toFixed(2)}M USD.`,
    },
    {
      question: `What is the contract address for ${coin.ticker} (${coin.name})?`,
      answer: `The contract address for ${coin.name} can be found on the official website or blockchain explorer.`,
    },
    {
      question: `What is the daily trading volume of ${coin.ticker}?`,
      answer: `The 24-hour trading volume of ${coin.name} is $${(coin.volume24h / 1000).toFixed(0)}K USD.`,
    },
    {
      question: `What is the liquidity of ${coin.ticker}?`,
      answer: `The total liquidity of ${coin.name} varies based on DEX pools and can be checked on DeFi analytics platforms.`,
    },
    {
      question: `How do I buy ${coin.ticker} tokens?`,
      answer: `You can buy ${coin.ticker} tokens on decentralized exchanges (DEX) like Raydium or Jupiter by connecting your wallet.`,
    },
  ]

  return (
    <div>
      {/* Header Section */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={coin.logo || "/placeholder.svg"}
              alt={coin.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold">{coin.name}</h1>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  #{coin.rank}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-lg">{coin.ticker}</span>
                {coin.categories.map((cat, i) => (
                  <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleVote}
              disabled={isVoted(coin.id)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Vote ({votes})
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Zap className="w-4 h-4 mr-2" />
              Boost
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Globe className="w-4 h-4" />
            Website
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Twitter className="w-4 h-4" />
            Twitter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Send className="w-4 h-4" />
            Telegram
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Instagram className="w-4 h-4" />
            Instagram
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-4">
              <div className="text-3xl font-bold mb-1">${coin.price.toFixed(6)}</div>
              <div className={`text-lg ${coin.change24h >= 0 ? "text-accent" : "text-destructive"}`}>
                {coin.change24h >= 0 ? "+" : ""}
                {coin.change24h.toFixed(2)}% (24h)
              </div>
            </div>
            <TradingChart />
          </div>
        </div>

        {/* Metrics Panel */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Price</div>
              <div className="font-mono font-semibold">${coin.price.toFixed(6)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">24h Change</div>
              <div className={`font-semibold ${coin.change24h >= 0 ? "text-accent" : "text-destructive"}`}>
                {coin.change24h >= 0 ? "+" : ""}
                {coin.change24h.toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">7d Change</div>
              <div className={`font-semibold ${coin.change7d >= 0 ? "text-accent" : "text-destructive"}`}>
                {coin.change7d >= 0 ? "+" : ""}
                {coin.change7d.toFixed(2)}%
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
              <div className="font-mono">999.99M</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
              <div className="font-mono font-semibold">${(coin.marketCap / 1000000).toFixed(2)}M</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
              <div className="font-mono">${(coin.volume24h / 1000).toFixed(0)}K</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Volume / MC</div>
              <div className="font-mono">{((coin.volume24h / coin.marketCap) * 100).toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Liquidity</div>
              <div className="font-mono">${((coin.marketCap * 0.15) / 1000000).toFixed(2)}M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <div className="text-muted-foreground space-y-3">
          <p>
            {coin.name} is a {coin.categories[0].toLowerCase()} token that has gained significant traction in the crypto
            community. With its unique approach and strong community support, {coin.ticker} has established itself as a
            notable player in the space.
          </p>
          <p>
            The project focuses on delivering value to its holders through innovative tokenomics and community-driven
            initiatives. {coin.name} has shown consistent growth and engagement from its user base.
          </p>
        </div>
      </div>

      {/* Live Updates */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{coin.name} Live Updates</h2>
        <div className="text-muted-foreground space-y-2">
          <p>
            Today's live data for {coin.name} ({coin.ticker}) on the Solana blockchain is as follows:
          </p>
          <p>
            The current price is approximately ${coin.price.toFixed(6)} USD. The current market cap is $
            {(coin.marketCap / 1000000).toFixed(2)}M USD. The current fully diluted valuation is $
            {(coin.fdv / 1000000).toFixed(2)}M USD. The total supply is 999.99M {coin.ticker} tokens.
          </p>
          <p>
            {coin.name} price has {coin.change24h >= 0 ? "increased" : "decreased"} by{" "}
            {Math.abs(coin.change24h).toFixed(2)}% in the last 24 hours. {coin.name} price has{" "}
            {coin.change7d >= 0 ? "increased" : "decreased"} by {Math.abs(coin.change7d).toFixed(2)}% in the last 6
            hours. The volume to market cap ratio is {((coin.volume24h / coin.marketCap) * 100).toFixed(2)}%.
          </p>
          <p>
            Currently ranked #{coin.rank} on CoinMun (based on total community votes), {coin.name} has accumulated a
            total of {votes} votes and received {Math.floor(votes / 10)} votes in the last 24 hours.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {coin.categories.map((category, i) => (
            <Button key={i} variant="secondary" size="sm">
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{coin.name} Live Price & FAQs</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth text-left"
              >
                <span className="font-medium">{faq.question}</span>
                {expandedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 text-muted-foreground">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Promoted Coins */}
      <PromotedCoins />
    </div>
  )
}
