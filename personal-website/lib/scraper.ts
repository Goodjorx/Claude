/**
 * RSS Feed Scraper — Daily AI news digest
 *
 * Fetches and parses RSS feeds from major AI/tech sources.
 * Claude then filters the top N stories relevant to Jordi's brand.
 */

import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10_000,
  headers: {
    "User-Agent": "JordiBlogBot/1.0 (+https://jordisegura.com)",
    Accept: "application/rss+xml, application/xml, text/xml",
  },
});

export interface FeedItem {
  title: string;
  link: string;
  summary: string;   // first 400 chars of content/description
  source: string;    // feed name
  pubDate?: string;
  isVideo?: boolean;
}

const FEEDS: { name: string; url: string; isVideo?: boolean }[] = [
  { name: "TechCrunch AI",      url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { name: "The Verge AI",       url: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml" },
  { name: "VentureBeat AI",     url: "https://venturebeat.com/category/ai/feed/" },
  { name: "MIT Tech Review",    url: "https://www.technologyreview.com/feed/" },
  { name: "Ars Technica",       url: "https://feeds.arstechnica.com/arstechnica/technology-lab" },
  { name: "OpenAI Blog",        url: "https://openai.com/blog/rss.xml" },
  { name: "Anthropic",          url: "https://www.anthropic.com/rss.xml" },
  // YouTube RSS feeds (videos de referencia en IA)
  { name: "Two Minute Papers",  url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCbmNph6atAoGfqLoCL_duAg", isVideo: true },
  { name: "Fireship",           url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA", isVideo: true },
];

/** Fetches a single feed, returns items with summary. Never throws — returns [] on error. */
async function fetchFeed(feed: { name: string; url: string; isVideo?: boolean }): Promise<FeedItem[]> {
  try {
    const result = await parser.parseURL(feed.url);
    const cutoff = Date.now() - 48 * 60 * 60 * 1000; // last 48 hours

    return result.items
      .filter((item) => {
        if (!item.pubDate) return true;
        return new Date(item.pubDate).getTime() > cutoff;
      })
      .slice(0, 5)
      .map((item) => {
        const rawSummary =
          item.contentSnippet ?? item.content ?? item.summary ?? item.title ?? "";
        return {
          title: item.title ?? "(sin título)",
          link: item.link ?? "",
          summary: rawSummary.replace(/\s+/g, " ").trim().slice(0, 400),
          source: feed.name,
          pubDate: item.pubDate,
          isVideo: feed.isVideo,
        };
      });
  } catch {
    return [];
  }
}

/** Fetches all feeds in parallel and returns a flat list of recent items */
export async function fetchAllFeeds(): Promise<FeedItem[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  return results
    .filter((r): r is PromiseFulfilledResult<FeedItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);
}
