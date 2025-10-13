import { Sidebar } from "@/components/sidebar"
import { TopTicker } from "@/components/top-ticker"
import { PromotedCoins } from "@/components/promoted-coins"
import { CoinsTable } from "@/components/coins-table"

export default function Home() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 ml-16 w-full overflow-x-hidden">
        <TopTicker />
        <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <PromotedCoins />
          <CoinsTable />
        </main>
      </div>
    </div>
  )
}
