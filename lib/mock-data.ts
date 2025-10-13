export interface Coin {
  id: string
  rank: number
  name: string
  ticker: string
  logo: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  marketCap: number
  fdv: number
  volume24h: number
  votes: number
  categories: string[]
  promoted?: boolean
}

export const mockCoins: Coin[] = [
  {
    id: "ufd",
    rank: 2,
    name: "Unicorn Fart Dust",
    ticker: "UFD",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ufd",
    price: 0.01525,
    change1h: 0.33,
    change24h: 2.94,
    change7d: 3.65,
    marketCap: 15179827,
    fdv: 15179827,
    volume24h: 255918,
    votes: 523,
    categories: ["Memes"],
    promoted: true,
  },
  {
    id: "pongo",
    rank: 38,
    name: "PONGO",
    ticker: "PONGO",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=pongo",
    price: 0.000203,
    change1h: -0.45,
    change24h: -8.91,
    change7d: 12.34,
    marketCap: 203000,
    fdv: 203000,
    volume24h: 8702,
    votes: 189,
    categories: ["Gaming"],
    promoted: true,
  },
  {
    id: "aster",
    rank: 1,
    name: "ASTER SOLANA",
    ticker: "ASTER",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xlKE07cZA3YwvA23c65NNvGkMYxbDJ.png",
    price: 0.00089,
    change1h: 1.2,
    change24h: 15.4,
    change7d: 45.8,
    marketCap: 25000000,
    fdv: 25000000,
    volume24h: 1250000,
    votes: 1887,
    categories: ["Memes", "Ecosystems"],
    promoted: true,
  },
  {
    id: "hold",
    rank: 42,
    name: "Hold",
    ticker: "HOLD",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=hold",
    price: 0.0005104,
    change1h: -0.65,
    change24h: 10.33,
    change7d: 45.23,
    marketCap: 14187654,
    fdv: 14187654,
    volume24h: 60784,
    votes: 734,
    categories: ["AI Agents"],
  },
  {
    id: "gm",
    rank: 52,
    name: "GM",
    ticker: "GM",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=gm",
    price: 0.0001783,
    change1h: 0.49,
    change24h: 22.19,
    change7d: 30.69,
    marketCap: 177373,
    fdv: 177373,
    volume24h: 8702,
    votes: 94,
    categories: ["Ecosystems"],
  },
  {
    id: "monke",
    rank: 60,
    name: "monke",
    ticker: "MONKE",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=monke",
    price: 0.0006662,
    change1h: 0.36,
    change24h: 43.39,
    change7d: 40.89,
    marketCap: 666198,
    fdv: 666198,
    volume24h: 41783,
    votes: 601,
    categories: ["Memes"],
  },
  {
    id: "w00d",
    rank: 181,
    name: "w00d",
    ticker: "W00D",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=w00d",
    price: 0.001333,
    change1h: 3.73,
    change24h: 14.181,
    change7d: 23.03,
    marketCap: 1330000,
    fdv: 1330000,
    volume24h: 32337,
    votes: 137,
    categories: ["Ecosystems"],
  },
]

export function generateMoreCoins(count: number): Coin[] {
  const names = [
    "MARS",
    "ACHAN",
    "pibble",
    "RCON",
    "AISLOP",
    "manifest",
    "KITTY",
    "PEPE",
    "CHUCK",
    "LOX",
    "BlackCoin",
    "BROAR",
    "NEURO",
    "PHNDLE",
    "SWF",
  ]
  const categories = ["Memes", "Gaming", "AI Agents", "Ecosystems", "DeFi"]

  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    const change24h = (Math.random() - 0.5) * 40
    return {
      id: `coin-${i}`,
      rank: mockCoins.length + i + 1,
      name: `${name} ${i}`,
      ticker: name.toUpperCase(),
      logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${name}${i}`,
      price: Math.random() * 0.01,
      change1h: (Math.random() - 0.5) * 5,
      change24h,
      change7d: (Math.random() - 0.5) * 50,
      marketCap: Math.random() * 10000000,
      fdv: Math.random() * 10000000,
      volume24h: Math.random() * 1000000,
      votes: Math.floor(Math.random() * 1000),
      categories: [categories[Math.floor(Math.random() * categories.length)]],
    }
  })
}

export const allCoins = [...mockCoins, ...generateMoreCoins(20)]
