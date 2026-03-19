import RSSParser from "rss-parser";
import { NewsItem } from "./types";
import { FeedConfig } from "./feeds";
import { categorize } from "./categorizer";

const parser = new RSSParser();

let counter = 0;
function generateId(link: string, title: string): string {
  counter++;
  return Buffer.from(`${link}${title}${counter}${Date.now()}`).toString("base64url").slice(0, 32);
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchFeed(feed: FeedConfig): Promise<NewsItem[]> {
  try {
    const response = await fetch(feed.url, {
      headers: {
        "User-Agent": "Nyheder/1.0 (RSS reader)",
        Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const parsed = await parser.parseString(xml);

    return parsed.items.map((item) => {
      const title = stripHtml(item.title || "Uden titel");
      const description = stripHtml(item.contentSnippet || item.content || item.summary || "");

      return {
        id: generateId(item.link || "", title),
        title,
        link: item.link || "",
        pubDate: item.isoDate || item.pubDate || new Date().toISOString(),
        source: feed.name,
        sourceIcon: feed.icon,
        description: description.slice(0, 300),
        category: categorize(title, description),
      };
    });
  } catch (error) {
    console.error(`Failed to fetch feed ${feed.name}:`, error);
    return [];
  }
}
