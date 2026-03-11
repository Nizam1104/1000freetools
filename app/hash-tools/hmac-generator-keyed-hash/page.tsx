import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HmacGenerator from "@/components/hash-tools/hmac-generator-keyed-hash";
import HmacGeneratorKeyedHashSeo from "@/components/seo-content/hash-tools/hmac-generator-keyed-hash";

export const metadata: Metadata = {
  title: `HMAC Generator Online | Free Keyed-Hash Tool`,
  description: `Generate HMAC online with various hash algorithms like SHA-256. A free tool for creating keyed-hash message authentication codes for security.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/hmac-generator-keyed-hash`,
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

export default function HmacGeneratorKeyedHashPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">HMAC Generator (Keyed-Hash)</h1>
        <p className="text-muted-foreground">
          Generate HMAC signatures with a secret key and your chosen hash
          algorithm. This tool helps ensure message authenticity and integrity
          in API security and data transfers.
        </p>
      </header>
      <div className="mt-8">
        <HmacGenerator />
      </div>
      <div className="mt-8">
        <HmacGeneratorKeyedHashSeo />
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
