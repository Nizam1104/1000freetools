import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Free QR Code Decoder Online | QR Code to Text / URL`,
  description: `Decode QR code images to text or URLs instantly. Our free, private tool works in your browser. Upload a QR code to see what's inside.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-to-text-decoder`,
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

export default function QrCodeToTextDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Decode a QR Code to See Its Content</h1>
        <p className="text-muted-foreground">Upload a QR code image to instantly see the text, URL, or other data hidden inside. Our free decoder works in your browser for complete privacy—your data never leaves your computer.</p>
      </header>
      {/* TODO: add tool component for qr-code-to-text-decoder */}
      {/* TODO: add seo component for qr-code-to-text-decoder */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
