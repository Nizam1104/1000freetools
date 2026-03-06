import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { FileSpreadsheet, ArrowRight } from "lucide-react";

const csvTools = [
  {
    name: "CSV Viewer",
    description: "View and analyze CSV files online with sorting and filtering",
    href: "/csv-tools/csv-viewer",
  },
];

export const metadata: Metadata = {
  title: "Free CSV Tools",
  description:
    "Free online CSV tools. View, analyze, and convert CSV files with ease.",
  openGraph: {
    title: "Free CSV Tools",
    description:
      "Free online CSV tools. View, analyze, and convert CSV files with ease.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools",
  },
};

export default function CsvToolsPage() {
  const faqsData = [
    {
      question: "Are these CSV tools really free?",
      answer:
        "Yes! All CSV tools are completely free to use. No registration, no paywalls, no limits.",
    },
    {
      question: "Is my CSV data private and secure?",
      answer:
        "Absolutely. All CSV processing happens directly in your browser. Your files never leave your device or get stored on our servers.",
    },
    {
      question: "What CSV formats are supported?",
      answer:
        "We support standard CSV files with various delimiters including comma, semicolon, tab, and pipe-separated values.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once loaded in your browser, most tools function without an active internet connection since all processing is done locally.",
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
              <FileSpreadsheet className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free CSV Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online CSV tools for viewing, analyzing, and converting CSV files.
              All processing happens in your browser — fast, private, and secure.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={csvTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Data Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our JSON tools for working with JSON data, or explore all available tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/json-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                JSON Tools
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

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools provides free online CSV and data tools for developers,
              analysts, and business professionals. All processing happens directly
              in your browser, so your data stays private and never touches our servers.
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
