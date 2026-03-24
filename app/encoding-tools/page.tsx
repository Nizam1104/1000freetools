import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const encodingTools = [
  {
    name: "ASCII Code Converter",
    description: "Convert text to ASCII codes and back",
    href: "/encoding-tools/ascii-code-converter",
  },
  {
    name: "Base32 Encoder/Decoder",
    description: "Encode text to Base32 or decode Base32 to text",
    href: "/encoding-tools/base32-encoder-decoder",
  },
  {
    name: "Base36 Encoder/Decoder",
    description: "Convert between Base36 and decimal numbers",
    href: "/encoding-tools/base36-encoder-decoder",
  },
  {
    name: "Base58 Encoder/Decoder",
    description: "Encode/decode Base58 (used in cryptocurrency addresses)",
    href: "/encoding-tools/base58-encoder-decoder",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 to text",
    href: "/encoding-tools/base64-encoder-decoder",
  },
  {
    name: "Base85/Ascii85 Encoder/Decoder",
    description: "Encode/decode Base85/Ascii85 format",
    href: "/encoding-tools/base85-ascii85-encoder-decoder",
  },
  {
    name: "BCD (Binary Coded Decimal) Converter",
    description: "Convert between decimal and BCD format",
    href: "/encoding-tools/bcd-binary-coded-decimal-converter",
  },
  {
    name: "BCD to Decimal Converter",
    description: "Convert Binary Coded Decimal to decimal numbers",
    href: "/encoding-tools/bcd-to-decimal-converter",
  },
  {
    name: "Binary Encoder/Decoder",
    description: "Encode text to binary or decode binary to text",
    href: "/encoding-tools/binary-encoder-decoder",
  },
  {
    name: "BinHex Encoder/Decoder",
    description: "Encode/decode BinHex format for Mac files",
    href: "/encoding-tools/binhex-encoder-decoder",
  },
  {
    name: "Data URI Converter",
    description: "Convert files to data: URI scheme and back",
    href: "/encoding-tools/data-uri-converter",
  },
  {
    name: "EBCDIC/ASCII Converter",
    description: "Convert between EBCDIC and ASCII character sets",
    href: "/encoding-tools/ebcdic-ascii-converter",
  },
  {
    name: "Escape/Unescape String",
    description: "Escape or unescape special characters in strings",
    href: "/encoding-tools/escape-unescape-string",
  },
  {
    name: "Gray Code Encoder/Decoder",
    description: "Convert between binary and Gray code",
    href: "/encoding-tools/gray-code-encoder-decoder",
  },
  {
    name: "GZIP Compress/Decompress",
    description: "Compress text with GZIP or decompress GZIP data",
    href: "/encoding-tools/gzip-compress-decompress",
  },
  {
    name: "Hamming Code Encoder/Decoder",
    description: "Encode/decode Hamming error correction codes",
    href: "/encoding-tools/hamming-code-encoder-decoder",
  },
  {
    name: "Hex Encoder/Decoder",
    description: "Encode text to hexadecimal or decode hex to text",
    href: "/encoding-tools/hex-encoder-decoder",
  },
  {
    name: "Manchester Code Encoder/Decoder",
    description: "Encode/decode Manchester encoding for data transmission",
    href: "/encoding-tools/manchester-code-encoder-decoder",
  },
  {
    name: "Morse Code Translator",
    description: "Translate text to Morse code and back",
    href: "/encoding-tools/morse-code-translator",
  },
  {
    name: "Percent Encoding/Decoder",
    description: "Encode/decode URL percent encoding",
    href: "/encoding-tools/percent-encoding-decoder",
  },
  {
    name: "Punycode Encoder/Decoder",
    description: "Convert international domain names to Punycode",
    href: "/encoding-tools/punycode-encoder-decoder",
  },
  {
    name: "Quoted-Printable Encoder/Decoder",
    description: "Encode/decode quoted-printable email format",
    href: "/encoding-tools/quoted-printable-encoder-decoder",
  },
  {
    name: "ROT13 Cipher Encoder/Decoder",
    description: "Apply ROT13 letter rotation to text",
    href: "/encoding-tools/rot13-cipher-encoder-decoder",
  },
  {
    name: "Unicode Character Encoder/Decoder",
    description: "Encode/decode Unicode character representations",
    href: "/encoding-tools/unicode-character-encoder-decoder",
  },
  {
    name: "UTF-16 Encoder/Decoder",
    description: "Encode/decode UTF-16 character encoding",
    href: "/encoding-tools/utf16-encoder-decoder",
  },
  {
    name: "UTF-7 Encoder/Decoder",
    description: "Encode/decode UTF-7 character encoding",
    href: "/encoding-tools/utf7-encoder-decoder",
  },
  {
    name: "UTF-8 Encoder/Decoder",
    description: "Encode/decode UTF-8 character encoding",
    href: "/encoding-tools/utf8-encoder-decoder",
  },
  {
    name: "Uuencode/Uudecode Tool",
    description: "Encode/decode Unix uuencode format",
    href: "/encoding-tools/uuencode-uudecode-tool",
  },
  {
    name: "XXEncode/XXDecode Tool",
    description: "Encode/decode XXEncode format",
    href: "/encoding-tools/xxencode-xxdecode-tool",
  },
  {
    name: "Z85/Base85 Encoder/Decoder",
    description: "Encode/decode ZeroMQ Z85 format",
    href: "/encoding-tools/z85-base85-encoder-decoder",
  },
];

