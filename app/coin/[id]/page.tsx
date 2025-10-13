import { Sidebar } from "@/components/sidebar"
import { TopTicker } from "@/components/top-ticker"
import { CoinDetail } from "@/components/coin-detail"
import { allCoins } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default function CoinPage({ params }: { params: { id: string } }) {
  const coin = allCoins.find((c) => c.id === params.id)

  if (!coin) {
    notFound()
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-16">
        <TopTicker />
        <main className="p-6">
          <CoinDetail coin={coin} />
        </main>
      </div>
    </div>
  )
}
