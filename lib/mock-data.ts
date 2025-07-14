import type { NewsArticle } from "@/types/news"

export const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "Bitcoin Reaches New All-Time High as Institutional Adoption Accelerates",
    summary:
      "Bitcoin surged past $75,000 for the first time, driven by increased institutional investment and growing mainstream acceptance of cryptocurrency as a store of value.",
    fullContent: `Bitcoin has achieved a historic milestone, breaking through the $75,000 barrier for the first time in its history. This unprecedented surge comes amid a wave of institutional adoption that has fundamentally changed the cryptocurrency landscape.

Major corporations including MicroStrategy, Tesla, and Square have added Bitcoin to their treasury reserves, signaling a shift in how traditional businesses view digital assets. The recent approval of Bitcoin ETFs has also opened the floodgates for retail and institutional investors who previously had limited exposure to cryptocurrency markets.

Market analysts point to several key factors driving this rally. The ongoing debasement of fiat currencies through quantitative easing has pushed investors toward alternative stores of value. Bitcoin's fixed supply cap of 21 million coins makes it an attractive hedge against inflation.

Additionally, the upcoming Bitcoin halving event, which will reduce the rate of new Bitcoin creation by half, has historically preceded major price rallies. With institutional demand continuing to grow and supply becoming increasingly scarce, many experts believe this could be just the beginning of Bitcoin's next major bull run.

The cryptocurrency's market capitalization now exceeds $1.4 trillion, making it larger than many national economies and cementing its position as the world's premier digital asset.`,
    url: "https://example.com/bitcoin-ath",
    source: "CoinDesk",
    category: "bitcoin",
    publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "DeFi Protocol Launches Revolutionary Cross-Chain Bridge",
    summary:
      "A new decentralized finance protocol has introduced an innovative cross-chain bridge that promises to solve interoperability issues between major blockchain networks.",
    fullContent: `The decentralized finance (DeFi) ecosystem has taken a significant step forward with the launch of a groundbreaking cross-chain bridge protocol that aims to seamlessly connect major blockchain networks including Ethereum, Binance Smart Chain, Polygon, and Avalanche.

This new protocol, developed by a team of blockchain engineers and cryptographers, addresses one of the most pressing challenges in the DeFi space: the fragmentation of liquidity across different blockchain networks. Users can now move assets between chains with unprecedented speed and security.

The bridge utilizes a novel consensus mechanism that combines zero-knowledge proofs with multi-signature validation to ensure the integrity of cross-chain transactions. This approach significantly reduces the risk of exploits that have plagued other bridge protocols in the past.

Early testing has shown transaction times of under 30 seconds for cross-chain transfers, with fees that are 70% lower than existing solutions. The protocol has already secured partnerships with major DeFi platforms and has attracted over $100 million in total value locked (TVL) within its first week of operation.

Industry experts believe this development could be a game-changer for DeFi adoption, as it removes the technical barriers that have prevented many users from accessing the full potential of decentralized finance across multiple blockchain ecosystems.`,
    url: "https://example.com/defi-bridge",
    source: "DeFi Pulse",
    category: "defi",
    publishedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Federal Reserve Signals Potential Interest Rate Cuts Amid Economic Uncertainty",
    summary:
      "The Federal Reserve has hinted at possible interest rate reductions in the coming months as economic indicators show mixed signals about the health of the U.S. economy.",
    fullContent: `Federal Reserve Chairman Jerome Powell delivered remarks today that have sent ripples through financial markets, suggesting that the central bank may consider cutting interest rates in response to evolving economic conditions.

Speaking at the Jackson Hole Economic Symposium, Powell noted that while inflation has shown signs of cooling, concerns about employment levels and consumer spending have prompted the Fed to reassess its monetary policy stance. The unemployment rate has ticked up to 4.1%, and retail sales have shown consecutive months of decline.

Market participants have interpreted these comments as a dovish shift in Fed policy, with bond yields falling and equity markets rallying on the news. The probability of a 25 basis point rate cut at the next FOMC meeting has increased to 75%, according to fed funds futures.

This potential policy pivot comes at a critical time for the U.S. economy, which has shown resilience in the face of global headwinds but is now displaying signs of strain. Corporate earnings have been mixed, with several major companies reporting lower-than-expected revenues.

The implications for cryptocurrency markets could be significant, as lower interest rates typically drive investors toward riskier assets in search of higher yields. Bitcoin and other digital assets have historically performed well during periods of monetary easing.

Economists remain divided on whether rate cuts are the appropriate response, with some arguing that premature easing could reignite inflationary pressures that the Fed has worked hard to contain.`,
    url: "https://example.com/fed-rates",
    source: "Financial Times",
    category: "macro",
    publishedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Tech Giants Report Strong Q3 Earnings Despite Market Headwinds",
    summary:
      "Major technology companies have exceeded analyst expectations in their third-quarter earnings reports, demonstrating resilience in a challenging economic environment.",
    fullContent: `The technology sector has once again proven its resilience, with major players including Apple, Microsoft, Google, and Amazon all reporting earnings that surpassed Wall Street expectations for the third quarter.

Apple led the charge with revenue of $89.5 billion, driven by strong iPhone sales and growing services revenue. The company's services segment, which includes the App Store, iCloud, and Apple Pay, generated $22.3 billion in revenue, representing a 16% year-over-year increase.

Microsoft reported revenue of $56.5 billion, with its cloud computing division Azure showing particularly strong growth of 29%. The company's AI initiatives, including its partnership with OpenAI, have begun to contribute meaningfully to revenue streams.

Google parent Alphabet posted revenue of $76.7 billion, with its advertising business showing signs of recovery after several quarters of slower growth. The company's cloud division also performed well, generating $8.4 billion in revenue.

Amazon's results were mixed, with strong performance in its cloud services division AWS offsetting weaker retail sales. The company's focus on cost-cutting and efficiency improvements has helped maintain profitability despite challenging market conditions.

These strong earnings reports have provided a boost to broader market sentiment, with the Nasdaq Composite Index gaining 3.2% in after-hours trading. Investors appear to be betting that the technology sector's innovation and adaptability will continue to drive growth even in uncertain economic times.

The results also highlight the growing importance of artificial intelligence and cloud computing as key growth drivers for the technology industry.`,
    url: "https://example.com/tech-earnings",
    source: "Bloomberg",
    category: "stocks",
    publishedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
    summary:
      "Layer 2 scaling solutions for Ethereum have processed over 10 million transactions in a single day, marking a new milestone for blockchain scalability.",
    fullContent: `Ethereum's Layer 2 ecosystem has achieved a significant milestone, processing over 10 million transactions in a single day for the first time. This achievement underscores the growing adoption of scaling solutions designed to address Ethereum's throughput limitations.

Arbitrum and Optimism, the two leading optimistic rollup solutions, accounted for the majority of this transaction volume. Arbitrum processed 4.2 million transactions, while Optimism handled 3.1 million. Polygon, a sidechain solution, contributed an additional 2.7 million transactions.

The surge in Layer 2 activity has been driven by several factors, including the growing popularity of decentralized applications (dApps) built on these platforms and the significantly lower transaction fees compared to Ethereum mainnet. Average transaction costs on Layer 2 solutions are typically 90-95% lower than on Ethereum's base layer.

This increased activity has also led to substantial growth in total value locked (TVL) across Layer 2 protocols. Combined TVL has reached $15.8 billion, representing a 340% increase from the same period last year.

The success of Layer 2 solutions is crucial for Ethereum's long-term scalability roadmap. While Ethereum 2.0 and sharding will eventually provide native scaling, Layer 2 solutions are serving as an important bridge, allowing the ecosystem to grow while maintaining security and decentralization.

Major DeFi protocols including Uniswap, Aave, and Compound have deployed on multiple Layer 2 networks, providing users with familiar interfaces and functionality at a fraction of the cost.

This milestone represents a significant step toward making blockchain technology accessible to mainstream users by addressing the cost and speed barriers that have limited adoption.`,
    url: "https://example.com/layer2-volume",
    source: "The Block",
    category: "altcoins",
    publishedAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Central Bank Digital Currencies Gain Momentum Globally",
    summary:
      "Multiple countries are accelerating their central bank digital currency (CBDC) programs, with several nations planning pilot launches in 2024.",
    fullContent: `The global race to develop central bank digital currencies (CBDCs) has intensified, with over 130 countries now exploring or developing their own digital versions of national currencies. This represents a fundamental shift in how governments view the future of money.

China continues to lead in CBDC development with its digital yuan, which has processed over $13.9 billion in transactions across pilot programs in major cities. The People's Bank of China has expanded testing to include cross-border payments and has begun integrating the digital currency with popular payment platforms.

The European Central Bank has made significant progress on the digital euro, with President Christine Lagarde announcing that a decision on full-scale development will be made by the end of 2024. The ECB has completed extensive research on privacy, offline functionality, and integration with existing payment systems.

In the United States, the Federal Reserve has been more cautious but has increased research efforts following the release of its discussion paper on CBDCs. Several Federal Reserve banks are conducting technical experiments, though no timeline for a U.S. digital dollar has been announced.

The Bank of England has partnered with the Treasury to explore a "digital pound," with a consultation period revealing mixed public sentiment about privacy and government surveillance concerns.

Emerging economies are also making rapid progress. Nigeria's eNaira has gained traction, while India's digital rupee pilot has expanded to include more banks and use cases.

The development of CBDCs raises important questions about privacy, financial inclusion, and the role of commercial banks in the digital economy. Proponents argue that CBDCs could improve payment efficiency and financial inclusion, while critics worry about surveillance and the potential displacement of private cryptocurrencies.

As these projects move from research to implementation, their impact on the global financial system and the cryptocurrency ecosystem will become increasingly apparent.`,
    url: "https://example.com/cbdc-momentum",
    source: "Reuters",
    category: "macro",
    publishedAt: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  // Add more mock articles to demonstrate infinite scroll
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 7}`,
    title: `Market Analysis: ${["Bitcoin", "Ethereum", "DeFi", "NFTs", "Altcoins"][i % 5]} Trends for ${new Date().getFullYear()}`,
    summary: `Comprehensive analysis of current market trends and future outlook for ${["Bitcoin", "Ethereum", "DeFi", "NFTs", "Altcoins"][i % 5]} in the evolving cryptocurrency landscape.`,
    fullContent: `This is a detailed analysis of market trends and developments in the cryptocurrency space. The content would include comprehensive research, data analysis, and expert opinions on market movements and future projections.

Market dynamics continue to evolve as institutional adoption increases and regulatory frameworks develop around the world. Key factors influencing price movements include macroeconomic conditions, technological developments, and changing investor sentiment.

Technical analysis suggests several important support and resistance levels that traders should monitor. Fundamental analysis reveals strong underlying adoption metrics and growing use cases across various sectors.

Looking ahead, several catalysts could drive significant price movements in the coming months. These include regulatory developments, institutional adoption announcements, and technological upgrades to major blockchain networks.

Risk management remains crucial in this volatile market environment. Investors should consider diversification strategies and maintain appropriate position sizing to navigate market uncertainty.`,
    url: `https://example.com/analysis-${i + 7}`,
    source: ["CoinTelegraph", "CoinDesk", "The Block", "Decrypt", "CryptoSlate"][i % 5],
    category: ["bitcoin", "altcoins", "defi", "stocks", "macro"][i % 5] as any,
    publishedAt: new Date(Date.now() - (180 + i * 30) * 60 * 1000).toISOString(),
    imageUrl: "/placeholder.svg?height=200&width=300",
  })),
]
