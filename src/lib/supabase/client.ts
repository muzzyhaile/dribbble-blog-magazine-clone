/**
 * Supabase Client
 * Database connection for article storage and management
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AI_CONFIG } from '../ai/config';

// Database types will be generated from Supabase
export interface Article {
  id: number;
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
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  
  // AI-generated content fields
  status?: 'draft' | 'processing' | 'published';
  processingStep?: number;
  aiGeneratedTitle?: string | null;
  aiGeneratedContent?: string | null;
  blogOutline?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  seoScore?: number | null;
  imagePrompt?: string | null;
  featuredImageUrl?: string | null;
  sourceArticles?: string[] | null; // JSON array of URLs
}

let supabaseClient: SupabaseClient | null = null;

/**
 * Get Supabase client instance (singleton)
 */
export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const { url, serviceRoleKey } = AI_CONFIG.supabase;

    if (!url || !serviceRoleKey) {
      throw new Error('Supabase configuration is missing');
    }

    supabaseClient = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

/**
 * Article database operations
 */
export class ArticleDB {
  private db: SupabaseClient;

  constructor() {
    this.db = getSupabase();
  }

  /**
   * Get all articles with optional filters
   */
  async getArticles(options?: {
    limit?: number;
    offset?: number;
    category?: string;
    status?: string;
  }): Promise<Article[]> {
    let query = this.db
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false });

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get a single article by ID
   */
  async getArticle(id: number): Promise<Article | null> {
    const { data, error } = await this.db
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch article: ${error.message}`);
    }

    return data;
  }

  /**
   * Create a new article
   */
  async createArticle(article: Partial<Article>): Promise<Article> {
    const { data, error } = await this.db
      .from('articles')
      .insert(article)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create article: ${error.message}`);
    }

    return data;
  }

  /**
   * Update an existing article
   */
  async updateArticle(id: number, updates: Partial<Article>): Promise<Article> {
    const { data, error } = await this.db
      .from('articles')
      .update({
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update article: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete an article
   */
  async deleteArticle(id: number): Promise<void> {
    const { error } = await this.db
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete article: ${error.message}`);
    }
  }

  /**
   * Check if article exists by URL
   */
  async articleExists(url: string): Promise<boolean> {
    const { data, error } = await this.db
      .from('articles')
      .select('id')
      .eq('articleUrl', url)
      .single();

    return !error && data !== null;
  }

  /**
   * Get articles ready for processing (status = draft, processingStep = 0)
   */
  async getArticlesForProcessing(limit: number = 10): Promise<Article[]> {
    const { data, error } = await this.db
      .from('articles')
      .select('*')
      .eq('status', 'draft')
      .is('processingStep', null)
      .order('createdAt', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch articles for processing: ${error.message}`);
    }

    return data || [];
  }
}

// Singleton instance
let articleDBInstance: ArticleDB | null = null;

export function getArticleDB(): ArticleDB {
  if (!articleDBInstance) {
    articleDBInstance = new ArticleDB();
  }
  return articleDBInstance;
}
