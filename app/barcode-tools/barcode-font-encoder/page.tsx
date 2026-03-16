import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BarcodeFontEncoder from "@/components/barcode-tools/barcode-font-encoder";
import BarcodeFontEncoderSEO from "@/components/seo-content/barcode-tools/barcode-font-encoder";

export const metadata: Metadata = {
  title: `Barcode Font Encoder - Generate Barcode Text Font`,
  description: `Create barcode font text for documents. Encode data as Code 128 or Code 39 font string. Download free barcode fonts. Paste into Word/Excel.`,
  alternates: {
    canonical: `https://1000freetools.com/barcode-tools/barcode-font-encoder`,
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

export default function BarcodeFontEncoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Barcode Font Encoder</h1>
        <p className="text-muted-foreground">
          Encode text into barcode fonts for use in Microsoft Word, Excel, or
          design programs. Generate the font string and download the required
          TrueType font files.
        </p>
      </header>
      <div className="mt-8">
        <BarcodeFontEncoder />
      </div>
      <div className="mt-8">
        <BarcodeFontEncoderSEO />
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
