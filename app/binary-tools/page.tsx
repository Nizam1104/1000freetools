import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Binary, ArrowRight } from "lucide-react";

const binaryTools = [
  {
    name: "Binary Bit Flipper/Manipulator",
    description: "Flip individual bits or manipulate binary strings",
    href: "/binary-tools/binary-bit-flipper-manipulator",
  },
  {
    name: "Binary Calculator",
    description: "Perform arithmetic operations on binary numbers",
    href: "/binary-tools/binary-calculator",
  },
  {
    name: "Binary Checksum/Hash Generator",
    description: "Calculate checksums and hashes for binary data",
    href: "/binary-tools/binary-checksum-hash-generator",
  },
  {
    name: "Binary Clock/Time Converter",
    description: "Convert time to binary clock format and back",
    href: "/binary-tools/binary-clock-time-converter",
  },
  {
    name: "Binary Complement Calculator",
    description: "Calculate one's and two's complement of binary numbers",
    href: "/binary-tools/binary-complement-calculator",
  },
  {
    name: "Binary File Viewer/Editor",
    description: "View and edit binary files in hex format",
    href: "/binary-tools/binary-file-viewer-editor",
  },
  {
    name: "Binary Gray Code Converter",
    description: "Convert between binary and Gray code representations",
    href: "/binary-tools/binary-gray-code-converter",
  },
  {
    name: "Binary Image Steganography",
    description: "Hide messages in images using binary steganography",
    href: "/binary-tools/binary-image-steganography",
  },
  {
    name: "Binary Logic Gate Calculator",
    description: "Simulate AND, OR, NOT, XOR, NAND, NOR gates",
    href: "/binary-tools/binary-logic-gate-calculator",
  },
  {
    name: "Binary Palindrome Checker",
    description: "Check if a binary number reads the same forwards and backwards",
    href: "/binary-tools/binary-palindrome-checker",
  },
  {
    name: "Binary Pattern Generator/Finder",
    description: "Generate or find patterns in binary sequences",
    href: "/binary-tools/binary-pattern-generator-finder",
  },
  {
    name: "Binary String Splitter/Joiner",
    description: "Split binary strings into chunks or join them together",
    href: "/binary-tools/binary-string-splitter-joiner",
  },
  {
    name: "Binary to Decimal Converter",
    description: "Convert binary numbers to decimal format",
    href: "/binary-tools/binary-to-decimal-converter",
  },
  {
    name: "Binary to Hexadecimal Converter",
    description: "Convert binary numbers to hexadecimal format",
    href: "/binary-tools/binary-to-hexadecimal-converter",
  },
  {
    name: "Binary to Octal Converter",
    description: "Convert binary numbers to octal format",
    href: "/binary-tools/binary-to-octal-converter",
  },
  {
    name: "Binary to Text Converter",
    description: "Convert binary strings to readable text",
    href: "/binary-tools/binary-to-text-converter",
  },
  {
    name: "Binary UUID/GUID Generator",
    description: "Generate UUIDs and GUIDs in binary format",
    href: "/binary-tools/binary-uuid-guid-generator",
  },
  {
    name: "Decimal to Binary Converter",
    description: "Convert decimal numbers to binary format",
    href: "/binary-tools/decimal-to-binary-converter",
  },
  {
    name: "Hexadecimal to Binary Converter",
    description: "Convert hexadecimal numbers to binary format",
    href: "/binary-tools/hexadecimal-to-binary-converter",
  },
  {
    name: "Octal to Binary Converter",
    description: "Convert octal numbers to binary format",
    href: "/binary-tools/octal-to-binary-converter",
  },
  {
    name: "Text to Binary Converter",
    description: "Convert text strings to binary representation",
    href: "/binary-tools/text-to-binary-converter",
  },
];

export const metadata: Metadata = {
  title: "Free Binary Tools Online - 21 Binary Converter & Calculator Tools",
  description:
    "Free online binary tools for conversion, calculation, and manipulation. Convert between binary, decimal, hex, octal. Perform binary arithmetic. All tools run in your browser.",
  openGraph: {
    title: "Free Binary Tools Online - 21 Binary Converter & Calculator Tools",
    description:
      "Free online binary tools for conversion, calculation, and manipulation. Convert between binary, decimal, hex, octal. Perform binary arithmetic. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/binary-tools",
  },
};

