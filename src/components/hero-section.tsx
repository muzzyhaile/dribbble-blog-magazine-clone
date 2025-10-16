"use client";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#f8f8f8] to-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-block px-4 py-2 bg-[var(--color-accent-primary)] text-white text-sm font-semibold rounded-full mb-6">
          🚀 Live News Feed
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
          Your Daily Dose of
          <span className="text-[var(--color-accent-primary)]"> AI & Tech News</span>
        </h1>
        
        <p className="text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
          Real-time news aggregation from trusted sources. Stay updated with the latest in artificial intelligence, machine learning, and technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="relative w-full sm:w-96">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-4 rounded-full border-2 border-[var(--color-border)] focus:border-[var(--color-accent-primary)] focus:outline-none text-base"
            />
          </div>
          <button className="px-8 py-4 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#D43D7A] transition-all whitespace-nowrap">
            Get Daily Updates
          </button>
        </div>
        
        <p className="text-sm text-[var(--color-text-tertiary)] mt-4">
          Join 10,000+ readers who get curated news delivered daily
        </p>
      </div>
    </section>
  );
}