import * as cheerio from "cheerio";
import { NewsItem } from "./types";
import { categorize } from "./categorizer";

export async function scrapeAnthropicBlog(): Promise<NewsItem[]> {
  try {
    const response = await fetch("https://www.anthropic.com/news", {
      headers: { "User-Agent": "Nyheder/1.0 (news aggregator)" },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const $ = cheerio.load(html);
    const items: NewsItem[] = [];

    $("a[href*='/news/']").each((_, el) => {
      const $el = $(el);
      const href = $el.attr("href");
      if (!href || href === "/news/" || href === "/news") return;

      const title = $el.find("h3, h2, [class*='title'], [class*='heading']").first().text().trim()
        || $el.text().trim().split("\n")[0]?.trim();

      if (!title || title.length < 5) return;

      const dateText = $el.find("time, [class*='date']").text().trim();
      const link = href.startsWith("http") ? href : `https://www.anthropic.com${href}`;

      // Deduplicate by link
      if (items.some((i) => i.link === link)) return;

      items.push({
        id: `anthropic-${Buffer.from(link).toString("base64url").slice(0, 32)}`,
        title,
        link,
        pubDate: dateText ? new Date(dateText).toISOString() : new Date().toISOString(),
        source: "Anthropic",
        sourceIcon: "A",
        description: "",
        category: categorize(title, ""),
      });
    });

    return items.slice(0, 20);
  } catch (error) {
    console.error("Failed to scrape Anthropic blog:", error);
    return [];
  }
}
