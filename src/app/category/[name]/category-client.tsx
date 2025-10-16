"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Clock, ArrowLeft, ExternalLink } from "lucide-react";

interface Article {
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

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

export default function CategoryClient({
  categoryName,
}: {
  categoryName: string;
}) {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
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
      const url = `/api/articles?category=${encodeURIComponent(
        categoryName
      )}&limit=${limit}&offset=${currentOffset}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();

      if (reset) {
        setArticles(data);
      } else {
        setArticles((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === limit);
      if (!reset) {
        setOffset(currentOffset + limit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
  }, [categoryName]);

  const handleLoadMore = () => {
    fetchArticles();
  };

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-8 sm:py-12 md:py-16 border-b border-[var(--color-border)]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] hover:text-[#1e40af] transition-colors mb-6 font-semibold"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2">
              {categoryName}
            </h1>
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)]">
              Explore all articles in {categoryName}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-500 mb-4">
                  Error loading articles: {error}
                </p>
                <button
                  onClick={() => fetchArticles(true)}
                  className="px-6 py-2 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#1e40af] transition-all"
                >
                  Try Again
                </button>
              </div>
            )}

            {isLoading && articles.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-xl h-80 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                  No articles found
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  There are no articles in the {categoryName} category yet.
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#1e40af] transition-all"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {articles.map((article) => (
                    <article
                      key={article.id}
                      className="group bg-white rounded-lg sm:rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        {article.imageUrl ? (
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <div className="text-blue-300 text-4xl">📰</div>
                          </div>
                        )}
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                          <span className="px-2 sm:px-3 py-1 bg-[var(--color-accent-primary)] text-white text-xs font-semibold rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <h3
                          className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-text-primary)] mb-2 sm:mb-3 line-clamp-2 group-hover:text-[var(--color-accent-primary)] transition-colors cursor-pointer"
                          onClick={() => router.push(`/article/${article.id}`)}
                        >
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-3 sm:mb-4 line-clamp-2">
                          {article.description}
                        </p>

                        <div className="flex items-center justify-between text-xs sm:text-sm gap-2 mb-4">
                          <div className="flex items-center gap-1 sm:gap-2 text-[var(--color-text-tertiary)] flex-wrap">
                            <span className="font-medium truncate">
                              {article.source}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              <time dateTime={article.publishedAt}>
                                {getRelativeTime(article.publishedAt)}
                              </time>
                            </div>
                          </div>
                        </div>

                        <a
                          href={article.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] hover:text-[#1e40af] transition-colors font-semibold text-sm"
                          aria-label={`Read full article: ${article.title}`}
                        >
                          Read More
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-8 sm:mt-12 md:mt-16">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="px-6 sm:px-8 py-2 sm:py-3 bg-[var(--color-secondary)] text-[var(--color-text-primary)] font-semibold rounded-full hover:bg-[var(--color-hover-state)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      aria-label="Load more articles"
                    >
                      {isLoading ? "Loading..." : "Load More Articles"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
