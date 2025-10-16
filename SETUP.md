# Setup Guide - AI Content Generation Pipeline

## 🚀 Quick Start

### 1. Install Dependencies ✅

Already done! You have:
- `@supabase/supabase-js` - Database
- `@fal-ai/serverless-client` - Image generation
- `rss-parser` - RSS feeds

### 2. Get API Keys

You'll need API keys from:

#### **OpenRouter** (for GLM 4.6 / AI content generation)
1. Go to https://openrouter.ai/
2. Sign up and get your API key
3. Add credits to your account (~$5 should last for 100+ articles)

#### **Fal AI** (for NanoBanana Gemini / image generation)
1. Go to https://fal.ai/
2. Sign up and get your API key
3. Add credits (~$0.04 per image)

#### **Supabase** (database)
1. Go to https://supabase.com/
2. Create a new project
3. Get your project URL and keys from Settings > API

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# AI Providers
OPENROUTER_API_KEY=sk-or-v1-xxxxx
FAL_API_KEY=your_fal_key_here

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Models (optional - defaults are set)
AI_MODEL=deepseek/deepseek-chat
IMAGE_MODEL=fal-ai/flux/schnell
```

### 4. Set Up Supabase Database

#### Option A: Using Supabase Dashboard
1. Go to your Supabase project
2. Click "SQL Editor" in the sidebar
3. Copy the contents of `supabase-migration.sql`
4. Paste and run the SQL

#### Option B: Using Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

### 5. Test the Setup

Run the dev server:
```bash
npm run dev
```

Test API endpoints:
```bash
# Test OpenRouter connection
curl http://localhost:3000/api/test/openrouter

# Test Fal AI connection
curl http://localhost:3000/api/test/fal

# Test Supabase connection
curl http://localhost:3000/api/test/supabase
```

---

## 📊 Tech Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **AI Brain** | OpenRouter (GLM 4.6) | Content generation, analysis |
| **Images** | Fal AI (NanoBanana Gemini) | Featured image generation |
| **Database** | Supabase (PostgreSQL) | Article storage |
| **Queue** | Simple Queue (in-memory) | Job processing |
| **RSS** | rss-parser | Feed aggregation |

---

## 🔧 Configuration Options

### AI Models

**OpenRouter Models** (edit `AI_MODEL` in .env):
- `deepseek/deepseek-chat` - Fast and cheap ($0.14/M tokens)
- `anthropic/claude-3.5-sonnet` - High quality ($3/M tokens)
- `openai/gpt-4o` - OpenAI's best ($5/M tokens)
- `google/gemini-pro-1.5` - Google's model ($1.25/M tokens)

**Fal AI Models** (edit `IMAGE_MODEL` in .env):
- `fal-ai/flux/schnell` - Fast generation
- `fal-ai/flux-pro` - Higher quality
- `fal-ai/stable-diffusion-v3-medium` - Alternative

### Content Settings

Edit `src/lib/ai/config.ts`:

```typescript
content: {
  minWordCount: 1000,      // Minimum article length
  maxWordCount: 2000,      // Maximum article length
  targetReadingLevel: 70,  // Flesch reading score
  articlesPerBatch: 10,    // Articles to process at once
}
```

---

## 🧪 Testing

### Test Individual Components

```bash
# Test RSS feed sync
node sync-feeds.js

# Test AI providers (create these test endpoints)
curl -X POST http://localhost:3000/api/test/generate-title
curl -X POST http://localhost:3000/api/test/generate-image
```

### Run Full Pipeline

```bash
# Start pipeline (will be created in next phase)
curl -X POST http://localhost:3000/api/pipeline/start
```

---

## 💰 Cost Estimation

### Per Article
- **AI Content** (OpenRouter/DeepSeek): ~$0.02
- **Image Generation** (Fal AI): ~$0.04
- **Database** (Supabase): Free tier
- **Total**: ~$0.06 per article

### Monthly (30 articles)
- **AI + Images**: ~$1.80
- **Supabase**: Free (up to 500MB)
- **Total**: ~$2/month

*Much cheaper than the n8n workflow with GPT-4o!*

---

## 🐛 Troubleshooting

### "Missing environment variables"
- Check `.env.local` exists and has all required keys
- Restart dev server after adding keys

### "Supabase connection failed"
- Verify your Supabase URL and keys
- Check if migration was run successfully
- Ensure articles table exists

### "OpenRouter API error"
- Check API key is valid
- Verify you have credits in your account
- Try a different model

### "Fal AI timeout"
- Image generation can take 30-60 seconds
- Check your Fal AI credits
- Try a faster model like `flux/schnell`

---

## 📚 Next Steps

1. ✅ Setup complete
2. 🔨 Build trend analyzer (Phase 2)
3. 🔨 Build content generators (Phase 3)
4. 🔨 Build full pipeline (Phase 5)
5. 🚀 Deploy to production

---

## 🆘 Need Help?

Check the MASTERPLAN.md for detailed implementation guide.
