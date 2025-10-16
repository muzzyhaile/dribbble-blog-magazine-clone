"use client";

import { Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-[var(--color-border)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-[var(--color-text-primary)]">
              aiagents.day
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tech" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Tech
            </a>
            <a href="#ai-ml" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              AI & ML
            </a>
            <a href="#business" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Business
            </a>
            <a href="#world" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              World News
            </a>
            <a href="#science" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Science
            </a>
            <a href="#politics" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Politics
            </a>
            <a href="#entertainment" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors font-medium">
              Entertainment
            </a>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center hover:bg-[#D43D7A] transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="px-6 py-2 rounded-full bg-[var(--color-accent-primary)] text-white font-semibold hover:bg-[#D43D7A] transition-all md:block hidden">
              Subscribe
            </button>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}