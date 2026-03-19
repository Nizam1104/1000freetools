import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Sha3HashGeneratorKeccak } from "@/components/hash-tools/sha3-hash-generator-keccak";
import Sha3HashGeneratorKeccakSeo from "@/components/seo-content/hash-tools/sha3-hash-generator-keccak";

export const metadata: Metadata = {
  title: `SHA-3 Hash Generator Online | Keccak Algorithm Tool`,
  description: `Generate SHA-3 (Keccak) hashes online with variable bit lengths. A free tool implementing the latest secure hash algorithm standard.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/sha3-hash-generator-keccak`,
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

export default function Sha3HashGeneratorKeccakPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SHA-3 Hash Generator (Keccak)</h1>
        <p className="text-muted-foreground">Generate SHA-3 hashes using the Keccak algorithm. Choose your hash length for flexibility in security applications. This tool supports the latest NIST-approved standard.</p>
      </header>
      {<Sha3HashGeneratorKeccak />}
      <div className="mt-8">
        <Sha3HashGeneratorKeccakSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
