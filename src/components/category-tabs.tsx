"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { id: "all", name: "All News", path: "/" },
  { id: "tech", name: "Tech", path: "/category/Tech" },
  { id: "ai-ml", name: "AI & ML", path: "/category/AI%20%26%20ML" },
  { id: "business", name: "Business", path: "/category/Business" },
  { id: "world", name: "World News", path: "/category/World%20News" },
  { id: "science", name: "Science", path: "/category/Science" },
  { id: "politics", name: "Politics", path: "/category/Politics" },
  { id: "entertainment", name: "Entertainment", path: "/category/Entertainment" }
];

export function CategoryTabs() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (category: typeof categories[0]) => {
    setActiveCategory(category.id);
    router.push(category.path);
  };

  return (
    <section className="bg-white border-b border-[var(--color-border)] sticky top-16 sm:top-20 z-40">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 sm:py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-medium whitespace-nowrap transition-all text-xs sm:text-sm ${
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