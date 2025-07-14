import { NextResponse } from "next/server"

const FEAR_GREED_API_URL = "https://api.alternative.me/fng/"
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY_MS = 1000 // 1 second

export async function GET() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      console.log(`Attempting to fetch Fear & Greed Index (attempt ${i + 1}/${MAX_RETRIES})`)
      const response = await fetch(FEAR_GREED_API_URL, {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      })

      if (response.status === 429) {
        const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, i)
        console.warn(`Alternative.me API rate limit hit. Retrying in ${delay / 1000} seconds...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }

      if (!response.ok) {
        console.error(`Alternative.me API error: ${response.status} ${response.statusText}`)
        return NextResponse.json({ error: "Failed to fetch Fear & Greed Index" }, { status: response.status })
      }

      const data = await response.json()

      if (!data || !data.data || data.data.length === 0) {
        return NextResponse.json({ error: "No data found for Fear & Greed Index" }, { status: 404 })
      }

      // The API returns an array, we only need the latest entry
      const latestIndex = data.data[0]

      return NextResponse.json({
        value: Number.parseInt(latestIndex.value),
        value_classification: latestIndex.value_classification,
        timestamp: Number.parseInt(latestIndex.timestamp) * 1000, // Convert to milliseconds
        time_until_update: Number.parseInt(latestIndex.time_until_update) * 1000, // Convert to milliseconds
      })
    } catch (error) {
      console.error(`Error fetching Fear & Greed Index on attempt ${i + 1}:`, error)
      if (i === MAX_RETRIES - 1) {
        return NextResponse.json({ error: "Internal server error after multiple retries" }, { status: 500 })
      }
      const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, i)
      console.warn(`Retrying due to network error in ${delay / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  return NextResponse.json({ error: "Failed to fetch Fear & Greed Index after all retries" }, { status: 500 })
}
