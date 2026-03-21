import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Hash, ArrowRight } from "lucide-react";

const hashTools = [
  {
    name: "Argon2 Hash Generator",
    description: "Generate Argon2 password hashes",
    href: "/hash-tools/argon2-hash-generator",
  },
  {
    name: "Base64 Encoder/Decoder Hash",
    description: "Encode/decode Base64 with hash verification",
    href: "/hash-tools/base64-encoder-decoder-hash",
  },
  {
    name: "Bcrypt Hash Generator/Verifier",
    description: "Generate and verify bcrypt password hashes",
    href: "/hash-tools/bcrypt-hash-generator-verifier",
  },
  {
    name: "CRC32 Hash Calculator",
    description: "Calculate CRC32 checksum for data integrity",
    href: "/hash-tools/crc32-hash-calculator",
  },
  {
    name: "Custom Salted Hash Generator",
    description: "Generate hashes with custom salt values",
    href: "/hash-tools/custom-salted-hash-generator",
  },
  {
    name: "File Hash Calculator (Multi-Algorithm)",
    description: "Calculate file hashes using multiple algorithms",
    href: "/hash-tools/file-hash-calculator-multi-algorithm",
  },
  {
    name: "Hash Comparison/Duplicate Finder",
    description: "Compare hashes to find duplicate files or data",
    href: "/hash-tools/hash-comparison-duplicate-finder",
  },
  {
    name: "Hash Identifier Tool",
    description: "Identify hash algorithm from hash string",
    href: "/hash-tools/hash-identifier-tool",
  },
  {
    name: "Hash to Hex/Base64 Converter",
    description: "Convert hash values between hex and Base64 formats",
    href: "/hash-tools/hash-to-hex-base64-converter",
  },
  {
    name: "HMAC Generator (Keyed Hash)",
    description: "Generate HMAC with custom secret keys",
    href: "/hash-tools/hmac-generator-keyed-hash",
  },
  {
    name: "MD5 Hash Generator/Checker",
    description: "Generate MD5 hashes and verify against known values",
    href: "/hash-tools/md5-hash-generator-checker",
  },
  {
    name: "MySQL Password Hash Generator",
    description: "Generate MySQL password hashes",
    href: "/hash-tools/mysql-password-hash-generator",
  },
  {
    name: "NTLM Hash Generator/Cracker",
    description: "Generate and analyze NTLM hashes",
    href: "/hash-tools/ntlm-hash-generator-cracker",
  },
  {
    name: "Password Hash Strength Analyzer",
    description: "Analyze password hash security and strength",
    href: "/hash-tools/password-hash-strength-analyzer",
  },
  {
    name: "RIPEMD160 Hash Generator",
    description: "Generate RIPEMD160 cryptographic hashes",
    href: "/hash-tools/ripemd160-hash-generator",
  },
  {
    name: "SHA1 Hash Generator/Decrypter",
    description: "Generate SHA1 hashes and check against databases",
    href: "/hash-tools/sha1-hash-generator-decrypter",
  },
  {
    name: "SHA256 Hash Generator",
    description: "Generate SHA256 cryptographic hashes",
    href: "/hash-tools/sha256-hash-generator",
  },
  {
    name: "SHA3 Hash Generator (Keccak)",
    description: "Generate SHA3/Keccak family hashes",
    href: "/hash-tools/sha3-hash-generator-keccak",
  },
  {
    name: "SHA512 Hash Calculator",
    description: "Generate SHA512 cryptographic hashes",
    href: "/hash-tools/sha512-hash-calculator",
  },
  {
    name: "Whirlpool Hash Generator",
    description: "Generate Whirlpool cryptographic hashes",
    href: "/hash-tools/whirlpool-hash-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Hash Tools Online - 20 Hash Generator & Calculator Tools",
  description:
    "Free online hash tools for generating and verifying cryptographic hashes. MD5, SHA1, SHA256, SHA512, bcrypt, Argon2, HMAC. All tools run in your browser.",
  openGraph: {
    title: "Free Hash Tools Online - 20 Hash Generator & Calculator Tools",
    description:
      "Free online hash tools for generating and verifying cryptographic hashes. MD5, SHA1, SHA256, SHA512, bcrypt, Argon2, HMAC. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/hash-tools",
  },
};

export default function HashToolsPage() {
  const faqsData = [
    {
      question: "Are these hash tools really free?",
      answer:
        "Yes. All 20 hash tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What hash algorithms are supported?",
      answer:
        "Tools support MD5, SHA1, SHA256, SHA384, SHA512, SHA3, bcrypt, Argon2, RIPEMD160, Whirlpool, CRC32, NTLM, and HMAC variants.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Can hashes be decrypted?",
      answer:
        "No. Cryptographic hashes are one-way functions. You can't reverse a hash to get the original input. Some tools check against known hash databases, but this isn't decryption.",
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
              <Hash className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Hash Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online hash tools for generating and verifying cryptographic hashes.
              MD5, SHA256, bcrypt, Argon2, HMAC — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={hashTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Security Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our encryption tools or encoding tools for more security utilities.
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
              What These Hash Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 20 free hash tools that run entirely in your browser. No software installation, no server uploads, no waiting. You enter data or upload files, select a hash algorithm, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: generating cryptographic hashes (MD5, SHA family, bcrypt, Argon2), verifying file integrity with checksums, comparing hashes to find duplicates, and analyzing hash strength or identifying unknown hash types.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your text or upload a file</li>
              <li>Select the hash algorithm (MD5, SHA256, bcrypt, etc.)</li>
              <li>Add salt or key if required (for HMAC, salted hashes)</li>
              <li>Generate hash and copy the result</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript cryptographic libraries. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> generate password hashes for user databases, verify file downloads with checksums, or create HMAC signatures for API authentication.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Security professionals</strong> analyze password hash strength, identify unknown hash types during penetration testing, or verify file integrity after transfers.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>System administrators</strong> calculate file hashes for backup verification, generate MySQL password hashes, or check NTLM hashes for Windows systems.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Blockchain developers</strong> work with SHA256 and RIPEMD160 for cryptocurrency addresses, verify transaction hashes, or generate wallet checksums.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">SHA Family Hashes</h3>
            <p className="text-muted-foreground mb-4">
              SHA1, SHA256, SHA384, SHA512, and SHA3 (Keccak) tools generate Secure Hash Algorithm variants. SHA256 is most common for general use. SHA3 is the newest standard.
            </p>

            <h3 className="text-xl font-semibold mb-3">Password Hashing</h3>
            <p className="text-muted-foreground mb-4">
              bcrypt Hash Generator/Verifier creates adaptive password hashes with work factors. Argon2 Hash Generator uses the modern password hashing winner. MD5 and MySQL password hashes are included for legacy compatibility.
            </p>

            <h3 className="text-xl font-semibold mb-3">Checksums & Integrity</h3>
            <p className="text-muted-foreground mb-4">
              CRC32 Hash Calculator provides fast error-detection checksums. File Hash Calculator computes hashes for uploaded files. Hash Comparison/Duplicate Finder identifies matching files.
            </p>

            <h3 className="text-xl font-semibold mb-3">Keyed Hashes</h3>
            <p className="text-muted-foreground mb-4">
              HMAC Generator creates keyed-hash message authentication codes using secret keys. Custom Salted Hash Generator adds random salt to hashes for password storage.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Hashes</h3>
            <p className="text-muted-foreground mb-4">
              NTLM Hash Generator/Cracker handles Windows authentication hashes. RIPEMD160 Hash Generator is used in cryptocurrency. Whirlpool Hash Generator provides a strong alternative hash function.
            </p>

            <h3 className="text-xl font-semibold mb-3">Hash Utilities</h3>
            <p className="text-muted-foreground mb-4">
              Hash Identifier Tool guesses the algorithm from a hash string. Hash to Hex/Base64 Converter changes hash representation. Password Hash Strength Analyzer evaluates hash security.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>MD5 and SHA1:</strong> These are cryptographically broken. Don't use for security-critical applications. Use SHA256 or bcrypt for passwords.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Hash vs encryption:</strong> Hashes are one-way. You can't decrypt a hash to recover the original data. Hashes verify, they don't hide.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Salt importance:</strong> Always salt password hashes. Unsalted hashes are vulnerable to rainbow table attacks.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>File size:</strong> Browser-based file hashing has memory limits. Very large files (multi-gigabyte) may cause browser slowdowns.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Hash tools often mean command-line utilities, programming libraries, or paid security suites. But sometimes you need to quickly hash a password, verify a file download, or figure out what algorithm produced that mysterious 64-character string. These tools exist because working with hashes shouldn't require installing OpenSSL or writing Python scripts. Everything runs in your browser — no installation, no uploads, no barriers.
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