export default function BinaryToolsPage() {
  const faqsData = [
    {
      question: "Are these binary tools really free?",
      answer:
        "Yes. All 21 binary tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What number systems are supported?",
      answer:
        "Tools support binary (base-2), decimal (base-10), hexadecimal (base-16), and octal (base-8) number systems with conversion between all formats.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Do these tools handle negative numbers?",
      answer:
        "Yes. Several tools support two's complement representation for negative binary numbers. The Binary Complement Calculator specifically handles one's and two's complement.",
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
              <Binary className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Binary Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online binary tools for conversion, calculation, and manipulation.
              Convert between binary, decimal, hex, and octal — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={binaryTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Number Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our hex tools, number tools, or encoding tools for more utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hex-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Hex Tools
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
              What These Binary Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 21 free binary tools that run entirely in your browser. No software installation, no server processing, no waiting. You enter numbers or upload files, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting between number systems (binary, decimal, hex, octal), performing binary arithmetic and logic operations, manipulating binary strings (flipping bits, finding patterns, splitting/joining), and specialized applications (steganography, Gray code, UUID generation).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your binary, decimal, hex, or octal number</li>
              <li>Select the operation or target format</li>
              <li>Click Convert, Calculate, or Process</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Computer science students</strong> learn binary arithmetic, practice base conversions, understand two's complement representation, or visualize logic gate operations.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Software developers</strong> debug bit flags, convert color values between hex and binary, generate UUIDs, or manipulate binary protocols.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Electronics engineers</strong> work with Gray codes for rotary encoders, calculate checksums for data transmission, or simulate logic circuits.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Security researchers</strong> explore steganography techniques, analyze binary file structures, or reverse engineer binary protocols.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Base Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Binary to Decimal, Binary to Hexadecimal, Binary to Octal, and Binary to Text converters transform binary numbers into other representations. Decimal to Binary, Hexadecimal to Binary, Octal to Binary, and Text to Binary converters handle the reverse operations.
            </p>

            <h3 className="text-xl font-semibold mb-3">Binary Arithmetic</h3>
            <p className="text-muted-foreground mb-4">
              Binary Calculator performs addition, subtraction, multiplication, and division on binary numbers. Binary Complement Calculator computes one's complement (bit inversion) and two's complement (for negative number representation).
            </p>

            <h3 className="text-xl font-semibold mb-3">Binary Manipulation</h3>
            <p className="text-muted-foreground mb-4">
              Binary Bit Flipper/Manipulator lets you flip individual bits or apply bitwise operations. Binary String Splitter/Joiner breaks binary strings into chunks or combines them. Binary Pattern Generator/Finder creates or identifies repeating patterns. Binary Palindrome Checker tests if a binary number reads the same forwards and backwards.
            </p>

            <h3 className="text-xl font-semibold mb-3">Logic and Computation</h3>
            <p className="text-muted-foreground mb-4">
              Binary Logic Gate Calculator simulates AND, OR, NOT, XOR, NAND, and NOR gates with truth tables. Binary Checksum/Hash Generator calculates parity bits, CRC values, or cryptographic hashes for binary data.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Applications</h3>
            <p className="text-muted-foreground mb-4">
              Binary Gray Code Converter transforms between binary and Gray code (where consecutive values differ by one bit). Binary Image Steganography hides secret messages in image files by manipulating least significant bits. Binary File Viewer/Editor displays binary files in hex format with ASCII preview. Binary Clock/Time Converter shows time in binary format. Binary UUID/GUID Generator creates universally unique identifiers.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Number size:</strong> JavaScript uses 64-bit floating-point numbers. Very large integers may lose precision. Tools work best with numbers up to 2^53 - 1.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Two's complement:</strong> Negative numbers require a fixed bit width. Specify 8-bit, 16-bit, 32-bit, or 64-bit representation as needed.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Gray code:</strong> Gray code is position-dependent. The same binary value maps to different Gray codes depending on bit width.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Steganography:</strong> Hidden data is fragile. Image compression, resizing, or format conversion will destroy embedded messages.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Binary is the foundation of computing, but binary tools are scattered across calculator apps, programming languages, and expensive software suites. These tools exist because you shouldn't need a PhD in computer science to convert a hex color to binary, check if a number is a binary palindrome, or understand how two's complement works. Everything runs in your browser — focused utilities that do one thing well without installation or paywalls.
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
