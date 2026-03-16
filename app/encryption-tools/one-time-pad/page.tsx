import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import OneTimePad from "@/components/encryption-tools/one-time-pad";
import OneTimePadSeo from "@/components/seo-content/encryption-tools/one-time-pad";

export const metadata: Metadata = {
  title: `One-Time Pad Generator | Unbreakable Encryption Tool`,
  description: `Generate random one-time pads and encrypt text with perfect secrecy. Free online simulator for the only provably secure cipher. Works offline.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/one-time-pad`,
  },
};

const tools = [
  {
    name: `AES Encryption Tool`,
    description: `Free AES Encryption & Decryption Online`,
    href: `/encryption-tools/aes-encryption`,
  },
  {
    name: `RSA Key Generator & Encryption`,
    description: `RSA Key Generator & Encryption Tool`,
    href: `/encryption-tools/rsa-key-generator`,
  },
  {
    name: `Base64 Encode & Decode`,
    description: `Base64 Encoder & Decoder Online`,
    href: `/encryption-tools/base64-encode-decode`,
  },
  {
    name: `Text to Binary Converter & Encryptor`,
    description: `Text to Binary Converter with Encryption`,
    href: `/encryption-tools/text-binary-encryptor`,
  },
  {
    name: `File Checksum & Hash Verifier (MD5, SHA)`,
    description: `File Checksum Calculator & Verifier`,
    href: `/encryption-tools/file-checksum-verifier`,
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

export default function OneTimePadPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          One-Time Pad Encryption Generator
        </h1>
        <p className="text-muted-foreground">
          Implement theoretically unbreakable encryption with a one-time pad.
          This tool generates random pads and shows how to use them for secure
          communication. A must-try for cryptography enthusiasts.
        </p>
      </header>
      <div className="mt-8">
        <OneTimePad />
      </div>
      <div className="mt-8">
        <OneTimePadSeo />
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
