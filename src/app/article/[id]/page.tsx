import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClient from "./article-client";

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

async function getArticle(id: string): Promise<Article | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/articles?id=${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "Article Not Found | AI Agents Daily",
      description: "The article you're looking for doesn't exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/article/${article.id}`;
  const imageUrl = article.imageUrl || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`;

  return {
    title: `${article.title} | AI Agents Daily`,
    description: article.description.substring(0, 160),
    keywords: [
      article.category,
      "AI",
      "technology",
      "news",
      "articles",
      article.source,
      "machine learning",
    ],
    authors: [{ name: article.author || article.source }],
    creator: article.author || article.source,
    publisher: "AI Agents Daily",
    category: article.category,
    openGraph: {
      title: article.title,
      description: article.description,
      url: url,
      type: "article",
      authors: article.author ? [article.author] : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      siteName: "AI Agents Daily",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/jpeg",
        },
      ],
      tags: [article.category, "tech", "ai", "news"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description.substring(0, 160),
      images: [imageUrl],
      creator: "@aiagentsdaily",
      site: "@aiagentsdaily",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/article/${article.id}`;
  const imageUrl = article.imageUrl || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: [imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author || article.source,
    },
    publisher: {
      "@type": "Organization",
      name: "AI Agents Daily",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient article={article} />
    </>
  );
}

