import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Hexagon, ArrowRight } from "lucide-react";

const hexTools = [
  {
    name: "Binary to Hex Converter",
    description: "Convert binary numbers to hexadecimal format",
    href: "/hex-tools/binary-to-hex-converter",
  },
  {
    name: "Decimal to Hex Converter",
    description: "Convert decimal numbers to hexadecimal format",
    href: "/hex-tools/decimal-to-hex-converter",
  },
  {
    name: "Hex Addition/Subtraction Calculator",
    description: "Perform arithmetic operations on hexadecimal numbers",
    href: "/hex-tools/hex-addition-subtraction-calculator",
  },
  {
    name: "Hex Diff/Compare Tool",
    description: "Compare two hex values and highlight differences",
    href: "/hex-tools/hex-diff-compare-tool",
  },
  {
    name: "Hex File Checksum Calculator",
    description: "Calculate checksums for hex files and data",
    href: "/hex-tools/hex-file-checksum-calculator",
  },
  {
    name: "Hex Memory Address Calculator",
    description: "Calculate memory addresses in hexadecimal",
    href: "/hex-tools/hex-memory-address-calculator",
  },
  {
    name: "Hex String Validator/Formatter",
    description: "Validate and format hexadecimal strings",
    href: "/hex-tools/hex-string-validator-formatter",
  },
  {
    name: "Hex to ASCII Table Generator",
    description: "Convert hex values to ASCII character table",
    href: "/hex-tools/hex-to-ascii-table-generator",
  },
  {
    name: "Hex to Base64 Encoder/Decoder",
    description: "Convert between hexadecimal and Base64 formats",
    href: "/hex-tools/hex-to-base64-encoder-decoder",
  },
  {
    name: "Hex to Binary Converter",
    description: "Convert hexadecimal to binary representation",
    href: "/hex-tools/hex-to-binary-converter",
  },
  {
    name: "Hex to Decimal Converter",
    description: "Convert hexadecimal numbers to decimal format",
    href: "/hex-tools/hex-to-decimal-converter",
  },
  {
    name: "Hex to Float/Double Converter",
    description: "Convert hex values to floating-point numbers",
    href: "/hex-tools/hex-to-float-double-converter",
  },
  {
    name: "Hex to IPv4/IPv6 Address Converter",
    description: "Convert hex values to IP addresses",
    href: "/hex-tools/hex-to-ipv4-ipv6-address-converter",
  },
  {
    name: "Hex to Octal Converter",
    description: "Convert hexadecimal to octal format",
    href: "/hex-tools/hex-to-octal-converter",
  },
  {
    name: "Hex to RGB Color Converter",
    description: "Convert hex color codes to RGB values",
    href: "/hex-tools/hex-to-rgb-color-converter",
  },
  {
    name: "Hex to Text Converter",
    description: "Convert hexadecimal strings to readable text",
    href: "/hex-tools/hex-to-text-converter",
  },
  {
    name: "Hex to UTF-8 String Decoder",
    description: "Decode hex values as UTF-8 encoded strings",
    href: "/hex-tools/hex-to-utf8-string-decoder",
  },
  {
    name: "Hex XOR Calculator",
    description: "Perform XOR operations on hexadecimal values",
    href: "/hex-tools/hex-xor-calculator",
  },
  {
    name: "Octal to Hex Converter",
    description: "Convert octal numbers to hexadecimal format",
    href: "/hex-tools/octal-to-hex-converter",
  },
  {
    name: "RGB to Hex Color Converter",
    description: "Convert RGB values to hexadecimal color codes",
    href: "/hex-tools/rgb-to-hex-color-converter",
  },
  {
    name: "Text to Hex Converter",
    description: "Convert text strings to hexadecimal representation",
    href: "/hex-tools/text-to-hex-converter",
  },
];

export const metadata: Metadata = {
  title: "Free Hex Tools Online - 21 Hexadecimal Converter & Calculator Tools",
  description:
    "Free online hex tools for hexadecimal conversion, calculation, and analysis. Convert hex to binary, decimal, RGB, text. Perform hex arithmetic. All tools run in your browser.",
  openGraph: {
    title: "Free Hex Tools Online - 21 Hexadecimal Converter & Calculator Tools",
    description:
      "Free online hex tools for hexadecimal conversion, calculation, and analysis. Convert hex to binary, decimal, RGB, text. Perform hex arithmetic. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/hex-tools",
  },
};

