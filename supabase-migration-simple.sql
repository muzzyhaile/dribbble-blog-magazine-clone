-- Simple Supabase Migration: Create Articles Table
-- Run this in your Supabase SQL Editor

-- Drop table if it exists (WARNING: This will delete all data!)
-- DROP TABLE IF EXISTS articles CASCADE;

-- Create articles table with all fields
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  
  -- Basic article fields
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
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'published', 'failed')),
  processing_step INTEGER DEFAULT 0 CHECK (processing_step >= 0 AND processing_step <= 9),
  ai_generated_title TEXT,
  ai_generated_content TEXT,
  blog_outline TEXT,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  slug VARCHAR(255) UNIQUE,
  seo_score DECIMAL(5,2),
  image_prompt TEXT,
  featured_image_url TEXT,
  source_articles JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_processing_step ON articles(processing_step);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_article_url ON articles(article_url);

-- Create views
CREATE VIEW articles_pending_processing AS
SELECT * FROM articles
WHERE status = 'draft' 
  AND (processing_step IS NULL OR processing_step = 0)
ORDER BY created_at ASC;

CREATE VIEW articles_published AS
SELECT * FROM articles
WHERE status = 'published'
ORDER BY published_at DESC;

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read, authenticated write)
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON articles
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON articles
  FOR DELETE USING (true);

-- Add comments
COMMENT ON TABLE articles IS 'Articles table with AI content generation pipeline support';
COMMENT ON COLUMN articles.status IS 'Article status: draft, processing, published, failed';
COMMENT ON COLUMN articles.processing_step IS 'Current pipeline step (0-9)';
COMMENT ON COLUMN articles.ai_generated_title IS 'AI-generated blog title';
COMMENT ON COLUMN articles.ai_generated_content IS 'Full AI-generated article content';
COMMENT ON COLUMN articles.blog_outline IS 'Article outline in markdown format';
COMMENT ON COLUMN articles.slug IS 'URL-friendly slug for the article';
COMMENT ON COLUMN articles.source_articles IS 'JSON array of source article URLs used for research';
