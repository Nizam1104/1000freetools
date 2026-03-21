import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

const asciiTools = [
  {
    name: "ASCII Art Generator",
    description: "Convert text or images into ASCII art representations",
    href: "/ascii-tools/ascii-art-generator",
  },
  {
    name: "ASCII Code Table",
    description: "Reference table showing all ASCII characters and their codes",
    href: "/ascii-tools/ascii-code-table",
  },
  {
    name: "ASCII to Braille Converter",
    description: "Translate ASCII text into Braille pattern characters",
    href: "/ascii-tools/ascii-to-braille-converter",
  },
  {
    name: "ASCII to Decimal Converter",
    description: "Convert ASCII characters to their decimal code values",
    href: "/ascii-tools/ascii-to-decimal-converter",
  },
  {
    name: "ASCII to Hex Converter",
    description: "Convert ASCII text to hexadecimal representation",
    href: "/ascii-tools/ascii-to-hex-converter",
  },
  {
    name: "ASCII to Octal Converter",
    description: "Convert ASCII characters to octal code values",
    href: "/ascii-tools/ascii-to-octal-converter",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 back to text",
    href: "/ascii-tools/base64-encoder-decoder",
  },
  {
    name: "Binary to Text Converter",
    description: "Convert binary strings to readable ASCII text",
    href: "/ascii-tools/binary-to-text-converter",
  },
  {
    name: "Character Counter",
    description: "Count characters, words, lines, and bytes in text",
    href: "/ascii-tools/character-counter",
  },
  {
    name: "Leet Speak Converter",
    description: "Transform text into leet speak (1337) format",
    href: "/ascii-tools/leet-speak-converter",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder Lorem Ipsum text in various lengths",
    href: "/ascii-tools/lorem-ipsum-generator",
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions against sample text",
    href: "/ascii-tools/regex-tester",
  },
  {
    name: "Text Differ",
    description: "Compare two text files and highlight differences",
    href: "/ascii-tools/text-differ",
  },
  {
    name: "Text to Binary Converter",
    description: "Convert text to binary representation",
    href: "/ascii-tools/text-to-binary-converter",
  },
  {
    name: "Upside Down Text Generator",
    description: "Flip text upside down using Unicode characters",
    href: "/ascii-tools/upside-down-text-generator",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode text for URLs or decode URL-encoded strings",
    href: "/ascii-tools/url-encoder-decoder",
  },
  {
    name: "UTF-8 to UTF-16 Converter",
    description: "Convert UTF-8 encoded text to UTF-16 format",
    href: "/ascii-tools/utf8-to-utf16-converter",
  },
  {
    name: "UTF-8 Validator",
    description: "Check if text is valid UTF-8 encoded data",
    href: "/ascii-tools/utf8-validator",
  },
];

export const metadata: Metadata = {
  title: "Free ASCII Tools Online - 18 Text Encoding & Conversion Tools",
  description:
    "Free online ASCII tools for text conversion, encoding, and analysis. Convert between ASCII, binary, hex, decimal, Base64, and more. All tools run in your browser.",
  openGraph: {
    title: "Free ASCII Tools Online - 18 Text Encoding & Conversion Tools",
    description:
      "Free online ASCII tools for text conversion, encoding, and analysis. Convert between ASCII, binary, hex, decimal, Base64, and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/ascii-tools",
  },
};

export default function AsciiToolsPage() {
  const faqsData = [
    {
      question: "Are these ASCII tools really free?",
      answer:
        "Yes. All 18 ASCII tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my text data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your text never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What character encodings are supported?",
      answer:
        "Tools support ASCII, UTF-8, UTF-16, and various binary representations. Most tools handle the full range of printable ASCII characters (codes 32-126).",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Do these tools work with non-English text?",
      answer:
        "Yes. UTF-8 converter and validator handle international characters including accented letters, emojis, and non-Latin scripts like Chinese, Arabic, and Devanagari.",
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
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free ASCII Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online ASCII tools for text conversion, encoding, and analysis.
              Convert between ASCII, binary, hex, Base64, and more — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={asciiTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Text Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our text tools for more text manipulation utilities, or explore all available tools.
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
              What These ASCII Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 18 free ASCII tools that run entirely in your browser. No uploads, no server processing, no waiting. You paste text, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting between ASCII and other representations (binary, hex, decimal, octal, Base64), encoding and decoding text (URL encoding, UTF-8 to UTF-16), analyzing text (character counting, regex testing, text comparison), and generating text (ASCII art, Lorem Ipsum, leet speak, upside-down text).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your text into the input box</li>
              <li>Adjust settings if needed (encoding format, output style)</li>
              <li>Click Convert, Encode, or Generate</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your text stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> encode URLs, convert text to binary for data transmission, test regex patterns, or generate Base64-encoded images for embedding in HTML.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Security researchers</strong> analyze character encodings, validate UTF-8 data for injection vulnerabilities, or convert between hex and ASCII for reverse engineering.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Students</strong> learn about character encodings, practice binary conversion, or generate Lorem Ipsum text for design mockups.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Writers and designers</strong> create ASCII art for documentation, generate placeholder text, or produce upside-down text for social media posts.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Character Encoding Conversion</h3>
            <p className="text-muted-foreground mb-4">
              ASCII to Decimal, ASCII to Hex, and ASCII to Octal converters show the numeric code values behind each character. Text to Binary and Binary to Text converters handle 8-bit binary representations. UTF-8 to UTF-16 Converter transforms between Unicode encoding formats.
            </p>

            <h3 className="text-xl font-semibold mb-3">Encoding and Decoding</h3>
            <p className="text-muted-foreground mb-4">
              Base64 Encoder/Decoder converts text to and from Base64 format — useful for embedding binary data in text protocols. URL Encoder/Decoder handles percent-encoding for safe transmission in URLs.
            </p>

            <h3 className="text-xl font-semibold mb-3">Text Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Character Counter tallies characters, words, lines, and bytes. Regex Tester validates regular expressions against sample text with match highlighting. Text Differ compares two texts and shows additions, deletions, and changes. UTF-8 Validator checks if text is properly encoded.
            </p>

            <h3 className="text-xl font-semibold mb-3">Text Generation</h3>
            <p className="text-muted-foreground mb-4">
              ASCII Art Generator transforms text or images into ASCII character art. Lorem Ipsum Generator produces placeholder text in various lengths. Leet Speak Converter translates text into 1337 format. Upside Down Text Generator flips text using Unicode combining characters.
            </p>

            <h3 className="text-xl font-semibold mb-3">Reference Tools</h3>
            <p className="text-muted-foreground mb-4">
              ASCII Code Table displays all 128 ASCII characters with their decimal, hex, and binary codes. ASCII to Braille Converter maps ASCII characters to Braille patterns for accessibility testing.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>ASCII range:</strong> Standard ASCII covers codes 0-127. Extended ASCII (128-255) varies by code page and isn't universally supported.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>UTF-8 vs UTF-16:</strong> UTF-8 uses 1-4 bytes per character; UTF-16 uses 2 or 4 bytes. Conversion may change byte order marks (BOM).
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Base64 expansion:</strong> Base64 encoding increases data size by about 33%. Not suitable for compression — only for safe text transmission.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Regex limitations:</strong> The regex tester uses JavaScript regex syntax, which differs slightly from PCRE, Python, or other engines.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Character encoding still trips people up daily. You're debugging an API and see %20 instead of spaces. You need to embed an image in CSS but don't know how to Base64 encode it. You're learning binary and want to verify your conversions. These tools solve those specific moments without requiring software installation or exposing your data to third-party servers.
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