export default function HexToolsPage() {
  const faqsData = [
    {
      question: "Are these hex tools really free?",
      answer:
        "Yes. All 21 hex tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What is hexadecimal used for?",
      answer:
        "Hexadecimal (base-16) is used extensively in computing: memory addresses, color codes (#FF5733), MAC addresses, IPv6 addresses, binary data representation, and debugging.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "How do I convert hex to decimal?",
      answer:
        "Use the Hex to Decimal Converter tool. Each hex digit represents a power of 16. For example, 0x1A = 1×16 + 10 = 26 in decimal.",
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
              <Hexagon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Hex Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online hex tools for hexadecimal conversion, calculation, and analysis.
              Convert hex to binary, decimal, RGB, text — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={hexTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Number Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our binary tools, number tools, or color tools for more utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/binary-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Binary Tools
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
              What These Hex Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 21 free hex tools that run entirely in your browser. No software installation, no server uploads, no waiting. You enter hex values or other formats, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting between hexadecimal and other number systems (binary, decimal, octal), converting hex to practical formats (RGB colors, IP addresses, text), performing hex arithmetic and operations (addition, subtraction, XOR), and analyzing hex data (checksums, diffs, memory addresses).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your hex value (with or without 0x prefix)</li>
              <li>Select the conversion or operation type</li>
              <li>Adjust settings like endianness or bit width if needed</li>
              <li>View results and copy or download</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> debug memory addresses, convert color codes, analyze binary data dumps, or calculate hex checksums for data validation.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Security researchers</strong> analyze hex dumps of malware, calculate XOR operations for encryption analysis, or convert between encoding formats.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Web designers</strong> convert between RGB and hex color codes, validate hex color formats, or generate color palettes.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Network engineers</strong> work with MAC addresses in hex, convert IPv6 addresses, or analyze network packet captures.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Base Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Hex to Decimal, Hex to Binary, Hex to Octal converters transform hexadecimal to other number systems. Decimal to Hex, Binary to Hex, Octal to Hex handle reverse conversions.
            </p>

            <h3 className="text-xl font-semibold mb-3">Color Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Hex to RGB Color Converter translates hex color codes (#FF5733) to RGB values. RGB to Hex Color Converter does the reverse for web design work.
            </p>

            <h3 className="text-xl font-semibold mb-3">Text and Encoding</h3>
            <p className="text-muted-foreground mb-4">
              Hex to Text Converter decodes hex strings to ASCII. Hex to UTF-8 String Decoder handles Unicode. Text to Hex Converter encodes text as hexadecimal. Hex to Base64 Encoder/Decoder converts between encoding formats.
            </p>

            <h3 className="text-xl font-semibold mb-3">Hex Arithmetic</h3>
            <p className="text-muted-foreground mb-4">
              Hex Addition/Subtraction Calculator performs math on hex numbers. Hex XOR Calculator applies bitwise XOR operations for encryption and checksum work.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Conversions</h3>
            <p className="text-muted-foreground mb-4">
              Hex to Float/Double Converter interprets hex as IEEE 754 floating-point. Hex to IPv4/IPv6 Address Converter transforms hex to IP addresses. Hex Memory Address Calculator works with pointer arithmetic.
            </p>

            <h3 className="text-xl font-semibold mb-3">Hex Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Hex Diff/Compare Tool highlights differences between hex values. Hex String Validator/Formatter checks and formats hex strings. Hex File Checksum Calculator computes checksums. Hex to ASCII Table Generator displays character mappings.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Number size:</strong> JavaScript uses 64-bit floating-point. Very large hex numbers may lose precision. Tools work best with numbers up to 2^53 - 1.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Endianness:</strong> Some conversions depend on byte order (big-endian vs little-endian). Tools specify which they use.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Hex prefixes:</strong> Tools accept hex with or without 0x prefix. Output format can usually be configured.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Floating-point:</strong> Hex to float conversions use IEEE 754 standard. Results may show rounding for non-exact values.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Hex tools are scattered across calculator apps, programming languages, and developer suites. But sometimes you just need to convert a color code, check what text a hex string represents, or add two memory addresses. These tools exist because working with hex shouldn't require firing up Python or installing hex editors. Everything runs in your browser — focused utilities that do one conversion well without installation or paywalls.
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
