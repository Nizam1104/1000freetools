import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HmacGenerator from "@/components/encryption-tools/hmac-generator";
import HmacGeneratorSeo from "@/components/seo-content/encryption-tools/hmac-generator";

export const metadata: Metadata = {
  title: `HMAC Generator Online | SHA-256 HMAC Tool Free`,
  description: `Calculate HMAC for messages with a secret key online. Verify data integrity with SHA-256 HMAC for free. No server interaction.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/hmac-generator`,
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

export default function HmacGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free HMAC Generator & Verifier Online
        </h1>
        <p className="text-muted-foreground">
          Generate HMAC signatures to verify the authenticity and integrity of
          messages. This tool is crucial for developers testing APIs or
          implementing secure data exchanges. All calculations are done
          in-browser.
        </p>
      </header>
      <div className="mt-8">
        <HmacGenerator />
      </div>
      <div className="mt-8">
        <HmacGeneratorSeo />
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
