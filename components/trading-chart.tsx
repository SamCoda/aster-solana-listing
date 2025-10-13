"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const generateChartData = (days: number) => {
  const data = []
  const now = Date.now()
  const basePrice = 0.01525

  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000
    const randomChange = (Math.random() - 0.5) * 0.002
    const price = basePrice + randomChange + (Math.random() - 0.5) * 0.001
    data.push({
      time: new Date(timestamp).toLocaleDateString(),
      price: price,
    })
  }
  return data
}

export function TradingChart() {
  const [timeframe, setTimeframe] = useState("1d")
  const [chartData, setChartData] = useState(generateChartData(1))

  const timeframes = [
    { label: "1m", value: "1m", days: 0.0007 },
    { label: "5m", value: "5m", days: 0.0035 },
    { label: "1h", value: "1h", days: 0.042 },
    { label: "4h", value: "4h", days: 0.167 },
    { label: "1d", value: "1d", days: 1 },
    { label: "5d", value: "5d", days: 5 },
    { label: "1m", value: "1mo", days: 30 },
    { label: "3m", value: "3m", days: 90 },
    { label: "6m", value: "6m", days: 180 },
    { label: "1y", value: "1y", days: 365 },
  ]

  const handleTimeframeChange = (tf: string, days: number) => {
    setTimeframe(tf)
    setChartData(generateChartData(Math.max(1, Math.floor(days))))
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {timeframes.map((tf) => (
          <Button
            key={tf.value}
            variant={timeframe === tf.value ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTimeframeChange(tf.value, tf.days)}
            className="text-xs"
          >
            {tf.label}
          </Button>
        ))}
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20, 20, 30, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Line type="monotone" dataKey="price" stroke="#00d4ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
