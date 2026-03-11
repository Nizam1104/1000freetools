import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import RsaKeyGenerator from "@/components/encryption-tools/rsa-key-generator";
import RsaKeyGeneratorSeo from "@/components/seo-content/encryption-tools/rsa-key-generator";

export const metadata: Metadata = {
  title: `Free RSA Key Generator | Encrypt with RSA Online`,
  description: `Generate RSA public/private keys online for free. Encrypt and decrypt text using RSA asymmetric encryption. No server-side processing.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/rsa-key-generator`,
  },
};

const tools = [
  {
    name: `AES Encryption Tool`,
    description: `Free AES Encryption & Decryption Online`,
    href: `/encryption-tools/aes-encryption`,
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

export default function RsaKeyGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          RSA Key Generator & Encryption Tool
        </h1>
        <p className="text-muted-foreground">
          Create secure RSA key pairs and encrypt messages with this free online
          tool. It's perfect for learning public-key cryptography or generating
          keys for secure communications. All processing happens locally in your
          browser.
        </p>
      </header>
      <div className="mt-8">
        <RsaKeyGenerator />
      </div>
      <div className="mt-8">
        <RsaKeyGeneratorSeo />
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
