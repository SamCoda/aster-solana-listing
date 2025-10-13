"use client"

import { Card } from "@/components/ui/card"
import { Target, Rocket, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function About() {
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

  return (
    <section id="about" className="py-20 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div
            className={`text-center space-y-6 max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Welcome to ASTER</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              In a market overflowing with memecoins, ASTER SOLANA ($ASTER) rises as a fresh, community-powered movement
              built on the Solana blockchain. The Aster flower, a symbol of hope and renewal, inspires our mission: to
              bring fun, art, and community energy back to crypto — and let it bloom across Solana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className={`p-8 space-y-6 bg-card border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:-translate-y-1 card-hover ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/20 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become the most creative and community-centric memecoin on Solana — a symbol of growth, optimism, and
                cultural relevance in Web3. We want $ASTER to be "the flower of Solana" — colorful, lively, and powered
                by its people.
              </p>
            </Card>

            <Card
              className={`p-8 space-y-6 bg-card border-2 border-secondary/30 hover:border-secondary/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(94,234,212,0.3)] hover:-translate-y-1 card-hover ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-secondary/20 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <Rocket className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Mission</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
                  <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span>Build a transparent and sustainable token economy</span>
                </li>
                <li className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
                  <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span>Empower creators, artists, and meme-makers through real rewards</span>
                </li>
                <li className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
                  <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span>Establish a community-governed DAO to shape ASTER's direction</span>
                </li>
                <li className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
                  <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span>Create a brand that brings fun and positive energy to Solana</span>
                </li>
              </ul>
            </Card>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="text-center space-y-3 transition-all duration-300 hover:scale-110">
              <div className="text-5xl">🌸</div>
              <div className="font-semibold text-foreground">Symbol</div>
              <div className="text-sm text-muted-foreground">Aster Flower</div>
            </div>
            <div className="text-center space-y-3 transition-all duration-300 hover:scale-110">
              <div className="w-12 h-12 rounded-full bg-primary mx-auto neon-glow" />
              <div className="font-semibold text-foreground">Primary</div>
              <div className="text-sm text-muted-foreground">Lavender Purple</div>
            </div>
            <div className="text-center space-y-3 transition-all duration-300 hover:scale-110">
              <div className="text-5xl">💎</div>
              <div className="font-semibold text-foreground">Blockchain</div>
              <div className="text-sm text-muted-foreground">Solana SPL</div>
            </div>
            <div className="text-center space-y-3 transition-all duration-300 hover:scale-110">
              <div className="text-5xl">🚀</div>
              <div className="font-semibold text-foreground">Slogan</div>
              <div className="text-sm text-muted-foreground">Let it Bloom</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
