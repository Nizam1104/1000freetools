import type { Metadata } from "next";
import QrCodeErrorCorrectionSeo from "@/components/seo-content/qr-code-tools/qr-code-error-correction";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { QrCodeErrorCorrection } from "@/components/qr-code-tools/qr-code-error-correction";

export const metadata: Metadata = {
  title: `QR Code Error Correction Level Tool | L, M, Q, H Comparison`,
  description: `Optimize QR code durability with error correction levels L, M, Q, H. Test scannability with logos or simulated damage using our free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-error-correction`,
  },
};

const tools = [
  {
    name: `QR Code Generator`,
    description: `Free QR Code Generator`,
    href: `/qr-code-tools/qr-code-generator`,
  },
  {
    name: `QR Code Scanner / Reader`,
    description: `Online QR Code Scanner`,
    href: `/qr-code-tools/qr-code-scanner`,
  },
  {
    name: `QR Code to PDF Converter`,
    description: `Convert QR Codes to PDF`,
    href: `/qr-code-tools/qr-code-to-pdf`,
  },
  {
    name: `Dynamic QR Code Generator`,
    description: `Dynamic QR Code Creator`,
    href: `/qr-code-tools/dynamic-qr-code-generator`,
  },
  {
    name: `Bulk QR Code Generator`,
    description: `Bulk QR Code Generator`,
    href: `/qr-code-tools/bulk-qr-code-generator`,
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

export default function QrCodeErrorCorrectionPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Adjust QR Code Error Correction for Better Scans</h1>
        <p className="text-muted-foreground">Choose the right error correction level (L, M, Q, H) to make your QR codes more durable. See how different levels handle damage or logos while keeping your code scannable.</p>
      </header>
      {<QrCodeErrorCorrection />}
      <div className="mt-16">
        <QrCodeErrorCorrectionSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
