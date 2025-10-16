import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content'),
  category: text('category').notNull(),
  source: text('source').notNull(),
  author: text('author'),
  publishedAt: text('published_at').notNull(),
  imageUrl: text('image_url'),
  articleUrl: text('article_url').notNull(),
  trendingScore: real('trending_score').default(0),
  viewCount: integer('view_count').default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});