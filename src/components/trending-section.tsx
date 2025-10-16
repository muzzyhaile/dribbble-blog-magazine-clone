"use client";

import { TrendingUp, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface TrendingArticle {
  id: number;
  title: string;
  source: string;
  publishedAt: string;
  category: string;
  trendingScore: number;
  articleUrl: string;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

export function TrendingSection() {
  const [trendingArticles, setTrendingArticles] = useState<TrendingArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch("/api/articles?trending=true&limit=5");
        
        if (!response.ok) {
          throw new Error("Failed to fetch trending articles");
        }

        const data: TrendingArticle[] = await response.json();
        setTrendingArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching trending articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingArticles();
  }, []);

  if (error) {
    return (
      <section className="py-16 bg-[var(--color-secondary)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500">Error loading trending articles</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[var(--color-secondary)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp className="w-8 h-8 text-[var(--color-accent-primary)]" />
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Trending Now
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {trendingArticles.map((article, index) => (
              <div
                key={article.id}
                className="group bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-[var(--color-border)]"
                onClick={() => window.open(article.articleUrl, "_blank", "noopener,noreferrer")}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-[var(--color-secondary)] text-[var(--color-text-tertiary)] text-xs font-semibold rounded mb-2">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-3 line-clamp-3 group-hover:text-[var(--color-accent-primary)] transition-colors">
                  {article.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
                  <span className="font-medium">{article.source}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{getRelativeTime(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}