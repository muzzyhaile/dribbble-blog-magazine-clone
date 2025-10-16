import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const article = await db
      .select()
      .from(articles)
      .where(eq(articles.id, parseInt(id)))
      .limit(1);

    if (article.length === 0) {
      return NextResponse.json(
        {
          error: 'Article not found',
          code: 'ARTICLE_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(article[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, parseInt(id)))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        {
          error: 'Article not found',
          code: 'ARTICLE_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      incrementView,
      title,
      description,
      content,
      category,
      source,
      author,
      publishedAt,
      imageUrl,
      articleUrl,
      trendingScore,
      viewCount,
    } = body;

    const validCategories = [
      'technology',
      'business',
      'entertainment',
      'sports',
      'science',
      'health',
      'general',
    ];

    if (category && !validCategories.includes(category.toLowerCase())) {
      return NextResponse.json(
        {
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
          code: 'INVALID_CATEGORY',
        },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (incrementView === true) {
      updates.viewCount = (existingArticle[0].viewCount || 0) + 1;
    } else if (viewCount !== undefined) {
      updates.viewCount = viewCount;
    }

    if (title !== undefined) {
      updates.title = title.trim();
    }

    if (description !== undefined) {
      updates.description = description ? description.trim() : description;
    }

    if (content !== undefined) {
      updates.content = content ? content.trim() : content;
    }

    if (category !== undefined) {
      updates.category = category.trim();
    }

    if (source !== undefined) {
      updates.source = source.trim();
    }

    if (author !== undefined) {
      updates.author = author ? author.trim() : author;
    }

    if (publishedAt !== undefined) {
      updates.publishedAt = publishedAt;
    }

    if (imageUrl !== undefined) {
      updates.imageUrl = imageUrl ? imageUrl.trim() : imageUrl;
    }

    if (articleUrl !== undefined) {
      updates.articleUrl = articleUrl.trim();
    }

    if (trendingScore !== undefined) {
      updates.trendingScore = trendingScore;
    }

    const updatedArticle = await db
      .update(articles)
      .set(updates)
      .where(eq(articles.id, parseInt(id)))
      .returning();

    if (updatedArticle.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to update article',
          code: 'UPDATE_FAILED',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedArticle[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error,
      },
      { status: 500 }
    );
  }
}