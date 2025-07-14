"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface CryptoPrice {
  id: string
  name: string
  price: number
  change24h: number
}

export function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/crypto-prices")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch crypto prices")
      }
      setPrices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching crypto prices:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Fetch every 60 seconds
    return () => clearInterval(interval)
  }, [fetchPrices])

  if (loading && prices.length === 0) {
    return (
      <div className="w-full bg-secondary py-2 flex items-center justify-center text-muted-foreground text-sm border-b border-border">
        Loading crypto prices...
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full bg-destructive/20 text-destructive-foreground py-2 flex items-center justify-center text-sm border-b border-border">
        Error loading prices: {error}
      </div>
    )
  }

  if (prices.length === 0) {
    return null // Don't render if no prices are available
  }

  return (
    <div className="w-full bg-secondary py-2 overflow-hidden relative border-b border-border shadow-inner">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Duplicate content to ensure continuous scroll */}
        {[...prices, ...prices, ...prices].map((crypto, index) => (
          <div
            key={`${crypto.id}-${index}`}
            className="inline-flex items-center mx-4 text-sm font-medium text-foreground"
          >
            <span className="mr-2 text-primary">{crypto.name}:</span>
            <span className="mr-2">${crypto.price.toFixed(2)}</span>
            {crypto.change24h !== undefined && (
              <span className={`flex items-center ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {crypto.change24h >= 0 ? (
                  <ArrowUp className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDown className="w-3 h-3 mr-0.5" />
                )}
                {crypto.change24h.toFixed(2)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
