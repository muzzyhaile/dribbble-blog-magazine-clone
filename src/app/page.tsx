import { Metadata } from "next";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CategoryTabs } from "@/components/category-tabs";
import { NewsFeed } from "@/components/news-feed";
import { TrendingSection } from "@/components/trending-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AI & Tech News Daily | Latest Updates on AI, ML & Technology",
  description:
    "Stay updated with the latest news on Artificial Intelligence, Machine Learning, and technology. Real-time news aggregation from trusted sources. Your daily dose of AI innovation and tech breakthroughs.",
  keywords: [
    "AI news",
    "artificial intelligence",
    "machine learning",
    "technology news",
    "tech updates",
    "daily news",
    "AI breakthroughs",
    "tech industry",
    "innovation",
    "trending",
  ],
  authors: [{ name: "AI Agents Daily" }],
  creator: "AI Agents Daily",
  publisher: "AI Agents Daily",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "AI & Tech News Daily",
    description:
      "Real-time news aggregation on Artificial Intelligence, Machine Learning, and technology from trusted sources.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
    siteName: "AI Agents Daily",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Agents Daily - Your Source for AI & Tech News",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Tech News Daily",
    description:
      "Stay updated with the latest AI, machine learning, and technology news from trusted sources.",
    creator: "@aiagentsdaily",
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.png`,
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "AI Agents Daily",
    description:
      "Real-time news aggregation on Artificial Intelligence, Machine Learning, and technology",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.svg`,
    sameAs: [
      "https://twitter.com/aiagentsdaily",
      "https://linkedin.com/company/aiagentsdaily",
    ],
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
    },
    mainEntity: {
      "@type": "WebSite",
      name: "AI Agents Daily",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}?q={search_term_string}`,
        },
        query_input: "required name=search_term_string",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="pt-16 sm:pt-20">
        <HeroSection />
        <CategoryTabs />
        <NewsFeed />
        <TrendingSection />
      </main>

      <Footer />
    </>
  );
}