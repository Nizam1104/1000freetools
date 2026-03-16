import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BarcodeGenerator from "@/components/barcode-tools/barcode-generator";
import BarcodeGeneratorSEO from "@/components/seo-content/barcode-tools/barcode-generator";

export const metadata: Metadata = {
  title: `Free Barcode Generator Online - Create & Download`,
  description: `Generate barcodes and QR codes for free. Customize size, color, and format. Supports Code 128, EAN-13, UPC, QR Code. Download as PNG, SVG, JPG.`,
  alternates: {
    canonical: `https://1000freetools.com/barcode-tools/barcode-generator`,
  },
};

const tools = [
  {
    name: `Bulk Barcode Generator`,
    description: `Bulk Barcode Generator`,
    href: `/barcode-tools/bulk-barcode-generator`,
  },
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

export default function BarcodeGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free Barcode Generator</h1>
        <p className="text-muted-foreground">
          Create custom barcodes and QR codes instantly online. No software
          download required. Supports all major 1D and 2D formats for labels,
          packaging, and digital use.
        </p>
      </header>
      <div className="mt-8">
        <BarcodeGenerator />
      </div>
      <div className="mt-8">
        <BarcodeGeneratorSEO />
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
