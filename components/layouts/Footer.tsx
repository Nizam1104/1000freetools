"use client";
import Link from "next/link";
import { Twitter, Wrench, ArrowUpRight } from "lucide-react";
import footerLinks from "@/json-assets/footer-tool-links.json";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors duration-300">

      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="relative container mx-auto px-6 pt-16 pb-8">

        {/* Hero row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span
                className="font-black text-xl tracking-tight text-zinc-900 dark:text-white"
                style={{ fontFamily: "'DM Serif Display', 'Georgia', serif" }}
              >
                1000 Free Tools
              </span>
            </div>
            <p
              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              A carefully curated collection of tools for everyday tasks.
              Free, fast, and always available.
            </p>
            <Link
              href="https://x.com/1000freetools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200 group"
            >
              <Twitter className="h-3.5 w-3.5" />
              <span>Follow us</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          </div>

          {/* Large decorative number */}
          <div
            className="hidden lg:block text-[10rem] font-black leading-none text-zinc-200 dark:text-zinc-900 select-none tracking-tighter"
            style={{ fontFamily: "'DM Serif Display', 'Georgia', serif" }}
            aria-hidden="true"
          >
            1000
          </div>
        </div>

        {/* Nav + Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">

          {/* Quick Links */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-5">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-150"
                  >
                    <span className="block w-3 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-5 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tool categories */}
          {footerLinks.map((category, index) => (
            <div key={index}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-5">
                {category.categoryName}
              </p>
              <ul className="space-y-2.5">
                {category.tools.map((tool, toolIndex) => (
                  <li key={toolIndex}>
                    <Link
                      href={tool.href}
                      className="group flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-150"
                    >
                      <span className="block w-3 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-5 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-all duration-200" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} 1000 Free Tools. All rights reserved.
          </p>
          <p className="text-xs text-zinc-300 dark:text-zinc-700">
            Built with care · Everything Free · No tracking
          </p>
        </div>

      </div>
    </footer>
  );
}
