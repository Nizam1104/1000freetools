import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FileChecksumVerifier from "@/components/encryption-tools/file-checksum-verifier";
import FileChecksumVerifierSeo from "@/components/seo-content/encryption-tools/file-checksum-verifier";

export const metadata: Metadata = {
  title: `Free File Checksum Verifier | MD5, SHA-256 Hash`,
  description: `Calculate MD5, SHA-1, SHA-256 checksums for files to verify integrity. Free online tool with local processing for maximum security.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/file-checksum-verifier`,
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

export default function FileChecksumVerifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          File Checksum Calculator & Verifier
        </h1>
        <p className="text-muted-foreground">
          Verify the integrity of your downloads by calculating their MD5 or
          SHA-256 hash. This tool computes the checksum locally, so your files
          are never uploaded to a server, keeping them completely private.
        </p>
      </header>
      <div className="mt-8">
        <FileChecksumVerifier />
      </div>
      <div className="mt-8">
        <FileChecksumVerifierSeo />
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
