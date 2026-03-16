import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ISBNBarcodeGenerator from "@/components/barcode-tools/isbn-barcode-generator";
import ISBNBarcodeGeneratorSEO from "@/components/seo-content/barcode-tools/isbn-barcode-generator";

export const metadata: Metadata = {
  title: `Free ISBN Barcode Generator - Create Book Barcode`,
  description: `Generate EAN barcodes from ISBN numbers. For authors and publishers. Creates Bookland EAN barcode for book covers. Download PNG.`,
  alternates: {
    canonical: `https://1000freetools.com/barcode-tools/isbn-barcode-generator`,
  },
};

const tools = [
  {
    name: `Bulk Barcode Generator`,
    description: `Bulk Barcode Generator`,
    href: `/barcode-tools/bulk-barcode-generator`,
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

export default function IsbnBarcodeGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">ISBN Barcode Generator</h1>
        <p className="text-muted-foreground">
          Generate the correct EAN barcode for any ISBN number. This tool
          creates Bookland EAN barcodes used on book covers for retail scanning
          and inventory.
        </p>
      </header>
      <div className="mt-8">
        <ISBNBarcodeGenerator />
      </div>
      <div className="mt-8">
        <ISBNBarcodeGeneratorSEO />
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
