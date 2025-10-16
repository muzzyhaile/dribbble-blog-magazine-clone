"use client";

import { useState } from "react";

const categories = [
  { id: "all", name: "All News" },
  { id: "tech", name: "Tech" },
  { id: "ai-ml", name: "AI & ML" },
  { id: "business", name: "Business" },
  { id: "world", name: "World News" },
  { id: "science", name: "Science" },
  { id: "politics", name: "Politics" },
  { id: "entertainment", name: "Entertainment" }
];

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section className="bg-white border-b border-[var(--color-border)] sticky top-20 z-40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-[var(--color-accent-primary)] text-white"
                  : "bg-[var(--color-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-hover-state)]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}