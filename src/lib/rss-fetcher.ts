import Parser from 'rss-parser';
import { RSSFeedConfig } from './rss-feeds';

export interface ParsedArticle {
  title: string;
  description: string | null;
  content: string | null;
  category: string;
  source: string;
  author: string | null;
  publishedAt: string;
  imageUrl: string | null;
  articleUrl: string;
  trendingScore: number;
}

interface CustomFeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
  isoDate?: string;
  'content:encoded'?: string;
  'media:content'?: { $: { url: string } };
  enclosure?: { url: string };
  'media:thumbnail'?: { $: { url: string } };
}

const parser = new Parser<any, CustomFeedItem>({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
    ],
  },
});

/**
 * Extract image URL from RSS feed item
 */
function extractImageUrl(item: CustomFeedItem): string | null {
  // Try media:content
  if (item['media:content']?.$ && item['media:content'].$.url) {
    return item['media:content'].$.url;
  }
  
  // Try media:thumbnail
  if (item['media:thumbnail']?.$ && item['media:thumbnail'].$.url) {
    return item['media:thumbnail'].$.url;
  }
  
  // Try enclosure
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }
  
  // Try to extract from content:encoded
  if (item['content:encoded']) {
    const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }
  
  return null;
}

/**
 * Clean HTML content and extract text
 */
function cleanHtmlContent(html: string | undefined): string | null {
  if (!html) return null;
  
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ');
  
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean up whitespace
  const cleaned = decoded.replace(/\s+/g, ' ').trim();
  
  // Limit length
  return cleaned.substring(0, 500);
}

/**
 * Calculate a simple trending score based on recency
 */
function calculateTrendingScore(publishedDate: Date): number {
  const now = new Date();
  const hoursSincePublished = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60);
  
  // Score decreases as content gets older
  // Fresh content (< 1 hour) gets score of 100
  // Content older than 24 hours gets minimum score of 10
  const score = Math.max(10, 100 - (hoursSincePublished * 3.75));
  
  return Math.round(score);
}

/**
 * Fetch and parse a single RSS feed
 */
export async function fetchRSSFeed(feedConfig: RSSFeedConfig): Promise<ParsedArticle[]> {
  try {
    const feed = await parser.parseURL(feedConfig.url);
    const articles: ParsedArticle[] = [];

    for (const item of feed.items) {
      if (!item.title || !item.link) {
        continue; // Skip items without required fields
      }

      const publishedDate = item.isoDate ? new Date(item.isoDate) : new Date();
      
      const article: ParsedArticle = {
        title: item.title.trim(),
        description: cleanHtmlContent(item.contentSnippet || item.content),
        content: cleanHtmlContent(item['content:encoded'] || item.content),
        category: feedConfig.category,
        source: feedConfig.source,
        author: item.creator || null,
        publishedAt: publishedDate.toISOString(),
        imageUrl: extractImageUrl(item),
        articleUrl: item.link,
        trendingScore: calculateTrendingScore(publishedDate),
      };

      articles.push(article);
    }

    return articles;
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedConfig.url}:`, error);
    throw new Error(`Failed to fetch feed from ${feedConfig.source}: ${error}`);
  }
}

/**
 * Fetch multiple RSS feeds in parallel
 */
export async function fetchMultipleFeeds(
  feedConfigs: RSSFeedConfig[]
): Promise<{ articles: ParsedArticle[]; errors: Array<{ source: string; error: string }> }> {
  const results = await Promise.allSettled(
    feedConfigs.map(config => fetchRSSFeed(config))
  );

  const articles: ParsedArticle[] = [];
  const errors: Array<{ source: string; error: string }> = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    } else {
      errors.push({
        source: feedConfigs[index].source,
        error: result.reason.message || 'Unknown error',
      });
    }
  });

  return { articles, errors };
}

/**
 * Deduplicate articles by URL
 */
export function deduplicateArticles(articles: ParsedArticle[]): ParsedArticle[] {
  const seen = new Set<string>();
  const unique: ParsedArticle[] = [];

  for (const article of articles) {
    if (!seen.has(article.articleUrl)) {
      seen.add(article.articleUrl);
      unique.push(article);
    }
  }

  return unique;
}
