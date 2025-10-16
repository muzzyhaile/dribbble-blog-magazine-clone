/**
 * Trend Analyzer Agent
 * Analyzes multiple RSS articles to identify trending topics and generate blog title ideas
 * 
 * This is Step 2 from the n8n workflow:
 * - Takes 20-50 recent articles
 * - Identifies common themes and trends
 * - Generates 10 unique long-tail blog title ideas
 * - Outputs titles with keywords and tone
 */

import { getOpenRouter } from '../providers/openrouter';
import { Article } from '@/lib/supabase/client';

export interface TitleIdea {
  title: string;
  mainKeyword: string;
  relatedKeywords: string[];
  tone: 'analytical' | 'educational' | 'provocative' | 'skeptical';
  sourceArticles: string[]; // URLs of articles that inspired this
}

export interface TrendAnalysis {
  titles: TitleIdea[];
  analyzedAt: string;
  articleCount: number;
}

/**
 * Analyze trends from recent articles and generate blog title ideas
 */
export async function analyzeTrends(articles: Article[]): Promise<TrendAnalysis> {
  const openRouter = getOpenRouter();

  // Prepare article summaries for AI
  const articleSummaries = articles.map(article => ({
    title: article.title,
    description: article.description || '',
    source: article.source,
    category: article.category,
    url: article.article_url || article.articleUrl,
  }));

  const systemPrompt = `You are a content strategist for an AI-focused tech blog.

Your job is to analyze trending news articles and generate unique, SEO-optimized blog post ideas that:
1. Go beyond simple news summaries
2. Provide unique angles and insights
3. Target long-tail keywords
4. Appeal to tech-savvy readers interested in AI, ML, and technology

Focus on "why", "how", and "what's next" formats rather than just reporting what happened.`;

  const userPrompt = `Here are ${articles.length} trending AI and tech articles published recently:

${JSON.stringify(articleSummaries, null, 2)}

Based on these articles, generate 10 unique long-tail blog title ideas. For each title:

1. Create a compelling, SEO-friendly title (not just a summary of one article)
2. Identify the main keyword
3. List 3-5 related keywords
4. Suggest the tone (analytical, educational, provocative, or skeptical)
5. Reference which source articles inspired this idea (use URLs)

Make titles that are:
- Unique and thought-provoking (not generic)
- Long-tail and specific
- Future-resilient (won't become outdated quickly)
- Emotionally engaging or curiosity-driven

Examples of good formats:
- "Why [X] Is About to Change Everything in [Y]"
- "The Hidden Truth About [Topic]"
- "How [Persona] Are Using [X] to [Y]"
- "What No One Tells You About [Topic]"
- "[Number] Predictions About the Future of [Topic]"

Respond with valid JSON only (no markdown, no explanations):
{
  "titles": [
    {
      "title": "string",
      "mainKeyword": "string",
      "relatedKeywords": ["string"],
      "tone": "analytical" | "educational" | "provocative" | "skeptical",
      "sourceArticles": ["url1", "url2"]
    }
  ]
}`;

  try {
    const response = await openRouter.generateJSON<{ titles: TitleIdea[] }>(
      userPrompt,
      systemPrompt,
      {
        temperature: 0.8, // Higher creativity for title generation
        maxTokens: 3000,
      }
    );

    return {
      titles: response.titles,
      analyzedAt: new Date().toISOString(),
      articleCount: articles.length,
    };
  } catch (error) {
    console.error('Trend analysis error:', error);
    throw new Error(`Failed to analyze trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get a batch of recent articles suitable for trend analysis
 */
export async function getArticlesForAnalysis(
  db: any,
  options?: {
    limit?: number;
    categories?: string[];
    maxAge?: number; // hours
  }
): Promise<Article[]> {
  const limit = options?.limit || 30;
  const maxAge = options?.maxAge || 48; // 48 hours by default

  const cutoffDate = new Date();
  cutoffDate.setHours(cutoffDate.getHours() - maxAge);

  // Get recent articles
  const articles = await db.getArticles({
    limit,
    category: options?.categories?.[0], // Simple implementation for now
  });

  // Filter by date
  return articles.filter((article: Article) => {
    const publishedAt = new Date(article.published_at || article.publishedAt);
    return publishedAt >= cutoffDate;
  });
}
