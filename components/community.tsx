import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Twitter, Instagram, ExternalLink } from "lucide-react"

export function Community() {
  const socialLinks = [
    {
      icon: MessageCircle,
      name: "Telegram",
      handle: "@asterxsolana",
      url: "https://t.me/asterxsolana",
      description: "Join our vibrant community chat",
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      handle: "@asterxsolana",
      url: "https://x.com/asterxsolana?s=21&t=sIzHpkKCWxRaT7kb3a7OKg",
      description: "Follow for updates and memes",
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@asterxsolana",
      url: "https://www.instagram.com/asterxsolana?igsh=MTlubGJ3Y3V1ZWxuMw==",
      description: "Visual content and community highlights",
    },
  ]

  return (
    <section id="community" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-secondary">Community</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow ASTER holders, share memes, and help shape the future of our ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <Card
                  key={index}
                  className="p-6 space-y-4 bg-card border-2 border-border hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] group"
                >
                  <div className="p-3 rounded-lg bg-primary/20 w-fit group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{social.name}</h3>
                    <p className="text-sm text-muted-foreground">{social.description}</p>
                    <p className="text-sm font-mono text-primary">{social.handle}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-colors border-2 bg-transparent"
                    asChild
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      Visit
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </Card>
              )
            })}
          </div>

          <Card className="p-8 md:p-12 bg-card border-2 border-primary/30 hover:border-primary/50 transition-all shadow-[0_0_30px_rgba(167,139,250,0.15)]">
            <div className="text-center space-y-6">
              <div className="text-5xl md:text-6xl">🌸</div>
              <h3 className="text-2xl md:text-3xl font-bold">Let it Bloom on Solana</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Together, we grow, we laugh, we bloom. Join thousands of community members building the most creative
                memecoin on Solana.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-background text-lg px-8 neon-glow"
                  asChild
                >
                  <a href="https://t.me/asterxsolana" target="_blank" rel="noopener noreferrer">
                    Join Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-2 border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  Buy $ASTER
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm border border-primary/30">
                #ASTERcoin
              </span>
              <span className="px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm border border-secondary/30">
                #SolanaMeme
              </span>
              <span className="px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm border border-accent/30">
                #LetItBloom
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
