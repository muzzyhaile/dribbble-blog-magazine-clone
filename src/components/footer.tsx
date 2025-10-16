import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--color-footer-background)] text-[var(--color-footer-text)] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Magazine</h3>
            <p className="text-[var(--color-footer-link)] leading-relaxed mb-4">
              A modern platform for writers and readers to share stories that inspire, educate, and entertain.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Design</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Business</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Lifestyle</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Travel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Write for Us</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Advertise</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">Podcast</a></li>
              <li><a href="#" className="text-[var(--color-footer-link)] hover:text-white transition-colors">RSS Feed</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-footer-link)] text-sm">
              © 2024 Magazine. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
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