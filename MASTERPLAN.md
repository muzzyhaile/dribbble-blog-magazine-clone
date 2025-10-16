# AI Blog Content Generation Pipeline - Master Plan

## Overview
Transform RSS feeds into original, SEO-optimized blog articles using AI agents - a code implementation of the n8n workflow.

---

## Architecture

```
RSS Feeds → Fetch & Filter → AI Analysis → Content Generation → SEO Optimization → Publish
```

---

## Phase 1: Foundation & Data Collection ✅ (DONE)

### 1.1 RSS Feed Infrastructure
- [x] RSS parser library installed
- [x] Feed configuration system
- [x] RSS fetcher service
- [x] Sync API endpoint

### 1.2 Database Schema Enhancement
- [ ] Add new fields to articles table:
  - `status` (draft, processing, published)
  - `processingStep` (1-9)
  - `aiGeneratedTitle`
  - `aiGeneratedContent`
  - `blogOutline`
  - `metaTitle`
  - `metaDescription`
  - `slug`
  - `seoScore`
  - `imagePrompt`
  - `featuredImageUrl`
  - `sourceArticles` (JSON array of original RSS articles)

---

## Phase 2: AI Content Strategy Layer

### 2.1 Trend Analysis Agent
**Purpose:** Analyze multiple RSS articles to identify trending topics

**Input:** 20-50 recent articles from RSS feeds
**Output:** 10 long-tail blog title ideas with keywords

**Implementation:**
```typescript
// src/lib/ai/trend-analyzer.ts
interface TrendAnalysis {
  titles: Array<{
    title: string;
    mainKeyword: string;
    relatedKeywords: string[];
    tone: 'analytical' | 'educational' | 'provocative';
    sourceArticles: string[]; // URLs
  }>;
}

async function analyzeTrends(articles: Article[]): Promise<TrendAnalysis>
```

**AI Prompt Strategy:**
- Extract common themes from 20+ articles
- Generate unique angles (not just summaries)
- Focus on "why", "how", "what's next" formats
- Ensure SEO-friendly, future-resilient titles

---

### 2.2 Title Scoring Agent
**Purpose:** Rate and rank generated titles for quality

**Input:** List of title ideas
**Output:** Ranked titles with scores

**Implementation:**
```typescript
// src/lib/ai/title-scorer.ts
interface TitleScore {
  title: string;
  uniquenessScore: number;    // 1-10
  seoScore: number;            // 1-10
  clickabilityScore: number;   // 1-10
  averageScore: number;
  reason: string;
}

async function scoreTitle(titles: string[]): Promise<TitleScore[]>
```

**Scoring Criteria:**
- Uniqueness (not generic)
- SEO keyword clarity
- Emotional/curiosity appeal
- Long-tail keyword usage

---

### 2.3 Article Research Agent
**Purpose:** Deep-dive into source articles for facts and quotes

**Input:** URLs of related articles
**Output:** Structured research data

**Implementation:**
```typescript
// src/lib/ai/article-researcher.ts
interface ResearchData {
  summary: string;              // 2-paragraph abstract
  keyIdeas: string[];
  companies: string[];
  researchers: string[];
  models: string[];
  quotes: string[];
  statistics: string[];
}

async function researchArticle(url: string): Promise<ResearchData>
```

**Process:**
1. Fetch article HTML
2. Extract body content
3. Use AI to extract key information
4. Store structured data

---

## Phase 3: Content Generation Pipeline

### 3.1 Blog Outline Generator
**Purpose:** Create SEO-optimized article structure

**Input:** Title, keywords, research data
**Output:** Markdown outline with H1/H2 structure

**Implementation:**
```typescript
// src/lib/ai/outline-generator.ts
interface BlogOutline {
  h1: string;
  sections: Array<{
    h2: string;
    keyPoints: string[];
    keywords: string[];
  }>;
}

async function generateOutline(
  title: string,
  keywords: string[],
  research: ResearchData[]
): Promise<string> // Markdown format
```

