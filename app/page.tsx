"use client"

import { useState, useEffect, useCallback } from "react"
import { NewsCard } from "@/components/news-card"
import { FilterBar } from "@/components/filter-bar"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { CryptoTicker } from "@/components/crypto-ticker"
import { FearGreedIndex } from "@/components/fear-greed-index" // Import the new component
import type { NewsArticle, FilterCategory } from "@/types/news"

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  // Fetch news data from RSS API
  const fetchNews = useCallback(async (pageNum: number, category: FilterCategory, reset = false) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/rss?page=${pageNum}&category=${category}&limit=10`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch news")
      }

      if (reset) {
        setArticles(data.articles)
      } else {
        setArticles((prev) => [...prev, ...data.articles])
      }

      setHasMore(data.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchNews(1, activeFilter, true)
    setPage(1)
  }, [fetchNews, activeFilter])

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 &&
        !loading &&
        hasMore &&
        !error
      ) {
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, error])

  // Load more articles when page changes
  useEffect(() => {
    if (page > 1) {
      fetchNews(page, activeFilter)
    }
  }, [page, fetchNews, activeFilter])

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter)
    setExpandedArticle(null)
    setPage(1)
    setError(null)
  }

  const handleArticleExpand = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId)
  }

  const handleRetry = () => {
    setError(null)
    setPage(1)
    fetchNews(1, activeFilter, true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <CryptoTicker />
      <FearGreedIndex /> {/* Add the FearGreedIndex component here */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        <div className="space-y-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isExpanded={expandedArticle === article.id}
              onExpand={() => handleArticleExpand(article.id)}
            />
          ))}

          {loading && (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          )}

          {!hasMore && articles.length > 0 && !loading && (
            <div className="text-center py-8 text-muted-foreground">You've reached the end of the feed</div>
          )}

          {articles.length === 0 && !loading && !error && (
            <div className="text-center py-12 text-muted-foreground">No articles found for the selected filter</div>
          )}
        </div>
      </main>
    </div>
  )
}
