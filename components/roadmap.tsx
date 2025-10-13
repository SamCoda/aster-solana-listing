"use client"

import { Card } from "@/components/ui/card"
import { Sprout, Gem, Flower2, Sun, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Roadmap() {
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

  const phases = [
    {
      icon: Sprout,
      phase: "Phase 1 – Seed",
      timeline: "Q4 2025 (Oct – Nov)",
      status: "In Progress",
      milestones: [
        "Branding & whitepaper release",
        "Website launch",
        "Community setup (Telegram, X, Instagram)",
        "Public & private presale preparation",
      ],
    },
    {
      icon: Gem,
      phase: "Phase 2 – Presale",
      timeline: "Q4 2025 (Nov – Dec)",
      status: "Upcoming",
      milestones: ["Marketing campaign launch", "Whitelist rounds", "Private presale", "Public presale"],
    },
    {
      icon: Flower2,
      phase: "Phase 3 – Bloom",
      timeline: "Q1 2026 (Jan – Mar)",
      status: "Planned",
      milestones: [
        "Token launch on Raydium (DEX)",
        "First airdrops to community",
        'NFT "Blossom Collection" release',
        "CoinMarketCap & CoinGecko listings",
      ],
    },
    {
      icon: Sun,
      phase: "Phase 4 – Shine",
      timeline: "Q2 2026 (Apr – Jun)",
      status: "Planned",
      milestones: [
        "Staking platform launch",
        "DAO governance activation",
        "First major burn event",
        "CEX listing applications",
      ],
    },
    {
      icon: Sparkles,
      phase: "Phase 5 – Universe",
      timeline: "Q3–Q4 2026 (Jul – Dec)",
      status: "Planned",
      milestones: [
        "Strategic partnerships",
        "Cross-chain expansion",
        "Metaverse collaborations",
        "Global community events",
      ],
    },
  ]

  return (
    <section id="roadmap" className="py-20 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-accent">Roadmap</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From seed to universe — watch ASTER bloom across the Solana ecosystem
            </p>
          </div>

          <div className="space-y-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              const isActive = phase.status === "In Progress"

              return (
                <Card
                  key={index}
                  className={`p-6 md:p-8 bg-card border-2 transition-all duration-500 ${
                    isActive
                      ? "border-primary/60 shadow-[0_0_30px_rgba(167,139,250,0.2)] animate-glow-border"
                      : "border-border hover:border-primary/30"
                  } hover:-translate-y-1 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4 md:w-72 shrink-0">
                      <div className="p-3 rounded-lg bg-primary/20 transition-transform duration-300 hover:scale-110">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{phase.phase}</h3>
                        <div className="text-sm text-muted-foreground">{phase.timeline}</div>
                        <div
                          className={`inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                            isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {phase.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      {phase.milestones.map((milestone, mIndex) => (
                        <div
                          key={mIndex}
                          className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <p className="text-muted-foreground text-sm">{milestone}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
