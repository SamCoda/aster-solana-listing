"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useRef, useState } from "react"

export function Tokenomics() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const tokenomicsData = [
    {
      category: "Presale",
      emoji: "🚀",
      allocation: "30%",
      tokens: "300,000,000,000",
      description: "Public & private presale rounds before launch",
    },
    {
      category: "Liquidity Pool",
      emoji: "💧",
      allocation: "20%",
      tokens: "200,000,000,000",
      description: "Initial liquidity for Raydium & Jupiter",
    },
    {
      category: "Community Rewards",
      emoji: "🌸",
      allocation: "20%",
      tokens: "200,000,000,000",
      description: "Airdrops, meme contests, staking rewards",
    },
    {
      category: "Burn & Deflation",
      emoji: "🔥",
      allocation: "10%",
      tokens: "100,000,000,000",
      description: "Scheduled burns & deflationary events",
    },
    {
      category: "Team & Development",
      emoji: "🧠",
      allocation: "10%",
      tokens: "100,000,000,000",
      description: "Team, dev, and marketing funds",
    },
    {
      category: "Partnerships",
      emoji: "💼",
      allocation: "10%",
      tokens: "100,000,000,000",
      description: "Strategic partnerships & reserves",
    },
  ]

  return (
    <section id="tokenomics" className="py-20 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Tokenomics</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A transparent and sustainable token distribution designed for long-term growth
            </p>
          </div>

          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 space-y-2 bg-card border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:-translate-y-1 card-hover">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Supply</div>
              <div className="text-3xl font-bold text-primary">1T</div>
              <div className="text-xs text-muted-foreground">$ASTER Tokens</div>
            </Card>
            <Card className="p-6 space-y-2 bg-card border-2 border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(94,234,212,0.3)] hover:-translate-y-1 card-hover">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Standard</div>
              <div className="text-3xl font-bold text-secondary">SPL</div>
              <div className="text-xs text-muted-foreground">Solana Token</div>
            </Card>
            <Card className="p-6 space-y-2 bg-card border-2 border-accent/30 hover:border-accent/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:-translate-y-1 card-hover">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Decimals</div>
              <div className="text-3xl font-bold text-accent">6</div>
              <div className="text-xs text-muted-foreground">Precision</div>
            </Card>
            <Card className="p-6 space-y-2 bg-card border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:-translate-y-1 card-hover">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Burn Rate</div>
              <div className="text-3xl font-bold text-primary">1%</div>
              <div className="text-xs text-muted-foreground">Per Transaction</div>
            </Card>
          </div>

          <Card
            className={`overflow-hidden bg-card border-2 border-border transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent">
                    <TableHead className="font-bold text-foreground">Category</TableHead>
                    <TableHead className="font-bold text-foreground">Allocation</TableHead>
                    <TableHead className="font-bold text-foreground">Tokens</TableHead>
                    <TableHead className="font-bold text-foreground">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokenomicsData.map((row, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200"
                    >
                      <TableCell className="font-medium">
                        <span className="mr-2">{row.emoji}</span>
                        {row.category}
                      </TableCell>
                      <TableCell className="text-primary font-bold">{row.allocation}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{row.tokens}</TableCell>
                      <TableCell className="text-muted-foreground">{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
