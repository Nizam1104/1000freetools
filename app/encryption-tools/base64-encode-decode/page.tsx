import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Base64EncodeDecode from "@/components/encryption-tools/base64-encode-decode";
import Base64EncodeDecodeSeo from "@/components/seo-content/encryption-tools/base64-encode-decode";

export const metadata: Metadata = {
  title: `Free Base64 Encoder/Decoder | Encode Text & Files`,
  description: `Encode text or files to Base64 and decode Base64 strings online for free. Fast, secure, and works entirely in your browser.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/base64-encode-decode`,
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

export default function Base64EncodeDecodePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Base64 Encoder & Decoder Online
        </h1>
        <p className="text-muted-foreground">
          Quickly encode text or files to Base64 and decode Base64 strings with
          this simple tool. It's essential for web developers working with data
          URLs or transmitting binary data as text. No data leaves your
          computer.
        </p>
      </header>
      <div className="mt-8">
        <Base64EncodeDecode />
      </div>
      <div className="mt-8">
        <Base64EncodeDecodeSeo />
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
