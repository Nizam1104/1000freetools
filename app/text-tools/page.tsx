import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const textTools = [
  {
    name: "Word Counter",
    description: "Count words in text instantly with live updating as you type",
    href: "/text-tools/word-counter",
  },
  {
    name: "Character Counter",
    description: "Count characters in text with options to include or exclude spaces",
    href: "/text-tools/character-counter",
  },
  {
    name: "Reading Time Calculator",
    description: "Estimate how long it takes to read any text",
    href: "/text-tools/reading-time-calculator",
  },
  {
    name: "Writing Time Calculator",
    description: "Estimate time to write content based on word count and typing speed",
    href: "/text-tools/writing-time-calculator",
  },
  {
    name: "Keyword Density Calculator",
    description: "Analyze keyword frequency and density in text for SEO",
    href: "/text-tools/keyword-density-calculator",
  },
  {
    name: "Case Converter",
    description: "Convert text between uppercase, lowercase, title case, camelCase, and more",
    href: "/text-tools/case-converter",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder Lorem Ipsum text for design mockups",
    href: "/text-tools/lorem-ipsum-generator",
  },
  {
    name: "Diff Checker",
    description: "Compare two texts and highlight differences line by line",
    href: "/text-tools/diff-checker",
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions against text with real-time highlighting",
    href: "/text-tools/regex-tester",
  },
  {
    name: "Text to ASCII Converter",
    description: "Convert text to ASCII codes and ASCII back to text",
    href: "/text-tools/ascii-text-converter",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings",
    href: "/text-tools/base64-encode-decode",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode special characters in URLs or decode encoded URLs",
    href: "/text-tools/url-encode-decode",
  },
  {
    name: "HTML Encoder/Decoder",
    description: "Convert HTML special characters to entities and back",
    href: "/text-tools/html-encode-decode",
  },
  {
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens to view header, payload, and signature",
    href: "/text-tools/jwt-decoder",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text",
    href: "/text-tools/hash-generator",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs/GUIDs in v1, v4, and other formats",
    href: "/text-tools/uuid-generator",
  },
  {
    name: "Random Password Generator",
    description: "Generate strong, secure random passwords with customizable options",
    href: "/text-tools/random-password-generator",
  },
  {
    name: "Random String Generator",
    description: "Generate random alphanumeric strings for testing and development",
    href: "/text-tools/random-string-generator",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes from URLs, text, contact info, and more",
    href: "/text-tools/qr-code-generator",
  },
  {
    name: "SQL Formatter",
    description: "Format and beautify SQL queries for improved readability",
    href: "/text-tools/sql-formatter",
  },
  {
    name: "JSON Formatter",
    description: "Format, beautify, and minify JSON data with syntax validation",
    href: "/text-tools/json-formatter",
  },
  {
    name: "Escape Character Converter",
    description: "Convert escape sequences like \\n, \\t to literal characters and back",
    href: "/text-tools/escape-character-converter",
  },
  {
    name: "Token Count Calculator",
    description: "Estimate token count for LLM APIs like OpenAI and Anthropic",
    href: "/text-tools/token-count-calculator",
  },
];

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

      <div className="min-h-screen max-w-6xl mx-auto">
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

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools provides a comprehensive collection of free online text tools
              for developers, writers, students, and professionals. All processing happens
              directly in your browser, so your text stays private and never touches our servers.
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
