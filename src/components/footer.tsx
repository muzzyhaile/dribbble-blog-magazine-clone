import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--color-footer-background)] text-[var(--color-footer-text)] py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Magazine</h3>
            <p className="text-xs sm:text-sm text-[var(--color-footer-link)] leading-relaxed mb-4">
              A modern platform for writers and readers to share stories that inspire, educate, and entertain.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Design</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Business</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Lifestyle</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Travel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Write for Us</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Advertise</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">Podcast</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-[var(--color-footer-link)] hover:text-white transition-colors">RSS Feed</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-[var(--color-footer-link)]">
              © 2024 Magazine. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}