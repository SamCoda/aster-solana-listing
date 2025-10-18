// src/lib/fetchSolanaCoins.ts
export async function fetchSolanaCoins() {
  const res = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&convert=USD",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_CMC_API_KEY!, // store key in .env
      },
      next: { revalidate: 60 }, // refresh every 60 seconds (for Next.js)
    }
  );

  const json = await res.json();

  // Filter Solana-based tokens (based on platform or name)
  const solanaCoins = json.data.filter(
    (coin: any) =>
      coin.platform?.name === "Solana" || coin.name.toLowerCase().includes("sol")
  );

  return solanaCoins.map((coin: any, index: number) => ({
    id: coin.id,
    rank: coin.cmc_rank,
    name: coin.name,
    ticker: coin.symbol,
    logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
    price: coin.quote.USD.price,
    change1h: coin.quote.USD.percent_change_1h,
    change24h: coin.quote.USD.percent_change_24h,
    change7d: coin.quote.USD.percent_change_7d,
    marketCap: coin.quote.USD.market_cap,
    fdv: coin.quote.USD.fully_diluted_market_cap,
    volume24h: coin.quote.USD.volume_24h,
    votes: Math.floor(Math.random() * 10000),
    categories: ["Solana"],
  }));
}
