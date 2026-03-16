import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import QrCodeScanner from "@/components/qr-code-tools/qr-code-scanner";
import QrCodeScannerSeo from "@/components/seo-content/qr-code-tools/qr-code-scanner";

export const metadata: Metadata = {
  title: `QR Code Scanner Online | Free Web-Based Reader`,
  description: `Scan QR codes online for free using your webcam. Upload an image or scan live. Decodes URLs, text, and contact info instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-scanner`,
  },
};

const tools = [
  {
    name: `QR Code Generator`,
    description: `Free QR Code Generator`,
    href: `/qr-code-tools/qr-code-generator`,
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
    name: `QR Code Color Picker & Designer`,
    description: `QR Code Color & Design Tool`,
    href: `/qr-code-tools/qr-code-color-picker`,
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

export default function QrCodeScannerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Online QR Code Scanner</h1>
        <p className="text-muted-foreground">
          Scan any QR code directly from your browser. Use your webcam or upload
          an image file. Instantly decode URLs, text, and contact information.
        </p>
      </header>
      <div className="mt-8">
        <QrCodeScanner />
      </div>
      <div className="mt-8">
        <QrCodeScannerSeo />
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
