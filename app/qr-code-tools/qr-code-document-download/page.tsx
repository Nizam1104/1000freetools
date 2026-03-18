import type { Metadata } from "next";
import QrCodeDocumentDownloadSeo from "@/components/seo-content/qr-code-tools/qr-code-document-download";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { QrCodeDocumentDownload } from "@/components/qr-code-tools/qr-code-document-download.tsx";

export const metadata: Metadata = {
  title: `Document QR Code | Share Files via QR Code`,
  description: `Generate a QR code for document downloads. Upload Word, Excel, PowerPoint, or PDF files. Share files without email attachments.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-document-download`,
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

export default function QrCodeDocumentDownloadPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Document Download QR Code Generator</h1>
        <p className="text-muted-foreground">Upload a document and get a QR code for downloading it. Share Word, Excel, or PowerPoint files easily via print or display.</p>
      </header>
      {<QrCodeDocumentDownload />}
      <div className="mt-16">
        <QrCodeDocumentDownloadSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
