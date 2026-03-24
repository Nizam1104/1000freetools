import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Type, ArrowRight } from "lucide-react";

const stringTools = [
  {
    name: "String Reverse",
    description: "Reverse any string or text",
    href: "/string-tools/string-reverse",
  },
  {
    name: "Text Case Converter",
    description: "Convert text between uppercase, lowercase, title case",
    href: "/string-tools/text-case-converter",
  },
  {
    name: "Text Compare/Diff Checker",
    description: "Compare two texts and highlight differences",
    href: "/string-tools/text-compare-diff-checker",
  },
  {
    name: "Word Counter/Character Counter",
    description: "Count words, characters, lines, and bytes in text",
    href: "/string-tools/word-counter-character-counter",
  },
];

export const metadata: Metadata = {
  title: "Free String Tools Online - 4 Text Manipulation Tools",
  description:
    "Free online string tools for text manipulation. Reverse text, convert case, count words, Base64 encode/decode. All tools run in your browser.",
  openGraph: {
    title: "Free String Tools Online - 5 Text Manipulation Tools",
    description:
      "Free online string tools for text manipulation. Reverse text, convert case, count words, Base64 encode/decode. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/string-tools",
  },
};

export default function StringToolsPage() {
  const faqsData = [
    {
      question: "Are these string tools really free?",
      answer:
        "Yes. All 5 string tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my text data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your text never leaves your device or gets uploaded to any server.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "What text encodings are supported?",
      answer:
        "Tools support UTF-8 encoding, handling international characters including accented letters, emojis, and non-Latin scripts.",
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
              <Type className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free String Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online string tools for text manipulation.
              Reverse text, convert case, count words — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={stringTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Text Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our text tools or ASCII tools for more text utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/text-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Text Tools
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
              What These String Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 4 free string tools that run entirely in your browser. No software installation, no server uploads, no waiting. You paste text, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              These tools handle common text manipulation tasks: transforming text (reverse, case conversion), encoding/decoding (Base64), comparing texts (diff checker), and analyzing text (word and character counting).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your text into the input box</li>
              <li>Select the operation or transformation type</li>
              <li>Click the action button</li>
              <li>Copy the result</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your text stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> reverse strings for debugging, convert case for code generation, encode data to Base64, or compare text outputs.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Writers and editors</strong> count words for submissions, convert text case for headlines, or compare document versions.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Students</strong> count characters for essays, reverse text for puzzles, or convert case for formatting assignments.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Social media managers</strong> count characters for Twitter posts, convert case for emphasis, or format text for different platforms.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Text Transformation</h3>
            <p className="text-muted-foreground mb-4">
              String Reverse flips text backwards. Text Case Converter changes between UPPERCASE, lowercase, Title Case, and other formats.
            </p>

            <h3 className="text-xl font-semibold mb-3">Text Encoding</h3>
            <p className="text-muted-foreground mb-4">
              Base64 Encode/Decode converts text to Base64 format and back, useful for embedding data in URLs or JSON.
            </p>

            <h3 className="text-xl font-semibold mb-3">Text Comparison</h3>
            <p className="text-muted-foreground mb-4">
              Text Compare/Diff Checker highlights additions, deletions, and changes between two text versions.
            </p>

            <h3 className="text-xl font-semibold mb-3">Text Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Word Counter/Character Counter tallies words, characters (with and without spaces), lines, and bytes.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Base64 expansion:</strong> Base64 encoding increases data size by approximately 33%.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Unicode handling:</strong> Some operations may behave unexpectedly with emojis or combining characters due to Unicode complexity.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Case conversion:</strong> Title case rules vary by language. Tools use standard English conventions.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              String tools are built into most text editors and programming languages. But sometimes you're in a browser without your editor, or you need a quick way to reverse a string without writing code. These tools exist because simple text operations shouldn't require opening an IDE or installing software. Everything runs in your browser — no installation, no setup, no friction.
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
