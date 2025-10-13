import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { VoteProvider } from "@/lib/vote-context"
import { DataProvider } from "@/lib/data-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "ASTER SOLANA Listing - Crypto Token Platform",
  description:
    "Discover leading cryptocurrencies on Solana voted by the community. Real-time prices, market data, and trending tokens.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
            <head>
        <link rel="shortcut icon" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xlKE07cZA3YwvA23c65NNvGkMYxbDJ.png" type="image/x-icon" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <DataProvider>
          <VoteProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </VoteProvider>
        </DataProvider>
        <Analytics />
      </body>
    </html>
  )
}
