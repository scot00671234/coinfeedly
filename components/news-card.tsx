"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, ExternalLink, Globe } from "lucide-react"
import type { NewsArticle } from "@/types/news"

interface NewsCardProps {
  article: NewsArticle
  isExpanded: boolean
  onExpand: () => void
}

export function NewsCard({ article, isExpanded, onExpand }: NewsCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "bitcoin":
        return "bg-orange-600/20 text-orange-300 border-orange-600/30"
      case "defi":
        return "bg-purple-600/20 text-purple-300 border-purple-600/30"
      case "stocks": // Keep for existing data, though filter is removed
        return "bg-green-600/20 text-green-300 border-green-600/30"
      case "macro":
        return "bg-blue-600/20 text-blue-300 border-blue-600/30"
      case "altcoins":
        return "bg-pink-600/20 text-pink-300 border-pink-600/30"
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-600/30"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const articleTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - articleTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    return articleTime.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getSourceIcon = (source: string) => {
    const lowerSource = source.toLowerCase()
    if (lowerSource.includes("coin") || lowerSource.includes("crypto")) {
      return "🪙"
    } else if (lowerSource.includes("blockworks") || lowerSource.includes("the block")) {
      return "🧱"
    } else if (lowerSource.includes("dl news")) {
      return "📰"
    }
    return "🌐" // Default globe icon
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-xl border border-border bg-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(article.category)} border px-2 py-0.5 text-xs font-semibold`}>
                {article.category.toUpperCase()}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {formatTimeAgo(article.publishedAt)}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
              {article.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{article.summary}</p>
          </div>
          {article.imageUrl ? (
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-28 h-28 object-cover rounded-lg flex-shrink-0 border border-border shadow-sm"
            />
          ) : (
            <div className="w-28 h-28 bg-secondary rounded-lg flex-shrink-0 flex flex-col items-center justify-center text-center text-xs font-medium text-muted-foreground p-2 border border-border shadow-sm">
              <Globe className="w-8 h-8 mb-1 text-primary" />
              <span className="leading-tight">{article.source}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Globe className="w-3 h-3 mr-1" />
            <span className="mr-1">{getSourceIcon(article.source)}</span>
            <span>{article.source}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExpand}
              className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-3 py-1.5 h-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Read Full Article
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-foreground hover:bg-secondary w-8 h-8"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="prose prose-invert max-w-none">
              <div className="text-muted-foreground leading-relaxed space-y-4">
                {article.fullContent.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-secondary text-foreground hover:bg-secondary/80"
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read full article on {article.source}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
