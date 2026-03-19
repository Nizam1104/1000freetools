import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FileHashCalculatorMultiAlgorithm from "@/components/hash-tools/file-hash-calculator-multi-algorithm";
import FileHashCalculatorMultiAlgorithmSeo from "@/components/seo-content/hash-tools/file-hash-calculator-multi-algorithm";

export const metadata: Metadata = {
  title: `File Hash Calculator Online | Multi-Algorithm Hash Tool`,
  description: `Calculate multiple hash values (MD5, SHA-256, etc.) from a file online. Free tool for comprehensive file checksum generation and verification.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/file-hash-calculator-multi-algorithm`,
  },
};

const tools = [
  {
    name: `MD5 Hash Generator & Checker`,
    description: `MD5 Hash Generator & Checker`,
    href: `/hash-tools/md5-hash-generator-checker`,
  },
  {
    name: `SHA-256 Hash Generator`,
    description: `SHA-256 Hash Generator`,
    href: `/hash-tools/sha256-hash-generator`,
  },
  {
    name: `SHA-1 Hash Generator & Decrypter`,
    description: `SHA-1 Hash Generator & Decrypter`,
    href: `/hash-tools/sha1-hash-generator-decrypter`,
  },
  {
    name: `SHA-512 Hash Calculator`,
    description: `SHA-512 Hash Calculator`,
    href: `/hash-tools/sha512-hash-calculator`,
  },
  {
    name: `SHA-3 Hash Generator (Keccak)`,
    description: `SHA-3 Hash Generator (Keccak)`,
    href: `/hash-tools/sha3-hash-generator-keccak`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function FileHashCalculatorMultiAlgorithmPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">File Hash Calculator (Multi-Algorithm)</h1>
        <p className="text-muted-foreground">Calculate multiple hash types for any file in one go. Upload a file and get MD5, SHA-1, SHA-256, and more instantly. Ideal for thorough file integrity verification.</p>
      </header>
      {<FileHashCalculatorMultiAlgorithm />}
      <div className="mt-8">
        <FileHashCalculatorMultiAlgorithmSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
