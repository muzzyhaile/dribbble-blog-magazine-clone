"use client";

import { Clock, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  time: string;
  imageUrl: string;
  url: string;
}

// Mock data - will be replaced with real webhook data
const mockArticles: NewsArticle[] = [
  {
    id: 1,
    title: "OpenAI Unveils GPT-5: Revolutionary Breakthrough in Large Language Models",
    description: "The new model shows unprecedented improvements in reasoning, creativity, and multimodal understanding, marking a significant leap forward in AI capabilities.",
    category: "AI & ML",
    source: "TechCrunch",
    time: "2 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    url: "#"
  },
  {
    id: 2,
    title: "Meta's New AI Agent Can Browse the Web and Perform Complex Tasks",
    description: "Meta introduces advanced AI agents capable of autonomous web navigation, marking a new era in artificial intelligence assistance.",
    category: "Tech",
    source: "The Verge",
    time: "4 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    url: "#"
  },
  {
    id: 3,
    title: "AI Startup Raises $500M to Build Next-Generation Neural Networks",
    description: "The funding round values the company at $5 billion, highlighting growing investor confidence in advanced AI infrastructure.",
    category: "Business",
    source: "Bloomberg",
    time: "6 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80",
    url: "#"
  },
  {
    id: 4,
    title: "Scientists Use AI to Discover New Cancer Treatment",
    description: "Machine learning algorithms identify promising drug candidates that could revolutionize cancer therapy approaches.",
    category: "Science",
    source: "Nature",
    time: "8 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    url: "#"
  },
  {
    id: 5,
    title: "EU Passes Comprehensive AI Regulation Framework",
    description: "New regulations set global standards for AI development, focusing on safety, transparency, and ethical considerations.",
    category: "Politics",
    source: "Reuters",
    time: "10 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    url: "#"
  },
  {
    id: 6,
    title: "Google DeepMind Achieves Breakthrough in Quantum AI",
    description: "Researchers demonstrate quantum advantage in machine learning tasks, potentially unlocking new computational capabilities.",
    category: "Tech",
    source: "MIT Technology Review",
    time: "12 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    url: "#"
  }
];

export function NewsFeed() {
  const router = useRouter();

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 md:mb-10 gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            Latest Updates
          </h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text-tertiary)]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Feed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {mockArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-lg sm:rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div
                className="relative h-40 sm:h-48 overflow-hidden cursor-pointer"
                onClick={() => router.push(`/article/${article.id}`)}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span
                    className="px-2 sm:px-3 py-1 bg-[var(--color-accent-primary)] text-white text-xs font-semibold rounded-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/category/${encodeURIComponent(article.category)}`);
                    }}
                  >
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
                    <span className="font-medium">{article.source}</span>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{article.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/article/${article.id}`)}
                    className="flex-1 px-3 py-2 text-[var(--color-accent-primary)] hover:text-[#1e40af] font-semibold text-xs sm:text-sm border border-[var(--color-accent-primary)] rounded-full hover:bg-blue-50 transition-all"
                  >
                    Read More
                  </button>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)]" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-[var(--color-secondary)] text-[var(--color-text-primary)] font-semibold rounded-full hover:bg-[var(--color-hover-state)] transition-all text-sm sm:text-base">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
}