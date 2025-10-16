"use client";

import { Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-[var(--color-border)]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] truncate">
              aiagents
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-6">
            <a href="#tech" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Tech
            </a>
            <a href="#ai-ml" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              AI & ML
            </a>
            <a href="#business" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Business
            </a>
            <a href="#world" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              World News
            </a>
            <a href="#science" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Science
            </a>
            <a href="#politics" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Politics
            </a>
            <a href="#entertainment" className="text-xs xl:text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Entertainment
            </a>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center hover:bg-[#1e40af] transition-colors flex-shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <button className="hidden sm:block px-4 sm:px-6 py-2 rounded-full bg-[var(--color-accent-primary)] text-white text-xs sm:text-sm font-semibold hover:bg-[#1e40af] transition-all whitespace-nowrap">
              Subscribe
            </button>
            <button className="lg:hidden p-1">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}