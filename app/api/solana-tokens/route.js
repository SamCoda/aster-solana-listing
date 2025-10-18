import axios from "axios"

export async function GET() {
  try {
    const listingsResponse = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "bd612f3c16e74bcbb1bbc79d1b8590cc",
        },
        params: {
          limit: 200,
          convert: "USD",
        },
      }
    )

    const solanaTokens = listingsResponse.data.data.filter(
      (coin) =>
        coin.platform?.name?.toLowerCase() === "solana" ||
        coin.symbol.toLowerCase().includes("sol") ||
        coin.name.toLowerCase().includes("sol")
    )

    const topSolana = solanaTokens
      .sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h)
      .slice(0, 17)

    const ids = topSolana.map((t) => t.id).join(",")

    const infoResponse = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${ids}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "bd612f3c16e74bcbb1bbc79d1b8590cc",
        },
      }
    )

    const infoData = infoResponse.data.data

    const tokensWithLogos = topSolana.map((token) => ({
      ...token,
      logo: infoData[token.id]?.logo || null,
    }))

    return new Response(JSON.stringify(tokensWithLogos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    return new Response(
      JSON.stringify({ error: "Failed to fetch Solana tokens" }),
      { status: 500 }
    )
  }
}