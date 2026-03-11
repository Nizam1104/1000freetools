import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HashToHexBase64Converter from "@/components/hash-tools/hash-to-hex-base64-converter";
import HashToHexBase64ConverterSeo from "@/components/seo-content/hash-tools/hash-to-hex-base64-converter";

export const metadata: Metadata = {
  title: `Hash to Hex Base64 Converter Online | Free Format Tool`,
  description: `Convert hash strings between hexadecimal and Base64 formats online. A free tool for transforming hash representations to meet different system requirements.`,
  alternates: {
    canonical: `https://1000freetools.com/hash-tools/hash-to-hex-base64-converter`,
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

export default function HashToHexBase64ConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Hash to Hexadecimal / Base64 Converter
        </h1>
        <p className="text-muted-foreground">
          Convert hash values between hex and Base64 formats. If you have a hash
          in one format but need it in another, this tool does the conversion
          instantly.
        </p>
      </header>
      <div className="mt-8">
        <HashToHexBase64Converter />
      </div>
      <div className="mt-8">
        <HashToHexBase64ConverterSeo />
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
