import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CategoryTabs } from "@/components/category-tabs";
import { NewsFeed } from "@/components/news-feed";
import { TrendingSection } from "@/components/trending-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        <HeroSection />
        <CategoryTabs />
        <NewsFeed />
        <TrendingSection />
      </main>

      <Footer />
    </>
  );
}