"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gauge } from "lucide-react"

interface FearGreedData {
  value: number
  value_classification: string
  timestamp: number
  time_until_update: number
}

export function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFearGreed = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/fear-greed")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch Fear & Greed Index")
      }
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching Fear & Greed Index:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFearGreed()
    const interval = setInterval(fetchFearGreed, 300000) // Refresh every 5 minutes (300,000 ms)
    return () => clearInterval(interval)
  }, [fetchFearGreed])

  const getProgressColor = (value: number) => {
    if (value <= 20) return "bg-red-700" // Extreme Fear (0-20)
    if (value <= 40) return "bg-red-500" // Fear (21-40)
    if (value <= 60) return "bg-yellow-500" // Neutral (41-60)
    if (value <= 80) return "bg-green-500" // Greed (61-80)
    return "bg-green-700" // Extreme Greed (81-100)
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (loading && !data) {
    return (
      <Card className="mb-6 border-border bg-card shadow-sm">
        <CardContent className="p-4 flex items-center justify-center text-muted-foreground">
          Loading Fear & Greed Index...
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 shadow-sm">
        <CardContent className="p-4 text-red-800 dark:text-red-200">
          Error loading Fear & Greed Index: {error}
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Card className="mb-6 border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold text-foreground">
          <Gauge className="w-5 h-5 mr-2 text-primary" />
          Crypto Fear & Greed Index
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-4xl font-bold text-foreground">{data.value}</span>
          <span className={`text-lg font-medium ${getProgressColor(data.value).replace("bg-", "text-")}`}>
            {data.value_classification}
          </span>
        </div>
        <Progress value={data.value} className={`h-2 bg-white ${getProgressColor(data.value)}`} />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Extreme Fear</span>
          <span>Neutral</span>
          <span>Extreme Greed</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Last updated: {formatTimestamp(data.timestamp)}</p>
      </CardContent>
    </Card>
  )
}
