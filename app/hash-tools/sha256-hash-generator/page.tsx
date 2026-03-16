import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Sha256HashGenerator from "@/components/hash-tools/sha256-hash-generator";
import Sha256HashGeneratorSeo from "@/components/seo-content/hash-tools/sha256-hash-generator";

export const metadata: Metadata = {
  title: `SHA-256 Hash Generator Online | Free Hash Tool`,
  description: `Generate SHA-256 hashes from text or files online. A free, fast tool for cryptographic hashing used in Bitcoin, SSL, and data integrity verification.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/sha256-hash-generator`,
  },
};

const tools = [
  {
    name: `MD5 Hash Generator & Checker`,
    description: `MD5 Hash Generator & Checker`,
    href: `/hash-tools/md5-hash-generator-checker`,
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
    name: `Bcrypt Hash Generator & Verifier`,
    description: `Bcrypt Hash Generator & Verifier`,
    href: `/hash-tools/bcrypt-hash-generator-verifier`,
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

export default function Sha256HashGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SHA-256 Hash Generator</h1>
        <p className="text-muted-foreground">
          Compute SHA-256 hashes quickly and securely. Our tool is perfect for
          developers and security professionals needing reliable hash
          generation. Just paste your text or upload a file to get started.
        </p>
      </header>
      <div className="mt-8">
        <Sha256HashGenerator />
      </div>
      <div className="mt-8">
        <Sha256HashGeneratorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
