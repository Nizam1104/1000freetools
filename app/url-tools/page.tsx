import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Link2, ArrowRight } from "lucide-react";

const urlTools = [
  {
    name: "URL Blacklist Checker",
    description: "Check if a URL is blacklisted or flagged as malicious",
    href: "/url-tools/url-blacklist-checker",
  },
  {
    name: "URL Canonicalization Checker",
    description: "Check URL canonical issues and duplicates",
    href: "/url-tools/url-canonicalization-checker",
  },
  {
    name: "URL Case Converter",
    description: "Convert URL case (uppercase to lowercase)",
    href: "/url-tools/url-case-converter",
  },
  {
    name: "URL Decoder",
    description: "Decode URL-encoded strings",
    href: "/url-tools/url-decoder",
  },
  {
    name: "URL Duplicate Finder",
    description: "Find duplicate URLs in a list",
    href: "/url-tools/url-duplicate-finder",
  },
  {
    name: "URL Email Link Extractor",
    description: "Extract mailto: links and email addresses from URLs",
    href: "/url-tools/url-email-link-extractor",
  },
  {
    name: "URL Encoder",
    description: "Encode URLs for safe transmission",
    href: "/url-tools/url-encoder",
  },
  {
    name: "URL Expander",
    description: "Expand shortened URLs to their full destination",
    href: "/url-tools/url-expander",
  },
  {
    name: "URL IP Address Lookup",
    description: "Find IP address for a domain or URL",
    href: "/url-tools/url-ip-address-lookup",
  },
  {
    name: "URL Parser",
    description: "Parse URLs into components (protocol, host, path, query)",
    href: "/url-tools/url-parser",
  },
  {
    name: "URL Ping Tool",
    description: "Check if a URL is accessible and measure response time",
    href: "/url-tools/url-ping-tool",
  },
  {
    name: "URL QR Code Generator",
    description: "Generate QR codes from URLs",
    href: "/url-tools/url-qr-code-generator",
  },
  {
    name: "URL Query String Extractor",
    description: "Extract and parse query parameters from URLs",
    href: "/url-tools/url-query-string-extractor",
  },
  {
    name: "URL Redirect Checker",
    description: "Check URL redirects and follow redirect chains",
    href: "/url-tools/url-redirect-checker",
  },
  {
    name: "URL Screenshot Generator",
    description: "Generate screenshots of web pages from URLs",
    href: "/url-tools/url-screenshot-generator",
  },
  {
    name: "URL Shortener",
    description: "Shorten long URLs to compact links",
    href: "/url-tools/url-shortener",
  },
  {
    name: "URL Slug Generator",
    description: "Create SEO-friendly URL slugs from text",
    href: "/url-tools/url-slug-generator",
  },
  {
    name: "URL Social Media Preview",
    description: "Preview how URLs appear on social media platforms",
    href: "/url-tools/url-social-media-preview",
  },
  {
    name: "URL Source Code Viewer",
    description: "View HTML source code of web pages",
    href: "/url-tools/url-source-code-viewer",
  },
  {
    name: "URL UTM Builder",
    description: "Build UTM tracking parameters for URLs",
    href: "/url-tools/url-utm-builder",
  },
  {
    name: "URL Wayback Machine Checker",
    description: "Check archived versions of URLs in Wayback Machine",
    href: "/url-tools/url-wayback-machine-checker",
  },
];

export const metadata: Metadata = {
  title: "Free URL Tools Online - 21 URL Parser & Generator Tools",
  description:
    "Free online URL tools for parsing, encoding, decoding, and analyzing URLs. URL shortener, redirect checker, UTM builder, query string extractor. All tools run in your browser.",
  openGraph: {
    title: "Free URL Tools Online - 21 URL Parser & Generator Tools",
    description:
      "Free online URL tools for parsing, encoding, decoding, and analyzing URLs. URL shortener, redirect checker, UTM builder, query string extractor. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/url-tools",
  },
};

