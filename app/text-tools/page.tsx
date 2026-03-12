import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Free Text Tools",
  description:
    "Free online text tools. Count words, convert cases, generate passwords, test regex, encode/decode, and more.",
  openGraph: {
    title: "Free Text Tools",
    description:
      "Free online text tools. Count words, convert cases, generate passwords, test regex, encode/decode, and more.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools",
  },
};

const textTools = [
  {
    name: "Word Counter",
    description: "Real-time word, character, sentence, and paragraph count with reading time and keyword density.",
    href: "/text-tools/word-counter",
  },
  {
    name: "Character Counter",
    description: "Count characters with platform limits for Twitter, SMS, meta descriptions, and more.",
    href: "/text-tools/character-counter",
  },
  {
    name: "Case Converter",
    description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
    href: "/text-tools/case-converter",
  },
  {
    name: "Remove Duplicate Lines",
    description: "Remove duplicate lines from lists with case-sensitive and sorting options.",
    href: "/text-tools/remove-duplicate-lines",
  },
  {
    name: "Text to Slug Converter",
    description: "Generate clean, SEO-friendly URL slugs from headlines and titles.",
    href: "/text-tools/text-to-slug-converter",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text by words, sentences, or paragraphs with HTML output option.",
    href: "/text-tools/lorem-ipsum-generator",
  },
  {
    name: "Text Reverser",
    description: "Reverse text by characters, words, or create mirror text with upside-down Unicode.",
    href: "/text-tools/text-reverser",
  },
  {
    name: "Word Frequency Counter",
    description: "Analyze text and show word frequency table with CSV export option.",
    href: "/text-tools/word-frequency-counter",
  },
  {
    name: "Find and Replace Text",
    description: "Find and replace text with regex support, case-sensitive, and whole word matching.",
    href: "/text-tools/find-and-replace-text",
  },
  {
    name: "Text to Binary Converter",
    description: "Convert text to binary and back with ASCII, hex, and decimal breakdowns.",
    href: "/text-tools/text-to-binary-converter",
  },
  {
    name: "Text Size Calculator",
    description: "Calculate text size in bytes, KB, MB with UTF-8 and ASCII encoding breakdown.",
    href: "/text-tools/text-size-calculator",
  },
  {
    name: "Duplicate Word Remover",
    description: "Remove duplicate words from text or keyword lists with case sensitivity options.",
    href: "/text-tools/duplicate-word-remover",
  },
  {
    name: "Text Line Sorter",
    description: "Sort lines alphabetically, by length, numerically, or randomly with options.",
    href: "/text-tools/text-line-sorter",
  },
  {
    name: "Whitespace Remover",
    description: "Remove extra spaces, tabs, blank lines, and clean up messy pasted text.",
    href: "/text-tools/whitespace-remover",
  },
  {
    name: "Sentence Counter",
    description: "Count sentences, paragraphs, and clauses with punctuation-aware parsing.",
    href: "/text-tools/sentence-counter",
  },
  {
    name: "Text to Hashtags Generator",
    description: "Extract relevant hashtags from text for Instagram, Twitter, LinkedIn, and TikTok.",
    href: "/text-tools/text-to-hashtags-generator",
  },
  {
    name: "Text Repeater",
    description: "Repeat text multiple times with custom separators like newline, comma, or space.",
    href: "/text-tools/text-repeater",
  },
  {
    name: "String Length Calculator",
    description: "Measure string length in characters, bytes, and Unicode code points with per-line breakdown.",
    href: "/text-tools/string-length-calculator",
  },
  {
    name: "Text to List Converter",
    description: "Convert text to comma-separated list, bullet list, numbered list, or JSON array.",
    href: "/text-tools/text-to-list-converter",
  },
  {
    name: "Random Text Shuffler",
    description: "Randomize lines, sentences, words, or characters with optional seeded shuffle.",
    href: "/text-tools/random-text-shuffler",
  },
];

export default function TextToolsPage() {
  const faqsData = [
    {
      question: "Are these text tools really free?",
      answer:
        "Yes! All text tools are completely free to use. No registration, no paywalls, no limits.",
    },
    {
      question: "Is my text data private and secure?",
      answer:
        "Absolutely. All text processing happens directly in your browser. Your text never leaves your device or gets stored on our servers.",
    },
    {
      question: "Do I need to install anything?",
      answer:
        "No installation needed. All tools run in your web browser on any device — desktop, tablet, or mobile.",
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

      <div className="min-h-screen max-w-6xl mx-auto px-2 md:px-4">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Text Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online text tools for developers, writers, and content creators.
              Count words, convert cases, generate passwords, test regex, encode/decode, and more.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={textTools} />
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
