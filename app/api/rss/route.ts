import { type NextRequest, NextResponse } from "next/server"

// Simplified RSS sources that are more likely to work
const RSS_SOURCES = [
  { url: "https://www.coindesk.com/feed/", category: "bitcoin", source: "CoinDesk" },
  { url: "https://cointelegraph.com/rss", category: "altcoins", source: "Cointelegraph" },
  { url: "https://bitcoinist.com/feed/", category: "bitcoin", source: "Bitcoinist" },
  { url: "https://decrypt.co/feed", category: "altcoins", source: "Decrypt" },
  { url: "https://www.theblockcrypto.com/rss", category: "macro", source: "The Block" },
  { url: "https://www.blockworks.co/feed", category: "defi", source: "Blockworks" },
  { url: "https://www.dlnews.com/rss", category: "macro", source: "DL News" },
]

interface NewsArticle {
  id: string
  title: string
  summary: string
  fullContent: string
  url: string
  source: string
  category: string
  publishedAt: string
  imageUrl?: string
}

function categorizeArticle(title: string, description: string, source: string): string {
  const text = (title + " " + description).toLowerCase()

  if (text.includes("bitcoin") || text.includes("btc")) return "bitcoin"
  if (text.includes("defi") || text.includes("decentralized finance")) return "defi"
  if (text.includes("ethereum") || text.includes("eth") || text.includes("altcoin")) return "altcoins"
  if (text.includes("fed") || text.includes("interest rate") || text.includes("inflation")) return "macro"

  // Default categorization based on source
  if (source.toLowerCase().includes("coin") || source.toLowerCase().includes("crypto")) {
    return "altcoins"
  }

  // Articles that would have been 'stocks' or general finance now fall under 'macro'
  return "macro"
}

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&hellip;/g, "…")
    .replace(/&euro;/g, "€")
    .replace(/&pound;/g, "£")
    .replace(/&yen;/g, "¥")
    .replace(/&cent;/g, "¢")
    .replace(/&copy;/g, "©")
    .replace(/&reg;/g, "®")
    .replace(/&trade;/g, "™")
    .replace(/&deg;/g, "°")
    .replace(/&plusmn;/g, "±")
    .replace(/&times;/g, "×")
    .replace(/&divide;/g, "÷")
    .replace(/&frac14;/g, "¼")
    .replace(/&frac12;/g, "½")
    .replace(/&frac34;/g, "¾")
    .replace(/&prime;/g, "′")
    .replace(/&Prime;/g, "″")
    .replace(/&larr;/g, "←")
    .replace(/&uarr;/g, "↑")
    .replace(/&rarr;/g, "→")
    .replace(/&darr;/g, "↓")
    .replace(/&harr;/g, "↔")
    .replace(/&crarr;/g, "↵")
    .replace(/&forall;/g, "∀")
    .replace(/&part;/g, "∂")
    .replace(/&exist;/g, "∃")
    .replace(/&empty;/g, "∅")
    .replace(/&nabla;/g, "∇")
    .replace(/&isin;/g, "∈")
    .replace(/&notin;/g, "∉")
    .replace(/&ni;/g, "∋")
    .replace(/&prod;/g, "∏")
    .replace(/&sum;/g, "∑")
    .replace(/&minus;/g, "−")
    .replace(/&lowast;/g, "∗")
    .replace(/&radic;/g, "√")
    .replace(/&prop;/g, "∝")
    .replace(/&infin;/g, "∞")
    .replace(/&ang;/g, "∠")
    .replace(/&and;/g, "∧")
    .replace(/&or;/g, "∨")
    .replace(/&cap;/g, "∩")
    .replace(/&cup;/g, "∪")
    .replace(/&int;/g, "∫")
    .replace(/&there4;/g, "∴")
    .replace(/&sim;/g, "∼")
    .replace(/&cong;/g, "≅")
    .replace(/&asymp;/g, "≈")
    .replace(/&ne;/g, "≠")
    .replace(/&equiv;/g, "≡")
    .replace(/&le;/g, "≤")
    .replace(/&ge;/g, "≥")
    .replace(/&sub;/g, "⊂")
    .replace(/&sup;/g, "⊃")
    .replace(/&nsub;/g, "⊄")
    .replace(/&sube;/g, "⊆")
    .replace(/&supe;/g, "⊇")
    .replace(/&oplus;/g, "⊕")
    .replace(/&otimes;/g, "⊗")
    .replace(/&perp;/g, "⊥")
    .replace(/&sdot;/g, "⋅")
    .replace(/&lceil;/g, "⌈")
    .replace(/&rceil;/g, "⌉")
    .replace(/&lfloor;/g, "⌊")
    .replace(/&rfloor;/g, "⌋")
    .replace(/&lang;/g, "〈")
    .replace(/&rang;/g, "〉")
    .replace(/&loz;/g, "◊")
    .replace(/&spades;/g, "♠")
    .replace(/&clubs;/g, "♣")
    .replace(/&hearts;/g, "♥")
    .replace(/&diams;/g, "♦")
    .replace(/&Alpha;/g, "Α")
    .replace(/&Beta;/g, "Β")
    .replace(/&Gamma;/g, "Γ")
    .replace(/&Delta;/g, "Δ")
    .replace(/&Epsilon;/g, "Ε")
    .replace(/&Zeta;/g, "Ζ")
    .replace(/&Eta;/g, "Η")
    .replace(/&Theta;/g, "Θ")
    .replace(/&Iota;/g, "Ι")
    .replace(/&Kappa;/g, "Κ")
    .replace(/&Lambda;/g, "Λ")
    .replace(/&Mu;/g, "Μ")
    .replace(/&Nu;/g, "Ν")
    .replace(/&Xi;/g, "Ξ")
    .replace(/&Omicron;/g, "Ο")
    .replace(/&Pi;/g, "Π")
    .replace(/&Rho;/g, "Ρ")
    .replace(/&Sigma;/g, "Σ")
    .replace(/&Tau;/g, "Τ")
    .replace(/&Upsilon;/g, "Υ")
    .replace(/&Phi;/g, "Φ")
    .replace(/&Chi;/g, "Χ")
    .replace(/&Psi;/g, "Ψ")
    .replace(/&Omega;/g, "Ω")
    .replace(/&alpha;/g, "α")
    .replace(/&beta;/g, "β")
    .replace(/&gamma;/g, "γ")
    .replace(/&delta;/g, "δ")
    .replace(/&epsilon;/g, "ε")
    .replace(/&zeta;/g, "ζ")
    .replace(/&eta;/g, "η")
    .replace(/&theta;/g, "θ")
    .replace(/&iota;/g, "ι")
    .replace(/&kappa;/g, "κ")
    .replace(/&lambda;/g, "λ")
    .replace(/&mu;/g, "μ")
    .replace(/&nu;/g, "ν")
    .replace(/&xi;/g, "ξ")
    .replace(/&omicron;/g, "ο")
    .replace(/&pi;/g, "π")
    .replace(/&rho;/g, "ρ")
    .replace(/&sigmaf;/g, "ς")
    .replace(/&sigma;/g, "σ")
    .replace(/&tau;/g, "τ")
    .replace(/&upsilon;/g, "υ")
    .replace(/&phi;/g, "φ")
    .replace(/&chi;/g, "χ")
    .replace(/&psi;/g, "ψ")
    .replace(/&omega;/g, "ω")
    .replace(/&thetasym;/g, "ϑ")
    .replace(/&upsih;/g, "ϒ")
    .replace(/&piv;/g, "ϖ")
    .replace(/&bull;/g, "•")
    .replace(/&prime;/g, "′")
    .replace(/&Prime;/g, "″")
    .replace(/&oline;/g, "‾")
    .replace(/&frasl;/g, "⁄")
    .replace(/&weierp;/g, "℘")
    .replace(/&image;/g, "ℑ")
    .replace(/&real;/g, "ℜ")
    .replace(/&trade;/g, "™")
    .replace(/&alefsym;/g, "ℵ")
    .replace(/&larr;/g, "←")
    .replace(/&uarr;/g, "↑")
    .replace(/&rarr;/g, "→")
    .replace(/&darr;/g, "↓")
    .replace(/&harr;/g, "↔")
    .replace(/&crarr;/g, "↵")
    .replace(/&lArr;/g, "⇐")
    .replace(/&uArr;/g, "⇑")
    .replace(/&rArr;/g, "⇒")
    .replace(/&dArr;/g, "⇓")
    .replace(/&hArr;/g, "⇔")
    .replace(/&forall;/g, "∀")
    .replace(/&part;/g, "∂")
    .replace(/&exist;/g, "∃")
    .replace(/&empty;/g, "∅")
    .replace(/&nabla;/g, "∇")
    .replace(/&isin;/g, "∈")
    .replace(/&notin;/g, "∉")
    .replace(/&ni;/g, "∋")
    .replace(/&prod;/g, "∏")
    .replace(/&sum;/g, "∑")
    .replace(/&minus;/g, "−")
    .replace(/&lowast;/g, "∗")
    .replace(/&radic;/g, "√")
    .replace(/&prop;/g, "∝")
    .replace(/&infin;/g, "∞")
    .replace(/&ang;/g, "∠")
    .replace(/&and;/g, "∧")
    .replace(/&or;/g, "∨")
    .replace(/&cap;/g, "∩")
    .replace(/&cup;/g, "∪")
    .replace(/&int;/g, "∫")
    .replace(/&there4;/g, "∴")
    .replace(/&sim;/g, "∼")
    .replace(/&cong;/g, "≅")
    .replace(/&asymp;/g, "≈")
    .replace(/&ne;/g, "≠")
    .replace(/&equiv;/g, "≡")
    .replace(/&le;/g, "≤")
    .replace(/&ge;/g, "≥")
    .replace(/&sub;/g, "⊂")
    .replace(/&sup;/g, "⊃")
    .replace(/&nsub;/g, "⊄")
    .replace(/&sube;/g, "⊆")
    .replace(/&supe;/g, "⊇")
    .replace(/&oplus;/g, "⊕")
    .replace(/&otimes;/g, "⊗")
    .replace(/&perp;/g, "⊥")
    .replace(/&sdot;/g, "⋅")
    .replace(/&lceil;/g, "⌈")
    .replace(/&rceil;/g, "⌉")
    .replace(/&lfloor;/g, "⌊")
    .replace(/&rfloor;/g, "⌋")
    .replace(/&lang;/g, "〈")
    .replace(/&rang;/g, "〉")
    .replace(/&loz;/g, "◊")
    .replace(/&spades;/g, "♠")
    .replace(/&clubs;/g, "♣")
    .replace(/&hearts;/g, "♥")
    .replace(/&diams;/g, "♦")
    .replace(/&Alpha;/g, "Α")
    .replace(/&Beta;/g, "Β")
    .replace(/&Gamma;/g, "Γ")
    .replace(/&Delta;/g, "Δ")
    .replace(/&Epsilon;/g, "Ε")
    .replace(/&Zeta;/g, "Ζ")
    .replace(/&Eta;/g, "Η")
    .replace(/&Theta;/g, "Θ")
    .replace(/&Iota;/g, "Ι")
    .replace(/&Kappa;/g, "Κ")
    .replace(/&Lambda;/g, "Λ")
    .replace(/&Mu;/g, "Μ")
    .replace(/&Nu;/g, "Ν")
    .replace(/&Xi;/g, "Ξ")
    .replace(/&Omicron;/g, "Ο")
    .replace(/&Pi;/g, "Π")
    .replace(/&Rho;/g, "Ρ")
    .replace(/&Sigma;/g, "Σ")
    .replace(/&Tau;/g, "Τ")
    .replace(/&Upsilon;/g, "Υ")
    .replace(/&Phi;/g, "Φ")
    .replace(/&Chi;/g, "Χ")
    .replace(/&Psi;/g, "Ψ")
    .replace(/&Omega;/g, "Ω")
    .replace(/&alpha;/g, "α")
    .replace(/&beta;/g, "β")
    .replace(/&gamma;/g, "γ")
    .replace(/&delta;/g, "δ")
    .replace(/&epsilon;/g, "ε")
    .replace(/&zeta;/g, "ζ")
    .replace(/&eta;/g, "η")
    .replace(/&theta;/g, "θ")
    .replace(/&iota;/g, "ι")
    .replace(/&kappa;/g, "κ")
    .replace(/&lambda;/g, "λ")
    .replace(/&mu;/g, "μ")
    .replace(/&nu;/g, "ν")
    .replace(/&xi;/g, "ξ")
    .replace(/&omicron;/g, "ο")
    .replace(/&pi;/g, "π")
    .replace(/&rho;/g, "ρ")
    .replace(/&sigmaf;/g, "ς")
    .replace(/&sigma;/g, "σ")
    .replace(/&tau;/g, "τ")
    .replace(/&upsilon;/g, "υ")
    .replace(/&phi;/g, "φ")
    .replace(/&chi;/g, "χ")
    .replace(/&psi;/g, "ψ")
    .replace(/&omega;/g, "ω")
    .replace(/&thetasym;/g, "ϑ")
    .replace(/&upsih;/g, "ϒ")
    .replace(/&piv;/g, "ϖ")
    .replace(/&bull;/g, "•")
    .replace(/&prime;/g, "′")
    .replace(/&Prime;/g, "″")
    .replace(/&oline;/g, "‾")
    .replace(/&frasl;/g, "⁄")
    .replace(/&weierp;/g, "℘")
    .replace(/&image;/g, "ℑ")
    .replace(/&real;/g, "ℜ")
    .replace(/&trade;/g, "™")
    .replace(/&alefsym;/g, "ℵ")
    .replace(/&larr;/g, "←")
    .replace(/&uarr;/g, "↑")
    .replace(/&rarr;/g, "→")
    .replace(/&darr;/g, "↓")
    .replace(/&harr;/g, "↔")
    .replace(/&crarr;/g, "↵")
    .replace(/&lArr;/g, "⇐")
    .replace(/&uArr;/g, "⇑")
    .replace(/&rArr;/g, "⇒")
    .replace(/&dArr;/g, "⇓")
    .replace(/&hArr;/g, "⇔")
    .replace(/&forall;/g, "∀")
    .replace(/&part;/g, "∂")
    .replace(/&exist;/g, "∃")
    .replace(/&empty;/g, "∅")
    .replace(/&nabla;/g, "∇")
    .replace(/&isin;/g, "∈")
    .replace(/&notin;/g, "∉")
    .replace(/&ni;/g, "∋")
    .replace(/&prod;/g, "∏")
    .replace(/&sum;/g, "∑")
    .replace(/&minus;/g, "−")
    .replace(/&lowast;/g, "∗")
    .replace(/&radic;/g, "√")
    .replace(/&prop;/g, "∝")
    .replace(/&infin;/g, "∞")
    .replace(/&ang;/g, "∠")
    .replace(/&and;/g, "∧")
    .replace(/&or;/g, "∨")
    .replace(/&cap;/g, "∩")
    .replace(/&cup;/g, "∪")
    .replace(/&int;/g, "∫")
    .replace(/&there4;/g, "∴")
    .replace(/&sim;/g, "∼")
    .replace(/&cong;/g, "≅")
    .replace(/&asymp;/g, "≈")
    .replace(/&ne;/g, "≠")
    .replace(/&equiv;/g, "≡")
    .replace(/&le;/g, "≤")
    .replace(/&ge;/g, "≥")
    .replace(/&sub;/g, "⊂")
    .replace(/&sup;/g, "⊃")
    .replace(/&nsub;/g, "⊄")
    .replace(/&sube;/g, "⊆")
    .replace(/&supe;/g, "⊇")
    .replace(/&oplus;/g, "⊕")
    .replace(/&otimes;/g, "⊗")
    .replace(/&perp;/g, "⊥")
    .replace(/&sdot;/g, "⋅")
    .replace(/&lceil;/g, "⌈")
    .replace(/&rceil;/g, "⌉")
    .replace(/&lfloor;/g, "⌊")
    .replace(/&rfloor;/g, "⌋")
    .replace(/&lang;/g, "〈")
    .replace(/&rang;/g, "〉")
    .replace(/&loz;/g, "◊")
    .replace(/&spades;/g, "♠")
    .replace(/&clubs;/g, "♣")
    .replace(/&hearts;/g, "♥")
    .replace(/&diams;/g, "♦")
}

