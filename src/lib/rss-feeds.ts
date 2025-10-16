// RSS Feed Configuration - Simple version
// Add or modify feeds here to customize your news sources

export interface RSSFeedConfig {
  url: string;
  category: string;
  source: string;
  enabled: boolean;
}

export const RSS_FEEDS: RSSFeedConfig[] = [
  // AI & Machine Learning
  {
    url: 'https://openai.com/blog/rss/',
    category: 'AI & ML',
    source: 'OpenAI',
    enabled: true,
  },
  {
    url: 'https://www.marktechpost.com/feed/',
    category: 'AI & ML',
    source: 'MarkTechPost',
    enabled: true,
  },
  {
    url: 'https://www.artificialintelligence-news.com/feed/',
    category: 'AI & ML',
    source: 'AI News',
    enabled: true,
  },
  
  // Tech News
  {
    url: 'https://techcrunch.com/feed/',
    category: 'Tech',
    source: 'TechCrunch',
    enabled: true,
  },
  {
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'Tech',
    source: 'The Verge',
    enabled: true,
  },
  {
    url: 'https://www.wired.com/feed/rss',
    category: 'Tech',
    source: 'Wired',
    enabled: true,
  },
];

export const getEnabledFeeds = (): RSSFeedConfig[] => {
  return RSS_FEEDS.filter(feed => feed.enabled);
};

export const getFeedsByCategory = (category: string): RSSFeedConfig[] => {
  return RSS_FEEDS.filter(feed => feed.enabled && feed.category === category);
};
