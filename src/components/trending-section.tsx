"use client";

import { TrendingUp, Clock } from "lucide-react";

interface TrendingArticle {
  id: string;
  rank: number;
  title: string;
  source: string;
  time: string;
  category: string;
}

const trendingArticles: TrendingArticle[] = [
  {
    id: "1",
    rank: 1,
    title: "Claude 4 Surpasses GPT-5 in Benchmark Tests",
    source: "AI News Daily",
    time: "1 hour ago",
    category: "AI & ML"
  },
  {
    id: "2",
    rank: 2,
    title: "Apple Unveils Revolutionary AI-Powered M4 Chip",
    source: "Apple Insider",
    time: "3 hours ago",
    category: "Tech"
  },
  {
    id: "3",
    rank: 3,
    title: "Tesla's Full Self-Driving Achieves Level 5 Autonomy",
    source: "Electrek",
    time: "5 hours ago",
    category: "Tech"
  },
  {
    id: "4",
    rank: 4,
    title: "Microsoft Integrates AI Across Entire Office Suite",
    source: "ZDNet",
    time: "7 hours ago",
    category: "Business"
  },
  {
    id: "5",
    rank: 5,
    title: "AI-Generated Movies Hit Streaming Platforms",
    source: "Variety",
    time: "9 hours ago",
    category: "Entertainment"
  }
];

export function TrendingSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[var(--color-secondary)]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-accent-primary)] flex-shrink-0" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            Trending Now
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {trendingArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-[var(--color-border)]"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">
                    {article.rank}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-1 bg-[var(--color-secondary)] text-[var(--color-text-tertiary)] text-xs font-semibold rounded mb-2">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] mb-3 line-clamp-3 group-hover:text-[var(--color-accent-primary)] transition-colors">
                {article.title}
              </h3>
              
              <div className="flex items-center gap-1 sm:gap-2 text-xs text-[var(--color-text-tertiary)] flex-wrap">
                <span className="font-medium truncate">{article.source}</span>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="truncate">{article.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}