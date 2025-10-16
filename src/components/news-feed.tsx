"use client";

import { Clock, ExternalLink } from "lucide-react";

interface NewsArticle {
  id: string;
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
    id: "1",
    title: "OpenAI Unveils GPT-5: Revolutionary Breakthrough in Large Language Models",
    description: "The new model shows unprecedented improvements in reasoning, creativity, and multimodal understanding, marking a significant leap forward in AI capabilities.",
    category: "AI & ML",
    source: "TechCrunch",
    time: "2 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    url: "#"
  },
  {
    id: "2",
    title: "Meta's New AI Agent Can Browse the Web and Perform Complex Tasks",
    description: "Meta introduces advanced AI agents capable of autonomous web navigation, marking a new era in artificial intelligence assistance.",
    category: "Tech",
    source: "The Verge",
    time: "4 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    url: "#"
  },
  {
    id: "3",
    title: "AI Startup Raises $500M to Build Next-Generation Neural Networks",
    description: "The funding round values the company at $5 billion, highlighting growing investor confidence in advanced AI infrastructure.",
    category: "Business",
    source: "Bloomberg",
    time: "6 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80",
    url: "#"
  },
  {
    id: "4",
    title: "Scientists Use AI to Discover New Cancer Treatment",
    description: "Machine learning algorithms identify promising drug candidates that could revolutionize cancer therapy approaches.",
    category: "Science",
    source: "Nature",
    time: "8 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    url: "#"
  },
  {
    id: "5",
    title: "EU Passes Comprehensive AI Regulation Framework",
    description: "New regulations set global standards for AI development, focusing on safety, transparency, and ethical considerations.",
    category: "Politics",
    source: "Reuters",
    time: "10 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    url: "#"
  },
  {
    id: "6",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
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
                      <span>{article.time}</span>
                    </div>
                  </div>
                  
                  <ExternalLink className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[var(--color-secondary)] text-[var(--color-text-primary)] font-semibold rounded-full hover:bg-[var(--color-hover-state)] transition-all">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
}