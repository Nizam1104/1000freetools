import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const developerTools = [
  {
    name: "Mock Data Generator",
    description:
      "Generate realistic test data for your applications to speed up development and testing.",
    href: "/developer-tools/mock-data-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Developer Tools | Online Developer Utilities",
  description:
    "Free online developer tools for web engineers and programmers. Generate mock data and more directly in your browser.",
  openGraph: {
    title: "Free Developer Tools | Online Developer Utilities",
    description:
      "Free online developer tools for web engineers and programmers. Generate mock data and more directly in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/developer-tools",
  },
};

export default function DeveloperToolsPage() {
  const faqsData = [
    {
      question: "What developer tools are available?",
      answer:
        "Currently we offer a mock data generator, with more developer tools coming soon...",
    },
    {
      question: "Are all these tools free?",
      answer:
        "Yes! all current and upcoming tools are free to use. No hidden charges, no premium plans, no limits.",
    },
    {
      question: "Do I need to install any software?",
      answer:
        "No installation required. All tools work directly in your web browser on any device.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. All processing happens in your browser for maximum privacy. Your data never leaves your device.",
    },
  ];

  // JSON-LD Schema
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Developer Tools | 1000 Free Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Professional online developer tools that help you build
              applications faster and easier. No software installation required.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={developerTools} />
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Simple Developer Tools for Everyone
            </h2>
            <p className="text-muted-foreground mb-6">
              Our developer tools are built for software engineers, web
              developers, and anyone who needs to streamline their workflow
              without complex setups. Everything runs in your browser, making it
              fast, private, and accessible from any device.
            </p>

            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <p className="text-muted-foreground mb-6">
              Choose a tool from the list above, input your requirements using
              the available options, and get your results instantly. It's that
              simple. No sign-up required, no API keys, completely free.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li>Works directly in your browser - no installation needed</li>
              <li>Completely free for personal and commercial use</li>
              <li>Privacy-focused - your data never leaves your device</li>
              <li>Professional quality utilities for all your projects</li>
              <li>Easy to use interface designed for maximum productivity</li>
            </ul>
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
