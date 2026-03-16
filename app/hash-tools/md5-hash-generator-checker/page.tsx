import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Md5HashGeneratorChecker from "@/components/hash-tools/md5-hash-generator-checker";
import Md5HashGeneratorCheckerSeo from "@/components/seo-content/hash-tools/md5-hash-generator-checker";

export const metadata: Metadata = {
  title: `Free MD5 Hash Generator & Checker Online | 1000FreeTools`,
  description: `Generate and verify MD5 hashes online for free. Create checksums from text or files instantly with our secure hash tool. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/md5-hash-generator-checker`,
  },
};

const tools = [
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

export default function Md5HashGeneratorCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          MD5 Hash Generator & Checker
        </h1>
        <p className="text-muted-foreground">
          Generate an MD5 hash from any text or file instantly. Use our free
          tool to create checksums for data verification and integrity checks.
          It's fast, secure, and requires no installation.
        </p>
      </header>
      <div className="mt-8">
        <Md5HashGeneratorChecker />
      </div>
      <div className="mt-8">
        <Md5HashGeneratorCheckerSeo />
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
