-- Supabase Migration: Create Articles Table with AI Content Generation Fields
-- Run this in your Supabase SQL Editor

-- Create articles table if it doesn't exist
CREATE TABLE IF NOT EXISTS articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  category VARCHAR(50) NOT NULL,
  source VARCHAR(100) NOT NULL,
  author VARCHAR(255),
  published_at TIMESTAMPTZ NOT NULL,
  image_url TEXT,
  article_url TEXT NOT NULL UNIQUE,
  trending_score INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- AI Content Generation Fields
  status VARCHAR(20) DEFAULT 'draft',
  processing_step INTEGER DEFAULT 0,
  ai_generated_title TEXT,
  ai_generated_content TEXT,
  blog_outline TEXT,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  slug VARCHAR(255),
  seo_score DECIMAL(5,2),
  image_prompt TEXT,
  featured_image_url TEXT,
  source_articles JSONB
);

-- If table already exists, add new columns
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS processing_step INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ai_generated_title TEXT,
ADD COLUMN IF NOT EXISTS ai_generated_content TEXT,
ADD COLUMN IF NOT EXISTS blog_outline TEXT,
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(60),
ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS seo_score DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS image_prompt TEXT,
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
ADD COLUMN IF NOT EXISTS source_articles JSONB;

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- Create index on processing_step for pipeline queries
CREATE INDEX IF NOT EXISTS idx_articles_processing_step ON articles(processing_step);

-- Create index on slug for SEO URLs
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Add check constraint for status
ALTER TABLE articles 
ADD CONSTRAINT check_status 
CHECK (status IN ('draft', 'processing', 'published', 'failed'));

-- Add check constraint for processing_step (0-9 for 9 pipeline steps)
ALTER TABLE articles 
ADD CONSTRAINT check_processing_step 
CHECK (processing_step >= 0 AND processing_step <= 9);

-- Create a view for articles ready for processing
CREATE OR REPLACE VIEW articles_pending_processing AS
SELECT * FROM articles
WHERE status = 'draft' 
  AND (processing_step IS NULL OR processing_step = 0)
ORDER BY created_at ASC;

-- Create a view for published articles
CREATE OR REPLACE VIEW articles_published AS
SELECT * FROM articles
WHERE status = 'published'
ORDER BY published_at DESC;

-- Add comment to table
COMMENT ON TABLE articles IS 'Articles table with AI content generation pipeline support';

-- Add comments to new columns
COMMENT ON COLUMN articles.status IS 'Article status: draft, processing, published, failed';
COMMENT ON COLUMN articles.processing_step IS 'Current pipeline step (0-9)';
COMMENT ON COLUMN articles.ai_generated_title IS 'AI-generated blog title';
COMMENT ON COLUMN articles.ai_generated_content IS 'Full AI-generated article content';
COMMENT ON COLUMN articles.blog_outline IS 'Article outline in markdown format';
COMMENT ON COLUMN articles.meta_title IS 'SEO meta title (max 60 chars)';
COMMENT ON COLUMN articles.meta_description IS 'SEO meta description (max 160 chars)';
COMMENT ON COLUMN articles.slug IS 'URL-friendly slug for the article';
COMMENT ON COLUMN articles.seo_score IS 'SEO quality score (0-100)';
COMMENT ON COLUMN articles.image_prompt IS 'Prompt used for AI image generation';
COMMENT ON COLUMN articles.featured_image_url IS 'URL of the generated featured image';
COMMENT ON COLUMN articles.source_articles IS 'JSON array of source article URLs used for research';
