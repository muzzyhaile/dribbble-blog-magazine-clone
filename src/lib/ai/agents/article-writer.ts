/**
 * Article Writer Agent
 * Writes complete, original blog articles based on research and outline
 * 
 * This is Step 6 from the n8n workflow:
 * - Takes outline, research data, and tone
 * - Writes full 1500-2000 word article
 * - Includes citations, analogies, and insights
 */

import { getOpenRouter } from '../providers/openrouter';
import { AI_CONFIG } from '../config';

export interface ArticleContent {
  markdown: string;
  wordCount: number;
  readingTime: number; // minutes
}

export interface ResearchData {
  summary: string;
  keyIdeas: string[];
  companies: string[];
  researchers: string[];
  models: string[];
  quotes: string[];
  statistics: string[];
}

/**
 * Write a complete blog article
 */
export async function writeArticle(
  title: string,
  outline: string,
  keywords: string[],
  tone: string,
  researchData: ResearchData[],
  sourceUrls: string[]
): Promise<ArticleContent> {
  const openRouter = getOpenRouter();

  const systemPrompt = `You are a professional blog writer for a leading AI and technology publication.

Your writing style:
- Clear, engaging, and accessible to tech-savvy readers
- Balances technical accuracy with readability
- Uses analogies and examples to explain complex concepts
- Cites sources and includes data/statistics
- Provides unique insights and future implications
- Maintains a ${tone} tone throughout

Requirements:
- Write ${AI_CONFIG.content.minWordCount}-${AI_CONFIG.content.maxWordCount} words
- Include at least 2 citations from source articles
- Add 1-2 analogies or real-world examples
- Discuss future implications or predictions
- Use markdown formatting (# for H1, ## for H2, etc.)
- NO generic conclusions or filler content`;

  const userPrompt = `Write a complete blog article with the following details:

**Title:** ${title}

**Main Keywords:** ${keywords.join(', ')}

**Outline:**
${outline}

**Research Data:**
${JSON.stringify(researchData, null, 2)}

**Source Articles (for citations):**
${sourceUrls.map((url, i) => `[${i + 1}] ${url}`).join('\n')}

Instructions:
1. Follow the outline structure closely
2. Write approximately 300-500 words per major section
3. Naturally incorporate the main keywords
4. Include at least 2 citations using markdown links: [source text](URL)
5. Add 1-2 analogies or examples for clarity
6. Discuss future implications in the final sections
7. Use markdown formatting properly
8. Write in a ${tone} tone

Respond with the full article in markdown format ONLY (no JSON, no explanations).`;

  try {
    const markdown = await openRouter.complete(
      userPrompt,
      systemPrompt,
      {
        temperature: 0.7,
        maxTokens: 4000,
      }
    );

    // Clean up markdown
    const cleanedMarkdown = markdown
      .replace(/```markdown\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Calculate word count
    const wordCount = cleanedMarkdown.split(/\s+/).length;

    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    return {
      markdown: cleanedMarkdown,
      wordCount,
      readingTime,
    };
  } catch (error) {
    console.error('Article writing error:', error);
    throw new Error(`Failed to write article: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate blog outline from title and research
 */
export async function generateOutline(
  title: string,
  keywords: string[],
  researchData: ResearchData[]
): Promise<string> {
  const openRouter = getOpenRouter();

  const systemPrompt = `You are an SEO blog strategist.

Create detailed, SEO-optimized article outlines that:
- Use H1 for main title, H2 for sections
- Include 5-7 major sections
- Naturally incorporate keywords
- Follow this structure: Intro → Background → Trend → Insights → Future → CTA
- Target featured snippet optimization`;

  const userPrompt = `Generate a detailed outline for this blog post:

**Title:** ${title}

**Main Keyword:** ${keywords[0]}
**Related Keywords:** ${keywords.slice(1).join(', ')}

**Research Data:**
${JSON.stringify(researchData, null, 2)}

Create an outline with:
1. **H1:** Main title
2. **H2 sections** (5-7 major sections):
   - Introduction (hook + context)
   - Background (explain the topic)
   - Current Trend (what's happening now)
   - Deep Insights (analysis and implications)
   - Future Predictions (what's next)
   - Call to Action

For each H2, include 2-3 bullet points of key topics to cover.

Respond in markdown format with proper heading levels.`;

  try {
    const outline = await openRouter.complete(
      userPrompt,
      systemPrompt,
      {
        temperature: 0.6,
        maxTokens: 1500,
      }
    );

    return outline
      .replace(/```markdown\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
  } catch (error) {
    console.error('Outline generation error:', error);
    throw new Error(`Failed to generate outline: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
