// app/api/live-prices/route.ts
import axios from "axios"

export async function GET() {
  try {
    const symbols = ["BONK", "JTO", "WIF", "SAMO", "MOBILE", "BOME"] // your promoted tokens
    const symbolString = symbols.join(",")

    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY || "bd612f3c16e74bcbb1bbc79d1b8590cc",
        },
        params: {
          symbol: symbolString,
          convert: "USD",
        },
      }
    )

    const data = response.data.data

    const coins = Object.values(data).map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.quote.USD.price,
      marketCap: coin.quote.USD.market_cap,
      change24h: coin.quote.USD.percent_change_24h,
      change7d: coin.quote.USD.percent_change_7d,
      volume24h: coin.quote.USD.volume_24h,
      fdv: coin.quote.USD.fully_diluted_market_cap,
    }))

    return new Response(JSON.stringify(coins), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Error fetching live prices:", err)
    return new Response(JSON.stringify({ error: "Failed to fetch live prices" }), { status: 500 })
  }
}
