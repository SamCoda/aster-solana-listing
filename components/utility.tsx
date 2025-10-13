"use client"

import { Card } from "@/components/ui/card"
import { Wallet, ImageIcon, Vote, Laugh, Heart, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Utility() {
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

  const utilities = [
    {
      icon: Wallet,
      title: "Staking",
      description: "Earn passive rewards in $ASTER and partner tokens by staking your holdings",
    },
    {
      icon: ImageIcon,
      title: "NFT Integration",
      description: '"Blossom Collection" NFTs with exclusive perks and community benefits',
    },
    {
      icon: Vote,
      title: "Community DAO",
      description: "Token holders vote on proposals and upgrades, shaping ASTER's future",
    },
    {
      icon: Laugh,
      title: "Meme-to-Earn",
      description: "Compete in meme contests for token prizes and community recognition",
    },
    {
      icon: Heart,
      title: "Charity Integration",
      description: "Community-voted donations for creative and environmental causes",
    },
    {
      icon: Zap,
      title: "Fast & Low Cost",
      description: "Built on Solana for lightning-fast transactions with minimal fees",
    },
  ]

  return (
    <section id="utility" className="py-20 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-secondary">Utility</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              More than just a meme — $ASTER combines fun with real utility and community governance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility, index) => {
              const Icon = utility.icon
              return (
                <Card
                  key={index}
                  className={`p-6 space-y-4 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] hover:-translate-y-1 card-hover ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-lg bg-primary/20 w-fit transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{utility.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{utility.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
