import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Ripemd160HashGenerator } from "@/components/hash-tools/ripemd160-hash-generator.tsx";
import Ripemd160HashGeneratorSeo from "@/components/seo-content/hash-tools/ripemd160-hash-generator";

export const metadata: Metadata = {
  title: `RIPEMD-160 Hash Generator Online | Free Crypto Hash Tool`,
  description: `Generate RIPEMD-160 hashes online for free. Used in Bitcoin and other cryptocurrencies, this tool creates secure 160-bit hash values.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/ripemd160-hash-generator`,
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

export default function Ripemd160HashGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">RIPEMD-160 Hash Generator</h1>
        <p className="text-muted-foreground">Generate RIPEMD-160 hashes, commonly used in cryptocurrency applications like Bitcoin. This tool creates a 160-bit hash from your text or file input quickly.</p>
      </header>
      {<Ripemd160HashGenerator />}
      <div className="mt-8">
        <Ripemd160HashGeneratorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
