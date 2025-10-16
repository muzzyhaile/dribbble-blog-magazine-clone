import { Metadata } from "next";
import CategoryClient from "./category-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/category/${name}`;

  const categoryDescriptions: Record<string, string> = {
    "AI & ML": "Explore latest articles about Artificial Intelligence and Machine Learning innovations, breakthroughs, and industry news.",
    Tech: "Stay updated with the latest technology news, gadgets, innovations, and tech industry developments.",
    Business: "Read in-depth business news, market analysis, and corporate developments from leading sources.",
    "World News": "Get comprehensive coverage of global news and international events from around the world.",
    Science: "Discover the latest scientific breakthroughs, research findings, and innovations.",
    Politics: "Follow political news, policy developments, and political analysis.",
    Entertainment:
      "Stay informed about entertainment news, celebrity updates, and media industry developments.",
  };

  const description =
    categoryDescriptions[categoryName] ||
    `Browse all ${categoryName} articles on AI Agents Daily`;

  return {
    title: `${categoryName} News & Articles | AI Agents Daily`,
    description: description,
    keywords: [
      categoryName,
      "news",
      "articles",
      "technology",
      "AI",
      "latest",
      "updates",
    ],
    openGraph: {
      title: `${categoryName} - AI Agents Daily`,
      description: description,
      url: url,
      type: "website",
      siteName: "AI Agents Daily",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} News`,
      description: description,
      creator: "@aiagentsdaily",
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
      },
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // Note: params is async in Next.js 15, but for client components we access it synchronously
  // The actual category name will be passed as a prop or extracted in the client component wrapper
  // For now, we'll create a wrapper that handles the async params
  return <CategoryPageWrapper params={params} />;
}

async function CategoryPageWrapper({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Articles`,
    description: `Collection of ${categoryName} articles from AI Agents Daily`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/category/${name}`,
    publisher: {
      "@type": "Organization",
      name: "AI Agents Daily",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryClient categoryName={categoryName} />
    </>
  );
}


