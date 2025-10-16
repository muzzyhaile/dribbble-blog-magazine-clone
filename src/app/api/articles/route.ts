import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, like, or, desc, asc } from 'drizzle-orm';

const VALID_CATEGORIES = ['Tech', 'AI & ML', 'Business', 'World News', 'Science', 'Politics', 'Entertainment'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single article by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({
          error: "Valid ID is required",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      const article = await db.select()
        .from(articles)
        .where(eq(articles.id, parseInt(id)))
        .limit(1);

      if (article.length === 0) {
        return NextResponse.json({
          error: 'Article not found',
          code: 'NOT_FOUND'
        }, { status: 404 });
      }

      return NextResponse.json(article[0], { status: 200 });
    }

    // List articles with filters and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const trending = searchParams.get('trending');

    let query = db.select().from(articles);

    // Apply category filter
    if (category) {
      query = query.where(eq(articles.category, category));
    }

    // Apply search filter
    if (search) {
      const searchCondition = or(
        like(articles.title, `%${search}%`),
        like(articles.description, `%${search}%`)
      );

      if (category) {
        query = db.select()
          .from(articles)
          .where(eq(articles.category, category));
        query = query.where(searchCondition);
      } else {
        query = query.where(searchCondition);
      }
    }

    // Apply sorting
    if (trending === 'true') {
      query = query.orderBy(desc(articles.trendingScore));
    } else {
      query = query.orderBy(desc(articles.publishedAt));
    }

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
      return NextResponse.json({
        error: "Title is required and must be a non-empty string",
        code: "MISSING_TITLE"
      }, { status: 400 });
    }

    if (!body.category || typeof body.category !== 'string' || body.category.trim() === '') {
      return NextResponse.json({
        error: "Category is required and must be a non-empty string",
        code: "MISSING_CATEGORY"
      }, { status: 400 });
    }

    if (!VALID_CATEGORIES.includes(body.category)) {
      return NextResponse.json({
        error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY"
      }, { status: 400 });
    }

    if (!body.source || typeof body.source !== 'string' || body.source.trim() === '') {
      return NextResponse.json({
        error: "Source is required and must be a non-empty string",
        code: "MISSING_SOURCE"
      }, { status: 400 });
    }

    if (!body.articleUrl || typeof body.articleUrl !== 'string' || body.articleUrl.trim() === '') {
      return NextResponse.json({
        error: "Article URL is required and must be a non-empty string",
        code: "MISSING_ARTICLE_URL"
      }, { status: 400 });
    }

    if (!body.publishedAt || typeof body.publishedAt !== 'string' || body.publishedAt.trim() === '') {
      return NextResponse.json({
        error: "Published date is required and must be an ISO timestamp string",
        code: "MISSING_PUBLISHED_AT"
      }, { status: 400 });
    }

    // Prepare insert data
    const currentTimestamp = new Date().toISOString();
    const insertData = {
      title: body.title.trim(),
      description: body.description ? body.description.trim() : null,
      content: body.content ? body.content.trim() : null,
      category: body.category.trim(),
      source: body.source.trim(),
      author: body.author ? body.author.trim() : null,
      publishedAt: body.publishedAt.trim(),
      imageUrl: body.imageUrl ? body.imageUrl.trim() : null,
      articleUrl: body.articleUrl.trim(),
      trendingScore: body.trendingScore !== undefined ? body.trendingScore : 0,
      viewCount: 0,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp
    };

    const newArticle = await db.insert(articles)
      .values(insertData)
      .returning();

    return NextResponse.json(newArticle[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({
        error: "Valid ID is required",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    const deleted = await db.delete(articles)
      .where(eq(articles.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({
        error: 'Article not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Article deleted successfully",
      article: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}