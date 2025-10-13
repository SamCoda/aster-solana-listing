import Image from "next/image"
import { MessageCircle, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 drop-shadow-[0_0_15px_rgba(167,139,250,0.4)]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xlKE07cZA3YwvA23c65NNvGkMYxbDJ.png"
                    alt="ASTER Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-primary">ASTER</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                The meme that blossoms on Solana. A community-powered movement bringing fun, art, and energy back to
                crypto. 🌸
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://t.me/asterxsolana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-all hover:shadow-[0_0_15px_rgba(167,139,250,0.4)]"
                  aria-label="Telegram"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/asterxsolana?s=21&t=sIzHpkKCWxRaT7kb3a7OKg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-all hover:shadow-[0_0_15px_rgba(94,234,212,0.4)]"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/asterxsolana?igsh=MTlubGJ3Y3V1ZWxuMw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#tokenomics" className="text-muted-foreground hover:text-primary transition-colors">
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#utility" className="text-muted-foreground hover:text-primary transition-colors">
                    Utility
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground">Whitepaper v1.2</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Audit (Coming Soon)</span>
                </li>
                <li>
                  <a href="#community" className="text-muted-foreground hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground">Contract Address (TBA)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © 2025 ASTER SOLANA. All rights reserved. Built on Solana.
              </p>
              <p className="text-sm text-muted-foreground text-center md:text-right">Whitepaper v1.2 • October 2025</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
