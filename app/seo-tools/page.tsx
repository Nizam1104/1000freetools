import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { SearchCheck, ArrowRight } from "lucide-react";

const seoTools = [
  {
    name: "Site SEO Auditor",
    description: "Analyze website SEO performance and get actionable recommendations",
    href: "/seo-tools/site-seo-auditor",
  },
];

export const metadata: Metadata = {
  title: "Free SEO Tools Online - Search Engine Optimization Tools",
  description:
    "Free online SEO tools for analyzing and optimizing website search performance. Site SEO auditor and more. All tools run in your browser.",
  openGraph: {
    title: "Free SEO Tools Online - Search Engine Optimization Tools",
    description:
      "Free online SEO tools for analyzing and optimizing website search performance. Site SEO auditor and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/seo-tools",
  },
};

export default function SeoToolsPage() {
  const faqsData = [
    {
      question: "Are these SEO tools really free?",
      answer:
        "Yes. All SEO tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my website data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your website URLs and analysis data never leave your device or get uploaded to any server.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "How accurate are these SEO recommendations?",
      answer:
        "Tools follow Google's published SEO best practices and industry standards. However, SEO is complex — use these as guidance, not absolute rules.",
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
              <SearchCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free SEO Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online SEO tools for analyzing and optimizing website search performance.
              Site audits, recommendations, and more — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={seoTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Marketing Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore all available tools for more utilities.
            </p>
            <Link
              href="/explore-all-tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              Browse All Tools
            </Link>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These SEO Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This collection of free SEO tools runs entirely in your browser. No software installation, no subscriptions, no waiting. You enter a URL, click a button, and get SEO analysis instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              These tools help you analyze website performance, identify SEO issues, and get actionable recommendations for improving search rankings.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your website URL</li>
              <li>Run the analysis or audit</li>
              <li>Review findings and recommendations</li>
              <li>Export report or share with team</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your website data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Small business owners</strong> audit their own websites, identify SEO issues, and prioritize fixes without hiring expensive consultants.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Marketing teams</strong> run quick SEO checks before publishing content, analyze competitor sites, or generate reports for clients.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Bloggers and content creators</strong> optimize posts for search, check meta tags, or verify mobile-friendliness before publishing.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Web developers</strong> validate technical SEO implementation, check page speed factors, or verify structured data markup.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Site Audits</h3>
            <p className="text-muted-foreground mb-4">
              Site SEO Auditor analyzes on-page SEO factors including meta tags, headings, content quality, internal linking, mobile-friendliness, and page speed indicators.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Crawl depth:</strong> Browser-based tools can't crawl entire sites like enterprise SEO platforms. Analysis is limited to single pages.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Rank tracking:</strong> These tools don't track keyword rankings over time. Use dedicated rank tracking tools for that.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Backlink analysis:</strong> Backlink data requires large databases. Browser tools can't provide comprehensive backlink profiles.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Google algorithm:</strong> SEO best practices change. Tools follow current guidelines but may not reflect latest algorithm updates immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              SEO tools often mean expensive monthly subscriptions, complex enterprise platforms, or limited free tiers. But sometimes you just need to check if your meta description is the right length, verify your heading structure, or get a quick SEO health check. These tools exist because basic SEO shouldn't require a $200/month subscription. Everything runs in your browser — no account, no credit card, no upsells.
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
