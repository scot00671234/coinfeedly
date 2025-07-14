export interface NewsArticle {
  id: string
  title: string
  summary: string
  fullContent: string
  url: string
  source: string
  category: FilterCategory
  publishedAt: string
  imageUrl?: string
}

export type FilterCategory = "all" | "bitcoin" | "defi" | "macro" | "altcoins"
