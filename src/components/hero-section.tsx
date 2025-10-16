"use client";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#f8f8f8] to-white py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--color-accent-primary)] text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
          🚀 Live News Feed
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6 leading-tight">
          Your Daily Dose of
          <span className="text-[var(--color-accent-primary)] block"> AI & Tech News</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-text-secondary)] mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Real-time news aggregation from trusted sources. Stay updated with the latest in artificial intelligence, machine learning, and technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <div className="relative w-full sm:w-96 px-2 sm:px-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-[var(--color-border)] focus:border-[var(--color-accent-primary)] focus:outline-none text-sm sm:text-base"
            />
          </div>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#1e40af] transition-all whitespace-nowrap text-sm sm:text-base w-full sm:w-auto">
            Get Daily Updates
          </button>
        </div>
        
        <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mt-4 sm:mt-6 px-2">
          Join 10,000+ readers who get curated news delivered daily
        </p>
      </div>
    </section>
  );
}