**Structure:**
1. Introduction (hook + context)
2. Background (explain the topic)
3. Trend Analysis (what's happening)
4. Insights (deeper analysis)
5. Future Implications
6. Call to Action

---

### 3.2 Full Article Writer
**Purpose:** Write complete 1500-2000 word article

**Input:** Outline, research data, tone
**Output:** Full markdown article

**Implementation:**
```typescript
// src/lib/ai/article-writer.ts
interface ArticleContent {
  markdown: string;
  wordCount: number;
  readingTime: number;
}

async function writeArticle(
  outline: string,
  research: ResearchData[],
  tone: string
): Promise<ArticleContent>
```

**Requirements:**
- 300-500 words per section
- Include 2+ citations
- Add analogies/examples
- Natural keyword integration
- Maintain specified tone

---

### 3.3 SEO Metadata Generator
**Purpose:** Create all SEO elements

**Input:** Article content
**Output:** SEO metadata

**Implementation:**
```typescript
// src/lib/ai/seo-generator.ts
interface SEOMetadata {
  metaTitle: string;        // 60 chars max
  metaDescription: string;  // 160 chars max
  slug: string;
  imageAltText: string;
  seoReport: {
    keywordDensity: string;
    passiveVoiceCount: number;
    fleschScore: number;
  };
}

async function generateSEO(
  title: string,
  content: string,
  keywords: string[]
): Promise<SEOMetadata>
```

---

## Phase 4: Visual Content Generation

### 4.1 Image Prompt Generator
**Purpose:** Create compelling image generation prompts

**Implementation:**
```typescript
// src/lib/ai/image-prompt-generator.ts
async function generateImagePrompt(
  title: string,
  altText: string
): Promise<string>
```

**Strategy:**
- Human-centered scenes
- Emotional storytelling
- Avoid abstract tech visuals
- Cinematic, relatable moments

---

### 4.2 Image Generation Integration
**Options:**
- OpenAI DALL-E 3
- Replicate (Stable Diffusion)
- Leonardo AI
- Midjourney API

**Implementation:**
```typescript
// src/lib/ai/image-generator.ts
async function generateImage(
  prompt: string
): Promise<{ url: string; id: string }>
```

---

## Phase 5: Orchestration & Workflow

### 5.1 Content Pipeline Orchestrator
**Purpose:** Manage the entire workflow

**Implementation:**
```typescript
// src/lib/pipeline/content-orchestrator.ts

class ContentPipeline {
  // Step 1: Fetch RSS feeds
  async fetchFeeds(): Promise<Article[]>
  
  // Step 2: Analyze trends
  async analyzeTrends(articles: Article[]): Promise<TrendAnalysis>
  
  // Step 3: Score titles
  async scoreTitles(ideas: TitleIdea[]): Promise<TitleScore[]>
  
  // Step 4: Research articles
  async researchArticles(urls: string[]): Promise<ResearchData[]>
  
  // Step 5: Generate outline
  async generateOutline(data: any): Promise<string>
  
  // Step 6: Write article
  async writeArticle(outline: string): Promise<string>
  
  // Step 7: Generate SEO
  async generateSEO(content: string): Promise<SEOMetadata>
  
  // Step 8: Generate image
  async generateImage(prompt: string): Promise<string>
  
  // Step 9: Publish
  async publish(article: CompleteArticle): Promise<void>
  
  // Run entire pipeline
  async run(): Promise<void>
}
```

---

### 5.2 API Endpoints

```typescript
// POST /api/pipeline/start
// Start the content generation pipeline
// Returns: { jobId: string }

// GET /api/pipeline/status/:jobId
// Check pipeline progress
// Returns: { step: number, status: string, data: any }

// POST /api/pipeline/step/:step
// Run a specific step manually
// Returns: { success: boolean, data: any }
```

---

### 5.3 Background Job System
**Options:**
- Bull Queue (Redis-based)
- Inngest (serverless)
- Simple cron jobs

**Implementation:**
```typescript
// src/lib/jobs/content-generator.ts
export async function scheduleContentGeneration() {
  // Run daily at specific time
  // Process articles in batches
  // Handle failures gracefully
}
```

---

## Phase 6: AI Provider Integration

### 6.1 OpenAI Integration
```typescript
// src/lib/ai/providers/openai.ts
import OpenAI from 'openai';

export class OpenAIProvider {
  async chat(prompt: string, model: string): Promise<string>
  async generateImage(prompt: string): Promise<string>
}
```

**Models:**
- `gpt-4o` - Main article writing
- `gpt-4o-mini` - Quick tasks (titles, SEO)
- `dall-e-3` - Image generation

---

### 6.2 Alternative Providers
- **Anthropic Claude** - Long-form content
- **Google Gemini** - Research analysis
- **Perplexity** - Web search integration

---

## Phase 7: Quality Control & Publishing

### 7.1 Content Review System
```typescript
interface ContentReview {
  plagiarismCheck: boolean;
  factCheck: boolean;
  readabilityScore: number;
  seoScore: number;
  approved: boolean;
}
```

### 7.2 Publishing Options
- **Internal CMS** - Store in database
- **WordPress API** - Auto-publish to WP
- **Markdown Export** - Download files
- **Draft Mode** - Manual review before publish

---

## Phase 8: Monitoring & Analytics

### 8.1 Pipeline Metrics
- Articles generated per day
- Success/failure rates
- AI token usage
- Processing time per step
- Cost per article

### 8.2 Content Performance
- Page views
- Time on page
- SEO rankings
- Social shares

---

## Technology Stack

### Core Dependencies
```json
{
  "openai": "^4.0.0",           // AI generation
  "cheerio": "^1.0.0",          // HTML parsing
  "rss-parser": "^3.13.0",      // RSS feeds (installed)
  "bullmq": "^5.0.0",           // Job queue
  "zod": "^4.0.0",              // Schema validation
  "marked": "^12.0.0"           // Markdown processing
}
```

### Optional Enhancements
- `langchain` - AI orchestration framework
- `replicate` - Alternative image generation
- `inngest` - Serverless job queue
- `upstash` - Redis for queues

---

## Implementation Timeline

### Week 1: Foundation
- [ ] Database schema updates
- [ ] AI provider setup (OpenAI)
- [ ] Basic pipeline structure

### Week 2: AI Agents
- [ ] Trend analyzer
- [ ] Title scorer
- [ ] Article researcher

### Week 3: Content Generation
- [ ] Outline generator
- [ ] Article writer
- [ ] SEO generator

### Week 4: Visual & Publishing
- [ ] Image generation
- [ ] Publishing system
- [ ] Job queue setup

### Week 5: Testing & Optimization
- [ ] End-to-end testing
- [ ] Cost optimization
- [ ] Performance tuning

---

## Cost Estimation

### Per Article (using GPT-4o)
- Trend analysis: ~$0.10
- Research (3 articles): ~$0.15
- Outline generation: ~$0.05
- Article writing: ~$0.30
- SEO generation: ~$0.05
- Image generation: ~$0.04 (DALL-E 3)

**Total: ~$0.70 per article**

### Monthly (30 articles)
- AI costs: ~$21
- Infrastructure: ~$10
- **Total: ~$31/month**

---

## Next Steps

1. **Choose AI Provider** - OpenAI vs alternatives
2. **Set up API keys** - Store in `.env`
3. **Update database schema** - Add new fields
4. **Build Phase 2** - Start with trend analyzer
5. **Test with real data** - Validate quality

---

## Questions to Answer

1. **Publishing frequency?** Daily, weekly, or on-demand?
2. **Manual review?** Auto-publish or require approval?
3. **Image generation?** Use AI or stock photos?
4. **Content length?** 1000, 1500, or 2000+ words?
5. **AI provider?** OpenAI only or multi-provider?

---

## Success Metrics

- ✅ Generate 1 high-quality article per day
- ✅ 90%+ unique content (no plagiarism)
- ✅ 70+ Flesch reading score
- ✅ Featured snippet optimization
- ✅ < $1 per article cost
- ✅ < 10 minutes processing time

---

**Ready to start implementation?** Let me know which phase to begin with!
