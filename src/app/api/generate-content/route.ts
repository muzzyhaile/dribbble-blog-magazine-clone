/**
 * Content Generation API
 * Test endpoint for AI content generation pipeline
 * 
 * POST /api/generate-content
 * - Analyzes recent articles
 * - Generates blog title ideas
 * - Scores and selects best title
 * - Creates outline and full article
 */

import { NextRequest, NextResponse } from 'next/server';
import { getArticleDB } from '@/lib/supabase/client';
import { analyzeTrends, getArticlesForAnalysis } from '@/lib/ai/agents/trend-analyzer';
import { scoreTitles } from '@/lib/ai/agents/title-scorer';
import { generateOutline, writeArticle } from '@/lib/ai/agents/article-writer';

export async function POST(request: NextRequest) {
  try {
    const db = getArticleDB();

    console.log('🔍 Step 1: Fetching recent articles for analysis...');
    
    // Get recent articles for trend analysis
    const articles = await getArticlesForAnalysis(db, {
      limit: 20,
      maxAge: 48, // Last 48 hours
    });

    if (articles.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No recent articles found for analysis',
      }, { status: 400 });
    }

    console.log(`✅ Found ${articles.length} articles`);
    console.log('🤖 Step 2: Analyzing trends and generating title ideas...');

    // Analyze trends and generate title ideas
    const trendAnalysis = await analyzeTrends(articles);
    
    console.log(`✅ Generated ${trendAnalysis.titles.length} title ideas`);
    console.log('📊 Step 3: Scoring titles...');

    // Score the titles
    const scoredTitles = await scoreTitles(trendAnalysis.titles);
    const bestTitle = scoredTitles.bestTitle;
    
    // Find the original title idea
    const originalIdea = trendAnalysis.titles.find(t => t.title === bestTitle.title);
    
    if (!originalIdea) {
      throw new Error('Could not find original title idea');
    }

    console.log(`✅ Best title: "${bestTitle.title}" (score: ${bestTitle.averageScore.toFixed(2)})`);
    console.log('📝 Step 4: Generating outline...');

    // Generate outline
    const outline = await generateOutline(
      bestTitle.title,
      [originalIdea.mainKeyword, ...originalIdea.relatedKeywords],
      [] // We'll add research data in the full pipeline
    );

    console.log('✅ Outline generated');
    console.log('✍️ Step 5: Writing full article...');

    // Write the article
    const articleContent = await writeArticle(
      bestTitle.title,
      outline,
      [originalIdea.mainKeyword, ...originalIdea.relatedKeywords],
      originalIdea.tone,
      [], // We'll add research data in the full pipeline
      originalIdea.sourceArticles
    );

    console.log(`✅ Article written: ${articleContent.wordCount} words, ${articleContent.readingTime} min read`);

    // Return the generated content
    return NextResponse.json({
      success: true,
      message: 'Content generated successfully',
      data: {
        title: bestTitle.title,
        titleScore: bestTitle,
        keywords: {
          main: originalIdea.mainKeyword,
          related: originalIdea.relatedKeywords,
        },
        tone: originalIdea.tone,
        outline,
        article: articleContent.markdown,
        wordCount: articleContent.wordCount,
        readingTime: articleContent.readingTime,
        sourceArticles: originalIdea.sourceArticles,
        analyzedArticles: articles.length,
        generatedAt: new Date().toISOString(),
      },
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Content generation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to generate content',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

/**
 * GET endpoint to check if content generation is available
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Content generation API is ready',
    endpoints: {
      generate: 'POST /api/generate-content',
    },
    info: 'This endpoint analyzes recent articles and generates original blog content using AI',
  });
}
