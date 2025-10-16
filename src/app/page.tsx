"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CategoryTabs } from "@/components/category-tabs";
import { NewsFeed } from "@/components/news-feed";
import { TrendingSection } from "@/components/trending-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      <Header />
      
      <main className="pt-20">
        <HeroSection />
        <CategoryTabs onCategoryChange={setSelectedCategory} />
        <NewsFeed selectedCategory={selectedCategory} />
        <TrendingSection />
      </main>

      <Footer />
    </>
  );
}