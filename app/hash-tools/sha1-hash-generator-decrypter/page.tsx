import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Sha1HashGeneratorDecrypter from "@/components/hash-tools/sha1-hash-generator-decrypter";
import Sha1HashGeneratorDecrypterSeo from "@/components/seo-content/hash-tools/sha1-hash-generator-decrypter";

export const metadata: Metadata = {
  title: `SHA-1 Hash Generator & Decrypter Online | Free Tool`,
  description: `Generate SHA-1 hashes from text or try to decrypt them with our free online tool. Useful for legacy system checks and basic hash reversal attempts.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/sha1-hash-generator-decrypter`,
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

export default function Sha1HashGeneratorDecrypterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SHA-1 Hash Generator & Decrypter
        </h1>
        <p className="text-muted-foreground">
          Generate SHA-1 hashes or attempt to decrypt them using our lookup
          database. While SHA-1 is outdated for security, it's still used for
          legacy checks. This tool helps with compatibility testing.
        </p>
      </header>
      <div className="mt-8">
        <Sha1HashGeneratorDecrypter />
      </div>
      <div className="mt-8">
        <Sha1HashGeneratorDecrypterSeo />
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
