import type { Metadata } from "next";
import DynamicQrCodeGeneratorSeo from "@/components/seo-content/qr-code-tools/dynamic-qr-code-generator";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { DynamicQrCodeGenerator } from "@/components/qr-code-tools/dynamic-qr-code-generator.tsx";

export const metadata: Metadata = {
  title: `Dynamic QR Code Generator | Editable & Trackable`,
  description: `Create dynamic QR codes with editable destinations and scan analytics. Track performance, set passwords, and add expiration dates.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/dynamic-qr-code-generator`,
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

export default function DynamicQrCodeGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Dynamic QR Code Creator</h1>
        <p className="text-muted-foreground">Generate QR codes you can edit after printing. Track scans in real-time, set expiration dates, or add password protection. Perfect for campaigns.</p>
      </header>
      {<DynamicQrCodeGenerator />}
      <div className="mt-16">
        <DynamicQrCodeGeneratorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