export const metadata: Metadata = {
  title: "Free Encoding Tools Online - 30 Data Encoding & Decoding Tools",
  description:
    "Free online encoding tools for converting, encoding, and decoding data. Base64, URL encoding, HTML entities, Unicode, hashes, and more. All tools run in your browser.",
  openGraph: {
    title: "Free Encoding Tools Online - 34 Data Encoding & Decoding Tools",
    description:
      "Free online encoding tools for converting, encoding, and decoding data. Base64, URL encoding, HTML entities, Unicode, hashes, and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/encoding-tools",
  },
};

export default function EncodingToolsPage() {
  const faqsData = [
    {
      question: "Are these encoding tools really free?",
      answer:
        "Yes. All 34 encoding tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What encoding formats are supported?",
      answer:
        "Tools support common formats including Base64, Base32, Base58, hexadecimal, URL encoding, HTML entities, UTF-8/16/7, Punycode, Morse code, and various legacy formats like uuencode and BinHex.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Are these encoding tools suitable for encryption?",
      answer:
        "No. Encoding is not encryption. Encodings like Base64 or hex are reversible transformations for data representation, not security. For encryption, use the encryption-tools category.",
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
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Encoding Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online encoding tools for converting, encoding, and decoding data.
              Base64, URL encoding, HTML entities, Unicode, hashes — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={encodingTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Security Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our encryption tools or hash tools for more security utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/encryption-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Encryption Tools
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
              What These Encoding Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 30 free encoding tools that run entirely in your browser. No software installation, no server uploads, no waiting. You enter data, select an encoding format, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: encoding text to various formats (Base64, hex, binary, URL encoding), decoding encoded data back to readable text, converting between character encodings (UTF-8, UTF-16, ASCII, EBCDIC), and generating checksums or hashes (SHA256).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your text or paste encoded data</li>
              <li>Select the encoding or decoding operation</li>
              <li>Adjust options like character set or line length</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Web developers</strong> encode URLs, escape HTML entities, generate data URIs for inline images, or create SEO-friendly URL slugs.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Email developers</strong> handle quoted-printable encoding, decode email attachments, or convert character encodings for international email.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Security researchers</strong> decode obfuscated payloads, analyze Base64-encoded data, or generate hashes for file integrity checks.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>System administrators</strong> work with legacy encodings like uuencode or EBCDIC, decode configuration data, or troubleshoot character encoding issues.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Base Encoding</h3>
            <p className="text-muted-foreground mb-4">
              Base64 Encoder/Decoder handles the most common binary-to-text encoding. Base32, Base58, Base85/Ascii85, and Z85 variants serve specialized use cases like cryptocurrency addresses and ZeroMQ messaging.
            </p>

            <h3 className="text-xl font-semibold mb-3">Character Encodings</h3>
            <p className="text-muted-foreground mb-4">
              UTF-8, UTF-16, and UTF-7 Encoder/Decoder tools handle Unicode text. ASCII Code Converter works with 7-bit ASCII. EBCDIC/ASCII Converter bridges mainframe and modern systems. Punycode Encoder/Decoder handles international domain names.
            </p>

            <h3 className="text-xl font-semibold mb-3">Web & URL Encoding</h3>
            <p className="text-muted-foreground mb-4">
              Percent Encoding/Decoder handles URL-safe encoding. HTML Entity Encoder/Decoder converts special characters to HTML entities. URL Slug Generator creates SEO-friendly URLs. Data URI Converter embeds files inline.
            </p>

            <h3 className="text-xl font-semibold mb-3">Binary & Numeric Encodings</h3>
            <p className="text-muted-foreground mb-4">
              Binary Encoder/Decoder converts text to 8-bit binary. Hex Encoder/Decoder handles hexadecimal. BCD Converter works with Binary Coded Decimal. Gray Code Encoder/Decoder handles reflected binary code.
            </p>

            <h3 className="text-xl font-semibold mb-3">Legacy & Specialized Formats</h3>
            <p className="text-muted-foreground mb-4">
              Uuencode/Uudecode and BinHex Encoder/Decoder handle legacy file encodings. Quoted-Printable Encoder/Decoder processes email content. Manchester Code Encoder/Decoder handles digital signal encoding.
            </p>

            <h3 className="text-xl font-semibold mb-3">Codes & Ciphers</h3>
            <p className="text-muted-foreground mb-4">
              Morse Code Translator converts text to dots and dashes. ROT13 Cipher Encoder/Decoder applies simple letter rotation. Hamming Code Encoder/Decoder adds error correction.
            </p>

            <h3 className="text-xl font-semibold mb-3">Compression & Hashes</h3>
            <p className="text-muted-foreground mb-4">
              GZIP Compress/Decompress handles gzip compression. SHA256 Hash Generator creates cryptographic hashes. JWT Decoder parses JSON Web Tokens.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Encoding vs encryption:</strong> Encoding is reversible transformation, not security. Anyone can decode Base64 or hex. Use encryption tools for actual security.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Character encoding:</strong> UTF-8 is standard for web. UTF-16 is used internally by JavaScript and Windows. Mixing encodings causes garbled text (mojibake).
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Base64 expansion:</strong> Base64 increases data size by ~33%. Not suitable for compression — only for safe text transmission.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Hash collisions:</strong> SHA256 is one-way. You can't decode a hash back to the original input. Hashes are for verification, not encoding.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Encoding problems are everywhere. You're debugging an API and see %20 instead of spaces. You need to embed an image in CSS but don't know how to create a data URI. You're troubleshooting why Japanese text shows as gibberish. These tools exist because encoding shouldn't require installing software or pasting sensitive data into sketchy websites. Everything runs in your browser — no installation, no uploads, no guesswork.
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