// Array of common User-Agent strings to rotate
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/108.0.1462.54 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
]

async function fetchRSSFeed(url: string, source: string): Promise<NewsArticle[]> {
  try {
    console.log(`Attempting to fetch RSS from: ${url}`)

    // Select a random User-Agent
    const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]

    const response = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
        Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml",
        Referer: "https://www.google.com/", // Mimic a common referrer
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://www.google.com", // Add Origin header
        Connection: "keep-alive",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error(`HTTP error for ${url}: ${response.status} ${response.statusText}`)
      return []
    }

    const xmlText = await response.text()
    console.log(`Successfully fetched ${xmlText.length} characters from ${source}`)

    // Simple XML parsing without external dependencies
    const articles: NewsArticle[] = []
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || []

    for (let i = 0; i < itemMatches.length; i++) {
      const item = itemMatches[i]

      const titleMatch = item.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i)
      const descMatch = item.match(
        /<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/i,
      )
      const contentEncodedMatch = item.match(
        /<content:encoded[^>]*><!\[CDATA\[(.*?)\]\]><\/content:encoded>|<content:encoded[^>]*>(.*?)<\/content:encoded>/i,
      )
      const linkMatch = item.match(/<link[^>]*>(.*?)<\/link>/i)
      const pubDateMatch = item.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i)

      const rawTitle = (titleMatch?.[1] || titleMatch?.[2] || "No title").replace(/<[^>]*>/g, "").trim()
      const rawDescription = (descMatch?.[1] || descMatch?.[2] || "No description").replace(/<[^>]*>/g, "").trim()
      const rawFullContent = (contentEncodedMatch?.[1] || contentEncodedMatch?.[2] || rawDescription).trim()
      const link = (linkMatch?.[1] || "#").trim()
      const pubDate = pubDateMatch?.[1] || new Date().toISOString()

      // Decode HTML entities
      const title = decodeHtmlEntities(rawTitle)
      const description = decodeHtmlEntities(rawDescription)
      const fullContent = decodeHtmlEntities(rawFullContent)

      if (title && title !== "No title") {
        articles.push({
          id: `${source}-${Date.now()}-${i}`,
          title,
          summary: description.substring(0, 200) + (description.length > 200 ? "..." : ""),
          fullContent: fullContent,
          url: link,
          source,
          category: categorizeArticle(title, description, source),
          publishedAt: pubDate,
          imageUrl: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(source)}`,
        })
      }
    }

    console.log(`Parsed ${articles.length} articles from ${source}`)
    return articles
  } catch (error) {
    console.error(`Error fetching RSS from ${url}:`, error)
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const category = searchParams.get("category") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    console.log(`RSS API called - Page: ${page}, Category: ${category}, Limit: ${limit}`)

    const allArticles: NewsArticle[] = []

    // Try to fetch from RSS sources
    const fetchPromises = RSS_SOURCES.map((source) => fetchRSSFeed(source.url, source.source))
    const results = await Promise.allSettled(fetchPromises)

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        allArticles.push(...result.value)
      } else {
        console.error(`Failed to fetch from ${RSS_SOURCES[index].source}:`, result.reason)
      }
    })

    // Sort by publication date (newest first)
    allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    // Filter by category if specified
    const filteredArticles =
      category === "all" ? allArticles : allArticles.filter((article) => article.category === category)

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    console.log(`Returning ${paginatedArticles.length} articles`)

    return NextResponse.json({
      articles: paginatedArticles,
      hasMore: endIndex < filteredArticles.length,
      total: filteredArticles.length,
    })
  } catch (error) {
    console.error("Error in RSS API:", error)
    return NextResponse.json(
      {
        articles: [],
        hasMore: false,
        total: 0,
        error: "Failed to fetch news articles. Please try again later.",
      },
      { status: 500 },
    )
  }
}
