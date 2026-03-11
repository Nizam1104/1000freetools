import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BulkBarcodeGenerator from "@/components/barcode-tools/bulk-barcode-generator";
import BulkBarcodeGeneratorSEO from "@/components/seo-content/barcode-tools/bulk-barcode-generator";

export const metadata: Metadata = {
  title: `Bulk Barcode Generator - Create Multiple Barcodes`,
  description: `Generate barcodes in bulk from a CSV or list. Free online tool for batch creation. Download as ZIP of PNGs or a PDF sheet. Saves time.`,
  alternates: {
    canonical: `https://1000freetools.com/barcode-tools/bulk-barcode-generator`,
  },
};

const tools = [
  {
    name: `ISBN Barcode Generator`,
    description: `ISBN Barcode Generator`,
    href: `/barcode-tools/isbn-barcode-generator`,
  },
  {
    name: `Barcode Font Encoder`,
    description: `Barcode Font Encoder`,
    href: `/barcode-tools/barcode-font-encoder`,
  },
  {
    name: `Barcode Data Encoder/Decoder`,
    description: `Barcode Data Encoder & Decoder`,
    href: `/barcode-tools/barcode-data-encoder`,
  },
  {
    name: `Barcode Image to Base64 Encoder`,
    description: `Barcode Image to Base64 Converter`,
    href: `/barcode-tools/barcode-to-base64`,
  },
  {
    name: `Barcode to Text Converter`,
    description: `Barcode to Text Converter`,
    href: `/barcode-tools/barcode-to-text-converter`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
];

export default function BulkBarcodeGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bulk Barcode Generator</h1>
        <p className="text-muted-foreground">
          Create hundreds of barcodes in minutes. Perfect for inventory labels,
          asset tags, or event tickets. Upload a list and download all barcodes
          in a ZIP or PDF.
        </p>
      </header>
      <div className="mt-8">
        <BulkBarcodeGenerator />
      </div>
      <div className="mt-8">
        <BulkBarcodeGeneratorSEO />
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
