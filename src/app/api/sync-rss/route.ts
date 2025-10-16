import { NextRequest, NextResponse } from 'next/server';
import { getArticleDB } from '@/lib/supabase/client';
import { getEnabledFeeds } from '@/lib/rss-feeds';
import { fetchMultipleFeeds, deduplicateArticles } from '@/lib/rss-fetcher';

/**
 * POST /api/sync-rss
 * Fetches articles from configured RSS feeds and stores them in the database
 * 
 * Optional query parameters:
 * - limit: Maximum number of articles to sync per feed (default: 10)
 * - skipDuplicates: Skip articles that already exist in DB (default: true)
 */
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const skipDuplicates = searchParams.get('skipDuplicates') !== 'false';

    // Get enabled RSS feeds
    const feeds = getEnabledFeeds();
    
    if (feeds.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No RSS feeds are enabled',
        data: { synced: 0, skipped: 0, errors: [] }
      }, { status: 400 });
    }

    console.log(`Starting RSS sync for ${feeds.length} feeds...`);

    // Fetch articles from all feeds
    const { articles: fetchedArticles, errors } = await fetchMultipleFeeds(feeds);
    
    console.log(`Fetched ${fetchedArticles.length} articles from RSS feeds`);

    // Deduplicate articles
    const uniqueArticles = deduplicateArticles(fetchedArticles);
    console.log(`After deduplication: ${uniqueArticles.length} unique articles`);

    // Limit articles per feed if specified
    const articlesToSync = uniqueArticles.slice(0, limit * feeds.length);

    let syncedCount = 0;
    let skippedCount = 0;
    const syncErrors: Array<{ article: string; error: string }> = [];

    const db = getArticleDB();

    // Insert articles into database
    for (const article of articlesToSync) {
      try {
        // Check if article already exists (by URL)
        if (skipDuplicates) {
          const exists = await db.articleExists(article.articleUrl);

          if (exists) {
            skippedCount++;
            continue;
          }
        }

        // Insert new article
        await db.createArticle({
          title: article.title,
          description: article.description,
          content: article.content,
          category: article.category,
          source: article.source,
          author: article.author,
          publishedAt: article.publishedAt,
          imageUrl: article.imageUrl,
          articleUrl: article.articleUrl,
          trendingScore: article.trendingScore,
          viewCount: 0,
        });

        syncedCount++;
      } catch (error) {
        console.error(`Error syncing article "${article.title}":`, error);
        syncErrors.push({
          article: article.title,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    console.log(`RSS sync completed: ${syncedCount} synced, ${skippedCount} skipped`);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} articles`,
      data: {
        synced: syncedCount,
        skipped: skippedCount,
        total: articlesToSync.length,
        feedsFetched: feeds.length,
        feedErrors: errors,
        syncErrors: syncErrors,
      }
    }, { status: 200 });

  } catch (error) {
    console.error('RSS sync error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to sync RSS feeds',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

/**
 * GET /api/sync-rss
 * Returns information about configured RSS feeds
 */
export async function GET() {
  try {
    const feeds = getEnabledFeeds();
    
    return NextResponse.json({
      success: true,
      data: {
        totalFeeds: feeds.length,
        feeds: feeds.map(feed => ({
          source: feed.source,
          category: feed.category,
          url: feed.url,
        })),
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error getting RSS feed info:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get RSS feed information',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
