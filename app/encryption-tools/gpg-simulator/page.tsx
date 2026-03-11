import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import GpgSimulator from "@/components/encryption-tools/gpg-simulator";
import GpgSimulatorSeo from "@/components/seo-content/encryption-tools/gpg-simulator";

export const metadata: Metadata = {
  title: `Free GPG Simulator Online | Practice GPG Commands`,
  description: `Simulate GnuPG command-line operations for encryption and signing online. Learn GPG without installation in an interactive, risk-free environment.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/gpg-simulator`,
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

export default function GpgSimulatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">GPG Command Line Simulator</h1>
        <p className="text-muted-foreground">
          Learn GPG commands in a safe, simulated environment. Practice
          generating keys, encrypting files, and creating signatures without
          touching your terminal. Perfect for beginners.
        </p>
      </header>
      <div className="mt-8">
        <GpgSimulator />
      </div>
      <div className="mt-8">
        <GpgSimulatorSeo />
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
