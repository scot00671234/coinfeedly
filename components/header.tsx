"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Wifi, WifiOff, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes" // Import useTheme hook
import { Button } from "@/components/ui/button" // Assuming you have a Button component

export function Header() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const { theme, setTheme } = useTheme() // Use the useTheme hook

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Update timestamp every minute
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 60000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [])

  const formatLastUpdate = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-blue-800 rounded-lg shadow-md">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Coin Feedly</h1>
            <p className="text-sm text-muted-foreground">Real-time crypto & finance news</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Live RSS</span>
            {isOnline ? (
              <div className="flex items-center space-x-1">
                <Wifi className="w-4 h-4 text-green-500" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <WifiOff className="w-4 h-4 text-red-500" />
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground">Updated {formatLastUpdate(lastUpdate)}</div>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:bg-secondary"
          >
            {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
