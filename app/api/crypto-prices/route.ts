import { NextResponse } from "next/server"

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY_MS = 1000 // 1 second

const CRYPTO_IDS = "bitcoin,ethereum,solana,ripple,cardano,dogecoin,polkadot,litecoin"
const VS_CURRENCIES = "usd"
const COINGECKO_API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS}&vs_currencies=${VS_CURRENCIES}&include_24hr_change=true`

export async function GET() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      console.log(`Attempting to fetch crypto prices (attempt ${i + 1}/${MAX_RETRIES})`)
      const response = await fetch(COINGECKO_API_URL, {
        next: { revalidate: 30 }, // Revalidate every 30 seconds
      })

      if (response.status === 429) {
        const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, i) // Exponential backoff
        console.warn(`CoinGecko API rate limit hit. Retrying in ${delay / 1000} seconds...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue // Try the request again
      }

      if (!response.ok) {
        console.error(`CoinGecko API error: ${response.status} ${response.statusText}`)
        return NextResponse.json({ error: "Failed to fetch crypto prices" }, { status: response.status })
      }

      const data = await response.json()

      const formattedPrices = Object.keys(data).map((id) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        price: data[id][VS_CURRENCIES],
        change24h: data[id][`${VS_CURRENCIES}_24hr_change`],
      }))

      return NextResponse.json(formattedPrices)
    } catch (error) {
      console.error(`Error fetching crypto prices on attempt ${i + 1}:`, error)
      if (i === MAX_RETRIES - 1) {
        return NextResponse.json({ error: "Internal server error after multiple retries" }, { status: 500 })
      }
      const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, i)
      console.warn(`Retrying due to network error in ${delay / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  // This part should ideally not be reached if MAX_RETRIES is > 0 and errors are handled
  return NextResponse.json({ error: "Failed to fetch crypto prices after all retries" }, { status: 500 })
}
