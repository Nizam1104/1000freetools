"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Wrench } from "lucide-react";

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
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6" />
              <span className="font-bold text-lg">1000 Free Tools</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A great collection of tools for everyday tasks.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://x.com/1000freetools"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Quick Links Section */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Popular Tools Section */}
        <div className="lg:col-span-3">
          <h3 className="font-semibold mb-4 mt-8">Popular Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {footerLinks.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium mb-3 text-foreground">
                  {category.categoryName}
                </h4>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex}>
                      <Link
                        href={tool.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 1000 Free Tools. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
