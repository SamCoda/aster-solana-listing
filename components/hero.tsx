"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-10 md:gap-16">
          <div
            className={`relative w-32 h-32 md:w-40 md:h-40 animate-glow-pulse transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xlKE07cZA3YwvA23c65NNvGkMYxbDJ.png"
              alt="ASTER Logo"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(167,139,250,0.6)]"
              priority
            />
          </div>

          <div
            className={`max-w-5xl space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-primary drop-shadow-[0_0_30px_rgba(167,139,250,0.5)]">ASTER SOLANA</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
              The Meme That Blossoms on Solana
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
              A community-powered movement bringing fun, art, and energy back to crypto
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-background text-lg px-10 py-6 font-semibold neon-glow group transition-all duration-300"
            >
              Buy $ASTER
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 font-semibold border-2 border-primary/50 hover:bg-primary/10 bg-transparent transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
              asChild
            >
              <a href="#tokenomics">Tokenomics</a>
            </Button>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl pt-12 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-2 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-primary">1T</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Supply</div>
            </div>
            <div className="space-y-2 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-secondary">30%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Presale</div>
            </div>
            <div className="space-y-2 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-accent">20%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Community</div>
            </div>
            <div className="space-y-2 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-primary">1%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Burn/TX</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
