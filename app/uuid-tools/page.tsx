import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Fingerprint, ArrowRight } from "lucide-react";

const uuidTools = [
  {
    name: "Bulk UUID Generator",
    description: "Generate multiple UUIDs at once",
    href: "/uuid-tools/bulk-uuid-generator",
  },
  {
    name: "Nil UUID Generator",
    description: "Generate nil UUID (all zeros)",
    href: "/uuid-tools/nil-uuid-generator",
  },
  {
    name: "Offline UUID Generator",
    description: "Generate UUIDs without network connection",
    href: "/uuid-tools/offline-uuid-generator",
  },
  {
    name: "UUID Case Formatter",
    description: "Convert UUID between uppercase and lowercase",
    href: "/uuid-tools/uuid-case-formatter",
  },
  {
    name: "UUID Collision Checker",
    description: "Check for duplicate UUIDs in a list",
    href: "/uuid-tools/uuid-collision-checker",
  },
  {
    name: "UUID Decoder",
    description: "Decode UUID to extract version and variant info",
    href: "/uuid-tools/uuid-decoder",
  },
  {
    name: "UUID Entropy Checker",
    description: "Analyze UUID randomness and entropy",
    href: "/uuid-tools/uuid-entropy-checker",
  },
  {
    name: "UUID Generator",
    description: "Generate UUID v1, v4, and other versions",
    href: "/uuid-tools/uuid-generator",
  },
  {
    name: "UUID Regex Tester",
    description: "Validate UUIDs using regex patterns",
    href: "/uuid-tools/uuid-regex-tester",
  },
  {
    name: "UUID Sort/Organize",
    description: "Sort UUIDs in various orders",
    href: "/uuid-tools/uuid-sort-organize",
  },
  {
    name: "UUID Timestamp to Date",
    description: "Extract timestamp from time-based UUIDs",
    href: "/uuid-tools/uuid-timestamp-to-date",
  },
  {
    name: "UUID to GUID Converter",
    description: "Convert between UUID and GUID formats",
    href: "/uuid-tools/uuid-to-guid-converter",
  },
  {
    name: "UUID to QR Code",
    description: "Generate QR codes from UUIDs",
    href: "/uuid-tools/uuid-to-qr-code",
  },
  {
    name: "UUID v1 Generator",
    description: "Generate time-based UUID version 1",
    href: "/uuid-tools/uuid-v1-generator",
  },
  {
    name: "UUID Validator",
    description: "Validate UUID format and structure",
    href: "/uuid-tools/uuid-validator",
  },
  {
    name: "UUID Version Converter",
    description: "Convert between UUID versions",
    href: "/uuid-tools/uuid-version-converter",
  },
];

export const metadata: Metadata = {
  title: "Free UUID Tools Online - 16 UUID Generator & Validator Tools",
  description:
    "Free online UUID tools for generating, validating, and converting UUIDs/GUIDs. UUID v1, v4 generator, bulk generator, validator. All tools run in your browser.",
  openGraph: {
    title: "Free UUID Tools Online - 16 UUID Generator & Validator Tools",
    description:
      "Free online UUID tools for generating, validating, and converting UUIDs/GUIDs. UUID v1, v4 generator, bulk generator, validator. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/uuid-tools",
  },
};

export default function UuidToolsPage() {
  const faqsData = [
    {
      question: "Are these UUID tools really free?",
      answer:
        "Yes. All 16 UUID tools are completely free — no registration, no paywalls, no usage limits. Generate as many UUIDs as you need.",
    },
    {
      question: "Is my UUID data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your UUIDs never leave your device or get uploaded to any server.",
    },
    {
      question: "What UUID versions are supported?",
      answer:
        "Tools support UUID version 1 (time-based), version 4 (random), and can parse/validate versions 1-5. Version 4 is most common for general use.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Yes. All UUID tools work completely offline since they run in your browser using JavaScript. No internet connection required.",
    },
    {
      question: "What's the difference between UUID and GUID?",
      answer:
        "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are essentially the same thing. GUID is Microsoft's term. The format is identical: 32 hex digits in 8-4-4-4-12 pattern.",
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
              <Fingerprint className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free UUID Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online UUID tools for generating, validating, and converting UUIDs/GUIDs.
              UUID v1, v4 generator, bulk generator — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={uuidTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Developer Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our developer tools or encoding tools for more utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/developer-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Developer Tools
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
              What These UUID Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 16 free UUID tools that run entirely in your browser. No software installation, no server calls, no waiting. You generate, validate, or convert UUIDs instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: generating UUIDs (single, bulk, version-specific), validating UUIDs (format checking, regex testing, collision detection), converting UUIDs (case formatting, GUID conversion, QR codes), and analyzing UUIDs (decoding version/variant, extracting timestamps, entropy checking).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your UUID or select generation options</li>
              <li>Choose the operation (generate, validate, convert)</li>
              <li>Select UUID version if applicable</li>
              <li>Copy the result or download</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. UUIDs are generated using cryptographically secure random number generators. Your data never leaves your browser.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> generate UUIDs for database primary keys, session tokens, or unique identifiers. They validate UUIDs from user input or decode time-based UUIDs.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Database administrators</strong> generate UUIDs for distributed systems, check for collisions, or sort UUIDs for indexing.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>QA engineers</strong> generate bulk UUIDs for test data, validate UUID formats in APIs, or create QR codes for asset tracking.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>System architects</strong> analyze UUID entropy for security, choose appropriate UUID versions for use cases, or convert between UUID/GUID formats for cross-platform compatibility.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">UUID Generation</h3>
            <p className="text-muted-foreground mb-4">
              UUID Generator creates standard UUIDs. UUID v1 Generator makes time-based UUIDs. Bulk UUID Generator produces multiple UUIDs at once. Offline UUID Generator works without network. Nil UUID Generator creates the special all-zeros UUID.
            </p>

            <h3 className="text-xl font-semibold mb-3">UUID Validation</h3>
            <p className="text-muted-foreground mb-4">
              UUID Validator checks format compliance. UUID Regex Tester validates against patterns. UUID Collision Checker finds duplicates in lists.
            </p>

            <h3 className="text-xl font-semibold mb-3">UUID Conversion</h3>
            <p className="text-muted-foreground mb-4">
              UUID to GUID Converter handles format differences. UUID Case Formatter changes case. UUID to QR Code creates scannable codes. UUID Version Converter transforms between versions.
            </p>

            <h3 className="text-xl font-semibold mb-3">UUID Analysis</h3>
            <p className="text-muted-foreground mb-4">
              UUID Decoder extracts version and variant info. UUID Timestamp to Date extracts time from v1 UUIDs. UUID Entropy Checker analyzes randomness. UUID Sort/Organize orders UUIDs.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>UUID v1 privacy:</strong> Version 1 UUIDs contain MAC address and timestamp. This can leak information about the generating machine and time.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>UUID v4 randomness:</strong> Quality depends on browser's random number generator. Modern browsers use cryptographically secure sources.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Collision risk:</strong> While extremely low, UUID collisions are theoretically possible. For critical applications, implement additional uniqueness checks.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Sorting:</strong> UUIDs don't sort chronologically (except v1). For ordered identifiers, consider ULID or KSUID instead.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              UUID tools are built into most programming languages, but sometimes you're in a browser without your development environment. You need a quick UUID for a database record, want to validate a UUID format, or need to generate 100 test UUIDs without writing a script. These tools exist because generating a UUID shouldn't require opening a terminal or importing a library. Everything runs in your browser — no installation, no dependencies, no friction.
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
