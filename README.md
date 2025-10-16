# AI & Tech News Magazine

A modern blog/magazine platform built with Next.js that aggregates real-time news from RSS feeds.

## Features

- 📰 Real-time RSS feed aggregation from top tech and AI sources
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔍 Category filtering and search
- 📊 Trending articles based on recency
- 💾 SQLite database with Drizzle ORM

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 2. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## RSS Feed Integration

This project includes a simple RSS feed integration that fetches articles from configured sources and stores them in your database.

### Sync RSS Feeds

To populate your blog with real articles from RSS feeds:

**Option 1: Using curl (Command Line)**
```bash
curl -X POST http://localhost:3000/api/sync-rss
```

**Option 2: Using your browser**
Open your browser and visit: `http://localhost:3000/api/sync-rss` (use a browser extension to make POST requests)

**Option 3: Using JavaScript in browser console**
```javascript
fetch('http://localhost:3000/api/sync-rss', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

### View Configured Feeds

To see which RSS feeds are configured:
```bash
curl http://localhost:3000/api/sync-rss
```

### Customize RSS Feeds

Edit `src/lib/rss-feeds.ts` to add or modify RSS feed sources:

```typescript
export const RSS_FEEDS: RSSFeedConfig[] = [
  {
    url: 'https://example.com/feed/',
    category: 'Tech',
    source: 'Example Source',
    enabled: true,
  },
  // Add more feeds here
];
```

### Sync Options

You can customize the sync behavior with query parameters:

```bash
# Limit articles per feed (default: 10)
curl -X POST "http://localhost:3000/api/sync-rss?limit=5"

# Allow duplicate articles
curl -X POST "http://localhost:3000/api/sync-rss?skipDuplicates=false"
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── articles/      # Article CRUD endpoints
│   │   └── sync-rss/      # RSS sync endpoint
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/
│   ├── rss-feeds.ts      # RSS feed configuration
│   └── rss-fetcher.ts    # RSS parsing logic
└── db/                   # Database schema and config
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
