import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { NtlmHashGeneratorCracker } from "@/components/hash-tools/ntlm-hash-generator-cracker.tsx";
import NtlmHashGeneratorCrackerSeo from "@/components/seo-content/hash-tools/ntlm-hash-generator-cracker";

export const metadata: Metadata = {
  title: `NTLM Hash Generator & Cracker Online | Free Security Tool`,
  description: `Generate NTLM hashes from passwords or attempt to crack them online. A free tool for security testing and educational purposes on Windows authentication hashes.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/ntlm-hash-generator-cracker`,
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

export default function NtlmHashGeneratorCrackerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">NTLM Hash Generator & Cracker</h1>
        <p className="text-muted-foreground">Generate NTLM hashes for Windows password testing or try to crack them with our dictionary tool. Useful for security assessments and understanding legacy authentication weaknesses.</p>
      </header>
      {<NtlmHashGeneratorCracker />}
      <div className="mt-8">
        <NtlmHashGeneratorCrackerSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
