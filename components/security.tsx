"use client"

import { Card } from "@/components/ui/card"
import { Shield, Lock, Flame, FileCheck, Users, CheckCircle2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Security() {
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

  const securityFeatures = [
    {
      icon: CheckCircle2,
      title: "Verified SPL Contract",
      description: "Smart contract verified on Solana blockchain",
    },
    {
      icon: Lock,
      title: "Multi-sig Treasury",
      description: "Secure multi-signature wallet for fund protection",
    },
    {
      icon: Flame,
      title: "Transparent Burns",
      description: "Publicly trackable burn address for all deflationary events",
    },
    {
      icon: FileCheck,
      title: "Third-party Audits",
      description: "Audits by SolAudit & CertiK (planned)",
    },
    {
      icon: Users,
      title: "DAO Governance",
      description: "Community-driven decision making through voting",
    },
    {
      icon: Shield,
      title: "Ownership Renounced",
      description: "Contract ownership renounced after launch",
    },
  ]

  return (
    <section id="security" className="py-20 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Security</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with security first — your trust is our foundation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className={`p-6 space-y-4 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] hover:-translate-y-1 card-hover ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-lg bg-primary/20 w-fit transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>

          <Card
            className={`p-8 md:p-12 bg-card border-2 border-border transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center">Technical Details</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2 transition-all duration-300 hover:scale-105">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Blockchain</div>
                  <div className="text-lg font-semibold">Solana</div>
                </div>
                <div className="space-y-2 transition-all duration-300 hover:scale-105">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Token Standard</div>
                  <div className="text-lg font-semibold">SPL</div>
                </div>
                <div className="space-y-2 transition-all duration-300 hover:scale-105">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Decimals</div>
                  <div className="text-lg font-semibold">6</div>
                </div>
                <div className="space-y-2 transition-all duration-300 hover:scale-105">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Supply</div>
                  <div className="text-lg font-semibold">1T $ASTER</div>
                </div>
                <div className="space-y-2 transition-all duration-300 hover:scale-105">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Language</div>
                  <div className="text-lg font-semibold">Rust (Anchor)</div>
                </div>
                <div className="space-y-2 transition-all duration-300 hover:scale-105">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Ticker</div>
                  <div className="text-lg font-semibold">$ASTER</div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className={`p-6 md:p-8 bg-muted/30 border-2 border-border transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-muted-foreground" />
                <h4 className="font-bold">Disclaimer</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                $ASTER is a community-driven meme project designed for entertainment and community engagement purposes.
                It does not constitute financial advice or a regulated investment. Always DYOR (Do Your Own Research)
                before participating in any crypto-related activities.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
