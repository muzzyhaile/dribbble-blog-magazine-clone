"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-16 bg-[var(--color-secondary)]">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="bg-white rounded-xl p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="w-16 h-16 bg-[var(--color-accent-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Never Miss a Story
          </h2>
          
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get the best articles delivered straight to your inbox every week.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-[var(--color-accent-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(234,76,137,0.3)]"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-[var(--color-text-tertiary)] mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}