export default function UrlToolsPage() {
  const faqsData = [
    {
      question: "Are these URL tools really free?",
      answer:
        "Yes. All 21 URL tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my URL data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your URLs never leave your device or get uploaded to any server. Note: Some tools like URL Expander or Redirect Checker need to make requests to resolve URLs.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Basic tools like encoder, decoder, parser work offline. Tools that check redirects, ping URLs, or expand short links require internet connectivity.",
    },
    {
      question: "What URL encoding standard is used?",
      answer:
        "Tools use RFC 3986 percent-encoding standard, which encodes special characters as %XX hex values.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Link2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free URL Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online URL tools for parsing, encoding, decoding, and analyzing URLs.
              URL shortener, redirect checker, UTM builder — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={urlTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Web Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our encoding tools or SEO tools for more web utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/encoding-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Encoding Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These URL Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 21 free URL tools that run entirely in your browser. No software installation, no server uploads for most tools. You paste URLs, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: encoding and decoding URLs (percent encoding, query string handling), parsing and analyzing URLs (extracting components, checking redirects, finding duplicates), generating URLs (shorteners, UTM builders, slug generators), and checking URL safety (blacklist checker, IP lookup, Wayback Machine).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your URL or URL list</li>
              <li>Select the operation or analysis type</li>
              <li>Adjust settings if needed</li>
              <li>View results and copy or download</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Most processing happens client-side using JavaScript. Your URLs stay in your browser tab. Note: Tools like redirect checker or URL expander need to make network requests.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Marketers</strong> build UTM tracking URLs, check social media previews, shorten links for campaigns, or analyze redirect chains.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> parse URLs into components, encode/decode URL parameters, extract query strings, or debug canonical issues.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>SEO specialists</strong> check URL canonicalization, find duplicate URLs, analyze redirects, or verify URL structure for optimization.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Security researchers</strong> check URLs against blacklists, expand shortened URLs to see destinations, or look up IP addresses for domains.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">URL Encoding/Decoding</h3>
            <p className="text-muted-foreground mb-4">
              URL Encoder applies percent-encoding for safe transmission. URL Decoder reverses encoding. URL Case Converter normalizes case.
            </p>

            <h3 className="text-xl font-semibold mb-3">URL Parsing</h3>
            <p className="text-muted-foreground mb-4">
              URL Parser breaks URLs into protocol, host, path, query, and fragment. URL Query String Extractor parses parameters. URL Email Link Extractor finds mailto: links.
            </p>

            <h3 className="text-xl font-semibold mb-3">URL Generation</h3>
            <p className="text-muted-foreground mb-4">
              URL Shortener creates compact links. URL Slug Generator makes SEO-friendly slugs. URL UTM Builder adds tracking parameters. URL QR Code Generator creates scannable codes.
            </p>

            <h3 className="text-xl font-semibold mb-3">URL Analysis</h3>
            <p className="text-muted-foreground mb-4">
              URL Redirect Checker follows redirect chains. URL Canonicalization Checker finds duplicate content issues. URL Duplicate Finder identifies repeats in lists. URL IP Address Lookup resolves domains.
            </p>

            <h3 className="text-xl font-semibold mb-3">URL Safety</h3>
            <p className="text-muted-foreground mb-4">
              URL Blacklist Checker checks against malware databases. URL Wayback Machine Checker shows archived versions. URL Ping Tool tests accessibility.
            </p>

            <h3 className="text-xl font-semibold mb-3">URL Preview</h3>
            <p className="text-muted-foreground mb-4">
              URL Social Media Preview shows how links appear on platforms. URL Screenshot Generator captures page images. URL Source Code Viewer displays HTML.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>URL shorteners:</strong> Browser-based shorteners may not persist. For permanent short links, use a dedicated service.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Redirect checking:</strong> Some sites block automated requests. Results may differ from browser behavior.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Social previews:</strong> Previews use Open Graph tags. Actual rendering varies by platform and may change.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>URL encoding:</strong> Different contexts (path, query, fragment) have different encoding rules. Tools use standard encoding but verify for your use case.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              URL tools are scattered across browser extensions, online services, and command-line utilities. But sometimes you need to quickly parse a URL, build a UTM link, or check where a shortened URL leads. These tools exist because working with URLs shouldn't require installing software or trusting sketchy websites. Everything runs in your browser — no installation, no tracking, no barriers.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
