import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Free AES Encryption Tool | Encrypt Text & Files Online`,
  description: `Encrypt and decrypt text or files with AES-256 online for free. Military-grade security in your browser. No data uploads, instant results.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/aes-encryption`,
  },
};

const tools = [
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
    name: `PGP Key Generator & Message Encryptor`,
    description: `Free PGP Encryption Tool Online`,
    href: `/encryption-tools/pgp-encryption`,
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

export default function AesEncryptionPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free AES Encryption & Decryption Online</h1>
        <p className="text-muted-foreground">Protect your sensitive data with our free AES encryption tool. It uses the industry-standard AES algorithm to securely encrypt text or files directly in your browser. No data is uploaded, ensuring complete privacy.</p>
      </header>
      {/* TODO: add tool component for aes-encryption */}
      {/* TODO: add seo component for aes-encryption */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
