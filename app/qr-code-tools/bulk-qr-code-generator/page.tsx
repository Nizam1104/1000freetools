import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { BulkQrCodeGenerator } from "@/components/qr-code-tools/bulk-qr-code-generator.tsx";

export const metadata: Metadata = {
  title: `Bulk QR Code Generator | Mass Create from CSV`,
  description: `Mass generate unique QR codes from a CSV file. Create thousands for tickets, assets, or products. Download as ZIP or PDF instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/bulk-qr-code-generator`,
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

export default function BulkQrCodeGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bulk QR Code Generator</h1>
        <p className="text-muted-foreground">Generate thousands of unique QR codes in one go. Upload a spreadsheet with your data. Download all codes as a ZIP file or a multi-page PDF.</p>
      </header>
      {<BulkQrCodeGenerator />}
      {/* TODO: add seo component for bulk-qr-code-generator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
