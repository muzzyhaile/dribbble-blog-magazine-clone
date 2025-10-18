"use client";

import { Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  author: string | null;
  publishedAt: string;
  imageUrl: string | null;
  articleUrl: string;
  trendingScore: number;
  viewCount: number;
}

interface NewsFeedProps {
  selectedCategory?: string;
  searchQuery?: string;
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

export function NewsFeed({ selectedCategory = "all", searchQuery = "" }: NewsFeedProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchArticles = async (reset: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentOffset = reset ? 0 : offset;
      let url = `/api/articles?limit=${limit}&offset=${currentOffset}`;
      
      if (selectedCategory && selectedCategory !== "all") {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data: NewsArticle[] = await response.json();
      
      if (reset) {
        setArticles(data);
        setOffset(limit);
      } else {
        setArticles(prev => [...prev, ...data]);
        setOffset(prev => prev + limit);
      }
      
      setHasMore(data.length === limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
  }, [selectedCategory, searchQuery]);

  const handleLoadMore = () => {
    fetchArticles(false);
  };

  if (error && articles.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Error loading articles: {error}</p>
            <button
              onClick={() => fetchArticles(true)}
              className="px-6 py-2 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#D43D7A] transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Latest Updates
          </h2>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Feed</span>
          </div>
        </div>

        {isLoading && articles.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-secondary)] text-lg">No articles found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/article/${article.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[var(--color-accent-primary)] text-white text-xs font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-[var(--color-text-tertiary)]">
                        <span className="font-medium">{article.source}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{getRelativeTime(article.publishedAt)}</span>
                        </div>
                      </div>
                      
                      <ExternalLink className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-8 py-3 bg-[var(--color-secondary)] text-[var(--color-text-primary)] font-semibold rounded-full hover:bg-[var(--color-hover-state)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Loading..." : "Load More Articles"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}