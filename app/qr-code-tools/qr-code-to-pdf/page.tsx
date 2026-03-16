import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `QR Code to PDF Converter | Merge & Print Codes`,
  description: `Combine multiple QR codes into one PDF for easy printing. Add labels, adjust layout, and download a professional document instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-to-pdf`,
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

export default function QrCodeToPdfPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert QR Codes to PDF</h1>
        <p className="text-muted-foreground">Bundle multiple QR codes into a single, print-ready PDF file. Perfect for inventory sheets, event tickets, or marketing materials. Customize layout and labels.</p>
      </header>
      {/* TODO: add tool component for qr-code-to-pdf */}
      {/* TODO: add seo component for qr-code-to-pdf */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
