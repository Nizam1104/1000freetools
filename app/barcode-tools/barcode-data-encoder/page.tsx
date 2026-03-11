import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BarcodeDataEncoder from "@/components/barcode-tools/barcode-data-encoder";
import BarcodeDataEncoderSEO from "@/components/seo-content/barcode-tools/barcode-data-encoder";

export const metadata: Metadata = {
  title: `Barcode Data Encoder Decoder - GS1 AI Parser`,
  description: `Encode/decode structured barcode data like GS1-128. Parse Application Identifiers (AIs). Free online tool for logistics and inventory data.`,
  alternates: {
    canonical: `https://1000freetools.com/barcode-tools/barcode-data-encoder`,
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

export default function BarcodeDataEncoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Barcode Data Encoder & Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode product data with GS1 identifiers or decode complex barcode
          data strings. This tool handles structured data formats used in
          logistics and healthcare.
        </p>
      </header>
      <div className="mt-8">
        <BarcodeDataEncoder />
      </div>
      <div className="mt-8">
        <BarcodeDataEncoderSEO />
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
