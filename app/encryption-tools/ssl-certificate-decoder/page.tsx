import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SslCertificateDecoder from "@/components/encryption-tools/ssl-certificate-decoder";
import SslCertificateDecoderSeo from "@/components/seo-content/encryption-tools/ssl-certificate-decoder";

export const metadata: Metadata = {
  title: `Free SSL Certificate Decoder | View Certificate Details`,
  description: `Decode and inspect SSL/TLS certificates online for free. View issuer, expiry, and key details from PEM/CRT files or URLs instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/ssl-certificate-decoder`,
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

export default function SslCertificateDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SSL Certificate Decoder & Inspector
        </h1>
        <p className="text-muted-foreground">
          Paste a certificate or enter a website URL to decode its SSL/TLS
          certificate details. This tool helps admins and developers verify
          certificate information and troubleshoot security configurations.
        </p>
      </header>
      <div className="mt-8">
        <SslCertificateDecoder />
      </div>
      <div className="mt-8">
        <SslCertificateDecoderSeo />
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
