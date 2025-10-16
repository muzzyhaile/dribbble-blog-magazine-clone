"use client";

import { Clock } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  imageColor: string;
  featured?: boolean;
}

export function ArticleCard({ 
  title, 
  excerpt, 
  category, 
  readTime, 
  date,
  imageColor,
  featured = false 
}: ArticleCardProps) {
  const cardClasses = featured 
    ? "group cursor-pointer bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1 col-span-full md:col-span-2"
    : "group cursor-pointer bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1";

  const imageHeight = featured ? "h-96" : "h-56";
  const titleSize = featured ? "text-4xl" : "text-2xl";
  const excerptSize = featured ? "text-lg" : "text-base";

  return (
    <article className={cardClasses}>
      <div className={`${imageHeight} bg-gradient-to-br ${imageColor} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      
      <div className={featured ? "p-8" : "p-6"}>
        <span className="inline-block px-3 py-1 bg-[var(--color-secondary)] text-[var(--color-accent-primary)] text-xs font-medium uppercase tracking-wider rounded hover:bg-[var(--color-accent-primary)] hover:text-white transition-colors cursor-pointer">
          {category}
        </span>
        
        <h3 className={`${titleSize} font-semibold text-[var(--color-text-primary)] mt-4 mb-3 leading-tight group-hover:text-[var(--color-accent-primary)] transition-colors`}>
          {title}
        </h3>
        
        <p className={`${excerptSize} text-[var(--color-text-secondary)] mb-4 leading-relaxed`}>
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
          <span>{date}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}