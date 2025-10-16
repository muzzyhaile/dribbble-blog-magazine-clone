"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Clock, ArrowLeft, Share2, ExternalLink } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  content: string | null;
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
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

export default function ArticleClient({ article }: { article: Article }) {
  const router = useRouter();

  useEffect(() => {
    // Increment view count on mount
    const incrementViewCount = async () => {
      try {
        await fetch(`/api/articles/${article.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ incrementView: true }),
        });
      } catch (error) {
        console.error("Failed to increment view count:", error);
      }
    };

    incrementViewCount();
  }, [article.id]);

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        <article className="bg-white">
          {/* Hero Image */}
          {article.imageUrl && (
            <div className="w-full h-80 sm:h-96 md:h-[500px] overflow-hidden bg-gray-100">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Article Content */}
          <section className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-4xl">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] hover:text-[#1e40af] transition-colors mb-6 font-semibold"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[var(--color-secondary)] text-[var(--color-accent-primary)] text-xs font-semibold uppercase tracking-wider rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-6 border-b border-[var(--color-border)] mb-8">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {article.source}
                    </p>
                    {article.author && (
                      <p className="text-sm text-[var(--color-text-tertiary)]">
                        by {article.author}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <time dateTime={article.publishedAt}>
                      {getRelativeTime(article.publishedAt)}
                    </time>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>{article.viewCount} views</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm sm:prose md:prose-lg max-w-none mb-8">
                <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {article.description}
                </p>

                {article.content && (
                  <div className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-8">
                    {article.content.split("\n\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-8 border-t border-[var(--color-border)]">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.description,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-text-primary)] font-semibold rounded-full hover:bg-[var(--color-hover-state)] transition-all"
                  aria-label="Share this article"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                <a
                  href={article.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#1e40af] transition-all"
                  aria-label="Read the original article on the source website"
                >
                  <span>Read Original</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
