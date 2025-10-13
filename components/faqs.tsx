"use client"

import { useState } from "react"


export function Faqs() {

      const [expandedFaq, setExpandedFaq] = useState<number | null>(null)



      const faqs = [
    {
      question: `What is the current price of ${coin.ticker} token?`,
      answer: `The current price of ${coin.name} (${coin.ticker}) is $${coin.price.toFixed(6)} USD.`,
    },
    {
      question: `How much ${coin.ticker} tokens can I purchase with $100 USD?`,
      answer: `With $100 USD, you can purchase approximately ${(100 / coin.price).toFixed(0)} ${coin.ticker} tokens at the current price.`,
    },
    {
      question: `What is the market cap of ${coin.name} coin?`,
      answer: `The current market cap of ${coin.name} is $${(coin.marketCap / 1000000).toFixed(2)}M USD.`,
    },
    {
      question: `What is the fully diluted valuation (FDV) of ${coin.ticker} coin?`,
      answer: `The fully diluted valuation of ${coin.name} is $${(coin.fdv / 1000000).toFixed(2)}M USD.`,
    },
    {
      question: `What is the contract address for ${coin.ticker} (${coin.name})?`,
      answer: `The contract address for ${coin.name} can be found on the official website or blockchain explorer.`,
    },
    {
      question: `What is the daily trading volume of ${coin.ticker}?`,
      answer: `The 24-hour trading volume of ${coin.name} is $${(coin.volume24h / 1000).toFixed(0)}K USD.`,
    },
    {
      question: `What is the liquidity of ${coin.ticker}?`,
      answer: `The total liquidity of ${coin.name} varies based on DEX pools and can be checked on DeFi analytics platforms.`,
    },
    {
      question: `How do I buy ${coin.ticker} tokens?`,
      answer: `You can buy ${coin.ticker} tokens on decentralized exchanges (DEX) like Raydium or Jupiter by connecting your wallet.`,
    },
  ]
  return (
    <div>
            {/* FAQs */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{coin.name} Live Price & FAQs</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth text-left"
              >
                <span className="font-medium">{faq.question}</span>
                {expandedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 text-muted-foreground">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

