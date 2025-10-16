/**
 * Title Scorer Agent
 * Rates and ranks generated blog titles for quality
 * 
 * This is Step 3 from the n8n workflow:
 * - Takes title ideas from trend analyzer
 * - Scores each on uniqueness, SEO, and clickability
 * - Returns ranked list with best title first
 */

import { getOpenRouter } from '../providers/openrouter';
import { TitleIdea } from './trend-analyzer';

export interface TitleScore {
  title: string;
  uniquenessScore: number;    // 1-10
  seoScore: number;            // 1-10
  clickabilityScore: number;   // 1-10
  averageScore: number;
  reason: string;
}

export interface ScoredTitles {
  scores: TitleScore[];
  bestTitle: TitleScore;
  scoredAt: string;
}

/**
 * Score and rank blog titles
 */
export async function scoreTitles(
  titleIdeas: TitleIdea[],
  coreTopic?: string
): Promise<ScoredTitles> {
  const openRouter = getOpenRouter();

  const systemPrompt = `You are an expert SEO content strategist and viral content analyst.

Your job is to objectively score blog titles based on:
1. **Uniqueness** (1-10): How original and non-generic is this title?
2. **SEO Score** (1-10): How well does it target long-tail keywords and search intent?
3. **Clickability** (1-10): How emotionally engaging and curiosity-driven is it?

Be critical and honest. Most titles should score 5-7. Only exceptional titles score 8-10.`;

  const userPrompt = `Rate the following blog titles based on the core topic: "${coreTopic || 'AI and Technology'}"

Titles to score:
${JSON.stringify(titleIdeas.map(t => t.title), null, 2)}

For each title, provide:
- uniquenessScore (1-10)
- seoScore (1-10)
- clickabilityScore (1-10)
- reason (brief explanation of scores)

Respond with valid JSON only:
{
  "scores": [
    {
      "title": "string",
      "uniquenessScore": number,
      "seoScore": number,
      "clickabilityScore": number,
      "reason": "string"
    }
  ]
}`;

  try {
    const response = await openRouter.generateJSON<{ scores: Omit<TitleScore, 'averageScore'>[] }>(
      userPrompt,
      systemPrompt,
      {
        temperature: 0.3, // Lower temperature for consistent scoring
        maxTokens: 2000,
      }
    );

    // Calculate average scores
    const scoredTitles: TitleScore[] = response.scores.map(score => ({
      ...score,
      averageScore: (score.uniquenessScore + score.seoScore + score.clickabilityScore) / 3,
    }));

    // Sort by average score (highest first)
    scoredTitles.sort((a, b) => b.averageScore - a.averageScore);

    return {
      scores: scoredTitles,
      bestTitle: scoredTitles[0],
      scoredAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Title scoring error:', error);
    throw new Error(`Failed to score titles: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Select the best title from scored results
 */
export function selectBestTitle(scoredTitles: ScoredTitles): {
  title: string;
  score: TitleScore;
  originalIdea: TitleIdea | undefined;
} {
  const bestScore = scoredTitles.bestTitle;
  
  return {
    title: bestScore.title,
    score: bestScore,
    originalIdea: undefined, // Will be matched in the pipeline
  };
}
