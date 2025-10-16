"use client";

import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  color: string;
}

export function CategoryCard({ name, count, color }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1">
      <div className={`h-32 bg-gradient-to-br ${color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-3">
          {count} articles
        </p>
        <div className="flex items-center gap-2 text-[var(--color-accent-primary)] text-sm font-medium group-hover:gap-3 transition-all">
          Explore
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}