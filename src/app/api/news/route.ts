import { NextRequest, NextResponse } from "next/server";
import { FEEDS, GOOGLE_KEYWORDS } from "@/lib/feeds";
import { fetchFeed } from "@/lib/rss";
import { scrapeAnthropicBlog } from "@/lib/scraper";
import { Tab, NewsItem } from "@/lib/types";
import { scoreRelevance } from "@/lib/relevance";

export async function GET(request: NextRequest) {
  const tab = (request.nextUrl.searchParams.get("tab") || "generelt") as Tab;

  if (!FEEDS[tab]) {
    return NextResponse.json({ error: "Ugyldig fane" }, { status: 400 });
  }

  const feeds = FEEDS[tab];
  const feedPromises = feeds.map((feed) => fetchFeed(feed));

  // For Google tab, also fetch general feeds and filter by Google keywords
  if (tab === "google") {
    for (const feed of FEEDS.generelt) {
      feedPromises.push(
        fetchFeed(feed).then((items) =>
          items.filter((item) => {
            const text = `${item.title} ${item.description}`.toLowerCase();
            return GOOGLE_KEYWORDS.some((kw) => text.includes(kw));
          })
        )
      );
    }
  }

  // For Claude tab, also scrape Anthropic blog
  if (tab === "claude") {
    feedPromises.push(scrapeAnthropicBlog());
  }

  const results = await Promise.allSettled(feedPromises);

  const items: NewsItem[] = [];
  const seenLinks = new Set<string>();
  const seenTitles = new Set<string>();

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const item of result.value) {
        const normalizedTitle = item.title.toLowerCase().trim();
        if (!seenLinks.has(item.link) && !seenTitles.has(normalizedTitle)) {
          seenLinks.add(item.link);
          seenTitles.add(normalizedTitle);
          items.push(item);
        }
      }
    }
  }

  // Sort by relevance score first, then by date within same relevance tier
  items.sort((a, b) => {
    const scoreA = scoreRelevance(a.title, a.description);
    const scoreB = scoreRelevance(b.title, b.description);

    // Group into relevance tiers (high: 8+, medium: 3-7, low: 0-2)
    const tierA = scoreA >= 8 ? 2 : scoreA >= 3 ? 1 : 0;
    const tierB = scoreB >= 8 ? 2 : scoreB >= 3 ? 1 : 0;

    if (tierA !== tierB) return tierB - tierA;

    // Within same tier, sort by date (newest first)
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  // Assign unique IDs based on final position
  items.forEach((item, i) => {
    item.id = `${tab}-${i}-${item.id}`;
  });

  return NextResponse.json(
    { items: items.slice(0, 50) },
    {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    }
  );
}
