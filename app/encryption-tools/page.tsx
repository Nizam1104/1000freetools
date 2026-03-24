import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

const encryptionTools = [
  {
    name: "AES Encryption",
    description: "Encrypt and decrypt text using AES cipher",
    href: "/encryption-tools/aes-encryption",
  },
  {
    name: "Caesar Cipher",
    description: "Encrypt/decrypt using Caesar shift cipher",
    href: "/encryption-tools/caesar-cipher",
  },
  {
    name: "Crypto Address Validator",
    description: "Validate cryptocurrency wallet addresses",
    href: "/encryption-tools/crypto-address-validator",
  },
  {
    name: "File Checksum Verifier",
    description: "Verify file integrity using checksums",
    href: "/encryption-tools/file-checksum-verifier",
  },
  {
    name: "GPG Simulator",
    description: "Simulate GPG encryption and signing",
    href: "/encryption-tools/gpg-simulator",
  },
  {
    name: "One-Time Pad",
    description: "Encrypt/decrypt using one-time pad cipher",
    href: "/encryption-tools/one-time-pad",
  },
  {
    name: "PGP Encryption",
    description: "Encrypt and decrypt using PGP format",
    href: "/encryption-tools/pgp-encryption",
  },
  {
    name: "RSA Key Generator",
    description: "Generate RSA public/private key pairs",
    href: "/encryption-tools/rsa-key-generator",
  },
  {
    name: "SSL Certificate Decoder",
    description: "Decode and view SSL certificate details",
    href: "/encryption-tools/ssl-certificate-decoder",
  },
  {
    name: "Text Binary Encryptor",
    description: "Encrypt text to binary and decrypt back",
    href: "/encryption-tools/text-binary-encryptor",
  },
];

export const metadata: Metadata = {
  title: "Free Encryption Tools Online - 10 Encryption & Cryptography Tools",
  description:
    "Free online encryption tools for encrypting, decrypting, and cryptographic operations. AES, RSA, PGP, Caesar cipher, password hashes. All tools run in your browser.",
  openGraph: {
    title: "Free Encryption Tools Online - 14 Encryption & Cryptography Tools",
    description:
      "Free online encryption tools for encrypting, decrypting, and cryptographic operations. AES, RSA, PGP, Caesar cipher, password hashes. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/encryption-tools",
  },
};

export default function EncryptionToolsPage() {
  const faqsData = [
    {
      question: "Are these encryption tools really free?",
      answer:
        "Yes. All 14 encryption tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my encrypted data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device. However, these are educational tools — for sensitive data, use dedicated security software.",
    },
    {
      question: "Can I use these tools for real encryption?",
      answer:
        "These tools demonstrate encryption concepts and work correctly, but for production security, use established libraries and tools. Browser-based encryption has limitations for high-security scenarios.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "What's the difference between encoding and encryption?",
      answer:
        "Encoding (like Base64) is reversible transformation for data representation. Encryption uses keys to scramble data so only authorized parties can read it. Use encoding-tools for encoding, encryption-tools for security.",
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
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Encryption Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online encryption tools for encrypting, decrypting, and cryptographic operations.
              AES, RSA, PGP, Caesar cipher — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={encryptionTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Security Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our hash tools or encoding tools for more security utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hash-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Hash Tools
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
              What These Encryption Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 10 free encryption tools that run entirely in your browser. No software installation, no server uploads. You enter data, choose encryption method, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: encrypting and decrypting data (AES, PGP, one-time pad), learning cryptography concepts (Caesar cipher, Diffie-Hellman), generating cryptographic keys (RSA key pairs, password hashes), and verifying security artifacts (SSL certificates, crypto addresses, file checksums).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your plaintext or ciphertext</li>
              <li>Provide encryption key or password if required</li>
              <li>Select algorithm and options</li>
              <li>Encrypt/decrypt and copy the result</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript cryptographic libraries. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Students</strong> learn cryptography concepts through hands-on experimentation with Caesar cipher, one-time pad, or Diffie-Hellman key exchange simulation.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> test encryption implementations, generate RSA keys for prototyping, decode JWT tokens for debugging, or verify SSL certificate details.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Security enthusiasts</strong> explore steganography, validate cryptocurrency addresses, or experiment with PGP encryption concepts.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>System administrators</strong> verify file checksums for integrity checks, decode SSL certificates, or generate password hashes for configuration files.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Symmetric Encryption</h3>
            <p className="text-muted-foreground mb-4">
              AES Encryption uses the Advanced Encryption Standard for secure symmetric encryption. One-Time Pad demonstrates theoretically unbreakable encryption using random keys as long as the message.
            </p>

            <h3 className="text-xl font-semibold mb-3">Asymmetric Encryption</h3>
            <p className="text-muted-foreground mb-4">
              RSA Key Generator creates public/private key pairs for asymmetric encryption. PGP Encryption simulates Pretty Good Privacy for secure message exchange. Diffie-Hellman Simulator demonstrates secure key exchange over insecure channels.
            </p>

            <h3 className="text-xl font-semibold mb-3">Classical Ciphers</h3>
            <p className="text-muted-foreground mb-4">
              Caesar Cipher applies letter shifting for basic encryption. Text Binary Encryptor converts text to encrypted binary format. These tools are primarily educational.
            </p>

            <h3 className="text-xl font-semibold mb-3">Cryptographic Utilities</h3>
            <p className="text-muted-foreground mb-4">
              Password Hash Generator creates secure hashes for password storage. File Checksum Verifier validates file integrity. SSL Certificate Decoder displays certificate details. Crypto Address Validator checks cryptocurrency wallet addresses. JWT Decoder parses JSON Web Tokens. GPG Simulator demonstrates GnuPG operations. Steganography Tool hides messages inside images.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Educational use:</strong> These tools demonstrate encryption concepts. For production security, use established libraries like OpenSSL or Web Crypto API.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Key management:</strong> Encryption is only as secure as your keys. Never share private keys. Use strong, random passwords.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Browser limitations:</strong> Browser JavaScript has performance limits. Large file encryption may be slow. Memory is limited.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>One-time pad:</strong> True one-time pads require truly random keys as long as the message, used only once. Practical use is limited.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Encryption tools often mean installing command-line software, managing keychains, or paying for security suites. But sometimes you need to quickly decode a JWT, check an SSL certificate, or understand how Diffie-Hellman works. These tools exist because learning and experimenting with cryptography should be accessible. Everything runs in your browser — no installation, no configuration, no barriers to understanding how encryption protects your data.
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
